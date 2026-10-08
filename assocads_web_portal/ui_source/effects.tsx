// Decorative motion effects: intro curtain, custom cursor, magnetic hover,
// cursor spotlight, scroll-speed marquee and a typing word.
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode
} from 'react';
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap
} from 'framer-motion';
import { EASE, prefersReducedMotion, setPageScrollLocked, useMediaQuery } from './motion';

/* ---------- Intro curtain ---------- */

// The curtain owns the timing; the page is told the moment it starts to lift
// so the hero entrance plays *during* the reveal instead of underneath it.
export function Preloader({ done, onDone }: { done: boolean; onDone: () => void }) {
  useEffect(() => {
    if (done) return;

    setPageScrollLocked(true);
    const t = window.setTimeout(onDone, 1800);

    return () => window.clearTimeout(t);
  }, [done, onDone]);

  useEffect(() => {
    if (done) setPageScrollLocked(false);
  }, [done]);

  const handleSkip = () => {
    onDone();
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-ink text-paper select-none"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          onClick={handleSkip}
          onTouchStart={handleSkip}
          role="button"
          aria-label="Skip introduction"
        >
          <motion.span
            className="grid h-24 w-24 place-items-center rounded-full bg-paper p-2 shadow-lg"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <img src="/logo-mark.webp" alt="" width={80} height={80} className="h-full w-full object-contain" />
          </motion.span>
          <div className="mt-6 overflow-hidden">
            <motion.p
              className="font-display text-3xl tracking-[0.01em]"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            >
              ASSOCADS
            </motion.p>
          </div>
          <motion.span
            className="mt-6 h-px w-40 origin-left bg-paper/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          />
          <span className="mt-6 text-[10px] uppercase tracking-widest text-paper/40">
            Tap anywhere to enter
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Custom cursor (fine pointers only) ---------- */

export function CustomCursor() {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!finePointer || prefersReducedMotion()) return;
    document.documentElement.classList.add('has-custom-cursor');
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest('a, button, [role="tab"], input, select, textarea, label')));
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [finePointer, x, y]);

  if (!finePointer || prefersReducedMotion()) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-90 rounded-full bg-paper mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 56 : 28, height: hovering ? 56 : 28, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-91 h-1.5 w-1.5 rounded-full bg-paper mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
    </>
  );
}

/* ---------- Magnetic hover ---------- */

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className="inline-flex w-full sm:w-auto">
      {children}
    </motion.div>
  );
}

/* ---------- Cursor spotlight on cards ---------- */

// Sets --mx / --my on the element so the `.spotlight` CSS can draw a soft glow under the cursor
export function trackSpotlight(e: ReactMouseEvent<HTMLElement>): void {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

/* ---------- Scroll-speed marquee ---------- */

interface MarqueeProps {
  items: string[];
  baseSpeed?: number;
  direction?: 1 | -1;
  variant?: 'outline' | 'solid';
  dark?: boolean;
}

// Infinite band of text; scrolling the page speeds it up and can flip its direction
export function Marquee({ items, baseSpeed = 2.2, direction = 1, variant = 'solid', dark = false }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-2000, 0, 2000], [-3, 0, 3], { clamp: false });
  const dir = useRef<number>(direction);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const reduced = prefersReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const boost = isTouch ? 0 : Math.abs(factor.get());
    const f = factor.get();
    if (!isTouch) {
      if (f < 0) dir.current = -direction;
      else if (f > 0) dir.current = direction;
    }
    const move = dir.current * baseSpeed * (delta / 1000) * (1 + boost * 0.8);
    baseX.set(baseX.get() - move);
  });

  const textClass = dark
    ? variant === 'outline'
      ? 'text-outline-white'
      : 'text-white'
    : variant === 'outline'
    ? 'text-outline'
    : 'text-ink';

  const diamondClass = dark ? 'border-white/50' : 'border-ink/60';

  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className={`whitespace-nowrap px-8 font-display text-5xl leading-none md:text-7xl ${textClass}`}>
            {item}
          </span>
          <span className={`h-3 w-3 rotate-45 border ${diamondClass}`} aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden py-6" aria-label={items.join(', ')} role="marquee">
      <motion.div className="flex w-max" style={{ x }} aria-hidden="true">
        {row}
        {row}
      </motion.div>
    </div>
  );
}

/* ---------- Typing word ---------- */

// Types each word, pauses, deletes it and moves to the next
export function TypeWord({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden);
  const reduced = prefersReducedMotion();

  // Backgrounded tabs don't need a typewriter running; pause and resume with the tab
  useEffect(() => {
    const onChange = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  useEffect(() => {
    if (reduced || hidden) return;
    const word = words[index % words.length];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === '') delay = 300;

    const t = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, words, reduced, hidden]);

  const last = words[words.length - 1];
  return (
    <span className={className}>
      <span className="sr-only">{last}</span>
      <span aria-hidden="true">
        {reduced ? last : text}
        <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] animate-[blink_1s_steps(1)_infinite] bg-current align-baseline" />
      </span>
    </span>
  );
}
