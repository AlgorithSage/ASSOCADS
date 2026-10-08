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

        {/* Pricing Cards Grid */}
        <div id="tier-grid" className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`grid gap-4 ${
                group === 'individuals'
                  ? 'sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto'
                  : group === 'organisations'
                  ? 'sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
                  : 'sm:grid-cols-2 max-w-2xl mx-auto'
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
                          ? 'border-ink bg-ink text-paper shadow-[0_20px_45px_-15px_rgba(20,14,18,0.55)] ring-2 ring-ink xl:-translate-y-1.5'
                          : 'border-line/80 bg-white text-ink shadow-[0_3px_14px_-6px_rgba(46,36,44,0.06)] hover:border-ink/40 hover:shadow-[0_12px_28px_-10px_rgba(46,36,44,0.12)]'
                      }`}
                    >
                      {/* Top Recommendation Banner (from Screenshot 1) */}
                      {isHighlight && (
                        <div className="w-full bg-[#2A2028] border-b border-paper/15 py-1.5 text-center text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                          ASSOCADS Recommends
                        </div>
                      )}

                      <div className="p-4 sm:p-5 flex flex-col h-full">
                        {/* Header: Title & Persona */}
                        <div>
                          <div className="flex items-center justify-between gap-1 flex-wrap">
                            <span className={`text-[11px] font-semibold ${
                              isHighlight ? 'text-amber-200' : 'text-ink-muted'
                            }`}>
                              | {badge?.label?.toLowerCase() ?? 'membership plan'}
                            </span>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-xs border ${
                              isHighlight
                                ? 'bg-paper/10 border-paper/20 text-paper/80'
                                : 'bg-[#FAF8F5] border-line/60 text-ink-muted/80'
                            }`}>
                              {tier.perks.length} Features
                            </span>
                          </div>

                          <h4 className={`mt-2 font-display text-xl font-medium tracking-tight ${
                            isHighlight ? 'text-paper' : 'text-ink'
                          }`}>
                            {tier.name}
                          </h4>
                          <p className={`mt-0.5 min-h-[2rem] text-[11px] leading-snug ${
                            isHighlight ? 'text-paper/75' : 'text-ink-muted'
                          }`}>
                            {tier.forWho}
                          </p>
                        </div>

                        {/* Price Block */}
                        <div className={`mt-3 border-t pt-3 ${
                          isHighlight ? 'border-paper/15' : 'border-line/60'
                        }`}>
                          <span className={`text-[10px] uppercase font-semibold tracking-wider block ${
                            isHighlight ? 'text-paper/60' : 'text-ink-muted'
                          }`}>
                            Starts at
                          </span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className={`font-display text-2xl font-bold tracking-tight ${
                              isHighlight ? 'text-paper' : 'text-ink'
                            }`}>
                              {tier.price}
                            </span>
                            <span className={`text-[11px] font-medium ${
                              isHighlight ? 'text-paper/60' : 'text-ink-muted'
                            }`}>
                              / {tier.period}
                            </span>
                          </div>
                        </div>

                        {/* Prominent CTA Button */}
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={(e) => onJoin(tier.name, e.currentTarget)}
                            className={`btn min-h-10! w-full justify-center py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
                              isHighlight
                                ? 'bg-[#F59E0B] hover:bg-[#D97706] text-ink font-bold border border-[#F59E0B] shadow-sm'
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

                        {/* Highlighted Spec Row */}
                        {keySpec && (
                          <div className={`mt-4 -mx-4 sm:-mx-5 border-y px-3 py-2 text-center text-[11px] font-medium leading-tight ${
                            isHighlight
                              ? 'bg-white/10 border-white/15 text-amber-200'
                              : 'bg-amber-50/80 border-amber-200/60 text-amber-950'
                          }`}>
                            {keySpec}
                          </div>
                        )}

                        {/* Features List with Circular Checkmark Badges */}
                        <div className="mt-4 flex-1">
                          <p className={`text-[10px] font-bold uppercase tracking-wider ${
                            isHighlight ? 'text-paper/60' : 'text-ink-muted'
                          }`}>
                            Included In This Plan:
                          </p>
                          <ul className="mt-2.5 space-y-2">
                            {tier.perks.map((perk) => (
                              <li key={perk} className="flex items-start gap-2 text-xs leading-snug">
                                <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full mt-0.5 ${
                                  isHighlight
                                    ? 'bg-emerald-400/20 text-emerald-400'
                                    : 'bg-emerald-500/15 text-emerald-700'
                                }`}>
                                  <Check size={10} strokeWidth={3} />
                                </span>
                                <span className={isHighlight ? 'text-paper/90' : 'text-ink-soft'}>
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

        {/* Benefits Every Member Gets (The Core 10 Inclusions Bento — Mobile Optimized & Scaled) */}
        <div className="mt-14 sm:mt-18 lg:mt-20">
          <div className="grid gap-3 sm:gap-3.5 lg:gap-4 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-stretch">
            {/* Centerpiece Banner — Rendered FIRST on mobile (< lg), Centered on desktop (lg:order-2) */}
            <motion.div
              className="relative order-first flex flex-col items-center justify-center overflow-hidden rounded-sm bg-ink p-5 text-center text-paper sm:p-7 lg:order-2 lg:px-8 lg:py-14"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[8rem] sm:text-[12rem] lg:text-[16rem] leading-none text-paper/[0.04]"
                aria-hidden="true"
              >
                10
              </span>
              <span className="relative inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-paper/70">
                <Shield size={13} /> Universal Charter Inclusions
              </span>
              <h3 className="relative mt-2 sm:mt-3 font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-[1.12]">
                Ten things every member gets
              </h3>
              <span className="relative mt-3 sm:mt-5 block h-px w-10 sm:w-12 bg-paper/30" aria-hidden="true" />
              <p className="relative mt-3 sm:mt-5 max-w-sm text-xs sm:text-sm leading-relaxed text-paper/80">
                Every member receives all ten baseline entitlements. A student paying ₹500 receives equal core community access as an enterprise partner.
              </p>
            </motion.div>

            {/* Column A (Inclusions 01–05): order-2 on mobile, order-1 on lg */}
            <div className="order-2 flex flex-col gap-2.5 sm:gap-3 lg:order-1">
              {memberBenefits.slice(0, 5).map(({ title, text, icon: Icon }, idx) => (
                <div
                  key={title}
                  className="group flex items-start gap-3 sm:gap-3.5 rounded-sm border border-line/80 bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-ink/40 hover:shadow-xs"
                >
                  <Icon size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-sm sm:text-base font-bold text-ink/70 tabular-nums">
                        0{idx + 1}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-semibold leading-snug text-ink">
                        {title}
                      </h4>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Column B (Inclusions 06–10): order-3 on both mobile and lg */}
            <div className="order-3 flex flex-col gap-2.5 sm:gap-3 lg:order-3">
              {memberBenefits.slice(5, 10).map(({ title, text, icon: Icon }, idx) => (
                <div
                  key={title}
                  className="group flex items-start gap-3 sm:gap-3.5 rounded-sm border border-line/80 bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-ink/40 hover:shadow-xs"
                >
                  <Icon size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-sm sm:text-base font-bold text-ink/70 tabular-nums">
                        {idx + 6 < 10 ? `0${idx + 6}` : idx + 6}
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-semibold leading-snug text-ink">
                        {title}
                      </h4>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
