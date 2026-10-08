import { useCallback, useState, lazy, Suspense } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { EASE, SectionDivider, prefersReducedMotion, useSmoothScroll } from './motion';
import { CustomCursor, Marquee, Preloader } from './effects';
import { tagline } from './content';
import { BulletinBar } from './sections/BulletinBar';
import { SiteHeader } from './sections/SiteHeader';
import { Hero } from './sections/Hero';
import { Gallery } from './sections/Gallery';
import { About } from './sections/About';
import { Partners } from './sections/Partners';
import { Vision } from './sections/Vision';
import { Objectives } from './sections/Objectives';
import { Programs } from './sections/Programs';
import { Plan } from './sections/Plan';
import { Goals } from './sections/Goals';
import { Engagement } from './sections/Engagement';
import { Membership } from './sections/Membership';
import { Summit } from './sections/Summit';
import { Events } from './sections/Events';
import { Team } from './sections/Team';
import { News } from './sections/News';
import { Contact } from './sections/Contact';
import { Faq } from './sections/Faq';
import { SiteFooter } from './sections/SiteFooter';
import type { Point } from './sections/JoinModal';

const JoinModal = lazy(() => import('./sections/JoinModal').then((m) => ({ default: m.JoinModal })));

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
      <BulletinBar />
      <SiteHeader onJoin={openJoinDefault} />
      <motion.div
        animate={{ scale: recede ? 0.985 : 1, opacity: recede ? 0.85 : 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ transformOrigin: recedeOrigin }}
      >
        <main id="main">
          {/* Section 1: Hero — Warm Light Paper Canvas */}
          <div className="bg-[#FAF8F5] paper-texture border-b border-ink/15">
            <Hero onJoin={openJoinDefault} ready={introDone} />
          </div>

          {/* Section 2: Gallery Strip — Warm Stone Parchment */}
          <div className="bg-[#EDE7DC] paper-texture border-b border-ink/15 shadow-inner">
            <Gallery />
          </div>

          {/* Section 3: About — Warm Ivory Paper */}
          <section id="about" className="bg-[#F6F4EF] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="About" />
            <About />
          </section>

          {/* Section 3b: Partners & Campus Chapters Strip */}
          <div className="bg-[#F2EEE6] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="Our network" />
            <Partners />
          </div>

          {/* Section 4: Vision & Mission — Dual Architectural Theme Canvas */}
          <section id="vision" className="bg-[#FAF8F4] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="Vision & mission" />
            <Vision onJoin={openJoinDefault} />
          </section>

          {/* Section 4b: Objectives — 5-Pillar Grid */}
          <section id="objectives" className="bg-[#F4F0E8] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="Objectives" />
            <Objectives />
          </section>

          {/* Section 5: Leaders & Governors — Heritage Sandstone Parchment (Upper Placement) */}
          <section id="leaders" className="bg-[#EBE4D7] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)] scroll-mt-20">
            <div id="team" className="sr-only" aria-hidden="true" />
            <SectionDivider label="Leaders & governors" />
            <Team />
          </section>

          {/* Section 6: What We Do (Programs) — Warm Ochre Sandstone */}
          <section id="programs" className="bg-[#EFE9DD] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="What we do" />
            <Programs />
          </section>

          {/* Section 7: Marquee Tagline Band — Deep Velvet Ink Contrast */}
          <div className="bg-[#241C23] border-b border-paper/20 text-white">
            <Marquee items={TAGLINE_BAND} dark />
          </div>

          {/* Section 8: The Plan — Soft Alabaster Paper */}
          <section id="plan" className="bg-[#F8F6F1] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="The plan" />
            <Plan />
          </section>

          {/* Section 9: Goals — Warm River-Stone Parchment */}
          <section id="goals" className="bg-[#EAE3D6] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="Goals" />
            <Goals />
          </section>

          {/* Section 9b: Dual Engagement Pathways — Before Membership */}
          <section className="bg-[#F6F3EC] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="Choose your path" />
            <Engagement onJoin={openJoin} />
          </section>

          {/* Section 10: Membership (Pricing) — Clean Cream Ivory */}
          <section id="membership" className="bg-[#FAF8F4] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="Membership" />
            <Membership onJoin={openJoin} />
          </section>

          {/* Section 11: State Summit — Flagship Midnight Velvet Ink */}
          <section id="summit" className="bg-[#2E242C] border-b border-paper/10 text-paper shadow-2xl">
            <SectionDivider label="Summit" dark />
            <Summit />
          </section>

          {/* Section 12: Events — Warm Oat Parchment */}
          <section id="events" className="bg-[#F2EEE4] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="Events" />
            <Events onRegister={openJoinDefault} />
          </section>

          {/* Section 13: News & Dispatches — Warm Editorial Newsprint */}
          <section id="news" className="bg-[#F7F4EE] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="News & dispatches" />
            <News />
          </section>

          {/* Section 14: Get in Touch (Contact) — Warm Desert Dune */}
          <section id="contact" className="bg-[#EDE5D6] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="Get in touch" />
            <Contact />
          </section>

          {/* Section 15: Questions (FAQ) — Soft Pearl Paper */}
          <section id="faq" className="bg-[#F9F7F2] paper-texture border-b border-ink/15 shadow-[0_4px_20px_-10px_rgba(46,36,44,0.03)]">
            <SectionDivider label="FAQ" />
            <Faq />
          </section>

        </main>
        <SiteFooter onJoin={openJoinDefault} />
      </motion.div>
      {joinOpen && (
        <Suspense fallback={null}>
          <JoinModal open={joinOpen} initialType={joinType} origin={joinOrigin} onClose={closeJoin} />
        </Suspense>
      )}
    </MotionConfig>
  );
}
