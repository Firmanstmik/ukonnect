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
import { DemoBadge } from './case-studies/CaseStudyPrimitives';
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
        <section id="case-studies" className="relative overflow-hidden py-[60px] md:py-[80px] lg:py-[120px]">
            <div className="pointer-events-none absolute inset-0 case-studies-dot-grid opacity-[0.22]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-full max-w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/[0.05] to-transparent blur-3xl" />
            <div className="pointer-events-none absolute top-36 -left-36 h-[420px] w-[420px] rounded-full bg-primary/[0.05] blur-[130px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#9b4dff]/[0.05] blur-[120px]" />

            <div className="relative mx-auto max-w-[1300px] px-6">
                {import.meta.env.DEV && CASE_STUDY_DATA_PENDING_VERIFICATION && (
                    <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-center text-xs font-semibold text-amber-700">
                        <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                        Demo case study framework only. All metrics, quotes, and visuals are illustrative and pending founder verification.
                    </div>
                )}

                <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16 lg:mb-20">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mb-4 flex flex-wrap items-center justify-center gap-2"
                    >
                        <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t('caseStudies.label')}</span>
                        <DemoBadge>Documentary Archive</DemoBadge>
                    </motion.div>

                    <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={headerVariants}>
                        <SectionTitle
                            pre={t('caseStudies.headingPre')}
                            highlight={t('caseStudies.headingHighlight')}
                            post={t('caseStudies.headingPost')}
                            className="mb-5"
                        />
                    </motion.div>

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

                <LayoutGroup>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
                    className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-4 text-center"
                >
                    <p className="text-sm leading-relaxed text-slate-500">
                        Click a project to expand the documentary. Open Case Study for the full experience.
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
