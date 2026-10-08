import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NotchedCard } from '../NotchedCard';
import { newsArticles } from '../content';
import type { NewsArticle } from '../types';
import { EASE, Reveal, Words } from '../motion';

export function News() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);


  // Lock body scroll when modal is open
  useEffect(() => {
    if (!selectedArticle) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedArticle]);

  return (
    <div className="section-pad relative">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="text-sm text-ink-muted">News and updates</p>
            </Reveal>
            <Words text="What's new at ASSOCADS" className="mt-3 text-4xl font-medium leading-[1.08] text-ink md:text-5xl" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm leading-relaxed text-ink-muted">
              Announcements, training news and open calls. Open any story to read it in full.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.15 }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }}
        >
          {newsArticles.map((article) => (
            <motion.div
              key={article.id}
              variants={{ hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            >
              <NotchedCard
                title={article.title}
                description={article.summary}
                image={article.image}
                imageAlt={article.title}
                badge={article.date}
                tags={[article.category]}
                surface="#F7F4EE"
                onOpen={() => setSelectedArticle(article)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-ink/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              aria-hidden="true"
            />

            {/* Modal Box */}
            <motion.div
              className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-line bg-paper"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 28, stiffness: 280 } }}
              exit={{ opacity: 0, scale: 0.94, y: 20, transition: { duration: 0.22, ease: EASE } }}
            >
              {/* Image banner */}
              <div className="relative h-44 w-full overflow-hidden bg-ink sm:h-52">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-sm bg-ink/70 text-paper backdrop-blur-sm transition hover:bg-ink"
                  aria-label="Close article"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-3 left-5 right-5">
                  <span className="rounded-xs bg-paper/20 px-2.5 py-0.5 text-xs text-paper backdrop-blur-sm">
                    {selectedArticle.category}
                  </span>
                  <p className="mt-1.5 text-xs font-medium text-paper/75">{selectedArticle.date}</p>
                </div>
              </div>

              {/* Body */}
              <div className="scroll-x-clean overflow-y-auto overscroll-contain p-5 sm:p-7" data-lenis-prevent>
                <h3 id="article-modal-title" className="font-display text-xl font-medium leading-tight text-ink sm:text-2xl">
                  {selectedArticle.title}
                </h3>
                <p className="mt-3 font-display text-sm leading-relaxed text-ink/75 sm:text-base">
                  &ldquo;{selectedArticle.summary}&rdquo;
                </p>
                <div className="mt-4 border-t border-ink/10 pt-4">
                  <p className="text-xs leading-relaxed text-ink-muted sm:text-sm">
                    {selectedArticle.content}
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
