import type { TranslationKey } from '../../i18n/translations';

/** Shared cinematic stage coordinate system. */
export const CANVAS = { w: 1000, h: 800 } as const;
export const TEAM_ORIGIN = { x: 500, y: 518 } as const;

export type BrandKey =
    | 'notion'
    | 'slack'
    | 'meta'
    | 'googleAds'
    | 'wordpress'
    | 'analytics'
    | 'hubspot'
    | 'zapier'
    | 'openai'
    | 'claude'
    | 'gemini'
    | 'calendar'
    | 'meet'
    | 'whatsapp'
    | 'stripe'
    | 'googleBusiness';

export type WorkflowNode = {
    id:
        | 'strategy'
        | 'metaAds'
        | 'googleAds'
        | 'landingPage'
        | 'website'
        | 'crm'
        | 'automation'
        | 'appointment'
        | 'sales'
        | 'revenue'
        | 'clientSuccess';
    step: string;
    labelKey: TranslationKey;
    x: number;
    y: number;
    progress: number;
    brands: BrandKey[];
};

/**
 * Human Strategy origin (behind team) → every operating system →
 * client success → trust destination → scroll handoff.
 * Control points stay organic — slight asymmetry, never mechanical.
 */
export const WORKFLOW_PATH =
    'M 500 518 C 428 556 328 582 244 554 C 210 528 183 490 168 453 C 124 400 116 358 134 328 C 149 268 176 228 219 204 C 267 164 314 143 359 144 C 418 144 469 131 526 134 C 592 137 648 152 692 174 C 760 200 806 233 832 269 C 856 312 862 362 851 409 C 841 472 821 518 789 544 C 756 582 708 614 648 634 C 592 670 546 708 500 738';

/** Foreground segment creates a single controlled depth crossing. */
export const WORKFLOW_FRONT_PATH =
    'M 832 269 C 856 312 862 362 851 409 C 841 472 821 518 789 544';

/** Soft organic drift — never more than ~0.5° / a few px. */
export type NodeDrift = { rotate: number; dy: number; amp: number; duration: number };

export const NODE_DRIFT: Record<WorkflowNode['id'], NodeDrift> = {
    strategy: { rotate: -0.45, dy: 2, amp: 5, duration: 7.8 },
    metaAds: { rotate: 0.4, dy: -1, amp: 6, duration: 6.6 },
    googleAds: { rotate: -0.35, dy: 1, amp: 4, duration: 8.1 },
    landingPage: { rotate: 0.5, dy: -2, amp: 7, duration: 7.0 },
    website: { rotate: -0.25, dy: 0, amp: 5, duration: 7.5 },
    crm: { rotate: 0.3, dy: 1, amp: 6, duration: 6.9 },
    automation: { rotate: -0.5, dy: -1, amp: 8, duration: 8.4 },
    appointment: { rotate: 0.35, dy: 2, amp: 5, duration: 7.2 },
    sales: { rotate: -0.4, dy: -2, amp: 6, duration: 6.4 },
    revenue: { rotate: 0.45, dy: 1, amp: 7, duration: 7.9 },
    clientSuccess: { rotate: -0.3, dy: 0, amp: 4, duration: 8.0 },
};

export const WORKFLOW_NODES: WorkflowNode[] = [
    { id: 'strategy', step: '01', labelKey: 'hero.workflow.strategy.label', x: 244, y: 554, progress: 0.10, brands: ['notion', 'slack'] },
    { id: 'metaAds', step: '02', labelKey: 'hero.workflow.metaAds.label', x: 168, y: 453, progress: 0.20, brands: ['meta'] },
    { id: 'googleAds', step: '03', labelKey: 'hero.workflow.googleAds.label', x: 134, y: 328, progress: 0.29, brands: ['googleAds'] },
    { id: 'landingPage', step: '04', labelKey: 'hero.workflow.landingPage.label', x: 219, y: 204, progress: 0.38, brands: ['wordpress'] },
    { id: 'website', step: '05', labelKey: 'hero.workflow.website.label', x: 359, y: 144, progress: 0.47, brands: ['wordpress', 'analytics'] },
    { id: 'crm', step: '06', labelKey: 'hero.workflow.crm.label', x: 526, y: 134, progress: 0.55, brands: ['hubspot'] },
    { id: 'automation', step: '07', labelKey: 'hero.workflow.automation.label', x: 692, y: 174, progress: 0.64, brands: ['zapier', 'openai', 'claude', 'gemini'] },
    { id: 'appointment', step: '08', labelKey: 'hero.workflow.appointment.label', x: 832, y: 269, progress: 0.73, brands: ['calendar'] },
    { id: 'sales', step: '09', labelKey: 'hero.workflow.sales.label', x: 851, y: 409, progress: 0.81, brands: ['whatsapp', 'meet'] },
    { id: 'revenue', step: '10', labelKey: 'hero.workflow.revenue.label', x: 789, y: 544, progress: 0.89, brands: ['stripe', 'analytics'] },
    { id: 'clientSuccess', step: '11', labelKey: 'hero.workflow.clientSuccess.label', x: 648, y: 634, progress: 0.96, brands: ['googleBusiness', 'slack'] },
];

/** Continues past the canvas into the trust / next-section journey. */
export const HANDOFF_PATH = 'M 500 738 C 500 762 500 786 500 820';

export function pct(value: number, total: number) {
    return `${(value / total) * 100}%`;
}

export const HERO_EASE = [0.22, 1, 0.36, 1] as const;

/** Retained for an older, currently unused brand renderer. */
export type BrandLogo =
    | { kind: 'img'; src: string; alt: string; scale?: number }
    | { kind: 'render'; render: 'cal' | 'whatsapp' | 'google' };
