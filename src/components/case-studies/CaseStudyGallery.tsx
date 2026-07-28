import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft2, ArrowRight2, Chart21, Mobile, MonitorMobbile, PresentionChart } from 'iconsax-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { GalleryFrame } from './CaseStudyPrimitives';
import { EASE_LUXURY } from '../motion';

export function CaseStudyGallery({ study }: { study: CaseStudyExperience }) {
    // Skip the intro hero already shown above — start on the next visual beat.
    const initialIndex = study.gallery.length > 1 ? 1 : 0;
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const active = study.gallery[activeIndex] ?? study.gallery[0];
    const detail = getGalleryDetail(active.type);
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
                    <p className="font-mono text-[10px] tracking-[0.28em] text-white/32">GALLERY</p>
                    <h4 className="mt-4 text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-[2rem]">
                        Project visuals
                    </h4>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous gallery item"
                        className="cs-lux-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/65 hover:border-white/16 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                    >
                        <ArrowLeft2 size={18} variant="Outline" color="currentColor" />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next gallery item"
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

                    <nav className="mt-10 space-y-1" aria-label="Gallery items">
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

function getGalleryDetail(type: CaseStudyExperience['gallery'][number]['type']) {
    switch (type) {
        case 'hero':
            return {
                kicker: 'Campaign Entry',
                description:
                    'The first impression layer: brand world, conversion headline, and emotional hook that turns cold traffic into warm interest.',
                icon: <MonitorMobbile size={20} variant="Bulk" color="#c4b5fd" />,
            };
        case 'desktop':
            return {
                kicker: 'Desktop Conversion',
                description:
                    'The primary storytelling arc, sales proof, and CTA structure for high-intent visitors making a considered decision.',
                icon: <MonitorMobbile size={20} variant="Bulk" color="#93c5fd" />,
            };
        case 'mobile':
            return {
                kicker: 'Mobile Journey',
                description:
                    'A focused path for paid and direct traffic, optimized for clarity and low-friction inquiry capture.',
                icon: <Mobile size={20} variant="Bulk" color="#f9a8d4" />,
            };
        case 'dashboard':
            return {
                kicker: 'Pipeline Visibility',
                description:
                    'Operational clarity for the team: qualified leads, deal stages, and handoff status in one view.',
                icon: <Chart21 size={20} variant="Bulk" color="#86efac" />,
            };
        case 'analytics':
            return {
                kicker: 'Attribution Layer',
                description:
                    'Which campaigns and channels drive stronger conversations and clearer downstream outcomes.',
                icon: <PresentionChart size={20} variant="Bulk" color="#fdba74" />,
            };
        case 'workflow':
            return {
                kicker: 'Automation Flow',
                description:
                    'Forms, qualification logic, CRM updates, and follow-up actions moving without manual lag.',
                icon: <Chart21 size={20} variant="Bulk" color="#67e8f9" />,
            };
        default:
            return {
                kicker: 'Visual',
                description: 'Curated project visual.',
                icon: <MonitorMobbile size={20} variant="Bulk" color="#cbd5e1" />,
            };
    }
}
