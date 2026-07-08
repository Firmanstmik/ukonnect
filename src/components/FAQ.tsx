/**
 * FAQ — reworked into a premium, asymmetric "answers + assistance" layout.
 *
 *   ┌───────────────────────────┬──────────────────────────────────┐
 *   │  Sticky left rail          │  Numbered accordion              │
 *   │  · eyebrow + heading + sub │  · one open at a time            │
 *   │  · live "book a call" card │  · gradient index, growing accent│
 *   │    (opens ContactFormModal)│    bar, smooth height reveal     │
 *   └───────────────────────────┴──────────────────────────────────┘
 *
 * Restraint by design (enterprise SaaS, not agency decoration): glass and
 * brand light only where they earn it, generous whitespace, real motion on
 * open/close. All copy reuses existing localized keys — nothing hardcoded.
 */
import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, MessageCircleQuestion } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Translate, TranslationKey } from '../i18n/translations';
import { EASE_OUT } from './motion';

const ContactFormModal = lazy(() =>
    import('./ContactFormModal').then((m) => ({ default: m.ContactFormModal })),
);

const FAQ_COUNT = 5;

/* ── Single accordion row ─────────────────────────────────────── */

function FaqItem({
    index,
    question,
    answer,
    isOpen,
    onToggle,
}: {
    index: number;
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const num = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: EASE_OUT }}
            className="group relative"
        >
            {/* Brand ring — subtle when idle, glows when open */}
            <div
                className={`pointer-events-none absolute -inset-px rounded-[1.4rem] bg-gradient-to-br from-primary/25 via-[#9b4dff]/15 to-primary/10 blur-[2px] transition-opacity duration-500 ${
                    isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                }`}
            />

            <div
                className={`relative overflow-hidden rounded-[1.4rem] border bg-white/90 backdrop-blur-sm transition-all duration-300 ease-out ${
                    isOpen
                        ? 'border-primary/20 shadow-[0_2px_6px_rgba(15,23,42,0.04),0_26px_50px_-24px_rgba(86,0,227,0.28)]'
                        : 'border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] group-hover:border-slate-300'
                }`}
            >
                {/* Growing gradient accent bar on the left edge */}
                <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top bg-gradient-to-b from-[#5600e3] to-[#9b4dff] transition-transform duration-500 ease-out"
                    style={{ transform: `scaleY(${isOpen ? 1 : 0})` }}
                />

                <h3 className="m-0">
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-button-${index}`}
                        className="flex w-full items-center gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:px-6 md:py-6"
                    >
                        {/* Index chip */}
                        <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[13px] font-bold tabular-nums transition-all duration-300 ${
                                isOpen
                                    ? 'bg-gradient-to-br from-[#5600e3] to-[#9b4dff] text-white shadow-md shadow-primary/25'
                                    : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200/80 group-hover:text-slate-500'
                            }`}
                        >
                            {num}
                        </span>

                        <span
                            className={`flex-1 text-[15px] font-semibold tracking-tight transition-colors duration-300 md:text-base ${
                                isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                            }`}
                        >
                            {question}
                        </span>

                        {/* Plus → × toggle */}
                        <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                                isOpen
                                    ? 'rotate-45 border-primary/30 bg-primary/[0.06] text-primary'
                                    : 'border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600'
                            }`}
                        >
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                    </button>
                </h3>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            id={`faq-panel-${index}`}
                            role="region"
                            aria-labelledby={`faq-button-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: EASE_OUT }}
                            className="overflow-hidden"
                        >
                            {/* Answer is indented to align under the question, past the index chip */}
                            <p className="px-5 pb-6 pl-[3.75rem] text-[14.5px] leading-relaxed text-slate-500 md:px-6 md:pl-[4rem]">
                                {answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ── Live support card (left rail) ────────────────────────────── */

function SupportCard({ t, onBook }: { t: Translate; onBook: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="relative mt-9 overflow-hidden rounded-[1.6rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_50px_-30px_rgba(15,23,42,0.22)] backdrop-blur-xl md:p-7"
        >
            {/* Soft brand light */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/[0.08] blur-[70px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#9b4dff]/[0.07] blur-[70px]" />

            <div className="relative">
                {/* Live availability pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                        {t('contact.available')}
                    </span>
                </div>

                <div className="mt-5 flex items-start gap-3.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#5600e3] to-[#9b4dff] text-white shadow-lg shadow-primary/25">
                        <MessageCircleQuestion className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                        <p className="text-lg font-bold leading-snug tracking-tight text-slate-900">
                            {t('contact.headingPre')}{' '}
                            <span className="bg-gradient-to-r from-[#5600e3] to-[#9b4dff] bg-clip-text text-transparent">
                                {t('contact.headingHighlight')}
                            </span>
                        </p>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">{t('contact.sub')}</p>

                <button
                    type="button"
                    onClick={onBook}
                    className="group/book mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                    {t('cta.button')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/book:translate-x-0.5" />
                </button>
            </div>
        </motion.div>
    );
}

/* ── Section ──────────────────────────────────────────────────── */

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useLanguage();

    const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
        question: t(`faq.${i}.q` as TranslationKey),
        answer: t(`faq.${i}.a` as TranslationKey),
    }));

    return (
        <section id="faq" className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[120px]">
            {/* Ambient background — matches Testimonials / Case Studies for a seamless flow */}
            <div className="pointer-events-none absolute inset-0 case-studies-dot-grid opacity-[0.22]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-full max-w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/[0.04] to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -left-40 bottom-24 h-[440px] w-[440px] rounded-full bg-[#9b4dff]/[0.05] blur-[150px]" />

            <div className="relative mx-auto max-w-[1180px] px-6">
                <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
                    {/* ── Left rail: heading + live support card (sticky on desktop) ── */}
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: EASE_OUT }}
                            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
                        >
                            {t('faq.label')}
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.06, ease: EASE_OUT }}
                            className="text-balance text-3xl font-bold leading-[1.12] tracking-tight text-slate-900 md:text-4xl lg:text-[2.75rem]"
                        >
                            {t('faq.heading')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT }}
                            className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg"
                        >
                            {t('faq.sub')}
                        </motion.p>

                        <SupportCard t={t} onBook={() => setModalOpen(true)} />
                    </div>

                    {/* ── Right: accordion ── */}
                    <div className="space-y-3.5">
                        {faqs.map((faq, index) => (
                            <FaqItem
                                key={index}
                                index={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Suspense fallback={null}>
                <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </Suspense>
        </section>
    );
};
