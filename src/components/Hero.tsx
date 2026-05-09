import React, { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { useLanguage } from '../i18n/LanguageContext';
import logoDutchBroker from '../assets/Partners/DUTCHBROKER.png';
import logoHuurwoningen from '../assets/Partners/HUURWONINGEN.png';
import logoPararius from '../assets/Partners/PARARIUS HUURWONINGEN.png';
import logoRemax from '../assets/Partners/REMAX.png';
import logoWjbVermeulen from '../assets/Partners/WJB VERMEULEN.png';
import logoZekerVastgoed from '../assets/Partners/ZEKERVASTGOED.png';

const ContactFormModal = lazy(() =>
    import('./ContactFormModal').then(m => ({ default: m.ContactFormModal }))
);

const BadgeIcon = () => (
    <img src="/favicon.png" alt="Ukonnect" className="w-4 h-4 object-contain" />
);

const partnerLogos = [
    { src: logoRemax, alt: 'RE/MAX' },
    { src: logoPararius, alt: 'Pararius Huurwoningen' },
    { src: logoWjbVermeulen, alt: 'WJB Vermeulen' },
    { src: logoDutchBroker, alt: 'DutchBroker' },
    { src: logoZekerVastgoed, alt: 'Zeker Vastgoed' },
    { src: logoHuurwoningen, alt: 'Huurwoningen' },
];

export const Hero = () => {
    const { t, lang } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
        <section className="relative isolate pt-56 pb-[60px] md:pb-[80px] lg:pb-[120px] px-6 flex flex-col items-center text-center overflow-hidden">
            {/* Animated background */}
            <HeroBackground />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 shadow-sm text-[13px] font-medium text-slate-600 mb-8 bg-white/50 backdrop-blur-sm"
            >
                <BadgeIcon />
                <span>{t('hero.badge')}</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`${lang === 'pt' ? 'text-[40px]' : 'text-[44px]'} md:text-5xl lg:text-[64px] font-bold leading-[1.15] tracking-tight text-slate-900 mb-6 max-w-[1100px]`}
            >
                {t('hero.headingPre')}<br />{t('hero.headingMid')}<span className="text-[#5600e3]">{t('hero.headingHighlight')}</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[15px] md:text-base text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
                {t('hero.sub')}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-row flex-wrap items-center justify-center gap-4"
            >
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-8 py-3 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-full text-[15px] font-medium transition-all shadow-sm shadow-[#5600e3]/20 hover:-translate-y-0.5 hover:shadow-md">
                    {t('hero.cta')}
                </button>

                <div className="flex items-center gap-2 bg-white/50 border border-slate-200/40 rounded-full py-3 px-4">
                    <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex items-center gap-1 mb-0.5">
                            <span className="text-[13px] font-bold text-slate-800 leading-none">4,9</span>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                                ))}
                            </div>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium leading-none">Google Reviews</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-28 w-full max-w-[1300px] overflow-hidden"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
            >
                {/* Auto-scrolling logo track — 2 copies for seamless -50% loop */}
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                    className="flex w-max gap-16 md:gap-24 items-center"
                >
                    {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                        <div key={idx} className="flex-shrink-0">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="h-8 md:h-10 w-auto max-w-[130px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>

        <Suspense fallback={null}>
            <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </Suspense>
        </>
    );
};
