import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight2 } from 'iconsax-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { CaseStudyMetricGrid } from './CaseStudyMetricGrid';
import { CursorLight } from './CursorLight';
import { EASE_OUT } from '../motion';

type CaseStudyFeaturedCardProps = {
    study: CaseStudyExperience;
    index: number;
    onOpen: (study: CaseStudyExperience) => void;
};

/**
 * Editorial documentary project card.
 * Visual-first (60–70%), sparse copy, Before → Transform → Result.
 */
export function CaseStudyFeaturedCard({ study, index, onOpen }: CaseStudyFeaturedCardProps) {
    const reduce = useReducedMotion();
    const [hovered, setHovered] = useState(false);
    const reverse = index % 2 === 1;

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: index * 0.08, ease: EASE_OUT }}
            className="group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <CursorLight glow={study.theme.glow} className="rounded-[2rem]">
                <motion.div
                    whileHover={reduce ? undefined : { y: -6 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-[box-shadow,border-color] duration-500 group-hover:border-white group-hover:shadow-[0_40px_100px_-40px_rgba(15,23,42,0.45)]"
                    style={{
                        boxShadow: hovered
                            ? `0 40px 100px -40px rgba(15,23,42,0.45), 0 0 0 1px ${study.theme.from}22, 0 0 60px ${study.theme.glow}`
                            : undefined,
                    }}
                >
                    {/* Soft gradient border wash */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                            background: `linear-gradient(135deg, ${study.theme.from}14 0%, transparent 40%, ${study.theme.to}10 100%)`,
                        }}
                        aria-hidden
                    />

                    <div
                        className={`relative grid lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] ${
                            reverse ? 'lg:[&>*:first-child]:order-2' : ''
                        }`}
                    >
                        {/* ── Documentary visual (dominant) ── */}
                        <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[460px]">
                            <motion.img
                                src={study.coverImage}
                                alt={study.coverAlt}
                                loading="lazy"
                                animate={{ scale: hovered && !reduce ? 1.06 : 1 }}
                                transition={{ duration: 1.1, ease: EASE_OUT }}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${study.theme.mesh} opacity-55 mix-blend-multiply`}
                                aria-hidden
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(8,13,25,0.15) 0%, transparent 35%, rgba(8,13,25,0.55) 100%)',
                                }}
                                aria-hidden
                            />
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 40%)',
                                }}
                                aria-hidden
                            />

                            <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                                <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                                    {study.documentaryLabel}
                                </span>
                                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                                    Case Study
                                </span>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                                    0{index + 1} · {study.industry}
                                </p>
                                <p className="mt-1 max-w-[28ch] text-lg font-semibold tracking-tight text-white sm:text-xl">
                                    {study.businessType.split('·')[0]?.trim()}
                                </p>
                            </div>
                        </div>

                        {/* ── Editorial narrative ── */}
                        <div className="relative flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                            <span
                                className="mb-4 inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                                style={{
                                    color: study.theme.from,
                                    borderColor: `${study.theme.from}33`,
                                    background: `${study.theme.from}0d`,
                                }}
                            >
                                {study.industry}
                            </span>

                            <h3 className="max-w-[18ch] text-[1.65rem] font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-[1.9rem] lg:text-[2.05rem]">
                                {study.title}
                            </h3>

                            <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-slate-500">
                                {study.summary}
                            </p>

                            {/* Before → Transform → Result */}
                            <div className="mt-8 space-y-0">
                                <NarrativeBeat
                                    label="Before"
                                    text={study.before}
                                    accent="rgba(148,163,184,0.9)"
                                />
                                <div className="flex items-center gap-3 py-1.5 pl-1" aria-hidden>
                                    <span
                                        className="h-6 w-px"
                                        style={{
                                            background: `linear-gradient(180deg, ${study.theme.from}55, ${study.theme.to}55)`,
                                        }}
                                    />
                                    <span
                                        className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                                        style={{ color: study.theme.from }}
                                    >
                                        Transform
                                    </span>
                                </div>
                                <p className="pl-1 text-[13px] font-medium leading-snug text-slate-700">
                                    {study.transform}
                                </p>
                                <div className="flex items-center gap-3 py-1.5 pl-1" aria-hidden>
                                    <span
                                        className="h-6 w-px"
                                        style={{
                                            background: `linear-gradient(180deg, ${study.theme.from}55, ${study.theme.to}22)`,
                                        }}
                                    />
                                </div>
                                <NarrativeBeat
                                    label="Result"
                                    text={study.after}
                                    accent={study.theme.from}
                                />
                            </div>

                            <div className="mt-8">
                                <CaseStudyMetricGrid
                                    metrics={study.metrics}
                                    theme={study.theme}
                                    animateOnHover
                                    hovered={hovered}
                                    editorial
                                />
                            </div>

                            <motion.button
                                type="button"
                                onClick={() => onOpen(study)}
                                whileHover={reduce ? undefined : { y: -2 }}
                                whileTap={reduce ? undefined : { scale: 0.985 }}
                                className="group/btn relative mt-8 inline-flex w-full items-center justify-between overflow-hidden rounded-2xl px-5 py-4 text-left text-sm font-semibold text-white sm:w-auto sm:min-w-[240px]"
                                style={{
                                    background: `linear-gradient(135deg, ${study.theme.from}, ${study.theme.to})`,
                                    boxShadow: `0 18px 40px -16px ${study.theme.glow}`,
                                }}
                            >
                                <span>Open Case Study</span>
                                <ArrowRight2 size={18} variant="Outline" color="#ffffff" className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </CursorLight>
        </motion.article>
    );
}

function NarrativeBeat({
    label,
    text,
    accent,
}: {
    label: string;
    text: string;
    accent: string;
}) {
    return (
        <div className="pl-1">
            <p
                className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
            >
                {label}
            </p>
            <p className="mt-1.5 max-w-[40ch] text-[13px] leading-relaxed text-slate-600">{text}</p>
        </div>
    );
}
