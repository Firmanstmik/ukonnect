/**
 * Testimonials — reframed as a "Verified Proof" customer-success layer.
 *
 * Where Case Studies tells the anonymized, in-depth transformation stories,
 * this section is the *human, verified* counterpart: real, named Google
 * reviewers stand as evidence that those results are real.
 *
 *   1. Header + Google trust bar   — "these are verified by Google".
 *   2. Featured success spotlight  — one client, editorial layout, a mini
 *                                    growth dashboard + animated KPIs, and the
 *                                    verified review as supporting evidence.
 *                                    Its CTA hands off to the Case Studies
 *                                    transformations so the two sections tie
 *                                    together instead of repeating each other.
 *   3. Verified proof grid         — the remaining named reviews as compact
 *                                    cards: client, industry, services used,
 *                                    a headline result, and the Google review.
 *
 * ⚠ All numeric results are design placeholders — see testimonialData.ts. A
 *   dev-only banner guards them, mirroring the Case Studies convention.
 */
import { motion } from 'framer-motion';
import { ArrowRight, Info, Sparkles, TrendingUp, TriangleAlert } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Translate } from '../i18n/translations';
import { EASE_OUT } from './motion';
import { AnimatedCounter } from './AnimatedCounter';
import { GoogleG, GoogleStars, GrowthChart } from './CaseStudyWidgets';
import {
    BRAND_FROM,
    BRAND_TO,
    FEATURED_STORY,
    TESTIMONIAL_METRICS_PENDING_VERIFICATION,
    VERIFIED_REVIEWS,
    type FeaturedStory,
    type VerifiedReview,
} from './testimonialData';

const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: EASE_OUT },
    }),
};

/* ── Small shared pieces ──────────────────────────────────────── */

function ServiceChips({ services, t }: { services: VerifiedReview['services']; t: Translate }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {services.map((key) => (
                <span
                    key={key}
                    className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1 text-[10px] font-semibold tracking-tight text-slate-500 shadow-sm"
                >
                    {t(key)}
                </span>
            ))}
        </div>
    );
}

function IndustryChip({ industryKey, t }: { industryKey: VerifiedReview['industryKey']; t: Translate }) {
    return (
        <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm backdrop-blur-sm">
            {t(industryKey)}
        </span>
    );
}

/* ── Featured success spotlight ───────────────────────────────── */

