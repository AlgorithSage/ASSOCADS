import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { summit, SUMMIT_DATE, photos } from '../content';
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
          <div className="font-display text-4xl text-paper tabular-nums md:text-5xl">{String(value).padStart(2, '0')}</div>
          <div className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-paper/60">{label}</div>
        </div>
      ))}
    </div>
  );
}

export function Summit() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] });
  // Panel opens up to full width as it scrolls into view
  const inset = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 4]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% 0% ${i}% round ${r}px)`);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <div ref={ref} className="px-3 py-12 md:px-6">
      <motion.div style={{ clipPath }} className="relative mx-auto max-w-[1400px] overflow-hidden">
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 bg-ink"
          aria-hidden="true"
        >
          <img src={photos.summit.src} alt="" loading="lazy" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/40" />
        </motion.div>

        <div className="relative grid gap-12 px-6 py-20 md:px-16 md:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
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
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-paper/60">Time left</p>
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
      </motion.div>
    </div>
  );
}
