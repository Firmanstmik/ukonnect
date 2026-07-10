import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, TrendingUp, TriangleAlert, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { EASE_OUT } from './motion';
import { AutomationFlow } from './AutomationFlow';
import { CaseStudyCard } from './CaseStudyCard';
import { TransformationTimeline } from './TransformationTimeline';
import { GoogleG, GoogleStars } from './CaseStudyWidgets';
import { CASE_STUDIES, METRICS_PENDING_VERIFICATION, type CaseStudy } from './caseStudyData';

const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: EASE_OUT },
    }),
};

const PANEL_ID = 'case-study-transformation-panel';

export const CaseStudies = () => {
    const { t } = useLanguage();
    const [activeId, setActiveId] = useState<string | null>(null);
    const activeStudy = CASE_STUDIES.find((s) => s.id === activeId) ?? null;

    const toggleStudy = useCallback(
        (study: CaseStudy) => setActiveId((prev) => (prev === study.id ? null : study.id)),
        [],
    );
    const closeStudy = useCallback(() => setActiveId(null), []);

    // The cinematic overlay owns the viewport while open — lock body scroll and let Escape close it.
    useEffect(() => {
        if (!activeId) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeStudy();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [activeId, closeStudy]);

    return (
        <section id="case-studies" className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[120px]">
            {/* ── Ambient background: a single calm wash + faint grid ── */}
            <div className="pointer-events-none absolute inset-0 case-studies-dot-grid opacity-[0.25]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-full max-w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/[0.04] to-transparent blur-3xl" />
            <div className="pointer-events-none absolute top-40 -left-40 h-[460px] w-[460px] rounded-full bg-primary/[0.04] blur-[140px]" />

            <div className="relative mx-auto max-w-[1300px] px-6">
                {/* Dev-only guardrail: placeholder data must be verified before it ships. */}
                {import.meta.env.DEV && METRICS_PENDING_VERIFICATION && (
                    <div className="mx-auto mb-10 flex max-w-2xl items-center justify-center gap-2 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-2.5 text-center text-xs font-semibold text-amber-700">
                        <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                        Placeholder metrics. Pending founder verification before production.
                    </div>
                )}

                {/* ── Header ── */}
                <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary"
                    >
                        {t('caseStudies.label')}
                    </motion.div>

                    <motion.h2
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mb-6 text-balance text-3xl font-bold leading-[1.12] tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
                    >
                        {t('caseStudies.headingPre')}
                        <span className="bg-gradient-to-r from-[#5600e3] to-[#9b4dff] bg-clip-text text-transparent">
                            {t('caseStudies.headingHighlight')}
                        </span>
                        {t('caseStudies.headingPost')}
                    </motion.h2>

                    <motion.p
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mx-auto max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
                    >
                        {t('caseStudies.sub')}
                    </motion.p>
                </div>

                {/* ── Story cards — horizontal snap on mobile, grid on larger ── */}
                <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 scrollbar-hide md:mx-0 md:grid md:grid-cols-2 md:snap-none md:gap-7 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
                    {CASE_STUDIES.map((study, index) => (
                        <div key={study.id} className="w-[min(88vw,360px)] flex-shrink-0 snap-center md:w-auto md:flex-shrink">
                            <CaseStudyCard
                                study={study}
                                index={index}
                                ctaLabel={t('caseStudies.ctaExplore')}
                                collapseLabel={t('caseStudies.timeline.collapse')}
                                challengeLabel={t('caseStudies.challengeLabel')}
                                isActive={activeId === study.id}
                                panelId={PANEL_ID}
                                onExplore={toggleStudy}
                                t={t}
                            />
                        </div>
                    ))}
                </div>

                {/* ── Signature AI automation flow ── */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                    className="relative mt-16 md:mt-24"
                >
                    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-24px_rgba(15,23,42,0.14)] md:p-12">
                        <div className="relative">
                            <div className="mb-10 text-center">
                                <span className="mb-3 block text-sm font-semibold uppercase tracking-wide text-primary">
                                    {t('caseStudies.workflow.label')}
                                </span>
                                <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                                    {t('caseStudies.workflow.title')}
                                </h3>
                                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
                                    {t('caseStudies.workflow.sub')}
                                </p>
                            </div>
                            <AutomationFlow t={t} />
                        </div>
                    </div>
                </motion.div>

                {/* ── Featured testimonial ── */}
                <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.75, ease: EASE_OUT }}
                    className="group relative mt-16 md:mt-24"
                >
                    <div className="absolute -inset-[1px] rounded-[2.25rem] bg-gradient-to-br from-primary/25 via-[#9b4dff]/15 to-primary/10 opacity-60 blur-[0.5px] transition-opacity duration-700 group-hover:opacity-100" />

                    <div className="relative overflow-hidden rounded-[2.2rem] border border-slate-200/60 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 -translate-y-1/3 translate-x-1/4 rounded-full bg-gradient-to-bl from-primary/8 to-transparent" />
                        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-[#9b4dff]/8 to-transparent" />

                        <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:gap-14 lg:p-14">
                            {/* Quote */}
                            <div className="text-center lg:text-left">
                                <svg className="mx-auto mb-6 h-12 w-12 text-primary/15 lg:mx-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                                </svg>

                                <blockquote className="text-xl font-medium leading-[1.55] tracking-tight text-slate-800 md:text-2xl lg:text-[1.7rem]">
                                    &ldquo;{t('caseStudies.featured.quote')}&rdquo;
                                </blockquote>

                                {/* Business outcome */}
                                <div className="mt-7 inline-flex items-center gap-2.5 rounded-2xl border border-primary/15 bg-primary/[0.04] px-4 py-2.5">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-semibold text-primary">{t('caseStudies.featured.outcome')}</span>
                                </div>
                            </div>

                            {/* Author card */}
                            <div className="flex min-w-[240px] flex-col items-center lg:items-stretch">
                                <div className="w-full rounded-2xl border border-slate-200/70 bg-gradient-to-b from-slate-50/90 to-white p-6 text-center shadow-sm">
                                    <div className="relative mb-4 inline-block">
                                        <div
                                            className="relative flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white shadow-md ring-4 ring-white"
                                            style={{ background: 'linear-gradient(135deg, #5600e3, #9b4dff)' }}
                                        >
                                            {t('caseStudies.featured.initials')}
                                        </div>
                                    </div>

                                    <p className="text-lg font-bold tracking-tight text-slate-900">{t('caseStudies.featured.name')}</p>
                                    <p className="mt-1 text-sm text-slate-500">{t('caseStudies.featured.role')}</p>

                                    {/* Company logo lockup */}
                                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 shadow-sm">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white">
                                            {t('caseStudies.featured.company').slice(0, 1)}
                                        </span>
                                        <span className="text-xs font-bold tracking-tight text-slate-700">
                                            {t('caseStudies.featured.company')}
                                        </span>
                                    </div>

                                    <div className="mt-5 flex items-center justify-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-4 py-2.5 shadow-sm">
                                        <GoogleG />
                                        <GoogleStars delay={0.4} />
                                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                                            {t('caseStudies.featured.googleBadge')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Cinematic transformation reveal — slides in over the section like a film cut, not an inline expand ── */}
            <AnimatePresence>
                {activeStudy && (
                    <motion.div
                        key={activeStudy.id}
                        className="fixed inset-0 z-[90] flex justify-end"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {/* Backdrop — dims and blurs the page like a spotlight cut to the story */}
                        <motion.div
                            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                            onClick={closeStudy}
                            aria-hidden
                        />

                        {/* Panel — slides in from the right, full-bleed on mobile */}
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={t(activeStudy.titleKey)}
                            id={PANEL_ID}
                            variants={{ hidden: { x: '100%' }, visible: { x: 0 } }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex h-full w-full max-w-[900px] flex-col overflow-hidden bg-white shadow-[-30px_0_100px_rgba(0,0,0,0.4)] sm:rounded-l-[2rem]"
                        >
                            <div
                                className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-90"
                                style={{
                                    background: `linear-gradient(135deg, ${activeStudy.accentFrom}14 0%, transparent 55%, ${activeStudy.accentTo}0d 100%)`,
                                }}
                            />

                            {/* Panel header */}
                            <div className="relative flex items-start justify-between gap-4 border-b border-slate-100/80 px-6 pb-6 pt-7 sm:px-10 sm:pt-9">
                                <div>
                                    <span
                                        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                                        style={{
                                            color: activeStudy.accentFrom,
                                            background: `${activeStudy.accentFrom}0d`,
                                            border: `1px solid ${activeStudy.accentFrom}26`,
                                        }}
                                    >
                                        <Sparkles className="h-3.5 w-3.5" />
                                        {t('caseStudies.timeline.badge')}
                                    </span>
                                    <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                        {t(activeStudy.titleKey)}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeStudy}
                                    aria-label={t('caseStudies.modal.close')}
                                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-500 shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-slate-100 hover:text-slate-900 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* The story — scrolls within the panel */}
                            <div className="relative flex-1 overflow-y-auto px-6 pb-14 pt-8 sm:px-10">
                                <TransformationTimeline study={activeStudy} t={t} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
