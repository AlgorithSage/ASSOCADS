import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { engagementPathways } from '../content';
import { EASE, Reveal, Words, scrollToId } from '../motion';

const card = {
  hidden: { opacity: 0, y: 32 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

interface EngagementProps {
  onJoin: (type: string, from?: HTMLElement | null) => void;
}

export function Engagement({ onJoin }: EngagementProps) {
  return (
    <div className="section-pad">
      <div className="container-page">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-ink/40" aria-hidden="true" />
                Two ways in
              </span>
            </Reveal>
            <Words
              text="Choose your path"
              className="mt-4 text-3xl font-medium text-ink md:text-5xl"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              Whether you are an individual looking to learn and grow, or an
              organisation looking to recruit, research and collaborate,
              there is a clear path for you.
            </p>
          </Reveal>
        </div>

        {/* Two pathway cards */}
        <motion.div
          className="grid gap-6 lg:grid-cols-2"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.15 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.12 } } }}
        >
          {engagementPathways.map((path) => {
            const Icon = path.icon;
            const isDark = path.id === 'partner';

            return (
              <motion.article
                key={path.id}
                variants={card}
                className={`group relative flex flex-col overflow-hidden rounded-sm p-8 transition-shadow duration-500 md:p-10 ${
                  isDark
                    ? 'border border-paper/15 bg-[#2E242C] text-paper shadow-2xl hover:shadow-[0_30px_60px_-30px_rgba(46,36,44,0.6)]'
                    : 'border border-line bg-linear-to-br from-white to-paper-2 hover:shadow-[0_24px_48px_-28px_rgba(46,36,44,0.4)]'
                }`}
              >
                {/* Faint icon backdrop */}
                <span
                  className={`pointer-events-none absolute -bottom-8 -right-8 ${
                    isDark ? 'text-paper/[0.04]' : 'text-ink/[0.04]'
                  }`}
                  aria-hidden="true"
                >
                  <Icon size={220} strokeWidth={0.6} />
                </span>

                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border ${
                        isDark ? 'border-paper/20 bg-paper/10 text-paper' : 'border-line bg-paper text-ink'
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.06em] ${
                        isDark ? 'text-paper/50' : 'text-ink-muted'
                      }`}
                    >
                      {path.eyebrow}
                    </span>
                  </div>

                  <h3
                    className={`mt-6 font-display text-2xl font-medium leading-snug md:text-3xl ${
                      isDark ? 'text-paper' : 'text-ink'
                    }`}
                  >
                    {path.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-md text-[0.95rem] leading-relaxed ${
                      isDark ? 'text-paper/70' : 'text-ink-muted'
                    }`}
                  >
                    {path.description}
                  </p>

                  {/* Checklist */}
                  <ul className="mt-6 flex-1 space-y-3">
                    {path.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className={`mt-0.5 shrink-0 ${isDark ? 'text-paper/60' : 'text-ink-soft'}`}
                        />
                        <span
                          className={`text-[0.9rem] leading-relaxed ${
                            isDark ? 'text-paper/80' : 'text-ink-soft'
                          }`}
                        >
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8">
                    {path.id === 'member' ? (
                      <button
                        type="button"
                        onClick={(e) => onJoin('Professional', e.currentTarget)}
                        className="btn btn-primary"
                      >
                        {path.cta} <ArrowRight size={16} />
                      </button>
                    ) : (
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToId('#contact');
                        }}
                        className="btn btn-on-dark"
                      >
                        {path.cta} <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
