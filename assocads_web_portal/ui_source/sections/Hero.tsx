import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, Calendar } from 'lucide-react';
import { hero, events, heroAudiences, contact } from '../content';
import { Magnetic, TypeWord } from '../effects';
import { EASE, EASE_INOUT, Words, scrollToId, useMediaQuery, prefersReducedMotion } from '../motion';

interface HeroProps {
  onJoin: (from?: HTMLElement | null) => void;
  /** True once the intro curtain starts lifting; the entrance is held until then. */
  ready: boolean;
}

// Entrance timing (seconds after the curtain starts lifting): one coordinated sequence
const T = { frame: 0, photo: 0.15, eyebrow: 0.35, line1: 0.42, line2: 0.6, intro: 0.85, cta: 0.95, pill: 1.05, bar: 1.2 };

export function Hero({ onJoin, ready }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();
  // The 3D pull-back is the most expensive effect (perspective + rotateX forces a large
  // GPU layer); skip it below tablet width, where it's least visible and most likely to jank.
  const allowTilt = useMediaQuery('(min-width: 768px)') && !reduced;

  /* Scroll: camera pulls back. Frame recedes and tips away, photo drifts slower than text. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, allowTilt ? 0.93 : 1]);
  const frameTilt = useTransform(scrollYProgress, [0, 1], [0, allowTilt ? 7 : 0]);
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '6%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-22%']);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.7], [1, 0]);


  const enter = (delay: number, from: Record<string, number | string> = { opacity: 0, y: 24 }) => ({
    initial: from,
    animate: ready ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : from,
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 }
  });

  const nextEvent = events[0];

  return (
    <section ref={ref} id="top" className="relative px-3 pt-3 md:px-5 md:pt-5">
      {/* Outer layer: scroll-linked camera pull-back */}
      <motion.div
        style={{ scale: frameScale, rotateX: frameTilt, y: frameY, transformPerspective: 1600, transformOrigin: '50% 100%' }}
        className="will-change-transform"
      >
        {/* Inner frame: settles from a slight zoom as the curtain lifts */}
        <motion.div
          className="relative isolate flex min-h-[calc(100svh-24px)] flex-col overflow-hidden rounded-sm bg-ink text-paper md:min-h-[calc(100svh-40px)]"
          initial={reduced ? false : { scale: 1.04 }}
          animate={ready ? { scale: 1 } : undefined}
          transition={{ duration: 1.4, ease: EASE_INOUT, delay: T.frame }}
        >
          {/* Background photo: main shape sits on the right. Static (no parallax/zoom) by design. */}
          <div className="absolute inset-0 -z-20" aria-hidden="true">
            <motion.img
              src="/images/hero-photo.webp"
              srcSet="/images/hero-photo-sm.webp 900w, /images/hero-photo.webp 1400w"
              sizes="100vw"
              alt=""
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[65%_center]"
              initial={{ opacity: 0, filter: 'blur(14px)' }}
              animate={ready ? { opacity: 1, filter: 'blur(0px)' } : undefined}
              transition={{ duration: 1.6, ease: EASE, delay: T.photo }}
            />
          </div>
          {/* No overlay behind the headline: the text sits straight on the photo.
              Only the very bottom edge is eased, so the footer bar stays legible. */}
          {/* Even 20% ink tint across the whole photo */}
          <div className="absolute inset-0 -z-10 bg-ink/40" aria-hidden="true" />
          <div
            className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-ink/70 to-transparent"
            aria-hidden="true"
          />

          <motion.div
            className="container-page relative flex flex-1 flex-col justify-center pb-10 pt-32 md:pt-36"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <motion.div className="relative z-10 max-w-[40rem] [text-shadow:0_2px_18px_rgba(20,14,18,0.6)]">
              <motion.span className="eyebrow text-paper/65!" {...enter(T.eyebrow, { opacity: 0, x: -16 })}>
                {hero.eyebrow}
              </motion.span>

              <h1 className="mt-6 text-[2.05rem] leading-[1.06] sm:text-[2.55rem] md:text-[3.2rem] lg:text-[3.85rem]">
                <Words as="span" text={hero.titleLines[0]} onMount play={ready} delay={T.line1} className="block font-bold" />
                <span className="block font-medium text-paper/80">
                  <Words as="span" text={hero.titleLines[1]} onMount play={ready} delay={T.line2} />
                  <motion.span className="block min-h-[1.06em] whitespace-nowrap text-paper" {...enter(T.line2 + 0.35, { opacity: 0 })}>
                    {ready && <TypeWord words={heroAudiences} />}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                className="mt-6 max-w-lg text-base text-paper/90 md:text-[1.06rem]"
                {...enter(T.intro, { opacity: 0, y: 20, filter: 'blur(6px)' })}
              >
                {hero.intro}
              </motion.p>

              <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" {...enter(T.cta)}>
                <Magnetic>
                  <button
                    type="button"
                    onClick={(e) => onJoin(e.currentTarget)}
                    className="btn min-h-[43px]! px-6! text-[0.7rem]! w-full border border-paper bg-paper text-ink hover:bg-white sm:w-auto"
                  >
                    {hero.primaryCta} <ArrowRight size={18} />
                  </button>
                </Magnetic>
                <Magnetic>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId('#programs');
                    }}
                    className="btn btn-on-dark min-h-[43px]! px-6! text-[0.7rem]! w-full backdrop-blur-sm sm:w-auto"
                  >
                    {hero.secondaryCta}
                  </a>
                </Magnetic>
              </motion.div>

              <motion.a
                href="#events"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('#events');
                }}
                className="group mt-10 flex w-fit max-w-full items-center gap-3 rounded-sm border border-paper/15 bg-paper/10 py-1.5 pl-1.5 pr-4 text-left text-xs backdrop-blur-md transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-paper/40"
                {...enter(T.pill, { opacity: 0, y: 16 })}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:scale-105">
                  <Calendar size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.68rem] text-paper/75">Next event · {nextEvent.date}</span>
                  <span className="block truncate font-medium text-paper">{nextEvent.title}</span>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Bottom bar: hairline draws across, then the labels fade in */}
          <div className="container-page relative py-5">
            <motion.span
              className="absolute inset-x-5 top-0 h-px origin-left bg-paper/15 md:inset-x-8"
              initial={{ scaleX: 0 }}
              animate={ready ? { scaleX: 1 } : undefined}
              transition={{ duration: 1.2, ease: EASE_INOUT, delay: T.bar - 0.2 }}
              aria-hidden="true"
            />
            <motion.div
              className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-paper/60"
              {...enter(T.bar, { opacity: 0, y: 8 })}
            >
              <span className="hidden sm:inline">{contact.address}</span>
              <button
                type="button"
                onClick={() => scrollToId('#about')}
                className="group ml-auto flex items-center gap-3 transition-colors hover:text-paper"
              >
                Scroll to explore
                <motion.span
                  className="grid h-8 w-8 place-items-center rounded-full border border-paper/30 transition-colors duration-300 group-hover:border-paper"
                  animate={reduced ? undefined : { y: [0, 4, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  <ArrowDown size={14} />
                </motion.span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
