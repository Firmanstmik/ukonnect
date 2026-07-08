import React, { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { IconShield, IconSparkle, IconStar } from './icons/HeroIcons';
import { HeroTrustBadge } from './HeroTrustBadge';
import { HeroBackground } from './HeroBackground';
import { HeroMobileStickyCta, HeroPrimaryButton, HeroSecondaryButton } from './HeroButtons';
import { HeroVisual } from './HeroVisual';
import { useLanguage } from '../i18n/LanguageContext';

const ContactFormModal = lazy(() =>
    import('./ContactFormModal').then(m => ({ default: m.ContactFormModal }))
);

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE },
});

const GoogleG = () => (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
);

function TrustStatCard({
    delay,
    compact,
    accent = 'default',
    ariaLabel,
    children,
}: {
    delay: number;
    compact?: boolean;
    accent?: 'default' | 'purple';
    ariaLabel: string;
    children: React.ReactNode;
}) {
    return (
        <motion.button
            type="button"
            aria-label={ariaLabel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.5, delay, ease: EASE }}
            className={`hero-trust-stat-card group relative flex items-center gap-2.5 shrink-0 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                compact
                    ? 'hero-trust-pill rounded-2xl border border-white/70 py-2.5 px-3.5 min-w-[148px] snap-center'
                    : 'rounded-xl py-2.5 px-3'
            } ${accent === 'purple' ? 'hero-trust-stat-card--purple' : ''}`}
        >
            <div className="hero-trust-stat-shine pointer-events-none" aria-hidden />
            {children}
        </motion.button>
    );
}

function AnimatedStars({ size = 11 }: { size?: number }) {
    return (
        <div className="flex items-center gap-px">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className="inline-flex transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ transitionDelay: `${i * 45}ms` }}
                >
                    <IconStar size={size} />
                </span>
            ))}
        </div>
    );
}

