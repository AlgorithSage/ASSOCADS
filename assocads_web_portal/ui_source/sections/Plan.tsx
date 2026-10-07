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
    <span className={`rounded-sm border px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${STATUS_STYLE[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

/* ---------- Desktop: pinned horizontal timeline ---------- */

function HorizontalPlan() {
  const sectionRef = useRef<HTMLElement>(null);
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
  const hint = useTransform(fill, [0, 1], [1, 0]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))))));

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-page flex items-end justify-between gap-10">
          <SectionHeading eyebrow="Our first year" title={TITLE} text={INTRO} align="left" />
          {/* Live counter: which milestone is in focus */}
          <div className="hidden shrink-0 items-baseline font-display text-ink md:flex" aria-hidden="true">
            <span className="relative inline-block h-[1em] w-[1.3em] overflow-hidden text-7xl leading-none">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={active}
                  className="absolute inset-0"
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {pad(active + 1)}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="ml-2 text-2xl text-ink/30">/ {pad(n)}</span>
          </div>
        </div>

        <div className="relative mt-14 xl:mt-20">
          <motion.ol
            ref={trackRef}
            style={{ x }}
            className="relative flex w-max pl-[max(32px,calc((100vw-1200px)/2+32px))] pr-[30vw]"
          >
            {/* Rail and its progress fill run the full length of the track */}
            <span className="absolute left-0 right-0 top-[104px] h-px bg-line" aria-hidden="true" />
            <motion.span className="absolute left-0 right-0 top-[104px] h-px origin-left bg-ink" style={{ scaleX: fill }} aria-hidden="true" />

            {milestones.map((item, i) => {
              const reached = i <= active;
              return (
                <motion.li
                  key={item.when}
                  className="relative w-[360px] shrink-0 pr-14 xl:w-[400px]"
                  animate={{ opacity: reached ? 1 : 0.35 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span className="block h-[88px] font-display text-[5.5rem] leading-none text-ink/15">{pad(i + 1)}</span>
                  <span className="relative mt-4 block h-0" aria-hidden="true">
                    <motion.span
                      className="absolute -top-[7px] left-0 h-[14px] w-[14px] rounded-full border border-ink"
                      animate={{ backgroundColor: reached ? '#2E242C' : '#F6F4EF', scale: i === active ? 1.3 : 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                    {item.status === 'Now' && <span className="absolute -top-[7px] left-0 h-[14px] w-[14px] animate-ping rounded-full bg-ink/30" />}
                  </span>
                  <div className="mt-10 flex items-center gap-3">
                    <span className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{item.when}</span>
                    <StatusTag status={item.status} />
                  </div>
                  <h3 className="mt-4 text-2xl font-medium leading-tight text-ink xl:text-[1.7rem]">{item.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-ink-muted">{item.detail}</p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <div className="container-page mt-14 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ink-muted" aria-hidden="true">
          Keep scrolling
          <motion.span className="block h-px w-10 origin-left bg-ink-muted" style={{ scaleX: hint }} />
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
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{item.when}</span>
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
