import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../content';
import { EASE, scrollToId, setPageScrollLocked } from '../motion';

interface SiteHeaderProps {
  onJoin: (from?: HTMLElement | null) => void;
}

export function Logo({ className = 'text-paper' }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`} aria-label="ASSOCADS, back to top">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper p-1 shadow-[inset_0_0_0_1px_rgba(46,36,44,0.12)]">
        <img src="/logo-mark.webp" alt="" width={36} height={36} className="h-full w-full object-contain" />
      </span>
      <span className="font-display text-xl font-semibold tracking-[0.01em]">ASSOCADS</span>
    </a>
  );
}

export function SiteHeader({ onJoin }: SiteHeaderProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  // Over the hero the bar runs edge to edge; past it, it becomes the floating glass bar
  const [overHero, setOverHero] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    // Retract immediately as soon as someone starts scrolling down
    const isScrollingDown = y > lastY.current && y > 20;
    const isScrollingUp = y < lastY.current;

    if (isScrollingDown && !menuOpen) {
      setHidden(true);
    } else if (isScrollingUp || y <= 20) {
      setHidden(false);
    }

    setOverHero(y < window.innerHeight - 120);
    lastY.current = y;
  });

  useEffect(() => {
    setPageScrollLocked(menuOpen);
    return () => setPageScrollLocked(false);
  }, [menuOpen]);

  // Highlight the nav link for the section currently on screen
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-80 h-[2px] origin-left bg-ink pointer-events-none"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <motion.header
        className={`fixed inset-x-0 z-50 transition-[padding,top] duration-500 ease-out-soft ${
          overHero ? 'top-9 px-0 pt-0' : 'top-0 px-6 pt-6 md:px-9 md:pt-8'
        }`}
        animate={{ y: hidden ? '-130%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <nav
          className={`mx-auto flex items-center justify-between backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ease-out-soft ${
            overHero
              ? 'h-20 max-w-full border-b border-paper/15 bg-ink/20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'
              : 'h-16 max-w-[1360px] rounded-sm border border-paper/10 bg-ink/80 px-3 shadow-[0_12px_30px_-18px_rgba(46,36,44,0.45)] md:px-5'
          }`}
          aria-label="Main"
        >
          <Logo />

          <ul className="hidden items-center gap-0 lg:gap-0.5 xl:gap-1 min-[920px]:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={`group relative px-2 py-1.5 text-xs font-medium transition-colors lg:px-2.5 lg:text-[13px] xl:px-3.5 xl:text-sm ${
                    active === link.href ? 'text-white font-semibold' : 'text-paper/75 hover:text-white'
                  }`}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 bottom-0 h-0.5 bg-paper rounded-full lg:inset-x-2.5 xl:inset-x-3.5"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className="absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-paper/60 transition-transform duration-300 ease-out-soft group-hover:scale-x-100 lg:inset-x-2.5 xl:inset-x-3.5"
                    aria-hidden="true"
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {!menuOpen && (
              <button
                type="button"
                onClick={(e) => onJoin(e.currentTarget)}
                className="btn hidden min-h-10! border border-paper bg-paper px-4! text-xs font-semibold text-ink hover:bg-white sm:inline-flex lg:min-h-10.5! lg:px-5! lg:text-sm"
              >
                Join now
              </button>
            )}
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 text-paper min-[920px]:hidden hover:border-paper hover:bg-paper/10"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ink/95 backdrop-blur-xl min-[920px]:hidden"
            initial={{ clipPath: 'circle(0% at 92% 36px)' }}
            animate={{ clipPath: 'circle(150% at 92% 36px)' }}
            exit={{ clipPath: 'circle(0% at 92% 36px)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ul className="container-page flex min-h-full flex-col justify-center gap-0.5 py-28">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  className="border-b border-paper/10 last:border-0"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.045, duration: 0.5, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className="block py-3.5 font-display text-2xl font-medium leading-none text-paper sm:text-3xl"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
                className="mt-8"
              >
                <button
                  type="button"
                  className="btn w-full bg-paper text-ink"
                  onClick={() => {
                    setMenuOpen(false);
                    onJoin(null);
                  }}
                >
                  Join now
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
