import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export function FaqAccordion() {
  const { settings } = useSiteData();
  const [openId, setOpenId] = useState<string | null>(settings.faqs[0]?.id || null);

  return (
    <div className="divide-y divide-black/10 border-t border-b border-black/10">
      {settings.faqs.map((faq, idx) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="py-5">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full flex items-center justify-between gap-6 text-left group"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-[#9A7420] tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl sm:text-2xl font-semibold text-[#0B0B0C] group-hover:text-[#9A7420] transition-colors">
                  {faq.question}
                </span>
              </div>
              <span className="w-8 h-8 border border-black/15 flex items-center justify-center shrink-0 text-[#0B0B0C] group-hover:border-[#9A7420]">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="mt-4 pl-8 sm:pl-9 pr-4 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-3xl">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
