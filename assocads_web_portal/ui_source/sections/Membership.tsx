import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { tierGroups, tiers, memberBenefits } from '../content';
import type { TierGroup } from '../types';
import { DepthIn, EASE, Reveal, SectionHeading, Tilt, prefersReducedMotion, useWheelToHorizontal } from '../motion';

interface MembershipProps {
  onJoin: (tierName: string, from?: HTMLElement | null) => void;
}

export function Membership({ onJoin }: MembershipProps) {
  const [group, setGroup] = useState<TierGroup>('individuals');
  const [direction, setDirection] = useState(1);
  const reduced = prefersReducedMotion();
  const choose = (next: TierGroup) => {
    const order = tierGroups.map((g) => g.id);
    setDirection(order.indexOf(next) >= order.indexOf(group) ? 1 : -1);
    setGroup(next);
  };

  /* Cards lean into the direction you're flicking, then settle back upright */
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({ container: trackRef });
  const velocity = useVelocity(scrollX);
  const smoothVelocity = useSpring(velocity, { stiffness: 220, damping: 34, mass: 0.5 });
  const wobble = useTransform(smoothVelocity, [-1800, 0, 1800], reduced ? [0, 0, 0] : [2.4, 0, -2.4], {
    clamp: false
  });

  useWheelToHorizontal(trackRef, [group]);
  const list = tiers[group];

  return (
    <section id="membership" className="relative section-pad">
      <div className="container-page">
        <SectionHeading
          title="Pick the membership that fits you"
          text="Fees are yearly unless stated. Students pay the least, and scholarships are available for those who need them."
        />

        <Reveal className="mt-12 flex justify-center">
          <div role="tablist" aria-label="Membership type" className="inline-flex border-b border-line">
            {tierGroups.map((g) => (
              <button
                key={g.id}
                role="tab"
                type="button"
                aria-selected={group === g.id}
                aria-controls="tier-panel"
                onClick={() => choose(g.id)}
                className={`relative px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors sm:px-7 sm:text-sm sm:tracking-[0.14em] ${
                  group === g.id ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {group === g.id && (
                  <motion.span
                    layoutId="tier-pill"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-ink"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{g.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <DepthIn>
        <div id="tier-panel" role="tabpanel" className="mt-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={group}
              custom={direction}
              ref={trackRef}
              data-lenis-prevent-wheel
              className="scroll-x-clean -mx-5 flex snap-x snap-proximity gap-5 overflow-x-auto px-5 pb-6 pt-4 md:-mx-8 md:px-8"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.15 }}
              exit="gone"
              variants={{
                hidden: (d: number) => ({ opacity: 0, x: d * 40 }),
                shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE, staggerChildren: 0.07 } },
                gone: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.3, ease: EASE } })
              }}
            >
              {list.map((tier) => (
                <Tilt key={tier.name} className="w-75 shrink-0 snap-start sm:w-85 lg:w-95" max={3}>
                <motion.article
                  style={{ rotate: wobble }}
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: -10 },
                    shown: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: EASE } }
                  }}
                  className={`relative flex h-full flex-col rounded-sm border p-7 md:p-8 ${
                    tier.highlight
                      ? 'border-ink bg-ink text-paper shadow-[0_30px_60px_-30px_rgba(46,36,44,0.6)]'
                      : 'border-line bg-white text-ink'
                  }`}
                >
                  {tier.highlight && (
                    <span className="absolute -top-3 left-7 border border-paper/40 bg-ink px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-paper">
                      Most chosen
                    </span>
                  )}
                  <h3 className="text-3xl font-medium">{tier.name}</h3>
                  <p className={`mt-1 min-h-12 text-sm ${tier.highlight ? 'text-paper/70' : 'text-ink-muted'}`}>{tier.forWho}</p>
                  <p className="mt-6 font-display text-3xl font-medium">{tier.price}</p>
                  <p className={`text-sm ${tier.highlight ? 'text-paper/70' : 'text-ink-muted'}`}>{tier.period}</p>
                  <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 ${tier.highlight ? 'border-paper/20' : 'border-line'}`}>
                    {tier.perks.map((perk) => (
                      <li key={perk} className={`flex gap-3 ${tier.highlight ? 'text-paper/90' : 'text-ink-soft'}`}>
                        <Check size={18} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={(e) => onJoin(tier.name, e.currentTarget)}
                    className={`btn mt-8 w-full ${tier.highlight ? 'btn-on-dark' : 'btn-ghost'}`}
                  >
                    {tier.price.startsWith('By') ? 'Suggest someone' : `Join as ${tier.name.toLowerCase()}`}
                    <ArrowRight size={16} />
                  </button>
                </motion.article>
                </Tilt>
              ))}
            </motion.div>
          </AnimatePresence>
          <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-ink-muted" aria-hidden="true">
            Scroll or drag sideways for more plans
          </p>
        </div>
        </DepthIn>

        {/* Benefits shared by every membership (roadmap slide 10) */}
        <div className="mt-20 grid gap-10 border-t border-ink pt-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <span className="eyebrow">Included in every membership</span>
            <h3 className="mt-4 text-3xl font-medium text-ink md:text-4xl">Ten things every member gets</h3>
          </Reveal>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {memberBenefits.map((benefit, i) => (
              <motion.li
                key={benefit}
                className="flex items-baseline gap-4 border-b border-line py-4"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.08 }}
              >
                <span className="font-display text-sm text-ink/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-ink">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
