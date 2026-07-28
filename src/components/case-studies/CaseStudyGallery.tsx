import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft2, ArrowRight2, Chart21, Mobile, MonitorMobbile, PresentionChart } from 'iconsax-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { GalleryFrame } from './CaseStudyPrimitives';
import { EASE_OUT } from '../motion';

export function CaseStudyGallery({ study }: { study: CaseStudyExperience }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = study.gallery[activeIndex];
    const detail = getGalleryDetail(active.type);

    const go = (direction: -1 | 1) => {
        setActiveIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return study.gallery.length - 1;
            if (next >= study.gallery.length) return 0;
            return next;
        });
    };

    return (
        <div>
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="font-mono text-[10px] tracking-[0.28em] text-white/40">GALLERY</p>
                    <h4 className="mt-2 text-2xl font-semibold tracking-tight text-white">Project visuals</h4>
                    <p className="mt-2 max-w-xl text-sm text-white/56">
                        A curated visual narrative across the campaign entry point, device journey, and operating system behind the scenes.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous gallery item"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/72 shadow-sm transition hover:border-white/22 hover:bg-white/10 hover:text-white"
                    >
                        <ArrowLeft2 size={18} variant="Outline" color="currentColor" />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next gallery item"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/72 shadow-sm transition hover:border-white/22 hover:bg-white/10 hover:text-white"
                    >
                        <ArrowRight2 size={18} variant="Outline" color="currentColor" />
                    </button>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_360px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, scale: 0.985, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.01, filter: 'blur(6px)' }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="overflow-hidden rounded-[1.75rem] ring-1 ring-white/10"
                    >
                        <GalleryFrame
                            item={active}
                            theme={study.theme}
                            alt={study.coverAlt}
                            className="min-h-[320px] rounded-[1.75rem] border-white/10 bg-white/5 md:min-h-[520px]"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                            {detail.icon}
                        </span>
                        <div>
                            <p className="font-mono text-[10px] tracking-[0.18em] text-white/38">{detail.kicker}</p>
                            <h5 className="text-lg font-semibold tracking-tight text-white">{active.title}</h5>
                        </div>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-white/62">{detail.description}</p>

                    <div className="mt-6 grid gap-3">
                        {study.gallery.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`group flex items-center gap-3 rounded-[1.2rem] border p-2.5 text-left transition duration-300 ${
                                    index === activeIndex
                                        ? 'border-white/22 bg-white/10 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.55)]'
                                        : 'border-white/8 bg-white/[0.03] hover:border-white/16 hover:bg-white/[0.06]'
                                }`}
                            >
                                <GalleryFrame
                                    item={item}
                                    theme={study.theme}
                                    alt={study.coverAlt}
                                    compact
                                    interactive
                                    className="h-20 w-28 shrink-0 !rounded-[0.95rem] !shadow-none !aspect-auto border-white/10"
                                />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38">
                                        {item.type}
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-white/88">{item.title}</p>
                                </div>
                            </button>
                        ))}
                    </div>
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
                    'This frame captures the first impression layer: the premium brand world, conversion headline, and emotional hook that turns cold traffic into warm interest.',
                icon: <MonitorMobbile size={20} variant="Bulk" color="#c4b5fd" />,
            };
        case 'desktop':
            return {
                kicker: 'Desktop Conversion',
                description:
                    'The desktop experience carries the main storytelling arc, sales proof, and CTA structure for visitors comparing options and making a high-value decision.',
                icon: <MonitorMobbile size={20} variant="Bulk" color="#93c5fd" />,
            };
        case 'mobile':
            return {
                kicker: 'Mobile Journey',
                description:
                    'A mobile-first path for paid traffic and direct clicks, optimized for speed, clarity, and low-friction inquiry capture on smaller screens.',
                icon: <Mobile size={20} variant="Bulk" color="#f9a8d4" />,
            };
        case 'dashboard':
            return {
                kicker: 'Pipeline Visibility',
                description:
                    'Operational visibility for the team: qualified leads, deal stages, and handoff status in one place so response quality stays consistent.',
                icon: <Chart21 size={20} variant="Bulk" color="#86efac" />,
            };
        case 'analytics':
            return {
                kicker: 'Attribution Layer',
                description:
                    'A performance lens showing which campaigns, channels, and touchpoints are driving better conversations and stronger downstream outcomes.',
                icon: <PresentionChart size={20} variant="Bulk" color="#fdba74" />,
            };
        case 'workflow':
            return {
                kicker: 'Automation Flow',
                description:
                    'The orchestration layer connecting forms, qualification logic, CRM updates, and follow-up actions so the whole system moves without manual lag.',
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
