import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { photos } from '../content';
import { EASE, EASE_INOUT, prefersReducedMotion, useMediaQuery } from '../motion';

// Photo that opens with a wipe, settles from a slight zoom, then drifts gently inside its frame
// while the page scrolls. The outer frame is observed (a fully clipped element never counts as "in view").
export function RevealImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <motion.div ref={ref} className={className} initial="hidden" whileInView="shown" viewport={{ once: false, amount: 0.2 }}>
      <motion.div
        className="h-full w-full overflow-hidden rounded-sm bg-paper-2"
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          shown: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE_INOUT } }
        }}
      >
        <motion.div
          className="h-full w-full"
          variants={{ hidden: { scale: 1.2 }, shown: { scale: 1, transition: { duration: 1.8, ease: EASE } } }}
        >
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full scale-[1.14] object-cover"
            style={{ y: drift }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// A row of photos that drifts sideways while the page scrolls and leans slightly with scroll speed
export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const reduced = prefersReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['4%', '-18%']);
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30, mass: 0.6 });
  const skew = useTransform(velocity, [-3000, 0, 3000], reduced || !wide ? [0, 0, 0] : [2.5, 0, -2.5]);

  return (
    <section ref={ref} className="overflow-hidden py-16 md:py-20" aria-label="Photos from our community">
      <motion.div style={{ x, skewY: skew }} className="flex w-max gap-4 pl-5 md:gap-6 md:pl-10">
        {photos.strip.map((photo, i) => (
          <RevealImage
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className={`shrink-0 ${
              i % 2 === 0 ? 'h-65 w-50 md:h-110 md:w-85' : 'mt-10 h-55 w-70 md:mt-20 md:h-90 md:w-120'
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
}
