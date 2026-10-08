import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { tiers } from '../content';
import { EASE, EASE_INOUT, setPageScrollLocked, useMediaQuery, prefersReducedMotion } from '../motion';

export interface Point {
  x: number;
  y: number;
}

interface JoinModalProps {
  open: boolean;
  initialType: string;
  /** Centre of the button that opened the form, so the panel can grow out of it. */
  origin: Point | null;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'sent';

const ALL_TYPES = Object.values(tiers)
  .flat()
  .map((t) => t.name);

const fieldClass =
  'mt-1 w-full rounded-sm border border-line bg-paper/60 px-3 py-2 text-xs sm:text-[13px] text-ink placeholder:text-ink-muted/50 transition-colors focus:border-ink focus:bg-white focus:outline-none';

export function JoinModal({ open, initialType, origin, onClose }: JoinModalProps) {
  const desktop = useMediaQuery('(min-width: 640px)');
  const reduced = prefersReducedMotion();

  // Desktop: panel expands out of (and collapses back into) the clicked button.
  // Mobile: a simple sheet that rises from the bottom.
  const away =
    reduced
      ? { opacity: 0 }
      : desktop && origin
        ? { opacity: 0, scale: 0.3, x: origin.x - window.innerWidth / 2, y: origin.y - window.innerHeight / 2 }
        : desktop
          ? { opacity: 0, scale: 0.96, y: 12 }
          : { opacity: 0, y: 80 };
  const [status, setStatus] = useState<Status>('idle');
  const [firstName, setFirstName] = useState('');
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    setStatus('idle');
    setPageScrollLocked(true);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      setPageScrollLocked(false);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFirstName(String(data.get('name') ?? '').trim().split(' ')[0]);
    setStatus('sending');
    // Mock submission — nothing is sent anywhere until the backend is connected.
    window.setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 1 }}
          // Held for the length of the children's exit so the panel can fly back to its button
          exit={{ opacity: 1, transition: { duration: 0.35 } }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.3, ease: EASE }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-lenis-prevent
            className="relative max-h-[94svh] w-full max-w-[460px] overflow-y-auto rounded-sm border border-line bg-white p-5 shadow-2xl sm:p-6"
            initial={away}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ ...away, transition: { duration: 0.28, ease: EASE } }}
            transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.8 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-sm border border-line text-ink-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              aria-label="Close form"
            >
              <X size={16} />
            </button>

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  className="py-6 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <svg viewBox="0 0 64 64" className="mx-auto h-12 w-12 text-ink" aria-hidden="true">
                    <motion.circle
                      cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5"
                      initial={{ pathLength: 0, rotate: -90 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: EASE_INOUT }}
                      style={{ originX: '50%', originY: '50%' }}
                    />
                    <motion.path
                      d="M20 33 L28.5 41.5 L44 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.6 }}
                    />
                  </svg>
                  <h2 id={titleId} className="mt-4 text-xl font-semibold text-ink">
                    Thank you{firstName ? `, ${firstName}` : ''}!
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-ink-muted">
                    We have your details. Someone from our team will email you within two working days.
                  </p>
                  <button type="button" onClick={onClose} className="btn btn-primary mt-6 min-h-9! px-6! text-xs font-semibold">
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0, y: -10 }}>
                  <h2 id={titleId} className="pr-10 text-xl font-semibold text-ink">
                    Apply for membership
                  </h2>
                  <p className="mt-1 text-xs text-ink-muted">Fill this in and we will get back to you by email.</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs font-medium text-ink-soft sm:col-span-2">
                      Full name
                      <input ref={firstFieldRef} name="name" required autoComplete="name" maxLength={80} className={fieldClass} placeholder="Your name" />
                    </label>
                    <label className="block text-xs font-medium text-ink-soft">
                      Email
                      <input name="email" type="email" required autoComplete="email" maxLength={120} className={fieldClass} placeholder="you@example.com" />
                    </label>
                    <label className="block text-xs font-medium text-ink-soft">
                      Phone <span className="text-ink-muted font-normal">(optional)</span>
                      <input name="phone" type="tel" autoComplete="tel" maxLength={20} pattern="[0-9+\s\-]{7,20}" className={fieldClass} placeholder="+91" />
                    </label>
                    <label className="block text-xs font-medium text-ink-soft sm:col-span-2">
                      Membership type
                      <select name="type" key={initialType} defaultValue={initialType} className={fieldClass}>
                        {ALL_TYPES.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-xs font-medium text-ink-soft sm:col-span-2">
                      Anything you'd like us to know? <span className="text-ink-muted font-normal">(optional)</span>
                      <textarea name="message" rows={2} maxLength={1000} className={`${fieldClass} resize-none`} placeholder="Your college, company or goals" />
                    </label>
                  </div>

                  <label className="mt-3.5 flex items-start gap-2.5 text-[11px] leading-snug text-ink-muted">
                    <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-xs accent-[#2E242C]" />
                    <span>
                      I agree that ASSOCADS can use these details to process my membership and contact me.
                    </span>
                  </label>

                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary relative mt-4 min-h-10! w-full py-2.5 text-xs font-semibold overflow-hidden disabled:cursor-progress">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={status}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: EASE }}
                      >
                        {status === 'sending' ? 'Sending…' : 'Send application'}
                      </motion.span>
                    </AnimatePresence>
                    {status === 'sending' && (
                      <motion.span
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-paper"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.9, ease: EASE_INOUT }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
