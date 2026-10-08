import { useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion';
import { GraduationCap, Building2, FlaskConical, Landmark } from 'lucide-react';
import { partners } from '../content';
import type { PartnerLogo } from '../content';
import { Reveal, Words, prefersReducedMotion } from '../motion';

const typeIcon = {
  university: GraduationCap,
  company: Building2,
  research: FlaskConical,
  government: Landmark
};

const typeLabel: Record<PartnerLogo['type'], string> = {
  university: 'University',
  company: 'Industry',
  research: 'Research',
  government: 'Government'
};

function MockLogo({ name }: { name: string }) {
  switch (name) {
    case 'TCS':
      return (
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-extrabold tracking-[0.25em] text-[#0072C6]">TATA</span>
            <span className="font-display text-lg font-black tracking-wider text-[#0A192F] leading-none">tcs</span>
          </div>
        </div>
      );
    case 'Infosys':
      return (
        <div className="flex items-center">
          <span className="font-sans text-xl font-bold tracking-tight text-[#007CC3]">
            Infosys<span className="text-[#F58220] font-normal">.</span>
          </span>
        </div>
      );
    case 'Wipro':
      return (
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
            <circle cx="12" cy="4" r="2.5" fill="#E02424" />
            <circle cx="19" cy="8" r="2.2" fill="#F59E0B" />
            <circle cx="19" cy="16" r="2.2" fill="#10B981" />
            <circle cx="12" cy="20" r="2.5" fill="#3B82F6" />
            <circle cx="5" cy="16" r="2.2" fill="#8B5CF6" />
            <circle cx="5" cy="8" r="2.2" fill="#EC4899" />
            <circle cx="12" cy="12" r="2" fill="#1E293B" />
          </svg>
          <span className="font-sans text-lg font-bold tracking-tight text-[#1E293B]">wipro</span>
        </div>
      );
    case 'Cognizant':
      return (
        <div className="flex items-center gap-1.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
            <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 7.8-4.5l-2.6-1.5A6 6 0 1 1 18 12h3a9 9 0 0 0-9-9z" fill="#0033A0" />
            <circle cx="12" cy="12" r="2.5" fill="#00A3E0" />
          </svg>
          <span className="font-sans text-base font-bold tracking-tight text-[#0033A0]">Cognizant</span>
        </div>
      );
    case 'IIT Kharagpur':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#7D1B28] text-[#F3E5AB] shadow-xs">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" />
              <circle cx="12" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 1" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#7D1B28]">IIT KGP</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">Est. 1951</div>
          </div>
        </div>
      );
    case 'Jadavpur University':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1B4D3E] text-[#F4E0A5] shadow-xs">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 2c-1.5 2-3 4-3 7a3 3 0 0 0 6 0c0-3-1.5-5-3-7z" fill="currentColor" />
              <path d="M9 13v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7" />
              <path d="M8 13h8" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#1B4D3E]">JADAVPUR</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">University</div>
          </div>
        </div>
      );
    case 'ISI Kolkata':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-sm bg-[#1A365D] text-white shadow-xs">
            <span className="font-serif text-lg font-bold leading-none">Σ</span>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-widest text-[#1A365D]">ISI KOLKATA</div>
            <div className="text-[8px] uppercase tracking-wider text-ink-muted">Statistics Inst.</div>
          </div>
        </div>
      );
    case 'University of Calcutta':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#800000] text-[#800000]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
              <path d="M6 6h10M6 10h10M6 14h6" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#800000]">CALCUTTA</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">Est. 1857</div>
          </div>
        </div>
      );
    case 'NIT Durgapur':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0D3B66] text-[#F4D35E]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-6.5-2.8 2.8m-7.4 7.4-2.8 2.8m13 0-2.8-2.8m-7.4-7.4-2.8-2.8" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#0D3B66]">NIT DURGAPUR</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">National Tech</div>
          </div>
        </div>
      );
    case 'IIEST Shibpur':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#5C1D24] text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#5C1D24]">IIEST SHIBPUR</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">Est. 1856 (BESU)</div>
          </div>
        </div>
      );
    case 'Presidency University':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#203254] text-[#E0B85C]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 3v18M5 8h14M7 13h10M9 18h6" />
              <circle cx="12" cy="5" r="2" fill="currentColor" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#203254]">PRESIDENCY</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">College 1817</div>
          </div>
        </div>
      );
    case 'IIM Calcutta':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-sm bg-[#541324] text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="none" stroke="currentColor" strokeWidth="2" />
              <polygon points="12,6 18,10 18,14 12,18 6,14 6,10" fill="currentColor" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#541324]">IIM CALCUTTA</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">Joka Campus</div>
          </div>
        </div>
      );
    case 'Dept. of IT & Electronics, GoWB':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0E5A35] text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3v18M3 12h18M6 6l12 12M6 18L18 6" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#0E5A35]">GoWB IT&E</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">State IT Dept.</div>
          </div>
        </div>
      );
    case 'NASSCOM East':
      return (
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-sm bg-[#D32F2F] text-white font-black text-sm">
            N
          </div>
          <div className="text-left">
            <div className="font-sans text-base font-black tracking-tight text-[#1E293B]">NASSCOM</div>
            <div className="text-[8px] font-bold uppercase tracking-wider text-[#D32F2F]">East Chapter</div>
          </div>
        </div>
      );
    case 'STPI Kolkata':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#004B87] text-[#FF8200]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#004B87]">STPI KOLKATA</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">Govt of India</div>
          </div>
        </div>
      );
    case 'Bengal Chamber of Commerce':
      return (
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#654321] text-[#E5D3B3]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 18l8 3 8-3v-6l-8-3-8 3v6z" />
              <path d="M12 3v9M8 6l4-3 4 3" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-wider text-[#654321]">BCC&I</div>
            <div className="text-[8px] uppercase tracking-widest text-ink-muted">Est. 1853 Kolkata</div>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2">
          <span className="font-display text-base font-bold text-ink">{name}</span>
        </div>
      );
  }
}

