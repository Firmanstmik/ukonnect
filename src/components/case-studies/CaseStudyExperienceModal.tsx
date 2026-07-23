import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Download,
    Sparkles,
    X,
} from 'lucide-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { getAdjacentCaseStudies } from './caseStudyExperienceData';
import { CaseStudyGallery } from './CaseStudyGallery';
import { CaseStudyMetricGrid } from './CaseStudyMetricGrid';
import { CaseStudyTimeline } from './CaseStudyTimeline';
import { DemoBadge, IllustrativeBadge, PlaceholderFrame } from './CaseStudyPrimitives';
import { GoogleG, GoogleStars } from '../CaseStudyWidgets';
import { EASE_OUT } from '../motion';

type CaseStudyExperienceModalProps = {
    study: CaseStudyExperience;
    onClose: () => void;
    onNavigate: (study: CaseStudyExperience) => void;
};

function SectionBlock({
    eyebrow,
    title,
    children,
}: {
    eyebrow: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="border-t border-slate-200/70 pt-10">
            <p className="font-mono text-[10px] tracking-[0.28em] text-primary/55">{eyebrow}</p>
            <h4 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{title}</h4>
            <div className="mt-5">{children}</div>
        </section>
    );
}

export function CaseStudyExperienceModal({ study, onClose, onNavigate }: CaseStudyExperienceModalProps) {
    const { prev, next } = getAdjacentCaseStudies(study.id);
    const hero = study.gallery.find((item) => item.type === 'hero') ?? study.gallery[0];
    const [gallerySeed, setGallerySeed] = useState(study.id);

    useEffect(() => {
        setGallerySeed(study.id);
    }, [study.id]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-stretch justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.button
                type="button"
                aria-label="Close case study"
                className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${study.title} case study`}
                className="relative flex h-full w-full max-w-[1180px] flex-col overflow-hidden bg-[#f8fafc] shadow-[0_40px_120px_rgba(15,23,42,0.45)] md:my-6 md:h-[calc(100%-3rem)] md:rounded-[2rem]"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.985 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
            >
                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200/70 bg-white/85 px-5 py-4 backdrop-blur-xl md:px-8">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/75">
                                <Sparkles className="h-3.5 w-3.5" />
                                Case Study Experience
                            </span>
                            <DemoBadge>Placeholder Content</DemoBadge>
                            <IllustrativeBadge />
                        </div>
                        <p className="mt-2 truncate text-sm font-semibold text-slate-900">{study.title}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="relative">
                        <PlaceholderFrame item={hero} theme={study.theme} className="min-h-[280px] rounded-none md:min-h-[420px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-slate-950/20" />
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                            <span
                                className="inline-flex rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md"
                                style={{ borderColor: `${study.theme.from}55`, background: `${study.theme.from}33` }}
                            >
                                {study.industry}
                            </span>
                            <h2 className="mt-4 max-w-[16ch] text-3xl font-bold tracking-tight text-white md:text-5xl">
                                {study.title}
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/78 md:text-base">
                                {study.summary}
                            </p>
                        </div>
                    </div>

                    <div className="mx-auto max-w-[920px] px-5 py-10 md:px-8 md:py-14">
                        <div className="grid gap-4 md:grid-cols-3">
                            {[
                                { label: 'Business Type', value: study.businessType },
                                { label: 'Duration', value: study.duration },
                                { label: 'Services Delivered', value: study.services.join(' · ') },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-[1.25rem] border border-slate-200/70 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.16)]"
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                        {item.label}
                                    </p>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <SectionBlock eyebrow="THE JOURNEY" title="Before → Transform → Result">
                            <div className="grid gap-5 md:grid-cols-3">
                                <div className="rounded-[1.25rem] border border-slate-200/80 bg-slate-50/60 p-5">
                                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Before</p>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{study.before}</p>
                                </div>
                                <div
                                    className="rounded-[1.25rem] border p-5"
                                    style={{
                                        borderColor: `${study.theme.from}28`,
                                        background: `${study.theme.from}08`,
                                    }}
                                >
                                    <p
                                        className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                                        style={{ color: study.theme.from }}
                                    >
                                        Transform
                                    </p>
                                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{study.transform}</p>
                                </div>
                                <div className="rounded-[1.25rem] border border-emerald-100/80 bg-emerald-50/35 p-5">
                                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600/80">Result</p>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{study.after}</p>
                                </div>
                            </div>
                        </SectionBlock>

                        <SectionBlock eyebrow="CONTEXT" title="What we set out to solve">
                            <p className="text-base leading-relaxed text-slate-600">{study.challenge}</p>
                        </SectionBlock>

                        <SectionBlock eyebrow="SYSTEM DESIGN" title="How we built it">
                            <p className="text-base leading-relaxed text-slate-600">{study.solution}</p>
                        </SectionBlock>

                        <SectionBlock eyebrow="EXECUTION" title="How the build came together">
                            <p className="text-base leading-relaxed text-slate-600">{study.implementation}</p>
                        </SectionBlock>

                        <section className="mt-10 rounded-[1.5rem] border border-slate-200/70 bg-white p-6 md:p-8">
                            <CaseStudyMetricGrid metrics={study.metrics} theme={study.theme} editorial />
                            <p className="mt-5 text-sm leading-relaxed text-slate-500">{study.businessOutcome}</p>
                        </section>

                        <div className="mt-10">
                            <CaseStudyTimeline steps={study.timeline} theme={study.theme} />
                        </div>

                        <div className="mt-12">
                            <CaseStudyGallery key={gallerySeed} study={study} />
                        </div>

                        <SectionBlock eyebrow="TOOLS USED" title="Technology stack">
                            <div className="flex flex-wrap gap-2">
                                {study.technologies.map((tool) => (
                                    <span
                                        key={tool}
                                        className="rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </SectionBlock>

                        <SectionBlock eyebrow="SCREENSHOTS" title="Interface placeholders">
                            <div className="grid gap-4 md:grid-cols-2">
                                {study.gallery
                                    .filter((item) => item.type !== 'hero')
                                    .map((item) => (
                                        <PlaceholderFrame key={item.id} item={item} theme={study.theme} />
                                    ))}
                            </div>
                        </SectionBlock>

                        <section className="mt-10 overflow-hidden rounded-[1.6rem] border border-slate-200/70 bg-white p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.18)] md:p-8">
                            <div className="flex flex-wrap items-center gap-2">
                                <DemoBadge>Placeholder testimonial</DemoBadge>
                                <IllustrativeBadge />
                            </div>
                            <blockquote className="mt-6 text-xl font-medium leading-relaxed tracking-tight text-slate-800 md:text-2xl">
                                &ldquo;{study.testimonial.quote}&rdquo;
                            </blockquote>
                            <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold text-white"
                                        style={{ background: `linear-gradient(135deg, ${study.theme.from}, ${study.theme.to})` }}
                                    >
                                        {study.testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{study.testimonial.name}</p>
                                        <p className="text-sm text-slate-500">{study.testimonial.role}</p>
                                        <p className="text-sm font-medium text-slate-600">{study.testimonial.company}</p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-4 py-2.5">
                                    <GoogleG />
                                    <GoogleStars delay={0.2} />
                                    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                                        Demo verification badge
                                    </span>
                                </div>
                            </div>
                        </section>

                        <SectionBlock eyebrow="FUTURE IMPROVEMENTS" title="What comes next">
                            <ul className="space-y-3">
                                {study.futureImprovements.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </SectionBlock>

                        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-dashed border-slate-300/80 bg-white/70 px-5 py-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-800">Download Case Study PDF</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    Demo control only. PDF export will be enabled once verified case studies are approved.
                                </p>
                            </div>
                            <button
                                type="button"
                                disabled
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                            >
                                <Download className="h-4 w-4" />
                                Coming Soon
                            </button>
                        </div>

                        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200/70 pt-8 md:flex-row md:items-center md:justify-between">
                            <button
                                type="button"
                                disabled={!prev}
                                onClick={() => prev && onNavigate(prev)}
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition enabled:hover:border-primary/25 enabled:hover:text-primary disabled:opacity-40"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Previous Case Study
                            </button>
                            <button
                                type="button"
                                disabled={!next}
                                onClick={() => next && onNavigate(next)}
                                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition enabled:hover:border-primary/25 enabled:hover:text-primary disabled:opacity-40"
                            >
                                Next Case Study
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function CaseStudyExperienceModalHost({
    activeId,
    onClose,
    onNavigate,
    studies,
}: {
    activeId: string | null;
    onClose: () => void;
    onNavigate: (study: CaseStudyExperience) => void;
    studies: CaseStudyExperience[];
}) {
    const active = studies.find((study) => study.id === activeId) ?? null;

    return (
        <AnimatePresence>
            {active ? (
                <CaseStudyExperienceModal
                    key={active.id}
                    study={active}
                    onClose={onClose}
                    onNavigate={onNavigate}
                />
            ) : null}
        </AnimatePresence>
    );
}
