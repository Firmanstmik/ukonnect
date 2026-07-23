import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { EASE_OUT } from '../motion';

type Props = {
    study: CaseStudyExperience;
    index: number;
    onExpand: (study: CaseStudyExperience) => void;
};

/**
 * Compact archival card — three in a row.
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
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
            whileHover={reduce ? undefined : { y: -8 }}
            whileTap={reduce ? undefined : { scale: 0.985 }}
            className="group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white text-left shadow-[0_18px_50px_-28px_rgba(15,23,42,0.35)] outline-none transition-[box-shadow,border-color] duration-400 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            style={{
                boxShadow: hovered
                    ? `0 28px 64px -28px rgba(15,23,42,0.4), 0 0 0 1px ${study.theme.from}28, 0 0 48px ${study.theme.glow}`
                    : undefined,
            }}
        >
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
                <motion.img
                    layoutId={`cs-image-${study.id}`}
                    src={study.coverImage}
                    alt={study.coverAlt}
                    loading="lazy"
                    animate={{ scale: hovered && !reduce ? 1.08 : 1 }}
                    transition={{ duration: 0.9, ease: EASE_OUT }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${study.theme.mesh} opacity-50 mix-blend-multiply`}
                    aria-hidden
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(8,13,25,0.1) 0%, transparent 40%, rgba(8,13,25,0.72) 100%)',
                    }}
                    aria-hidden
                />

                <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
                    <span className="rounded-full border border-white/20 bg-black/30 px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                        {study.documentaryLabel}
                    </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between gap-2">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70">
                        0{index + 1} · {study.industry}
                    </p>
                    <span
                        className="grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                        aria-hidden
                    >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                </div>
            </div>

            <div className="relative flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
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
                    className="line-clamp-2 text-[1.05rem] font-bold leading-snug tracking-tight text-slate-900 sm:text-[1.15rem]"
                >
                    {study.title}
                </motion.h3>

                <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-slate-500">
                    {study.summary}
                </p>

                {primaryMetric ? (
                    <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
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
                            Expand
                        </span>
                    </div>
                ) : null}
            </div>
        </motion.button>
    );
}
