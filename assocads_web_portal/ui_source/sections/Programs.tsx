import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { programs } from '../content';
import type { Program } from '../types';
import { EASE } from '../motion';

// One programme tile: icon on a soft round backing, title, one plain line,
// and "What's included" which opens the four concrete things in place.
function ProgramTile({ program, index }: { program: Program; index: number }) {
  const Icon = program.icon;
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      className="group relative flex flex-col bg-white p-8 transition-colors duration-500 hover:bg-paper md:p-10"
      variants={{ hidden: { opacity: 0, y: 30 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
    >
      <div className="flex items-start justify-between gap-6">
        <h3 className="max-w-[12ch] font-display text-2xl font-medium leading-tight text-ink md:text-[1.7rem]">{program.title}</h3>
        <span className="relative grid h-14 w-14 shrink-0 place-items-center">
          <span
            className="absolute -left-2 -top-2 h-12 w-12 rounded-full bg-paper-2 transition-transform duration-500 ease-out-soft group-hover:scale-125"
            aria-hidden="true"
          />
          <Icon size={30} strokeWidth={1.25} className="relative text-ink" />
        </span>
      </div>
      <p className="mt-5 leading-relaxed text-ink-muted">{program.summary}</p>

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

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="link-draw mt-auto inline-flex w-fit items-center gap-2 pt-8 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
      >
        {open ? 'Show less' : "What's included"}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="inline-flex">
          <Plus size={14} />
        </motion.span>
      </button>
      <span className="pointer-events-none absolute bottom-6 right-8 font-display text-sm text-ink/20" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.article>
  );
}

// "What we do" as a 3×2 grid: a solid ink heading tile first, then the five programmes.
// Hairline gaps between tiles come from the grid background showing through.
export function Programs() {
  return (
    <section id="programs" className="section-pad">
      <div className="container-page">
        <motion.div
          className="grid gap-px border border-line bg-line shadow-[0_40px_80px_-50px_rgba(46,36,44,0.35)] md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.12 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div
            className="relative flex flex-col justify-between overflow-hidden bg-ink p-8 text-paper md:p-10 lg:-mt-6 lg:mb-0"
            variants={{ hidden: { opacity: 0, y: 30 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          >
            <div>
              <span className="font-display text-6xl leading-none text-paper/90">5/</span>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] md:text-5xl">
                Things
                <br />
                we do
              </h2>
            </div>
            <p className="mt-10 max-w-xs text-sm leading-relaxed text-paper/70">
              Everything ASSOCADS does fits into one of these five areas. Open any of them to see exactly what is included.
            </p>
          </motion.div>

          {programs.map((program, i) => (
            <ProgramTile key={program.id} program={program} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
