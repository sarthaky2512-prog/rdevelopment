import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { EstimateForm } from '../components/EstimateForm';

export function EstimatePage() {
  const { settings } = useSiteData();
  const [params] = useSearchParams();
  const defaultType = params.get('type') || 'Home Remodeling';
  const defaultClass =
    params.get('class') === 'Commercial' ? 'Commercial' : 'Residential';

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Project Consultation
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold">
            {settings.confirmFreeEstimates
              ? 'Request Your Free Project Estimate'
              : 'Request a Project Estimate'}
          </h1>
          <p className="text-base text-neutral-300 max-w-2xl leading-relaxed">
            Share your construction, remodeling, or design goals below. Attach reference
            images if helpful—our Clifton, Virginia team reviews every submission directly.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <EstimateForm
              defaultProjectType={defaultType}
              defaultPropertyClass={defaultClass}
            />
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B0B0C] text-[#FAFAF8] p-8 space-y-6">
              <h2 className="font-display text-2xl font-semibold text-[#D4AF37]">
                Direct Contact
              </h2>
              <div className="space-y-4 text-sm text-neutral-300">
                <a
                  href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-3 hover:text-[#D4AF37]"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="tabular-nums">{settings.phone}</span>
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 hover:text-[#D4AF37] break-all"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{settings.email}</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <span>{settings.address}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-black/10 p-8 space-y-4">
              <h3 className="font-display text-2xl font-semibold text-[#0B0B0C]">
                What Happens Next
              </h3>
              <ol className="space-y-3 text-sm text-neutral-700 list-decimal list-inside">
                <li>Our team reviews your scope, property type, and attached photos.</li>
                <li>We schedule an initial consultation call or site walkthrough.</li>
                <li>You receive a clear project scope and estimate proposal.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
