import type { TranslationKey } from '../i18n/translations';

/* ⚠️ ─────────────────────────────────────────────────────────────────────
   PLACEHOLDER METRICS — PENDING FOUNDER VERIFICATION BEFORE PRODUCTION
   Every numeric value below (metrics, before/after, series, funnel, pipeline,
   bookings) is a design placeholder. The headline stats (84+, 250K+, 98%,
   €12M+) now live only in the Trusted-by section — see TrustedBy.tsx.
   None are confirmed. Do NOT ship to production until the founder has signed
   off on each figure. While this flag is true, a dev-only banner renders in
   the section as a visible guardrail.
   ──────────────────────────────────────────────────────────────────────── */
export const METRICS_PENDING_VERIFICATION = true;

export type MetricFormat = 'number' | 'currency' | 'percent';

export type CaseMetric = {
    labelKey: TranslationKey;
    /** Baseline value before working with Ukonnect. */
    before: number;
    /** Value after the engagement. */
    after: number;
    /** Pre-formatted headline delta, e.g. "+185%". */
    delta: string;
    /** true → growth metric (purple), false → cost reduced (emerald). */
    improvement: boolean;
    format: MetricFormat;
    decimals?: number;
    /** Optional unit appended to the value, e.g. "M". */
    unit?: string;
};

export type FunnelStage = {
    labelKey: TranslationKey;
    value: number;
};

/** Which believable "live dashboard" leads the card. */
export type CardWidget = 'growth' | 'pipeline' | 'bookings';

export type PipelineStatus = 'new' | 'qualified' | 'won';

export type PipelineRow = {
    initials: string;
    /** Channel / source — proper noun, intentionally locale-agnostic. */
    source: string;
    status: PipelineStatus;
    /** Deal value in euros. */
    value: number;
};

export type BookingsData = {
    /** Appointments booked per weekday, Mon → Sun. */
    week: number[];
    /** Headline total shown counting up. */
    total: number;
};

export type CaseStudy = {
    id: string;
    clientInitials: string;
    clientColor: string;
    accentFrom: string;
    accentTo: string;
    titleKey: TranslationKey;
    industryKey: TranslationKey;
    challengeKey: TranslationKey;
    solutionKey: TranslationKey;
    outcomeKey: TranslationKey;
    quoteKey: TranslationKey;
    quoteRoleKey: TranslationKey;
    tagKeys: TranslationKey[];
    metrics: CaseMetric[];
    /** Monthly trajectory of the headline metric — drives the growth chart. */
    series: number[];
    seriesUnitKey: TranslationKey;
    funnel: FunnelStage[];
    /** Signature dashboard surfaced on the card — distinct per study so no two cards feel alike. */
    widget: CardWidget;
    pipeline?: PipelineRow[];
    bookings?: BookingsData;
};

const FUNNEL_KEYS = {
    visitors: 'caseStudies.funnel.visitors',
    leads: 'caseStudies.funnel.leads',
    qualified: 'caseStudies.funnel.qualified',
    booked: 'caseStudies.funnel.booked',
    closed: 'caseStudies.funnel.closed',
} as const satisfies Record<string, TranslationKey>;

const buildFunnel = (values: [number, number, number, number, number]): FunnelStage[] => [
    { labelKey: FUNNEL_KEYS.visitors, value: values[0] },
    { labelKey: FUNNEL_KEYS.leads, value: values[1] },
    { labelKey: FUNNEL_KEYS.qualified, value: values[2] },
    { labelKey: FUNNEL_KEYS.booked, value: values[3] },
    { labelKey: FUNNEL_KEYS.closed, value: values[4] },
];

