import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export function TestimonialSlider() {
  const { testimonials } = useSiteData();
  const [index, setIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[index % testimonials.length];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="bg-[#141416] text-[#FAFAF8] border border-white/10 p-8 sm:p-12 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Quote className="w-6 h-6 text-[#D4AF37]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
            {current.isSampleLayout
              ? 'Sample Testimonial Layout · Placeholder Only'
              : 'Verified Client Feedback'}
          </span>
        </div>
        <div className="flex items-center gap-1" aria-label={`${current.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < current.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-neutral-600'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="py-8 min-h-[140px]">
        <p className="font-display text-2xl sm:text-3xl leading-snug text-[#FAFAF8]">
          &ldquo;{current.feedback}&rdquo;
        </p>
      </div>

      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#FAFAF8]">
            {current.customerName}
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">
            {current.projectType}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-400 tabular-nums mr-2">
            {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
