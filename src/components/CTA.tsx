/**
 * CTA — the final conversion moment before the footer.
 *
 * Reworked into a bold, living "dark aurora" card: an animated gradient
 * border (hero-frame-aurora), a subtle dot mesh, slow drifting glow orbs,
 * a live availability pill and a primary button with a hover sheen. It is
 * the one place the site goes dark on purpose — the closing punch — while
 * staying restrained (no noise, real motion only where it earns its place).
 *
 * All copy reuses existing localized keys (cta.*, contact.available).
 */
import { lazy, Suspense, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { EASE_OUT } from './motion';
import { CTAGrowthVisual } from './CTAGrowthVisual';

const ContactFormModal = lazy(() =>
    import('./ContactFormModal').then((m) => ({ default: m.ContactFormModal })),
);

export const CTA = () => {
    const { t } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);
    const reduce = useReducedMotion();

    return (
        <section className="mx-auto max-w-[1300px] px-6 py-[60px] md:py-[80px] lg:py-[110px]">
            {/* Animated aurora gradient border */}
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                className="hero-frame-aurora rounded-[2.4rem] shadow-[0_30px_90px_-30px_rgba(86,0,227,0.55)]"
            >
                <div className="hero-card-dark relative overflow-hidden rounded-[2.35rem] px-8 py-14 text-center md:px-12 md:py-16 lg:py-20">
                    {/* Dot mesh + brand glows */}
                    <div className="hero-workflow-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />

                    {/* Slow drifting glow orbs — the "alive" layer */}
                    {!reduce && (
                        <>
                            <motion.div
                                aria-hidden
                                className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#9b4dff]/30 blur-[90px]"
                                animate={{ y: [0, 26, 0], x: [0, -18, 0] }}
                                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                aria-hidden
                                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#5600e3]/35 blur-[90px]"
                                animate={{ y: [0, -22, 0], x: [0, 20, 0] }}
                                transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </>
                    )}

                    <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                            {/* Live availability pill */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: EASE_OUT }}
                                className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 backdrop-blur-sm"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                                    {t('contact.available')}
                                </span>
                            </motion.div>

                            <h2 className="text-[30px] font-bold leading-[1.08] tracking-tight text-white md:text-[42px] lg:text-[46px] xl:text-[52px]">
                                {t('cta.headingPre')}
                                <span className="bg-gradient-to-r from-[#c4b1ff] to-[#e9d5ff] bg-clip-text text-transparent">
                                    {t('cta.headingHighlight1')}
                                </span>
                                {t('cta.headingMid')}
                                <span className="bg-gradient-to-r from-[#a78bfa] to-[#7dd3fc] bg-clip-text text-transparent">
                                    {t('cta.headingHighlight2')}
                                </span>
                                {t('cta.headingPost')}
                            </h2>

                            <p className="mt-6 max-w-[56ch] text-[15px] font-medium leading-relaxed text-slate-300/90 md:text-[18px]">
                                {t('cta.sub')}
                            </p>

                            {/* Primary CTA with hover sheen */}
                            <motion.button
                                onClick={() => setModalOpen(true)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative mt-10 inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6d28d9] to-[#9b4dff] px-9 py-[1.15rem] text-base font-semibold text-white shadow-[0_12px_44px_rgba(155,77,255,0.5)] transition-shadow duration-300 hover:shadow-[0_16px_52px_rgba(155,77,255,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                            >
                                <span className="relative z-10 flex items-center gap-2.5">
                                    <Sparkles className="h-[18px] w-[18px]" />
                                    {t('cta.button')}
                                    <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
                                </span>
                                {/* Sweeping sheen */}
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                                />
                            </motion.button>
                        </div>

                        <div className="flex justify-center pt-6 lg:justify-end lg:pt-0">
                            <CTAGrowthVisual />
                        </div>
                    </div>
                </div>
            </motion.div>

            <Suspense fallback={null}>
                <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </Suspense>
        </section>
    );
};
