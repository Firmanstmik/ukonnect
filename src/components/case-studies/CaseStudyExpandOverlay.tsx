import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight2, CloseCircle } from 'iconsax-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { CaseStudyMetricGrid } from './CaseStudyMetricGrid';
import { CaseStudyVisual } from './CaseStudyVisual';
import { CursorLight } from './CursorLight';
import { EASE_OUT } from '../motion';

type Props = {
    study: CaseStudyExperience | null;
    index: number;
    onClose: () => void;
    onDeepOpen: (study: CaseStudyExperience) => void;
};

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 32, mass: 0.85 };

/**
 * Expanded documentary project — morphs from compact card via layoutId.
 */
export function CaseStudyExpandOverlay({ study, index, onClose, onDeepOpen }: Props) {
    const reduce = useReducedMotion();

    useEffect(() => {
        if (!study) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [study, onClose]);

    return (
        <AnimatePresence>
            {study ? (
                <motion.div
                    className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto px-4 py-8 sm:px-6 sm:py-10 lg:items-center lg:py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                >
                    <motion.button
                        type="button"
                        aria-label="Close case study"
                        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[6px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.button
                        type="button"
                        onClick={onClose}
                        initial={reduce ? false : { opacity: 0, scale: 0.8, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ delay: 0.12, duration: 0.35, ease: EASE_OUT }}
                        className="absolute left-1/2 top-4 z-[95] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition hover:scale-105 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:top-6"
                        aria-label="Close"
                    >
                        <CloseCircle size={22} variant="Outline" color="#ffffff" />
                    </motion.button>

                    <CursorLight glow={study.theme.glow} className="relative z-[92] w-full max-w-[1180px]">
                        <motion.div
                            layoutId={`cs-shell-${study.id}`}
                            transition={SPRING}
                            className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_40px_120px_-40px_rgba(8,13,25,0.55)] sm:rounded-[2rem]"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`cs-expanded-title-${study.id}`}
                        >
                            <div
                                className="pointer-events-none absolute inset-0 opacity-90"
                                style={{
                                    background: `linear-gradient(135deg, ${study.theme.from}10 0%, transparent 42%, ${study.theme.to}08 100%)`,
                                }}
                                aria-hidden
                            />

                            <div className="relative grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
                                <div className="relative overflow-hidden">
                                    <CaseStudyVisual study={study} variant="hero" layoutImageId={`cs-image-${study.id}`} />

                                    <motion.div
                                        initial={reduce ? false : { opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.18, duration: 0.4 }}
                                        className="absolute left-5 top-5 z-[4] flex flex-wrap gap-2 sm:left-6 sm:top-6"
                                    >
                                        <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                                            {study.documentaryLabel}
                                        </span>
                                        <span
                                            className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md"
                                            style={{ background: `${study.theme.from}40` }}
                                        >
                                            {study.clientName}
                                        </span>
                                    </motion.div>

                                    <motion.p
                                        initial={reduce ? false : { opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.22, duration: 0.4 }}
                                        className="absolute bottom-5 left-5 z-[4] font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:bottom-6 sm:left-6"
                                    >
                                        0{index + 1} · {study.industry}
                                    </motion.p>
                                </div>

                                <div className="relative flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-11">
                                    <motion.span
                                        initial={reduce ? false : { opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15, duration: 0.35 }}
                                        className="mb-4 inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                                        style={{
                                            color: study.theme.from,
                                            borderColor: `${study.theme.from}33`,
                                            background: `${study.theme.from}0d`,
                                        }}
                                    >
                                        {study.industry}
                                    </motion.span>

                                    <motion.h2
                                        layoutId={`cs-title-${study.id}`}
                                        id={`cs-expanded-title-${study.id}`}
                                        transition={SPRING}
                                        className="max-w-[18ch] text-[1.55rem] font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-[1.85rem] lg:text-[2rem]"
                                    >
                                        {study.title}
                                    </motion.h2>

                                    <motion.p
                                        initial={reduce ? false : { opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                        className="mt-3.5 max-w-[36ch] text-[14.5px] leading-relaxed text-slate-500"
                                    >
                                        {study.summary}
                                    </motion.p>

                                    <motion.div
                                        initial={reduce ? false : { opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.26, duration: 0.45 }}
                                        className="mt-7 space-y-0"
                                    >
                                        <NarrativeBeat label="Before" text={study.before} accent="rgba(148,163,184,0.9)" />
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
                                        <NarrativeBeat label="Result" text={study.after} accent={study.theme.from} />
                                    </motion.div>

                                    <motion.div
                                        initial={reduce ? false : { opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.32, duration: 0.4 }}
                                        className="mt-7"
                                    >
                                        <CaseStudyMetricGrid
                                            metrics={study.metrics}
                                            theme={study.theme}
                                            editorial
                                        />
                                    </motion.div>

                                    <motion.button
                                        type="button"
                                        initial={reduce ? false : { opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.38, duration: 0.4 }}
                                        onClick={() => onDeepOpen(study)}
                                        whileHover={reduce ? undefined : { y: -2 }}
                                        whileTap={reduce ? undefined : { scale: 0.985 }}
                                        className="group/btn relative mt-7 inline-flex w-full items-center justify-between overflow-hidden rounded-2xl px-5 py-4 text-sm font-semibold text-white"
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
                </motion.div>
            ) : null}
        </AnimatePresence>
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
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                {label}
            </p>
            <p className="mt-1.5 max-w-[40ch] text-[13px] leading-relaxed text-slate-600">{text}</p>
        </div>
    );
}
