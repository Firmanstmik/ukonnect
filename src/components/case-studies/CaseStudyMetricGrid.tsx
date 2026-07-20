import { motion } from 'framer-motion';
import type { CaseStudyMetric, CaseStudyTheme } from './caseStudyExperienceData';
import { IllustrativeBadge } from './CaseStudyPrimitives';
import { EASE_OUT } from '../motion';

export function CaseStudyMetricGrid({
    metrics,
    theme,
    animateOnHover = false,
    hovered = false,
}: {
    metrics: CaseStudyMetric[];
    theme: CaseStudyTheme;
    animateOnHover?: boolean;
    hovered?: boolean;
}) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Result Metrics</p>
                <IllustrativeBadge />
            </div>
            <div className="grid grid-cols-3 gap-2.5">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.08, ease: EASE_OUT }}
                        animate={
                            animateOnHover && hovered
                                ? { y: -4, scale: 1.03 }
                                : { y: 0, scale: 1 }
                        }
                        className="rounded-2xl border border-slate-200/70 bg-white/90 p-3 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)]"
                    >
                        <p
                            className="text-xl font-bold tracking-tight md:text-2xl"
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {metric.value}
                        </p>
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                            {metric.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
