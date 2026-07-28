/**
 * Testimonials — waterfall proof wall (elevated from jouwdroomoverkapping pattern).
 *
 * Desktop: left column scrolls UP, right scrolls DOWN, soft fade masks,
 * dark Google trust pillar in the center. Mobile: horizontal marquee + stats.
 * Brand: UKONNECT cyan/violet — not a 1:1 clone of the orange/navy reference.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { Check, MapPin, Quote, ThumbsUp, TriangleAlert, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Translate } from '../i18n/translations';
import { EASE_OUT } from './motion';
import { SectionTitle } from './SectionHeadingAccent';
import { AnimatedCounter } from './AnimatedCounter';
import { GoogleG, GoogleStars } from './CaseStudyWidgets';
import {
    FEATURED_STORY,
    TESTIMONIAL_METRICS_PENDING_VERIFICATION,
    VERIFIED_REVIEWS,
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

type ProofCard = VerifiedReview & { featured?: boolean };

const FEATURED_CARD: ProofCard = {
    name: FEATURED_STORY.name,
    initials: FEATURED_STORY.initials,
    color: FEATURED_STORY.color,
    bodyKey: FEATURED_STORY.quoteKey,
    industryKey: FEATURED_STORY.industryKey,
    services: FEATURED_STORY.services,
    resultValue: FEATURED_STORY.growthDelta,
    resultLabelKey: 'testimonials.res.leads',
    featured: true,
};

/** Real Google reviews — reused in interleaved order so the wall feels dense (like the reference). */
const ALL_CARDS: ProofCard[] = [
    VERIFIED_REVIEWS[0],
    VERIFIED_REVIEWS[1],
    FEATURED_CARD,
    VERIFIED_REVIEWS[2],
    VERIFIED_REVIEWS[3],
    VERIFIED_REVIEWS[4],
];

/** Build a long column roster so many cards are always in motion. */
function densify(order: ProofCard[], cycles = 2): ProofCard[] {
    const out: ProofCard[] = [];
    for (let i = 0; i < cycles; i++) out.push(...order);
    return out;
}

/** Left column — scrolls upward. */
const LEFT_ROSTER = densify(
    [
        ALL_CARDS[0],
        ALL_CARDS[1],
        ALL_CARDS[3],
        ALL_CARDS[4],
        ALL_CARDS[2],
        ALL_CARDS[5],
        ALL_CARDS[1],
        ALL_CARDS[0],
        ALL_CARDS[4],
        ALL_CARDS[3],
    ],
    1,
);

/** Right column — scrolls downward (different order so sides never sync). */
const RIGHT_ROSTER = densify(
    [
        ALL_CARDS[2],
        ALL_CARDS[5],
        ALL_CARDS[1],
        ALL_CARDS[0],
        ALL_CARDS[4],
        ALL_CARDS[3],
        ALL_CARDS[5],
        ALL_CARDS[2],
        ALL_CARDS[0],
        ALL_CARDS[1],
    ],
    1,
);