function FeaturedSpotlight({ story, t }: { story: FeaturedStory; t: Translate }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: EASE_OUT }}
            className="group relative"
        >
            {/* Gradient ring that intensifies on hover */}
            <div className="absolute -inset-[1px] rounded-[2.25rem] bg-gradient-to-br from-primary/25 via-[#9b4dff]/15 to-primary/10 opacity-60 blur-[0.5px] transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-slate-200/60 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 -translate-y-1/3 translate-x-1/4 rounded-full bg-gradient-to-bl from-primary/8 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-[#9b4dff]/8 to-transparent" />

                <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-14">
                    {/* ── Left: editorial quote + author + services + CTA ── */}
                    <div className="flex flex-col">
                        <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.05] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                            {t('testimonials.featured.eyebrow')}
                        </span>

                        <blockquote className="text-xl font-medium leading-[1.5] tracking-tight text-slate-800 md:text-2xl lg:text-[1.7rem]">
                            &ldquo;{t(story.quoteKey)}&rdquo;
                        </blockquote>

                        {/* Author + verified */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <div
                                className="flex items-center justify-center rounded-2xl text-base font-bold text-white shadow-md ring-2 ring-white"
                                style={{ height: 52, width: 52, background: `linear-gradient(135deg, ${story.color}, ${story.color}cc)` }}
                            >
                                {story.initials}
                            </div>
                            <div className="min-w-0">
                                <p className="text-base font-bold tracking-tight text-slate-900">{story.name}</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <GoogleG className="h-3.5 w-3.5" />
                                    <span className="text-xs font-medium text-slate-500">{t(story.industryKey)}</span>
                                </div>
                            </div>
                            <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-2 shadow-sm">
                                <GoogleStars delay={0.4} />
                                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                    {t('testimonials.verified')}
                                </span>
                            </div>
                        </div>

                        {/* Services used */}
                        <div className="mt-7">
                            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                                {t('testimonials.servicesLabel')}
                            </p>
                            <ServiceChips services={story.services} t={t} />
                        </div>

                        {/* Outcome + CTA pinned to the bottom */}
                        <div className="mt-8 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-8">
                            <div className="inline-flex items-center gap-2.5 rounded-2xl border border-primary/15 bg-primary/[0.04] px-4 py-2.5">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <span className="text-sm font-semibold text-primary">{t('testimonials.featured.outcome')}</span>
                            </div>
                            <a
                                href="#case-studies"
                                className="group/cta inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                            >
                                {t('testimonials.viewTransformation')}
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                            </a>
                        </div>
                    </div>

                    {/* ── Right: mini dashboard + animated KPIs ── */}
                    <div className="rounded-[1.75rem] border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/70 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-24px_rgba(15,23,42,0.16)] md:p-7">
                        <GrowthChart
                            series={story.series}
                            accentFrom={BRAND_FROM}
                            accentTo={BRAND_TO}
                            delta={story.growthDelta}
                            caption={t('caseStudies.growth.caption')}
                            height={132}
                        />

                        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
                            {story.metrics.map((m, i) => (
                                <motion.div
                                    key={m.labelKey}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE_OUT }}
                                    className="text-center"
                                >
                                    <p className="bg-gradient-to-r from-[#5600e3] to-[#9b4dff] bg-clip-text text-xl font-bold leading-none tracking-tight text-transparent tabular-nums md:text-2xl">
                                        <AnimatedCounter
                                            to={m.to}
                                            prefix={m.prefix}
                                            suffix={m.suffix}
                                            decimals={m.decimals ?? 0}
                                            duration={1.8}
                                        />
                                    </p>
                                    <p className="mt-2 text-[11px] font-medium leading-tight text-slate-500">{t(m.labelKey)}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-sm">
                            <div className="flex items-center gap-2">
                                <GoogleG className="h-4 w-4" />
                                <GoogleStars delay={0.5} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                {t('caseStudies.featured.googleBadge')}
                            </span>
                        </div>

                        <p className="mt-3 flex items-center gap-1.5 text-[11px] font-normal text-slate-400">
                            <Info className="h-3 w-3 shrink-0" aria-hidden />
                            {t('caseStudies.illustrative')}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Compact verified proof card ──────────────────────────────── */

function VerifiedCard({ review, t }: { review: VerifiedReview; t: Translate }) {
    return (
        <article className="group relative h-full">
            {/* Soft brand glow, hover only */}
            <div className="pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-[#9b4dff]/10 opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-slate-300 group-hover:shadow-[0_2px_6px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(15,23,42,0.18)]">
                {/* Top accent wash */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-60"
                    style={{ background: `linear-gradient(135deg, ${BRAND_FROM}0d 0%, transparent 65%)` }}
                />

                {/* Header */}
                <div className="relative mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm ring-2 ring-white"
                            style={{ backgroundColor: review.color }}
                        >
                            {review.initials}
                        </div>
                        <div>
                            <p className="text-sm font-bold leading-tight tracking-tight text-slate-900">{review.name}</p>
                            <div className="mt-1">
                                <GoogleStars size="w-3 h-3" delay={0.2} />
                            </div>
                        </div>
                    </div>
                    <IndustryChip industryKey={review.industryKey} t={t} />
                </div>

                {/* Verified Google review — supporting evidence */}
                <p className="relative mb-5 flex-1 text-[13px] leading-relaxed text-slate-600">
                    &ldquo;{t(review.bodyKey)}&rdquo;
                </p>

                {/* Services used */}
                <div className="mb-5">
                    <ServiceChips services={review.services} t={t} />
                </div>

                {/* Footer: headline result + Google verified */}
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <div>
                        <p className="bg-gradient-to-r from-[#5600e3] to-[#9b4dff] bg-clip-text text-lg font-bold leading-none tracking-tight text-transparent tabular-nums">
                            {review.resultValue}
                        </p>
                        <p className="mt-1 text-[11px] font-medium leading-tight text-slate-400">{t(review.resultLabelKey)}</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-2.5 py-1.5 shadow-sm">
                        <GoogleG className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                            {t('testimonials.verified')}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}

/* ── Living proof marquee ─────────────────────────────────────────
   The verified cards drift as an infinite, pausable row. Two of these
   stacked (one reversed) make the "wall of proof" feel alive without
   ever demanding a click. Duplicated cards are aria-hidden so the loop
   stays seamless without doubling up for screen readers. */
const PROOF_MARQUEE_MASK = 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)';

function ProofMarquee({
    reviews,
    t,
    reverse = false,
    duration = 64,
}: {
    reviews: VerifiedReview[];
    t: Translate;
    reverse?: boolean;
    duration?: number;
}) {
    // Doubled roster gives the -50% loop a seamless wrap point.
    const track = [...reviews, ...reviews];
    return (
        <div
            className="testimonial-marquee scrollbar-hide relative overflow-hidden py-3"
            style={{
                maskImage: PROOF_MARQUEE_MASK,
                WebkitMaskImage: PROOF_MARQUEE_MASK,
                ['--testimonial-marquee-duration' as string]: `${duration}s`,
            }}
        >
            <div
                className={`testimonial-marquee-track flex w-max items-stretch gap-5 md:gap-6 ${
                    reverse ? 'testimonial-marquee-track--reverse' : ''
                }`}
            >
                {track.map((review, idx) => (
                    <div
                        key={`${review.name}-${idx}`}
                        className="w-[300px] shrink-0 sm:w-[330px]"
                        aria-hidden={idx >= reviews.length}
                    >
                        <VerifiedCard review={review} t={t} />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Section ──────────────────────────────────────────────────── */

export const Testimonials = () => {
    const { t } = useLanguage();

    return (
        <section id="testimonials" className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[120px]">
            {/* Ambient background — matches Case Studies for a seamless flow */}
            <div className="pointer-events-none absolute inset-0 case-studies-dot-grid opacity-[0.25]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-full max-w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/[0.04] to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-24 h-[460px] w-[460px] rounded-full bg-[#9b4dff]/[0.05] blur-[150px]" />

            <div className="relative mx-auto max-w-[1300px] px-6">
                {/* Dev-only guardrail: placeholder metrics must be verified before shipping. */}
                {import.meta.env.DEV && TESTIMONIAL_METRICS_PENDING_VERIFICATION && (
                    <div className="mx-auto mb-10 flex max-w-2xl items-center justify-center gap-2 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-2.5 text-center text-xs font-semibold text-amber-700">
                        <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                        Placeholder result metrics — pending founder verification before production.
                    </div>
                )}

                {/* ── Header ── */}
                <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary"
                    >
                        {t('testimonials.label')}
                    </motion.div>

                    <motion.h2
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mb-6 text-balance text-3xl font-bold leading-[1.12] tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
                    >
                        {t('testimonials.headingPre')}
                        <span className="bg-gradient-to-r from-[#5600e3] to-[#9b4dff] bg-clip-text text-transparent">
                            {t('testimonials.headingHighlight')}
                        </span>
                        {t('testimonials.headingPost')}
                    </motion.h2>

                    <motion.p
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mx-auto max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
                    >
                        {t('testimonials.sub')}
                    </motion.p>

                    {/* Google trust bar */}
                    <motion.div
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mx-auto mt-7 inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur-sm"
                    >
                        <GoogleG className="h-4 w-4" />
                        <GoogleStars delay={0.3} />
                        <span className="text-xs font-semibold text-slate-600">{t('testimonials.trustbar')}</span>
                    </motion.div>
                </div>

                {/* ── Featured spotlight ── */}
                <FeaturedSpotlight story={FEATURED_STORY} t={t} />

                {/* ── Verified proof — infinite living wall ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                    className="mt-6 space-y-5 md:mt-10 md:space-y-6"
                >
                    <ProofMarquee reviews={VERIFIED_REVIEWS} t={t} duration={64} />
                    <ProofMarquee reviews={[...VERIFIED_REVIEWS].reverse()} t={t} reverse duration={78} />
                </motion.div>
            </div>
        </section>
    );
};
