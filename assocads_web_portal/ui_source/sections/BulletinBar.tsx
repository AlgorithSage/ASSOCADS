import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { bulletins } from '../content';
import { EASE, prefersReducedMotion } from '../motion';

const CYCLE_MS = 5500;

export function BulletinBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number>(0);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % bulletins.length);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    timerRef.current = window.setInterval(advance, CYCLE_MS);
    return () => window.clearInterval(timerRef.current);
  }, [paused, advance]);

  return (
    <div
      className="relative z-70 border-b border-ink/10 bg-[#2E242C]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="status"
      aria-live="polite"
      aria-label="Latest bulletins"
    >
      <div className="container-page flex h-9 items-center gap-3 overflow-hidden text-sm">
        {/* Badge */}
        <span className="flex shrink-0 items-center gap-1.5 border-r border-paper/15 pr-3">
          <Bell size={12} strokeWidth={2} className="text-paper/70" />
          <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-paper/80">
            Bulletin
          </span>
        </span>

        {/* Cycling text */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="whitespace-nowrap text-[0.8rem] text-paper/80"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {bulletins[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          {bulletins.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? 'w-4 bg-paper/70' : 'w-1 bg-paper/30 hover:bg-paper/50'
              }`}
              aria-label={`Bulletin ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
