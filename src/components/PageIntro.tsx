import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { UkonnectMark } from './UkonnectMark';

const EASE = [0.16, 1, 0.3, 1] as const;
const SESSION_KEY = 'ukonnect-intro-seen';

/**
 * One-shot brand curtain on first visit per session.
 * Cyan + violet panels part to reveal the site.
 */
export function PageIntro() {
    const reduced = Boolean(useReducedMotion());
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (reduced) return;
        try {
            if (sessionStorage.getItem(SESSION_KEY) === '1') return;
            sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
            /* private mode — still show once this mount */
        }
        setVisible(true);
        const done = window.setTimeout(() => setVisible(false), 1450);
        return () => window.clearTimeout(done);
    }, [reduced]);

    return (
        <AnimatePresence>
            {visible ? (
                <motion.div
                    className="page-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    aria-hidden
                >
                    <motion.div
                        className="page-intro-panel page-intro-panel--cyan"
                        initial={{ x: '0%' }}
                        animate={{ x: '-105%' }}
                        transition={{ duration: 0.95, delay: 0.35, ease: EASE }}
                    />
                    <motion.div
                        className="page-intro-panel page-intro-panel--violet"
                        initial={{ x: '0%' }}
                        animate={{ x: '105%' }}
                        transition={{ duration: 0.95, delay: 0.35, ease: EASE }}
                    />
                    <motion.div
                        className="page-intro-mark"
                        initial={{ opacity: 0, scale: 0.82, filter: 'blur(8px)' }}
                        animate={{ opacity: [0, 1, 1, 0], scale: [0.82, 1, 1.04, 1.08], filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(6px)'] }}
                        transition={{ duration: 1.15, ease: EASE }}
                    >
                        <UkonnectMark className="page-intro-mark-icon" />
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
