import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUp, Mail, MapPin, Phone, Rocket, Building2, FileText, Shield, Scale, BookOpen, ExternalLink } from 'lucide-react';
import { navLinks, contact, governanceLinks } from '../content';
import { Reveal, Words, scrollToId } from '../motion';

interface SiteFooterProps {
  onJoin: (from?: HTMLElement | null) => void;
}

export function SiteFooter({ onJoin }: SiteFooterProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ['60%', '0%']);
  const wordmarkOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <>
      {/* Closing call to action with dedicated theme shade and boundary */}
      <section className="bg-[#F4EFE6] py-20 md:py-28 lg:py-32">
        <div className="container-page text-center">
          <Words text="Ready to be part of it?" className="mx-auto max-w-3xl text-4xl font-medium text-ink md:text-6xl" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-muted">
              Membership takes two minutes to apply for. We read every application and reply by email.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={(e) => onJoin(e.currentTarget)} className="btn btn-primary w-full sm:w-auto">
                Apply for membership <ArrowRight size={18} />
              </button>
              <a href={`mailto:${contact.email}`} className="btn btn-ghost w-full sm:w-auto">
                Email us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer ref={ref} className="relative overflow-hidden bg-[#1F181E] text-paper">
        {/* Statement row */}
        <div className="container-page flex flex-col gap-8 border-b border-paper/12 py-16 md:flex-row md:items-end md:justify-between md:py-20">
          <Reveal>
            <p className="max-w-xl font-display text-4xl font-medium leading-[1.08] md:text-5xl">
              Building Bengal's AI ecosystem.
              <span className="block text-paper/55">Catalyzing research, enterprise, and talent.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={(e) => onJoin(e.currentTarget)}
                className="btn border border-paper bg-paper text-ink hover:bg-white"
              >
                Become a member <ArrowRight size={16} />
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('#contact');
                }}
                className="btn btn-on-dark"
              >
                Partner with us <Rocket size={16} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Expanded columns: 6-column institutional footer */}
        <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr_1.4fr] lg:gap-8">
          {/* Column 1: About */}
          <Reveal>
            <a href="#top" className="flex items-center gap-3" aria-label="ASSOCADS, back to top">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper p-1">
                <img src="/logo-mark.webp" alt="" width={40} height={40} className="h-full w-full object-contain" loading="lazy" />
              </span>
              <span className="font-display text-xl font-semibold tracking-[0.04em]">ASSOCADS</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
              Association for AI and Data Science. A registered non-profit public trust dedicated to
              building the state's largest community for data science, AI and emerging technology.
            </p>
            <p className="mt-4 text-[0.7rem] leading-relaxed text-paper/40">
              Our audited accounts are published every year. All governance documents are available on request.
            </p>
          </Reveal>

          {/* Column 2: Explore */}
          <Reveal delay={0.05}>
            <h2 className="text-sm text-paper/50">Explore</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.href);
                    }}
                    className="link-draw text-paper/85 hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Column 3: Get involved */}
          <Reveal delay={0.1}>
            <h2 className="text-sm text-paper/50">Get involved</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {navLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.href);
                    }}
                    className="link-draw text-paper/85 hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={(e) => onJoin(e.currentTarget)}
                  className="link-draw text-paper/85 hover:text-paper"
                >
                  Apply for membership
                </button>
              </li>
            </ul>
          </Reveal>

          {/* Column 4: Trust governance */}
          <Reveal delay={0.15}>
            <h2 className="text-sm text-paper/50">Trust & governance</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {governanceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="link-draw inline-flex items-center gap-1.5 text-paper/85 hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Column 5: Contact / Secretariat */}
          <Reveal delay={0.2}>
            <h2 className="text-sm text-paper/50">Secretariat</h2>
            <ul className="mt-5 space-y-4 text-[0.92rem] text-paper/85">
              <li>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-paper/45">Registered Trust Office</p>
                <p className="mt-1.5 flex items-start gap-2.5 leading-relaxed text-paper/75">
                  <MapPin size={14} strokeWidth={1.6} className="mt-1 shrink-0" />
                  {contact.registeredOffice}
                </p>
              </li>
              <li>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-paper/45">General Secretary's Desk</p>
                <p className="mt-1.5 flex items-start gap-2.5 leading-relaxed text-paper/75">
                  <MapPin size={14} strokeWidth={1.6} className="mt-1 shrink-0" />
                  {contact.secretariat}
                </p>
              </li>
              <li className="space-y-2 border-t border-paper/10 pt-4">
                <a href={`mailto:${contact.email}`} className="link-draw flex items-center gap-2 text-paper/80 hover:text-paper">
                  <Mail size={14} strokeWidth={1.6} />
                  {contact.email}
                </a>
                <a href={`mailto:${contact.adminEmail}`} className="link-draw flex items-center gap-2 text-paper/80 hover:text-paper">
                  <Mail size={14} strokeWidth={1.6} />
                  {contact.adminEmail}
                </a>
                <span className="flex items-center gap-2 text-paper/60">
                  <Phone size={14} strokeWidth={1.6} />
                  {contact.phone}
                </span>
              </li>
              <li className="text-xs text-paper/45">We reply within two working days.</li>
            </ul>
          </Reveal>
        </div>

        {/* Bottom row */}
        <div className="container-page flex flex-col gap-4 border-t border-paper/12 py-6 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ASSOCADS Trust. Registered non-profit. Made in West Bengal.</p>
          <button
            type="button"
            onClick={() => scrollToId('#top')}
            className="group inline-flex items-center gap-2 self-start text-paper/70 transition-colors hover:text-paper sm:self-auto"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-paper/25 transition-colors group-hover:border-paper">
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        <motion.p
          aria-hidden="true"
          style={{ y: wordmarkY, opacity: wordmarkOpacity }}
          className="pointer-events-none -mb-[2vw] select-none text-center font-display text-[18vw] font-medium leading-[0.8] tracking-tighter text-paper/[0.06]"
        >
          ASSOCADS
        </motion.p>
      </footer>
    </>
  );
}
