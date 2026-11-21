import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { IMAGES } from '../data/defaultContent';
import { SafeImage } from '../components/SafeImage';

const VALUES = [
  {
    title: 'Quality Workmanship',
    detail: 'Structured framing, finish carpentry, masonry, and surface detailing executed to high standards.',
  },
  {
    title: 'Professional Service',
    detail: 'Respectful jobsite conduct, clean workspaces, and organized project coordination.',
  },
  {
    title: 'Creative Design',
    detail: 'Architectural and interior concepts tailored to both aesthetics and everyday utility.',
  },
  {
    title: 'Attention to Detail',
    detail: 'Careful alignment across cabinetry, stonework, lighting, and exterior transitions.',
  },
  {
    title: 'Customer Satisfaction',
    detail: 'Transparent scope discussions and thorough final reviews before handoff.',
  },
  {
    title: 'Reliable Project Communication',
    detail: 'Consistent progress updates from initial consultation through final completion.',
  },
];

export function AboutPage() {
  const { settings } = useSiteData();

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              About {settings.companyName}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
              {settings.aboutHeading}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              {settings.aboutDescription}
            </p>
          </div>
          <div className="lg:col-span-5 aspect-[4/3] overflow-hidden border border-white/10">
            <SafeImage
              src={IMAGES.studioCraftsmanship}
              alt="Rdevelopmentgroup architectural drafting and material selection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold">
              Core Principles
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0B0B0C]">
              Our Values in Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="bg-white border border-black/10 p-8 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9A7420] tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <Check className="w-4 h-4 text-[#9A7420]" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#0B0B0C]">
                  {val.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {val.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0B0B0C] text-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Ready to Plan Your Construction or Remodeling Project?
            </h2>
            <p className="text-sm text-neutral-300">
              Speak directly with our Clifton, Virginia team or submit your scope online.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/estimate"
              className="px-7 py-4 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C59B40] transition-colors inline-flex items-center gap-2"
            >
              <span>
                {settings.confirmFreeEstimates
                  ? 'Get a Free Estimate'
                  : 'Request an Estimate'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-7 py-4 border border-white/25 text-[#FAFAF8] text-xs font-semibold uppercase tracking-[0.18em] hover:border-[#D4AF37]"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
