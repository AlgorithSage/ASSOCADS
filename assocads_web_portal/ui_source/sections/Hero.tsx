import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { hero, heroAudiences, contact } from '../content';
import { Magnetic, TypeWord } from '../effects';
import { EASE, EASE_INOUT, Words, scrollToId, prefersReducedMotion } from '../motion';

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

  /* Scroll: the full-bleed frame drifts down slightly while the text lifts away. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '6%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-22%']);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.7], [1, 0]);


  const enter = (delay: number, from: Record<string, number | string> = { opacity: 0, y: 24 }) => ({
    initial: from,
    animate: ready ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : from,
    transition: { duration: 0.9, ease: EASE, delay: ready ? delay : 0 }
  });


  return (
    <section ref={ref} id="top" className="relative">
      {/* Outer layer: scroll-linked camera pull-back */}
      <motion.div
        style={{ y: frameY }}
        className="will-change-transform"
      >
        {/* Inner frame: settles from a slight zoom as the curtain lifts */}
        <motion.div
          className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-paper"
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
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: T.photo }}
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
            className="container-page relative flex flex-1 flex-col justify-center pb-4 sm:pb-6 pt-20 sm:pt-24 md:pt-28"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <motion.div className="relative z-10 max-w-[46rem] lg:max-w-[54rem] [text-shadow:0_2px_18px_rgba(20,14,18,0.6)]">
              <motion.span className="eyebrow text-paper/65!" {...enter(T.eyebrow, { opacity: 0, x: -16 })}>
                {hero.eyebrow}
              </motion.span>

              <h1 className="mt-3.5 text-[1.45rem] leading-[1.12] sm:text-[1.9rem] md:text-[2.35rem] lg:text-[2.8rem]">
                <Words as="span" text={hero.titleLines[0]} onMount play={ready} delay={T.line1} className="block font-bold" />
                <span className="mt-1 block font-medium text-paper/85">
                  <Words as="span" text={hero.titleLines[1]} onMount play={ready} delay={T.line2} />
                  <motion.span className="inline-block min-h-[1.06em] whitespace-nowrap pl-2 text-paper align-bottom" {...enter(T.line2 + 0.35, { opacity: 0 })}>
                    {ready && <TypeWord words={heroAudiences} />}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                className="mt-3.5 max-w-xl text-[0.84rem] leading-relaxed text-paper/90 sm:text-[0.9rem] md:text-[0.95rem]"
                {...enter(T.intro, { opacity: 0, y: 16 })}
              >
                {hero.intro}
              </motion.p>

              <motion.div className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:flex-row" {...enter(T.cta)}>
                <Magnetic>
                  <button
                    type="button"
                    onClick={(e) => onJoin(e.currentTarget)}
                    className="btn min-h-[40px]! sm:min-h-[42px]! px-5.5! sm:px-6! text-[0.75rem]! sm:text-[0.8rem]! w-full border border-paper bg-paper text-ink hover:bg-white sm:w-auto"
                  >
                    {hero.primaryCta} <ArrowRight size={16} />
                  </button>
                </Magnetic>
                <Magnetic>
                  <a
                    href="#programs"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId('#programs');
                    }}
                    className="btn btn-on-dark min-h-[40px]! sm:min-h-[42px]! px-5.5! sm:px-6! text-[0.75rem]! sm:text-[0.8rem]! w-full backdrop-blur-sm sm:w-auto"
                  >
                    {hero.secondaryCta}
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom bar: hairline draws across, then the labels fade in */}
          <div className="container-page relative py-3 sm:py-3.5">
            <motion.span
              className="absolute inset-x-5 top-0 h-px origin-left bg-paper/15 md:inset-x-8"
              initial={{ scaleX: 0 }}
              animate={ready ? { scaleX: 1 } : undefined}
              transition={{ duration: 1.2, ease: EASE_INOUT, delay: T.bar - 0.2 }}
              aria-hidden="true"
            />
            <motion.div
              className="flex items-center justify-between text-[0.7rem] font-semibold tracking-[0.01em] text-paper/60"
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
