import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Building2,
    Quote,
    Sparkles,
    Target,
    TrendingUp,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import type { Translate } from '../i18n/translations';
import type { CaseStudy } from './caseStudyData';
import { EASE_OUT } from './motion';
import { AutomationFlow } from './AutomationFlow';
import {
    BeforeAfter,
    ConversionFunnel,
    GoogleG,
    GoogleStars,
    GrowthChart,
    MetricStat,
} from './CaseStudyWidgets';

/* ────────────────────────────────────────────────────────────
   One chapter of the story — numbered node + animated content
   ──────────────────────────────────────────────────────────── */
function Chapter({
    index,
    icon: Icon,
    label,
    accent,
    isLast = false,
    children,
}: {
    index: number;
    icon: LucideIcon;
    label: string;
    accent: string;
    isLast?: boolean;
    children: ReactNode;
}) {
    return (
        <div className="relative pl-14 sm:pl-16">
            {/* Spine */}
            {!isLast && (
                <span
                    className="absolute left-[19px] top-11 bottom-[-2.25rem] w-[2px] sm:left-[23px]"
                    style={{ background: `linear-gradient(to bottom, ${accent}40, ${accent}10)` }}
                    aria-hidden
                />
            )}
            {/* Node */}
            <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-lg ring-4 ring-white sm:h-12 sm:w-12"
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
            >
                <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} />
            </motion.span>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.05 }}
                className="pb-12"
            >
                <div className="mb-3 flex items-center gap-2.5 pt-1.5 sm:pt-2.5">
                    <span className="text-[10px] font-bold tabular-nums" style={{ color: accent }}>
                        {String(index).padStart(2, '0')}
                    </span>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</h4>
                </div>
                {children}
            </motion.div>
        </div>
    );
}

export function TransformationTimeline({ study, t }: { study: CaseStudy; t: Translate }) {
    const { accentFrom, accentTo } = study;

    return (
        <div className="relative">
            {/* ── Chapter 1 · The client ── */}
            <Chapter index={1} icon={Building2} label={t('caseStudies.timeline.client')} accent={accentFrom}>
                <div className="flex flex-wrap items-center gap-4">
                    <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold tracking-wide text-white shadow-lg ring-2 ring-white"
                        style={{ background: `linear-gradient(135deg, ${study.clientColor}, ${accentTo})` }}
                    >
                        {study.clientInitials}
                    </div>
                    <div className="min-w-0">
                        <span
                            className="inline-block rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                            style={{ color: accentFrom, borderColor: `${accentFrom}30`, background: `${accentFrom}0a` }}
                        >
                            {t(study.industryKey)}
                        </span>
                        <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-slate-900 sm:text-xl">
                            {t(study.titleKey)}
                        </h3>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {study.tagKeys.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                        >
                            {t(tag)}
                        </span>
                    ))}
                </div>
            </Chapter>

            {/* ── Chapter 2 · Challenge ── */}
            <Chapter index={2} icon={Target} label={t('caseStudies.challengeLabel')} accent="#f43f5e">
                <p className="max-w-xl text-[15px] leading-relaxed text-slate-600">{t(study.challengeKey)}</p>
            </Chapter>

            {/* ── Chapter 3 · Solution ── */}
            <Chapter index={3} icon={Sparkles} label={t('caseStudies.solutionLabel')} accent={accentFrom}>
                <div
                    className="max-w-xl rounded-2xl p-5"
                    style={{ border: `1px solid ${accentFrom}26`, background: `${accentFrom}08` }}
                >
                    <p className="text-[15px] leading-relaxed text-slate-700">{t(study.solutionKey)}</p>
                </div>
            </Chapter>

            {/* ── Chapter 4 · AI workflow ── */}
            <Chapter index={4} icon={Workflow} label={t('caseStudies.modal.workflow')} accent={accentFrom}>
                <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/60 p-5 sm:p-6">
                    <AutomationFlow t={t} />
                </div>
            </Chapter>

            {/* ── Chapter 5 · Business growth ── */}
            <Chapter index={5} icon={TrendingUp} label={t('caseStudies.timeline.growth')} accent={accentFrom}>
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
                        <GrowthChart
                            series={study.series}
                            accentFrom={accentFrom}
                            accentTo={accentTo}
                            delta={study.metrics[0].delta}
                            caption={`${t('caseStudies.growth.title')} · ${t(study.seriesUnitKey)}`}
                        />
                    </div>
                    <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
                        <p className="mb-3 text-[11px] font-semibold text-slate-500">{t('caseStudies.funnel.title')}</p>
                        <ConversionFunnel stages={study.funnel} accentFrom={accentFrom} accentTo={accentTo} t={t} />
                    </div>
                </div>

                <p className="mb-3 mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    {t('caseStudies.beforeAfter.title')}
                </p>
                <div className="space-y-3">
                    {study.metrics.map((metric) => (
                        <div key={metric.labelKey}>
                            <div className="mb-1.5 flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-600">{t(metric.labelKey)}</span>
                                <span
                                    className="text-xs font-bold tabular-nums"
                                    style={{ color: metric.improvement ? accentFrom : '#059669' }}
                                >
                                    {metric.delta}
                                </span>
                            </div>
                            <BeforeAfter metric={metric} accentFrom={accentFrom} accentTo={accentTo} t={t} />
                        </div>
                    ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5">
                    {study.metrics.map((metric) => (
                        <MetricStat key={metric.labelKey} metric={metric} accentFrom={accentFrom} accentTo={accentTo} t={t} />
                    ))}
                </div>
            </Chapter>

            {/* ── Chapter 6 · Client quote ── */}
            <Chapter index={6} icon={Quote} label={t('caseStudies.quoteLabel')} accent={accentFrom} isLast>
                <figure className="relative max-w-2xl overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6">
                    <Quote
                        className="absolute right-5 top-5 h-10 w-10 -scale-x-100 opacity-[0.06]"
                        style={{ color: accentFrom }}
                        aria-hidden
                    />
                    <blockquote className="relative text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
                        &ldquo;{t(study.quoteKey)}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 flex flex-wrap items-center gap-3">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${study.clientColor}, ${accentTo})` }}
                        >
                            {study.clientInitials}
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{t(study.quoteRoleKey)}</span>
                        <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 shadow-sm">
                            <GoogleG className="h-4 w-4" />
                            <GoogleStars size="w-3 h-3" delay={0.1} />
                        </span>
                    </figcaption>
                    <div
                        className="mt-5 flex flex-wrap items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                        style={{ color: accentFrom, background: `${accentFrom}0c` }}
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-70">
                            {t('caseStudies.outcomeLabel')}
                        </span>
                        <span className="leading-snug">{t(study.outcomeKey)}</span>
                    </div>
                </figure>

                {/* CTA */}
                <a
                    href="#contact"
                    className="group mt-6 inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
                >
                    {t('caseStudies.modal.cta')}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
            </Chapter>
        </div>
    );
}
