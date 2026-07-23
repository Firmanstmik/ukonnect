import { lazy, Suspense, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';

const ContactFormModal = lazy(() =>
    import('./ContactFormModal').then((m) => ({ default: m.ContactFormModal })),
);

const EASE = [0.22, 1, 0.36, 1] as const;

type Option = { key: TranslationKey; score: number };
type Question = { qKey: TranslationKey; options: Option[] };

const QUESTIONS: Question[] = [
    {
        qKey: 'growthScore.q0',
        options: [
            { key: 'growthScore.q0.a0', score: 8 },
            { key: 'growthScore.q0.a1', score: 16 },
            { key: 'growthScore.q0.a2', score: 24 },
            { key: 'growthScore.q0.a3', score: 30 },
        ],
    },
    {
        qKey: 'growthScore.q1',
        options: [
            { key: 'growthScore.q1.a0', score: 6 },
            { key: 'growthScore.q1.a1', score: 14 },
            { key: 'growthScore.q1.a2', score: 20 },
            { key: 'growthScore.q1.a3', score: 25 },
        ],
    },
    {
        qKey: 'growthScore.q2',
        options: [
            { key: 'growthScore.q2.a0', score: 5 },
            { key: 'growthScore.q2.a1', score: 12 },
            { key: 'growthScore.q2.a2', score: 18 },
            { key: 'growthScore.q2.a3', score: 25 },
        ],
    },
    {
        qKey: 'growthScore.q3',
        options: [
            { key: 'growthScore.q3.a0', score: 4 },
            { key: 'growthScore.q3.a1', score: 10 },
            { key: 'growthScore.q3.a2', score: 16 },
            { key: 'growthScore.q3.a3', score: 20 },
        ],
    },
];

function scoreBand(score: number): 'emerging' | 'building' | 'scaling' | 'advanced' {
    if (score >= 85) return 'advanced';
    if (score >= 65) return 'scaling';
    if (score >= 40) return 'building';
    return 'emerging';
}

/**
 * Free Growth Score — interactive lead magnet.
 * Positions UKONNECT as a Growth Partner, not an AI software vendor.
 */
export function GrowthScore() {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const total = useMemo(
        () => answers.reduce((sum, score) => sum + score, 0),
        [answers],
    );
    const done = answers.length === QUESTIONS.length;
    const band = scoreBand(total);
    const progress = done ? 100 : (step / QUESTIONS.length) * 100;

    const select = (score: number) => {
        const next = [...answers.slice(0, step), score];
        setAnswers(next);
        if (step < QUESTIONS.length - 1) {
            window.setTimeout(() => setStep((s) => s + 1), 180);
        }
    };

    const reset = () => {
        setStep(0);
        setAnswers([]);
    };

    const question = QUESTIONS[step];

    return (
        <section id="growth-score" className="scroll-mt-28 relative overflow-hidden py-[60px] md:py-[80px] lg:py-[110px]">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div
                    className="absolute inset-0 opacity-70"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 18% 20%, rgba(0,212,232,0.08), transparent 42%), radial-gradient(circle at 82% 30%, rgba(86,0,227,0.1), transparent 46%), radial-gradient(circle at 50% 100%, rgba(86,0,227,0.05), transparent 40%)',
                    }}
                />
            </div>

            <div className="site-gutter-x relative mx-auto max-w-[1100px]">
                <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                        {t('growthScore.label')}
                    </p>
                    <h2 className="mb-4 font-display text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                        {t('growthScore.headingPre')}
                        <span className="bg-gradient-to-r from-[#5600e3] to-[#9b4dff] bg-clip-text text-transparent">
                            {t('growthScore.headingHighlight')}
                        </span>
                        {t('growthScore.headingPost')}
                    </h2>
                    <p className="text-lg text-slate-500">{t('growthScore.sub')}</p>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-[0_24px_80px_rgba(40,24,72,0.08)] backdrop-blur-xl sm:p-8 md:p-10">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                            {done
                                ? t('growthScore.resultBadge')
                                : `${t('growthScore.step')} ${step + 1} / ${QUESTIONS.length}`}
                        </div>
                        <span className="text-xs font-semibold text-slate-400">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#00d4e8] via-[#6c30ff] to-[#5600e3]"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.45, ease: EASE }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {!done && question ? (
                            <motion.div
                                key={`q-${step}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.35, ease: EASE }}
                            >
                                <h3 className="mb-6 max-w-2xl text-xl font-bold leading-snug text-slate-900 md:text-2xl">
                                    {t(question.qKey)}
                                </h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {question.options.map((option) => (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onClick={() => select(option.score)}
                                            className="group rounded-2xl border border-slate-200/90 bg-white/90 px-5 py-4 text-left text-[15px] font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white hover:text-slate-900 hover:shadow-[0_12px_32px_rgba(86,0,227,0.1)]"
                                        >
                                            <span className="inline-flex items-start gap-3">
                                                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-300 transition-colors group-hover:bg-primary" />
                                                {t(option.key)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, ease: EASE }}
                                className="grid items-center gap-8 lg:grid-cols-[auto_1fr]"
                            >
                                <div className="relative mx-auto grid h-40 w-40 place-items-center">
                                    <div
                                        className="absolute inset-0 rounded-full opacity-80"
                                        style={{
                                            background:
                                                'conic-gradient(from 210deg, #00d4e8, #6c30ff, #5600e3, #00d4e8)',
                                            mask: 'radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 9px))',
                                            WebkitMask:
                                                'radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 9px))',
                                        }}
                                    />
                                    <div className="text-center">
                                        <p className="font-display text-5xl font-extrabold tracking-tight text-slate-900">
                                            {total}
                                        </p>
                                        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                            / 100
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                                        {t(`growthScore.band.${band}.label` as TranslationKey)}
                                    </p>
                                    <h3 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">
                                        {t(`growthScore.band.${band}.title` as TranslationKey)}
                                    </h3>
                                    <p className="mb-7 max-w-xl text-[15px] leading-relaxed text-slate-500">
                                        {t(`growthScore.band.${band}.desc` as TranslationKey)}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setModalOpen(true)}
                                            className="uk-btn-premium group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-2xl px-7 py-3.5 text-[15px] font-semibold text-white"
                                        >
                                            <span className="uk-btn-premium-swipe" aria-hidden />
                                            <span className="uk-btn-premium-shine" aria-hidden />
                                            <span className="relative z-10 inline-flex items-center gap-2">
                                                {t('growthScore.cta')}
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={reset}
                                            className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-600 transition-colors hover:border-primary/20 hover:text-primary"
                                        >
                                            {t('growthScore.retake')}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Suspense fallback={null}>
                <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </Suspense>
        </section>
    );
}
