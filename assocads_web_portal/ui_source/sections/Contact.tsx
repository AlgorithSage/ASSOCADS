import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactInquiry } from '../apiService';
import { EASE, Reveal, Words } from '../motion';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in your name, email, and message.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await submitContactInquiry(formData);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message has been received by the ASSOCADS Secretariat.'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Submission failed. Please try again.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'An unexpected network error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-pad relative overflow-hidden">
      {/* Background world map / topological watermark matching Reference 3 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#2E242C_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Direct Info & Structured Cards matching Reference 3 */}
          <div className="lg:col-span-5 lg:pr-6">
            <Reveal>
              {/* Eyebrow in coral/terracotta accent matching Reference 3 */}
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E05A47]">
                Write Here
              </p>
            </Reveal>

            {/* Editorial Serif Heading matching Reference 3 */}
            <Words
              text="Get in Touch"
              className="mt-2 text-3xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-6xl"
            />

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                Whether you represent a college, a research laboratory, a tech startup, or wish to contribute as a mentor, our team is here to coordinate.
              </p>
            </Reveal>

            {/* Three Contact Cards matching Reference 3 */}
            <div className="mt-10 space-y-4">
              {/* Address Card */}
              <Reveal delay={0.15}>
                <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm transition-all duration-300 hover:border-ink/20 hover:shadow-md">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#E05A47]/10 text-[#E05A47]">
                    <MapPin size={22} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-ink">Address</h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                      Association for AI and Data Science (ASSOCADS)<br />
                      Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal 700091
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Phone Card */}
              <Reveal delay={0.2}>
                <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm transition-all duration-300 hover:border-ink/20 hover:shadow-md">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#E05A47]/10 text-[#E05A47]">
                    <Phone size={22} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-ink">Our Phone</h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                      Office phone: +91 (033) 2357-9000<br />
                      Secretariat Helpdesk: +91 98300 12345
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Email Card */}
              <Reveal delay={0.25}>
                <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm transition-all duration-300 hover:border-ink/20 hover:shadow-md">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#E05A47]/10 text-[#E05A47]">
                    <Mail size={22} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-ink">Our Email</h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                      Main Email: <a href="mailto:secretariat@assocads.org" className="underline hover:text-ink">secretariat@assocads.org</a><br />
                      Inquiries: <a href="mailto:memberships@assocads.org" className="underline hover:text-ink">memberships@assocads.org</a>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Pill-Shaped Input Form matching Reference 3 */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-xl backdrop-blur-md sm:p-10"
              >
                <div className="space-y-4">
                  {/* Name Input (Pill Shaped) */}
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-full border border-ink/10 bg-white px-6 py-4 text-sm text-ink placeholder:text-ink-muted/70 shadow-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
                    />
                  </div>

                  {/* Email Input (Pill Shaped) */}
                  <div>
                    <label htmlFor="contact-email" className="sr-only">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-full border border-ink/10 bg-white px-6 py-4 text-sm text-ink placeholder:text-ink-muted/70 shadow-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
                    />
                  </div>

                  {/* Phone / Organization Input (Pill Shaped) */}
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">Phone</label>
                    <input
                      id="contact-phone"
                      type="text"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-full border border-ink/10 bg-white px-6 py-4 text-sm text-ink placeholder:text-ink-muted/70 shadow-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
                    />
                  </div>

                  {/* Message Input (Rounded Box) */}
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-3xl border border-ink/10 bg-white p-6 text-sm text-ink placeholder:text-ink-muted/70 shadow-sm outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10 resize-none"
                    />
                  </div>
                </div>

                {/* Status Message Alert */}
                <AnimatePresence>
                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`mt-4 flex items-center gap-3 rounded-2xl px-5 py-3 text-xs sm:text-sm ${
                        statusMessage.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {statusMessage.type === 'success' ? (
                        <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                      ) : (
                        <AlertCircle size={18} className="shrink-0 text-rose-600" />
                      )}
                      <span>{statusMessage.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Coral Rounded Submit Button matching Reference 3 */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E05A47] px-10 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-[#d04d3b] hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
