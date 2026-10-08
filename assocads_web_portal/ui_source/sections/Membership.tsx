import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Shield, GraduationCap, Award, Building2, HeartHandshake, FileCheck } from 'lucide-react';
import { tierGroups, tiers, memberBenefits } from '../content';
import type { TierGroup, Tier } from '../types';
import { EASE, Reveal, SectionHeading } from '../motion';

interface MembershipProps {
  onJoin: (tierName: string, from?: HTMLElement | null) => void;
}

const tierBadges: Record<string, { label: string; icon: typeof Sparkles; color: string }> = {
  'Student': { label: 'Scholarships Available', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'Professional': { label: 'Most Popular', icon: Sparkles, color: 'bg-amber-100 text-amber-900 border-amber-300' },
  'Academic': { label: 'Faculty & Research', icon: Award, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  'Life member': { label: 'Lifetime Impact', icon: Shield, color: 'bg-purple-50 text-purple-900 border-purple-200' },
  'Startup': { label: 'Fastest Growing', icon: Sparkles, color: 'bg-amber-100 text-amber-900 border-amber-300' },
  'College or university': { label: 'Campus Chapters', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  'Company': { label: 'Enterprise Reach', icon: Building2, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  'Fellow': { label: 'By Invitation', icon: Award, color: 'bg-amber-50 text-amber-900 border-amber-200' },
  'Patron': { label: 'Endowment Leadership', icon: HeartHandshake, color: 'bg-purple-50 text-purple-900 border-purple-200' }
};

export function Membership({ onJoin }: MembershipProps) {
  const [group, setGroup] = useState<TierGroup>('individuals');

  const list = tiers[group];

  return (
    <div className="relative section-pad">
      <div className="container-page">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Pricing & Membership"
          title="Transparent plans for every stage of your career"
          text="Whether you are a student taking your first steps in data science, a working practitioner, or an institution shaping the ecosystem, join our network across Bengal."
        />

        {/* Category Segmented Control */}
        <div className="mt-7 flex justify-center">
          <div
            role="tablist"
            aria-label="Membership categories"
            className="inline-flex rounded-sm border border-line bg-white/90 p-1 shadow-xs backdrop-blur-sm"
          >
            {tierGroups.map((g) => {
              const active = group === g.id;
              return (
                <button
                  key={g.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="tier-grid"
                  onClick={() => setGroup(g.id)}
                  className={`relative rounded-xs px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 sm:px-6 ${
                    active ? 'text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="tier-pill-active"
                      className="absolute inset-0 rounded-xs bg-ink shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards Grid — Compact, Comparative, Shorter Cards */}
        <div id="tier-grid" className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`grid gap-3.5 sm:gap-4 xl:gap-4.5 ${
                group === 'individuals'
                  ? 'sm:grid-cols-2 xl:grid-cols-4'
                  : group === 'organisations'
                  ? 'sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
                  : 'sm:grid-cols-2 max-w-3xl mx-auto'
              }`}
            >
              {list.map((tier) => {
                const badge = tierBadges[tier.name];
                const isHighlight = Boolean(tier.highlight);

                return (
                  <motion.article
                    key={tier.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={`relative flex flex-col justify-between items-center text-center rounded-sm border transition-all duration-300 ${
                      isHighlight
                        ? 'border-ink bg-ink text-paper shadow-[0_16px_36px_-14px_rgba(46,36,44,0.35)] xl:-translate-y-1.5'
                        : 'border-line/80 bg-white text-ink shadow-[0_3px_14px_-6px_rgba(46,36,44,0.06)] hover:-translate-y-1 hover:border-ink/40 hover:shadow-[0_12px_28px_-10px_rgba(46,36,44,0.14)]'
                    } p-4 sm:p-5`}
                  >
                    <div className="w-full flex flex-col items-center">
                      {/* Top Row: | label representation */}
                      <div className="flex items-center justify-center">
                        <span className={`text-[11px] font-medium tracking-wide ${
                          isHighlight ? 'text-amber-200' : 'text-ink-muted'
                        }`}>
                          | {badge?.label?.toLowerCase() ?? 'membership plan'}
                        </span>
                      </div>

                      {/* Tier Name & Audience Persona */}
                      <div className="mt-2.5 text-center">
                        <h3 className="font-display text-xl font-medium tracking-tight">
                          {tier.name}
                        </h3>
                        <p className={`mt-0.5 min-h-[1.85rem] text-[11px] leading-snug ${
                          isHighlight ? 'text-paper/75' : 'text-ink-muted'
                        }`}>
                          {tier.forWho}
                        </p>
                      </div>

                      {/* Pricing Display */}
                      <div className={`mt-3 border-y py-2.5 w-full flex items-baseline justify-center gap-1 flex-wrap ${
                        isHighlight ? 'border-paper/15' : 'border-line/70'
                      }`}>
                        <span className="font-display text-2xl font-medium tracking-tight">
                          {tier.price}
                        </span>
                        <span className={`text-[10px] font-medium uppercase tracking-wider ${
                          isHighlight ? 'text-paper/60' : 'text-ink-muted'
                        }`}>
                          / {tier.period}
                        </span>
                      </div>

                      {/* Benefits & Perks List */}
                      <div className="mt-3.5 w-full flex flex-col items-center">
                        <p className={`text-[0.65rem] font-bold uppercase tracking-wider text-center ${
                          isHighlight ? 'text-paper/50' : 'text-ink-muted/80'
                        }`}>
                          Key Deliverables
                        </p>

                        <ul className="mt-2 space-y-1.5 w-full text-center">
                          {tier.perks.map((perk) => (
                            <li key={perk} className="flex items-center justify-center gap-1.5 text-xs leading-snug text-center">
                              <Check size={11} strokeWidth={2.5} className={`shrink-0 ${isHighlight ? 'text-amber-300' : 'text-ink/60'}`} />
                              <span className={isHighlight ? 'text-paper/90' : 'text-ink-soft'}>
                                {perk}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action CTA Button */}
                    <div className="mt-5 pt-1.5 w-full">
                      <button
                        type="button"
                        onClick={(e) => onJoin(tier.name, e.currentTarget)}
                        className={`btn min-h-10! w-full justify-center py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                          isHighlight
                            ? 'border border-paper bg-paper text-ink hover:bg-white shadow-sm'
                            : 'btn-primary'
                        }`}
                      >
                        <span>
                          {tier.price.startsWith('By')
                            ? 'Request Fellowship'
                            : tier.price.startsWith('Any')
                            ? 'Make Contribution'
                            : `Join as ${tier.name}`}
                        </span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Trust & Guarantee Banner — Centrally Placed */}
        <Reveal className="mt-10">
          <div className="rounded-sm border border-line/80 bg-white p-5 shadow-xs sm:p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#FAF8F5] text-ink border border-line">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-medium text-ink">Public Trust</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">Registered non-profit. Accounts audited and published annually.</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#FAF8F5] text-ink border border-line">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-medium text-ink">Need-Based Aid</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">100% scholarship fee waivers reserved for underprivileged students.</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#FAF8F5] text-ink border border-line">
                  <FileCheck size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-medium text-ink">Verified Member ID</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">Instant verifiable digital member credentials & portal access.</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#FAF8F5] text-ink border border-line">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-medium text-ink">Tax Exemption</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">Contributions eligible under 80G tax exemptions for donations.</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Benefits Every Member Gets (The Core 10 Inclusions Bento) */}
        <motion.div
          className="mt-20 grid gap-4 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-stretch"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }}
        >
          {[0, 1].map((side) => (
            <div key={side} className={`flex flex-col gap-4 ${side === 0 ? 'lg:order-1' : 'lg:order-3'}`}>
              {memberBenefits.slice(side * 5, side * 5 + 5).map(({ title, text, icon: Icon }) => (
                <motion.article
                  key={title}
                  className="draw-border group flex flex-1 items-start gap-4 rounded-sm border border-line bg-white px-5 py-5 transition-shadow duration-500 hover:shadow-[0_16px_36px_-20px_rgba(46,36,44,0.35)]"
                  variants={{
                    hidden: { opacity: 0, x: side === 0 ? -16 : 16 },
                    shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
                  }}
                >
                  {['db-t', 'db-r', 'db-b', 'db-l'].map((edge) => (
                    <span key={edge} className={`db ${edge}`} aria-hidden="true" />
                  ))}
                  <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                  <div>
                    <h4 className="font-display text-base font-medium leading-snug text-ink">{title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">{text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          ))}

          {/* Centerpiece Banner */}
          <motion.div
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-sm bg-ink px-8 py-14 text-center text-paper lg:order-2 md:px-10"
            variants={{ hidden: { opacity: 0, scale: 0.97 }, shown: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } } }}
          >
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[16rem] leading-none text-paper/[0.04]"
              aria-hidden="true"
            >
              10
            </span>
            <span className="relative inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-paper/70">
              <Shield size={14} /> Universal Charter Inclusions
            </span>
            <h3 className="relative mt-4 font-display text-3xl font-medium leading-[1.08] sm:text-4xl md:text-5xl">
              Ten things every member gets
            </h3>
            <span className="relative mt-6 block h-px w-12 bg-paper/30" aria-hidden="true" />
            <p className="relative mt-6 max-w-xs text-sm leading-relaxed text-paper/80">
              Every member receives all ten baseline entitlements. A student paying ₹500 receives equal core community access as an enterprise partner.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
