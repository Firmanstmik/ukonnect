import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight2 } from 'iconsax-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { CASE_STUDY_DATA_PENDING_VERIFICATION } from './caseStudyExperienceData';
import { CaseStudyVisual } from './CaseStudyVisual';
import { EASE_LUXURY } from '../motion';

type Props = {
    study: CaseStudyExperience;
    index: number;
    onExpand: (study: CaseStudyExperience) => void;
};

/**
 * Premium archival card — desktop hero + floating mobile device.
 * Click expands into the full documentary project view.
 */
export function CaseStudyCompactCard({ study, index, onExpand }: Props) {
    const reduce = useReducedMotion();
    const [hovered, setHovered] = useState(false);
    const primaryMetric = !CASE_STUDY_DATA_PENDING_VERIFICATION ? study.metrics[0] : undefined;

    return (
        <motion.button
            type="button"
            layoutId={`cs-shell-${study.id}`}
            onClick={() => onExpand(study)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, delay: index * 0.08, ease: EASE_LUXURY }}
            whileHover={reduce ? undefined : { y: -4 }}
            whileTap={reduce ? undefined : { scale: 0.995 }}
            className="group relative flex w-full flex-col overflow-hidden rounded-[1.7rem] border border-white/70 bg-white text-left outline-none transition-[box-shadow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2"
            style={{
                boxShadow: hovered
                    ? `0 32px 72px -36px rgba(15,23,42,0.38), 0 0 0 1px ${study.theme.from}18`
                    : '0 22px 56px -34px rgba(15,23,42,0.28)',
            }}
        >
            <div className="relative">
                <CaseStudyVisual
                    study={study}
                    hovered={hovered}
                    reduce={Boolean(reduce)}
                    layoutImageId={`cs-image-${study.id}`}
                />

                <div className="absolute left-3.5 top-3.5 z-[3] sm:left-4 sm:top-4">
                    <span className="rounded-full border border-white/15 bg-black/25 px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-white/88 backdrop-blur-md">
                        {study.clientName}
                    </span>
                </div>

                <div className="absolute bottom-3.5 right-3.5 z-[3] sm:bottom-4 sm:right-4">
                    <span
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/12 text-white backdrop-blur-md transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-white/22"
                        aria-hidden
                    >
                        <ArrowRight2 size={16} variant="Outline" color="#ffffff" />
                    </span>
                </div>
            </div>

            <div className="relative flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400/90">
                    0{index + 1} · {study.industry}
                </p>

                <motion.h3
                    layoutId={`cs-title-${study.id}`}
                    className="mt-3.5 line-clamp-2 text-[1.12rem] font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-[1.22rem]"
                >
                    {study.title}
                </motion.h3>

                <p className="mt-3.5 line-clamp-2 text-[13px] leading-[1.65] text-slate-500">
                    {study.summary}
                </p>

                {primaryMetric ? (
                    <div className="mt-7 flex items-end justify-between border-t border-slate-100/80 pt-5">
                        <div>
                            <p
                                className="text-[1.35rem] font-bold tracking-tight"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${study.theme.from}, ${study.theme.to})`,
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                {primaryMetric.value}
                            </p>
                            <p className="mt-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                {primaryMetric.label}
                            </p>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 transition-colors duration-500 group-hover:text-slate-700">
                            Read story
                        </span>
                    </div>
                ) : (
                    <div className="mt-7 flex items-end justify-end border-t border-slate-100/80 pt-5">
                        <span className="text-[11px] font-semibold text-slate-400 transition-colors duration-500 group-hover:text-slate-700">
                            Read story
                        </span>
                    </div>
                )}
            </div>
        </motion.button>
    );
}
