/**
 * CTAGrowthVisual — the "living" premium card next to the closing CTA copy.
 *
 * Reuses the site's established dark-glass frame tokens (hero-frame-violet,
 * hero-card-dark, hero-gloss-sheen, hero-workflow-mesh) so it reads as part
 * of the same design system as the Hero dashboard, not a new visual language.
 * Numbers mirror the Hero's illustrative dashboard (+312% / 68% / 4.2x) so
 * the same story repeats consistently across the page.
 */
import { useId } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactElement } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedCounter } from './AnimatedCounter';
import { EASE_OUT } from './motion';
import { IconFlash, IconSparkle, IconTrendUp, IconUsers, type IconsaxIconProps } from './icons/HeroIcons';

const SPARK_PATH = 'M3,44 C22,41 24,34 44,32 C64,30 66,18 88,17 C108,16 110,6 132,5 C150,4 168,3 189,2';
const SPARK_AREA = `${SPARK_PATH} L189,50 L3,50 Z`;

function FloatBadge({
    icon: Icon,
    label,
    tone,
    delay,
    className,
}: {
    icon: (props: IconsaxIconProps) => ReactElement;
    label: string;
    tone: 'violet' | 'emerald';
    delay: number;
    className: string;
}) {
    const reduce = useReducedMotion();
    const iconWrap =
        tone === 'emerald'
            ? 'bg-emerald-400/15 ring-1 ring-emerald-400/30'
            : 'bg-[#9b4dff]/15 ring-1 ring-[#c4b1ff]/30';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.55, ease: EASE_OUT }}
            className={className}
        >
            <motion.div
                animate={reduce ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }}
                className="flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-900/80 px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.35)] backdrop-blur-xl"
            >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}>
                    <Icon size={13} color={tone === 'emerald' ? '#34d399' : '#c4b1ff'} />
                </div>
                <span className="whitespace-nowrap text-[10.5px] font-bold text-white/85">{label}</span>
            </motion.div>
        </motion.div>
    );
}

function StatTile({
    icon: Icon,
    label,
    index,
    children,
}: {
    icon: (props: IconsaxIconProps) => ReactElement;
    label: string;
    index: number;
    children: ReactElement;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 + index * 0.08, duration: 0.5, ease: EASE_OUT }}
            className={`flex flex-col gap-1.5 py-1 ${index > 0 ? 'border-l border-white/10 pl-3' : ''}`}
        >
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-white/10">
                <Icon size={12} />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/45">{label}</p>
            <p className="text-base font-bold tabular-nums leading-none text-white">{children}</p>
        </motion.div>
    );
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function CTAGrowthVisual() {
    const { t } = useLanguage();
    const reduce = useReducedMotion();
    const uid = useId();
    const fillId = `ctaSparkFill-${uid}`;
    const lineId = `ctaSparkLine-${uid}`;

    return (
        <div className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-[380px]">
            <FloatBadge
                icon={IconFlash}
                label={t('cta.visual.badge1')}
                tone="violet"
                delay={0.5}
                className="absolute -top-4 -right-2 z-20 sm:-right-5"
            />
            <FloatBadge
                icon={IconUsers}
                label={t('cta.visual.badge2')}
                tone="emerald"
                delay={0.7}
                className="absolute -bottom-4 -left-2 z-20 sm:-left-5"
            />

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                className="hero-frame-violet rounded-[1.75rem] shadow-[0_24px_70px_-24px_rgba(86,0,227,0.5)]"
            >
                <div className="hero-card-dark hero-gloss-sheen relative overflow-hidden rounded-[calc(1.75rem-1px)] p-5 sm:p-6">
                    <div className="hero-workflow-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />

                    {/* Header */}
                    <div className="relative z-10 mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#5600e3] to-[#9b4dff] shadow-lg shadow-primary/40 ring-1 ring-white/20">
                                <IconSparkle size={15} color="#ffffff" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/55">
                                {t('cta.visual.badge')}
                            </span>
                        </div>
                        <span className="hero-live-pill inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-bold text-emerald-300 ring-1 ring-emerald-400/25">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            </span>
                            {t('cta.visual.live')}
                        </span>
                    </div>

                    {/* Big stat + sparkline */}
                    <div className="relative z-10 mb-5">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
                            {t('cta.visual.statLabel')}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <AnimatedCounter
                                to={312}
                                prefix="+"
                                suffix="%"
                                duration={1.8}
                                className="bg-gradient-to-r from-[#c4b1ff] to-[#e9d5ff] bg-clip-text text-[2.5rem] font-bold leading-none text-transparent sm:text-5xl"
                            />
                            <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-400/20">
                                <IconTrendUp size={10} color="#34d399" />
                                {t('cta.visual.statCaption')}
                            </span>
                        </div>

                        <svg viewBox="0 0 192 50" className="mt-3 h-12 w-full overflow-visible" fill="none" aria-hidden>
                            <defs>
                                <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#9b4dff" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#9b4dff" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#7c3aed" />
                                    <stop offset="100%" stopColor="#e9d5ff" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d={SPARK_AREA}
                                fill={`url(#${fillId})`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            />
                            <motion.path
                                d={SPARK_PATH}
                                stroke={`url(#${lineId})`}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.35 }}
                            />
                            <motion.circle
                                cx="189"
                                cy="2"
                                r="4"
                                fill="#f5f3ff"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.5, duration: 0.35, ease: EASE_OUT }}
                            >
                                {!reduce && (
                                    <animate attributeName="r" values="4;6;4" dur="2.4s" repeatCount="indefinite" />
                                )}
                            </motion.circle>
                        </svg>
                    </div>

                    {/* Stat tiles */}
                    <div className="relative z-10 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                        <StatTile icon={(p) => <IconUsers {...p} color="#34d399" />} label={t('cta.visual.leadsLabel')} index={0}>
                            <>{t('cta.visual.leadsValue')}</>
                        </StatTile>
                        <StatTile icon={(p) => <IconTrendUp {...p} color="#c4b1ff" />} label={t('cta.visual.conversionLabel')} index={1}>
                            <AnimatedCounter to={68} suffix="%" duration={1.6} />
                        </StatTile>
                        <StatTile icon={(p) => <IconSparkle {...p} color="#e9d5ff" />} label={t('cta.visual.roiLabel')} index={2}>
                            <AnimatedCounter to={4.2} decimals={1} suffix="x" duration={1.6} />
                        </StatTile>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
