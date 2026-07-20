import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export function HeroTrustBadge() {
    const { t } = useLanguage();
    const reduced = useReducedMotion();

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="cinematic-eyebrow inline-flex items-center gap-3"
        >
            <i aria-hidden />
            <span>{t('hero.badge')}</span>
            <i aria-hidden />
        </motion.div>
    );
}
