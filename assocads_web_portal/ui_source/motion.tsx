import { useEffect, useRef, useState, type ElementType, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform, animate, type Variants } from 'framer-motion';
import Lenis from 'lenis';

export const EASE = [0.22, 1, 0.36, 1] as const; // default: soft ease-out
export const EASE_INOUT = [0.76, 0, 0.24, 1] as const; // wipes, curtains, large moves
export const SPRING_SOFT = { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 } as const; // tilt / hover physics
const HEADER_OFFSET = -80;

/* ---------- Smooth scrolling (Lenis) ---------- */

let lenis: Lenis | null = null;

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useSmoothScroll(): void {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: HEADER_OFFSET }
    });
    lenis = instance;
    return () => {
      instance.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToId(href: string): void {
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: HEADER_OFFSET });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

export function setPageScrollLocked(locked: boolean): void {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

/* ---------- Media query ---------- */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  );
  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    onChange();
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/* ---------- Reveal on scroll ---------- */

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  left: { x: 56, y: 0 },
  right: { x: -56, y: 0 },
  none: { x: 0, y: 0 }
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  amount?: number;
}

export function Reveal({ children, className, delay = 0, direction = 'up', amount = 0.25 }: RevealProps) {
  const { x, y } = OFFSETS[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Staggered groups ---------- */

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } }
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  amount?: number;
}

export function Stagger({ children, className, amount = 0.15 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  onMouseMove?: (e: ReactMouseEvent<HTMLDivElement>) => void;
}

export function StaggerItem({ children, className, onMouseMove }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants} onMouseMove={onMouseMove}>
      {children}
    </motion.div>
  );
}

/* ---------- Word-by-word heading ---------- */

interface WordsProps {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (used in the hero). */
  onMount?: boolean;
  /** With onMount: hold the entrance until this becomes true. */
  play?: boolean;
}

export function Words({ text, className, as: Tag = 'h2', delay = 0, onMount = false, play = true }: WordsProps) {
  const words = text.split(' ');
  const trigger = onMount
    ? { animate: play ? 'shown' : 'hidden' }
    : { whileInView: 'shown', viewport: { once: true, amount: 0.6 } };
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        {...trigger}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%', rotate: 4 },
                shown: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE } }
              }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ---------- Count-up number ---------- */

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (prefersReducedMotion()) {
      node.textContent = `${value.toLocaleString('en-IN')}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest).toLocaleString('en-IN')}${suffix}`;
      }
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} aria-label={`${value.toLocaleString('en-IN')}${suffix}`}>
      0{suffix}
    </span>
  );
}

/* ---------- Tilt (physical surface feel) ---------- */

// Tilts a surface a few degrees toward the cursor. Mouse devices only; off with reduced motion.
export function useTilt(max = 3.5) {
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine)') && !prefersReducedMotion();
  const rotateX = useSpring(0, { stiffness: 170, damping: 22, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 170, damping: 22, mass: 0.6 });

  const onMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  };
  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    onMouseMove,
    onMouseLeave,
    style: enabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined
  };
}

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
  onMouseMove?: (e: ReactMouseEvent<HTMLDivElement>) => void;
}

// Wraps an existing card: tilt toward the cursor + a 3px lift. Card styling stays on the card.
export function Tilt({ children, className, max = 3.5, onMouseMove }: TiltProps) {
  const tilt = useTilt(max);
  const lift = tilt.style !== undefined;
  return (
    <motion.div
      className={className}
      style={tilt.style}
      onMouseMove={(e) => {
        tilt.onMouseMove(e);
        onMouseMove?.(e);
      }}
      onMouseLeave={tilt.onMouseLeave}
      whileHover={lift ? { y: -3 } : undefined}
      transition={SPRING_SOFT}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Depth entrance for a group ---------- */

// A whole group settles in from a slight backward tilt as it scrolls up into view.
// Scroll-linked, so it moves with the user rather than on a timer.
export function DepthIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery('(min-width: 768px)');
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.6'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const rotateX = useTransform(p, [0, 1], [wide ? 9 : 4, 0]);
  const y = useTransform(p, [0, 1], [wide ? 70 : 30, 0]);
  const scale = useTransform(p, [0, 1], [0.96, 1]);
  const opacity = useTransform(p, [0, 0.6, 1], [0.35, 0.9, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? undefined : { rotateX, y, scale, opacity, transformPerspective: 1400, transformOrigin: '50% 0%' }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Mouse wheel drives a horizontal row ---------- */

// Vertical wheel movement scrolls the row sideways; once the row hits either end,
// the wheel goes back to scrolling the page so nobody gets stuck inside it.
export function useWheelToHorizontal(ref: { current: HTMLElement | null }, deps: unknown[] = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      if ((el.scrollLeft <= 1 && delta < 0) || (el.scrollLeft >= max - 1 && delta > 0)) return;
      e.preventDefault();
      el.scrollBy({ left: delta * 1.2 });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ---------- Section divider ---------- */

// Centred break between sections: a tracked label with a rule drawing out
// symmetrically on both sides. Quiet, academic, no numbering.
export function SectionDivider({ label, dark = false }: { label: string; dark?: boolean }) {
  const rule = {
    hidden: { scaleX: 0 },
    shown: { scaleX: 1, transition: { duration: 1.2, ease: EASE, delay: 0.15 } }
  };
  return (
    <motion.div
      className="container-page flex items-center gap-6 py-6 md:gap-10 md:py-10 lg:py-12"
      role="separator"
      aria-label={label}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 1 }}
    >
      <motion.span className={`h-px flex-1 origin-right ${dark ? 'bg-paper/30' : 'bg-ink/20'}`} variants={rule} />
      <motion.span
        className={`shrink-0 text-center font-display text-lg font-medium uppercase leading-none tracking-[0.24em] ${
          dark ? 'text-paper' : 'text-ink'
        } md:text-2xl md:tracking-[0.28em] lg:text-[1.85rem]`}
        variants={{ hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
      >
        {label}
      </motion.span>
      <motion.span className={`h-px flex-1 origin-left ${dark ? 'bg-paper/30' : 'bg-ink/20'}`} variants={rule} />
    </motion.div>
  );
}

/* ---------- Section heading ---------- */

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
}

// Jumbo section heading. Internal rhythm sits on the 8pt grid (24px eyebrow→title,
// 32px title→standfirst); the standfirst is capped by measure, not by the title's width,
// so long titles can run wide while the supporting line stays readable.
export function SectionHeading({ eyebrow, title, text, align = 'center' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Words
        text={title}
        className={`${eyebrow ? 'mt-6' : ''} text-[2.75rem] font-medium leading-[1.06] tracking-[-0.02em] text-ink sm:text-6xl md:text-7xl xl:text-[5.25rem]`}
      />
      {text && (
        <Reveal delay={0.15}>
          <p className={`mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-muted md:text-xl ${centered ? 'mx-auto' : ''}`}>
            {text}
          </p>
        </Reveal>
      )}
    </div>
  );
}
