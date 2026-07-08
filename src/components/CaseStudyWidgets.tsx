import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import type { TranslationKey, Translate } from '../i18n/translations';
import { EASE_OUT } from './motion';
import { AnimatedCounter } from './AnimatedCounter';
import {
    formatMetricValue,
    type BookingsData,
    type CaseMetric,
    type CaseStudy,
    type FunnelStage,
    type PipelineRow,
    type PipelineStatus,
} from './caseStudyData';


/* ────────────────────────────────────────────────────────────
   Shared Google review marks
   ──────────────────────────────────────────────────────────── */
export function GoogleG({ className = 'w-5 h-5' }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" className={`${className} flex-shrink-0`} xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
    );
}

export function GoogleStars({ size = 'w-3.5 h-3.5', delay = 0.3 }: { size?: string; delay?: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + i * 0.08, type: 'spring', stiffness: 400 }}
                >
                    <Star className={`${size} fill-[#FBBC05] text-[#FBBC05]`} />
                </motion.div>
            ))}
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   Growth chart — animated area + line "mini analytics" widget
   ──────────────────────────────────────────────────────────── */
export function GrowthChart({
    series,
    accentFrom,
    accentTo,
    delta,
    caption,
    className = '',
    height = 132,
}: {
    series: number[];
    accentFrom: string;
    accentTo: string;
    delta: string;
    caption: string;
    className?: string;
    height?: number;
}) {
    const reduce = useReducedMotion();
    const uid = useId().replace(/:/g, '');
    const W = 320;
    const H = 132;
    const padX = 8;
    const padTop = 16;
    const padBottom = 10;

    const min = Math.min(...series);
    const max = Math.max(...series);
    const range = max - min || 1;
    const stepX = (W - padX * 2) / (series.length - 1);

    const points = series.map((v, i) => ({
        x: padX + i * stepX,
        y: padTop + (H - padTop - padBottom) * (1 - (v - min) / range),
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${H} L ${points[0].x.toFixed(1)} ${H} Z`;
    const last = points[points.length - 1];

    return (
        <div className={`relative ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-slate-500">{caption}</p>
                <span
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md text-white"
                    style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
                >
                    {delta}
                </span>
            </div>
            <svg
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                height={height}
                preserveAspectRatio="none"
                role="img"
                aria-label={`${caption} ${delta}`}
            >
                <defs>
                    <linearGradient id={`area-${uid}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={accentFrom} stopOpacity="0.28" />
                        <stop offset="100%" stopColor={accentTo} stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id={`line-${uid}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={accentFrom} />
                        <stop offset="100%" stopColor={accentTo} />
                    </linearGradient>
                </defs>

                {/* baseline gridlines */}
                {[0.25, 0.5, 0.75].map((g) => (
                    <line
                        key={g}
                        x1={padX}
                        x2={W - padX}
                        y1={padTop + (H - padTop - padBottom) * g}
                        y2={padTop + (H - padTop - padBottom) * g}
                        stroke="rgb(148 163 184 / 0.16)"
                        strokeWidth="1"
                        strokeDasharray="3 4"
                    />
                ))}

                <motion.path
                    d={areaPath}
                    fill={`url(#area-${uid})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
                />
                <motion.path
                    d={linePath}
                    fill="none"
                    stroke={`url(#line-${uid})`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: EASE_OUT }}
                />
                <motion.circle
                    cx={last.x}
                    cy={last.y}
                    r="4"
                    fill="#fff"
                    stroke={accentTo}
                    strokeWidth="2.5"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.3, type: 'spring', stiffness: 360, damping: 18 }}
                    style={{ transformOrigin: `${last.x}px ${last.y}px` }}
                />
            </svg>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   CRM pipeline — believable "live" lead snapshot
   ──────────────────────────────────────────────────────────── */
const PIPELINE_STATUS: Record<PipelineStatus, { labelKey: TranslationKey; pill: string }> = {
    new: { labelKey: 'caseStudies.pipeline.new', pill: 'bg-slate-100 text-slate-500' },
    qualified: { labelKey: 'caseStudies.pipeline.qualified', pill: 'bg-amber-50 text-amber-600 ring-1 ring-amber-100' },
    won: { labelKey: 'caseStudies.pipeline.won', pill: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100' },
};

export function CrmPipeline({
    rows,
    accentFrom,
    accentTo,
    t,
    className = '',
}: {
    rows: PipelineRow[];
    accentFrom: string;
    accentTo: string;
    t: Translate;
    className?: string;
}) {
    return (
        <div className={className}>
            <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-500">{t('caseStudies.pipeline.title')}</p>
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {t('caseStudies.pipeline.live')}
                </span>
            </div>
            <div className="space-y-1.5">
                {rows.map((row, i) => {
                    const meta = PIPELINE_STATUS[row.status];
                    return (
                        <motion.div
                            key={row.initials + row.source}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: EASE_OUT }}
                            className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white/70 px-2.5 py-2"
                        >
                            <span
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white shadow-sm"
                                style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
                            >
                                {row.initials}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-slate-600">{row.source}</span>
                            <span
                                className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${meta.pill}`}
                            >
                                {t(meta.labelKey)}
                            </span>
                            <span className="w-[52px] shrink-0 text-right text-[11px] font-bold tabular-nums text-slate-800">
                                <AnimatedCounter to={row.value} prefix="€" duration={1.4} />
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   Bookings calendar — appointments per weekday
   ──────────────────────────────────────────────────────────── */
const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function BookingsCalendar({
    data,
    accentFrom,
    accentTo,
    t,
    className = '',
}: {
    data: BookingsData;
    accentFrom: string;
    accentTo: string;
    t: Translate;
    className?: string;
}) {
    const max = Math.max(...data.week, 1);
    return (
        <div className={className}>
            <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-500">{t('caseStudies.bookings.title')}</p>
                <span className="inline-flex items-baseline gap-1">
                    <span className="text-base font-bold leading-none tabular-nums" style={{ color: accentFrom }}>
                        <AnimatedCounter to={data.total} duration={1.6} />
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">{t('caseStudies.bookings.unit')}</span>
                </span>
            </div>
            <div className="flex items-end justify-between gap-1.5">
                {data.week.map((v, i) => {
                    const h = Math.max((v / max) * 100, 8);
                    return (
                        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                            <span className="text-[10px] font-bold tabular-nums text-slate-400">{v}</span>
                            <div className="relative w-full overflow-hidden rounded-md bg-slate-100/70" style={{ height: 60 }}>
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 rounded-md"
                                    style={{ background: `linear-gradient(180deg, ${accentTo}, ${accentFrom})` }}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.2 + i * 0.07, ease: EASE_OUT }}
                                />
                            </div>
                            <span className="text-[10px] font-medium text-slate-400">{DAY_LETTERS[i]}</span>
                        </div>
                    );
                })}
            </div>
            <p className="mt-3 text-center text-[10px] font-medium text-slate-400">{t('caseStudies.bookings.caption')}</p>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   Card dashboard — picks the signature widget per study
   ──────────────────────────────────────────────────────────── */
export function CardDashboard({ study, t, className = '' }: { study: CaseStudy; t: Translate; className?: string }) {
    if (study.widget === 'pipeline' && study.pipeline) {
        return (
            <CrmPipeline
                rows={study.pipeline}
                accentFrom={study.accentFrom}
                accentTo={study.accentTo}
                t={t}
                className={className}
            />
        );
    }
    if (study.widget === 'bookings' && study.bookings) {
        return (
            <BookingsCalendar
                data={study.bookings}
                accentFrom={study.accentFrom}
                accentTo={study.accentTo}
                t={t}
                className={className}
            />
        );
    }
    return (
        <GrowthChart
            series={study.series}
            accentFrom={study.accentFrom}
            accentTo={study.accentTo}
            delta={study.metrics[0].delta}
            caption={t('caseStudies.growth.caption')}
            height={108}
            className={className}
        />
    );
}

/* ────────────────────────────────────────────────────────────
   Conversion funnel — believable decreasing pipeline bars
   ──────────────────────────────────────────────────────────── */
export function ConversionFunnel({
    stages,
    accentFrom,
    accentTo,
    t,
    className = '',
}: {
    stages: FunnelStage[];
    accentFrom: string;
    accentTo: string;
    t: Translate;
    className?: string;
}) {
    const top = stages[0]?.value ?? 1;
    const overall = Math.round(((stages[stages.length - 1]?.value ?? 0) / top) * 1000) / 10;

    return (
        <div className={className}>
            <div className="space-y-2.5">
                {stages.map((stage, i) => {
                    const pct = Math.max((stage.value / top) * 100, 12);
                    return (
                        <div key={stage.labelKey} className="flex items-center gap-3">
                            <span className="w-20 shrink-0 text-[11px] font-medium text-slate-500 text-right">
                                {t(stage.labelKey)}
                            </span>
                            <div className="relative flex-1 h-7 rounded-lg bg-slate-100/80 overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 rounded-lg"
                                    style={{
                                        background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
                                        opacity: 1 - i * 0.13,
                                    }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${pct}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_OUT }}
                                />
                                <span className="absolute inset-y-0 left-3 flex items-center text-[11px] font-bold text-white tabular-nums drop-shadow-sm">
                                    {stage.value.toLocaleString('en-US')}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-slate-500">
                <span className="font-bold tabular-nums" style={{ color: accentFrom }}>
                    {overall}%
                </span>
                <span>{t('caseStudies.funnel.conversion')}</span>
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   Before / After comparison
   ──────────────────────────────────────────────────────────── */
export function BeforeAfter({
    metric,
    accentFrom,
    accentTo,
    t,
    className = '',
}: {
    metric: CaseMetric;
    accentFrom: string;
    accentTo: string;
    t: Translate;
    className?: string;
}) {
    return (
        <div className={`flex items-stretch gap-2.5 ${className}`}>
            <div className="flex-1 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-1">
                    {t('caseStudies.beforeAfter.before')}
                </p>
                <p className="text-base font-bold text-slate-400 tabular-nums leading-none">
                    {formatMetricValue(metric.before, metric)}
                </p>
            </div>

            <div className="flex items-center justify-center">
                <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
                >
                    <ArrowRight className="w-3.5 h-3.5" />
                </span>
            </div>

            <div
                className="flex-1 rounded-xl px-3.5 py-3 relative overflow-hidden"
                style={{ border: `1px solid ${accentFrom}33`, background: `${accentFrom}0a` }}
            >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: accentFrom }}>
                    {t('caseStudies.beforeAfter.after')}
                </p>
                <p className="text-base font-bold tabular-nums leading-none" style={{ color: accentFrom }}>
                    <AnimatedCounter
                        to={metric.after}
                        decimals={metric.decimals ?? 0}
                        duration={1.6}
                        format={(v) => formatMetricValue(v, metric)}
                    />
                </p>
            </div>
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   Metric stat — compact animated KPI used in card + modal grids
   ──────────────────────────────────────────────────────────── */
export function MetricStat({
    metric,
    accentFrom,
    accentTo,
    t,
}: {
    metric: CaseMetric;
    accentFrom: string;
    accentTo: string;
    t: Translate;
}) {
    const positive = metric.improvement;
    return (
        <div className="text-center">
            <p
                className="text-xl md:text-[1.55rem] font-bold tracking-tight leading-none tabular-nums"
                style={
                    positive
                        ? { background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }
                        : { color: '#059669' }
                }
            >
                <AnimatedCounter
                    to={metric.after}
                    decimals={metric.decimals ?? 0}
                    duration={1.8}
                    format={(v) => formatMetricValue(v, metric)}
                />
            </p>
            <p className="mt-1.5 text-[11px] leading-tight text-slate-500 font-medium">{t(metric.labelKey)}</p>
            <p
                className="mt-1 text-[11px] font-bold tabular-nums"
                style={{ color: positive ? accentFrom : '#059669' }}
            >
                {metric.delta}
            </p>
        </div>
    );
}
