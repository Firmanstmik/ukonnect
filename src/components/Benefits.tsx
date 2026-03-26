import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Workflow, PiggyBank, ShieldCheck, Activity, RefreshCw, Handshake } from 'lucide-react';
import { CardBackground } from './CardBackground';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';
import teamPhoto from '../assets/Ukonnect Team Portugal.webp';

const benefitIcons = [
    <Workflow className="w-6 h-6" />,
    <PiggyBank className="w-6 h-6" />,
    <ShieldCheck className="w-6 h-6" />,
    <Activity className="w-6 h-6" />,
    <RefreshCw className="w-6 h-6" />,
    <Handshake className="w-6 h-6" />,
];

export const Benefits = () => {
    const { t, lang } = useLanguage();

    const benefits = benefitIcons.map((icon, i) => ({
        icon,
        title: t(`benefits.${i}.title` as TranslationKey),
        description: t(`benefits.${i}.desc` as TranslationKey),
    }));

    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('benefits.label')}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                    {t('benefits.headingPre')}<span className="text-[#5600e3]">{t('benefits.headingHighlight')}</span>{t('benefits.headingPost')}
                </h2>
                <p className="text-slate-500 text-lg">
                    {t('benefits.sub')}
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative isolate overflow-hidden bg-white rounded-[1.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all text-center flex flex-col items-center group cursor-default"
                    >
                        <CardBackground index={index} />
                        <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            {benefit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {benefit.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* ── About strip ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="mt-16 md:mt-24 grid lg:grid-cols-2 gap-10 items-center"
            >
                {/* Left: text + CTA */}
                <div className="flex flex-col items-start gap-6">
                    <p className="text-primary font-semibold tracking-wide uppercase text-sm">{t('about.label')}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{t('about.heading')}</h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                        {t('about.body')}
                    </p>
                    <Link
                        to={`/${lang}/about`}
                        className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 inline-block"
                    >
                        {t('about.cta')}
                    </Link>
                </div>

                {/* Right: team photo */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-lg">
                    <img
                        src={teamPhoto}
                        alt="Ukonnect team"
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                </div>
            </motion.div>
        </section>
    );
};
