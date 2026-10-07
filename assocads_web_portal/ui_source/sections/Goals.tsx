import { motion } from 'framer-motion';
import { goals } from '../content';
import { EASE, SectionHeading } from '../motion';

const pad = (n: number) => String(n).padStart(2, '0');

// Three horizons side by side as an editorial spread: everything readable at once,
// with no tabs to click through. Columns are divided by hairlines; they stack on mobile.
export function Goals() {
  return (
    <section id="goals" className="section-pad">
      <div className="container-page">
        <SectionHeading title="Where we are heading" text="What we want to achieve in the near, mid and long term." />

        <motion.ol
          className="mt-16 grid border-t border-ink md:mt-20 lg:grid-cols-3"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.12 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
        >
          {goals.map((goal, i) => (
            <motion.li
              key={goal.id}
              className="relative pt-12 lg:px-10 lg:first:pl-0 lg:last:pr-0"
              variants={{
                hidden: { opacity: 0, y: 28 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
              }}
            >
              {/* Column rule, drawn downward as the spread settles in */}
              {i > 0 && (
                <motion.span
                  className="absolute left-0 top-0 hidden h-full w-px origin-top bg-line lg:block"
                  variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1, transition: { duration: 1.2, ease: EASE } } }}
                  aria-hidden="true"
                />
              )}

              <header>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl leading-none text-ink/15">{pad(i + 1)}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{goal.period}</span>
                </div>
                <h3 className="mt-5 text-3xl font-medium text-ink md:text-4xl">{goal.label}</h3>
              </header>

              <div className="mt-10 space-y-8">
                {goal.groups.map((group) => (
                  <div key={group.title}>
                    <h4 className="border-b border-line pb-3 font-display text-lg font-medium text-ink">{group.title}</h4>
                    <ul className="mt-4 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 border border-ink/45" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
