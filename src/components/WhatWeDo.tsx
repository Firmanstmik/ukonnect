import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SectionHeadingAccent } from './SectionHeadingAccent';
import {
    Bot,
    Megaphone,
    Target,
    Database,
    Globe,
    Palette,
    Camera,
    Video,
    Network,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';

const PILLARS: { icon: ReactNode; titleKey: TranslationKey; descKey: TranslationKey }[] = [
    { icon: <Bot className="h-5 w-5" />, titleKey: 'whatWeDo.0.title', descKey: 'whatWeDo.0.desc' },
    { icon: <Megaphone className="h-5 w-5" />, titleKey: 'whatWeDo.1.title', descKey: 'whatWeDo.1.desc' },
    { icon: <Target className="h-5 w-5" />, titleKey: 'whatWeDo.2.title', descKey: 'whatWeDo.2.desc' },
    { icon: <Database className="h-5 w-5" />, titleKey: 'whatWeDo.3.title', descKey: 'whatWeDo.3.desc' },
    { icon: <Globe className="h-5 w-5" />, titleKey: 'whatWeDo.4.title', descKey: 'whatWeDo.4.desc' },
    { icon: <Palette className="h-5 w-5" />, titleKey: 'whatWeDo.5.title', descKey: 'whatWeDo.5.desc' },
    { icon: <Camera className="h-5 w-5" />, titleKey: 'whatWeDo.6.title', descKey: 'whatWeDo.6.desc' },
    { icon: <Video className="h-5 w-5" />, titleKey: 'whatWeDo.7.title', descKey: 'whatWeDo.7.desc' },
    { icon: <Network className="h-5 w-5" />, titleKey: 'whatWeDo.8.title', descKey: 'whatWeDo.8.desc' },
];

/**
 * What We Do / Why UKONNECT — evolved from Benefits.
 * Shows the connected growth ecosystem (not AI-as-product).
 */
export function WhatWeDo() {
    const { t } = useLanguage();

    return (
        <section id="what-we-do" className="scroll-mt-28 py-[60px] md:py-[80px] lg:py-[120px]">
            <div className="mx-auto max-w-[1300px] px-6">
                <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                        {t('whatWeDo.label')}
                    </p>
                    <h2 className="section-title-cinematic mb-6 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                        {t('whatWeDo.headingPre')}
                        <SectionHeadingAccent>{t('whatWeDo.headingHighlight')}</SectionHeadingAccent>
                        {t('whatWeDo.headingPost')}
                    </h2>
                    <p className="text-lg text-slate-500">{t('whatWeDo.sub')}</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {PILLARS.map((pillar, index) => (
                        <motion.article
                            key={pillar.titleKey}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: index * 0.05, duration: 0.45 }}
                            className="group relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/75 p-7 shadow-[0_8px_28px_rgba(40,24,72,0.04)] backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-primary/15 hover:shadow-[0_18px_44px_rgba(86,0,227,0.1)]"
                        >
                            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                {pillar.icon}
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-slate-900">{t(pillar.titleKey)}</h3>
                            <p className="text-sm leading-relaxed text-slate-500">{t(pillar.descKey)}</p>
                            <span
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00d4e8]/40 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                                aria-hidden
                            />
                        </motion.article>
                    ))}
                </div>

                <p className="mx-auto mt-12 max-w-2xl text-center text-[15px] font-medium leading-relaxed text-slate-500">
                    {t('whatWeDo.footer')}
                </p>
            </div>
        </section>
    );
}

/** Backward-compatible alias — Benefits evolved into WhatWeDo. */
export const Benefits = WhatWeDo;
