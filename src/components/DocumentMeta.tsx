import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { SITE_ORIGIN } from '../lib/contactInfo';
import type { Language } from '../i18n/translations';

const LANG_LOCALE: Record<Language, string> = {
    en: 'en_US',
    nl: 'nl_NL',
    pt: 'pt_PT',
    id: 'id_ID',
};

const PAGE_TITLE: Record<string, Record<Language, string>> = {
    home: {
        en: 'Ukonnect | Human-Led Growth Partner',
        nl: 'Ukonnect | Mensgerichte Groeipartner',
        pt: 'Ukonnect | Parceiro de Crescimento Humano',
        id: 'Ukonnect | Mitra Pertumbuhan Human-Led',
    },
    about: {
        en: 'About | Ukonnect',
        nl: 'Over ons | Ukonnect',
        pt: 'Sobre | Ukonnect',
        id: 'Tentang | Ukonnect',
    },
    contact: {
        en: 'Contact | Ukonnect',
        nl: 'Contact | Ukonnect',
        pt: 'Contacto | Ukonnect',
        id: 'Kontak | Ukonnect',
    },
    careers: {
        en: 'Careers | Ukonnect',
        nl: 'Vacatures | Ukonnect',
        pt: 'Carreiras | Ukonnect',
        id: 'Karir | Ukonnect',
    },
    privacy: {
        en: 'Privacy Policy | Ukonnect',
        nl: 'Privacybeleid | Ukonnect',
        pt: 'Política de Privacidade | Ukonnect',
        id: 'Kebijakan Privasi | Ukonnect',
    },
    terms: {
        en: 'Terms of Service | Ukonnect',
        nl: 'Servicevoorwaarden | Ukonnect',
        pt: 'Termos de Serviço | Ukonnect',
        id: 'Syarat Layanan | Ukonnect',
    },
};

function pageKey(pathname: string): keyof typeof PAGE_TITLE {
    if (pathname.includes('/about')) return 'about';
    if (pathname.includes('/contact')) return 'contact';
    if (pathname.includes('/careers')) return 'careers';
    if (pathname.includes('/privacy')) return 'privacy';
    if (pathname.includes('/terms')) return 'terms';
    return 'home';
}

function upsertLink(rel: string, href: string, hreflang?: string) {
    const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
    let el = document.head.querySelector(selector) as HTMLLinkElement | null;
    if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        if (hreflang) el.hreflang = hreflang;
        document.head.appendChild(el);
    }
    el.href = href;
}

/**
 * Keeps html lang, document title, canonical, and hreflang in sync with the active route.
 */
export function DocumentMeta() {
    const { lang } = useLanguage();
    const { pathname } = useLocation();

    useEffect(() => {
        document.documentElement.lang = lang;

        const key = pageKey(pathname);
        document.title = PAGE_TITLE[key][lang];

        const pathWithoutLang = pathname.replace(/^\/(en|nl|pt|id)/, '') || '';
        const canonical = `${SITE_ORIGIN}/${lang}${pathWithoutLang}`;
        upsertLink('canonical', canonical);

        (['en', 'nl', 'pt', 'id'] as Language[]).forEach((l) => {
            upsertLink('alternate', `${SITE_ORIGIN}/${l}${pathWithoutLang}`, l);
        });
        upsertLink('alternate', `${SITE_ORIGIN}/en${pathWithoutLang}`, 'x-default');

        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) ogLocale.setAttribute('content', LANG_LOCALE[lang]);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', canonical);

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', document.title);
    }, [lang, pathname]);

    return null;
}
