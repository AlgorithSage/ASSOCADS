import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { events } from '../content';
import type { EventKind } from '../types';
import { DepthIn, EASE, Reveal, SectionHeading, Tilt } from '../motion';

type Filter = 'All' | EventKind;
const FILTERS: Filter[] = ['All', 'Conference', 'Workshop', 'Hackathon', 'Teacher training', 'Summit'];

interface EventsProps {
  onRegister: (from?: HTMLElement | null) => void;
}

export function Events({ onRegister }: EventsProps) {
  const [filter, setFilter] = useState<Filter>('All');
  const shown = filter === 'All' ? events : events.filter((e) => e.kind === filter);

  return (
    <div className="section-pad">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading title="Coming up" text="Workshops, competitions and training. Members get first access." align="left" />
          <Reveal direction="left" className="lg:shrink-0">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`border px-4 py-2 text-xs font-semibold tracking-[0.01em] transition-colors ${
                    filter === f ? 'border-ink bg-ink text-paper' : 'border-line text-ink-muted hover:text-ink'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <DepthIn>
        <motion.ul layout className="mt-12 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((ev, i) => (
              <motion.li
                key={ev.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.1 }}
              >
                <Tilt className="h-full" max={2.5}>
                <article className="card group flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-ink hover:shadow-[0_24px_50px_-30px_rgba(46,36,44,0.5)]">
                  <div className="relative aspect-16/8 overflow-hidden bg-paper-2">
                    <img
                      src={ev.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 bg-paper px-3 py-1.5 font-display text-sm text-ink">{ev.date}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="border border-line px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.01em] text-ink-soft">{ev.kind}</span>
                    <span className="text-xs font-semibold text-ink">{ev.status}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-ink md:text-2xl">{ev.title}</h3>
                  <p className="mt-3 flex-1 text-ink-muted">{ev.summary}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                    <div className="space-y-1 text-sm text-ink-soft">
                      <p className="flex items-center gap-2">
                        <MapPin size={15} className="text-ink" /> {ev.place}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => onRegister(e.currentTarget)}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                      aria-label={`Register for ${ev.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                  </div>
                </article>
                </Tilt>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        </DepthIn>
      </div>
    </div>
  );
}
