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

  // Key spec highlights per tier for the comparison row (inspired by the reference screenshot)
  const tierKeyHighlights: Record<string, string> = {
    'Student': 'Need-based scholarships up to 100% waiver',
    'Professional': 'Full SIG voting & discounted Summit passes',
    'Academic': 'Faculty bootcamps & open research datasets',
    'Life member': 'Permanent governing seat & VIP Summit access',
    'Startup': 'Demo day investor slots & mentor matching',
    'College or university': 'Campus chapter accreditation & hackathon licenses',
    'Company': 'Headline branding & direct campus hiring quota',
    'Fellow': 'State AI advisory council & public advocacy',
    'Patron': 'Endowed scholarship recognition & permanent seat'
  };

  return (
    <div className="relative section-pad">
      <div className="container-page">
        {/* Section Heading — Conversational & Reassuring (Inspired by reference) */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-ink/40" aria-hidden="true" />
            How much does it cost?
            <span className="h-px w-8 bg-ink/40" aria-hidden="true" />
          </span>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-5xl font-display">
            So what does it cost?
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-muted">
            We are building a public state ecosystem, not an expensive paywall. Transparent, subsidized student rates, audited non-profit accounts, and zero hidden fees.
          </p>
        </div>

        {/* Category Controls Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:justify-center">
          <div
            role="tablist"
            aria-label="Membership categories"
            className="inline-flex rounded-sm border border-line bg-white/95 p-1 shadow-xs backdrop-blur-sm"
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

        {/* Main Comparison Layout: Decision Helper Sidebar + Pricing Matrix (Inspired by Screenshot 1) */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[250px_1fr] xl:grid-cols-[270px_1fr] items-start">
          {/* Left Column: Decision Helper Card */}
          <div className="rounded-sm border border-line/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full lg:sticky lg:top-24">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                Need Guidance?
              </span>
              <h3 className="mt-2 font-display text-2xl font-medium leading-snug text-ink">
                Not sure which tier is best for you?
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Whether you are a student, practitioner, professor, or founder, our charter outlines exact member benefits and fee waiver policies.
              </p>

              <div className="mt-6 space-y-2.5 border-t border-line/60 pt-5">
                <div className="flex items-start gap-2 text-xs text-ink-soft">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 mt-0.5">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span>100% need-based student waivers</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-ink-soft">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 mt-0.5">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span>80G income tax exemption</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-ink-soft">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 mt-0.5">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span>Verifiable digital credentials</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-ink-soft">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 mt-0.5">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span>Registered Non-Profit Trust</span>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-line/60">
              <button
                type="button"
                onClick={() => onJoin('Student')}
                className="btn btn-primary w-full justify-center py-2 text-xs font-semibold"
              >
                Membership Guide
              </button>
            </div>
          </div>

          {/* Right Column: Pricing Matrix Cards */}
          <div id="tier-grid">
            <AnimatePresence mode="wait">
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`grid gap-4 ${
                  group === 'individuals'
                    ? 'sm:grid-cols-2 xl:grid-cols-4'
                    : group === 'organisations'
                    ? 'sm:grid-cols-2 lg:grid-cols-3'
                    : 'sm:grid-cols-2 max-w-2xl'
                }`}
              >
                {list.map((tier) => {
                  const badge = tierBadges[tier.name];
                  const isHighlight = Boolean(tier.highlight);
                  const keySpec = tierKeyHighlights[tier.name];

                  return (
                    <motion.article
                      key={tier.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className={`relative flex flex-col justify-between overflow-hidden rounded-sm border transition-all duration-300 ${
                        isHighlight
                          ? 'border-ink bg-white text-ink shadow-[0_16px_36px_-14px_rgba(46,36,44,0.22)] ring-2 ring-ink xl:-translate-y-1'
                          : 'border-line/80 bg-white text-ink shadow-[0_3px_14px_-6px_rgba(46,36,44,0.06)] hover:border-ink/40 hover:shadow-[0_12px_28px_-10px_rgba(46,36,44,0.12)]'
                      }`}
                    >
                      {/* Top Recommendation Banner (from Screenshot 1) */}
                      {isHighlight && (
                        <div className="w-full bg-[#EBF3FC] border-b border-[#CADEF5] py-1 text-center text-[10px] font-bold tracking-wider text-[#1A4F8B] uppercase">
                          ASSOCADS Recommends
                        </div>
                      )}

                      <div className="p-4 sm:p-5 flex flex-col h-full">
                        {/* Header: Title & Persona */}
                        <div>
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className="text-[11px] font-semibold text-ink-muted">
                              | {badge?.label?.toLowerCase() ?? 'membership plan'}
                            </span>
                            <span className="text-[10px] font-medium text-ink-muted/80 bg-[#FAF8F5] border border-line/60 px-1.5 py-0.5 rounded-xs">
                              {tier.perks.length} Features
                            </span>
                          </div>

                          <h4 className="mt-2 font-display text-xl font-medium tracking-tight text-ink">
                            {tier.name}
                          </h4>
                          <p className="mt-0.5 min-h-[2rem] text-[11px] leading-snug text-ink-muted">
                            {tier.forWho}
                          </p>
                        </div>

                        {/* Price Block */}
                        <div className="mt-3 border-t border-line/60 pt-3">
                          <span className="text-[10px] uppercase font-semibold text-ink-muted tracking-wider block">
                            Starts at
                          </span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="font-display text-2xl font-bold tracking-tight text-ink">
                              {tier.price}
                            </span>
                            <span className="text-[11px] font-medium text-ink-muted">
                              / {tier.period}
                            </span>
                          </div>
                        </div>

                        {/* Prominent CTA Button (Placed prominently below price, matching Screenshot 1 & 2) */}
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={(e) => onJoin(tier.name, e.currentTarget)}
                            className={`btn min-h-10! w-full justify-center py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                              isHighlight
                                ? 'bg-[#F59E0B] hover:bg-[#D97706] text-ink font-bold border border-[#D97706] shadow-sm'
                                : 'btn-primary'
                            }`}
                          >
                            <span>
                              {tier.price.startsWith('By')
                                ? 'Request Fellowship'
                                : tier.price.startsWith('Any')
                                ? 'Make Contribution'
                                : `Choose ${tier.name}`}
                            </span>
                            <ArrowRight size={14} />
                          </button>
                        </div>

                        {/* Highlighted Spec Row (from Screenshot 1) */}
                        {keySpec && (
                          <div className="mt-4 -mx-4 sm:-mx-5 bg-amber-50/80 border-y border-amber-200/60 px-3 py-2 text-center text-[11px] font-medium text-amber-950 leading-tight">
                            {keySpec}
                          </div>
                        )}

                        {/* Features List with Emerald Circular Badges (from Screenshot 2) */}
                        <div className="mt-4 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                            Included In This Plan:
                          </p>
                          <ul className="mt-2.5 space-y-2">
                            {tier.perks.map((perk) => (
                              <li key={perk} className="flex items-start gap-2 text-xs leading-snug">
                                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 mt-0.5">
                                  <Check size={10} strokeWidth={3} />
                                </span>
                                <span className="text-ink-soft">
                                  {perk}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Trust & Guarantee Banner */}
        <Reveal className="mt-12">
          <div className="rounded-sm border border-line/80 bg-white p-5 shadow-xs sm:p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#FAF8F5] text-ink border border-line">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-medium text-ink">Public Trust</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">Registered non-profit trust in West Bengal. Audited accounts published annually.</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#FAF8F5] text-ink border border-line">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-medium text-ink">Need-Based Aid</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">100% scholarship fee waivers reserved for underprivileged students and researchers.</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#FAF8F5] text-ink border border-line">
                  <FileCheck size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-medium text-ink">Verified Member ID</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">Instant verifiable digital member credentials and full portal access.</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-[#FAF8F5] text-ink border border-line">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-medium text-ink">80G Tax Exemption</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">All contributions and institutional memberships qualify for 80G tax exemptions.</p>
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
