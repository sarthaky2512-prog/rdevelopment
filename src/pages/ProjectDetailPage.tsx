import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SafeImage } from '../components/SafeImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = useSiteData();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="py-28 px-6 text-center bg-[#FAFAF8]">
        <div className="max-w-lg mx-auto space-y-4">
          <h1 className="font-display text-4xl font-semibold text-[#0B0B0C]">
            Project Not Found
          </h1>
          <p className="text-sm text-neutral-600">
            The requested project entry could not be located.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-[#D4AF37]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Our Projects</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs text-[#D4AF37] flex flex-wrap items-center gap-2 uppercase tracking-wider font-semibold">
                <span>
                  {project.projectStatus === 'completed'
                    ? 'Completed Company Project'
                    : 'Sample Architectural Showcase'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                {project.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-neutral-300 font-normal">
                      {project.location}
                    </span>
                  </>
                )}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-balance">
                {project.title}
              </h1>
              <p className="text-base text-neutral-300 leading-relaxed max-w-2xl">
                {project.summary}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                to={`/estimate?type=${encodeURIComponent(project.category)}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#C59B40]"
              >
                <span>Request Similar Scope Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="aspect-[16/9] max-h-[620px] w-full overflow-hidden border border-white/10">
            <SafeImage
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl font-semibold text-[#0B0B0C]">
              Project Overview
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>

            {project.beforeImageUrl && project.afterImageUrl && (
              <div className="pt-8 space-y-4">
                <h3 className="font-display text-2xl font-semibold text-[#0B0B0C]">
                  Before &amp; After Comparison
                </h3>
                <BeforeAfterSlider
                  beforeUrl={project.beforeImageUrl}
                  afterUrl={project.afterImageUrl}
                  title={project.title}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-8">
            {project.scopeItems && project.scopeItems.length > 0 && (
              <div className="bg-white border border-black/10 p-8 space-y-5">
                <h3 className="font-display text-2xl font-semibold text-[#0B0B0C]">
                  Scope Highlights
                </h3>
                <ul className="space-y-3">
                  {project.scopeItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                      <Check className="w-4 h-4 text-[#9A7420] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-[#0B0B0C]">
                  Additional Views
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.galleryImages.map((img, i) => (
                    <div
                      key={`${img}-${i}`}
                      className="aspect-[4/3] overflow-hidden border border-black/10 bg-[#141416]"
                    >
                      <SafeImage
                        src={img}
                        alt={`${project.title} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
