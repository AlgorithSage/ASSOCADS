import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUp, Mail, MapPin } from 'lucide-react';
import { navLinks, contact } from '../content';
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
              Learn it. Build it.
              <span className="block text-paper/55">Share it with everyone.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={(e) => onJoin(e.currentTarget)}
              className="btn border border-paper bg-paper text-ink hover:bg-white"
            >
              Become a member <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>

        {/* Columns */}
        <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <Reveal>
            <a href="#top" className="flex items-center gap-3" aria-label="ASSOCADS, back to top">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper p-1">
                <img src="/logo-mark.webp" alt="" width={40} height={40} className="h-full w-full object-contain" loading="lazy" />
              </span>
              <span className="font-display text-xl font-semibold tracking-[0.04em]">ASSOCADS</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
              Association for AI and Data Science. A registered non-profit public trust. Our audited accounts are published every
              year.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-sm text-paper/50">Explore</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {navLinks.slice(0, 4).map((link) => (
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

          <Reveal delay={0.1}>
            <h2 className="text-sm text-paper/50">Get involved</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {navLinks.slice(4).map((link) => (
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

          <Reveal delay={0.15}>
            <h2 className="text-sm text-paper/50">Talk to us</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-paper/85">
              <li>
                <a href={`mailto:${contact.email}`} className="link-draw inline-flex items-center gap-2.5 hover:text-paper">
                  <Mail size={16} strokeWidth={1.6} /> {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} strokeWidth={1.6} className="mt-1 shrink-0" /> {contact.address}
              </li>
              <li className="text-sm text-paper/55">We reply within two working days.</li>
            </ul>
          </Reveal>
        </div>

        {/* Bottom row */}
        <div className="container-page flex flex-col gap-4 border-t border-paper/12 py-6 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ASSOCADS Trust. Made in West Bengal.</p>
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
