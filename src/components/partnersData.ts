/**
 * Curated client / partner roster for the "Trusted by" section.
 *
 * Deliberately kept to a tight set of real-estate brands so the wall reads as
 * *curated* rather than a random logo dump — every entry carries the working
 * relationship it represents, surfaced on hover as a small tooltip.
 *
 * Copy (relationship labels) lives in `translations.ts`; only keys are held
 * here so the section stays fully localized across nl / pt / en / id.
 */
import { Buildings, Code, Cpu, Data, EmojiHappy, Facebook, Global, Send2 } from 'iconsax-react';
import type { Icon } from 'iconsax-react';
import logoDutchBroker from '../assets/Partners/DUTCHBROKER.png';
import logoHuurwoningen from '../assets/Partners/HUURWONINGEN.png';
import logoPararius from '../assets/Partners/PARARIUS HUURWONINGEN.png';
import logoRemax from '../assets/Partners/REMAX.png';
import logoWjbVermeulen from '../assets/Partners/WJB VERMEULEN.png';
import logoZekerVastgoed from '../assets/Partners/ZEKERVASTGOED.png';
import type { TranslationKey } from '../i18n/translations';

export interface Partner {
    src: string;
    /** Brand name — used as the accessible label. */
    alt: string;
    /** Relationship shown on hover (e.g. "Lead Generation"). */
    relKey: TranslationKey;
    /** Icon pairing the relationship tag with an instantly legible mark. */
    relIcon: Icon;
}

export const PARTNERS: Partner[] = [
    { src: logoRemax, alt: 'RE/MAX', relKey: 'trust.rel.leadgen', relIcon: Send2 },
    { src: logoPararius, alt: 'Pararius Huurwoningen', relKey: 'trust.rel.googleAds', relIcon: Global },
    { src: logoWjbVermeulen, alt: 'WJB Vermeulen', relKey: 'trust.rel.aiAutomation', relIcon: Cpu },
    { src: logoDutchBroker, alt: 'DutchBroker', relKey: 'trust.rel.crm', relIcon: Data },
    { src: logoZekerVastgoed, alt: 'Zeker Vastgoed', relKey: 'trust.rel.webTransform', relIcon: Code },
    { src: logoHuurwoningen, alt: 'Huurwoningen', relKey: 'trust.rel.metaAds', relIcon: Facebook },
];

export interface TrustMetric {
    /** Target value the counter animates to. */
    to: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    labelKey: TranslationKey;
    /** Icon anchoring the card — gives each figure an immediate, legible context. */
    icon: Icon;
    /** Per-metric accent (hex) driving the icon, underline and hover glow. */
    accent: string;
    /** Soft tint of `accent` used for the icon badge background. */
    soft: string;
}

// Enterprise trust metrics — only figures we will stand behind publicly.
// Additional KPIs stay out of production until founder-verified.
export const TRUST_METRICS: TrustMetric[] = [
    { to: 84, suffix: '+', labelKey: 'trust.metricBusinesses', icon: Buildings, accent: '#5600e3', soft: 'rgba(86,0,227,0.08)' },
    { to: 4.9, suffix: '/5', decimals: 1, labelKey: 'trust.metricSatisfaction', icon: EmojiHappy, accent: '#10b981', soft: 'rgba(16,185,129,0.08)' },
];
