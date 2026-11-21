import 'dotenv/config';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';
const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '8mb' }));

  // Serve validated local uploads
  app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'rdevelopmentgroup' });
  });

  app.get('/api/public-config', (_req: Request, res: Response) => {
    const mapsApiKey =
      process.env.VITE_GOOGLE_MAPS_API_KEY ||
      process.env.GOOGLE_MAPS_API_KEY ||
      '';
    const siteUrl =
      process.env.VITE_SITE_URL ||
      process.env.APP_URL ||
      '';
    res.json({
      mapsApiKey,
      siteUrl,
    });
  });

  // Validated image upload endpoint (JPEG, PNG, WebP up to 4MB)
  app.post('/api/upload-image', (req: Request, res: Response) => {
    try {
      const { fileName, dataUrl } = req.body ?? {};
      if (typeof fileName !== 'string' || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Invalid upload payload.' });
        return;
      }

      const match = dataUrl.match(/^data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
      if (!match) {
        res.status(400).json({ error: 'Only JPEG, PNG, and WebP images are supported.' });
        return;
      }

      const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
      const buffer = Buffer.from(match[2], 'base64');
      if (buffer.length === 0 || buffer.length > 4 * 1024 * 1024) {
        res.status(400).json({ error: 'Image file must be under 4 MB.' });
        return;
      }

      const safeBase = fileName
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .slice(0, 40)
        .toLowerCase() || 'upload';
      const uniqueName = `${safeBase}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
      const resolvedPath = path.resolve(UPLOAD_DIR, uniqueName);
      if (!resolvedPath.startsWith(UPLOAD_DIR + path.sep)) {
        res.status(400).json({ error: 'Invalid upload path.' });
        return;
      }

      fs.writeFileSync(resolvedPath, buffer);
      res.status(201).json({ url: `/uploads/${uniqueName}` });
    } catch {
      res.status(500).json({ error: 'Failed to process image upload.' });
    }
  });

  // Secure inquiry notification endpoint (sends to support@rdevelopmentgroup.com when SMTP is configured)
  app.post('/api/notify-inquiry', async (req: Request, res: Response) => {
    try {
      const body = req.body ?? {};
      const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
      const email = typeof body.email === 'string' ? body.email.trim() : '';
      const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
      const projectType = typeof body.projectType === 'string' ? body.projectType.trim() : '';
      const propertyClass = typeof body.propertyClass === 'string' ? body.propertyClass.trim() : 'Residential';
      const projectAddress = typeof body.projectAddress === 'string' ? body.projectAddress.trim() : '';
      const estimatedBudget = typeof body.estimatedBudget === 'string' ? body.estimatedBudget.trim() : '';
      const preferredStartDate = typeof body.preferredStartDate === 'string' ? body.preferredStartDate.trim() : '';
      const description = typeof body.description === 'string' ? body.description.trim() : '';
      const inquirySource = body.inquirySource === 'contact' ? 'contact' : 'estimate';

      if (
        fullName.length < 2 ||
        fullName.length > 120 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        phone.length < 5 ||
        description.length < 5
      ) {
        res.status(400).json({ error: 'Please provide valid contact and project details.' });
        return;
      }

      const smtpHost = process.env.SMTP_HOST;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const notifyEmail = process.env.NOTIFY_EMAIL || 'support@rdevelopmentgroup.com';

      let emailed = false;
      if (smtpHost && smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Rdevelopmentgroup Web" <${smtpUser}>`,
          to: notifyEmail,
          replyTo: email,
          subject: `[${inquirySource.toUpperCase()}] New ${projectType} Inquiry from ${fullName}`,
          text: [
            `Source: ${inquirySource}`,
            `Name: ${fullName}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Property Class: ${propertyClass}`,
            `Project Type: ${projectType}`,
            `Address: ${projectAddress || 'N/A'}`,
            `Estimated Budget: ${estimatedBudget || 'N/A'}`,
            `Preferred Start Date: ${preferredStartDate || 'N/A'}`,
            '',
            'Description:',
            description,
          ].join('\n'),
          html: `
            <div style="font-family: sans-serif; color: #111; max-width: 600px;">
              <h2 style="border-bottom: 2px solid #C59B40; padding-bottom: 8px;">New ${escapeHtml(inquirySource)} Inquiry — Rdevelopmentgroup</h2>
              <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
              <p><strong>Property:</strong> ${escapeHtml(propertyClass)}</p>
              <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
              <p><strong>Address:</strong> ${escapeHtml(projectAddress || 'Not specified')}</p>
              <p><strong>Estimated Budget:</strong> ${escapeHtml(estimatedBudget || 'Not specified')}</p>
              <p><strong>Preferred Start:</strong> ${escapeHtml(preferredStartDate || 'Not specified')}</p>
              <p><strong>Project Description:</strong><br/>${escapeHtml(description).replace(/\n/g, '<br/>')}</p>
            </div>
          `,
        });
        emailed = true;
      }

      res.json({
        ok: true,
        emailed,
        recipient: notifyEmail,
      });
    } catch {
      res.status(500).json({ error: 'Unable to process notification request.' });
    }
  });

  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir, { maxAge: '1d' }));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rdevelopmentgroup server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
