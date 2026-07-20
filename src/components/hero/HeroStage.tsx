import type { CSSProperties, PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { PARTNERS } from '../partnersData';
import { HeroBrandLogo } from './HeroBrandLogo';
import { HeroTeamSpotlight } from './HeroTeamSpotlight';
import { HeroWorkflowBack, HeroWorkflowFront, HeroWorkflowNodes } from './HeroWorkflowEnergy';
import { WORKFLOW_NODES } from './heroDesign';

function ClientDestination({ compact = false }: { compact?: boolean }) {
    const { t } = useLanguage();
    const reduced = Boolean(useReducedMotion());
    const logos = PARTNERS;
    const track = [...logos, ...logos];
    const durationStyle = {
        '--client-marquee-duration': compact ? '28s' : '32s',
    } as CSSProperties;

    return (
        <div className={compact ? 'cinematic-client-destination cinematic-client-destination--mobile' : 'cinematic-client-destination'}>
            <span className="cinematic-client-destination-label">
                <i aria-hidden />
                {t('hero.clientEyebrow')}
            </span>
            <div className="cinematic-client-marquee" aria-label={t('hero.clientEyebrow')}>
                <div className={`cinematic-client-marquee-track${reduced ? ' is-static' : ''}`} style={durationStyle}>
                    {track.map((partner, index) => (
                        <img
                            key={`${partner.alt}-${index}`}
                            src={partner.src}
                            alt={index < logos.length ? partner.alt : ''}
                            loading="lazy"
                            aria-hidden={index >= logos.length}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DesktopStage({ animate }: { animate: boolean }) {
    const { t } = useLanguage();
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const smoothX = useSpring(pointerX, { stiffness: 48, damping: 20, mass: 0.9 });
    const smoothY = useSpring(pointerY, { stiffness: 48, damping: 20, mass: 0.9 });
    const teamX = useTransform(smoothX, [-1, 1], [-5, 5]);
    const teamY = useTransform(smoothY, [-1, 1], [-3, 3]);
    const lightX = useTransform(smoothX, [-1, 1], [-20, 20]);
    const lightY = useTransform(smoothY, [-1, 1], [-12, 12]);

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!animate || event.pointerType === 'touch') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
        pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
    };

    const reset = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <div
            className="cinematic-stage relative mx-auto w-full max-w-[720px] lg:ml-auto lg:max-w-none"
            data-cinematic-stage
            onPointerMove={onPointerMove}
            onPointerLeave={reset}
        >
            <div className="cinematic-stage-canvas relative aspect-[1000/800] w-full overflow-visible lg:origin-center">
                <div className="cinematic-stage-room pointer-events-none absolute inset-[-22%_-5%_-5%] z-0" aria-hidden />
                <div className="cinematic-stage-orbit pointer-events-none absolute z-[1]" aria-hidden />
                <div className="cinematic-stage-mesh pointer-events-none absolute inset-[-12%_0_0] z-[1]" aria-hidden />
                <div className="cinematic-stage-fog pointer-events-none absolute inset-0 z-[2]" aria-hidden />
                <motion.div
                    className="cinematic-stage-light pointer-events-none absolute inset-[1%_4%_4%] z-[3]"
                    style={animate ? { x: lightX, y: lightY } : undefined}
                    aria-hidden
                />

                <span className="cinematic-stage-spark cinematic-stage-spark--a" aria-hidden />
                <span className="cinematic-stage-spark cinematic-stage-spark--b" aria-hidden />
                <span className="cinematic-stage-spark cinematic-stage-spark--c" aria-hidden />
                <span className="cinematic-stage-spark cinematic-stage-spark--d" aria-hidden />

                <div className="cinematic-film-mark absolute left-[1.5%] top-[22%] z-[6]" aria-hidden>
                    <span>Human origin</span>
                    <i />
                    <small>AMSTERDAM · NL</small>
                </div>

                <HeroWorkflowBack animate={animate} />

                <motion.div
                    className="cinematic-team-hero-focus pointer-events-none absolute inset-x-[2%] bottom-[10%] top-[-4%] z-[20]"
                    style={animate ? { x: teamX, y: teamY } : undefined}
                >
                    <HeroTeamSpotlight className="h-full w-full" />
                </motion.div>

                <div className="cinematic-team-origin pointer-events-none absolute left-1/2 top-[65%] z-[25] -translate-x-1/2 -translate-y-1/2" aria-hidden>
                    <span />
                    <small>{t('hero.stageEyebrow')}</small>
                </div>

                <HeroWorkflowFront animate={animate} />
                <HeroWorkflowNodes animate={animate} />

                <div className="pointer-events-auto absolute bottom-[1.7%] left-1/2 z-[44] -translate-x-1/2">
                    <ClientDestination />
                </div>

                <div className="cinematic-stage-grain pointer-events-none absolute inset-[-2%] z-[50]" aria-hidden />
                <div className="cinematic-stage-vignette pointer-events-none absolute inset-[-3%] z-[51]" aria-hidden />
            </div>
        </div>
    );
}

function MobileStage({ animate }: { animate: boolean }) {
    const { t } = useLanguage();

    return (
        <div className="cinematic-mobile-stage relative mx-auto w-full max-w-[460px]" data-cinematic-stage>
            <div className="cinematic-mobile-scene relative aspect-[4/3.7] overflow-hidden rounded-[2rem]">
                <div className="cinematic-mobile-light pointer-events-none absolute inset-0" aria-hidden />
                <div className="absolute inset-x-0 top-5 z-20 text-center">
                    <span className="text-[8px] font-bold tracking-[0.24em] text-[#6C30FF]">{t('hero.mobileEyebrow')}</span>
                    <strong className="mt-1 block font-display text-[13px] text-[#080D19]">{t('hero.mobileTitle')}</strong>
                </div>
                <div className="cinematic-mobile-thread absolute inset-x-[4%] bottom-[7%] z-[8]" aria-hidden>
                    <i />
                    <span />
                </div>
                <HeroTeamSpotlight className="absolute inset-x-[-9%] bottom-0 top-[9%]" />
                <div className="cinematic-stage-grain pointer-events-none absolute inset-0 z-30" aria-hidden />
            </div>

            <div className="mt-3.5 flex items-center justify-between px-2">
                <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#718096]">{t('hero.mobileSwipe')}</span>
                <span className="text-[12px] text-[#6C30FF]" aria-hidden>→</span>
            </div>
            <div className="cinematic-mobile-workflow mt-2 flex gap-2 overflow-x-auto pb-2">
                {WORKFLOW_NODES.map((node, index) => (
                    <a key={node.id} href="#process" className="cinematic-mobile-node shrink-0">
                        <span aria-hidden>
                            {node.brands.slice(0, 2).map((brand) => <i key={brand}><HeroBrandLogo brand={brand} /></i>)}
                        </span>
                        <small>{node.step}</small>
                        <strong>{t(node.labelKey)}</strong>
                        {animate && index === 0 ? <b aria-hidden /> : null}
                    </a>
                ))}
            </div>

            <div className="mt-2">
                <ClientDestination compact />
            </div>
        </div>
    );
}

export function HeroStage() {
    const desktop = useMediaQuery('(min-width: 1024px)');
    const reducedMotion = useReducedMotion();
    return desktop ? <DesktopStage animate={!reducedMotion} /> : <MobileStage animate={!reducedMotion} />;
}
