import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    ArrowLeft2,
    ArrowRight2,
    Chart21,
    CloseCircle,
    MagicStar,
    PresentionChart,
} from 'iconsax-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { getAdjacentCaseStudies } from './caseStudyExperienceData';
import { CaseStudyGallery } from './CaseStudyGallery';
import { CaseStudyMetricGrid } from './CaseStudyMetricGrid';
import { CaseStudyTimeline } from './CaseStudyTimeline';
import { GalleryFrame } from './CaseStudyPrimitives';
import { GoogleG, GoogleStars } from '../CaseStudyWidgets';
import { EASE_LUXURY } from '../motion';

type CaseStudyExperienceModalProps = {
    study: CaseStudyExperience;
    onClose: () => void;
    onNavigate: (study: CaseStudyExperience) => void;
};

function SectionBlock({
    eyebrow,
    title,
    children,
    className = '',
}: {
    eyebrow: string;
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section className={`pt-20 md:pt-24 ${className}`}>
            <div className="cs-lux-divider mb-14 md:mb-16" aria-hidden />
            <p className="font-mono text-[10px] tracking-[0.28em] text-white/32">{eyebrow}</p>
            <h4 className="mt-4 max-w-[18ch] text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-[2rem]">
                {title}
            </h4>
            <div className="mt-10 md:mt-12">{children}</div>
        </section>
    );
}

const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060d19]';

