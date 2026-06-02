import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';

/* ── Reviewer meta ───────────────────────────────────────────── */

const TESTIMONIAL_META = [
    { name: 'S. Kijkduin',      initials: 'SK', color: '#4285F4' },
    { name: 'Roxanne de Jong',  initials: 'RJ', color: '#EA4335' },
    { name: 'Emin Karadas',     initials: 'EK', color: '#34A853' },
    { name: 'Mikael Swaria',    initials: 'MS', color: '#FBBC05' },
    { name: 'Puya Sarmidani',   initials: 'PS', color: '#4285F4' },
    { name: 'Tijn Drieshen',    initials: 'TD', color: '#EA4335' },
];

/* ── Google G logo ───────────────────────────────────────────── */

const GoogleG = () => (
    <svg viewBox="0 0 48 48" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
);

/* ── Component ───────────────────────────────────────────────── */

export const Testimonials = () => {
    const { t } = useLanguage();

    const testimonials = TESTIMONIAL_META.map((meta, i) => ({
        ...meta,
        body: t(`testimonials.${i}.body` as TranslationKey),
    }));

    const track = [...testimonials, ...testimonials];

    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('testimonials.label')}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                    {t('testimonials.headingPre')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9b4dff]">{t('testimonials.headingHighlight')}</span>{t('testimonials.headingPost')}
                </h2>
                <p className="text-slate-500 text-lg">{t('testimonials.sub')}</p>
            </div>

            <div
                className="overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                }}
            >
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                    className="flex w-max gap-4 items-stretch"
                >
                    {track.map((r, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[300px] md:w-[360px] bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col"
                        >
                            {/* Header row */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    {/* Avatar */}
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                                        style={{ backgroundColor: r.color }}
                                    >
                                        {r.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm leading-tight">{r.name}</p>
                                        {/* Stars */}
                                        <div className="flex items-center gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <GoogleG />
                            </div>

                            {/* Review text */}
                            <p className="text-slate-600 text-sm leading-relaxed flex-1">
                                {r.body}
                            </p>

                            {/* Footer */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                                <GoogleG />
                                <span className="text-[11px] text-slate-400">Posted on</span>
                                <span className="text-[11px] font-semibold text-slate-500">Google</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