function ReviewCard({ review, t }: { review: ProofCard; t: Translate }) {
    return (
        <article className="uk-rev-card group relative w-full shrink-0 overflow-hidden rounded-[1.15rem] border border-white/80 bg-white/90 p-5 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-[10px] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-1 hover:border-[#5600e3]/20 hover:shadow-[0_18px_48px_rgba(86,0,227,0.12)] sm:p-[22px]">
            {/* Brand edge reveal on hover */}
            <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-gradient-to-b from-[#00d4e8] via-[#5600e3] to-transparent opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100"
                aria-hidden
            />

            <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-md bg-[#5600e3]/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[#5600e3]">
                    {t(review.industryKey)}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5600e3]/15 to-[#00d4e8]/10 text-[#5600e3] transition-all duration-300 group-hover:rotate-[-8deg] group-hover:from-[#5600e3] group-hover:to-[#00d4e8] group-hover:text-white">
                    <Quote className="h-3.5 w-3.5" aria-hidden />
                </div>
            </div>

            <div className="mb-3">
                <GoogleStars size="w-3.5 h-3.5" delay={0.1} />
            </div>

            <p className="mb-4 line-clamp-3 text-[14px] leading-[1.65] text-slate-600">
                &ldquo;{t(review.bodyKey)}&rdquo;
            </p>

            <div className="flex items-center gap-3 border-t border-slate-900/[0.06] pt-3.5">
                <div
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{
                        background: `linear-gradient(135deg, ${review.color}, ${review.color}b3)`,
                        boxShadow: `0 6px 16px ${review.color}40`,
                    }}
                >
                    {review.initials}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold tracking-tight text-slate-900">{review.name}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                        <span className="truncate">{t('testimonials.verified')}</span>
                        {review.featured ? (
                            <span className="ml-1 rounded-full border border-[#00d4e8]/25 bg-[#00d4e8]/10 px-1.5 py-px font-mono text-[8px] font-bold uppercase tracking-wider text-[#0891b2]">
                                {t('testimonials.featured.badge')}
                            </span>
                        ) : null}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                    <span className="bg-gradient-to-r from-[#5600e3] to-[#00d4e8] bg-clip-text text-xs font-bold tabular-nums text-transparent">
                        {review.resultValue}
                    </span>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-emerald-400 text-white shadow-sm">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                </div>
            </div>
        </article>
    );
}

function WaterfallColumn({
    reviews,
    /** Visual direction: left = up, right = down (matches jouwdroomoverkapping). */
    direction,
    t,
}: {
    reviews: ProofCard[];
    direction: 'up' | 'down';
    t: Translate;
}) {
    // Double the roster for a seamless -50% CSS loop.
    const track = [...reviews, ...reviews];
    return (
        <div className="uk-rev-col relative h-[560px] overflow-hidden">
            <div
                className={`uk-rev-col-track flex flex-col gap-5 ${
                    direction === 'up' ? 'uk-rev-col-track--up' : 'uk-rev-col-track--down'
                }`}
            >
                {track.map((review, idx) => (
                    <div key={`${review.name}-${direction}-${idx}`} aria-hidden={idx >= reviews.length}>
                        <ReviewCard review={review} t={t} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function TrustPillar({ t }: { t: Translate }) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: EASE_OUT }}
            className="relative mx-auto w-full max-w-[300px] lg:max-w-none"
        >
            <div
                className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-80 blur-2xl"
                style={{
                    background:
                        'radial-gradient(circle at 50% 30%, rgba(86,0,227,0.32), transparent 55%), radial-gradient(circle at 50% 85%, rgba(0,212,232,0.18), transparent 50%)',
                }}
                aria-hidden
            />

            <div className="relative flex h-full flex-col items-center gap-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1020] px-6 py-8 text-white shadow-[0_20px_60px_rgba(8,13,25,0.45)] sm:px-7 sm:py-9 lg:min-h-[560px] lg:justify-center">
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 40% 20%, rgba(86,0,227,0.4), transparent 45%), radial-gradient(circle at 80% 75%, rgba(0,212,232,0.2), transparent 42%)',
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-25"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                            backgroundSize: '22px 22px',
                        }}
                    />
                </div>

                <div className="relative flex w-full flex-col items-center gap-6">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">
                        {t('testimonials.pillar.eyebrow')}
                    </p>

                    <div className="relative grid h-[140px] w-[140px] place-items-center">
                        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
                            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                            <motion.circle
                                cx="60"
                                cy="60"
                                r="54"
                                fill="none"
                                stroke="url(#uk-rev-ring)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 54}`}
                                initial={reduce ? false : { strokeDashoffset: 2 * Math.PI * 54 }}
                                whileInView={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - 0.98) }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: EASE_OUT, delay: 0.15 }}
                            />
                            <defs>
                                <linearGradient id="uk-rev-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00D4E8" />
                                    <stop offset="50%" stopColor="#6C30FF" />
                                    <stop offset="100%" stopColor="#9B4DFF" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="text-center">
                            <p className="text-[32px] font-extrabold leading-none tracking-tight text-white">4.9</p>
                            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                                {t('testimonials.pillar.ofFive')}
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-2.5">
                        <div className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3.5 py-2.5 transition-colors hover:bg-white/[0.12]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4e8]/15 text-[#00d4e8]">
                                <Users className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-lg font-extrabold leading-none tabular-nums">
                                    <AnimatedCounter to={150} suffix="+" duration={1.5} />
                                </p>
                                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/45">
                                    {t('testimonials.pillar.reviews')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3.5 py-2.5 transition-colors hover:bg-white/[0.12]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9b4dff]/20 text-[#c4b5fd]">
                                <ThumbsUp className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-lg font-extrabold leading-none tabular-nums">
                                    <AnimatedCounter to={98} suffix="%" duration={1.5} />
                                </p>
                                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/45">
                                    {t('testimonials.pillar.recommend')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 transition-colors hover:bg-white/[0.18]">
                        <GoogleG className="h-5 w-5" />
                        <GoogleStars delay={0.35} />
                        <span className="text-xs font-semibold text-white/80">{t('testimonials.pillar.google')}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function MobileStats({ t }: { t: Translate }) {
    return (
        <div className="mb-7 flex flex-wrap items-center justify-center gap-2 lg:hidden">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <span className="bg-gradient-to-r from-[#5600e3] to-[#00d4e8] bg-clip-text text-lg font-extrabold text-transparent">
                    4.9/5
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {t('testimonials.pillar.ofFive')}
                </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <Users className="h-4 w-4 text-[#5600e3]" />
                <span className="text-sm font-extrabold text-slate-900">150+</span>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {t('testimonials.pillar.reviews')}
                </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <ThumbsUp className="h-4 w-4 text-[#5600e3]" />
                <span className="text-sm font-extrabold text-slate-900">98%</span>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {t('testimonials.pillar.recommend')}
                </span>
            </div>
        </div>
    );
}

function MobileMarquee({ t }: { t: Translate }) {
    // Dense horizontal wall — same reviews interleaved twice, then doubled for the loop.
    const roster = densify(ALL_CARDS, 2);
    const track = [...roster, ...roster];
    return (
        <div className="uk-rev-marquee relative overflow-hidden lg:hidden">
            <div className="uk-rev-marquee-track flex w-max gap-5">
                {track.map((review, idx) => (
                    <div
                        key={`${review.name}-m-${idx}`}
                        className="w-[300px] shrink-0 sm:w-[320px]"
                        aria-hidden={idx >= roster.length}
                    >
                        <ReviewCard review={review} t={t} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export const Testimonials = () => {
    const { t } = useLanguage();

    return (
        <section id="testimonials" className="uk-rev relative overflow-hidden py-[60px] md:py-[80px] lg:py-[100px]">
            <div className="pointer-events-none absolute inset-0 case-studies-dot-grid opacity-[0.3]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-full max-w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/[0.05] to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-16 h-[360px] w-[360px] rounded-full bg-[#00d4e8]/[0.04] blur-[140px]" />
            <div className="pointer-events-none absolute -right-40 top-32 h-[400px] w-[400px] rounded-full bg-[#9b4dff]/[0.055] blur-[150px]" />

            {/* Soft architectural guides */}
            <div className="pointer-events-none absolute inset-y-0 left-[6%] hidden w-px bg-gradient-to-b from-transparent via-[#5600e3]/10 to-transparent lg:block" />
            <div className="pointer-events-none absolute inset-y-0 right-[6%] hidden w-px bg-gradient-to-b from-transparent via-[#00d4e8]/10 to-transparent lg:block" />

            <div className="relative z-[2] mx-auto max-w-[1300px] px-6">
                {import.meta.env.DEV && TESTIMONIAL_METRICS_PENDING_VERIFICATION && (
                    <div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-2 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-2.5 text-center text-xs font-semibold text-amber-700">
                        <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                        Placeholder result metrics. Pending founder verification before production.
                    </div>
                )}

                <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="uk-rev-eyebrow relative mb-4 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#5600e3]/15 bg-[#5600e3]/[0.06] py-2.5 pl-3.5 pr-5"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#00d4e8] to-[#5600e3]" />
                        <span className="h-4 w-px bg-[#5600e3]/20" aria-hidden />
                        <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#5600e3]">
                            {t('testimonials.label')}
                        </span>
                    </motion.div>

                    <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={headerVariants}>
                        <SectionTitle
                            highlight={t('testimonials.headingHighlight')}
                            post={t('testimonials.headingPost')}
                            className="mb-4"
                            highlightBlock
                        />
                    </motion.div>

                    <motion.p
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mx-auto max-w-xl text-base leading-relaxed text-slate-500 md:text-lg"
                    >
                        {t('testimonials.sub')}
                    </motion.p>
                </div>

                {/* Mobile stats + horizontal fade marquee */}
                <MobileStats t={t} />
                <MobileMarquee t={t} />

                {/* Desktop waterfall: left ↑ / right ↓ — auto infinite with fade masks */}
                <div className="relative hidden grid-cols-[1fr_280px_1fr] items-stretch gap-7 lg:grid">
                    <WaterfallColumn reviews={LEFT_ROSTER} direction="up" t={t} />
                    <TrustPillar t={t} />
                    <WaterfallColumn reviews={RIGHT_ROSTER} direction="down" t={t} />
                </div>
            </div>
        </section>
    );
};
