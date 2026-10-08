import { motion } from 'framer-motion';
import { objectives } from '../content';
import { EASE, Reveal, Words } from '../motion';
import { trackSpotlight } from '../effects';

const card = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
};

export function Objectives() {
  return (
    <div className="section-pad">
      <div className="container-page">
        {/* Section intro — centrally aligned */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow inline-flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-ink/40" aria-hidden="true" />
              Our objectives
              <span className="h-px w-8 bg-ink/40" aria-hidden="true" />
            </span>
          </Reveal>
          <Words
            text="Five pillars that guide everything we do"
            className="mt-4 justify-center text-center text-3xl font-medium text-ink md:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Every programme, event and partnership maps to one of these
              objectives. They are drawn from our Trust deed and founding
              roadmap, steering our annual plan.
            </p>
          </Reveal>
        </div>

        {/* Grid: 5 centrally aligned cards — 3 on top row, 2 centered on bottom row */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.1 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
        >
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            const isBottomRow = i >= 3;
            const isFirstOfBottom = i === 3;
            const isLastOdd = i === 4;

            return (
              <motion.article
                key={obj.title}
                variants={card}
                onMouseMove={trackSpotlight}
                className={`spotlight group relative flex flex-col items-center rounded-sm border border-line bg-white p-8 text-center shadow-[0_12px_32px_-22px_rgba(46,36,44,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_22px_44px_-24px_rgba(46,36,44,0.35)] sm:col-span-1 ${
                  isLastOdd ? 'sm:col-span-2 sm:mx-auto sm:max-w-md sm:w-full lg:max-w-none' : ''
                } lg:col-span-2 ${
                  isFirstOfBottom ? 'lg:col-start-2' : ''
                }`}
              >
                {/* Centered circular icon badge */}
                <div className="mb-6 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line bg-[#F8F6F2] text-ink shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <Icon size={22} strokeWidth={1.5} />
                </div>

                {/* Centered Title */}
                <h3 className="font-display text-xl font-medium leading-snug text-ink">
                  {obj.title}
                </h3>

                {/* Centered Description */}
                <p className="mt-3.5 flex-1 text-[0.93rem] leading-relaxed text-ink-muted">
                  {obj.description}
                </p>

                {/* Centered Metric divider */}
                <div className="mt-6 w-full border-t border-line/80 pt-4">
                  <span className="inline-block text-xs font-semibold tracking-[0.02em] text-ink-soft">
                    {obj.metric}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
