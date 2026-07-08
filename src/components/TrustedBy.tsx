/**
 * "Trusted by" — the enterprise social-proof section.
 *
 * Three layers, top to bottom:
 *   1. Narrative header    — authority framing, not just "trusted by N".
 *   2. Curated logo wall   — an infinite, pausable marquee of glass cards;
 *                            each logo lifts, regains colour and reveals the
 *                            working relationship on hover.
 *   3. Enterprise metrics  — four headline figures with count-up animation.
 *
 * Restraint by design: soft gradients and glass only where they earn their
 * place, generous whitespace, no ambient noise. Reads like a mature SaaS
 * proof section, not a template.
 */
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import { EASE_OUT } from './motion';
import { PARTNERS, TRUST_METRICS, type Partner, type TrustMetric } from './partnersData';
import { useLanguage } from '../i18n/LanguageContext';
import type { Translate } from '../i18n/translations';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: EASE_OUT },
});

function LogoCard({ partner, t }: { partner: Partner; t: Translate }) {
    const RelIcon = partner.relIcon;
    return (
        <div className="group group/logo relative shrink-0">
            {/* Relationship tooltip — a small rich chip, not just a text pill */}
            <div
                className="pointer-events-none absolute -top-11 left-1/2 z-10 flex -translate-x-1/2 translate-y-1 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/70 bg-white/95 py-1 pl-1.5 pr-3 opacity-0 shadow-[0_10px_28px_rgba(86,0,227,0.16)] backdrop-blur-sm transition-all duration-300 group-hover/logo:translate-y-0 group-hover/logo:opacity-100"
            >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5600e3]/10">
                    <RelIcon size={12} color="#5600e3" variant="Bold" />
                </span>
                <span className="text-[11px] font-semibold text-[#5600e3]">{t(partner.relKey)}</span>
                {/* Caret pointing down at the card */}
                <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-white/70 bg-white/95" />
            </div>

            <div className="card-shine-sweep relative flex h-[76px] w-[176px] items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white/55 px-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-sm transition-all duration-500 ease-out group-hover/logo:-translate-y-1.5 group-hover/logo:scale-[1.03] group-hover/logo:border-white group-hover/logo:bg-white/95 group-hover/logo:shadow-[0_0_0_1px_rgba(86,0,227,0.16),0_20px_44px_-12px_rgba(86,0,227,0.35),inset_0_1px_0_rgba(255,255,255,0.8)]">
                <img
                    src={partner.src}
                    alt={partner.alt}
                    loading="lazy"
                    className="relative max-h-9 w-auto max-w-[112px] object-contain opacity-50 grayscale transition-all duration-500 ease-out group-hover/logo:scale-105 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
                />
            </div>
        </div>
    );
}

function MetricCard({ metric, t, delay }: { metric: TrustMetric; t: Translate; delay: number }) {
    const Icon = metric.icon;
    return (
        <motion.div
            {...fadeUp(delay)}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/60 bg-white/50 px-4 py-7 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white hover:bg-white/90 hover:shadow-[0_20px_48px_var(--m-glow)]"
            style={{ '--m-glow': `${metric.accent}29` } as CSSProperties}
        >
            {/* Accent edge — a quiet signature at rest, confirms this figure is "live" before any hover */}
            <span
                className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: metric.accent }}
                aria-hidden
            />

            {/* Ambient accent bloom — a soft presence at rest, blooms fully on hover */}
            <div
                className="pointer-events-none absolute -right-8 -top-12 h-28 w-28 rounded-full opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: metric.accent }}
                aria-hidden
            />

            <div
                className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-110"
                style={{ background: metric.soft }}
            >
                <Icon size={22} color={metric.accent} variant="Bulk" />
            </div>

            <AnimatedCounter
                to={metric.to}
                prefix={metric.prefix}
                suffix={metric.suffix}
                duration={2.2}
                className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9b4dff] text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]"
            />
            <span className="relative mt-2 text-[13px] font-medium leading-snug text-slate-500 md:text-sm">
                {t(metric.labelKey)}
            </span>

            <span
                className="relative mt-4 h-[3px] w-8 rounded-full transition-all duration-500 ease-out group-hover:w-14"
                style={{ background: metric.accent }}
                aria-hidden
            />
        </motion.div>
    );
}

export function TrustedBy() {
    const { t } = useLanguage();
    // Doubled roster gives the -50% marquee loop a seamless wrap point.
    const track = [...PARTNERS, ...PARTNERS];

    return (
        <section id="trusted-by" className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[120px]">
            {/* Ambient, low-noise backdrop — a whisper of brand light, no map, no motion. */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute left-1/2 top-1/4 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[#5600e3]/[0.045] blur-[130px]" />
            </div>

            <div className="relative mx-auto max-w-[1300px] px-6">
                {/* ── Header ── */}
                <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
                    <motion.p {...fadeUp(0)} className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        {t('trust.eyebrow')}
                    </motion.p>
                    <motion.h2 {...fadeUp(0.06)} className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-5xl">
                        {t('trust.headline')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9b4dff]">
                            {t('trust.headlineHighlight')}
                        </span>
                    </motion.h2>
                    <motion.p {...fadeUp(0.12)} className="mt-6 text-lg leading-relaxed text-slate-500">
                        {t('trust.sub')}
                    </motion.p>
                </div>

                {/* ── Curated logo wall ── */}
                <motion.div
                    {...fadeUp(0.1)}
                    // Generous vertical padding keeps the hover tooltip inside the
                    // clip box — the row must clip horizontally to loop, so the
                    // tooltip can't rely on vertical overflow being visible.
                    className="trusted-marquee scrollbar-hide relative overflow-hidden px-1 pb-6 pt-12"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                    }}
                >
                    <div className="trusted-marquee-track flex w-max items-center gap-5 md:gap-7">
                        {track.map((partner, idx) => (
                            <LogoCard key={`${partner.alt}-${idx}`} partner={partner} t={t} />
                        ))}
                    </div>
                </motion.div>

                {/* ── Enterprise trust metrics ── */}
                <div className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-5">
                    {TRUST_METRICS.map((metric, idx) => (
                        <MetricCard key={metric.labelKey} metric={metric} t={t} delay={0.16 + idx * 0.06} />
                    ))}
                </div>
            </div>
        </section>
    );
}
