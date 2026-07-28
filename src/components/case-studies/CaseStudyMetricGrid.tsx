import { motion, useReducedMotion } from 'framer-motion';
import type { CaseStudyMetric, CaseStudyTheme } from './caseStudyExperienceData';
import { EASE_LUXURY } from '../motion';

export function CaseStudyMetricGrid({
    metrics,
    theme,
    animateOnHover = false,
    hovered = false,
    editorial = false,
    tone = 'light',
}: {
    metrics: CaseStudyMetric[];
    theme: CaseStudyTheme;
    animateOnHover?: boolean;
    hovered?: boolean;
    /** Slim documentary metrics — no SaaS “Result Metrics” chrome */
    editorial?: boolean;
    tone?: 'light' | 'dark';
}) {
    const isDark = tone === 'dark';
    const reduce = useReducedMotion();

    return (
        <div className="space-y-3">
            {!editorial ? (
                <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-white/48' : 'text-slate-500'}`}>
                    Result Metrics
                </p>
            ) : null}
            <div className={`grid grid-cols-3 ${editorial ? 'gap-5' : 'gap-2.5'}`}>
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.07, ease: EASE_LUXURY }}
                        animate={
                            !reduce && animateOnHover && hovered
                                ? { y: -2, scale: 1.01 }
                                : { y: 0, scale: 1 }
                        }
                        className={
                            editorial
                                ? `${isDark ? 'border-b border-white/[0.08]' : 'border-b border-slate-200/80'} pb-4 pt-1`
                                : `${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200/70 bg-white/90'} rounded-2xl border p-3 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)]`
                        }
                    >
                        <p
                            className={`font-bold tracking-tight ${editorial ? 'text-2xl md:text-[1.75rem]' : 'text-xl md:text-2xl'}`}
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {metric.value}
                        </p>
                        <p
                            className={`mt-1.5 font-semibold uppercase ${
                                editorial
                                    ? 'text-[9px] tracking-[0.14em]'
                                    : 'text-[10px] tracking-[0.12em]'
                            } ${isDark ? 'text-white/46' : 'text-slate-500'}`}
                        >
                            {metric.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
