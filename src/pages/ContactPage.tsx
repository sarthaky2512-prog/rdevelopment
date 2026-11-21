import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { GoogleMapsLocation } from '../components/GoogleMapsLocation';

export function ContactPage({ quotaExceeded }: { quotaExceeded?: boolean }) {
  const { settings, submitInquiry } = useSiteData();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Consultation');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sent, setSent] = useState(false);

  const socialItems = [
    { label: 'Instagram', url: settings.socialInstagram },
    { label: 'LinkedIn', url: settings.socialLinkedIn },
    { label: 'Facebook', url: settings.socialFacebook },
    { label: 'Houzz', url: settings.socialHouzz },
  ].filter((item) => item.url && /^https?:\/\//i.test(item.url));

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
    if (phone.trim().length < 5) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (message.trim().length < 5) {
      setErrorMsg('Please enter your message.');
      return;
    }
    if (!consent) {
      setErrorMsg('Please accept the privacy policy consent to send your message.');
      return;
    }

    setSubmitting(true);
    try {
      await submitInquiry({
        inquirySource: 'contact',
        fullName,
        email,
        phone,
        projectType: subject,
        propertyClass: 'Residential',
        description: message,
        privacyConsent: true,
      });
      setSent(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setConsent(false);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to send message right now. Please call us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Contact Us
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-3xl">
            LET&apos;S BUILD SOMETHING GREAT TOGETHER.
          </h1>
          <p className="text-base text-neutral-300 max-w-2xl leading-relaxed">
            Reach our Clifton, Virginia office by phone, email, or the inquiry form below
            to discuss residential construction, commercial renovations, or design planning.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Official Business Details & Interactive Google Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0B0B0C] text-[#FAFAF8] p-8 space-y-6">
              <h2 className="font-display text-3xl font-semibold">
                {settings.companyName}
              </h2>
              <div className="space-y-5 text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-neutral-500">
                      Click to Call
                    </div>
                    <a
                      href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
                      className="text-base font-semibold text-[#FAFAF8] hover:text-[#D4AF37] tabular-nums"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-neutral-500">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-base text-[#FAFAF8] hover:text-[#D4AF37] break-all"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-neutral-500">
                      Business Location
                    </div>
                    <p className="text-neutral-200 leading-relaxed">
                      {settings.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
                  className="px-5 py-3 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#C59B40]"
                >
                  Call {settings.phone}
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="px-5 py-3 border border-white/25 text-[#FAFAF8] text-xs font-semibold uppercase tracking-wider hover:border-[#D4AF37]"
                >
                  Email Team
                </a>
              </div>

              {socialItems.length > 0 && (
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4">
                  {socialItems.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-wider text-[#D4AF37] hover:underline"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <GoogleMapsLocation quotaExceeded={quotaExceeded} />
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="bg-[#0B0B0C] text-[#FAFAF8] p-10 border border-[#D4AF37]/40 space-y-5">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <CheckCircle2 className="w-7 h-7" />
                  <h2 className="font-display text-3xl font-semibold">
                    Message Sent to {settings.companyName}
                  </h2>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Thank you for reaching out. Your message has been recorded and routed to{' '}
                  {settings.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white border border-black/10 p-8 sm:p-10 space-y-6"
              >
                <div className="border-b border-black/10 pb-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold mb-1">
                    Direct Message
                  </p>
                  <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                    Contact Our Team
                  </h2>
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="p-4 bg-red-50 border border-red-200 text-red-900 text-sm"
                  >
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9A7420]"
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
                      className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9A7420]"
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
                      className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9A7420]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                      Inquiry Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9A7420]"
                    >
                      <option value="General Consultation">General Consultation</option>
                      <option value="Residential Construction">Residential Construction</option>
                      <option value="Commercial Construction">Commercial Construction</option>
                      <option value="Architecture & Design">Architecture &amp; Design</option>
                      <option value="Remodeling Inquiry">Remodeling Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our construction and design team help you?"
                    className="w-full px-4 py-3 border border-neutral-300 bg-[#FAFAF8] text-sm focus:outline-none focus:border-[#9A7420]"
                  />
                </div>

                <label className="flex items-start gap-3 text-xs text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#0B0B0C]"
                  />
                  <span>
                    I consent to {settings.companyName} storing and responding to my contact
                    inquiry per the{' '}
                    <Link to="/privacy-policy" className="underline text-[#9A7420]">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-4 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#1E1E22] transition-colors inline-flex items-center gap-2 disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{submitting ? 'Sending...' : 'Contact Our Team'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
