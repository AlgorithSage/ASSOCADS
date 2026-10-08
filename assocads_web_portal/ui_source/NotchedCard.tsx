import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * A card whose cover has a rounded notch bitten out of its bottom-right corner,
 * with the "open" arrow sitting inside it. The notch is painted in the colour of
 * the surface behind the card (`surface`), so pass the section's background.
 */
interface NotchedCardProps {
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  /** small label at the top of the cover, e.g. the date */
  badge?: string;
  tags?: string[];
  /** the colour behind the card; the notch is painted in it */
  surface: string;
  onOpen: () => void;
  className?: string;
}

const DISC = 56; // arrow disc, px
const BLOCK = 72; // notch block, px (its radius = BLOCK - DISC / 2)
const FILLET = 16; // curve where the cut meets the cover's edges, px
const RADIUS = 12; // cover corner radius: rounder than our cards, but not pill-like

export function NotchedCard({ title, description, image, imageAlt = '', badge, tags = [], surface, onOpen, className = '' }: NotchedCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group flex flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 ${className}`}
      style={{ borderRadius: RADIUS }}
    >
      <div className="relative w-full">
        {/* cover */}
        <div className="relative aspect-4/3 overflow-hidden bg-paper-2" style={{ borderRadius: RADIUS }}>
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
          {badge && (
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4">
              <span className="rounded-sm border border-paper/40 bg-ink/40 px-2.5 py-1 text-xs text-paper backdrop-blur-md">{badge}</span>
            </div>
          )}
        </div>

        {/* notch: a block with a concave corner, plus a fillet at each end */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-0"
          style={{ width: BLOCK, height: BLOCK, borderTopLeftRadius: BLOCK - DISC / 2, background: surface }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK }
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`
            }}
          />
        ))}

        {/* arrow */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 flex items-center justify-center rounded-full border border-line bg-white text-ink transition-[background-color,color,border-color,scale] duration-300 group-hover:scale-105 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
          style={{ width: DISC, height: DISC } as CSSProperties}
        >
          <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-medium leading-snug text-ink md:text-2xl">{title}</h3>
      {description && <p className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-muted">{description}</p>}
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="rounded-sm bg-paper-2 px-2 py-1 text-xs text-ink-soft">
              {t}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
