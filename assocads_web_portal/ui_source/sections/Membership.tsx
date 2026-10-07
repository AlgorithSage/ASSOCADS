import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { tierGroups, tiers, memberBenefits } from '../content';
import type { TierGroup } from '../types';
import { DepthIn, EASE, Reveal, SectionHeading } from '../motion';

interface MembershipProps {
  onJoin: (tierName: string, from?: HTMLElement | null) => void;
}

export function Membership({ onJoin }: MembershipProps) {
  const [group, setGroup] = useState<TierGroup>('individuals');
  const [direction, setDirection] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);

  const choose = (next: TierGroup) => {
    const order = tierGroups.map((g) => g.id);
    setDirection(order.indexOf(next) >= order.indexOf(group) ? 1 : -1);
    setGroup(next);
    setActiveCardIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const cardWidth = 360;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveCardIndex(index);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [group]);

  const slide = (dir: 'left' | 'right') => {
    if (trackRef.current) {
      const amount = trackRef.current.clientWidth * 0.75;
      trackRef.current.scrollBy({
        left: dir === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  const list = tiers[group];

  return (
    <section id="membership" className="relative section-pad">
      <div className="container-page">
        <SectionHeading
          title="Pick the membership that fits you"
          text="Fees are yearly unless stated. Students pay the least, and scholarships are available for those who need them."
        />

        {/* Category Tabs */}
        <Reveal className="mt-12 flex justify-center">
          <div role="tablist" aria-label="Membership type" className="inline-flex border-b border-line">
            {tierGroups.map((g) => (
              <button
                key={g.id}
                role="tab"
                type="button"
                aria-selected={group === g.id}
                aria-controls="tier-panel"
                onClick={() => choose(g.id)}
                className={`relative px-4 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors sm:px-8 sm:text-sm sm:tracking-[0.14em] ${
                  group === g.id ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {group === g.id && (
                  <motion.span
                    layoutId="tier-pill"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-ink"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{g.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Minimalistic Slider Navigation Header */}
        <div className="mt-8 flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
            <span>Viewing {list.length} {group === 'individuals' ? 'individual' : group === 'organisations' ? 'institutional' : 'honorary'} plans</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-ink/40">
              {String(activeCardIndex + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => slide('left')}
              disabled={!canScrollLeft}
              aria-label="Previous plan"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
                canScrollLeft
                  ? 'border-ink text-ink hover:bg-ink hover:text-paper shadow-sm active:scale-95'
                  : 'border-line text-ink/25 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => slide('right')}
              disabled={!canScrollRight}
              aria-label="Next plan"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
                canScrollRight
                  ? 'border-ink text-ink hover:bg-ink hover:text-paper shadow-sm active:scale-95'
                  : 'border-line text-ink/25 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Cards Track with smooth native horizontal swipe without mouse-wheel hijacking */}
        <DepthIn>
          <div id="tier-panel" role="tabpanel" className="mt-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={group}
                custom={direction}
                ref={trackRef}
                className="scroll-x-clean -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-8 pt-4 md:-mx-8 md:px-8 scroll-smooth"
                initial="hidden"
                animate="shown"
                exit="gone"
                variants={{
                  hidden: (d: number) => ({ opacity: 0, x: d * 30 }),
                  shown: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE, staggerChildren: 0.06 } },
                  gone: (d: number) => ({ opacity: 0, x: d * -30, transition: { duration: 0.25, ease: EASE } })
                }}
              >
                {list.map((tier) => (
                  <motion.article
                    key={tier.name}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }
                    }}
                    className={`relative flex w-80 shrink-0 snap-start flex-col rounded-xl border transition-all duration-300 sm:w-88 lg:w-96 p-8 md:p-9 ${
                      tier.highlight
                        ? 'border-ink bg-ink text-paper shadow-[0_24px_50px_-20px_rgba(46,36,44,0.55)] ring-1 ring-ink'
                        : 'border-line/90 bg-white text-ink hover:border-ink/60 hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {tier.highlight && (
                      <div className="absolute -top-3 left-8 flex items-center gap-1.5 rounded-full border border-paper/30 bg-ink px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-paper shadow-md">
                        <Sparkles size={11} className="text-amber-300" />
                        <span>Most chosen</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-semibold md:text-3xl">{tier.name}</h3>
                        <p className={`mt-1.5 min-h-[2.5rem] text-xs leading-relaxed ${tier.highlight ? 'text-paper/70' : 'text-ink-muted'}`}>
                          {tier.forWho}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-y py-5" style={{ borderColor: tier.highlight ? 'rgba(246,244,239,0.15)' : 'rgba(46,36,44,0.08)' }}>
                      <p className="font-display text-3xl font-medium tracking-tight md:text-4xl">{tier.price}</p>
                      <p className={`mt-1 text-xs uppercase tracking-wider ${tier.highlight ? 'text-paper/60' : 'text-ink-muted'}`}>
                        {tier.period}
                      </p>
                    </div>

                    <div className="mt-6 flex-1">
                      <p className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${tier.highlight ? 'text-paper/50' : 'text-ink-muted'}`}>
                        Key deliverables & perks:
                      </p>
                      <ul className="mt-3.5 space-y-3">
                        {tier.perks.map((perk) => (
                          <li key={perk} className={`flex items-start gap-3 text-xs leading-relaxed sm:text-sm ${tier.highlight ? 'text-paper/90' : 'text-ink-soft'}`}>
                            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${tier.highlight ? 'bg-paper/20 text-paper' : 'bg-paper-2 text-ink'}`}>
                              <Check size={11} strokeWidth={2.5} />
                            </span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => onJoin(tier.name, e.currentTarget)}
                      className={`btn mt-8 w-full justify-center py-3 text-xs sm:text-sm ${
                        tier.highlight
                          ? 'btn-on-dark shadow-md'
                          : 'btn-primary'
                      }`}
                    >
                      <span>{tier.price.startsWith('By') ? 'Suggest someone' : `Join as ${tier.name.toLowerCase()}`}</span>
                      <ArrowRight size={15} />
                    </button>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Slider track dots indicator */}
            <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
              {list.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeCardIndex === i ? 'w-6 bg-ink' : 'w-2 bg-ink/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </DepthIn>

        {/* 1. Improved UI: Benefits shared by every membership */}
        <div className="mt-24 rounded-2xl border border-line/80 bg-white p-8 shadow-sm md:p-12 lg:p-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink">
                <ShieldCheck size={13} />
                <span>Universal Trust Guarantee</span>
              </div>
              <h3 className="mt-3 text-3xl font-medium text-ink md:text-4xl">
                Ten things every member gets
              </h3>
            </Reveal>
            <p className="max-w-md text-sm text-ink-muted leading-relaxed">
              Every single membership tier includes full institutional backing, academic resources, statewide networking, and career pathways.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {memberBenefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                className="group flex items-start gap-4 rounded-xl border border-line/60 bg-paper/60 p-4 sm:p-5 transition-all duration-300 hover:border-ink/50 hover:bg-white hover:shadow-md"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 2) * 0.06 }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-paper font-mono text-xs font-semibold shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-medium text-ink leading-snug group-hover:text-ink transition-colors">
                    {benefit}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Full access across chapters, conferences, and digital portals.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
