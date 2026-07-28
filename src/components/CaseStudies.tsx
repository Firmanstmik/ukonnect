import { useCallback, useEffect, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { TriangleAlert } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { EASE_OUT } from './motion';
import {
    CASE_STUDY_DATA_PENDING_VERIFICATION,
    CASE_STUDY_EXPERIENCES,
    type CaseStudyExperience,
} from './case-studies/caseStudyExperienceData';
import { CaseStudyCompactCard } from './case-studies/CaseStudyCompactCard';
import { CaseStudyExpandOverlay } from './case-studies/CaseStudyExpandOverlay';
import { CaseStudyExperienceModalHost } from './case-studies/CaseStudyExperienceModal';
import { SectionTitle } from './SectionHeadingAccent';

const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: EASE_OUT },
    }),
};

export const CaseStudies = () => {
    const { t } = useLanguage();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [deepId, setDeepId] = useState<string | null>(null);

    const expandedStudy = CASE_STUDY_EXPERIENCES.find((s) => s.id === expandedId) ?? null;
    const expandedIndex = Math.max(
        0,
        CASE_STUDY_EXPERIENCES.findIndex((s) => s.id === expandedId),
    );

    const expandStudy = useCallback((study: CaseStudyExperience) => setExpandedId(study.id), []);
    const closeExpand = useCallback(() => setExpandedId(null), []);
    const openDeep = useCallback((study: CaseStudyExperience) => {
        setDeepId(study.id);
    }, []);
    const closeDeep = useCallback(() => setDeepId(null), []);
    const navigateDeep = useCallback((study: CaseStudyExperience) => setDeepId(study.id), []);

    useEffect(() => {
        if (!expandedId && !deepId) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [expandedId, deepId]);

    return (
        <section id="case-studies" className="relative overflow-hidden py-[72px] md:py-[96px] lg:py-[132px]">
            <div className="pointer-events-none absolute inset-0 case-studies-dot-grid opacity-[0.16]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-full max-w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/[0.045] to-transparent blur-3xl" />
            <div className="pointer-events-none absolute top-36 -left-36 h-[420px] w-[420px] rounded-full bg-primary/[0.04] blur-[130px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#9b4dff]/[0.04] blur-[120px]" />

            <div className="relative mx-auto max-w-[1300px] px-6">
                {import.meta.env.DEV && CASE_STUDY_DATA_PENDING_VERIFICATION && (
                    <div className="mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-amber-300/60 bg-amber-50/90 px-4 py-3 text-center text-xs font-semibold text-amber-700">
                        <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                        Demo case study framework only. All metrics, quotes, and visuals are illustrative and pending founder verification.
                    </div>
                )}

                <div className="mx-auto mb-20 max-w-2xl text-center md:mb-24 lg:mb-28">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mb-6"
                    >
                        <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t('caseStudies.label')}</span>
                    </motion.div>

                    <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={headerVariants}>
                        <SectionTitle
                            pre={t('caseStudies.headingPre')}
                            highlight={t('caseStudies.headingHighlight')}
                            post={t('caseStudies.headingPost')}
                            className="mb-7"
                        />
                    </motion.div>

                    <motion.p
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mx-auto max-w-lg text-base leading-[1.75] text-slate-500 md:text-lg"
                    >
                        {t('caseStudies.sub')}
                    </motion.p>
                </div>

                <LayoutGroup>
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
                        {CASE_STUDY_EXPERIENCES.map((study, index) =>
                            expandedId === study.id ? (
                                <div
                                    key={study.id}
                                    className="pointer-events-none invisible min-h-[320px]"
                                    aria-hidden
                                />
                            ) : (
                                <CaseStudyCompactCard
                                    key={study.id}
                                    study={study}
                                    index={index}
                                    onExpand={expandStudy}
                                />
                            ),
                        )}
                    </div>

                    <CaseStudyExpandOverlay
                        study={expandedStudy}
                        index={expandedIndex}
                        onClose={closeExpand}
                        onDeepOpen={openDeep}
                    />
                </LayoutGroup>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.65, ease: EASE_OUT }}
                    className="mx-auto mt-16 flex max-w-md flex-col items-center gap-5 text-center md:mt-20"
                >
                    <p className="text-sm leading-relaxed text-slate-500">
                        Select a project to explore the full case study.
                    </p>
                    <a
                        href="#cta"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[#4500b6]"
                    >
                        View all projects
                        <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </a>
                </motion.div>
            </div>

            <CaseStudyExperienceModalHost
                activeId={deepId}
                onClose={closeDeep}
                onNavigate={navigateDeep}
                studies={CASE_STUDY_EXPERIENCES}
            />
        </section>
    );
};
