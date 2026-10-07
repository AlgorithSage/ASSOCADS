import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X, Users } from 'lucide-react';
import { team } from '../content';
import { EASE, Reveal, Words } from '../motion';

const photo = (i: number) => `/images/team-${String(i + 1).padStart(2, '0')}.webp`;

// Office bearers: intro on the left, a smooth sideways slider row of portrait cards on the right.
// "See all 17" expands into an immersive full-webpage modal dialog that smoothly retracts when closed.
export function Team() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll bounds for slider arrows
  const checkScrollBounds = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollBy = (offset: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!showAll) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAll(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showAll]);

  return (
    <section id="team" className="section-pad relative overflow-hidden">
      {/* Pale band behind the lower half of the cards */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 z-0 bg-paper-2/70" aria-hidden="true" />

      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left: Section Header & Actions */}
          <div className="lg:col-span-4 lg:pt-6">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink-muted">
                <Users size={14} className="text-ink/60" />
                <span>Leadership & Governance</span>
              </div>
            </Reveal>
            <Words text="Office bearers" className="mt-2 text-[2.75rem] font-medium leading-[1.06] text-ink sm:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-muted">
                Seventeen dedicated roles, each with one clear domain of responsibility, driving ASSOCADS daily operations across academia, industry, and student success.
              </p>

              {/* Slider Controls & Full View Trigger */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="btn btn-primary shadow-sm"
                  aria-haspopup="dialog"
                >
                  See all {team.length} <ArrowRight size={16} />
                </button>

                {/* Minimalist slider chevrons */}
                <div className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/80 p-1 backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => scrollBy(-280)}
                    disabled={!canScrollLeft}
                    aria-label="Previous office bearers"
                    className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollBy(280)}
                    disabled={!canScrollRight}
                    aria-label="Next office bearers"
                    className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted/80">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
                <span>Click &apos;See all {team.length}&apos; for the complete expansive directory</span>
              </div>
            </Reveal>
          </div>

          {/* Right: Smooth horizontal slider of portrait cards (no mouse-wheel hijacking) */}
          <div className="lg:col-span-8">
            <div
              ref={trackRef}
              onScroll={checkScrollBounds}
              className="scroll-x-clean -mx-5 flex snap-x snap-proximity gap-5 overflow-x-auto px-5 pb-6 pt-2 md:-mx-8 md:px-8 lg:mr-[calc(50%-50vw)] lg:pr-[calc(50vw-50%+2rem)]"
            >
              {team.map((person, i) => (
                <article
                  key={person.role}
                  className="group relative w-60 shrink-0 snap-start transition-transform duration-300 hover:-translate-y-1 sm:w-64"
                >
                  <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-paper-2 shadow-sm ring-1 ring-ink/10">
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-ink/75 px-2 py-0.5 font-mono text-[10px] text-paper backdrop-blur-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <img
                      src={photo(i)}
                      alt={`Photo for ${person.role}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                    />
                  </div>
                  <div className="relative -mt-6 mx-3 rounded-lg border border-ink/10 bg-white px-4 py-4 text-center shadow-[0_12px_30px_-18px_rgba(46,36,44,0.35)] transition-shadow duration-300 group-hover:shadow-[0_16px_36px_-16px_rgba(46,36,44,0.45)]">
                    <h3 className="font-display text-base font-medium leading-snug text-ink">{person.role}</h3>
                    <p className="mt-1 text-xs leading-snug text-ink-muted">{person.looksAfter}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Webpage Expanding Modal for All 17 Office Bearers */}
      <AnimatePresence>
        {showAll && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-team-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
          >
            {/* Smooth Backdrop */}
            <motion.div
              className="fixed inset-0 bg-ink/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={() => setShowAll(false)}
              aria-hidden="true"
            />

            {/* Expanding & Retracting Modal Shell */}
            <motion.div
              className="relative z-10 flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-paper/20 bg-paper shadow-2xl ring-1 ring-ink/20"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: 'spring', damping: 28, stiffness: 280 }
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
                transition: { duration: 0.24, ease: EASE }
              }}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-ink/10 bg-paper-2/60 px-6 py-6 sm:px-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-ink-muted">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
                    <span>ASSOCADS Leadership Directory • All 17 Roles</span>
                  </div>
                  <h2 id="all-team-title" className="mt-2 font-display text-2xl font-medium tracking-tight text-ink sm:text-4xl">
                    Office Bearers
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                    Every functional office is staffed by a dedicated lead ensuring our curriculum, partnerships, community groups, and events operate seamlessly.
                  </p>
                </div>

                {/* Close Button with Esc hint */}
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs font-mono text-ink-muted/70 sm:inline-block">ESC</span>
                  <button
                    type="button"
                    onClick={() => setShowAll(false)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink shadow-sm transition hover:scale-105 hover:border-ink hover:bg-ink hover:text-white"
                    aria-label="Close directory view"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body: Expansive Full Grid Across the Viewport */}
              <div className="overflow-y-auto p-6 sm:p-10">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {team.map((person, i) => (
                    <article
                      key={person.role}
                      className="group flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lg"
                    >
                      <div className="relative aspect-4/5 overflow-hidden bg-paper-2">
                        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-ink/80 px-2 py-0.5 font-mono text-[10px] text-paper backdrop-blur-sm">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <img
                          src={photo(i)}
                          alt={person.role}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-3.5 text-center">
                        <h3 className="font-display text-sm font-medium leading-snug text-ink">{person.role}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-ink-muted">{person.looksAfter}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-ink/10 bg-paper-2/40 px-6 py-4 sm:px-10">
                <p className="text-xs text-ink-muted">
                  All 17 office positions represented. Final appointments are ratified annually by the governing body.
                </p>
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  className="btn btn-secondary px-5 py-2 text-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
