import { motion, useReducedMotion } from 'framer-motion';
import type { CaseStudyTimelineStep, CaseStudyTheme } from './caseStudyExperienceData';
import { EASE_LUXURY } from '../motion';

export function CaseStudyTimeline({
    steps,
    theme,
    tone = 'light',
}: {
    steps: CaseStudyTimelineStep[];
    theme: CaseStudyTheme;
    tone?: 'light' | 'dark';
}) {
    const isDark = tone === 'dark';
    const reduce = useReducedMotion();

    return (
        <div className="relative">
            <div className="mb-8 flex items-end justify-between gap-3">
                <div>
                    <p className={`font-mono text-[10px] tracking-[0.28em] ${isDark ? 'text-white/32' : 'text-primary/55'}`}>
                        PROJECT TIMELINE
                    </p>
                    <h4
                        className={`mt-4 text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[2rem] ${
                            isDark ? 'text-white' : 'text-slate-900'
                        }`}
                    >
                        Execution rhythm
                    </h4>
                </div>
            </div>

            <div className="relative space-y-0">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.phase}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.55, delay: reduce ? 0 : index * 0.06, ease: EASE_LUXURY }}
                        className="relative grid grid-cols-[auto_1fr] gap-5 pb-9 last:pb-0"
                    >
                        {index < steps.length - 1 ? (
                            <span
                                className="absolute left-[17px] top-10 bottom-0 w-px"
                                style={{ background: `linear-gradient(to bottom, ${theme.from}40, transparent)` }}
                                aria-hidden
                            />
                        ) : null}

                        <div
                            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-2xl text-[11px] font-bold text-white"
                            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                            aria-hidden
                        >
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className={`pt-1 ${isDark ? '' : 'rounded-[1.25rem] border border-slate-200/70 bg-white/85 p-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.18)]'}`}>
                            <p className={`font-mono text-[10px] tracking-[0.22em] ${isDark ? 'text-white/40' : 'text-primary/60'}`}>
                                {step.phase}
                            </p>
                            <h5 className={`mt-2 text-base font-semibold tracking-tight md:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {step.title}
                            </h5>
                            <p className={`mt-2 text-sm leading-[1.7] ${isDark ? 'text-white/55' : 'text-slate-500'}`}>
                                {step.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
