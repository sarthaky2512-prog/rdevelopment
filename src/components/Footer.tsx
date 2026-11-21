import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export function Footer() {
  const { settings, pages } = useSiteData();
  const customFooterPages = pages.filter((p) => p.showInFooter);

  const socialItems = [
    { label: 'Instagram', url: settings.socialInstagram },
    { label: 'LinkedIn', url: settings.socialLinkedIn },
    { label: 'Facebook', url: settings.socialFacebook },
    { label: 'Houzz', url: settings.socialHouzz },
  ].filter((item) => item.url && /^https?:\/\//i.test(item.url));

  return (
    <footer className="bg-[#0B0B0C] text-[#FAFAF8] border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="inline-block font-display text-3xl font-semibold tracking-wide text-[#FAFAF8]"
            >
              {settings.companyName}
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
              {settings.tagline}
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Construction, architecture, interior design, and residential &amp; commercial
              remodeling dedicated to lasting craftsmanship and disciplined project
              execution.
            </p>
            {socialItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {socialItems.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider text-neutral-300 hover:text-[#D4AF37] border-b border-white/15 pb-0.5 transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              {settings.footerLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {customFooterPages.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/pages/${p.slug}`}
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialty Pages */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Design &amp; Remodeling
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link to="/architecture-design" className="hover:text-[#D4AF37] transition-colors">
                  Architecture &amp; Design
                </Link>
              </li>
              <li>
                <Link to="/interior-design" className="hover:text-[#D4AF37] transition-colors">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link to="/exterior-design" className="hover:text-[#D4AF37] transition-colors">
                  Exterior Design
                </Link>
              </li>
              <li>
                <Link to="/kitchen-remodeling" className="hover:text-[#D4AF37] transition-colors">
                  Kitchen Remodeling
                </Link>
              </li>
              <li>
                <Link to="/bathroom-remodeling" className="hover:text-[#D4AF37] transition-colors">
                  Bathroom Remodeling
                </Link>
              </li>
              <li>
                <Link to="/roofing-exterior" className="hover:text-[#D4AF37] transition-colors">
                  Roofing &amp; Exterior Services
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="hover:text-[#D4AF37] transition-colors">
                  Request an Estimate
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#D4AF37] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Contact Details
            </h3>
            <div className="space-y-4 text-sm text-neutral-300">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">
                    Phone
                  </div>
                  <a
                    href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
                    className="hover:text-[#D4AF37] transition-colors tabular-nums"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">
                    Email
                  </div>
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-[#D4AF37] transition-colors break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">
                    Office Address
                  </div>
                  <p className="leading-relaxed">{settings.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {settings.footerDisclaimer && (
          <p className="text-xs text-neutral-500 leading-relaxed pt-8 pb-6 border-b border-white/5">
            {settings.footerDisclaimer}
          </p>
        )}

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 {settings.companyName}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-[#D4AF37] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/disclaimer" className="hover:text-[#D4AF37] transition-colors">
              Disclaimer
            </Link>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[#D4AF37] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
