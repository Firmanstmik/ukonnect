import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft2,
    ArrowRight2,
    Chart21,
    CloseCircle,
    DocumentDownload,
    MagicStar,
    Mobile,
    MonitorMobbile,
    PresentionChart,
    Profile2User,
    Timer1,
} from 'iconsax-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { getAdjacentCaseStudies } from './caseStudyExperienceData';
import { CaseStudyGallery } from './CaseStudyGallery';
import { CaseStudyMetricGrid } from './CaseStudyMetricGrid';
import { CaseStudyTimeline } from './CaseStudyTimeline';
import { DemoBadge, IllustrativeBadge, GalleryFrame } from './CaseStudyPrimitives';
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
        <section className="border-t border-white/10 pt-10">
            <p className="font-mono text-[10px] tracking-[0.28em] text-white/40">{eyebrow}</p>
            <h4 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h4>
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
                className="absolute inset-0 bg-[#040915]/95 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${study.title} case study`}
                className="relative flex h-full w-full flex-col overflow-hidden bg-[#060d19] text-white"
                initial={{ opacity: 0, y: 18, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.99 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
            >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                        className="absolute left-[8%] top-0 h-[420px] w-[420px] rounded-full blur-[130px]"
                        style={{ background: `${study.theme.from}1f` }}
                    />
                    <div
                        className="absolute bottom-[12%] right-[6%] h-[380px] w-[380px] rounded-full blur-[140px]"
                        style={{ background: `${study.theme.to}1c` }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%,rgba(255,255,255,0.03)_100%)]" />
                </div>

                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-[#07111f]/78 px-5 py-4 backdrop-blur-xl md:px-8 lg:px-12">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/78">
                                <MagicStar size={14} variant="Bulk" color={study.theme.to} />
                                Case Study Experience
                            </span>
                            <DemoBadge className="border-white/12 bg-white/6 text-white/58">Illustrative Content</DemoBadge>
                            <IllustrativeBadge />
                        </div>
                        <p className="mt-2 truncate text-sm font-semibold text-white">{study.title}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                        <CloseCircle size={22} variant="Linear" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <section className="relative">
                        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-8 md:px-8 lg:min-h-[calc(100vh-76px)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:px-12 lg:py-14">
                            <div className="relative z-[2]">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span
                                        className="inline-flex rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/92 backdrop-blur-md"
                                        style={{ borderColor: `${study.theme.from}55`, background: `${study.theme.from}1f` }}
                                    >
                                        {study.industry}
                                    </span>
                                    <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/58">
                                        {study.clientName}
                                    </span>
                                </div>

                                <h2 className="mt-5 max-w-[13ch] text-4xl font-bold leading-[0.96] tracking-[-0.04em] text-white md:text-6xl lg:text-[4.75rem]">
                                    {study.title}
                                </h2>
                                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                                    {study.summary}
                                </p>

                                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                    <HeroMetaTile
                                        icon={<MonitorMobbile size={20} variant="Bulk" color={study.theme.to} />}
                                        label="Business Type"
                                        value={study.businessType}
                                    />
                                    <HeroMetaTile
                                        icon={<Timer1 size={20} variant="Bulk" color={study.theme.to} />}
                                        label="Duration"
                                        value={study.duration}
                                    />
                                    <HeroMetaTile
                                        icon={<Profile2User size={20} variant="Bulk" color={study.theme.to} />}
                                        label="Services"
                                        value={study.services.join(' · ')}
                                    />
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {study.metrics.map((metric) => (
                                        <div
                                            key={metric.label}
                                            className="min-w-[128px] rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-md"
                                        >
                                            <p
                                                className="text-2xl font-bold tracking-tight"
                                                style={{
                                                    backgroundImage: `linear-gradient(135deg, ${study.theme.from}, ${study.theme.to})`,
                                                    WebkitBackgroundClip: 'text',
                                                    backgroundClip: 'text',
                                                    color: 'transparent',
                                                }}
                                            >
                                                {metric.value}
                                            </p>
                                            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                                                {metric.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        disabled={!prev}
                                        onClick={() => prev && onNavigate(prev)}
                                        className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm font-semibold text-white/80 transition enabled:hover:border-white/22 enabled:hover:bg-white/10 disabled:opacity-35"
                                    >
                                        <ArrowLeft2 size={18} variant="Linear" />
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!next}
                                        onClick={() => next && onNavigate(next)}
                                        className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm font-semibold text-white/80 transition enabled:hover:border-white/22 enabled:hover:bg-white/10 disabled:opacity-35"
                                    >
                                        Next
                                        <ArrowRight2 size={18} variant="Linear" />
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/6 p-3 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.7)] backdrop-blur-md">
                                    <GalleryFrame
                                        item={hero}
                                        theme={study.theme}
                                        alt={study.coverAlt}
                                        className="min-h-[320px] rounded-[1.6rem] md:min-h-[520px]"
                                    />

                                    <div className="pointer-events-none absolute inset-x-8 bottom-8 top-auto flex flex-wrap gap-3">
                                        <FloatingInsight
                                            icon={<PresentionChart size={18} variant="Bulk" color={study.theme.to} />}
                                            label="Outcome"
                                            value={study.results}
                                        />
                                        <FloatingInsight
                                            icon={<Chart21 size={18} variant="Bulk" color={study.theme.to} />}
                                            label="Transformation"
                                            value={study.transform}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                    {study.gallery.slice(1, 4).map((item) => (
                                        <GalleryFrame
                                            key={item.id}
                                            item={item}
                                            theme={study.theme}
                                            alt={item.title}
                                            compact
                                            className="!aspect-[4/3] !rounded-[1.25rem] border-white/12 bg-white/5 !shadow-[0_16px_40px_-26px_rgba(0,0,0,0.55)]"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 lg:px-12 lg:py-18">
                        <SectionBlock eyebrow="THE JOURNEY" title="Before → Transform → Result">
                            <div className="grid gap-4 lg:grid-cols-3">
                                <JourneyCard tone="muted" label="Before" text={study.before} />
                                <JourneyCard tone="accent" label="Transform" text={study.transform} color={study.theme.from} />
                                <JourneyCard tone="success" label="Result" text={study.after} />
                            </div>
                        </SectionBlock>

                        <SectionBlock eyebrow="STRATEGY" title="What changed under the hood">
                            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                                <NarrativePanel
                                    icon={<PresentionChart size={20} variant="Bulk" color={study.theme.to} />}
                                    title="Challenge"
                                    body={study.challenge}
                                />
                                <NarrativePanel
                                    icon={<Chart21 size={20} variant="Bulk" color={study.theme.to} />}
                                    title="Solution"
                                    body={study.solution}
                                />
                            </div>
                            <div className="mt-4">
                                <NarrativePanel
                                    icon={<MagicStar size={20} variant="Bulk" color={study.theme.to} />}
                                    title="Implementation"
                                    body={study.implementation}
                                />
                            </div>
                        </SectionBlock>

                        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                            <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6">
                                        <Chart21 size={22} variant="Bulk" color={study.theme.to} />
                                    </span>
                                    <div>
                                        <p className="font-mono text-[10px] tracking-[0.2em] text-white/40">OUTCOMES</p>
                                        <h4 className="text-2xl font-semibold tracking-tight text-white">Performance snapshot</h4>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <CaseStudyMetricGrid metrics={study.metrics} theme={study.theme} editorial tone="dark" />
                                </div>
                                <p className="mt-5 text-sm leading-relaxed text-white/58">{study.businessOutcome}</p>
                            </section>

                            <section className="rounded-[2rem] border border-white/10 bg-[#0a1322]/92 p-6 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.55)] md:p-8">
                                <CaseStudyTimeline steps={study.timeline} theme={study.theme} tone="dark" />
                            </section>
                        </div>

                        <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#091221]/88 p-6 md:p-8">
                            <CaseStudyGallery key={gallerySeed} study={study} />
                        </div>

                        <SectionBlock eyebrow="TOOLS USED" title="Technology stack">
                            <div className="flex flex-wrap gap-2">
                                {study.technologies.map((tool) => (
                                    <span
                                        key={tool}
                                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-semibold text-white/72"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </SectionBlock>

                        <SectionBlock eyebrow="DELIVERABLES" title="Project surfaces and interfaces">
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {study.gallery.map((item) => (
                                    <GalleryFrame
                                        key={item.id}
                                        item={item}
                                        theme={study.theme}
                                        alt={study.coverAlt}
                                        className="border-white/10 bg-white/5"
                                    />
                                ))}
                            </div>
                        </SectionBlock>

                        <section className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.45)] md:p-8">
                            <div className="flex flex-wrap items-center gap-2">
                                <DemoBadge className="border-white/12 bg-white/6 text-white/58">Placeholder testimonial</DemoBadge>
                                <IllustrativeBadge />
                            </div>
                            <blockquote className="mt-6 max-w-4xl text-xl font-medium leading-relaxed tracking-tight text-white/92 md:text-3xl">
                                &ldquo;{study.testimonial.quote}&rdquo;
                            </blockquote>
                            <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold text-white"
                                        style={{ background: `linear-gradient(135deg, ${study.theme.from}, ${study.theme.to})` }}
                                    >
                                        {study.testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{study.testimonial.name}</p>
                                        <p className="text-sm text-white/52">{study.testimonial.role}</p>
                                        <p className="text-sm font-medium text-white/70">{study.testimonial.company}</p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2.5">
                                    <GoogleG />
                                    <GoogleStars delay={0.2} />
                                    <span className="text-[11px] font-bold uppercase tracking-wide text-white/58">
                                        Demo verification badge
                                    </span>
                                </div>
                            </div>
                        </section>

                        <SectionBlock eyebrow="WHAT COMES NEXT" title="Future optimization opportunities">
                            <ul className="grid gap-3 md:grid-cols-3">
                                {study.futureImprovements.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-relaxed text-white/65"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </SectionBlock>

                        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-dashed border-white/14 bg-white/[0.04] px-5 py-4">
                            <div>
                                <p className="text-sm font-semibold text-white">Download Case Study PDF</p>
                                <p className="mt-1 text-xs text-white/48">
                                    Demo control only. PDF export will be enabled once verified case studies are approved.
                                </p>
                            </div>
                            <button
                                type="button"
                                disabled
                                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white/36"
                            >
                                <DocumentDownload size={18} variant="Linear" />
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function HeroMetaTile({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white/72">{icon}</div>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">{label}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/78">{value}</p>
        </div>
    );
}

function FloatingInsight({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="max-w-[280px] rounded-[1.2rem] border border-white/12 bg-[#08111fd9] px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white/74">
                {icon}
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/44">{label}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/82">{value}</p>
        </div>
    );
}

function JourneyCard({
    label,
    text,
    tone,
    color,
}: {
    label: string;
    text: string;
    tone: 'muted' | 'accent' | 'success';
    color?: string;
}) {
    const toneClass =
        tone === 'accent'
            ? 'border-white/14 bg-white/8 text-white/86'
            : tone === 'success'
              ? 'border-emerald-400/20 bg-emerald-400/[0.08] text-white/82'
              : 'border-white/10 bg-white/5 text-white/76';

    return (
        <div className={`rounded-[1.6rem] border p-5 ${toneClass}`}>
            <p
                className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                style={{ color: tone === 'accent' && color ? color : undefined }}
            >
                {label}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{text}</p>
        </div>
    );
}

function NarrativePanel({
    icon,
    title,
    body,
}: {
    icon: ReactNode;
    title: string;
    body: string;
}) {
    return (
        <div className="rounded-[1.65rem] border border-white/10 bg-white/6 p-5 backdrop-blur-md md:p-6">
            <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/7">
                    {icon}
                </span>
                <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-white/38">DETAIL</p>
                    <h5 className="text-lg font-semibold tracking-tight text-white">{title}</h5>
                </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/66 md:text-[15px]">{body}</p>
        </div>
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
