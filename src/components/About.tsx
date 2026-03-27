import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('about.label')}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8">{t('about.headingPre')}<span className="text-[#5600e3]">x</span>{t('about.headingPost')}</h2>

                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10 font-medium">
                    {t('about.body')}
                </p>

                <button className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5">
                    {t('about.cta')}
                </button>
            </div>
        </section>
    );
};