function MobileTrustCards() {
    const { t } = useLanguage();
    return (
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-0.5 -mx-1 px-1">
            <TrustStatCard delay={0.5} compact ariaLabel="4.9 Google Reviews">
                <GoogleG />
                <div className="text-left min-w-0">
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-slate-900 leading-none">4.9</span>
                        <AnimatedStars size={11} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium group-hover:text-slate-600 transition-colors">Google Reviews</span>
                </div>
            </TrustStatCard>
            <TrustStatCard delay={0.58} compact ariaLabel={t('hero.trustedCount')}>
                <motion.div
                    className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0 group-hover:border-primary/25 group-hover:shadow-md group-hover:shadow-primary/15 transition-all"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <IconShield size={16} />
                </motion.div>
                <div className="text-left min-w-0">
                    <p className="text-[13px] font-bold text-slate-900 leading-none truncate">{t('hero.trustedCount')}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 group-hover:text-slate-600 transition-colors">{t('hero.trustedBy')}</p>
                </div>
            </TrustStatCard>
            <TrustStatCard delay={0.66} compact accent="purple" ariaLabel="AI-First Automation Platform">
                <motion.div
                    className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/12 to-[#9b4dff]/12 border border-primary/12 flex items-center justify-center shrink-0 group-hover:shadow-md group-hover:shadow-primary/20 transition-all"
                    animate={{ boxShadow: ['0 0 0 rgba(86,0,227,0)', '0 0 12px rgba(86,0,227,0.2)', '0 0 0 rgba(86,0,227,0)'] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                >
                    <motion.span animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                        <IconSparkle size={16} />
                    </motion.span>
                </motion.div>
                <div className="text-left min-w-0">
                    <p className="text-[13px] font-bold text-primary leading-none hero-trust-ai-text">AI-First</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 group-hover:text-slate-600 transition-colors">Platform</p>
                </div>
            </TrustStatCard>
        </div>
    );
}

function DesktopTrustCards() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-nowrap items-stretch gap-2.5 overflow-x-auto scrollbar-hide max-w-full">
            <TrustStatCard delay={0.5} ariaLabel="4.9 Google Reviews">
                <GoogleG />
                <div className="text-left min-w-0">
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-slate-900 leading-none">4.9</span>
                        <AnimatedStars size={11} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap group-hover:text-slate-600 transition-colors">Google Reviews</span>
                </div>
            </TrustStatCard>
            <TrustStatCard delay={0.58} ariaLabel={t('hero.trustedCount')}>
                <motion.div
                    className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0 group-hover:border-primary/25 group-hover:shadow-md group-hover:shadow-primary/15 transition-all"
                    whileHover={{ rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 0.45 }}
                >
                    <IconShield size={16} />
                </motion.div>
                <div className="text-left min-w-0">
                    <p className="text-sm font-bold text-slate-900 leading-none whitespace-nowrap">{t('hero.trustedCount')}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 whitespace-nowrap group-hover:text-slate-600 transition-colors">{t('hero.trustedBy')}</p>
                </div>
            </TrustStatCard>
            <TrustStatCard delay={0.66} accent="purple" ariaLabel="AI-First Automation Platform">
                <motion.div
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-[#9b4dff]/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:shadow-md group-hover:shadow-primary/20 transition-all"
                    animate={{ boxShadow: ['0 0 0 rgba(86,0,227,0)', '0 0 14px rgba(86,0,227,0.18)', '0 0 0 rgba(86,0,227,0)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
                        <IconSparkle size={16} />
                    </motion.span>
                </motion.div>
                <div className="text-left min-w-0">
                    <p className="text-sm font-bold text-primary leading-none whitespace-nowrap hero-trust-ai-text">AI-First</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 whitespace-nowrap group-hover:text-slate-600 transition-colors">Automation Platform</p>
                </div>
            </TrustStatCard>
        </div>
    );
}

export const Hero = () => {
    const { t, lang } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);

    return (
        <>
            <section className="relative isolate pt-28 sm:pt-36 lg:pt-[clamp(10rem,18vh,13rem)] xl:pt-[clamp(10.75rem,19.5vh,13.75rem)] pb-10 sm:pb-16 md:pb-20 lg:pb-12 xl:pb-20 site-gutter-x overflow-x-hidden">
                <HeroBackground />

                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,900px)] h-[500px] bg-gradient-to-b from-primary/[0.05] to-transparent rounded-full blur-3xl" />
                    <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-[#9b4dff]/[0.05] rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-primary/[0.06] rounded-full blur-[90px]" />
                </div>

                <div className="relative w-full hero-mobile-app lg:pb-0">
                    <div className="hero-desktop-stage">
                    <div className="hero-desktop-stage-inner">
                    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_1.04fr] lg:gap-x-10 lg:gap-y-2 xl:gap-x-12 xl:gap-y-3 2xl:gap-x-14 lg:items-start lg:pt-2 xl:pt-4">
                        <HeroTrustBadge />
                        {/* Headline */}
                        <motion.h1
                            {...fadeUp(0.06)}
                            className={`order-2 lg:order-none lg:col-start-1 lg:row-start-2 font-bold tracking-tight text-slate-900 text-center lg:text-left text-balance px-1 lg:px-0 lg:mb-0 lg:max-w-none ${
                                lang === 'pt'
                                    ? 'text-[1.65rem] leading-[1.12] lg:text-[clamp(1.8rem,2.85vw,3.25rem)] lg:leading-[1.1]'
                                    : 'text-[1.75rem] leading-[1.12] lg:text-[clamp(1.9rem,3.1vw,3.85rem)] lg:leading-[1.1]'
                            }`}
                        >
                            <span className="block">{t('hero.headingPre')}</span>
                            <span className="block mt-1 lg:mt-0.5">
                                {t('hero.headingMid')}
                                <span
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9b4dff]"
                                    style={{ animation: 'heroShimmer 5s ease-in-out infinite' }}
                                >
                                    {t('hero.headingHighlight')}
                                </span>
                            </span>
                        </motion.h1>

                        {/* Visual — app widget on mobile, hero panel on desktop */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
                            className="order-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-5 relative w-full -mx-1 lg:mx-0 self-center lg:self-start"
                        >
                            <p className="hero-app-section-label lg:hidden text-center text-[9px] font-bold uppercase text-primary/60 mb-2.5">
                                Live Growth OS
                            </p>
                            <HeroVisual />
                        </motion.div>

                        {/* Subtext — mobile after visual */}
                        <motion.p
                            {...fadeUp(0.22)}
                            className="order-4 lg:order-none lg:col-start-1 lg:row-start-3 text-[14px] lg:text-[clamp(1rem,1.2vw,1.25rem)] text-slate-500 lg:leading-snug leading-relaxed font-medium text-center lg:text-left px-1 lg:px-0 lg:mb-0 lg:max-w-none"
                        >
                            {t('hero.sub')}
                        </motion.p>

                        {/* Desktop CTAs */}
                        <motion.div
                            {...fadeUp(0.24)}
                            className="order-5 lg:order-none lg:col-start-1 lg:row-start-4 hidden lg:flex items-start gap-3 xl:gap-4 mb-0"
                        >
                            <HeroPrimaryButton onClick={openModal} className="lg:px-9 lg:py-[1.05rem] lg:text-base">
                                {t('hero.cta')}
                            </HeroPrimaryButton>
                            <HeroSecondaryButton href="#system-modules" className="lg:px-9 lg:py-[1.05rem] lg:text-base">
                                {t('nav.services')}
                            </HeroSecondaryButton>
                        </motion.div>

                        {/* Trust */}
                        <motion.div {...fadeUp(0.3)} className="order-6 lg:order-none lg:col-start-1 lg:row-start-5">
                            <div className="lg:hidden">
                                <MobileTrustCards />
                            </div>
                            <div className="hidden lg:block">
                                <DesktopTrustCards />
                            </div>
                        </motion.div>
                    </div>
                    </div>
                    </div>
                </div>
            </section>

            <HeroMobileStickyCta
                onPrimaryClick={openModal}
                primaryLabel={t('hero.cta')}
                secondaryHref="#system-modules"
                secondaryLabel={t('nav.services')}
            />

            <Suspense fallback={null}>
                <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </Suspense>
        </>
    );
};
