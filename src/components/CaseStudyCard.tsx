import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Info, Lock } from 'lucide-react';
import type { Translate } from '../i18n/translations';
import type { CaseStudy } from './caseStudyData';
import { EASE_OUT } from './motion';
import { CardDashboard, MetricStat } from './CaseStudyWidgets';

type CaseStudyCardProps = {
    study: CaseStudy;
    index: number;
    ctaLabel: string;
    collapseLabel: string;
    challengeLabel: string;
    isActive: boolean;
    panelId: string;
    onExplore: (study: CaseStudy) => void;
    t: Translate;
};

export const CaseStudyCard = memo(function CaseStudyCard({
    study,
    index,
    ctaLabel,
    collapseLabel,
    challengeLabel,
    isActive,
    panelId,
    onExplore,
    t,
}: CaseStudyCardProps) {
    const reduce = useReducedMotion();

    return (
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: EASE_OUT }}
            whileHover={reduce || isActive ? undefined : { y: -6, transition: { duration: 0.25, ease: EASE_OUT } }}
            className="group relative h-full"
        >
            {/* Premium halo — a soft gradient ring in the study's own palette, dormant until hover */}
            <div
                className="pointer-events-none absolute -inset-[1px] rounded-[1.85rem] opacity-0 blur-[2px] transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{ background: `linear-gradient(140deg, ${study.accentFrom}70, ${study.accentTo}40, transparent 65%)` }}
                aria-hidden
            />

            <div
                className={`card-shine-sweep relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white transition-[box-shadow,border-color,transform] duration-300 ease-out group-hover:-translate-y-0.5 ${
                    isActive
                        ? 'border-primary/40 shadow-[0_2px_6px_rgba(15,23,42,0.05),0_24px_56px_-20px_rgba(15,23,42,0.18)]'
                        : 'border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] group-hover:border-white group-hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12),0_32px_64px_-24px_rgba(15,23,42,0.22)]'
                }`}
            >
                {/* Top accent wash */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-70"
                    style={{ background: `linear-gradient(135deg, ${study.accentFrom}12 0%, transparent 60%, ${study.accentTo}08 100%)` }}
                />
                {/* Index watermark */}
                <span
                    className="pointer-events-none absolute -right-1 -top-2 select-none text-[5.5rem] font-bold leading-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.07]"
                    aria-hidden
                >
                    {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative flex flex-1 flex-col p-7 md:p-8">
                    {/* Header */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="relative">
                            <div
                                className="absolute -inset-0.5 rounded-2xl opacity-25 blur-md"
                                style={{ backgroundColor: study.clientColor }}
                            />
                            <div
                                className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold tracking-wide text-white shadow-lg ring-2 ring-white"
                                style={{ background: `linear-gradient(135deg, ${study.clientColor}, ${study.accentTo})` }}
                            >
                                {study.clientInitials}
                            </div>
                        </div>
                        <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm backdrop-blur-sm">
                            {t(study.industryKey)}
                        </span>
                    </div>

                    <h3 className="mb-2 line-clamp-2 min-h-[3.4rem] text-xl font-bold leading-snug tracking-tight text-slate-900 md:text-[1.375rem]">
                        {t(study.titleKey)}
                    </h3>

                    {/* Confidentiality is deliberate — names withheld under client NDA, not absent */}
                    <p className="mb-5 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                        <Lock className="h-3 w-3" strokeWidth={2.2} aria-hidden />
                        {t('caseStudies.confidential')}
                    </p>

                    {/* Story arc — Challenge → Solution (show the transformation, tell little) */}
                    <div className="relative mb-6 pl-4">
                        <span
                            className="absolute inset-y-1 left-0 w-[2px] rounded-full"
                            style={{ background: `linear-gradient(to bottom, #fb718580, #e2e8f0, ${study.accentFrom})` }}
                            aria-hidden
                        />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-rose-500/80">{challengeLabel}</p>
                            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{t(study.challengeKey)}</p>
                        </div>
                        <div className="mt-3.5">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary/80">
                                {t('caseStudies.solutionLabel')}
                            </p>
                            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-600">{t(study.solutionKey)}</p>
                        </div>
                    </div>

                    {/* Signature dashboard — distinct per study; honestly labelled as illustrative */}
                    <div className="mb-6 rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/60 p-4 shadow-sm">
                        <div className="flex min-h-[15rem] flex-col justify-center">
                            <CardDashboard study={study} t={t} />
                        </div>
                        <p className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-2.5 text-[11px] font-normal text-slate-400">
                            <Info className="h-3 w-3 shrink-0" aria-hidden />
                            {t('caseStudies.illustrative')}
                        </p>
                    </div>

                    {/* Business results */}
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        {t('caseStudies.modal.results')}
                    </p>
                    <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                        {study.metrics.map((metric) => (
                            <MetricStat
                                key={metric.labelKey}
                                metric={metric}
                                accentFrom={study.accentFrom}
                                accentTo={study.accentTo}
                                t={t}
                            />
                        ))}
                    </div>

                    {/* Client quote */}
                    <figure className="mt-6 rounded-2xl bg-slate-50/70 p-4">
                        <blockquote className="text-[13px] italic leading-relaxed text-slate-600">
                            &ldquo;{t(study.quoteKey)}&rdquo;
                        </blockquote>
                        <figcaption className="mt-2 text-[11px] font-semibold" style={{ color: study.accentFrom }}>
                            {t(study.quoteRoleKey)}
                        </figcaption>
                    </figure>

                    {/* CTA — opens the cinematic transformation reveal */}
                    <motion.button
                        type="button"
                        onClick={() => onExplore(study)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        aria-expanded={isActive}
                        aria-controls={panelId}
                        className={`group/btn relative mt-6 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl border px-5 py-3.5 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                            isActive
                                ? 'border-transparent bg-gradient-to-r from-[#5600e3] via-[#7b2ff0] to-[#9b4dff] text-white shadow-[0_1px_2px_rgba(86,0,227,0.25),0_16px_36px_-10px_rgba(86,0,227,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'
                                : 'border-slate-200/80 bg-slate-50/80 text-slate-700 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-[#5600e3] group-hover:via-[#7b2ff0] group-hover:to-[#9b4dff] group-hover:text-white group-hover:shadow-[0_1px_2px_rgba(86,0,227,0.25),0_16px_36px_-10px_rgba(86,0,227,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]'
                        }`}
                    >
                        {/* Shine sweep — fires only when the button itself is hovered */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:[animation:cardShine_0.8s_ease-out_forwards]"
                        />
                        <span className="relative">{isActive ? collapseLabel : ctaLabel}</span>
                        <span className="relative flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ease-out group-hover/btn:scale-110 group-hover:bg-white/15">
                            {isActive ? (
                                <ChevronDown className="h-4 w-4 rotate-180 transition-transform duration-300" />
                            ) : (
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            )}
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.article>
    );
});
