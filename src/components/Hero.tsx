import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { useLanguage } from '../i18n/LanguageContext';
import { ContactFormModal } from './ContactFormModal';

import logo2WheelShop from '../assets/Partners/2WHEEL-SHOP.png';
import logoDutchBroker from '../assets/Partners/DUTCHBROKER.png';
import logoHuurwoningen from '../assets/Partners/HUURWONINGEN.png';
import logoJuzaBouw from '../assets/Partners/JUZA BOUW.png';
import logoMijnVogelwering from '../assets/Partners/MIJN VOGELWERING.png';
import logoOhMyGemmer from '../assets/Partners/OHMYGEMMER.png';
import logoPararius from '../assets/Partners/PARARIUS HUURWONINGEN.png';
import logoRemax from '../assets/Partners/REMAX.png';
import logoSbsKlus from '../assets/Partners/SBS KLUS.png';
import logoWjbVermeulen from '../assets/Partners/WJB VERMEULEN.png';
import logoZekerVastgoed from '../assets/Partners/ZEKERVASTGOED.png';

const BadgeIcon = () => (
    <img src="/favicon.png" alt="Ukonnect" className="w-4 h-4 object-contain" />
);

const partnerLogos = [
    { src: logo2WheelShop, alt: '2Wheel Shop' },         // long
    { src: logoRemax, alt: 'RE/MAX' },                   // short
    { src: logoPararius, alt: 'Pararius Huurwoningen' }, // long
    { src: logoSbsKlus, alt: 'SBS Klus' },               // short
    { src: logoMijnVogelwering, alt: 'Mijn Vogelwering' }, // long
    { src: logoWjbVermeulen, alt: 'WJB Vermeulen' },     // short
    { src: logoDutchBroker, alt: 'DutchBroker' },        // medium
    { src: logoZekerVastgoed, alt: 'Zeker Vastgoed' },   // short
    { src: logoHuurwoningen, alt: 'Huurwoningen' },      // medium
    { src: logoJuzaBouw, alt: 'Juza Bouw' },             // medium
    { src: logoOhMyGemmer, alt: 'Oh My Gemmer' },        // medium
];

export const Hero = () => {
    const { t } = useLanguage();
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
                className="text-[44px] md:text-5xl lg:text-[64px] font-bold leading-[1.15] tracking-tight text-slate-900 mb-6 max-w-[1100px]"
            >
                {t('hero.headingPre')} <span className="text-[#5600e3]">{t('hero.headingHighlight')}</span>
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
                className="flex flex-col items-center gap-8"
            >
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-8 py-3 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-full text-[15px] font-medium transition-all shadow-sm shadow-[#5600e3]/20 hover:-translate-y-0.5 hover:shadow-md">
                    {t('hero.cta')}
                </button>

                {/* Reviews Pill */}
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm shadow-slate-200/50 rounded-full p-2 pr-6">
                    <div className="flex -space-x-2.5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-[30px] h-[30px] rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="avatar" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-start justify-center mt-0.5">
                        <div className="flex items-center text-[#5600e3] gap-0.5 mb-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                        <span className="text-[12px] text-slate-600 font-medium">{t('hero.trustedBy')} <span className="text-[#5600e3]">{t('hero.trustedCount')}</span></span>
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

        <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
};
