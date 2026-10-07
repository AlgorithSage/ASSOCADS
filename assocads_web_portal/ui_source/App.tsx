import { useCallback, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { EASE, SectionDivider, prefersReducedMotion, useSmoothScroll } from './motion';
import { CustomCursor, Marquee, Preloader } from './effects';
import { tagline } from './content';
import { SiteHeader } from './sections/SiteHeader';
import { Hero } from './sections/Hero';
import { Gallery } from './sections/Gallery';
import { About } from './sections/About';
import { Vision } from './sections/Vision';
import { Programs } from './sections/Programs';
import { Plan } from './sections/Plan';
import { Goals } from './sections/Goals';
import { Membership } from './sections/Membership';
import { Summit } from './sections/Summit';
import { Events } from './sections/Events';
import { Team } from './sections/Team';
import { News } from './sections/News';
import { Contact } from './sections/Contact';
import { Faq } from './sections/Faq';
import { SiteFooter } from './sections/SiteFooter';
import { JoinModal, type Point } from './sections/JoinModal';

const DEFAULT_TYPE = 'Professional';
const TAGLINE_BAND = [...tagline, ...tagline];

export default function App() {
  useSmoothScroll();
  const [introDone, setIntroDone] = useState(() => prefersReducedMotion());
  const finishIntro = useCallback(() => setIntroDone(true), []);
  const [joinOpen, setJoinOpen] = useState(false);
  const [joinType, setJoinType] = useState(DEFAULT_TYPE);
  const [joinOrigin, setJoinOrigin] = useState<Point | null>(null);
  // Page recedes around the centre of the current viewport while the form is open
  const [recedeOrigin, setRecedeOrigin] = useState('50% 50%');

  const openJoin = useCallback((type: string = DEFAULT_TYPE, from?: HTMLElement | null) => {
    const r = from?.getBoundingClientRect();
    setJoinOrigin(r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null);
    setRecedeOrigin(`50% ${window.scrollY + window.innerHeight / 2}px`);
    setJoinType(type);
    setJoinOpen(true);
  }, []);
  const openJoinDefault = useCallback((from?: HTMLElement | null) => openJoin(DEFAULT_TYPE, from), [openJoin]);
  const closeJoin = useCallback(() => setJoinOpen(false), []);
  const recede = joinOpen && !prefersReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <Preloader done={introDone} onDone={finishIntro} />
      <CustomCursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-80 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader onJoin={openJoinDefault} />
      <motion.div
        animate={{ scale: recede ? 0.985 : 1, opacity: recede ? 0.85 : 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformOrigin: recedeOrigin }}
      >
        <main id="main">
          <Hero onJoin={openJoinDefault} ready={introDone} />
          <Gallery />

          <SectionDivider label="About" />
          <About />

          <SectionDivider label="Vision & mission" />
          <Vision onJoin={openJoinDefault} />

          <SectionDivider label="What we do" />
          <Programs />

          <Marquee items={TAGLINE_BAND} />

          <SectionDivider label="The plan" />
          <Plan />

          <SectionDivider label="Goals" />
          <Goals />

          <SectionDivider label="Membership" />
          <Membership onJoin={openJoin} />

          <SectionDivider label="Summit" />
          <Summit />

          <SectionDivider label="Events" />
          <Events onRegister={openJoinDefault} />

          <SectionDivider label="Office bearers" />
          <Team />

          <SectionDivider label="News & dispatches" />
          <News />

          <SectionDivider label="Get in touch" />
          <Contact />

          <SectionDivider label="Questions" />
          <Faq />

          <Marquee items={TAGLINE_BAND} direction={-1} variant="outline" />
        </main>
        <SiteFooter onJoin={openJoinDefault} />
      </motion.div>
      <JoinModal open={joinOpen} initialType={joinType} origin={joinOrigin} onClose={closeJoin} />
    </MotionConfig>
  );
}
