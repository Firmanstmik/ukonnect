import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { getStoredConsent, loadMarketingAnalytics, storeConsent, type ConsentValue } from '../lib/analytics';

const COPY = {
    en: {
        body: 'We use cookies for analytics and marketing to improve your experience. You can accept or decline non-essential cookies.',
        accept: 'Accept',
        decline: 'Decline',
        privacy: 'Privacy Policy',
    },
    nl: {
        body: 'We gebruiken cookies voor analytics en marketing om uw ervaring te verbeteren. U kunt niet-essentiële cookies accepteren of weigeren.',
        accept: 'Accepteren',
        decline: 'Weigeren',
        privacy: 'Privacybeleid',
    },
    pt: {
        body: 'Usamos cookies de análise e marketing para melhorar a sua experiência. Pode aceitar ou recusar cookies não essenciais.',
        accept: 'Aceitar',
        decline: 'Recusar',
        privacy: 'Política de Privacidade',
    },
    id: {
        body: 'Kami menggunakan cookie untuk analitik dan pemasaran agar pengalaman Anda lebih baik. Anda dapat menerima atau menolak cookie non-esensial.',
        accept: 'Terima',
        decline: 'Tolak',
        privacy: 'Kebijakan Privasi',
    },
} as const;

/**
 * Minimal GDPR cookie banner. Marketing analytics load only after Accept.
 */
export function CookieConsent() {
    const { lang } = useLanguage();
    const copy = COPY[lang] ?? COPY.en;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const stored = getStoredConsent();
        if (stored === 'accepted') {
            loadMarketingAnalytics();
            setVisible(false);
            return;
        }
        if (stored === 'declined') {
            setVisible(false);
            return;
        }
        setVisible(true);
    }, []);

    const choose = (value: ConsentValue) => {
        storeConsent(value);
        if (value === 'accepted') loadMarketingAnalytics();
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-5"
        >
            <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-5">
                <p className="flex-1 text-sm leading-relaxed text-slate-600">
                    {copy.body}{' '}
                    <Link to={`/${lang}/privacy`} className="font-semibold text-primary underline-offset-2 hover:underline">
                        {copy.privacy}
                    </Link>
                </p>
                <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => choose('declined')}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300"
                    >
                        {copy.decline}
                    </button>
                    <button
                        type="button"
                        onClick={() => choose('accepted')}
                        className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                        {copy.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}
