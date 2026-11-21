import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SafeImage } from '../components/SafeImage';

interface GalleryEntry {
  id: string;
  title: string;
  category: string;
  status: 'sample' | 'completed';
  imageUrl: string;
  summary: string;
}

export function GalleryPage() {
  const { projects, categories } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allEntries: GalleryEntry[] = [];
  projects.forEach((proj) => {
    allEntries.push({
      id: `${proj.id}-main`,
      title: proj.title,
      category: proj.category,
      status: proj.projectStatus,
      imageUrl: proj.imageUrl,
      summary: proj.summary,
    });
    (proj.galleryImages || []).forEach((img, idx) => {
      if (img && img !== proj.imageUrl) {
        allEntries.push({
          id: `${proj.id}-gal-${idx}`,
          title: `${proj.title} — Detail ${idx + 1}`,
          category: proj.category,
          status: proj.projectStatus,
          imageUrl: img,
          summary: proj.summary,
        });
      }
    });
  });

  const filtered =
    selectedCategory === 'All'
      ? allEntries
      : allEntries.filter((e) => e.category === selectedCategory);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight')
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % filtered.length
        );
      if (e.key === 'ArrowLeft')
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + filtered.length) % filtered.length
        );
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, filtered.length]);

  const activeEntry = activeIndex !== null ? filtered[activeIndex] : null;

  return (
    <div>
      <section className="bg-[#0B0B0C] text-[#FAFAF8] py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
            Project Gallery
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-3xl">
            Architectural &amp; Remodeling Photography
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl">
            Click any image to open the full-screen lightbox viewer. Sample concepts are
            explicitly labeled alongside completed projects.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['All', ...categories.map((c) => c.name)].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveIndex(null);
                }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${
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
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Responsive Masonry Columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((entry, idx) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="break-inside-avoid w-full text-left bg-white border border-black/10 group overflow-hidden block"
              >
                <div className="relative overflow-hidden bg-[#141416]">
                  <SafeImage
                    src={entry.imageUrl}
                    alt={entry.title}
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 w-9 h-9 bg-[#0B0B0C]/80 text-[#FAFAF8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-5 space-y-1.5">
                  <div className="text-xs text-neutral-500 flex items-center gap-2">
                    <span className="font-semibold text-[#9A7420]">
                      {entry.status === 'completed'
                        ? 'Completed Project'
                        : 'Sample Showcase'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.category}</span>
                  </div>
                  <div className="font-display text-xl font-semibold text-[#0B0B0C]">
                    {entry.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      {activeEntry && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeEntry.title}
          className="fixed inset-0 z-50 bg-[#0B0B0C]/95 text-[#FAFAF8] flex flex-col justify-between p-4 sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#D4AF37]">
                {activeEntry.status === 'completed'
                  ? 'Completed Company Project'
                  : 'Sample Architectural Showcase'}{' '}
                · {activeEntry.category}
              </div>
              <h2 className="font-display text-2xl font-semibold">
                {activeEntry.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
              className="w-11 h-11 border border-white/25 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <SafeImage
              src={activeEntry.imageUrl}
              alt={activeEntry.title}
              className="max-h-[75vh] max-w-full object-contain border border-white/10"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl line-clamp-2">
              {activeEntry.summary}
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-neutral-400 tabular-nums">
                {activeIndex + 1} / {filtered.length}
              </span>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() =>
                  setActiveIndex(
                    (activeIndex - 1 + filtered.length) % filtered.length
                  )
                }
                className="w-10 h-10 border border-white/25 flex items-center justify-center hover:border-[#D4AF37]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() =>
                  setActiveIndex((activeIndex + 1) % filtered.length)
                }
                className="w-10 h-10 border border-white/25 flex items-center justify-center hover:border-[#D4AF37]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
