import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { CaseStudyVisual } from './CaseStudyVisual';
import { EASE_OUT } from '../motion';

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
    const primaryMetric = study.metrics[0];

    return (
        <motion.button
            type="button"
            layoutId={`cs-shell-${study.id}`}
            onClick={() => onExpand(study)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT }}
            whileHover={reduce ? undefined : { y: -10 }}
            whileTap={reduce ? undefined : { scale: 0.985 }}
            className="group relative flex w-full flex-col overflow-hidden rounded-[1.65rem] border border-white/80 bg-white text-left shadow-[0_22px_60px_-32px_rgba(15,23,42,0.38)] outline-none transition-[box-shadow,border-color] duration-500 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            style={{
                boxShadow: hovered
                    ? `0 32px 72px -28px rgba(15,23,42,0.45), 0 0 0 1px ${study.theme.from}35, 0 0 56px ${study.theme.glow}`
                    : undefined,
            }}
        >
            <div className="relative">
                <CaseStudyVisual
                    study={study}
                    hovered={hovered}
                    reduce={Boolean(reduce)}
                    layoutImageId={`cs-image-${study.id}`}
                />

                <div className="absolute left-3.5 top-3.5 z-[3] flex flex-wrap gap-1.5 sm:left-4 sm:top-4">
                    <span className="rounded-full border border-white/25 bg-black/35 px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-white/92 backdrop-blur-md">
                        {study.documentaryLabel}
                    </span>
                    <span
                        className="rounded-full border border-white/20 px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
                        style={{ background: `${study.theme.from}33` }}
                    >
                        {study.clientName}
                    </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-[3] flex items-end justify-between gap-2 sm:bottom-4 sm:left-4 sm:right-4">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75">
                        0{index + 1} · {study.industry}
                    </p>
                    <span
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25"
                        aria-hidden
                    >
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </div>
            </div>

            <div className="relative flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${study.theme.from}55, ${study.theme.to}44, transparent)`,
                    }}
                    aria-hidden
                />

                <span
                    className="mb-2.5 inline-flex w-fit rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
                    style={{
                        color: study.theme.from,
                        borderColor: `${study.theme.from}30`,
                        background: `${study.theme.from}0c`,
                    }}
                >
                    {study.industry}
                </span>

                <motion.h3
                    layoutId={`cs-title-${study.id}`}
                    className="line-clamp-2 text-[1.08rem] font-bold leading-snug tracking-tight text-slate-900 sm:text-[1.2rem]"
                >
                    {study.title}
                </motion.h3>

                <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-slate-500">
                    {study.summary}
                </p>

                {primaryMetric ? (
                    <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3.5">
                        <div>
                            <p
                                className="text-xl font-bold tracking-tight"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${study.theme.from}, ${study.theme.to})`,
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                {primaryMetric.value}
                            </p>
                            <p className="mt-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                {primaryMetric.label}
                            </p>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 transition-colors group-hover:text-slate-700">
                            View project
                        </span>
                    </div>
                ) : null}
            </div>
        </motion.button>
    );
}
