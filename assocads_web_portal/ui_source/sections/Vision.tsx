import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { vision, missionPoints } from '../content';
import { EASE, Reveal, Words } from '../motion';
import { Magnetic } from '../effects';
import { RevealImage } from './Gallery';

interface VisionProps {
  onJoin: (from?: HTMLElement | null) => void;
}

// Split layout: the vision on the pale side, a photo straddling the seam,
// and the eight mission points on an ink panel that runs to the edge of the screen.
export function Vision({ onJoin }: VisionProps) {
  return (
    <div className="section-pad relative">
      <div className="container-page relative">
        {/* Ink panel: starts at the right mission column (col 8) and bleeds off the right edge */}
        <motion.div
          className="absolute inset-y-0 right-[calc(50%-50vw)] hidden origin-right bg-ink lg:left-[58.33%] lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: EASE }}
          aria-hidden="true"
        />

        <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-0">
          {/* Left: the vision */}
          <div className="lg:col-span-4 lg:pr-10">
            <Words as="h2" text="Why we exist" className="text-[2.75rem] font-medium leading-[1.06] text-ink sm:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-6 font-display text-xl leading-snug text-ink md:text-2xl">{vision}</p>
              <p className="mt-6 leading-relaxed text-ink-muted">
                That is our vision. On the right are the eight things we have committed to doing to get there.
              </p>
              <div className="mt-10">
                <Magnetic>
                  <button type="button" onClick={(e) => onJoin(e.currentTarget)} className="btn btn-primary">
                    Become a member <ArrowRight size={16} />
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Middle: photo properly framed and situated entirely on the paper canvas */}
          <div className="lg:col-span-3 lg:py-16 lg:pr-8">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_25px_60px_-25px_rgba(20,14,18,0.45)] ring-1 ring-ink/10">
              <RevealImage
                src="/images/mentoring.webp"
                alt="A mentor working through a problem with two students"
                className="aspect-4/5 w-full object-cover lg:aspect-3/4"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </div>

          {/* Right: the mission, on ink */}
          <div className="rounded-2xl bg-ink px-6 py-10 text-paper sm:px-10 lg:col-span-5 lg:rounded-none lg:bg-transparent lg:py-16 lg:pl-14 lg:pr-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-paper/55">Our mission</p>
            <motion.ul
              className="mt-6"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.15 }}
              variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
            >
              {missionPoints.map(({ title, text, icon: Icon }) => (
                <motion.li
                  key={title}
                  className="group flex gap-5 border-b border-paper/12 py-4 last:border-0"
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
                  }}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper/25 text-paper transition-colors duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium leading-snug text-paper">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-paper/65">{text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </div>
  );
}
