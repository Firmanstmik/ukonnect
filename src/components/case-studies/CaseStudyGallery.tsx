import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft2, ArrowRight2, Chart21, Mobile, MonitorMobbile, PresentionChart } from 'iconsax-react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { GalleryFrame } from './CaseStudyPrimitives';
import { EASE_LUXURY } from '../motion';

export function CaseStudyGallery({ study }: { study: CaseStudyExperience }) {
    const { t } = useLanguage();
    // Skip the intro hero already shown above, start on the next visual beat.
    const initialIndex = study.gallery.length > 1 ? 1 : 0;
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const active = study.gallery[activeIndex] ?? study.gallery[0];
    const detail = getGalleryDetail(active.type, t);
    const reduce = useReducedMotion();
    const total = study.gallery.length;

    const go = useCallback((direction: -1 | 1) => {
        setActiveIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return total - 1;
            if (next >= total) return 0;
            return next;
        });
    }, [total]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                go(-1);
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                go(1);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [go]);

    return (
        <div>
            <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
                <div>
                    <p className="font-mono text-[10px] tracking-[0.28em] text-white/32">{t('caseStudies.section.moments.eyebrow')}</p>
                    <h4 className="mt-4 text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-[2rem]">
                        {t('caseStudies.section.moments.title')}
                    </h4>
                    <p className="mt-4 max-w-[36ch] text-[14px] leading-[1.7] text-white/40">
                        {t('caseStudies.section.moments.sub')}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label={t('caseStudies.gallery.prev')}
                        className="cs-lux-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/65 hover:border-white/16 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                    >
                        <ArrowLeft2 size={18} variant="Outline" color="currentColor" />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label={t('caseStudies.gallery.next')}
                        className="cs-lux-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/65 hover:border-white/16 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                    >
                        <ArrowRight2 size={18} variant="Outline" color="currentColor" />
                    </button>
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_280px] lg:gap-12">
                <div className="cs-lux-frame">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={reduce ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={reduce ? undefined : { opacity: 0 }}
                            transition={{ duration: 0.55, ease: EASE_LUXURY }}
                            className="overflow-hidden rounded-[1.85rem]"
                        >
                            <GalleryFrame
                                item={active}
                                theme={study.theme}
                                alt={study.coverAlt}
                                stage
                                showCaption={false}
                                className="min-h-[380px] rounded-[1.85rem] md:min-h-[560px]"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex flex-col lg:pt-2">
                    <div className="flex items-center gap-3.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03]">
                            {detail.icon}
                        </span>
                        <div>
                            <p className="font-mono text-[10px] tracking-[0.18em] text-white/32">{detail.kicker}</p>
                            <h5 className="mt-1.5 text-base font-semibold tracking-tight text-white">{active.title}</h5>
                        </div>
                    </div>

                    <p className="mt-6 text-[14.5px] leading-[1.75] text-white/52">{detail.description}</p>

                    <nav className="mt-10 space-y-1" aria-label={t('caseStudies.gallery.nav')}>
                        {study.gallery.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                aria-current={index === activeIndex ? 'true' : undefined}
                                className={`cs-lux-btn flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                                    index === activeIndex
                                        ? 'bg-white/[0.07] text-white'
                                        : 'text-white/45 hover:bg-white/[0.035] hover:text-white/78'
                                }`}
                            >
                                <span
                                    className={`h-1 w-1 shrink-0 rounded-full transition-colors duration-500 ${
                                        index === activeIndex ? 'bg-white' : 'bg-white/22'
                                    }`}
                                    aria-hidden
                                />
                                <span className="min-w-0 truncate text-sm font-medium tracking-tight">{item.title}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

function getGalleryDetail(
    type: CaseStudyExperience['gallery'][number]['type'],
    t: (key: TranslationKey) => string,
) {
    switch (type) {
        case 'hero':
            return {
                kicker: t('caseStudies.gallery.kicker.hero'),
                description: t('caseStudies.gallery.desc.hero'),
                icon: <MonitorMobbile size={20} variant="Bulk" color="#c4b5fd" />,
            };
        case 'desktop':
            return {
                kicker: t('caseStudies.gallery.kicker.desktop'),
                description: t('caseStudies.gallery.desc.desktop'),
                icon: <MonitorMobbile size={20} variant="Bulk" color="#c4b5fd" />,
            };
        case 'mobile':
            return {
                kicker: t('caseStudies.gallery.kicker.mobile'),
                description: t('caseStudies.gallery.desc.mobile'),
                icon: <Mobile size={20} variant="Bulk" color="#c4b5fd" />,
            };
        case 'dashboard':
            return {
                kicker: t('caseStudies.gallery.kicker.dashboard'),
                description: t('caseStudies.gallery.desc.dashboard'),
                icon: <PresentionChart size={20} variant="Bulk" color="#c4b5fd" />,
            };
        case 'analytics':
            return {
                kicker: t('caseStudies.gallery.kicker.analytics'),
                description: t('caseStudies.gallery.desc.analytics'),
                icon: <Chart21 size={20} variant="Bulk" color="#c4b5fd" />,
            };
        case 'workflow':
        default:
            return {
                kicker: t('caseStudies.gallery.kicker.workflow'),
                description: t('caseStudies.gallery.desc.workflow'),
                icon: <Chart21 size={20} variant="Bulk" color="#c4b5fd" />,
            };
    }
}
