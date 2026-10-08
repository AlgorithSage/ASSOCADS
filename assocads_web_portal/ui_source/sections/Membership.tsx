import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
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
    <div className="relative section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing & Membership"
          title="Choose a plan to start your journey"
          text="Transparent annual fees designed for students, working practitioners, and institutions. Scholarships available for applicants with financial need."
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
                className={`relative px-4 pb-3 pt-2 text-xs font-semibold tracking-[0.01em] transition-colors sm:px-8 sm:text-sm sm:tracking-[0.01em] ${
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
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.01em] text-ink-muted">
            <span>Viewing {list.length} {group === 'individuals' ? 'individual' : group === 'organisations' ? 'institutional' : 'honorary'} plans</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-sans lining-nums tabular-nums font-medium text-ink/40">
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
                className="scroll-x-clean -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-8 pt-12 md:-mx-8 md:px-8 scroll-smooth"
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
                    className={`relative flex w-72 shrink-0 snap-start first:ml-auto last:mr-auto flex-col rounded-xl border transition-all duration-300 sm:w-80 lg:w-[22rem] px-6 py-6 md:px-7 ${
                      tier.highlight
                        ? 'border-ink bg-ink text-paper'
                        : 'border-line/90 bg-white text-ink hover:border-ink/60 hover:-translate-y-1'
                    }`}
                  >
                    {tier.highlight && (
                      // Tab cut from the card itself: same ink, same border, same corner radius
                      <div className="absolute -top-8 right-8 flex h-8 items-center rounded-t-xl border border-b-0 border-ink bg-ink px-4 text-xs font-medium text-paper">
                        Most chosen
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-medium">{tier.name}</h3>
                        <p className={`mt-1 min-h-[2.25rem] text-xs leading-snug ${tier.highlight ? 'text-paper/70' : 'text-ink-muted'}`}>
                          {tier.forWho}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 border-y py-3.5" style={{ borderColor: tier.highlight ? 'rgba(246,244,239,0.15)' : 'rgba(46,36,44,0.08)' }}>
                      <p className="whitespace-nowrap font-display text-[1.45rem] font-medium tracking-tight md:text-[1.6rem]">{tier.price}</p>
                      <p className={`mt-0.5 text-xs ${tier.highlight ? 'text-paper/60' : 'text-ink-muted'}`}>
                        {tier.period}
                      </p>
                    </div>

                    <div className="mt-4 flex-1">
                      <p className={`text-[0.7rem] font-semibold tracking-[0.01em] ${tier.highlight ? 'text-paper/50' : 'text-ink-muted'}`}>
                        What you get
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {/* Included perks (checkmarks) */}
                        {tier.perks.map((perk) => (
                          <li key={perk} className={`flex items-start gap-2.5 text-[0.85rem] leading-snug ${tier.highlight ? 'text-paper/95' : 'text-ink-soft'}`}>
                            <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${tier.highlight ? 'bg-paper/15 text-paper' : 'bg-ink/8 text-ink'}`}>
                              <Check size={11} strokeWidth={2.5} />
                            </span>
                            <span>{perk}</span>
                          </li>
                        ))}

                        {/* Excluded perks for comparative tier clarity (crosses) */}
                        {tier.excludedPerks && tier.excludedPerks.map((perk) => (
                          <li key={perk} className={`flex items-start gap-2.5 text-xs leading-relaxed sm:text-sm opacity-40 line-through ${tier.highlight ? 'text-paper/50' : 'text-ink/50'}`}>
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs font-sans lining-nums tabular-nums font-bold">
                              ✕
                            </span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => onJoin(tier.name, e.currentTarget)}
                      className={`btn mt-5 min-h-11! w-full justify-center py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                        tier.highlight
                          ? 'border border-paper bg-paper text-ink hover:bg-white'
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

        {/* Benefits every member gets, as a bento: a large ink intro tile and ten
            icon tiles (two of them wide) that invert to ink on hover. */}
        {/* Ten benefits: five left, the summary card in the middle, five right.
            Each side column is a flex stack whose tiles share the height equally,
            so both columns end exactly where the centre card ends. */}
        <motion.div
          className="mt-24 grid gap-4 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-stretch"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.1 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }}
        >
          {[0, 1].map((side) => (
            <div key={side} className={`flex flex-col gap-4 ${side === 0 ? 'lg:order-1' : 'lg:order-3'}`}>
              {memberBenefits.slice(side * 5, side * 5 + 5).map(({ title, text, icon: Icon }) => (
                <motion.article
                  key={title}
                  className="draw-border group flex flex-1 items-start gap-4 rounded-sm border border-line bg-white px-5 py-5 transition-shadow duration-500 hover:shadow-[0_20px_40px_-28px_rgba(46,36,44,0.5)]"
                  variants={{
                    hidden: { opacity: 0, x: side === 0 ? -20 : 20 },
                    shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
                  }}
                >
                  {['db-t', 'db-r', 'db-b', 'db-l'].map((edge) => (
                    <span key={edge} className={`db ${edge}`} aria-hidden="true" />
                  ))}
                  <Icon size={22} strokeWidth={1.25} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                  <div>
                    <h4 className="font-display text-base font-medium leading-snug text-ink">{title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          ))}

          <motion.div
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-sm bg-ink px-8 py-14 text-center text-paper lg:order-2 md:px-12"
            variants={{ hidden: { opacity: 0, scale: 0.96 }, shown: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } } }}
          >
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[18rem] leading-none text-paper/[0.05]"
              aria-hidden="true"
            >
              10
            </span>
            <span className="relative inline-flex items-center gap-2 text-sm text-paper/65">
              <ShieldCheck size={15} /> Included with every plan
            </span>
            <h3 className="relative mt-5 font-display text-4xl font-medium leading-[1.06] md:text-5xl">
              Ten things every member gets
            </h3>
            <span className="relative mt-8 block h-px w-12 bg-paper/30" aria-hidden="true" />
            <p className="relative mt-8 max-w-xs leading-relaxed text-paper/75">
              It does not matter which plan you pick. A student paying ₹500 gets all ten of these, the same as a company.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
