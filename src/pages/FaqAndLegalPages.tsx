import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { FaqAccordion } from '../components/FaqAccordion';
import { SafeImage } from '../components/SafeImage';

export function FaqPage() {
  const { settings } = useSiteData();

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Information Center
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-neutral-300 max-w-2xl">
            Answers regarding {settings.companyName}&apos;s services, estimate process,
            project showcases, and contact options.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-12">
          <FaqAccordion />
          <div className="bg-[#0B0B0C] text-[#FAFAF8] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Have a Specific Project Question?
              </h2>
              <p className="text-sm text-neutral-300 mt-1">
                Reach out directly or request a tailored project estimate.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PrivacyPolicyPage() {
  const { settings } = useSiteData();

  return (
    <div className="bg-[#FAFAF8] py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-8">
        <div className="border-b border-black/10 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold mb-2">
            Legal Documentation
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B0B0C]">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Effective Date: 2026 · {settings.companyName}
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#0B0B0C]">
              1. Information We Collect
            </h2>
            <p>
              When you submit a contact message or project estimate request to{' '}
              {settings.companyName}, we collect only the details you provide, such as your
              full name, email address, phone number, project address, estimated budget,
              preferred timeline, project description, and any optional reference images
              you choose to upload.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#0B0B0C]">
              2. How We Use Submitted Details
            </h2>
            <p>
              We use inquiry details solely to review your construction, architecture, or
              remodeling request, communicate regarding scheduling and proposals, and
              deliver requested services. We do not sell or rent customer contact records
              to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#0B0B0C]">
              3. Google Maps Platform Integration
            </h2>
            <p>
              Our Contact page integrates Google Maps features to display our Clifton,
              Virginia business location. Use of embedded map features is subject to the
              Google Maps/Google Earth Additional Terms of Service and Google Privacy
              Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#0B0B0C]">
              4. Contact for Privacy Requests
            </h2>
            <p>
              You may request updates or deletion of your inquiry data at any time by
              emailing{' '}
              <a
                href={`mailto:${settings.email}`}
                className="underline text-[#9A7420]"
              >
                {settings.email}
              </a>{' '}
              or calling {settings.phone}. Office: {settings.address}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function TermsConditionsPage() {
  const { settings } = useSiteData();

  return (
    <div className="bg-[#FAFAF8] py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-8">
        <div className="border-b border-black/10 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold mb-2">
            Legal Documentation
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B0B0C]">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Effective Date: 2026 · {settings.companyName}
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#0B0B0C]">
              1. Informational Website Scope
            </h2>
            <p>
              Content published on this website—including service descriptions, sample
              architectural showcases, and project estimate forms—is provided for
              informational and consultation-scheduling purposes. Submitting an inquiry
              does not constitute a binding construction contract.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#0B0B0C]">
              2. Estimates &amp; Written Agreements
            </h2>
            <p>
              Formal project scopes, pricing, material specifications, schedules, and
              estimate fee terms (if any) are confirmed exclusively in writing following an
              evaluation by {settings.companyName}.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#0B0B0C]">
              3. Intellectual Property
            </h2>
            <p>
              All branding, design concepts, photography, and written copy on this site
              remain the property of {settings.companyName} or its respective licensors.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export function DisclaimerPage() {
  const { settings } = useSiteData();

  return (
    <div className="bg-[#FAFAF8] py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-8">
        <div className="border-b border-black/10 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold mb-2">
            Notice
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0B0B0C]">
            Disclaimer
          </h1>
        </div>

        <div className="space-y-5 text-sm sm:text-base text-neutral-700 leading-relaxed">
          <p>{settings.footerDisclaimer}</p>
          <p>
            Sample project photography and placeholder testimonial layouts are clearly
            labeled to distinguish illustrative architectural concepts from verified
            completed projects and client reviews published by {settings.companyName}.
          </p>
          <p>
            Trade execution, jurisdictional permitting requirements, and project
            qualifications are reviewed and confirmed on a project-by-project basis prior
            to contract execution.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DynamicCmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { pages } = useSiteData();

  const page = pages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="py-28 px-6 text-center bg-[#FAFAF8]">
        <div className="max-w-lg mx-auto space-y-4">
          <h1 className="font-display text-4xl font-semibold text-[#0B0B0C]">
            Page Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-base text-neutral-300 max-w-2xl">{page.subtitle}</p>
          )}
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-[#FAFAF8]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-8">
          {page.heroImageUrl && (
            <div className="aspect-[16/9] overflow-hidden border border-black/10">
              <SafeImage
                src={page.heroImageUrl}
                alt={page.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
            {page.body}
          </div>
        </div>
      </section>
    </div>
  );
}
