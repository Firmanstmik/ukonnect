import { motion, useReducedMotion } from 'framer-motion';
import teamPhoto from '../../assets/ukonnect-team-cutout.webp';
import { useLanguage } from '../../i18n/LanguageContext';
import { HERO_EASE } from './heroDesign';

type Props = {
    className?: string;
};

export function HeroTeamSpotlight({ className = '' }: Props) {
    const reduced = useReducedMotion();
    const { t } = useLanguage();

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.38, ease: HERO_EASE }}
            className={`hero-team-stage ${className}`}
        >
            <div className="hero-team-purple-bloom pointer-events-none absolute inset-[10%_8%_-2%] z-0" aria-hidden />
            <div className="hero-team-floor-glow pointer-events-none absolute inset-x-[10%] bottom-[-2%] h-[22%]" aria-hidden />
            <div className="hero-team-ground-shadow pointer-events-none absolute inset-x-[13%] bottom-[1%] h-[9%]" aria-hidden />
            <img
                src={teamPhoto}
                alt={t('hero.teamAvatars')}
                className="hero-team-photo relative z-10 mx-auto block h-full w-full max-w-[99%]"
                loading="eager"
                fetchPriority="high"
                width={900}
                height={991}
            />
        </motion.div>
    );
}
