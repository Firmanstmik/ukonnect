import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { CaseStudyMetricGrid } from './CaseStudyMetricGrid';
import { DemoBadge, PlaceholderFrame } from './CaseStudyPrimitives';
import { CursorLight } from './CursorLight';
import { EASE_OUT } from '../motion';

type CaseStudyFeaturedCardProps = {
    study: CaseStudyExperience;
    index: number;
    onOpen: (study: CaseStudyExperience) => void;
};

export function CaseStudyFeaturedCard({ study, index, onOpen }: CaseStudyFeaturedCardProps) {
    const reduce = useReducedMotion();
    const [hovered, setHovered] = useState(false);
    const hero = study.gallery.find((item) => item.type === 'hero') ?? study.gallery[0];

    return (
        <motion.article
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: index * 0.1, ease: EASE_OUT }}
            className="group h-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <CursorLight glow={study.theme.glow} className="h-full">
                <motion.div
                    whileHover={reduce ? undefined : { y: -8 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-slate-200/70 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.22)]"
                >
                    <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-80"
                        style={{
                            background: `linear-gradient(135deg, ${study.theme.from}12 0%, transparent 55%, ${study.theme.to}10 100%)`,
                        }}
                        aria-hidden
                    />

                    <div className="relative p-6 md:p-7">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span
                                    className="rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                                    style={{
                                        color: study.theme.from,
                                        borderColor: `${study.theme.from}30`,
                                        background: `${study.theme.from}0d`,
                                    }}
                                >
                                    {study.industry}
                                </span>
                                <DemoBadge>{study.theme.label}</DemoBadge>
                            </div>
                            <span className="font-mono text-[11px] tracking-[0.22em] text-slate-300">
                                0{index + 1}
                            </span>
                        </div>

                        <h3 className="max-w-[18ch] text-[1.7rem] font-bold leading-[1.02] tracking-tight text-slate-900 md:text-[1.95rem]">
                            {study.title}
                        </h3>
                        <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-slate-500 md:text-[15px]">
                            {study.summary}
                        </p>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl border border-rose-100/80 bg-rose-50/35 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-rose-500/80">Challenge</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-4">{study.challenge}</p>
                            </div>
                            <div className="rounded-2xl border border-primary/10 bg-primary/[0.04] p-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/75">Solution</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-4">{study.solution}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-6 overflow-hidden rounded-[1.35rem] md:mx-7">
                        <motion.div
                            animate={{ scale: hovered && !reduce ? 1.04 : 1 }}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                        >
                            <PlaceholderFrame item={hero} theme={study.theme} interactive className="min-h-[220px]" />
                        </motion.div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/55 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Results</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">{study.results}</p>
                        </div>

                        <div className="mt-5">
                            <CaseStudyMetricGrid
                                metrics={study.metrics}
                                theme={study.theme}
                                animateOnHover
                                hovered={hovered}
                            />
                        </div>

                        <motion.button
                            type="button"
                            onClick={() => onOpen(study)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group/btn relative mt-6 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(86,0,227,0.55)] transition"
                            style={{ background: `linear-gradient(135deg, ${study.theme.from}, ${study.theme.to})` }}
                        >
                            <Sparkles className="h-4 w-4 opacity-90" />
                            <span>Open Case Study Experience</span>
                            <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-0.5" />
                        </motion.button>
                    </div>
                </motion.div>
            </CursorLight>
        </motion.article>
    );
}
