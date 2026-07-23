import { lazy, Suspense, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { HeroMobileStickyCta } from './HeroButtons';
import { HeroStage } from './hero/HeroStage';
import { HeroHighlightRotator } from './hero/HeroHighlightRotator';
import { HeroJourneyHandoff } from './hero/HeroJourneyHandoff';
import { HeroTrustedStrip } from './hero/HeroTrustedStrip';
import { useLanguage } from '../i18n/LanguageContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

const ContactFormModal = lazy(() =>
    import('./ContactFormModal').then((module) => ({ default: module.ContactFormModal })),
);

const EASE = [0.22, 1, 0.36, 1] as const;

function reveal(delay: number, distance: number, reduced: boolean) {
    return {
        initial: reduced ? false : { opacity: 0, y: distance, filter: 'blur(8px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: EASE },
    };
}

function GoogleMark({ className = 'h-7 w-7 shrink-0' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 48 48" aria-hidden>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.77 24c0-1.6.27-3.14.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.92 7.54 2.56 10.78z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6A14.4 14.4 0 0 1 24 38.5c-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg viewBox="0 0 20 20" fill="#F4B400" aria-hidden>
            <path d="M10 1.6l2.35 4.76 5.25.76-3.8 3.7.9 5.22L10 13.58l-4.7 2.46.9-5.22-3.8-3.7 5.25-.76L10 1.6z" />
        </svg>
    );
}

export const Hero = () => {
    const { t } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const reduced = Boolean(useReducedMotion());
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const stageY = useTransform(scrollYProgress, [0, 0.62], [0, reduced ? 0 : -28]);
    const handoffScale = useTransform(scrollYProgress, [0.25, 0.7], [0.35, 1]);

    return (
        <>
            <section
                ref={sectionRef}
                className="cinematic-hero relative isolate overflow-x-clip overflow-y-visible pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-28 sm:pt-36 md:pb-20 lg:flex lg:h-[100svh] lg:min-h-[720px] lg:max-h-[900px] lg:flex-col lg:overflow-x-clip lg:overflow-y-visible lg:pb-0 lg:pt-[5.75rem]"
            >
                <HeroBackground />
                <div className="cinematic-hero-light pointer-events-none absolute inset-0" aria-hidden />

                <div className="site-gutter-x relative mx-auto flex w-full max-w-none flex-1 flex-col lg:min-h-0">
                    <div className="cinematic-hero-canvas relative flex flex-1 flex-col lg:min-h-0 lg:grid lg:grid-cols-[minmax(24rem,1.15fr)_minmax(520px,680px)] lg:items-center lg:gap-x-10 lg:pb-14 xl:grid-cols-[minmax(26rem,1.2fr)_minmax(560px,720px)] xl:gap-x-12">
                        <header className="cinematic-hero-copy relative z-30 mx-auto flex w-full max-w-[1120px] flex-col items-center text-center lg:mx-0 lg:min-h-0 lg:max-w-[36rem] lg:items-start lg:justify-center lg:self-center lg:pr-3 lg:text-left xl:max-w-[38rem]">
                            <motion.h1
                                {...reveal(0.42, 28, reduced)}
                                className="cinematic-headline mt-1 w-full max-w-none text-[2.45rem] leading-[1.12] sm:text-[3.4rem] lg:mt-0 lg:text-[2.75rem] xl:text-[3.05rem]"
                            >
                                <span className="cinematic-headline-pre">{t('hero.headingPre')}</span>
                                <HeroHighlightRotator />
                            </motion.h1>

                            <motion.p
                                {...reveal(0.58, 22, reduced)}
                                className="mt-5 max-w-[560px] text-[15px] font-medium leading-[1.7] text-[#667084] sm:mt-6 sm:text-[1.05rem] lg:mt-5 lg:max-w-[30rem] lg:text-[1.02rem]"
                            >
                                {t('hero.sub')}
                            </motion.p>

                            <motion.p
                                {...reveal(0.7, 16, reduced)}
                                className="cinematic-services mt-4 sm:mt-5"
                            >
                                {t('hero.services')}
                            </motion.p>

                            <motion.div
                                {...reveal(0.82, 20, reduced)}
                                className="cinematic-cta-row mt-7 hidden md:flex lg:mt-8"
                            >
                                <motion.button
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                    whileHover={reduced ? undefined : { y: -2 }}
                                    whileTap={reduced ? undefined : { scale: 0.98 }}
                                    transition={{ duration: 0.28, ease: EASE }}
                                    className="hero-btn-ref group relative isolate overflow-hidden px-8 py-3.5 text-[15px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b00e8] focus-visible:ring-offset-2"
                                >
                                    <span className="hero-btn-ref-swipe" aria-hidden />
                                    <span className="hero-btn-ref-shine" aria-hidden />
                                    <span className="relative z-10 inline-flex items-center gap-2">
                                        {t('hero.cta')}
                                        <svg
                                            className="h-4 w-4 transition-transform duration-350 ease-out group-hover:translate-x-1"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            aria-hidden
                                        >
                                            <path
                                                d="M4 10h11M11 5l5 5-5 5"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </motion.button>

                                <div className="cinematic-google-badge">
                                    <GoogleMark />
                                    <div className="cinematic-google-badge-copy">
                                        <span className="cinematic-google-badge-score">
                                            4,9
                                            <span className="cinematic-google-badge-stars" aria-hidden>
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <StarIcon key={i} />
                                                ))}
                                            </span>
                                        </span>
                                        <small className="cinematic-google-badge-label">{t('hero.googleReviews')}</small>
                                    </div>
                                </div>
                            </motion.div>
                        </header>

                        <motion.div
                            className="cinematic-hero-stage-wrap relative z-10 mx-auto mt-1 w-full sm:mt-2 md:-mt-12 lg:mx-0 lg:mt-0 lg:ml-2 lg:flex lg:w-full lg:max-w-none lg:shrink-0 lg:items-center lg:justify-end xl:ml-4"
                            style={{ y: stageY }}
                            initial={reduced ? false : { opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduced ? 0 : 1.15, delay: reduced ? 0 : 0.55, ease: EASE }}
                        >
                            <HeroStage />
                        </motion.div>
                    </div>

                    {isDesktop ? (
                        <motion.div
                            className="cinematic-hero-trusted relative z-[8] mx-auto mt-2 mb-1 w-full max-w-[52rem]"
                            initial={reduced ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : 0.95, ease: EASE }}
                        >
                            <HeroTrustedStrip />
                        </motion.div>
                    ) : null}

                    <div className="relative z-[6] mx-auto mt-2 flex justify-center sm:mt-3 lg:mt-1 lg:pb-3">
                        <HeroJourneyHandoff label={t('hero.scrollExplore')} scaleY={handoffScale} />
                    </div>
                </div>

                <div className="cinematic-bottom-wash pointer-events-none absolute inset-x-0 bottom-0 h-40 lg:h-36" aria-hidden />
            </section>

            <HeroMobileStickyCta
                onPrimaryClick={() => setModalOpen(true)}
                primaryLabel={t('hero.cta')}
                secondaryHref="#process"
                secondaryLabel={t('hero.ctaSecondary')}
            />

            <Suspense fallback={null}>
                <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </Suspense>
        </>
    );
};
