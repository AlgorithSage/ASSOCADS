import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, ArrowRight, Check, AlertCircle, Loader2, Clock } from 'lucide-react';
import { submitContactInquiry } from '../apiService';
import { contact } from '../content';
import { EASE, Reveal, Words } from '../motion';
import { Magnetic } from '../effects';

const TOPICS = ['Membership', 'A partnership', 'An event', 'Something else'] as const;
type Topic = (typeof TOPICS)[number];

// Input with the label sitting inside the field, lifting above it once you type or focus.
function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  multiline = false
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const base =
    'peer w-full rounded-sm border border-line bg-paper/50 px-4 pb-2.5 pt-6 text-ink outline-none transition-colors duration-300 placeholder-transparent focus:border-ink focus:bg-white';
  return (
    <div className="relative">
      {multiline ? (
        <textarea id={id} rows={5} required={required} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className={`${base} resize-none`} />
      ) : (
        <input id={id} type={type} required={required} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className={base} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs text-ink-muted transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
      >
        {label}
        {required ? '' : ' (optional)'}
      </label>
    </div>
  );
}

// Get in touch: an ink panel with who to contact and what happens next,
// next to a clean form with topic chips and floating labels.
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [topic, setTopic] = useState<Topic>('Membership');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await submitContactInquiry({ ...form, message: `[${topic}] ${form.message}` });
      if (res.success) {
        setStatus({ ok: true, text: `Thanks${form.name ? `, ${form.name.split(' ')[0]}` : ''}. We will reply by email within two working days.` });
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ ok: false, text: res.message || 'That did not go through. Please try again.' });
      }
    } catch {
      setStatus({ ok: false, text: 'That did not go through. Please check your connection and try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="section-pad">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-sm border border-line bg-white shadow-[0_40px_90px_-50px_rgba(46,36,44,0.45)] lg:grid-cols-12">
          {/* Ink panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-ink p-8 text-paper md:p-12 lg:col-span-5">
            <span className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-paper/10" aria-hidden="true" />
            <span className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-paper/10" aria-hidden="true" />
            <div className="relative">
              <span className="text-sm text-paper/60">Write to us</span>
              <Words text="Get in touch" className="mt-3 font-display text-5xl font-medium leading-[1.04] text-paper md:text-6xl" />
              <p className="mt-6 max-w-sm leading-relaxed text-paper/75">
                A question about joining, an idea for a partnership, or an event you want to run with us. Send it here and a
                real person from our team will reply.
              </p>
            </div>

            <ul className="relative mt-12 space-y-6">
              {[
                { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
                { icon: MapPin, label: 'Office', value: contact.address },
                { icon: Clock, label: 'Reply time', value: 'Within two working days' }
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/20">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-sm text-paper/55">{label}</p>
                    {href ? (
                      <a href={href} className="link-draw text-paper">
                        {value}
                      </a>
                    ) : (
                      <p className="text-paper">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="p-8 md:p-12 lg:col-span-7">
            <Reveal>
              <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset>
                  <legend className="text-sm text-ink-muted">What is it about?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={topic === t}
                        onClick={() => setTopic(t)}
                        className={`relative rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                          topic === t ? 'border-ink text-paper' : 'border-line text-ink hover:border-ink'
                        }`}
                      >
                        {topic === t && (
                          <motion.span
                            layoutId="contact-topic"
                            className="absolute inset-0 rounded-full bg-ink"
                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          />
                        )}
                        <span className="relative">{t}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="c-name" label="Your name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field id="c-email" label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                </div>
                <Field id="c-phone" label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field id="c-message" label="Your message" multiline required value={form.message} onChange={(v) => setForm({ ...form, message: v })} />

                <AnimatePresence>
                  {status && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className={`flex items-center gap-3 rounded-sm border px-4 py-3 text-sm ${
                        status.ok ? 'border-ink bg-paper text-ink' : 'border-ink/40 bg-white text-ink'
                      }`}
                      role="status"
                    >
                      {status.ok ? <Check size={18} /> : <AlertCircle size={18} />}
                      {status.text}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-sm text-ink-muted">We only use your details to reply to you.</p>
                  <Magnetic>
                    <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-60">
                      {sending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Sending
                        </>
                      ) : (
                        <>
                          Send message <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
