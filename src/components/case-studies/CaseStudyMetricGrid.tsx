import { motion } from 'framer-motion';
import type { CaseStudyMetric, CaseStudyTheme } from './caseStudyExperienceData';
import { EASE_OUT } from '../motion';

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

    return (
        <div className={editorial ? 'space-y-3' : 'space-y-3'}>
            {!editorial ? (
                <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isDark ? 'text-white/48' : 'text-slate-500'}`}>
                    Result Metrics
                </p>
            ) : (
                <p className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/42' : 'text-slate-400'}`}>
                    Verified Results
                </p>
            )}
            <div className={`grid grid-cols-3 ${editorial ? 'gap-3' : 'gap-2.5'}`}>
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.08, ease: EASE_OUT }}
                        animate={
                            animateOnHover && hovered
                                ? { y: -3, scale: 1.02 }
                                : { y: 0, scale: 1 }
                        }
                        className={
                            editorial
                                ? `${isDark ? 'border-b border-white/10' : 'border-b border-slate-200/80'} pb-3 pt-1`
                                : `${isDark ? 'border-white/10 bg-white/6' : 'border-slate-200/70 bg-white/90'} rounded-2xl border p-3 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)]`
                        }
                    >
                        <p
                            className={`font-bold tracking-tight ${editorial ? 'text-2xl md:text-[1.65rem]' : 'text-xl md:text-2xl'}`}
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
                            className={`mt-1 font-semibold uppercase text-slate-500 ${
                                editorial
                                    ? 'text-[9px] tracking-[0.14em]'
                                    : 'text-[10px] tracking-[0.12em]'
                            } ${isDark ? '!text-white/46' : ''}`}
                        >
                            {metric.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