export const CASE_STUDIES: CaseStudy[] = [
    {
        id: 'real-estate',
        clientInitials: 'VE',
        clientColor: '#5600e3',
        accentFrom: '#5600e3',
        accentTo: '#9b4dff',
        titleKey: 'caseStudies.0.title',
        industryKey: 'caseStudies.0.industry',
        challengeKey: 'caseStudies.0.challenge',
        solutionKey: 'caseStudies.0.solution',
        outcomeKey: 'caseStudies.0.outcome',
        quoteKey: 'caseStudies.0.quote',
        quoteRoleKey: 'caseStudies.0.quoteRole',
        tagKeys: [
            'caseStudies.tag.aiWorkflow',
            'caseStudies.tag.crmIntegration',
            'caseStudies.tag.marketingAutomation',
        ],
        // ⚠ placeholder values — pending founder verification before production
        metrics: [
            { labelKey: 'caseStudies.0.metric0.label', before: 62, after: 177, delta: '+185%', improvement: true, format: 'number' },
            { labelKey: 'caseStudies.0.metric1.label', before: 85, after: 49, delta: '-42%', improvement: false, format: 'currency' },
            { labelKey: 'caseStudies.0.metric2.label', before: 12, after: 20, delta: '+68%', improvement: true, format: 'percent' },
        ],
        series: [62, 78, 99, 128, 152, 177],
        seriesUnitKey: 'caseStudies.0.metric0.label',
        funnel: buildFunnel([8200, 1240, 420, 168, 54]),
        widget: 'growth',
    },
    {
        id: 'b2b-services',
        clientInitials: 'NS',
        clientColor: '#4285F4',
        accentFrom: '#4285F4',
        accentTo: '#7BA7FF',
        titleKey: 'caseStudies.1.title',
        industryKey: 'caseStudies.1.industry',
        challengeKey: 'caseStudies.1.challenge',
        solutionKey: 'caseStudies.1.solution',
        outcomeKey: 'caseStudies.1.outcome',
        quoteKey: 'caseStudies.1.quote',
        quoteRoleKey: 'caseStudies.1.quoteRole',
        tagKeys: ['caseStudies.tag.aiLeadGen', 'caseStudies.tag.paidAds', 'caseStudies.tag.crmSync'],
        // ⚠ placeholder values — pending founder verification before production
        metrics: [
            { labelKey: 'caseStudies.1.metric0.label', before: 22, after: 53, delta: '+142%', improvement: true, format: 'number' },
            { labelKey: 'caseStudies.1.metric1.label', before: 120, after: 74, delta: '-38%', improvement: false, format: 'currency' },
            { labelKey: 'caseStudies.1.metric2.label', before: 18, after: 28, delta: '+55%', improvement: true, format: 'percent' },
        ],
        series: [22, 28, 35, 41, 48, 53],
        seriesUnitKey: 'caseStudies.1.metric0.label',
        funnel: buildFunnel([5400, 760, 310, 142, 40]),
        widget: 'pipeline',
        pipeline: [
            { initials: 'JM', source: 'LinkedIn Ads', status: 'won', value: 18400 },
            { initials: 'SK', source: 'Google Ads', status: 'qualified', value: 12750 },
            { initials: 'RB', source: 'Referral', status: 'qualified', value: 9300 },
            { initials: 'AV', source: 'Website', status: 'new', value: 6100 },
        ],
    },
    {
        id: 'property-dev',
        clientInitials: 'PD',
        clientColor: '#34A853',
        accentFrom: '#34A853',
        accentTo: '#6DD58C',
        titleKey: 'caseStudies.2.title',
        industryKey: 'caseStudies.2.industry',
        challengeKey: 'caseStudies.2.challenge',
        solutionKey: 'caseStudies.2.solution',
        outcomeKey: 'caseStudies.2.outcome',
        quoteKey: 'caseStudies.2.quote',
        quoteRoleKey: 'caseStudies.2.quoteRole',
        tagKeys: [
            'caseStudies.tag.conversionFunnel',
            'caseStudies.tag.aiQualification',
            'caseStudies.tag.automation',
        ],
        // ⚠ placeholder values — pending founder verification before production
        metrics: [
            { labelKey: 'caseStudies.2.metric0.label', before: 40, after: 124, delta: '+210%', improvement: true, format: 'number' },
            { labelKey: 'caseStudies.2.metric1.label', before: 310, after: 201, delta: '-35%', improvement: false, format: 'currency' },
            { labelKey: 'caseStudies.2.metric2.label', before: 1.4, after: 2.4, delta: '+72%', improvement: true, format: 'currency', decimals: 1, unit: 'M' },
        ],
        series: [40, 55, 74, 96, 112, 124],
        seriesUnitKey: 'caseStudies.2.metric0.label',
        funnel: buildFunnel([12500, 1680, 540, 196, 61]),
        widget: 'bookings',
        bookings: { week: [3, 5, 4, 6, 5, 2, 1], total: 124 },
    },
];

/** Locale-agnostic value formatter shared across every metric surface. */
export function formatMetricValue(value: number, metric: Pick<CaseMetric, 'format' | 'decimals' | 'unit'>): string {
    const decimals = metric.decimals ?? 0;
    const number = value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
    switch (metric.format) {
        case 'currency':
            return `€${number}${metric.unit ?? ''}`;
        case 'percent':
            return `${number}${metric.unit ?? ''}%`;
        default:
            return `${number}${metric.unit ?? ''}`;
    }
}
