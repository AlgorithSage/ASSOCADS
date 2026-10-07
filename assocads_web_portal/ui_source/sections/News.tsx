import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, X, Sparkles, BookOpen } from 'lucide-react';
import { newsArticles } from '../content';
import type { NewsArticle } from '../types';
import { EASE, Reveal, Words } from '../motion';

// Dotted geometric matrix accent matching Reference 1
function DotMatrix({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-6 gap-2 select-none pointer-events-none ${className}`} aria-hidden="true">
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/20" />
      ))}
    </div>
  );
}

export function News() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const featured = newsArticles.find((a) => a.featured) || newsArticles[0];
  const sideArticles = newsArticles.filter((a) => a.id !== featured.id);

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
    <section id="news" className="section-pad relative overflow-hidden bg-paper-2/40">
      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Hero Article Card with Dot Matrix Accent */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            {/* Dot Matrix Accent at Top-Right matching Reference 1 */}
            <DotMatrix className="absolute -top-6 -right-6 hidden sm:grid z-0" />

            <Reveal>
              <div className="group relative z-10 overflow-hidden rounded-2xl bg-ink shadow-2xl transition-transform duration-500 hover:-translate-y-1">
                {/* Background Image with Dark Vignette Gradient */}
                <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-square md:aspect-4/3 lg:aspect-4/5">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-60 transition-transform duration-700 ease-out-soft group-hover:scale-105 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 text-paper">
                  <div className="flex items-center gap-2 text-xs font-medium text-paper/75">
                    <Calendar size={13} className="text-amber-300" />
                    <span>{featured.date}</span>
                    <span className="text-paper/40">•</span>
                    <span className="rounded-full bg-paper/15 px-2.5 py-0.5 text-[10px] uppercase tracking-wider backdrop-blur-sm">
                      {featured.category}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-paper sm:text-3xl">
                    {featured.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-paper/80">
                    {featured.summary}
                  </p>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(featured)}
                      className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink shadow-md transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Section Header & Side Articles */}
          <div className="flex flex-col lg:col-span-6 xl:col-span-6 lg:pl-6">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
                <Sparkles size={14} className="text-ink/60" />
                <span>Press & Dispatches</span>
              </div>
            </Reveal>

            {/* Editorial Serif Header matching Reference 1 */}
            <Words
              text="Stay up to date with our fresh News"
              className="mt-3 text-3xl font-medium leading-[1.12] text-ink sm:text-4xl lg:text-5xl"
            />

            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
                Discover the latest fellowship announcements, research updates, campus bootcamps, and policy briefs from ASSOCADS.
              </p>
            </Reveal>

            {/* Side Articles Stack matching Reference 1 */}
            <div className="mt-8 space-y-5">
              {sideArticles.map((article, index) => (
                <Reveal key={article.id} delay={0.15 + index * 0.1}>
                  <div
                    onClick={() => setSelectedArticle(article)}
                    className="group flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm transition-all duration-300 hover:border-ink/25 hover:shadow-md hover:-translate-y-0.5 sm:flex-row sm:items-center cursor-pointer"
                  >
                    {/* Thumbnail Image on the left */}
                    <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-xl bg-paper-2 sm:h-28 sm:w-36">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Article Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-ink-muted">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span className="text-ink/60">{article.category}</span>
                        </div>
                        <h4 className="mt-1 font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-ink/80">
                          {article.title}
                        </h4>
                      </div>

                      {/* Coral / Terracotta accent link matching Reference 1 */}
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E05A47] transition-all duration-200 group-hover:translate-x-1">
                          Read More <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
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
              className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-paper shadow-2xl ring-1 ring-ink/15"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 28, stiffness: 280 } }}
              exit={{ opacity: 0, scale: 0.94, y: 20, transition: { duration: 0.22, ease: EASE } }}
            >
              {/* Image banner */}
              <div className="relative h-60 w-full overflow-hidden bg-ink sm:h-72">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-paper backdrop-blur-sm transition hover:bg-ink hover:scale-105"
                  aria-label="Close article"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="rounded-full bg-paper/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-paper backdrop-blur-sm">
                    {selectedArticle.category}
                  </span>
                  <p className="mt-2 text-xs font-medium text-paper/75">{selectedArticle.date}</p>
                </div>
              </div>

              {/* Body */}
              <div className="overflow-y-auto p-6 sm:p-10">
                <h3 id="article-modal-title" className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {selectedArticle.title}
                </h3>
                <p className="mt-4 font-display text-base italic leading-relaxed text-ink/75 sm:text-lg">
                  &ldquo;{selectedArticle.summary}&rdquo;
                </p>
                <div className="mt-6 border-t border-ink/10 pt-6">
                  <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                    {selectedArticle.content}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-ink/10 bg-paper-2/50 px-6 py-4 sm:px-10">
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <BookOpen size={14} />
                  <span>ASSOCADS Editorial Press Desk</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="btn btn-secondary px-5 py-2 text-xs"
                >
                  Close Dispatch
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
