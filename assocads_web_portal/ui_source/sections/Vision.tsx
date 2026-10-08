import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { vision, missionPoints } from '../content';
import { EASE, scrollToId } from '../motion';
import { Magnetic } from '../effects';

interface VisionProps {
  onJoin: (from?: HTMLElement | null) => void;
}

const tile = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } }
};

function MissionTile({ index }: { index: number }) {
  const { title, text, icon: Icon, badge, cta, href } = missionPoints[index];
  return (
    <motion.div variants={tile} whileHover="hover" className="h-full">
      <motion.article
        variants={{ hover: { y: -4 } }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-linear-to-br from-white to-paper-2 p-6 transition-shadow duration-500 hover:shadow-[0_24px_48px_-30px_rgba(46,36,44,0.45)]"
      >
        {/* Large faded icon in the corner: grows and tilts on hover */}
        <motion.span
          variants={{ hover: { scale: 1.12, rotate: 4 } }}
          transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          className="pointer-events-none absolute -bottom-6 -right-6 text-ink/[0.07]"
          aria-hidden="true"
        >
          <Icon size={150} strokeWidth={0.9} />
        </motion.span>

        <div className="relative flex h-full flex-col">
          <span className="inline-flex w-fit items-center gap-2.5 text-sm text-ink-soft">
            <span className="h-4 w-0.5 bg-ink" aria-hidden="true" />
            {badge}
          </span>
          <h3 className="mt-4 font-display text-[1.2rem] font-medium leading-snug text-ink">{title}</h3>
          <p className="mt-2 max-w-[28ch] text-[0.94rem] leading-relaxed text-ink-muted">{text}</p>
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(href);
            }}
            className="group/cta mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-medium text-ink"
          >
            {cta}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
          </a>
        </div>
      </motion.article>
    </motion.div>
  );
}

function PhotoTile({ src, alt, caption, className }: { src: string; alt: string; caption: string; className: string }) {
  return (
    <motion.figure variants={tile} className={`group relative overflow-hidden rounded-sm bg-paper-2 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden="true" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 font-display text-lg leading-snug text-paper md:text-xl">{caption}</figcaption>
    </motion.figure>
  );
}

// Vision & mission as a bento grid: the vision in the large ink tile, the eight
// commitments as small tiles written from the visitor's side ("what you get"),
// and real-life photos in between so it reads as people, not a list.
export function Vision({ onJoin }: VisionProps) {
  return (
    <div className="section-pad">
      <div className="container-page">
        <motion.div
          className="grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-4"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.08 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* Vision */}
          <motion.article
            variants={tile}
            className="relative flex flex-col justify-between overflow-hidden rounded-sm bg-ink p-8 text-paper sm:col-span-2 lg:row-span-2 md:p-10"
          >
            <img
              src="/images/vision-duotone.webp"
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/80 to-ink/40" aria-hidden="true" />
            <div className="relative">
              <span className="text-sm text-paper/60">Our vision</span>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.06] md:text-5xl">Why we exist</h2>
            </div>
            <div className="relative mt-10">
              <p className="max-w-lg font-display text-xl leading-snug md:text-2xl">{vision}</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">
                Below are the eight promises we make to every member, and what each one means for you.
              </p>
              <div className="mt-8">
                <Magnetic>
                  <button
                    type="button"
                    onClick={(e) => onJoin(e.currentTarget)}
                    className="btn border border-paper bg-paper text-ink hover:bg-white"
                  >
                    Become a member <ArrowRight size={16} />
                  </button>
                </Magnetic>
              </div>
            </div>
          </motion.article>

          <PhotoTile
            src="/images/students-laptops.webp"
            alt="Students working together on laptops"
            caption="Learn by building real things, with people who have done it."
            className="min-h-75 lg:row-span-2"
          />
          <MissionTile index={0} />
          <MissionTile index={1} />

          <MissionTile index={2} />
          <PhotoTile
            src="/images/conference-audience.webp"
            alt="An audience listening at a conference"
            caption="Meet colleges, companies and government in one room."
            className="min-h-75 sm:col-span-2 lg:row-span-2"
          />
          <MissionTile index={3} />
          <MissionTile index={4} />
          <MissionTile index={5} />

          <MissionTile index={6} />
          <MissionTile index={7} />
          <PhotoTile
            src="/images/mentoring.webp"
            alt="A mentor helping two students"
            caption="Get a mentor, a job lead or a research partner. That is the point of joining."
            className="min-h-55 sm:col-span-2"
          />
        </motion.div>
      </div>
    </div>
  );
}
