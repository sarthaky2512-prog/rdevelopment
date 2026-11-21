import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { IMAGES } from '../data/defaultContent';
import { SafeImage } from '../components/SafeImage';

export interface SpecialtyConfig {
  kicker: string;
  heading: string;
  lead: string;
  imageUrl: string;
  highlights: string[];
  ctaLabel: string;
  estimateDefaultType: string;
  propertyClass: 'Residential' | 'Commercial';
  relatedTitles: string[];
}

export const SPECIALTY_PAGES: Record<string, SpecialtyConfig> = {
  residential: {
    kicker: 'Residential Construction',
    heading: 'CREATE THE HOME YOU HAVE ALWAYS ENVISIONED.',
    lead: 'Rdevelopmentgroup partners with homeowners on ground-up residential builds, structural additions, kitchen and bathroom transformations, and tailored interior and exterior upgrades.',
    imageUrl: IMAGES.residentialHome,
    highlights: [
      'New home construction',
      'Custom home improvements',
      'Home extensions & structural additions',
      'Kitchen renovation & custom millwork',
      'Bathroom renovation & wet-room finishes',
      'Whole-home interior remodeling',
      'Exterior facade, roofing & deck improvements',
    ],
    ctaLabel: 'Start Your Residential Project',
    estimateDefaultType: 'Home Remodeling',
    propertyClass: 'Residential',
    relatedTitles: [
      'Residential Construction',
      'New Home Construction',
      'Home Additions',
      'Whole-Home Remodeling',
    ],
  },
  commercial: {
    kicker: 'Commercial Construction',
    heading: 'PROFESSIONAL SOLUTIONS FOR COMMERCIAL SPACES.',
    lead: 'We execute commercial renovations, office build-outs, retail upgrades, and commercial interior design with disciplined scheduling and consistent finish quality.',
    imageUrl: IMAGES.commercialOffice,
    highlights: [
      'Commercial renovation',
      'Office remodeling & executive suites',
      'Commercial interior design',
      'Retail space improvements',
      'Building upgrades & envelope improvements',
      'Commercial construction projects',
    ],
    ctaLabel: 'Discuss Your Commercial Project',
    estimateDefaultType: 'Commercial Construction',
    propertyClass: 'Commercial',
    relatedTitles: [
      'Commercial Construction',
      'Building Renovation',
      'Residential & Commercial Design',
      'Space Planning',
    ],
  },
  architecture: {
    kicker: 'Architecture & Design',
    heading: 'PURPOSEFUL ARCHITECTURE & SPATIAL PLANNING.',
    lead: 'Integrated architectural design, 3D visualization, and floor plan optimization that bridge creative concepting with real-world buildability.',
    imageUrl: IMAGES.studioCraftsmanship,
    highlights: [
      'Architectural Design & Elevation Studies',
      '3D Design & Visualization',
      'Space Planning & Structural Flow',
      'Residential & Commercial Design',
      'Permits & Project Coordination',
    ],
    ctaLabel: 'Start Your Design Consultation',
    estimateDefaultType: 'Interior Design',
    propertyClass: 'Residential',
    relatedTitles: [
      'Architectural Design',
      '3D Design & Visualization',
      'Space Planning',
      'Residential & Commercial Design',
    ],
  },
  interior: {
    kicker: 'Interior Design',
    heading: 'CURATED INTERIORS BUILT AROUND HOW YOU LIVE AND WORK.',
    lead: 'From bespoke stone and cabinetry palettes to architectural lighting and trim carpentry, we craft cohesive interior environments built to last.',
    imageUrl: IMAGES.kitchenLuxury,
    highlights: [
      'Custom cabinetry & millwork design',
      'Stone, tile, and hardwood curation',
      'Architectural lighting & ceiling profiles',
      'Interior finishes & trim craftsmanship',
      'Space planning & room flow optimization',
    ],
    ctaLabel: 'Plan Your Interior Project',
    estimateDefaultType: 'Interior Design',
    propertyClass: 'Residential',
    relatedTitles: [
      'Interior Design',
      'Interior Finishes',
      'Space Planning',
      'Kitchen Remodeling',
    ],
  },
  exterior: {
    kicker: 'Exterior Design',
    heading: 'ARCHITECTURAL EXTERIORS WITH LASTING CURB PRESENCE.',
    lead: 'Cohesive exterior design uniting masonry, siding, roofing geometry, entry portals, and covered outdoor living structures.',
    imageUrl: IMAGES.heroResidence,
    highlights: [
      'Exterior elevation & facade architecture',
      'Stone masonry & modern cladding coordination',
      'Outdoor living pavilions & covered decks',
      'Exterior architectural lighting integration',
      'Weather-conscious envelope detailing',
    ],
    ctaLabel: 'Explore Exterior Solutions',
    estimateDefaultType: 'Exterior Design',
    propertyClass: 'Residential',
    relatedTitles: [
      'Exterior Design',
      'Exterior Renovation',
      'Siding',
      'Exterior Deck Construction',
    ],
  },
  kitchen: {
    kicker: 'Kitchen Remodeling',
    heading: 'ARCHITECTURAL KITCHENS CRAFTED FOR GATHERING.',
    lead: 'Bespoke kitchen remodeling combining structural layout improvements, custom cabinetry, waterfall stone islands, and tailored lighting.',
    imageUrl: IMAGES.kitchenLuxury,
    highlights: [
      'Open-concept structural wall modifications',
      'Custom inset & frameless cabinetry',
      'Marble, quartzite & natural stone islands',
      'Integrated appliance & ventilation planning',
      'Pendant, task, and under-cabinet lighting',
    ],
    ctaLabel: 'Start Your Kitchen Remodel',
    estimateDefaultType: 'Kitchen Remodeling',
    propertyClass: 'Residential',
    relatedTitles: [
      'Kitchen Remodeling',
      'Interior Design',
      'Structural Improvements',
      'Plumbing Services',
    ],
  },
  bathroom: {
    kicker: 'Bathroom Remodeling',
    heading: 'SERENE BATHROOM SUITES WITH SPA-CALIBER DETAILING.',
    lead: 'Primary bath transformations and guest bath upgrades built around precision waterproofing, natural stone, custom vanities, and refined hardware.',
    imageUrl: IMAGES.bathroomSpa,
    highlights: [
      'Curbless & frameless glass walk-in showers',
      'Freestanding soaking tub installations',
      'Custom walnut & oak floating vanities',
      'Large-format porcelain & natural stone tile',
      'Coordinated plumbing & recessed lighting',
    ],
    ctaLabel: 'Plan Your Bathroom Remodel',
    estimateDefaultType: 'Bathroom Remodeling',
    propertyClass: 'Residential',
    relatedTitles: [
      'Bathroom Remodeling',
      'Plumbing Services',
      'Interior Finishes',
      'Painting & Finishing',
    ],
  },
  roofingExterior: {
    kicker: 'Roofing & Exterior Services',
    heading: 'PRECISION ROOFING, SIDING & CUSTOM DECK CONSTRUCTION.',
    lead: 'Protect and elevate your property exterior with standing-seam metal or architectural shingle roofing, durable siding systems, and custom covered decks.',
    imageUrl: IMAGES.exteriorDeckRoof,
    highlights: [
      'Standing-seam metal & architectural shingle roofing',
      'Fiber-cement, cedar & composite siding systems',
      'Custom timber & composite deck construction',
      'Covered outdoor pavilions & step lighting',
      'Exterior painting & protective finishing',
    ],
    ctaLabel: 'Request an Exterior Estimate',
    estimateDefaultType: 'Roofing',
    propertyClass: 'Residential',
    relatedTitles: [
      'Roofing',
      'Siding',
      'Exterior Deck Construction',
      'Exterior Renovation',
    ],
  },
};

