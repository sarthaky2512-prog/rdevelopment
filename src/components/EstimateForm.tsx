import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, FileImage, Loader2, Trash2, Upload } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const PROJECT_TYPES = [
  'New Construction',
  'Home Remodeling',
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Interior Design',
  'Exterior Design',
  'Roofing',
  'Deck Construction',
  'Commercial Construction',
  'Electrical',
  'Plumbing',
  'Other',
];

interface EstimateFormProps {
  defaultProjectType?: string;
  defaultPropertyClass?: 'Residential' | 'Commercial';
}

export function EstimateForm({
  defaultProjectType = 'Home Remodeling',
  defaultPropertyClass = 'Residential',
}: EstimateFormProps) {
  const { settings, submitInquiry, uploadMediaFile } = useSiteData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(
    PROJECT_TYPES.includes(defaultProjectType) ? defaultProjectType : 'Other'
  );
  const [propertyClass, setPropertyClass] = useState<'Residential' | 'Commercial'>(
    defaultPropertyClass
  );
  const [projectAddress, setProjectAddress] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [preferredStartDate, setPreferredStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedResult, setSubmittedResult] = useState<{
    id: string;
    emailed: boolean;
  } | null>(null);

  const ctaText = settings.confirmFreeEstimates
    ? 'Request My Free Estimate'
    : 'Request My Estimate';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const selected = Array.from(e.target.files || []);
    const valid: File[] = [];
    for (const file of selected) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrorMsg('Only JPEG, PNG, and WebP images are supported.');
        continue;
      }
      if (file.size > 4 * 1024 * 1024) {
        setErrorMsg(`"${file.name}" exceeds the 4 MB maximum file size.`);
        continue;
      }
      valid.push(file);
    }
    setFiles((prev) => [...prev, ...valid].slice(0, 5));
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (description.trim().length < 10) {
      setErrorMsg('Please describe your project scope (at least 10 characters).');
      return;
    }
    if (!privacyConsent) {
      setErrorMsg('Please confirm privacy consent before submitting your inquiry.');
      return;
    }

    setSubmitting(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await uploadMediaFile(file, 'inquiries');
        uploadedUrls.push(url);
      }

      const result = await submitInquiry({
        inquirySource: 'estimate',
        fullName,
        email,
        phone,
        projectType,
        propertyClass,
        projectAddress,
        estimatedBudget,
        preferredStartDate,
        description,
        attachmentUrls: uploadedUrls,
        privacyConsent: true,
      });

      setSubmittedResult(result);
      setFullName('');
      setEmail('');
      setPhone('');
      setProjectAddress('');
      setEstimatedBudget('');
      setPreferredStartDate('');
      setDescription('');
      setFiles([]);
      setPrivacyConsent(false);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to submit your inquiry right now. Please call us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedResult) {
    return (
      <div className="bg-[#0B0B0C] text-[#FAFAF8] border border-[#D4AF37]/40 p-8 sm:p-10 space-y-5">
        <div className="flex items-center gap-3 text-[#D4AF37]">
          <CheckCircle2 className="w-7 h-7 shrink-0" />
          <h3 className="font-display text-2xl sm:text-3xl font-semibold">
            Project Inquiry Received
          </h3>
        </div>
        <p className="text-sm text-neutral-300 leading-relaxed">
          Thank you for contacting {settings.companyName}. Your inquiry has been securely
          recorded (Reference ID:{' '}
          <span className="font-mono text-[#D4AF37]">{submittedResult.id}</span>) and
          routed to our team at {settings.email}.
        </p>
        <p className="text-xs text-neutral-400">
          {submittedResult.emailed
            ? 'An email notification has also been dispatched to our project coordinators.'
            : 'Our team monitors incoming inquiries in the project management portal and will follow up promptly.'}
        </p>
        <button
          type="button"
          onClick={() => setSubmittedResult(null)}
          className="px-5 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-black/10 p-6 sm:p-10 space-y-6"
    >
      <div className="border-b border-black/10 pb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold mb-2">
          Project Inquiry
        </p>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0B0B0C]">
          Tell Us About Your Project
        </h3>
        {!settings.confirmFreeEstimates && (
          <p className="text-xs text-neutral-600 mt-2">
            Consultation and preliminary estimate terms are confirmed directly by{' '}
            {settings.companyName} upon inquiry review.
          </p>
        )}
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="p-4 bg-red-50 border border-red-200 text-red-900 text-sm"
        >
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm text-[#0B0B0C] focus:outline-none focus:border-[#9A7420]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm text-[#0B0B0C] focus:outline-none focus:border-[#9A7420]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (703) 555-0100"
            className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm text-[#0B0B0C] focus:outline-none focus:border-[#9A7420]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Project Type *
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm text-[#0B0B0C] focus:outline-none focus:border-[#9A7420]"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Residential or Commercial *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['Residential', 'Commercial'] as const).map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setPropertyClass(cls)}
                className={`py-3 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  propertyClass === cls
                    ? 'bg-[#0B0B0C] text-[#D4AF37] border-[#0B0B0C]'
                    : 'bg-[#FAFAF8] text-neutral-700 border-neutral-300 hover:border-neutral-500'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Project Address
          </label>
          <input
            type="text"
            value={projectAddress}
            onChange={(e) => setProjectAddress(e.target.value)}
            placeholder="Street address, City, State"
            className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm text-[#0B0B0C] focus:outline-none focus:border-[#9A7420]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Estimated Budget
          </label>
          <select
            value={estimatedBudget}
            onChange={(e) => setEstimatedBudget(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm text-[#0B0B0C] focus:outline-none focus:border-[#9A7420]"
          >
            <option value="">Select estimated range</option>
            <option value="Under $25,000">Under $25,000</option>
            <option value="$25,000 - $75,000">$25,000 - $75,000</option>
            <option value="$75,000 - $150,000">$75,000 - $150,000</option>
            <option value="$150,000 - $350,000">$150,000 - $350,000</option>
            <option value="$350,000+">$350,000+</option>
            <option value="Undetermined / Consultation Needed">
              Undetermined / Consultation Needed
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
            Preferred Start Date
          </label>
          <input
            type="date"
            value={preferredStartDate}
            onChange={(e) => setPreferredStartDate(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm text-[#0B0B0C] focus:outline-none focus:border-[#9A7420]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
          Project Description *
        </label>
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your construction, remodeling, or architectural design goals..."
          className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm text-[#0B0B0C] focus:outline-none focus:border-[#9A7420]"
        />
      </div>

      {/* Optional Project Image Upload */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
          Upload Project Images (Optional · Max 5 files, 4 MB each, JPEG/PNG/WebP)
        </label>
        <label className="flex flex-col items-center justify-center border border-dashed border-neutral-400 bg-[#FAFAF8] p-6 cursor-pointer hover:border-[#9A7420] transition-colors">
          <Upload className="w-5 h-5 text-[#9A7420] mb-2" />
          <span className="text-xs font-medium text-neutral-700">
            Click to select site photos, blueprints, or inspiration images
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, idx) => (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between px-3 py-2 bg-[#F3F2EE] border border-black/10 text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <FileImage className="w-4 h-4 text-[#9A7420] shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-neutral-500 font-mono tabular-nums">
                    ({Math.round(file.size / 1024)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  aria-label={`Remove ${file.name}`}
                  className="text-neutral-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="flex items-start gap-3 text-xs text-neutral-700 cursor-pointer">
        <input
          type="checkbox"
          checked={privacyConsent}
          onChange={(e) => setPrivacyConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#0B0B0C]"
        />
        <span>
          I agree to allow {settings.companyName} to review this inquiry and contact me
          regarding my project in accordance with the{' '}
          <Link to="/privacy-policy" className="underline text-[#9A7420]">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-8 py-4 bg-[#0B0B0C] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{submitting ? 'Submitting Inquiry...' : ctaText}</span>
      </button>
    </form>
  );
}
