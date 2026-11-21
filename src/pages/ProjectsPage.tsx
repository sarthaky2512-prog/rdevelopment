import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SafeImage } from '../components/SafeImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

export function ProjectsPage() {
  const { projects, categories } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sample' | 'completed'>('all');

  const categoryNames = ['All', ...categories.map((c) => c.name)];

  const filtered = projects.filter((project) => {
    const catMatch =
      selectedCategory === 'All' || project.category === selectedCategory;
    const statusMatch =
      statusFilter === 'all' || project.projectStatus === statusFilter;
    return catMatch && statusMatch;
  });

  const comparisonProjects = projects.filter(
    (p) => p.beforeImageUrl && p.afterImageUrl
  );

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Project Portfolio
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-3xl">
            OUR WORK. OUR CRAFTSMANSHIP. OUR RESULTS.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            Browse residential, commercial, interior, exterior, and remodeling showcases.
            Every entry clearly distinguishes illustrative sample concepts from completed
            Rdevelopmentgroup company projects.
          </p>

          {/* Status & Category Filter Bar */}
          <div className="pt-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'all', label: 'All Entries' },
                { key: 'completed', label: 'Completed Company Projects' },
                { key: 'sample', label: 'Sample Showcases' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    setStatusFilter(tab.key as 'all' | 'sample' | 'completed')
                  }
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    statusFilter === tab.key
                      ? 'bg-[#D4AF37] text-[#0B0B0C] border-[#D4AF37]'
                      : 'bg-[#141416] text-neutral-300 border-white/15 hover:border-[#D4AF37]/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs tracking-wide border transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-[#0B0B0C] border-white font-semibold'
                      : 'bg-transparent text-neutral-300 border-white/15 hover:border-white/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-20">
          {filtered.length === 0 ? (
            <div className="bg-white border border-black/10 p-12 text-center space-y-4">
              <p className="font-display text-2xl font-semibold text-[#0B0B0C]">
                No Projects Match This Filter Yet
              </p>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                {statusFilter === 'completed'
                  ? 'Completed company project photography can be uploaded and published through the Admin Dashboard.'
                  : 'Select another category filter to view available portfolio entries.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setStatusFilter('all');
                }}
                className="px-5 py-2.5 bg-[#0B0B0C] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group bg-white border border-black/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden bg-[#141416]">
                      <SafeImage
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="text-xs text-neutral-500 flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[#9A7420]">
                          {project.projectStatus === 'completed'
                            ? 'Completed Project'
                            : 'Sample Showcase'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                      </div>
                      <h2 className="font-display text-2xl font-semibold text-[#0B0B0C] group-hover:text-[#9A7420] transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0B0B0C]">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Before & After Comparison Showcase */}
          {comparisonProjects.length > 0 && (
            <div className="space-y-8 pt-10 border-t border-black/10">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9A7420] font-semibold">
                  Before &amp; After Comparisons
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0B0B0C]">
                  Inspect Structural &amp; Design Transformations
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {comparisonProjects.slice(0, 2).map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white border border-black/10 p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-semibold text-[#9A7420]">
                        {proj.projectStatus === 'completed'
                          ? 'Completed Project'
                          : 'Sample Showcase'}
                      </span>
                      <span>{proj.category}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#0B0B0C]">
                      {proj.title}
                    </h3>
                    <BeforeAfterSlider
                      beforeUrl={proj.beforeImageUrl!}
                      afterUrl={proj.afterImageUrl!}
                      title={proj.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
