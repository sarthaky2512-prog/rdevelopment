import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Check,
  Compass,
  Hammer,
  Layers,
  Wrench,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SafeImage } from '../components/SafeImage';

const CATEGORY_ORDER = [
  'All Services',
  'Construction Services',
  'Architecture & Design',
  'Remodeling Services',
  'Exterior Services',
  'Specialized Services',
];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Construction Services': Building2,
  'Architecture & Design': Compass,
  'Remodeling Services': Hammer,
  'Exterior Services': Layers,
  'Specialized Services': Wrench,
};

export function ServicesPage() {
  const { services } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState('All Services');

  const visibleServices =
    selectedCategory === 'All Services'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const groupedCategories =
    selectedCategory === 'All Services'
      ? CATEGORY_ORDER.slice(1)
      : [selectedCategory];

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-5">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Comprehensive Capabilities
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-3xl text-balance">
            Our Construction, Design &amp; Remodeling Services
          </h1>
          <p className="text-base text-neutral-300 max-w-2xl leading-relaxed">
            Explore our complete 26-service offering spanning new builds, architectural
            design, interior and exterior remodeling, and specialized project coordination.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="pt-6 flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-[#0B0B0C] border-[#D4AF37]'
                    : 'bg-[#141416] text-neutral-300 border-white/15 hover:border-[#D4AF37]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-20">
          {groupedCategories.map((group) => {
            const items = visibleServices.filter((s) => s.category === group);
            if (items.length === 0) return null;
            const Icon = CATEGORY_ICONS[group] || Hammer;

            return (
              <div key={group} className="space-y-8">
                <div className="flex items-center gap-3 pb-4 border-b border-black/15">
                  <Icon className="w-5 h-5 text-[#9A7420]" />
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0B0B0C]">
                    {group}
                  </h2>
                  <span className="ml-auto font-mono text-xs text-neutral-500 tabular-nums">
                    {items.length} Services
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((service) => (
                    <article
                      key={service.id}
                      className="bg-white border border-black/10 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[4/3] overflow-hidden bg-[#141416]">
                          <SafeImage
                            src={service.imageUrl}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between text-xs text-neutral-500">
                            <span className="font-mono text-[#9A7420] tabular-nums">
                              {String(service.number).padStart(2, '0')}
                            </span>
                            <span>{service.category}</span>
                          </div>
                          <h3 className="font-display text-2xl font-semibold text-[#0B0B0C]">
                            {service.title}
                          </h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            {service.description}
                          </p>
                          {service.benefits.length > 0 && (
                            <ul className="space-y-1.5 pt-2 border-t border-black/5">
                              {service.benefits.map((benefit) => (
                                <li
                                  key={benefit}
                                  className="flex items-start gap-2 text-xs text-neutral-700"
                                >
                                  <Check className="w-3.5 h-3.5 text-[#9A7420] mt-0.5 shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <Link
                          to={`/estimate?type=${encodeURIComponent(service.title)}`}
                          className="w-full py-3 px-4 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider hover:bg-[#1E1E22] transition-colors inline-flex items-center justify-center gap-2"
                        >
                          <span>Request an Estimate</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
