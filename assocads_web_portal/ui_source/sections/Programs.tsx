import { motion } from 'framer-motion';
import { programs } from '../content';
import type { Program } from '../types';
import { EASE } from '../motion';

const pad = (n: number) => String(n).padStart(2, '0');

// One programme tile. Everything is visible at once (no expand button), so the tile is
// filled top to bottom: number + icon, title, one plain line, then the four concrete things.
function ProgramTile({ program, index }: { program: Program; index: number }) {
  const Icon = program.icon;
  return (
    <motion.article
      className="group relative flex h-full flex-col bg-white p-8 transition-colors duration-500 hover:bg-paper md:p-10"
      variants={{ hidden: { opacity: 0, y: 30 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out-soft group-hover:scale-110">
          <Icon size={22} strokeWidth={1.6} />
        </span>
        <span className="font-display text-2xl text-ink/15" aria-hidden="true">
          {pad(index + 1)}
        </span>
      </div>

      <h3 className="mt-7 font-display text-2xl font-medium leading-tight text-ink md:text-[1.65rem]">{program.title}</h3>
      <p className="mt-3 leading-relaxed text-ink-muted">{program.summary}</p>

      <ul className="mt-6 space-y-3 border-t border-line pt-6">
        {program.points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-[0.95rem] leading-snug text-ink">
            <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-ink" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

// "What we do" as a 3×2 grid: a solid ink intro tile first, then the five programmes.
export function Programs() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <motion.div
          className="grid gap-px border border-line bg-line shadow-[0_40px_80px_-50px_rgba(46,36,44,0.35)] md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.12 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div
            className="relative flex h-full flex-col justify-between overflow-hidden bg-ink p-8 text-paper md:p-10"
            variants={{ hidden: { opacity: 0, y: 30 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          >
            <div>
              <span className="text-sm text-paper/60">Five areas of work</span>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] text-paper lg:text-[2.75rem]">
                What we
                <br />
                actually do
              </h2>
            </div>
            <div className="mt-10 border-t border-paper/15 pt-6">
              <p className="leading-relaxed text-paper/75">
                Everything ASSOCADS does fits into one of these five areas. Each card lists exactly what you get from it.
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
