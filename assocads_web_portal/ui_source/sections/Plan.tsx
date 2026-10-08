import { useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { milestones } from '../content';
import type { MilestoneStatus } from '../types';
import { EASE, SectionHeading, Stagger, StaggerItem, prefersReducedMotion, useMediaQuery } from '../motion';

const TITLE = 'The plan, month by month';
const INTRO = 'We are in month two. Here is what we have done and what comes next.';
const pad = (n: number) => String(n).padStart(2, '0');

const STATUS_LABEL: Record<MilestoneStatus, string> = { Done: 'Done', Now: 'Happening now', Next: 'Next', Later: 'Later' };
const STATUS_STYLE: Record<MilestoneStatus, string> = {
  Done: 'border-ink text-ink',
  Now: 'border-ink bg-ink text-paper',
  Next: 'border-ink/40 text-ink',
  Later: 'border-line text-ink-muted'
};

function StatusTag({ status }: { status: MilestoneStatus }) {
  return (
    <span className={`rounded-sm border px-2 py-0.5 text-[0.68rem] font-semibold tracking-[0.01em] ${STATUS_STYLE[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

/* ---------- Desktop: pinned horizontal timeline ---------- */

function HorizontalPlan() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const n = milestones.length;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))))));

  const nowIndex = Math.max(0, milestones.findIndex((m) => m.status === 'Now'));

  // The whole view is pinned while you scroll: a compact heading row with a live progress
  // readout, and a row of milestone cards that slides sideways. Sized from the screen height
  // (flex column, cards take the leftover space), so nothing ever runs off the bottom.
  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh - 6rem + ${distance}px)` }}>
      <div className="sticky top-24 flex h-[calc(100vh-6rem)] flex-col overflow-hidden pb-6">
        <div className="flex min-h-0 flex-1 flex-col">
        {/* Heading row */}
        <div className="container-page flex w-full items-end justify-between gap-10 border-b border-line pb-6">
          <div>
            <p className="text-sm text-ink-muted">Our first year</p>
            <h2 className="mt-2 font-display text-[2.6rem] font-medium leading-[1.05] text-ink xl:text-[3.25rem]">{TITLE}</h2>
            <p className="mt-3 max-w-xl text-ink-muted">{INTRO}</p>
          </div>

          {/* Progress readout */}
          <div className="w-60 shrink-0" aria-hidden="true">
            <div className="flex items-baseline justify-between">
              <span className="relative inline-block overflow-hidden font-display text-5xl leading-[1.12] text-ink">
                <span className="invisible">00</span>
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={active}
                    className="absolute inset-0 flex items-center"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    {pad(active + 1)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-sm text-ink-muted">of {pad(n)}</span>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
              <motion.div className="h-full origin-left rounded-full bg-ink" style={{ scaleX: fill }} />
            </div>
            <p className="mt-2 text-sm text-ink-muted">
              We are at <span className="text-ink">{milestones[nowIndex].when}</span>
            </p>
          </div>
        </div>

        {/* Timeline fills the remaining height */}
        <div className="relative mt-10 xl:mt-12">
          <motion.ol
            ref={trackRef}
            style={{ x }}
            className="relative flex w-max items-stretch gap-6 px-[max(32px,calc((100vw-1200px)/2+32px))]"
          >
            {/* Rail behind the step markers, with a fill that follows your scroll */}
            <span className="absolute left-[max(32px,calc((100vw-1200px)/2+32px))] right-[max(32px,calc((100vw-1200px)/2+32px))] top-4 h-px bg-line" aria-hidden="true" />
            <motion.span className="absolute left-[max(32px,calc((100vw-1200px)/2+32px))] right-[max(32px,calc((100vw-1200px)/2+32px))] top-4 h-px origin-left bg-ink" style={{ scaleX: fill }} aria-hidden="true" />

            {milestones.map((item, i) => {
              const reached = i <= active;
              const focused = i === active;
              const isNow = item.status === 'Now';
              return (
                <motion.li
                  key={item.when}
                  className="relative flex w-84 shrink-0 flex-col xl:w-92"
                  animate={{ opacity: reached || isNow ? 1 : 0.55, y: focused ? -6 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* Step marker: a faint skeleton until you reach it, then the outer ring draws
                      itself around the number and the centre fills in */}
                  <span className="relative z-10 grid h-11 w-11 -translate-x-1.5 -translate-y-1.5 place-items-center bg-paper">
                    <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                      <circle cx="22" cy="22" r="20.5" fill="none" stroke="rgba(46,36,44,0.14)" strokeWidth="1" strokeDasharray="2 3" />
                      <motion.circle
                        cx="22"
                        cy="22"
                        r="20.5"
                        fill="none"
                        stroke="#2E242C"
                        strokeWidth="1.25"
                        initial={false}
                        animate={{ pathLength: reached ? 1 : 0, opacity: reached ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                      />
                    </svg>
                    <motion.span
                      className="relative grid h-7.75 w-7.75 place-items-center rounded-full border text-xs lining-nums tabular-nums"
                      initial={false}
                      animate={{
                        backgroundColor: reached ? '#2E242C' : 'rgba(46,36,44,0)',
                        borderColor: reached ? '#2E242C' : 'rgba(46,36,44,0.18)',
                        color: reached ? '#F6F4EF' : 'rgba(46,36,44,0.35)',
                        scale: focused ? 1.08 : 1
                      }}
                      transition={{ duration: 0.45, ease: EASE, delay: reached ? 0.15 : 0 }}
                    >
                      {pad(i + 1)}
                    </motion.span>
                    {isNow && <span className="absolute inset-0 animate-ping rounded-full border border-ink/30" aria-hidden="true" />}
                  </span>

                  <article
                    className={`mt-3 flex flex-1 flex-col rounded-sm border p-6 transition-colors duration-500 ${
                      isNow ? 'border-ink bg-ink' : focused ? 'border-ink bg-white' : 'border-line bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-sm font-medium ${isNow ? 'text-paper' : 'text-ink'}`}>{item.when}</span>
                      <span
                        className={`rounded-sm border px-2 py-0.5 text-xs ${
                          isNow ? 'border-paper/40 text-paper' : item.status === 'Done' ? 'border-ink text-ink' : 'border-line text-ink-muted'
                        }`}
                      >
                        {STATUS_LABEL[item.status]}
                      </span>
                    </div>
                    <h3 className={`mt-4 font-display text-[1.45rem] font-medium leading-tight ${isNow ? 'text-paper' : 'text-ink'}`}>
                      {item.title}
                    </h3>
                    <p className={`mt-3 text-[0.95rem] leading-relaxed ${isNow ? 'text-paper/75' : 'text-ink-muted'}`}>{item.detail}</p>
                  </article>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
        </div>

        <div className="container-page mt-6 flex w-full items-center justify-between text-sm text-ink-muted" aria-hidden="true">
          <span>Keep scrolling to move through the year</span>
          <span>
            {milestones[0].when} to {milestones[n - 1].when}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile / reduced motion: vertical list ---------- */

function VerticalPlan() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <SectionHeading eyebrow="Our first year" title={TITLE} text={INTRO} align="left" />
        <Stagger className="relative mt-12 border-l border-line pl-8">
          {milestones.map((item, i) => (
            <StaggerItem key={item.when} className="relative pb-10 last:pb-0">
              <span
                className={`absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border border-ink ${
                  item.status === 'Done' || item.status === 'Now' ? 'bg-ink' : 'bg-paper'
                }`}
                aria-hidden="true"
              />
              <span className="font-display text-sm text-ink/40">{pad(i + 1)}</span>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm font-semibold tracking-[0.01em] text-ink">{item.when}</span>
                <StatusTag status={item.status} />
              </div>
              <h3 className="mt-3 text-xl font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-ink-muted">{item.detail}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

export function Plan() {
  const wide = useMediaQuery('(min-width: 1024px)');
  return wide && !prefersReducedMotion() ? <HorizontalPlan /> : <VerticalPlan />;
}
