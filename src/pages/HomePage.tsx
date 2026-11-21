import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Check,
  Compass,
  Hammer,
  Home as HomeIcon,
  Layers,
  Mail,
  MapPin,
  Paintbrush,
  Phone,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { IMAGES } from '../data/defaultContent';
import { SafeImage } from '../components/SafeImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { FaqAccordion } from '../components/FaqAccordion';
import { EstimateForm } from '../components/EstimateForm';
import { GoogleMapsLocation } from '../components/GoogleMapsLocation';

const COMPANY_VALUES = [
  'Quality Workmanship',
  'Professional Service',
  'Creative Design',
  'Attention to Detail',
  'Customer Satisfaction',
  'Reliable Project Communication',
];

const WHY_CHOOSE_ITEMS = [
  {
    title: 'Quality Craftsmanship',
    description:
      'Disciplined structural framing, millwork joinery, stonework, and finish execution designed to endure daily residential and commercial use.',
    icon: Hammer,
  },
  {
    title: 'Professional Project Management',
    description:
      'Organized scheduling, clear milestone tracking, and consistent coordination across every phase from pre-construction to final walkthrough.',
    icon: Compass,
  },
  {
    title: 'Modern Design Solutions',
    description:
      'Integrated architectural, interior, exterior, and 3D visualization capabilities that align spatial function with refined visual balance.',
    icon: Layers,
  },
  {
    title: 'Attention to Detail',
    description:
      'Measured material transitions, crisp trim lines, lighting placement, and thorough quality checks before project handoff.',
    icon: ShieldCheck,
  },
  {
    title: 'Customer-Focused Approach',
    description:
      'Responsive communication and tailored project scopes shaped around your goals, budget range, and timeline.',
    icon: HomeIcon,
  },
  {
    title: 'Comprehensive Services',
    description:
      'Unified construction, design, remodeling, roofing, exterior living, and trade coordination under one accountable company.',
    icon: Wrench,
  },
];

const WORK_PROCESS = [
  {
    step: 'STEP 01',
    title: 'Initial Consultation',
    description: 'Understand your goals, property conditions, and project requirements.',
  },
  {
    step: 'STEP 02',
    title: 'Planning & Design',
    description: 'Develop architectural concepts, spatial layouts, and material planning.',
  },
  {
    step: 'STEP 03',
    title: 'Estimate & Proposal',
    description: 'Provide structured project scope, schedule expectations, and cost estimates.',
  },
  {
    step: 'STEP 04',
    title: 'Construction & Execution',
    description: 'Coordinate the agreed construction, remodeling, and finishing work.',
  },
  {
    step: 'STEP 05',
    title: 'Final Review',
    description: 'Review completed work and project details thoroughly with the customer.',
  },
];

