import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { programs } from '../content';
import type { Program } from '../types';
import { EASE } from '../motion';

// One programme tile: icon centered properly on a soft round backing, title, summary,
// and "What's included" which expands the concrete points in place.
function ProgramTile({ program, index }: { program: Program; index: number }) {
  const Icon = program.icon;
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      className="group relative flex h-full flex-col justify-between bg-white p-8 transition-colors duration-500 hover:bg-paper md:p-10"
      variants={{ hidden: { opacity: 0, y: 30 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
    >
      <div>
        <div className="flex items-start justify-between gap-6">
          <h3 className="max-w-[13ch] font-display text-2xl font-medium leading-tight text-ink md:text-[1.7rem]">
            {program.title}
          </h3>
          {/* Centered icon badge inside circle */}
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink shadow-sm transition-transform duration-500 ease-out-soft group-hover:scale-110">
            <Icon size={24} strokeWidth={1.5} className="text-ink" />
          </span>
        </div>
        <p className="mt-5 leading-relaxed text-ink-muted text-sm md:text-base">{program.summary}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {program.points.map((point) => (
                <li key={point} className="flex gap-3 pt-3 text-sm text-ink-soft first:pt-5">
                  <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 border border-ink/45" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-6">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="link-draw inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
        >
          {open ? 'Show less' : "What's included"}
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="inline-flex">
            <Plus size={14} />
          </motion.span>
        </button>
        <span className="font-mono text-xs font-semibold text-ink/25" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.article>
  );
}

// "Core Programmatic Pillars" as a 3×2 grid of equal-sized cards.
// The leading dark tile matches the exact dimensions and alignment of the other tiles.
export function Programs() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <motion.div
          className="grid gap-px border border-line bg-line shadow-[0_40px_80px_-50px_rgba(46,36,44,0.35)] md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.12 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Leading Dark Tile - Perfectly aligned and sized with all other tiles, "5/" removed */}
          <motion.div
            className="relative flex h-full flex-col justify-between overflow-hidden bg-ink p-8 text-paper md:p-10"
            variants={{ hidden: { opacity: 0, y: 30 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          >
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.24em] text-paper/60 mb-4">
                Five Strategic Domains
              </span>
              <h2 className="font-display text-3xl font-medium leading-[1.1] md:text-4xl lg:text-[2.65rem] text-paper">
                Core Programmatic
                <br />
                Pillars
              </h2>
            </div>
            <div className="mt-8 border-t border-paper/15 pt-6">
              <p className="text-sm leading-relaxed text-paper/75">
                Everything ASSOCADS delivers operates across these five interconnected pillars, driving technical excellence, inclusive access, and public impact.
              </p>
            </div>
          </motion.div>

          {programs.map((program, i) => (
            <ProgramTile key={program.id} program={program} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