export function CaseStudyExperienceModal({ study, onClose, onNavigate }: CaseStudyExperienceModalProps) {
    const { prev, next } = getAdjacentCaseStudies(study.id);
    const hero = study.gallery.find((item) => item.type === 'hero') ?? study.gallery[0];
    const reduce = useReducedMotion();
    const closeRef = useRef<HTMLButtonElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();
        scrollRef.current?.scrollTo({ top: 0 });
        return () => {
            previouslyFocused?.focus?.();
        };
    }, [study.id]);

    useEffect(() => {
        const root = dialogRef.current;
        if (!root) return;

        const getFocusable = () =>
            Array.from(
                root.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            ).filter((el) => !el.closest('[aria-hidden="true"]'));

        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            const items = getFocusable();
            if (items.length === 0) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [study.id]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-stretch justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_LUXURY }}
        >
            <motion.button
                type="button"
                aria-label="Close case study"
                className="absolute inset-0 bg-[#030812]/96 backdrop-blur-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={`${study.title} case study`}
                className="relative flex h-full w-full flex-col overflow-hidden bg-[#060d19] text-white"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 8 }}
                transition={{ duration: 0.65, ease: EASE_LUXURY }}
            >
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <div
                        className="absolute left-[6%] top-[-8%] h-[520px] w-[520px] rounded-full blur-[150px]"
                        style={{ background: `${study.theme.from}12` }}
                    />
                    <div
                        className="absolute bottom-[8%] right-[4%] h-[460px] w-[460px] rounded-full blur-[160px]"
                        style={{ background: `${study.theme.to}10` }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_42%)]" />
                </div>

                <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.045] bg-[#07111f]/65 px-5 py-3.5 backdrop-blur-2xl md:px-8 lg:px-12">
                    <p className="min-w-0 truncate text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                        {study.clientName}
                    </p>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className={`cs-lux-btn inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/65 hover:border-white/16 hover:bg-white/[0.07] hover:text-white ${focusRing}`}
                    >
                        <CloseCircle size={20} variant="Outline" color="currentColor" />
                    </button>
                </div>

                <div ref={scrollRef} className="cs-lux-scroll flex-1 overflow-y-auto">
                    {/* Chapter: full-bleed visual + editorial intro */}
                    <section className="relative">
                        <div className="mx-auto grid max-w-[1340px] gap-14 px-5 py-12 md:px-8 lg:min-h-[calc(100vh-68px)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-20 lg:px-12 lg:py-20">
                            <div className="relative z-[2] max-w-[34rem]">
                                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                                    {study.industry}
                                </p>

                                <h2 className="mt-6 text-[2.35rem] font-bold leading-[1.02] tracking-[-0.045em] text-white md:text-5xl lg:text-[3.55rem]">
                                    {study.title}
                                </h2>

                                <p className="mt-7 max-w-[34ch] text-[1.02rem] leading-[1.75] text-white/58 md:text-[1.08rem]">
                                    {study.summary}
                                </p>

                                <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/[0.06] pt-8 text-sm">
                                    <div>
                                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/28">Duration</p>
                                        <p className="mt-2 text-white/70">{study.duration}</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/28">Services</p>
                                        <p className="mt-2 max-w-[28ch] text-white/70">{study.services.join(' · ')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="cs-lux-frame relative">
                                <div className="overflow-hidden rounded-[1.85rem]">
                                    <GalleryFrame
                                        item={hero}
                                        theme={study.theme}
                                        alt={study.coverAlt}
                                        stage
                                        showCaption={false}
                                        className="min-h-[360px] rounded-[1.85rem] md:min-h-[560px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="mx-auto max-w-[1040px] px-5 pb-24 pt-4 md:px-8 lg:px-12 lg:pb-32">
                        {/* Chapter: quiet editorial journey */}
                        <SectionBlock eyebrow="THE JOURNEY" title="Where the brand stood, and where it moved">
                            <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
                                <JourneyCard tone="muted" label="Before" text={study.before} />
                                <JourneyCard tone="accent" label="Transform" text={study.transform} color={study.theme.from} />
                                <JourneyCard tone="success" label="Result" text={study.after} />
                            </div>
                        </SectionBlock>

                        {/* Chapter: soft ambient strategy — less boxed, more editorial wash */}
                        <section className="relative mt-20 md:mt-24">
                            <div className="cs-lux-divider mb-14 md:mb-16" aria-hidden />
                            <p className="font-mono text-[10px] tracking-[0.28em] text-white/32">STRATEGY</p>
                            <h4 className="mt-4 max-w-[18ch] text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-[2rem]">
                                What changed under the hood
                            </h4>
                            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
                                <NarrativePanel
                                    icon={<PresentionChart size={20} variant="Outline" color={study.theme.to} />}
                                    title="Challenge"
                                    body={study.challenge}
                                />
                                <NarrativePanel
                                    icon={<Chart21 size={20} variant="Outline" color={study.theme.to} />}
                                    title="Solution"
                                    body={study.solution}
                                />
                            </div>
                            <div className="mt-14 max-w-3xl border-t border-white/[0.06] pt-12">
                                <NarrativePanel
                                    icon={<MagicStar size={20} variant="Outline" color={study.theme.to} />}
                                    title="Implementation"
                                    body={study.implementation}
                                />
                            </div>
                        </section>

                        {/* Chapter: metrics + timeline — asymmetric breathing */}
                        <div className="mt-20 grid gap-16 md:mt-24 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-20">
                            <div className="cs-lux-divider xl:hidden" aria-hidden />
                            <section className="pt-16 xl:pt-20">
                                <p className="font-mono text-[10px] tracking-[0.28em] text-white/32">OUTCOMES</p>
                                <h4 className="mt-4 text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white md:text-[2rem]">
                                    Performance snapshot
                                </h4>
                                <div className="mt-10">
                                    <CaseStudyMetricGrid metrics={study.metrics} theme={study.theme} editorial tone="dark" />
                                </div>
                                <p className="mt-9 max-w-[40ch] text-[15.5px] leading-[1.75] text-white/52">
                                    {study.businessOutcome}
                                </p>
                            </section>

                            <section className="pt-4 xl:pt-20">
                                <CaseStudyTimeline steps={study.timeline} theme={study.theme} tone="dark" />
                            </section>
                        </div>

                        {/* Chapter: immersive gallery */}
                        <div className="mt-20 md:mt-24">
                            <div className="cs-lux-divider mb-14 md:mb-16" aria-hidden />
                            <CaseStudyGallery key={study.id} study={study} />
                        </div>

                        {/* Chapter: quiet tools */}
                        <SectionBlock eyebrow="TOOLS USED" title="Technology stack">
                            <ul className="flex flex-wrap gap-x-5 gap-y-3">
                                {study.technologies.map((tool) => (
                                    <li
                                        key={tool}
                                        className="border-b border-white/[0.08] pb-1 text-[13px] font-medium tracking-wide text-white/55"
                                    >
                                        {tool}
                                    </li>
                                ))}
                            </ul>
                        </SectionBlock>

                        {/* Chapter: quote exhibition */}
                        <section className="mt-20 md:mt-28">
                            <div className="cs-lux-divider mb-14 md:mb-16" aria-hidden />
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/32">Client voice</p>
                            <blockquote className="mt-10 max-w-[28ch] text-[1.85rem] font-medium leading-[1.32] tracking-[-0.02em] text-white/92 md:max-w-[22ch] md:text-[2.35rem]">
                                &ldquo;{study.testimonial.quote}&rdquo;
                            </blockquote>
                            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white"
                                        style={{ background: `linear-gradient(145deg, ${study.theme.from}, ${study.theme.to})` }}
                                        aria-hidden
                                    >
                                        {study.testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold tracking-tight text-white">{study.testimonial.name}</p>
                                        <p className="mt-1 text-sm text-white/42">{study.testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-2 opacity-50" aria-hidden>
                                    <GoogleG />
                                    <GoogleStars delay={0.2} />
                                </div>
                            </div>
                        </section>

                        {/* Chapter: sparse future */}
                        <SectionBlock eyebrow="WHAT COMES NEXT" title="Future opportunities">
                            <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
                                {study.futureImprovements.map((item) => (
                                    <li
                                        key={item}
                                        className="border-t border-white/[0.08] pt-6 text-[14.5px] leading-[1.7] text-white/55"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </SectionBlock>

                        {/* Closing nav — no unfinished CTAs */}
                        <div className="mt-20 flex flex-wrap items-center gap-2.5 border-t border-white/[0.05] pt-12 md:mt-24">
                            <button
                                type="button"
                                disabled={!prev}
                                onClick={() => prev && onNavigate(prev)}
                                className={`cs-lux-btn inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/70 enabled:hover:border-white/16 enabled:hover:bg-white/[0.06] enabled:hover:text-white disabled:opacity-28 ${focusRing}`}
                            >
                                <ArrowLeft2 size={18} variant="Outline" color="currentColor" />
                                Previous
                            </button>
                            <button
                                type="button"
                                disabled={!next}
                                onClick={() => next && onNavigate(next)}
                                className={`cs-lux-btn inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/70 enabled:hover:border-white/16 enabled:hover:bg-white/[0.06] enabled:hover:text-white disabled:opacity-28 ${focusRing}`}
                            >
                                Next
                                <ArrowRight2 size={18} variant="Outline" color="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
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
    return (
        <div className="border-t border-white/[0.08] pt-6">
            <p
                className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white/32"
                style={{
                    color:
                        tone === 'accent' && color
                            ? color
                            : tone === 'success'
                              ? 'rgba(110,231,183,0.85)'
                              : undefined,
                }}
            >
                {label}
            </p>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/62">{text}</p>
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
        <div>
            <div className="flex items-center gap-3.5">
                <span className="flex h-9 w-9 items-center justify-center text-white/70" aria-hidden>
                    {icon}
                </span>
                <h5 className="text-lg font-semibold tracking-tight text-white">{title}</h5>
            </div>
            <p className="mt-6 text-[15.5px] leading-[1.75] text-white/54">{body}</p>
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