export function HomePage({ quotaExceeded }: { quotaExceeded?: boolean }) {
  const { settings, services, projects } = useSiteData();
  const [videoFailed, setVideoFailed] = useState(false);

  const heroVideoSrc =
    settings.heroVideoUrl?.trim() ||
    'https://gfk0fto1mnuj6g6f.public.blob.vercel-storage.com/Create_architecture_renovation_v%E2%80%A6_9b51c2e8.mp4';

  const featuredServices = services.filter((s) => s.featured).slice(0, 6);
  const featuredProjects = projects.slice(0, 3);
  const comparisonProject =
    projects.find((p) => p.beforeImageUrl && p.afterImageUrl) || projects[1];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[680px] lg:min-h-[820px] flex items-center bg-[#0B0B0C] text-[#FAFAF8] overflow-hidden">
        {!videoFailed ? (
          <video
            key={heroVideoSrc}
            src={heroVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#141416] via-[#0B0B0C] to-[#1A1610]"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/85 via-[#0B0B0C]/60 to-[#0B0B0C]/35"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 w-full">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Clifton, Virginia · Residential &amp; Commercial Design-Build
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.06] tracking-tight text-balance">
              {settings.heroHeading}
            </h1>
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl">
              {settings.heroDescription}
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/estimate"
                className="px-7 py-4 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C59B40] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Request a Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="px-7 py-4 border border-white/35 bg-[#0B0B0C]/50 text-[#FAFAF8] text-xs font-semibold uppercase tracking-[0.18em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
              >
                Explore Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#9A7420] font-semibold">
              About {settings.companyName}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0B0B0C] leading-tight text-balance">
              {settings.aboutHeading}
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed">
              {settings.aboutDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-4 border-t border-black/10">
              {COMPANY_VALUES.map((value) => (
                <div key={value} className="flex items-center gap-2.5 text-sm font-medium text-[#0B0B0C]">
                  <Check className="w-4 h-4 text-[#9A7420] shrink-0" />
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0B0B0C] border-b border-[#9A7420] pb-1 hover:text-[#9A7420] transition-colors"
              >
                <span>Learn More About Our Approach</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[380px] overflow-hidden border border-black/10">
              <SafeImage
                src={IMAGES.studioCraftsmanship}
                alt="Rdevelopmentgroup architectural planning and material curation studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES OVERVIEW */}
      <section className="py-20 lg:py-28 bg-[#0B0B0C] text-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
                Full-Scope Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
                26 Integrated Construction, Design &amp; Remodeling Services
              </h2>
            </div>
            <Link
              to="/services"
              className="px-6 py-3 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#D4AF37] hover:text-[#0B0B0C] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              View All 26 Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#141416] border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-[#1B1B1F]">
                    <SafeImage
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="text-xs text-[#D4AF37] tracking-wider font-mono tabular-nums">
                      {String(service.number).padStart(2, '0')} · {service.category}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#FAFAF8]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to={`/estimate?type=${encodeURIComponent(service.title)}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#FAFAF8] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Request an Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESIDENTIAL & COMMERCIAL SHOWCASE SPLIT */}
      <section className="py-20 lg:py-28 bg-[#F3F2EE]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-16">
          {/* Residential Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-white border border-black/10">
            <div className="lg:col-span-6 min-h-[340px] overflow-hidden">
              <SafeImage
                src={IMAGES.residentialHome}
                alt="Custom residential construction home exterior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold">
                <HomeIcon className="w-4 h-4" />
                <span>Residential Construction</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0B0B0C] text-balance">
                CREATE THE HOME YOU HAVE ALWAYS ENVISIONED.
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-neutral-700 pt-1">
                {[
                  'New home construction',
                  'Custom home improvements',
                  'Home extensions',
                  'Kitchen renovation',
                  'Bathroom renovation',
                  'Interior remodeling',
                  'Exterior improvements',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#9A7420] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 flex flex-wrap gap-4">
                <Link
                  to="/residential-construction"
                  className="px-6 py-3.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#1C1C1F] transition-colors inline-flex items-center gap-2"
                >
                  <span>Start Your Residential Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Commercial Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-[#0B0B0C] text-[#FAFAF8] border border-white/10">
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                <Building2 className="w-4 h-4" />
                <span>Commercial Construction</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-balance">
                PROFESSIONAL SOLUTIONS FOR COMMERCIAL SPACES.
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-neutral-300 pt-1">
                {[
                  'Commercial renovation',
                  'Office remodeling',
                  'Commercial interior design',
                  'Retail space improvements',
                  'Building upgrades',
                  'Commercial construction projects',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3">
                <Link
                  to="/commercial-construction"
                  className="px-6 py-3.5 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#C59B40] transition-colors inline-flex items-center gap-2"
                >
                  <span>Discuss Your Commercial Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 min-h-[340px] overflow-hidden order-1 lg:order-2">
              <SafeImage
                src={IMAGES.commercialOffice}
                alt="Modern architectural commercial building exterior and twilight plaza"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT PORTFOLIO & BEFORE-AFTER PREVIEW */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-[#9A7420] font-semibold">
                Portfolio &amp; Architectural Concepts
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0B0B0C]">
                OUR WORK. OUR CRAFTSMANSHIP. OUR RESULTS.
              </h2>
              <p className="text-sm text-neutral-600">
                Sample project concepts are clearly distinguished below from completed
                company builds uploaded through our portfolio manager.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="px-5 py-3 bg-[#0B0B0C] text-[#FAFAF8] text-xs font-semibold uppercase tracking-wider hover:bg-[#1E1E22] transition-colors"
              >
                All Projects
              </Link>
              <Link
                to="/gallery"
                className="px-5 py-3 border border-black/20 text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:border-[#9A7420] transition-colors"
              >
                Full Gallery
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group bg-white border border-black/10 flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#141416]">
                  <SafeImage
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-2">
                      <span className="text-[#9A7420] font-semibold">
                        {project.projectStatus === 'completed'
                          ? 'Completed Project'
                          : 'Sample Showcase'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.category}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#0B0B0C] mt-1 group-hover:text-[#9A7420] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-semibold uppercase tracking-wider text-[#0B0B0C] inline-flex items-center gap-1.5">
                    <span>View Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {comparisonProject &&
            comparisonProject.beforeImageUrl &&
            comparisonProject.afterImageUrl && (
              <div className="bg-white border border-black/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 space-y-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold">
                    Before &amp; After Transformation
                  </p>
                  <h3 className="font-display text-3xl font-semibold text-[#0B0B0C]">
                    {comparisonProject.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-neutral-500">
                    {comparisonProject.projectStatus === 'completed'
                      ? 'Completed Company Project'
                      : 'Sample Transformation Showcase'}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {comparisonProject.description}
                  </p>
                  <Link
                    to={`/projects/${comparisonProject.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B0B0C] border-b border-[#9A7420] pb-1"
                  >
                    <span>Inspect Full Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="lg:col-span-8">
                  <BeforeAfterSlider
                    beforeUrl={comparisonProject.beforeImageUrl}
                    afterUrl={comparisonProject.afterImageUrl}
                    title={comparisonProject.title}
                  />
                </div>
              </div>
            )}
        </div>
      </section>

      {/* 6. WHY CHOOSE RDEVELOPMENTGROUP */}
      <section className="py-20 lg:py-28 bg-[#0B0B0C] text-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-14">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
              Why Choose {settings.companyName}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
              YOUR PROJECT. OUR COMMITMENT TO QUALITY.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 bg-[#141416] border border-white/10 space-y-4"
                >
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="font-display text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FIVE-STEP WORK PROCESS */}
      <section className="py-20 lg:py-28 bg-[#F3F2EE]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-14">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-[#9A7420] font-semibold">
              Our Work Process
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0B0B0C]">
              From Initial Concept to Final Walkthrough
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {WORK_PROCESS.map((item) => (
              <div
                key={item.step}
                className="bg-white border border-black/10 p-6 flex flex-col justify-between space-y-6"
              >
                <span className="font-mono text-xs text-[#9A7420] tracking-widest tabular-nums">
                  {item.step}
                </span>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-semibold text-[#0B0B0C]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-[#9A7420] font-semibold">
                Client Perspectives
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0B0B0C]">
                WHAT OUR CUSTOMERS SAY.
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm">
              Structured testimonial showcase layout. Unverified sample placeholders are
              clearly labeled until verified reviews are published.
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-20 lg:py-28 bg-[#F3F2EE]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[#9A7420] font-semibold">
              Common Questions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0B0B0C]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Clear answers about our residential, commercial, design, and project
              estimate process.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B0B0C] border-b border-[#9A7420] pb-1 pt-2"
            >
              <span>View Full FAQ Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* 10. ESTIMATE & CONTACT SECTION */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <EstimateForm />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#0B0B0C] text-[#FAFAF8] p-8 sm:p-10 space-y-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
                Contact Our Team
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">
                LET&apos;S BUILD SOMETHING GREAT TOGETHER.
              </h2>
              <div className="space-y-4 pt-2 text-sm text-neutral-300">
                <a
                  href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-3 hover:text-[#D4AF37] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="tabular-nums">{settings.phone}</span>
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 hover:text-[#D4AF37] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{settings.email}</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <span>{settings.address}</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#C59B40] transition-colors"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <GoogleMapsLocation quotaExceeded={quotaExceeded} />
          </div>
        </div>
      </section>
    </div>
  );
}
