import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { goals } from '../content';
import type { Goals as GoalSet } from '../types';
import { EASE, useMediaQuery, prefersReducedMotion } from '../motion';

const pad = (n: number) => String(n).padStart(2, '0');

const PLAIN: Record<string, string> = {
  near: 'What you will see in our first year.',
  mid: 'What we build once the community is up and running.',
  long: 'Where we want ASSOCADS to be in the long run.'
};

// One horizon card. Reports itself as "active" when it reaches the middle of the screen.
function HorizonCard({ goal, index, onActive }: { goal: GoalSet; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const scale = useTransform(p, [0, 1], [0.94, 1]);
  const opacity = useTransform(p, [0, 0.6, 1], [0.3, 0.85, 1]);
  const rotateX = useTransform(p, [0, 1], [8, 0]);

  return (
    <motion.article
      ref={ref}
      style={prefersReducedMotion() ? undefined : { scale, opacity, rotateX, transformPerspective: 1400 }}
      className="relative overflow-hidden rounded-sm border border-line bg-white shadow-[0_30px_70px_-45px_rgba(46,36,44,0.45)]"
    >
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line bg-paper px-7 py-6 md:px-9">
        <div>
          <p className="text-sm text-ink-muted">{goal.period}</p>
          <h3 className="mt-1 font-display text-3xl font-medium text-ink md:text-4xl">{goal.label}</h3>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ink-muted md:text-right">{PLAIN[goal.id]}</p>
      </header>

      <motion.div
        className="grid gap-px bg-line sm:grid-cols-2"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: false, amount: 0.25 }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06 } } }}
      >
        {goal.groups.map((group, gi) => (
          <motion.section
            key={group.title}
            className={`bg-white px-8 py-7 md:px-9 md:py-8 ${goal.groups.length % 2 === 1 && gi === goal.groups.length - 1 ? 'sm:col-span-2' : ''}`}
            variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
          >
            <h4 className="font-display text-lg font-medium leading-snug text-ink">{group.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-snug text-ink-soft">
                  <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </motion.div>
    </motion.article>
  );
}

// Goals as a scroll story: a sticky panel on the left shows which horizon you are on
// (number, name and a filling progress rail), while the cards on the right come into
// focus one by one as you scroll.
export function Goals() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery('(min-width: 1024px)');
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.6', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const current = goals[active];

  return (
    <div className="section-pad">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky status panel */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-display text-[2.75rem] font-medium leading-[1.06] text-ink sm:text-6xl lg:text-5xl xl:text-[3.4rem]">Where we are heading</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-ink-muted">
              Our goals, split into what happens soon, what comes next and where we want to end up. Scroll to move through
              them.
            </p>

            {wide && (
              <div className="mt-8 flex gap-6">
                {/* Progress rail */}
                <div className="relative w-px bg-line" aria-hidden="true">
                  <motion.span className="absolute inset-x-0 top-0 h-full origin-top bg-ink" style={{ scaleY: fill }} />
                </div>
                <div>
                  <div className="relative inline-block overflow-hidden font-display text-[4.25rem] leading-[1.12] text-ink">
                    <span className="invisible">00</span>
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.span
                        key={active}
                        className="absolute inset-0 flex items-center"
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        {pad(active + 1)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className="mt-2 font-display text-2xl text-ink">{current.label}</p>
                      <p className="text-sm text-ink-muted">{current.period}</p>
                    </motion.div>
                  </AnimatePresence>
                  <ol className="mt-5 space-y-1.5">
                    {goals.map((g, i) => (
                      <li key={g.id} className="flex items-center gap-3 text-sm">
                        <span
                          className={`h-2 w-2 rounded-full transition-colors duration-300 ${i <= active ? 'bg-ink' : 'bg-line'}`}
                          aria-hidden="true"
                        />
                        <span className={i === active ? 'text-ink' : 'text-ink-muted'}>{g.label}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Cards */}
        <div ref={listRef} className="space-y-10 lg:col-span-8 lg:space-y-[18vh] lg:py-[6vh]">
          {goals.map((goal, i) => (
            <HorizonCard key={goal.id} goal={goal} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </div>
  );
}
