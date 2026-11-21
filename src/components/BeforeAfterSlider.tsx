import React, { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
}

export function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeLabel = 'Before / Structural Phase',
  afterLabel = 'After / Finished Design',
  title,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#141416] select-none border border-black/10">
        <SafeImage
          src={afterUrl}
          alt={`${title} — ${afterLabel}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <SafeImage
            src={beforeUrl}
            alt={`${title} — ${beforeLabel}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Vertical Gold Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#0B0B0C] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-lg">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Clean Unboxed Corner Captions */}
        <span className="absolute bottom-3 left-3 bg-[#0B0B0C]/85 text-[#FAFAF8] px-3 py-1 text-xs tracking-wider uppercase pointer-events-none">
          {beforeLabel}
        </span>
        <span className="absolute bottom-3 right-3 bg-[#0B0B0C]/85 text-[#D4AF37] px-3 py-1 text-xs tracking-wider uppercase pointer-events-none">
          {afterLabel}
        </span>

        {/* Accessible Range Input Overlay */}
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          aria-label={`Compare before and after images for ${title}`}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>Drag slider horizontally to compare construction transformation</span>
        <span className="font-mono tabular-nums">{position}% / {100 - position}%</span>
      </div>
    </div>
  );
}
