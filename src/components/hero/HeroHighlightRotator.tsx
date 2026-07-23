import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Language } from '../../i18n/translations';

type HighlightPack = { prefix: string; words: string[] };

/** Matches live ukonnect.ai/nl phrase packs (pt added for local locales). */
const HIGHLIGHTS: Record<Language, HighlightPack> = {
    nl: {
        prefix: 'ambitieuze ',
        words: [
            'ondernemers.',
            'makelaars.',
            'beauty klinieken.',
            'bouwbedrijven.',
            'webshop ondernemers.',
            'horeca bedrijven.',
            'software bedrijven.',
        ],
    },
    en: {
        prefix: 'ambitious ',
        words: [
            'entrepreneurs.',
            'agencies.',
            'beauty clinics.',
            'construction firms.',
            'webshop entrepreneurs.',
            'hospitality businesses.',
            'software companies.',
        ],
    },
    id: {
        prefix: '',
        words: [
            'pengusaha ambisius.',
            'agen properti.',
            'klinik kecantikan.',
            'perusahaan konstruksi.',
            'pengusaha webshop.',
            'bisnis kuliner.',
            'perusahaan software.',
        ],
    },
    pt: {
        prefix: '',
        words: [
            'marcas ambiciosas.',
            'agências imobiliárias.',
            'clínicas de beleza.',
            'empresas de construção.',
            'empreendedores de e-commerce.',
            'negócios de hotelaria.',
            'empresas de software.',
        ],
    },
};

const HOLD_MS = 3000;
const MIN_SCALE = 0.58;
/** Soft cinematic ease — premium, never snappy. */
const EASE = [0.16, 1, 0.3, 1] as const;
const EXIT_EASE = [0.4, 0, 0.2, 1] as const;

export function HeroHighlightRotator() {
    const { lang } = useLanguage();
    const reduced = Boolean(useReducedMotion());
    const pack = HIGHLIGHTS[lang] ?? HIGHLIGHTS.en;
    const [index, setIndex] = useState(0);
    const [scale, setScale] = useState(1);
    const [ready, setReady] = useState(reduced);
    const [pulseKey, setPulseKey] = useState(0);

    const shellRef = useRef<HTMLSpanElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);

    const phrases = useMemo(
        () => pack.words.map((word) => `${pack.prefix}${word}`),
        [pack],
    );
    const active = phrases[index % phrases.length] ?? phrases[0] ?? '';

    useEffect(() => {
        setIndex(0);
        setReady(reduced);
        if (reduced) return;
        const boot = window.setTimeout(() => setReady(true), 180);
        return () => window.clearTimeout(boot);
    }, [lang, reduced]);

    useEffect(() => {
        if (reduced || !ready || phrases.length <= 1) return;
        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % phrases.length);
            setPulseKey((k) => k + 1);
        }, HOLD_MS);
        return () => window.clearInterval(id);
    }, [phrases.length, reduced, lang, ready]);

    useLayoutEffect(() => {
        const fit = () => {
            const shell = shellRef.current;
            const measure = measureRef.current;
            if (!shell || !measure) return;

            const available = Math.max(0, shell.clientWidth - 2);
            const needed = measure.scrollWidth;
            if (!available || !needed) {
                setScale(1);
                return;
            }
            setScale(needed > available ? Math.max(MIN_SCALE, available / needed) : 1);
        };

        fit();

        const shell = shellRef.current;
        if (!shell || typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', fit);
            return () => window.removeEventListener('resize', fit);
        }

        const ro = new ResizeObserver(fit);
        ro.observe(shell);
        return () => ro.disconnect();
    }, [active, lang]);

    return (
        <motion.span
            ref={shellRef}
            className="cinematic-headline-accent cinematic-headline-rotator"
            initial={reduced ? false : { opacity: 0, y: 22, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : 0.28, ease: EASE }}
            aria-live="polite"
            aria-atomic="true"
            style={{ ['--rotator-scale' as string]: scale }}
        >
            <span ref={measureRef} className="cinematic-headline-rotator-measure" aria-hidden>
                {active}|
            </span>

            {/* Brand energy rail — pulses on each phrase swap */}
            <span className="cinematic-headline-rotator-rail" aria-hidden>
                <motion.i
                    key={`rail-${pulseKey}`}
                    initial={reduced ? false : { scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: [0, 1, 0.55] }}
                    transition={{ duration: reduced ? 0 : 0.85, ease: EASE }}
                />
            </span>

            {/* Soft cyan/violet bloom on swap */}
            {!reduced ? (
                <motion.span
                    key={`bloom-${pulseKey}`}
                    className="cinematic-headline-rotator-bloom"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: [0, 0.55, 0], scale: [0.85, 1.05, 1.12] }}
                    transition={{ duration: 0.9, ease: EASE }}
                    aria-hidden
                />
            ) : null}

            <span className="cinematic-headline-rotator-viewport">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={`${lang}-${active}`}
                        className="cinematic-headline-rotator-line"
                        initial={
                            reduced
                                ? false
                                : {
                                      opacity: 0,
                                      x: 18,
                                      filter: 'blur(8px)',
                                      clipPath: 'inset(0 100% 0 0)',
                                  }
                        }
                        animate={{
                            opacity: 1,
                            x: 0,
                            filter: 'blur(0px)',
                            clipPath: 'inset(0 0% 0 0)',
                        }}
                        exit={
                            reduced
                                ? undefined
                                : {
                                      opacity: 0,
                                      x: -14,
                                      filter: 'blur(6px)',
                                      clipPath: 'inset(0 0 0 100%)',
                                  }
                        }
                        transition={{
                            duration: reduced ? 0 : 0.62,
                            ease: reduced ? EASE : EXIT_EASE,
                            opacity: { duration: reduced ? 0 : 0.45 },
                            clipPath: { duration: reduced ? 0 : 0.62, ease: EASE },
                        }}
                    >
                        <span className="cinematic-headline-rotator-text">{active}</span>
                        <motion.span
                            className="cinematic-headline-cursor"
                            aria-hidden
                            initial={reduced ? false : { opacity: 0, scaleY: 0.4 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ delay: reduced ? 0 : 0.28, duration: 0.35, ease: EASE }}
                        />
                    </motion.span>
                </AnimatePresence>
            </span>

            <span className="cinematic-headline-rotator-nodes" aria-hidden />
        </motion.span>
    );
}
