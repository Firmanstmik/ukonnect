import type { Language } from '../i18n/translations';

/** Shared production contact endpoints — keep Footer / Contact / Navbar / Features aligned. */
export type ContactChannel = {
    display: string;
    telHref: string;
    whatsappHref: string;
};

export function getContactChannel(lang: Language): ContactChannel {
    if (lang === 'pt') {
        return {
            display: '+351 927 497 086',
            telHref: 'tel:+351927497086',
            whatsappHref: 'https://wa.me/351927497086',
        };
    }
    // NL HQ number used for en / nl / id until founder confirms a separate ID line
    return {
        display: '085 333 1000',
        telHref: 'tel:+31853331000',
        whatsappHref: 'https://wa.me/31853331000',
    };
}

export const COMPANY_EMAIL = 'mailto:info@ukonnect.nl';
export const COMPANY_EMAIL_ADDRESS = 'info@ukonnect.nl';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/ukonnect';
export const SITE_ORIGIN = 'https://ukonnect.pt';

/** Unverified Contact hero KPIs — hidden until founder confirms. */
export const CONTACT_STATS_PENDING_VERIFICATION = true;
