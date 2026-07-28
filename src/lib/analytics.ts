const CONSENT_KEY = 'ukonnect_cookie_consent';

export type ConsentValue = 'accepted' | 'declined';

export function getStoredConsent(): ConsentValue | null {
    try {
        const value = localStorage.getItem(CONSENT_KEY);
        if (value === 'accepted' || value === 'declined') return value;
    } catch {
        /* private mode */
    }
    return null;
}

export function storeConsent(value: ConsentValue) {
    try {
        localStorage.setItem(CONSENT_KEY, value);
    } catch {
        /* private mode */
    }
}

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        clarity?: (...args: unknown[]) => void;
        fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
        _fbq?: unknown;
    }
}

let analyticsLoaded = false;

function appendScript(src: string) {
    const el = document.createElement('script');
    el.async = true;
    el.src = src;
    document.head.appendChild(el);
}

/** Load GA4, Clarity, and Meta Pixel only after explicit consent. */
export function loadMarketingAnalytics() {
    if (analyticsLoaded || typeof document === 'undefined') return;
    analyticsLoaded = true;

    // Google Analytics 4
    appendScript('https://www.googletagmanager.com/gtag/js?id=G-4NTSNK7L05');
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-4NTSNK7L05', { anonymize_ip: true });

    // Microsoft Clarity
    appendScript('https://www.clarity.ms/tag/w28tloclcm');

    // Meta Pixel
    appendScript('https://connect.facebook.net/en_US/fbevents.js');
    const fbq = function (...args: unknown[]) {
        (fbq.queue = fbq.queue || []).push(args);
    } as ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;
    window.fbq('init', '1406094341550548');
    window.fbq('track', 'PageView');
}
