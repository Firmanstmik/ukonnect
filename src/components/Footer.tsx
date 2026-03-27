import React, { lazy, Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import logo from '../assets/Ukonnect Marketing logo.webp';
import { useLanguage } from '../i18n/LanguageContext';

const ContactFormModal = lazy(() =>
    import('./ContactFormModal').then(m => ({ default: m.ContactFormModal }))
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const iconClass = "w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors hover:shadow-sm";

export const Footer = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const isPT = lang === 'pt';

    const instagram = isPT ? 'https://www.instagram.com/ukonnect.pt/' : 'https://www.instagram.com/ukonnect.nl/';
    const facebook  = isPT ? 'https://web.facebook.com/ukonnect.pt'   : 'https://web.facebook.com/ukonnect.nl';
    const whatsapp  = isPT ? 'https://wa.me/351927497086'              : 'https://wa.me/31853331000';

    const handleHelpCenter = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById('faq');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/${lang}#faq`);
        }
    };

    return (
        <>
            <footer className="border-t border-slate-200 mt-[60px] md:mt-[80px] lg:mt-[100px]">
                <div className="max-w-[1300px] mx-auto px-6 py-12 md:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">

                        {/* Brand Col */}
                        <div className="col-span-2 lg:col-span-2 flex flex-col">
                            <div className="mb-6">
                                <img src={logo} alt="Ukonnect Logo" width="180" className="h-auto" />
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">
                                {t('footer.brand')}
                            </p>
                            <div className="flex flex-wrap gap-3 items-center">
                                <a href={instagram} target="_blank" rel="noopener noreferrer" className={iconClass}><InstagramIcon /></a>
                                <a href={facebook}  target="_blank" rel="noopener noreferrer" className={iconClass}><FacebookIcon /></a>
                                <a href="https://www.tiktok.com/@ukonnect.ai" target="_blank" rel="noopener noreferrer" className={iconClass}><TikTokIcon /></a>
                                <a href="https://www.linkedin.com/company/ukonnect" target="_blank" rel="noopener noreferrer" className={iconClass}><Linkedin className="w-4 h-4" /></a>
                                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={iconClass}><WhatsAppIcon /></a>
                            </div>
                        </div>

                        {/* Product */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-slate-900 mb-2">{t('footer.product')}</h4>
                            <Link to={`/${lang}?tab=0#system-modules`} className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.productMarketing')}</Link>
                            <Link to={`/${lang}?tab=0#system-modules`} className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.productAdvertising')}</Link>
                            <Link to={`/${lang}?tab=1#system-modules`} className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.productAISystems')}</Link>
                            <Link to={`/${lang}?tab=2#system-modules`} className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.productWebDev')}</Link>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-slate-900 mb-2">{t('footer.company')}</h4>
                            <Link to={`/${lang}/about`}   className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.companyAbout')}</Link>
                            <Link to={`/${lang}/careers`} className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.companyCareers')}</Link>
                            <Link to={`/${lang}/contact`} className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.companyContact')}</Link>
                        </div>

                        {/* Legal */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-slate-900 mb-2">{t('footer.legal')}</h4>
                            <Link to={`/${lang}/privacy`} className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.legalPrivacy')}</Link>
                            <Link to={`/${lang}/terms`}   className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.legalTerms')}</Link>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 text-sm">{t('footer.copyright')}</p>
                        <div className="flex items-center gap-6">
                            <a href="#faq" onClick={handleHelpCenter} className="text-slate-400 hover:text-slate-900 text-sm transition-colors cursor-pointer">{t('footer.helpCenter')}</a>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <button onClick={() => setModalOpen(true)} className="text-slate-400 hover:text-slate-900 text-sm transition-colors">{t('footer.bookCall')}</button>
                        </div>
                    </div>
                </div>
            </footer>

            <Suspense fallback={null}>
                <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </Suspense>
        </>
    );
};
