import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';

const TESTIMONIAL_META = [
    { name: "S. Kijkduin" },
    { name: "Roxanne de Jong" },
    { name: "Emin Karadas" },
    { name: "Mikael Swaria" },
    { name: "Puya Sarmidani" },
    { name: "Tijn Drieshen" },
];

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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">{t('testimonials.heading')}</h2>
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
                    className="flex w-max gap-6 items-stretch"
                >
                    {track.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[340px] md:w-[400px] bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm text-center flex flex-col items-center"
                        >
                            <h4 className="text-lg font-bold text-slate-900 mb-3">{testimonial.name}</h4>
                            <div className="flex items-center gap-1 mb-6 text-amber-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-slate-700 italic leading-relaxed text-sm">
                                "{testimonial.body}"
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
