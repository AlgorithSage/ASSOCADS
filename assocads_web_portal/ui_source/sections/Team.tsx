import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, X, Users } from 'lucide-react';
import { team } from '../content';
import { EASE, Reveal, Words } from '../motion';

const photo = (i: number) => `/images/team-${String(i + 1).padStart(2, '0')}.webp`;

function LinkedInIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Office bearers: intro on the left, a smooth sideways slider row of portrait cards on the right.
// "See all 17" opens everyone in one panel, grouped into officers, chairs and advisers.
export function Team() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Check scroll bounds for slider arrows and mobile progress bar
  const checkScrollBounds = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
    }
  };

  const scrollCards = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth || 260;
    const gap = 16;
    const offset = (cardWidth + gap) * (direction === 'right' ? 1 : -1);
    trackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    checkScrollBounds();
    const handleResize = () => checkScrollBounds();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="section-pad relative overflow-hidden">
      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left: Section Header & Actions */}
          <div className="lg:col-span-4 lg:pt-6">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.01em] text-ink-muted">
                <Users size={14} className="text-ink/60" />
                <span>Leadership & Governance</span>
              </div>
            </Reveal>
            <Words text="Leaders & Governors" className="mt-2 text-[2.75rem] font-medium leading-[1.06] text-ink sm:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-muted">
                Seventeen dedicated officers, committee chairs, and advisors guiding ASSOCADS's mission, governance, and policy day to day.
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
                    onClick={() => scrollCards('left')}
                    disabled={!canScrollLeft}
                    aria-label="Previous leaders"
                    className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCards('right')}
                    disabled={!canScrollRight}
                    aria-label="Next leaders"
                    className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted/80">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
                <span>Tap &apos;See all {team.length}&apos; to see everyone at once</span>
              </div>
            </Reveal>
          </div>

          {/* Right: Exactly 3 portrait cards visible on desktop, clipped cleanly */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              ref={trackRef}
              onScroll={checkScrollBounds}
              className="scroll-x-clean flex snap-x snap-mandatory touch-pan-x gap-4 overflow-x-auto pb-4 pt-1 overscroll-x-contain"
            >
              {team.map((person, i) => (
                <article
                  key={person.role}
                  className="group relative flex w-[78vw] max-w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-line bg-white shadow-[0_18px_40px_-28px_rgba(46,36,44,0.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(46,36,44,0.55)] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                >
                  {/* Photo and caption are one card: same width, flush edge, no floating panel */}
                  <div className="relative aspect-4/5 overflow-hidden bg-paper-2 select-none">
                    <a
                      href={person.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(person.role + ' ASSOCADS')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`LinkedIn profile for ${person.role}`}
                      title={`Connect with ${person.role} on LinkedIn`}
                      className="absolute left-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-ink/75 text-paper backdrop-blur-sm transition-all duration-200 hover:bg-[#0A66C2] hover:text-white hover:scale-110 shadow-xs cursor-pointer"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                    </a>
                    <img
                      src={photo(i)}
                      alt={`Photo for ${person.role}`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105 pointer-events-none"
                    />
                  </div>
                  <div className="flex min-h-24 sm:min-h-28 flex-1 flex-col items-center justify-center border-t border-line px-4 py-3.5 sm:px-5 sm:py-4 text-center transition-colors duration-300 group-hover:bg-ink">
                    <h3 className="font-display text-sm sm:text-base font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-paper">
                      {person.role}
                    </h3>
                    <p className="mt-1 text-[11px] sm:text-xs leading-snug text-ink-muted transition-colors duration-300 group-hover:text-paper/70">
                      {person.looksAfter}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile swipe cue & progress bar */}
            <div className="mt-2 flex items-center justify-between px-1 sm:hidden">
              <span className="text-[11px] font-medium text-ink-muted">Swipe to see leaders</span>
              <div className="h-1 w-20 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-ink transition-all duration-150"
                  style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Everyone at once, grouped by type of role */}
      <AnimatePresence>
        {showAll && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-team-title"
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setShowAll(false)}
              aria-hidden="true"
            />

            <motion.div
              className="relative z-10 flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm border border-line bg-paper"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 36, mass: 0.8 } }}
              exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.2, ease: EASE } }}
            >
              <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 sm:px-8">
                <div className="flex items-baseline gap-3">
                  <h2 id="all-team-title" className="font-display text-2xl font-medium text-ink">
                    Leaders & Governors
                  </h2>
                  <span className="text-xs text-ink-muted">{team.length} roles</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAll(false)}
                  className="grid h-8 w-8 place-items-center rounded-sm border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </header>

              <div className="scroll-x-clean overflow-y-auto overscroll-contain px-5 py-5 sm:px-8" data-lenis-prevent>
                {[
                  { title: 'Officers', from: 0, to: 5 },
                  { title: 'Chairs', from: 5, to: 15 },
                  { title: 'Advisers', from: 15, to: team.length }
                ].map((group) => (
                  <section key={group.title} className="mb-6 last:mb-0">
                    <h3 className="mb-3 border-b border-line pb-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted">{group.title}</h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                      {team.slice(group.from, group.to).map((person, j) => {
                        const i = group.from + j;
                        return (
                          <motion.article
                            key={person.role}
                            className="group flex flex-col overflow-hidden rounded-sm border border-line bg-white"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: EASE, delay: 0.03 * i }}
                          >
                            <div className="relative aspect-4/5 overflow-hidden bg-paper-2">
                              <a
                                href={person.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(person.role + ' ASSOCADS')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`LinkedIn profile for ${person.role}`}
                                title={`Connect with ${person.role} on LinkedIn`}
                                className="absolute left-2.5 top-2.5 z-10 grid h-6 w-6 place-items-center rounded-full bg-ink/75 text-paper backdrop-blur-sm transition-all duration-200 hover:bg-[#0A66C2] hover:text-white hover:scale-110 shadow-xs cursor-pointer"
                              >
                                <LinkedInIcon className="h-3 w-3" />
                              </a>
                              <img
                                src={photo(i)}
                                alt={`Photo for ${person.role}`}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
                              />
                            </div>
                            <div className="flex flex-1 flex-col border-t border-line px-3 py-3 text-center">
                              <h4 className="font-display text-sm font-medium leading-snug text-ink">
                                {person.role.replace('Chairman of ', '')}
                              </h4>
                              <p className="mt-1 text-xs leading-snug text-ink-muted">{person.looksAfter}</p>
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
