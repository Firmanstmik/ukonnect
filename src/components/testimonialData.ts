/**
 * Data for the "Verified Proof" customer-success section.
 *
 * These are REAL, named Google reviewers — the human, verified evidence that
 * backs the (anonymized) Case Studies section above. The review bodies live in
 * translations.ts as `testimonials.{i}.body`; only meta + framing lives here.
 *
 * ⚠️  Every NUMERIC business result below (featured metrics, growth series, the
 *     per-card result highlight) is a DESIGN PLACEHOLDER. Because these figures
 *     sit next to real client names, they must be founder-verified before they
 *     ship. While the flag is true a dev-only banner renders as a guardrail —
 *     the same convention used by caseStudyData. See MEMORY: case-study metrics
 *     are intentional placeholders pending verification.
 */
import type { TranslationKey } from '../i18n/translations';

export const TESTIMONIAL_METRICS_PENDING_VERIFICATION = true;

/** Site-system brand gradient — used for featured accents so it matches Hero / Case Studies. */
export const BRAND_FROM = '#5600e3';
export const BRAND_TO = '#9b4dff';

/** A real, named reviewer surfaced as a compact "Verified by Google" proof card. */
export interface VerifiedReview {
    name: string;
    initials: string;
    /** Google brand colour for the avatar chip. */
    color: string;
    /** Real Google review copy. */
    bodyKey: TranslationKey;
    industryKey: TranslationKey;
    /** Services delivered — reuses the localized `trust.rel.*` labels. */
    services: TranslationKey[];
    /** ⚠ placeholder headline result — locale-agnostic string. */
    resultValue: string;
    resultLabelKey: TranslationKey;
}

/** One reviewer promoted to a large editorial spotlight with a mini dashboard. */
export interface FeaturedStory {
    name: string;
    initials: string;
    color: string;
    quoteKey: TranslationKey;
    industryKey: TranslationKey;
    services: TranslationKey[];
    outcomeKey: TranslationKey;
    /** ⚠ placeholder trajectory driving the growth chart. */
    series: number[];
    growthDelta: string;
    /** ⚠ placeholder animated KPIs. */
    metrics: {
        to: number;
        prefix?: string;
        suffix?: string;
        decimals?: number;
        labelKey: TranslationKey;
    }[];
}

/* Reviewer roster (names + brand colours) mirrors the real Google reviews. */

export const FEATURED_STORY: FeaturedStory = {
    name: 'Emin Karadas',
    initials: 'EK',
    color: '#34A853',
    quoteKey: 'testimonials.2.body',
    industryKey: 'testimonials.ind.b2b',
    services: ['trust.rel.leadgen', 'trust.rel.aiAutomation', 'trust.rel.crm'],
    outcomeKey: 'testimonials.featured.outcome',
    series: [40, 58, 79, 104, 132, 168],
    growthDelta: '+184%',
    metrics: [
        { to: 184, prefix: '+', suffix: '%', labelKey: 'testimonials.res.leads' },
        { to: 3.2, suffix: '×', decimals: 1, labelKey: 'testimonials.res.roas' },
        { to: 2.4, prefix: '€', suffix: 'M', decimals: 1, labelKey: 'testimonials.res.pipeline' },
    ],
};

export const VERIFIED_REVIEWS: VerifiedReview[] = [
    {
        name: 'S. Kijkduin',
        initials: 'SK',
        color: '#4285F4',
        bodyKey: 'testimonials.0.body',
        industryKey: 'testimonials.ind.realEstate',
        services: ['trust.rel.webTransform', 'trust.rel.googleAds'],
        resultValue: '+38%',
        resultLabelKey: 'testimonials.res.conversion',
    },
    {
        name: 'Roxanne de Jong',
        initials: 'RJ',
        color: '#EA4335',
        bodyKey: 'testimonials.1.body',
        industryKey: 'testimonials.ind.brokerage',
        services: ['trust.rel.leadgen', 'trust.rel.googleAds', 'trust.rel.metaAds'],
        resultValue: '3.1×',
        resultLabelKey: 'testimonials.res.leads',
    },
    {
        name: 'Mikael Swaria',
        initials: 'MS',
        color: '#FBBC05',
        bodyKey: 'testimonials.3.body',
        industryKey: 'testimonials.ind.realEstate',
        services: ['trust.rel.leadgen', 'trust.rel.webTransform'],
        resultValue: '+64%',
        resultLabelKey: 'testimonials.res.bookings',
    },
    {
        name: 'Puya Sarmidani',
        initials: 'PS',
        color: '#4285F4',
        bodyKey: 'testimonials.4.body',
        industryKey: 'testimonials.ind.propertyDev',
        services: ['trust.rel.aiAutomation', 'trust.rel.crm', 'trust.rel.leadgen'],
        resultValue: '+120%',
        resultLabelKey: 'testimonials.res.growth',
    },
    {
        name: 'Tijn Drieshen',
        initials: 'TD',
        color: '#EA4335',
        bodyKey: 'testimonials.5.body',
        industryKey: 'testimonials.ind.realEstate',
        services: ['trust.rel.webTransform', 'trust.rel.leadgen', 'trust.rel.googleAds'],
        resultValue: '<5 min',
        resultLabelKey: 'testimonials.res.response',
    },
];