function PartnerCard({ partner }: { partner: PartnerLogo }) {
  const Icon = typeIcon[partner.type];
  return (
    <div className="mx-2.5 flex w-64 shrink-0 flex-col items-center justify-between rounded-sm border border-line bg-white px-5 py-5 text-center shadow-[0_8px_20px_-16px_rgba(46,36,44,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_16px_32px_-16px_rgba(46,36,44,0.25)]">
      {/* Authentic Mock Logo */}
      <div className="flex h-12 w-full items-center justify-center">
        <MockLogo name={partner.name} />
      </div>

      {/* Name */}
      <span className="mt-3 line-clamp-1 text-xs font-semibold leading-tight text-ink" title={partner.name}>
        {partner.name}
      </span>

      {/* Type badge */}
      <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-ink-muted">
        <Icon size={11} strokeWidth={1.8} />
        {typeLabel[partner.type]}
      </span>
    </div>
  );
}

function ScrollingRow({ direction = 1, speed = 0.035 }: { direction?: 1 | -1; speed?: number }) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const reduced = prefersReducedMotion();
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (reduced || paused) return;
    baseX.set(baseX.get() - direction * speed * (delta / 1000) * 60);
  });

  const doubled = [...partners, ...partners];

  return (
    <div
      className="flex w-max cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className="flex w-max" style={{ x }} aria-hidden="true">
        {doubled.map((p, i) => (
          <PartnerCard key={`${p.name}-${i}`} partner={p} />
        ))}
      </motion.div>
    </div>
  );
}

export function Partners() {
  return (
    <div className="section-pad">
      <div className="container-page mb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-ink/40" aria-hidden="true" />
                Our network
              </span>
            </Reveal>
            <Words
              text="Member organisations & campus chapters"
              className="mt-4 text-3xl font-medium text-ink md:text-5xl"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              From leading universities and research institutions to global
              IT firms and government bodies, our growing network spans the
              entire ecosystem.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Infinite scroll strip with gentle speed and pause on hover */}
      <div className="overflow-hidden py-2" aria-label="Partner organisations">
        <ScrollingRow direction={-1} speed={0.032} />
      </div>
    </div>
  );
}
