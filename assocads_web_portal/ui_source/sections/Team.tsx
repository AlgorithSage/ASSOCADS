import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { team } from '../content';
import { EASE, Reveal, Words, useWheelToHorizontal } from '../motion';

const photo = (i: number) => `/images/team-${String(i + 1).padStart(2, '0')}.webp`;

// Office bearers: intro on the left, a sideways row of portrait cards on the right
// sitting on a pale band. "See all 17" opens the full list as a grid.
export function Team() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  useWheelToHorizontal(trackRef, [showAll]);

  return (
    <section id="team" className="section-pad relative">
      {/* Pale band behind the lower half of the cards */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 z-0 bg-paper-2/70" aria-hidden="true" />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4 lg:pt-10">
            <Reveal>
              <p className="text-sm text-ink-muted">Meet our</p>
            </Reveal>
            <Words text="Office bearers" className="mt-2 text-[2.75rem] font-medium leading-[1.06] text-ink sm:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-muted">
                Seventeen people, each with one clear job, who run ASSOCADS day to day. Photos are placeholders until the
                team is announced.
              </p>
              <button
                type="button"
                onClick={() => setShowAll((s) => !s)}
                className="btn btn-primary mt-10"
                aria-expanded={showAll}
              >
                {showAll ? 'Show fewer' : `See all ${team.length}`} <ArrowRight size={16} />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={showAll ? 'grid' : 'row'}
                ref={showAll ? undefined : trackRef}
                data-lenis-prevent-wheel={showAll ? undefined : true}
                className={
                  showAll
                    ? 'grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4'
                    : 'scroll-x-clean -mx-5 flex snap-x snap-proximity gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8 lg:mr-[calc(50%-50vw)] lg:pr-[calc(50vw-50%+2rem)]'
                }
                initial="hidden"
                animate="shown"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }}
              >
                {team.map((person, i) => (
                  <motion.article
                    key={person.role}
                    className={`group ${showAll ? '' : 'w-56 shrink-0 snap-start sm:w-60'}`}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
                    }}
                  >
                    <div className="aspect-4/5 overflow-hidden rounded-sm bg-paper-2">
                      <img
                        src={photo(i)}
                        alt={`Placeholder photo for the ${person.role}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                      />
                    </div>
                    <div className="relative -mt-6 mx-3 rounded-sm bg-white px-4 py-4 text-center shadow-[0_12px_30px_-18px_rgba(46,36,44,0.4)]">
                      <h3 className="font-display text-base font-medium leading-snug text-ink">{person.role}</h3>
                      <p className="mt-1 text-xs leading-snug text-ink-muted">{person.looksAfter}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
