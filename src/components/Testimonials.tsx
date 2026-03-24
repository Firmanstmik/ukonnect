import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';

const TESTIMONIAL_META = [
    { name: "Sarah Mitchell", title: "Head of Marketing at TechFlow", image: "https://i.pravatar.cc/100?img=5" },
    { name: "David Brown", title: "CEO at NextGen Solutions", image: "https://i.pravatar.cc/100?img=11" },
    { name: "Emily Carter", title: "Growth Lead at DataSync", image: "https://i.pravatar.cc/100?img=9" },
    { name: "Michael Chang", title: "VP of Sales at RetailCorp", image: "https://i.pravatar.cc/100?img=12" },
];

export const Testimonials = () => {
    const { t } = useLanguage();

    const testimonials = TESTIMONIAL_META.map((meta, i) => ({
        ...meta,
        body: t(`testimonials.${i}.body` as TranslationKey),
    }));

    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('testimonials.label')}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">{t('testimonials.heading')}</h2>
                <p className="text-slate-500 text-lg">
                    {t('testimonials.sub')}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm text-center flex flex-col items-center"
                    >
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-slate-100 shadow-sm">
                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">{testimonial.name}</h4>
                        <p className="text-slate-500 text-sm mb-3">{testimonial.title}</p>
                        <div className="flex items-center gap-1 mb-6 text-amber-400">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-slate-700 italic leading-relaxed text-sm">
                            "{testimonial.body}"
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
