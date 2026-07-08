/**
 * Navigation content model.
 *
 * The founder's original information architecture is preserved exactly — four
 * top-level items, in order:
 *
 *   1. Hoe het werkt  → scroll to the process section        (plain link)
 *   2. Diensten       → the one mega menu (AI · Marketing · Web + proof) (mega)
 *   3. Over ons       → the about page                        (plain link)
 *   4. Contact        → the contact page                      (plain link)
 *
 * A mega menu is used *only* for Diensten, where multiple service categories
 * genuinely benefit from a richer, scannable overview. The other three remain
 * single destinations so the user's mental model is unchanged — Stripe/HubSpot
 * structure, not a re-taxonomy.
 *
 * Copy lives in `translations.ts` (keys only referenced here) so the menu stays
 * fully localized across nl / pt / en / id.
 *
 * `target` describes where something goes without coupling to routing details:
 *   - `scroll`  → smooth-scroll to a section id on the home page
 *   - `route`   → navigate to `/{lang}/{to}`
 *   - `modal`   → open the contact / booking modal
 */
import type { Icon } from 'iconsax-react';
import {
    Chart21,
    Cpu,
    Element4,
    Facebook,
    Google,
    MagicStar,
    Mobile,
    Monitor,
    MoneyRecive,
    Profile2User,
    Radar,
    SearchStatus1,
    Speedometer,
    Star1,
    UserSearch,
} from 'iconsax-react';
import type { TranslationKey } from '../i18n/translations';

export type MegaTarget =
    | { kind: 'scroll'; id: string }
    | { kind: 'route'; to: string }
    | { kind: 'modal' };

export interface MegaLink {
    titleKey: TranslationKey;
    descKey: TranslationKey;
    Icon: Icon;
    accent: string;
    target: MegaTarget;
}

export interface MegaGroup {
    labelKey: TranslationKey;
    tagKey: TranslationKey;
    Icon: Icon;
    accent: string;
    links: MegaLink[];
}

export interface MegaFeature {
    eyebrowKey: TranslationKey;
    titleKey: TranslationKey;
    descKey: TranslationKey;
    ctaKey: TranslationKey;
    ctaTarget: MegaTarget;
    Icon: Icon;
    variant: 'platform' | 'customers' | 'company';
}

export interface MegaSection {
    /** Stable key used for hover/focus state and aria wiring. */
    id: string;
    labelKey: TranslationKey;
    groups: MegaGroup[];
    feature: MegaFeature;
}

/**
 * A top-level navigation item. Most are plain links; exactly one (Diensten)
 * carries a mega panel.
 */
export type NavItem =
    | { kind: 'link'; id: string; labelKey: TranslationKey; target: MegaTarget }
    | { kind: 'mega'; id: string; labelKey: TranslationKey; section: MegaSection };

// Cohesive accent palette — kept within the brand violet family with a couple
// of restrained supporting hues, per the enterprise-SaaS design direction.
const ACCENT = {
    primary: '#5600e3',
    violet: '#9b4dff',
    emerald: '#10b981',
    amber: '#f59e0b',
} as const;

const SERVICES: MegaTarget = { kind: 'scroll', id: 'system-modules' };
const CASES: MegaTarget = { kind: 'scroll', id: 'case-studies' };

/**
 * The single mega panel, opened by "Diensten". Three service pillars, plus a
 * proof rail that carries the social proof / case-study content at the exact
 * moment a visitor is weighing the services.
 */
const DIENSTEN_SECTION: MegaSection = {
    id: 'services',
    labelKey: 'nav.services',
    groups: [
        {
            labelKey: 'mega.grp.ai',
            tagKey: 'mega.grp.ai.tag',
            Icon: Cpu,
            accent: ACCENT.primary,
            links: [
                { titleKey: 'mega.ai.automation.t', descKey: 'mega.ai.automation.d', Icon: MagicStar, accent: ACCENT.primary, target: SERVICES },
                { titleKey: 'mega.ai.qualify.t', descKey: 'mega.ai.qualify.d', Icon: UserSearch, accent: ACCENT.primary, target: SERVICES },
                { titleKey: 'mega.ai.crm.t', descKey: 'mega.ai.crm.d', Icon: Profile2User, accent: ACCENT.primary, target: SERVICES },
                { titleKey: 'mega.ai.sales.t', descKey: 'mega.ai.sales.d', Icon: MoneyRecive, accent: ACCENT.primary, target: SERVICES },
            ],
        },
        {
            labelKey: 'mega.grp.marketing',
            tagKey: 'mega.grp.marketing.tag',
            Icon: Chart21,
            accent: ACCENT.violet,
            links: [
                { titleKey: 'mega.mkt.google.t', descKey: 'mega.mkt.google.d', Icon: Google, accent: ACCENT.violet, target: SERVICES },
                { titleKey: 'mega.mkt.meta.t', descKey: 'mega.mkt.meta.d', Icon: Facebook, accent: ACCENT.violet, target: SERVICES },
                { titleKey: 'mega.mkt.seo.t', descKey: 'mega.mkt.seo.d', Icon: SearchStatus1, accent: ACCENT.violet, target: SERVICES },
                { titleKey: 'mega.mkt.leadgen.t', descKey: 'mega.mkt.leadgen.d', Icon: Radar, accent: ACCENT.violet, target: SERVICES },
            ],
        },
        {
            labelKey: 'mega.grp.web',
            tagKey: 'mega.grp.web.tag',
            Icon: Element4,
            accent: ACCENT.emerald,
            links: [
                { titleKey: 'mega.web.sites.t', descKey: 'mega.web.sites.d', Icon: Monitor, accent: ACCENT.emerald, target: SERVICES },
                { titleKey: 'mega.web.landing.t', descKey: 'mega.web.landing.d', Icon: Mobile, accent: ACCENT.emerald, target: SERVICES },
                { titleKey: 'mega.web.perf.t', descKey: 'mega.web.perf.d', Icon: Speedometer, accent: ACCENT.emerald, target: SERVICES },
            ],
        },
    ],
    feature: {
        eyebrowKey: 'mega.feat.customers.eyebrow',
        titleKey: 'mega.feat.customers.title',
        descKey: 'mega.feat.customers.desc',
        ctaKey: 'mega.viewCases',
        ctaTarget: CASES,
        Icon: Star1,
        variant: 'customers',
    },
};

/**
 * The four top-level items, in the founder's original order. Only Diensten is
 * a mega; the rest are single destinations.
 */
export const NAV_ITEMS: NavItem[] = [
    { kind: 'link', id: 'how-it-works', labelKey: 'nav.howItWorks', target: { kind: 'scroll', id: 'process' } },
    { kind: 'mega', id: 'services', labelKey: 'nav.services', section: DIENSTEN_SECTION },
    { kind: 'link', id: 'about', labelKey: 'nav.about', target: { kind: 'route', to: 'about' } },
    { kind: 'link', id: 'contact', labelKey: 'nav.contact', target: { kind: 'route', to: 'contact' } },
];
