import { motion } from 'framer-motion';
import type { CaseStudyTimelineStep, CaseStudyTheme } from './caseStudyExperienceData';
import { EASE_OUT } from '../motion';

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

    return (
        <div className="relative">
            <div className="mb-8 flex items-end justify-between gap-3">
                <div>
                    <p className={`font-mono text-[10px] tracking-[0.26em] ${isDark ? 'text-white/35' : 'text-primary/55'}`}>PROJECT TIMELINE</p>
                    <h4 className={`mt-3 text-[1.45rem] font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Execution rhythm</h4>
                </div>
            </div>

            <div className="relative space-y-0">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.phase}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.55, delay: index * 0.06, ease: EASE_OUT }}
                        className="relative grid grid-cols-[auto_1fr] gap-5 pb-9 last:pb-0"
                    >
                        {index < steps.length - 1 ? (
                            <span
                                className="absolute left-[17px] top-10 bottom-0 w-px"
                                style={{ background: `linear-gradient(to bottom, ${theme.from}55, transparent)` }}
                                aria-hidden
                            />
                        ) : null}

                        <div
                            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-2xl text-[11px] font-bold text-white shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className={`pt-1 ${isDark ? '' : 'rounded-[1.25rem] border border-slate-200/70 bg-white/85 p-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.18)]'}`}>
                            <p className={`font-mono text-[10px] tracking-[0.22em] ${isDark ? 'text-white/40' : 'text-primary/60'}`}>{step.phase}</p>
                            <h5 className={`mt-2 text-base font-semibold tracking-tight md:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</h5>
                            <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-white/55' : 'text-slate-500'}`}>{step.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
