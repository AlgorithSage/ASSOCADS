import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { stats, mission, aboutPoints, photos } from '../content';
import { CountUp, EASE, Reveal, Stagger, StaggerItem } from '../motion';
import { RevealImage } from './Gallery';

function HighlightWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  );
}

// Each word lights up as the paragraph moves through the screen
function ScrollHighlight({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p
      ref={ref}
      className="font-display text-3xl font-normal leading-[1.2] text-ink md:text-[2.6rem] xl:text-5xl"
      aria-label={text}
    >
      <span aria-hidden="true">
        {words.map((word, i) => {
          const start = i / words.length;
          return <HighlightWord key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[start, start + 1 / words.length]} />;
        })}
      </span>
    </p>
  );
}

// Year-one targets: big airy numerals, hairlines that draw between columns, ink fill on hover
function Stats() {
  return (
    <div>
      <div className="flex items-end justify-between border-b border-ink pb-4">
        <Reveal>
          <span className="eyebrow">Year-one targets</span>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="text-[0.7rem] font-semibold tracking-[0.01em] text-ink-muted">2026–2027</span>
        </Reveal>
      </div>
      <motion.ul
        className="grid grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: false, amount: 0.4 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
      >
        {stats.map((stat, i) => (
          <motion.li
            key={stat.name}
            className="group relative isolate px-5 pb-8 pt-7 md:px-8 md:pb-10 md:pt-9"
            variants={{
              hidden: { opacity: 0, y: 30 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
            }}
          >
            {/* hover fill rises from the bottom */}
            <span
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out-soft group-hover:scale-y-100"
              aria-hidden="true"
            />
            {/* divider draws downward (left edge of every column except the first in each row) */}
            {i > 0 ? (
              <motion.span
                className={`absolute left-0 top-0 h-full w-px origin-top bg-line ${i === 2 ? 'hidden lg:block' : ''}`}
                variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1, transition: { duration: 1.1, ease: EASE } } }}
                aria-hidden="true"
              />
            ) : null}
            <div className="flex items-baseline justify-between text-[0.7rem] font-semibold tracking-[0.01em] text-ink-muted transition-colors duration-500 group-hover:text-paper/60">
              <span>{stat.name}</span>
              <span className="font-display text-sm tracking-normal">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="mt-6 font-display text-4xl leading-none lining-nums tabular-nums text-ink transition-[color,transform] duration-500 ease-out-soft group-hover:-translate-y-1 group-hover:text-paper md:text-5xl xl:text-6xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </div>
            {/* meter fills as the number counts up */}
            <span className="mt-6 block h-px w-full bg-line transition-colors duration-500 group-hover:bg-paper/20" aria-hidden="true">
              <motion.span
                className="block h-px origin-left bg-ink transition-colors duration-500 group-hover:bg-paper"
                variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 1.8, ease: EASE, delay: 0.2 } } }}
              />
            </span>
            <p className="mt-4 max-w-[22ch] text-[0.95rem] leading-snug text-ink-muted transition-colors duration-500 group-hover:text-paper/75">
              {stat.label}
            </p>
          </motion.li>
        ))}
      </motion.ul>
      <span className="block h-px w-full bg-line" aria-hidden="true" />
    </div>
  );
}

export function About() {
  return (
    <div className="relative section-pad">
      <div className="container-page">
        <Stats />

        {/* Intro: one centred statement across the full width, sitting above the photo row */}
        <Reveal className="mx-auto mt-20 max-w-4xl text-center md:mt-28" delay={0.05}>
          <p className="font-display text-2xl leading-snug text-ink md:text-[2rem] md:leading-[1.3]">
            A state-wide association that connects people who want to learn with people who can teach, hire and invest.
          </p>
          <span className="mx-auto mt-8 block h-px w-16 bg-ink/30" aria-hidden="true" />
        </Reveal>

        {/* Photo + statement: a flex row so the photo always stretches to match the text column's
            actual height (whatever it turns out to be), instead of the two ending at different points */}
        <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-stretch lg:gap-16">
          <RevealImage
            src={photos.about.src}
            alt={photos.about.alt}
            className="aspect-4/5 w-full lg:aspect-auto lg:w-[41.6667%] lg:shrink-0"
          />
          <div className="flex flex-1 flex-col justify-between gap-12">
            <ScrollHighlight text={mission} />

            {/* Three principles as plain text columns, divided by hairlines */}
            <Stagger className="grid gap-8 border-t border-ink pt-8 sm:grid-cols-3 sm:gap-6">
              {aboutPoints.map((point, i) => (
                <StaggerItem key={point.title}>
                  <span className="font-display text-sm text-ink/40">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-xl font-medium text-ink">{point.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{point.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </div>
  );
}
