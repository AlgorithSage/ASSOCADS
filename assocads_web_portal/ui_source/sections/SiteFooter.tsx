import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
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
      <section className="section-pad bg-[#F4EFE6] border-b border-ink/15">
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

      <footer ref={ref} className="relative overflow-hidden bg-[#1F181E] border-t-2 border-paper/15 pt-20 text-paper">
        <div className="container-page grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <Reveal>
            <a href="#top" className="inline-block rounded-sm bg-paper p-4" aria-label="ASSOCADS, back to top">
              <img src="/logo-full.webp" alt="Association for AI and Data Science (ASSOCADS). Collaborate, Connect, Create Impact" width={160} height={209} className="h-auto w-40" loading="lazy" />
            </a>
            <p className="mt-4 max-w-sm text-sm text-paper/65">
              Association for AI and Data Science. A registered non-profit public trust. Audited accounts are published every year.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/60">Pages</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
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
          <Reveal delay={0.2}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/60">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-paper/85">
              <li>
                <a href={`mailto:${contact.email}`} className="link-draw inline-flex items-center gap-2 text-paper/85 hover:text-paper">
                  <Mail size={16} /> {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" /> {contact.address}
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="container-page mt-12 flex flex-col gap-2 border-t border-paper/15 py-6 text-xs text-paper/55 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} ASSOCADS Trust. All rights reserved.</p>
          <p>Made in West Bengal</p>
        </div>

        <motion.p
          aria-hidden="true"
          style={{ y: wordmarkY, opacity: wordmarkOpacity }}
          className="pointer-events-none select-none text-center font-display text-[18vw] font-medium leading-[0.8] tracking-tighter text-paper/[0.07]"
        >
          ASSOCADS
        </motion.p>
      </footer>
    </>
  );
}
