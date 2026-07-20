import { useEffect, useMemo, useState } from 'react';
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

const HOLD_MS = 2600;
const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroHighlightRotator() {
    const { lang } = useLanguage();
    const reduced = Boolean(useReducedMotion());
    const pack = HIGHLIGHTS[lang] ?? HIGHLIGHTS.en;
    const [index, setIndex] = useState(0);

    const phrases = useMemo(
        () => pack.words.map((word) => `${pack.prefix}${word}`),
        [pack],
    );
    const longest = useMemo(
        () => phrases.reduce((a, b) => (a.length >= b.length ? a : b), phrases[0] ?? ''),
        [phrases],
    );
    const active = phrases[index % phrases.length] ?? longest;

    useEffect(() => {
        setIndex(0);
    }, [lang]);

    useEffect(() => {
        if (reduced || phrases.length <= 1) return;
        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % phrases.length);
        }, HOLD_MS);
        return () => window.clearInterval(id);
    }, [phrases.length, reduced, lang]);

    return (
        <motion.span
            className="cinematic-headline-accent cinematic-headline-rotator text-[1.15em] sm:text-[1.18em]"
            initial={reduced ? false : { opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.2, ease: EASE }}
            aria-live="polite"
            aria-atomic="true"
        >
            {/* Reserve width/height for the longest phrase so long swaps never clip. */}
            <span className="cinematic-headline-rotator-sizer" aria-hidden>
                {longest}
            </span>

            <span className="cinematic-headline-rotator-viewport">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={`${lang}-${active}`}
                        className="cinematic-headline-rotator-line"
                        initial={
                            reduced
                                ? false
                                : { opacity: 0, y: 10, filter: 'blur(4px)', scale: 0.992 }
                        }
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                        exit={
                            reduced
                                ? undefined
                                : { opacity: 0, y: -8, filter: 'blur(3px)', scale: 0.995 }
                        }
                        transition={{
                            duration: reduced ? 0 : 0.48,
                            ease: EASE,
                        }}
                    >
                        <span className="cinematic-headline-rotator-text">{active}</span>
                        <span className="cinematic-headline-cursor" aria-hidden>
                            |
                        </span>
                    </motion.span>
                </AnimatePresence>
            </span>

            <span className="cinematic-headline-rotator-nodes" aria-hidden />
        </motion.span>
    );
}