export function SpecialtyServicePage({ pageKey }: { pageKey: keyof typeof SPECIALTY_PAGES }) {
  const { services } = useSiteData();
  const config = SPECIALTY_PAGES[pageKey];

  const matchingServices = services.filter((s) =>
    config.relatedTitles.includes(s.title)
  );

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-20 lg:py-28 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              {config.kicker}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance">
              {config.heading}
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              {config.lead}
            </p>
            <div className="pt-2">
              <Link
                to={`/estimate?type=${encodeURIComponent(
                  config.estimateDefaultType
                )}&class=${config.propertyClass}`}
                className="px-7 py-4 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C59B40] transition-colors inline-flex items-center gap-2"
              >
                <span>{config.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[16/10] overflow-hidden border border-white/10">
            <SafeImage
              src={config.imageUrl}
              alt={config.kicker}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold">
              Scope Highlights
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0B0B0C]">
              Key Capabilities Included
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Every project is scoped transparently around your property goals, design
              preferences, and construction timeline.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.highlights.map((item) => (
              <div
                key={item}
                className="p-5 bg-white border border-black/10 flex items-start gap-3"
              >
                <Check className="w-4 h-4 text-[#9A7420] mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-[#0B0B0C]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {matchingServices.length > 0 && (
        <section className="py-20 bg-[#F3F2EE] border-t border-black/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                Related Services
              </h2>
              <Link
                to="/services"
                className="text-xs font-semibold uppercase tracking-wider text-[#9A7420] hover:text-[#0B0B0C]"
              >
                View All 26 Services
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {matchingServices.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-white border border-black/10 p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#9A7420] tabular-nums">
                      {String(svc.number).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-[#0B0B0C]">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                  <Link
                    to={`/estimate?type=${encodeURIComponent(svc.title)}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#0B0B0C] hover:text-[#9A7420] inline-flex items-center gap-1"
                  >
                    <span>Request Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
