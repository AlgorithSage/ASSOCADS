import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { summit, SUMMIT_DATE } from '../content';
import { Reveal, Words, scrollToId } from '../motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

function getTimeLeft(): TimeLeft {
  const ms = Math.max(0, new Date(SUMMIT_DATE).getTime() - Date.now());
  const minutes = Math.floor(ms / 60000);
  return { days: Math.floor(minutes / 1440), hours: Math.floor((minutes % 1440) / 60), minutes: minutes % 60 };
}

function Countdown() {
  const [left, setLeft] = useState<TimeLeft>(getTimeLeft);
  useEffect(() => {
    const id = window.setInterval(() => setLeft(getTimeLeft()), 30000);
    return () => window.clearInterval(id);
  }, []);
  const parts: [string, number][] = [
    ['Days', left.days],
    ['Hours', left.hours],
    ['Minutes', left.minutes]
  ];
  return (
    <div className="flex gap-3" aria-label={`${left.days} days, ${left.hours} hours and ${left.minutes} minutes to go`}>
      {parts.map(([label, value]) => (
        <div key={label} className="min-w-22 border border-paper/20 px-4 py-4 text-center">
          <div className="font-display text-4xl text-paper lining-nums tabular-nums md:text-5xl">{String(value).padStart(2, '0')}</div>
          <div className="mt-1 text-[0.68rem] tracking-[0.01em] text-paper/60">{label}</div>
        </div>
      ))}
    </div>
  );
}

export function Summit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // A huge, faint "2027" drifts slowly behind the content: texture without a photo,
  // so nothing competes with the section colour or leaves a visible edge.
  const bgX = useTransform(scrollYProgress, [0, 1], ['4%', '-8%']);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.span
        style={{ x: bgX }}
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(12rem,32vw,30rem)] leading-none text-paper/[0.04]"
        aria-hidden="true"
      >
        2027
      </motion.span>
      <div className="relative mx-auto max-w-[1400px]">

        <div className="relative grid gap-12 px-6 pb-20 pt-0 md:px-16 md:pb-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <span className="eyebrow text-paper/60!">Save the date</span>
            </Reveal>
            <Words text={summit.title} className="mt-5 text-4xl font-medium text-paper md:text-6xl" />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-lg text-paper/75">{summit.text}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-paper/85">
                <span className="flex items-center gap-2">
                  <Calendar size={18} strokeWidth={1.5} /> {summit.date}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} strokeWidth={1.5} /> {summit.place}
                </span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.25} direction="left">
            <p className="mb-4 text-xs font-semibold tracking-[0.01em] text-paper/60">Time left</p>
            <Countdown />
            <a
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('#events');
              }}
              className="btn btn-on-dark mt-8"
            >
              See all events
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
