import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TriangleAlert } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { EASE_OUT } from './motion';
import {
    CASE_STUDY_DATA_PENDING_VERIFICATION,
    CASE_STUDY_EXPERIENCES,
    type CaseStudyExperience,
} from './case-studies/caseStudyExperienceData';
import { CaseStudyExperienceModalHost } from './case-studies/CaseStudyExperienceModal';
import { CaseStudyFeaturedCard } from './case-studies/CaseStudyFeaturedCard';
import { DemoBadge, IllustrativeBadge } from './case-studies/CaseStudyPrimitives';

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
    const [activeId, setActiveId] = useState<string | null>(null);

    const openStudy = useCallback((study: CaseStudyExperience) => setActiveId(study.id), []);
    const closeStudy = useCallback(() => setActiveId(null), []);
    const navigateStudy = useCallback((study: CaseStudyExperience) => setActiveId(study.id), []);

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

                <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mb-4 flex flex-wrap items-center justify-center gap-2"
                    >
                        <span className="text-sm font-semibold uppercase tracking-wide text-primary">{t('caseStudies.label')}</span>
                        <DemoBadge>Framework Preview</DemoBadge>
                    </motion.div>

                    <motion.h2
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mb-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-4xl lg:text-[3.35rem]"
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

                    <motion.div
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={headerVariants}
                        className="mt-5 flex flex-wrap items-center justify-center gap-2"
                    >
                        <IllustrativeBadge />
                        <DemoBadge>Pending Founder Verification</DemoBadge>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-7 xl:grid-cols-3 xl:gap-8">
                    {CASE_STUDY_EXPERIENCES.map((study, index) => (
                        <CaseStudyFeaturedCard
                            key={study.id}
                            study={study}
                            index={index}
                            onOpen={openStudy}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                    className="mx-auto mt-12 max-w-3xl rounded-[1.5rem] border border-slate-200/70 bg-white/75 px-5 py-4 text-center text-sm leading-relaxed text-slate-500 backdrop-blur-sm md:px-8 md:py-5"
                >
                    This section is a premium case study framework. Replace the structured demo data with verified client projects when ready.
                    No layout changes required.
                </motion.div>
            </div>

            <CaseStudyExperienceModalHost
                activeId={activeId}
                onClose={closeStudy}
                onNavigate={navigateStudy}
                studies={CASE_STUDY_EXPERIENCES}
            />
        </section>
    );
};
