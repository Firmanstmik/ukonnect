import type { TranslationKey } from '../../i18n/translations';

/** Shared cinematic stage coordinate system. */
export const CANVAS = { w: 1000, h: 800 } as const;
export const TEAM_ORIGIN = { x: 500, y: 520 } as const;

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
 * The line visibly leaves the team, enters every operating system, reaches
 * revenue/client success, then lands in the client-logo destination.
 */
export const WORKFLOW_PATH =
    'M 500 520 C 430 558 330 584 245 555 C 212 530 185 492 170 455 C 126 402 118 360 135 330 C 150 270 178 230 220 205 C 268 165 315 145 360 145 C 418 145 468 132 525 135 C 590 138 646 154 690 175 C 758 202 804 235 830 270 C 854 314 860 364 850 410 C 840 474 820 520 790 545 C 758 584 710 616 650 635 C 594 672 548 709 500 735';

/** Foreground segment creates a single controlled depth crossing. */
export const WORKFLOW_FRONT_PATH =
    'M 830 270 C 854 314 860 364 850 410 C 840 474 820 520 790 545';

export const WORKFLOW_NODES: WorkflowNode[] = [
    { id: 'strategy', step: '01', labelKey: 'hero.workflow.strategy.label', x: 245, y: 555, progress: 0.10, brands: ['notion', 'slack'] },
    { id: 'metaAds', step: '02', labelKey: 'hero.workflow.metaAds.label', x: 170, y: 455, progress: 0.20, brands: ['meta'] },
    { id: 'googleAds', step: '03', labelKey: 'hero.workflow.googleAds.label', x: 135, y: 330, progress: 0.29, brands: ['googleAds'] },
    { id: 'landingPage', step: '04', labelKey: 'hero.workflow.landingPage.label', x: 220, y: 205, progress: 0.38, brands: ['wordpress'] },
    { id: 'website', step: '05', labelKey: 'hero.workflow.website.label', x: 360, y: 145, progress: 0.47, brands: ['wordpress', 'analytics'] },
    { id: 'crm', step: '06', labelKey: 'hero.workflow.crm.label', x: 525, y: 135, progress: 0.55, brands: ['hubspot'] },
    { id: 'automation', step: '07', labelKey: 'hero.workflow.automation.label', x: 690, y: 175, progress: 0.64, brands: ['zapier', 'openai', 'claude', 'gemini'] },
    { id: 'appointment', step: '08', labelKey: 'hero.workflow.appointment.label', x: 830, y: 270, progress: 0.73, brands: ['calendar'] },
    { id: 'sales', step: '09', labelKey: 'hero.workflow.sales.label', x: 850, y: 410, progress: 0.81, brands: ['whatsapp', 'meet'] },
    { id: 'revenue', step: '10', labelKey: 'hero.workflow.revenue.label', x: 790, y: 545, progress: 0.89, brands: ['stripe', 'analytics'] },
    { id: 'clientSuccess', step: '11', labelKey: 'hero.workflow.clientSuccess.label', x: 650, y: 635, progress: 0.96, brands: ['googleBusiness', 'slack'] },
];

export const HANDOFF_PATH = 'M 500 735 C 500 758 500 780 500 800';

export function pct(value: number, total: number) {
    return `${(value / total) * 100}%`;
}

export const HERO_EASE = [0.22, 1, 0.36, 1] as const;

/** Retained for an older, currently unused brand renderer. */
export type BrandLogo =
    | { kind: 'img'; src: string; alt: string; scale?: number }
    | { kind: 'render'; render: 'cal' | 'whatsapp' | 'google' };
