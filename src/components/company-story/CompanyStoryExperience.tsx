import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight2 } from 'iconsax-react';
import { EASE_OUT } from '../motion';

const ContactFormModal = lazy(() => import('../ContactFormModal').then(m => ({ default: m.ContactFormModal })));
const EASE = [0.22, 1, 0.36, 1] as const;

type DocumentaryScene = {
    title: string;
    label: string;
    detail: string;
    note: string;
    tagline?: string;
    alt: string;
    mediaType: 'image' | 'video';
    src: string;
    poster?: string;
    focal?: string;
    frame: 'landscape' | 'panoramic';
};
type JourneyStep = { title: string; image: string; micro: string; focal?: string; tag: string; team: string };
type RoomCard = {
    title: string;
    image: string;
    blurb: string;
    pos: { top: string; left: string };
    focal?: string;
    team: string;
};
type CultureItem = {
    title: string;
    image: string;
    focal?: string;
    label: string;
    detail: string;
    note: string;
};

const JOURNEY_PHASE_MS = 5000;

function Reveal({
    children,
    delay = 0,
    className,
    variant = 'default',
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    variant?: 'default' | 'tech' | 'editorial' | 'immersive';
}) {
    const initial =
        variant === 'tech'
            ? { opacity: 0, y: 30, filter: 'blur(10px)' }
            : variant === 'editorial'
              ? { opacity: 0, x: -18, y: 14 }
              : variant === 'immersive'
                ? { opacity: 0, scale: 0.97, y: 22 }
                : { opacity: 0, y: 26 };
    const animate =
        variant === 'tech'
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : variant === 'editorial'
              ? { opacity: 1, x: 0, y: 0 }
              : variant === 'immersive'
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 1, y: 0 };

    return (
        <motion.div
            className={className}
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: variant === 'tech' ? 0.88 : 0.72, delay, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
    );
}

function SectionStage({
    children,
    className,
    variant = 'default',
}: {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'tech' | 'editorial' | 'immersive';
}) {
    const initial =
        variant === 'tech'
            ? { opacity: 0, y: 36, filter: 'blur(12px)' }
            : variant === 'editorial'
              ? { opacity: 0, y: 28, x: -10 }
              : variant === 'immersive'
                ? { opacity: 0, scale: 0.985, y: 24 }
                : { opacity: 0, y: 32 };
    const animate =
        variant === 'tech'
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : variant === 'editorial'
              ? { opacity: 1, y: 0, x: 0 }
              : variant === 'immersive'
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 1, y: 0 };

    return (
        <motion.div
            className={className}
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: '-7%' }}
            transition={{ duration: 0.95, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
    );
}

function AiPhaseScan({ phaseKey }: { phaseKey: string }) {
    return (
        <AnimatePresence>
            <motion.div
                key={phaseKey}
                initial={{ opacity: 0.65, y: '-110%' }}
                animate={{ opacity: 0, y: '120%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(180deg,transparent_0%,rgba(155,77,255,0.22)_48%,rgba(255,255,255,0.12)_52%,transparent_100%)]"
                aria-hidden
            />
        </AnimatePresence>
    );
}

function StoryImage({
    image,
    alt,
    className,
    focal,
    eager = false,
    zoom = false,
}: {
    image: string;
    alt: string;
    className?: string;
    focal?: string;
    eager?: boolean;
    zoom?: boolean;
}) {
    return (
        <img
            src={image}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            // @ts-expect-error fetchpriority is a valid DOM attribute
            fetchpriority={eager ? 'high' : undefined}
            decoding="async"
            style={focal ? { objectPosition: focal } : undefined}
            className={`${className ?? 'h-full w-full object-cover'}${
                zoom
                    ? ' transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.045]'
                    : ''
            }`}
            draggable={false}
        />
    );
}

// Hero parallax — image can be nudged inside the frame via focal / offset without moving the card.
function HeroFramedImage({
    image,
    alt,
    focal,
    imageOffsetY = 0,
}: {
    image: string;
    alt: string;
    focal?: string;
    imageOffsetY?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02]);
    const y = useTransform(scrollYProgress, [0, 1], [6 + imageOffsetY, -6 + imageOffsetY]);

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden">
            <motion.div
                style={{ scale, y, transformOrigin: 'center 18%' }}
                className="absolute inset-0 will-change-transform"
            >
                <StoryImage image={image} alt={alt} focal={focal} eager className="h-full w-full object-cover" />
            </motion.div>
        </div>
    );
}

function DocumentaryMediaChrome({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative h-full w-full">
            {children}
            <div className="pointer-events-none absolute inset-3 rounded-[0.8rem] border border-white/18 md:inset-4 md:rounded-[1rem]">
                <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/45 rounded-tl-sm" aria-hidden />
                <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-primary/45 rounded-tr-sm" aria-hidden />
                <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-primary/45 rounded-bl-sm" aria-hidden />
                <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/45 rounded-br-sm" aria-hidden />
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-[0.22] bg-[linear-gradient(rgba(155,77,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(155,77,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <motion.div
                animate={{ y: ['-120%', '220%'] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute inset-x-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(155,77,255,0.1),transparent)] opacity-35"
                aria-hidden
            />
        </div>
    );
}

function DocumentaryChapterButton({
    scene,
    idx,
    isActive,
    onSelect,
    variant = 'desktop',
}: {
    scene: DocumentaryScene;
    idx: number;
    isActive: boolean;
    onSelect: () => void;
    variant?: 'desktop' | 'mobile';
}) {
    const isDesktop = variant === 'desktop';

    return (
        <motion.button
            type="button"
            onClick={onSelect}
            aria-pressed={isActive}
            className={`group relative w-full text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 ${
                isDesktop
                    ? `rounded-xl py-3.5 pl-8 pr-3 ${isActive ? 'bg-primary/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]' : 'hover:bg-white/80 hover:shadow-[0_12px_32px_-24px_rgba(86,0,227,0.28)]'}`
                    : `rounded-xl border px-4 py-3.5 ${isActive ? 'border-primary/30 bg-primary/[0.06] shadow-[0_14px_36px_-22px_rgba(86,0,227,0.3)]' : 'border-transparent hover:border-primary/15 hover:bg-white/70 hover:shadow-[0_10px_28px_-18px_rgba(86,0,227,0.22)]'}`
            }`}
            whileHover={{ x: isDesktop ? 3 : 0, y: isDesktop ? 0 : -1 }}
            whileTap={{ scale: 0.997 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
        >
            {isDesktop ? (
                <span
                    className={`absolute left-0 top-3 bottom-3 w-px origin-top transition-all duration-500 ${
                        isActive
                            ? 'scale-y-100 bg-gradient-to-b from-primary/70 via-primary/35 to-transparent'
                            : 'scale-y-0 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent group-hover:scale-y-100'
                    }`}
                    aria-hidden
                />
            ) : null}

            {isDesktop ? (
                <span
                    className={`absolute left-[7px] top-4 h-2 w-2 rounded-full border transition-all duration-500 ${
                        isActive
                            ? 'border-primary/70 bg-primary shadow-[0_0_0_5px_rgba(86,0,227,0.18)]'
                            : 'border-slate-300/90 bg-white group-hover:border-primary/40 group-hover:shadow-[0_0_0_4px_rgba(86,0,227,0.08)]'
                    }`}
                    aria-hidden
                />
            ) : null}

            <p className={`font-mono text-[10px] tracking-[0.22em] tabular-nums transition-colors ${isActive ? 'text-primary/75' : 'text-slate-400 group-hover:text-primary/55'}`}>
                0{idx + 1}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span
                    className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 sm:text-[9px] ${
                        isActive
                            ? 'border-primary/28 bg-primary/[0.08] text-primary/75'
                            : 'border-transparent bg-transparent text-slate-400 group-hover:border-primary/12 group-hover:bg-primary/[0.04] group-hover:text-primary/55'
                    }`}
                >
                    {scene.label}
                </span>
            </div>
            <p
                className={`mt-2 font-semibold tracking-[-0.02em] transition-colors ${isDesktop ? 'text-[19px] xl:text-[21px] leading-[1.08]' : 'text-[17px]'} ${
                    isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                }`}
            >
                {isActive ? (
                    scene.title.includes(' ') ? (
                        <>
                            {scene.title.split(' ').slice(0, 2).join(' ')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] via-[#7c3aed] to-[#9b4dff]">
                                {scene.title.split(' ').slice(2).join(' ')}
                            </span>
                        </>
                    ) : (
                        scene.title
                    )
                ) : (
                    scene.title
                )}
            </p>
            <AnimatePresence initial={false}>
                {isActive ? (
                    <motion.p
                        key={`note-${idx}`}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: isDesktop ? 8 : 6 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                        className="overflow-hidden text-[13px] leading-[1.68] text-slate-500"
                    >
                        {scene.note}
                    </motion.p>
                ) : null}
            </AnimatePresence>
        </motion.button>
    );
}

function OpeningEditorialFrame({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`group relative ${className ?? ''}`}>
            <div className="pointer-events-none absolute -inset-x-5 -top-8 -bottom-8 -z-10 md:-inset-x-8 md:-top-10 md:-bottom-10" aria-hidden>
                <div className="absolute left-1/2 top-[40%] h-[76%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-[2.8rem] bg-[radial-gradient(circle_at_center,rgba(155,77,255,0.1),transparent_72%)] blur-[92px]" />
            </div>

            <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.85, ease: EASE_OUT }}
                className="relative rounded-[1.45rem] border border-white/88 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(252,250,247,0.97)_52%,rgba(246,241,234,0.98)_100%)] p-2 sm:rounded-[1.65rem] sm:p-2.5 md:rounded-[2rem] md:p-3 shadow-[0_1px_0_rgba(255,255,255,0.94)_inset,0_14px_36px_-26px_rgba(15,23,42,0.26),0_48px_96px_-44px_rgba(86,0,227,0.16)]"
            >
                <div className="relative overflow-hidden rounded-[1rem] bg-[#ebe6de] ring-1 ring-inset ring-slate-900/[0.07] sm:rounded-[1.25rem] md:rounded-[1.5rem]">
                    {children}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_-44px_96px_rgba(15,23,42,0.1)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_46%,rgba(15,23,42,0.13)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.11] mix-blend-soft-light bg-[linear-gradient(135deg,rgba(255,255,255,0.62)_0%,transparent_34%,transparent_66%,rgba(15,23,42,0.18)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(15,23,42,0.85)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(15,23,42,0.85)_0.5px,transparent_0.5px)] bg-[size:3px_3px]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_58%)]" />
                </div>
            </motion.div>
        </div>
    );
}

function DocumentaryCapsuleLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-full border border-white/78 bg-white/70 px-3.5 py-1.5 shadow-[0_1px_0_rgba(255,255,255,0.92)_inset,0_10px_22px_-12px_rgba(15,23,42,0.16)] backdrop-blur-md sm:px-4 sm:py-1.5">
            <p className="font-mono text-[9px] tracking-[0.32em] text-slate-500/88 sm:text-[10px]">{children}</p>
        </div>
    );
}

function StoryTagPill({
    children,
    active = false,
    className,
}: {
    children: React.ReactNode;
    active?: boolean;
    className?: string;
}) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[8px] tracking-[0.22em] uppercase transition-colors duration-500 sm:text-[9px] ${
                active
                    ? 'border-primary/28 bg-primary/[0.08] text-primary/78 shadow-[0_0_0_1px_rgba(86,0,227,0.06)]'
                    : 'border-slate-200/80 bg-white/55 text-slate-500/88'
            } ${className ?? ''}`}
        >
            {children}
        </span>
    );
}

function StoryTextAccent({ children, gradient = false }: { children: React.ReactNode; gradient?: boolean }) {
    if (gradient) {
        return (
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] via-[#7c3aed] to-[#9b4dff]">
                {children}
            </span>
        );
    }
    return <span className="font-medium text-slate-800">{children}</span>;
}

function StoryLiveEyebrow({ index, label }: { index: string; label: string }) {
    return (
        <div className="flex flex-wrap items-center gap-3 md:gap-3.5">
            <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-primary/62 tabular-nums md:text-[12px]">{index}</span>
            <span className="h-px w-7 bg-gradient-to-r from-primary/38 to-transparent md:w-10" />
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/14 bg-white/65 px-3 py-1.5 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_20px_-14px_rgba(86,0,227,0.22)] backdrop-blur-sm">
                <motion.span
                    animate={{ opacity: [1, 0.35, 1], scale: [1, 0.88, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(86,0,227,0.55)]"
                    aria-hidden
                />
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-primary/68 md:text-[10px]">{label}</span>
            </span>
        </div>
    );
}

function BehindSystemsSectionHeader({ className }: { className?: string }) {
    return (
        <div className={className}>
            <div className="flex flex-wrap items-center gap-2.5">
                <StoryTagPill active>DOCUMENTARY</StoryTagPill>
                <span className="font-mono text-[10px] tracking-[0.24em] text-slate-300">/</span>
                <StoryTagPill>CHAPTER 01</StoryTagPill>
            </div>
            <h3 className="mt-4 text-[34px] leading-[0.94] tracking-[-0.04em] font-semibold text-slate-900 lg:text-[40px] xl:text-[52px]">
                Behind the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] via-[#7c3aed] to-[#9b4dff]">
                    Systems
                </span>
            </h3>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.72] text-slate-500">
                Captured in Amsterdam. The same <StoryTextAccent>Marketing</StoryTextAccent>,{' '}
                <StoryTextAccent gradient>AI Systems</StoryTextAccent>, and{' '}
                <StoryTextAccent>Web Development</StoryTextAccent> teams you see in Our services, explored scene by scene.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                {['MARKETING', 'AI SYSTEMS', 'WEB'].map((tag) => (
                    <StoryTagPill key={tag} active={tag === 'AI SYSTEMS'}>
                        {tag}
                    </StoryTagPill>
                ))}
            </div>
        </div>
    );
}

function DocumentarySceneHeroCaption({ scene }: { scene: DocumentaryScene }) {
    const titleWords = scene.title.split(' ');
    const titleLead = titleWords.length > 2 ? titleWords.slice(0, 2).join(' ') : scene.title;
    const titleAccent = titleWords.length > 2 ? titleWords.slice(2).join(' ') : '';
    const taglineParts = scene.tagline?.split('·').map((part) => part.trim()).filter(Boolean) ?? [];

    return (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.62)_0%,rgba(15,23,42,0.28)_38%,transparent_68%)]"
                aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/10" aria-hidden />

            <AnimatePresence mode="wait">
                <motion.figcaption
                    key={`hero-caption-${scene.title}`}
                    initial={{ opacity: 0, y: 14, scale: 0.97, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(3px)' }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                    className="relative w-full max-w-[min(92%,34rem)] text-center"
                >
                    <div className="relative overflow-hidden rounded-[1.1rem] border border-white/24 bg-slate-950/42 px-5 py-5 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl sm:rounded-[1.25rem] sm:px-7 sm:py-6 md:px-8 md:py-7">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_42%,rgba(86,0,227,0.12)_100%)]" aria-hidden />
                        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" aria-hidden />

                        <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-primary/55 rounded-tl-sm sm:left-4 sm:top-4" aria-hidden />
                        <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-primary/55 rounded-tr-sm sm:right-4 sm:top-4" aria-hidden />
                        <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-primary/55 rounded-bl-sm sm:bottom-4 sm:left-4" aria-hidden />
                        <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-primary/55 rounded-br-sm sm:bottom-4 sm:right-4" aria-hidden />

                        <div className="relative flex flex-wrap items-center justify-center gap-2">
                            <span className="inline-flex rounded-full border border-white/22 bg-white/10 px-3 py-1 font-mono text-[8px] tracking-[0.28em] text-white/82 sm:text-[9px]">
                                {scene.label.toUpperCase()}
                            </span>
                            {scene.mediaType === 'video' ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/20 px-2.5 py-1 font-mono text-[8px] tracking-[0.22em] text-white/88">
                                    <motion.span
                                        animate={{ opacity: [1, 0.35, 1] }}
                                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                                        className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(155,77,255,0.8)]"
                                        aria-hidden
                                    />
                                    LIVE LOOP
                                </span>
                            ) : null}
                        </div>

                        <p className="relative mt-4 text-[22px] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:mt-5 sm:text-[28px] md:text-[32px]">
                            {titleAccent ? (
                                <>
                                    {titleLead}{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4b4ff] via-[#9b4dff] to-[#f0e4ff]">
                                        {titleAccent}
                                    </span>
                                </>
                            ) : (
                                scene.title
                            )}
                        </p>

                        <p className="relative mx-auto mt-3 max-w-[36ch] text-[12.5px] leading-[1.72] text-white/78 sm:mt-3.5 sm:text-[13.5px] md:text-[14px]">
                            {scene.detail}
                        </p>

                        {taglineParts.length > 0 ? (
                            <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2">
                                {taglineParts.map((part) => (
                                    <span
                                        key={part}
                                        className="inline-flex rounded-full border border-white/14 bg-white/8 px-2.5 py-1 font-mono text-[7.5px] tracking-[0.2em] text-white/62 sm:text-[8px]"
                                    >
                                        {part}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </motion.figcaption>
            </AnimatePresence>
        </div>
    );
}

function OpeningRoleCompact({
    index,
    title,
    body,
    tag,
    delay = 0,
}: {
    index: number;
    title: string;
    body: string;
    tag?: string;
    delay?: number;
}) {
    return (
        <Reveal delay={delay}>
            <motion.div
                className="group relative flex h-full flex-col rounded-[1rem] border border-slate-200/70 bg-white/55 p-4 backdrop-blur-sm transition-all duration-500 hover:border-primary/22 hover:bg-white/88 hover:shadow-[0_14px_32px_-18px_rgba(86,0,227,0.22)] lg:p-3.5 xl:p-4"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
            >
                <div className="flex items-start justify-between gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/14 bg-gradient-to-br from-primary/[0.1] to-white/50 font-mono text-[9px] tracking-[0.16em] text-primary/72">
                        0{index}
                    </span>
                    {tag ? (
                        <span className="font-mono text-[7px] tracking-[0.2em] text-primary/45 transition-colors duration-500 group-hover:text-primary/58">
                            {tag}
                        </span>
                    ) : null}
                </div>
                <p className="mt-2.5 text-[13px] font-semibold tracking-[-0.02em] text-slate-900 xl:text-[14px]">{title}</p>
                <p className="mt-2 line-clamp-3 flex-1 text-[11.5px] leading-[1.62] text-slate-500 xl:text-[12px]">{body}</p>
            </motion.div>
        </Reveal>
    );
}

function OpeningTrustBand({ className }: { className?: string }) {
    const items = [
        { label: 'Based in', value: 'Amsterdam', signal: 'NL HQ' },
        { label: 'Delivery', value: 'In-house team', signal: 'NO OUTSOURCE' },
        { label: 'Focus', value: 'AI Growth System', signal: 'MKT · AI · WEB' },
    ];

    return (
        <div
            className={`flex h-full flex-col justify-between gap-2.5 rounded-[1rem] border border-slate-200/70 bg-gradient-to-br from-white/72 via-white/55 to-primary/[0.04] p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.92)_inset] lg:p-3 xl:p-3.5 ${className ?? ''}`}
        >
            <p className="font-mono text-[8px] tracking-[0.28em] text-primary/50">TRUST SIGNALS</p>
            {items.map((item, idx) => (
                <motion.div
                    key={item.label}
                    className="rounded-lg border border-slate-200/55 bg-white/55 px-3 py-2.5 transition-colors duration-500 hover:border-primary/18 hover:bg-white/80"
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: EASE_OUT }}
                >
                    <div className="flex items-center justify-between gap-2">
                        <p className="font-mono text-[7px] tracking-[0.22em] text-primary/45">{item.label.toUpperCase()}</p>
                        <StoryTagPill className="!px-1.5 !py-0.5 !text-[6.5px]">{item.signal}</StoryTagPill>
                    </div>
                    <p className="mt-1 text-[12px] font-semibold tracking-[-0.02em] text-slate-800">{item.value}</p>
                </motion.div>
            ))}
        </div>
    );
}

function OpeningImageCaptionOverlay() {
    return (
        <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
            <div className="rounded-[0.9rem] border border-white/22 bg-slate-950/42 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-3.5">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-2.5 py-1 font-mono text-[8px] tracking-[0.22em] text-white/78">
                        DOCUMENTARY 00
                    </span>
                    <span className="inline-flex rounded-full border border-white/12 bg-white/5 px-2.5 py-1 font-mono text-[8px] tracking-[0.22em] text-white/55">
                        LIVE PORTRAIT
                    </span>
                </div>
                <p className="mt-2 text-[15px] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[17px]">
                    Operators +{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a5ff] via-[#9b4dff] to-[#e8d5ff]">
                        intelligence.
                    </span>
                </p>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.6] text-white/72 sm:text-[11.5px]">
                    Marketing, AI Systems, and Web Development. One in-house team behind your connected growth engine.
                </p>
            </div>
        </div>
    );
}

function OpeningRolePanel({
    index,
    title,
    body,
    tag,
    delay = 0,
}: {
    index: number;
    title: string;
    body: string;
    tag?: string;
    delay?: number;
}) {
    return (
        <Reveal delay={delay}>
            <motion.div
                className="group relative border-t border-slate-200/70 pt-5 transition-all duration-500 hover:border-primary/22 hover:bg-gradient-to-r hover:from-primary/[0.03] hover:to-transparent md:pt-[1.35rem] md:pr-3 md:-mr-3 md:rounded-r-xl"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
            >
                <span
                    className="absolute left-0 top-5 h-px w-0 bg-gradient-to-r from-primary/55 to-primary/10 transition-all duration-500 group-hover:w-full md:top-[1.35rem]"
                    aria-hidden
                />
                <div className="flex items-start justify-between gap-3 pl-0.5">
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/14 bg-gradient-to-br from-primary/[0.1] to-white/40 font-mono text-[10px] tracking-[0.18em] text-primary/72 tabular-nums shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-500 group-hover:border-primary/28 group-hover:shadow-[0_0_0_4px_rgba(86,0,227,0.08)]">
                            0{index}
                        </span>
                        <div>
                            <p className="text-[14px] font-semibold tracking-[-0.022em] text-slate-800 transition-colors duration-500 group-hover:text-slate-900 md:text-[15px]">
                                {title}
                            </p>
                            {tag ? (
                                <p className="mt-1 font-mono text-[8px] tracking-[0.24em] text-primary/48 transition-colors duration-500 group-hover:text-primary/62">
                                    {tag}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <motion.span
                        className="mt-1 hidden h-1.5 w-1.5 rounded-full bg-primary/0 transition-colors duration-500 group-hover:bg-primary/55 lg:block"
                        aria-hidden
                    />
                </div>
                <p className="mt-3 max-w-[34ch] pl-[2.4rem] text-[13px] leading-[1.76] text-slate-500/92 transition-colors duration-500 group-hover:text-slate-600 md:text-[13.5px]">
                    {body}
                </p>
            </motion.div>
        </Reveal>
    );
}

function EditorialFrame({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`group relative ${className ?? ''}`}>
            <div className="pointer-events-none absolute -inset-x-8 -top-12 -bottom-12 -z-10" aria-hidden="true">
                <div className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[3.4rem] bg-[radial-gradient(circle_at_center,rgba(155,77,255,0.15),transparent_68%)] blur-[108px]" />
            </div>

            <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.72, ease: EASE_OUT }}
                className="relative rounded-[1.7rem] md:rounded-[2.2rem] border border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_58%,rgba(244,239,232,0.98)_100%)] p-2.5 md:p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.92)_inset,0_20px_48px_-30px_rgba(15,23,42,0.32),0_72px_120px_-56px_rgba(86,0,227,0.26)]"
            >
                <div className="relative overflow-hidden rounded-[1.2rem] md:rounded-[1.6rem] bg-[#ece6de] ring-1 ring-inset ring-slate-900/10">
                    {children}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.64),inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-52px_120px_rgba(15,23,42,0.12)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_44%,rgba(15,23,42,0.16)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light bg-[linear-gradient(135deg,rgba(255,255,255,0.65)_0%,transparent_32%,transparent_68%,rgba(15,23,42,0.22)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(15,23,42,0.9)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(15,23,42,0.9)_0.5px,transparent_0.5px)] bg-[size:3px_3px]" />
                </div>
            </motion.div>
        </div>
    );
}

function StoryCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/10 backdrop-blur-xl shadow-[0_18px_70px_rgba(86,0,227,0.11)] ${className ?? ''}`}>
            {children}
        </div>
    );
}

function SectionHeading({
    index,
    eyebrow,
    title,
    subtitle,
}: {
    index?: string;
    eyebrow: string;
    title: React.ReactNode;
    subtitle?: string;
}) {
    return (
        <Reveal variant="tech">
            <div className="flex items-center gap-3.5">
                {index ? (
                    <span className="font-mono text-[12px] md:text-[13px] font-medium tracking-[0.28em] text-primary/70 tabular-nums">{index}</span>
                ) : null}
                <span className="h-px w-8 md:w-12 bg-gradient-to-r from-primary/45 to-transparent" />
                <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.24em] text-primary/70">{eyebrow}</p>
            </div>
            <h3 className="mt-4 text-[30px] md:text-[46px] lg:text-[54px] leading-[1.01] font-bold tracking-[-0.02em] text-slate-900 max-w-[20ch]">{title}</h3>
            {subtitle ? <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-slate-500 max-w-[54ch]">{subtitle}</p> : null}
        </Reveal>
    );
}

function CinematicSceneMedia({ scene }: { scene: DocumentaryScene }) {
    if (scene.mediaType === 'video') {
        return (
            <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={scene.poster}
                style={scene.focal ? { objectPosition: scene.focal } : undefined}
            >
                <source src={scene.src} type="video/mp4" />
            </video>
        );
    }

    return (
        <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 16, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
            style={{ transformOrigin: 'center center' }}
        >
            <StoryImage image={scene.src} alt={scene.alt} focal={scene.focal} className="h-full w-full object-cover" />
        </motion.div>
    );
}

function DocumentaryPcChassis({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative mx-auto w-full pb-4 sm:pb-5">
            <div
                className="pointer-events-none absolute left-1/2 top-[24%] h-[52%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-[radial-gradient(circle,rgba(86,0,227,0.16),transparent_68%)] blur-3xl"
                aria-hidden
            />

            <motion.div
                className="relative mx-auto w-full max-w-[920px]"
                style={{ perspective: '1300px' }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.85, ease: EASE_OUT }}
            >
                <motion.div
                    className="relative"
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.65, ease: EASE_OUT }}
                >
                    {/* Monitor panel — screen content unchanged inside */}
                    <div
                        className="relative z-20"
                        style={{ transform: 'rotateX(-5deg)', transformOrigin: '50% 100%' }}
                    >
                        <div className="pointer-events-none absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/55 px-2.5 py-1 backdrop-blur-md md:top-4">
                            <motion.span
                                animate={{ opacity: [1, 0.35, 1] }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                                className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(86,0,227,0.75)]"
                                aria-hidden
                            />
                            <span className="font-mono text-[7px] tracking-[0.22em] text-white/55 md:text-[8px]">AI CAM</span>
                        </div>
                        {children}

                        {/* Slim monitor chin — status only */}
                        <div className="pointer-events-none relative z-10 -mt-px mx-auto flex w-full items-center justify-between gap-3 rounded-b-[0.85rem] border border-t-0 border-slate-700/40 bg-gradient-to-b from-[#343841] via-[#252830] to-[#14161b] px-4 py-2 shadow-[0_14px_32px_-20px_rgba(15,23,42,0.6)] sm:px-5 sm:py-2.5 md:rounded-b-[1rem]">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[7px] tracking-[0.22em] text-primary/55 sm:text-[7.5px]">UKONNECT OS</span>
                                <span className="hidden h-2.5 w-px bg-white/10 sm:block" aria-hidden />
                                <span className="hidden font-mono text-[7px] tracking-[0.16em] text-white/32 sm:inline sm:text-[7.5px]">SCENE READER</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[6.5px] tracking-[0.14em] text-emerald-300/85 sm:text-[7px]">
                                    <motion.span
                                        animate={{ opacity: [1, 0.35, 1] }}
                                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                        className="mr-1 inline-block h-1 w-1 rounded-full bg-emerald-400 align-middle"
                                        aria-hidden
                                    />
                                    LIVE
                                </span>
                                <span className="font-mono text-[6.5px] tracking-[0.14em] text-white/28 sm:text-[7px]">AI</span>
                            </div>
                        </div>
                    </div>

                    {/* Premium 3D stand */}
                    <div
                        className="relative z-10 mx-auto flex w-full flex-col items-center"
                        style={{ transform: 'rotateX(10deg)', transformOrigin: '50% 0%' }}
                    >
                        {/* Neck — tall sculpted column */}
                        <div className="relative -mt-px h-16 w-[18px] sm:h-[4.5rem] sm:w-5 md:h-20 md:w-[22px]" aria-hidden>
                            <div className="absolute inset-0 rounded-[3px] bg-gradient-to-b from-[#5c616a] via-[#3a3f48] to-[#23262d] shadow-[inset_1px_0_0_rgba(255,255,255,0.14),inset_-1px_0_0_rgba(0,0,0,0.28),0_10px_24px_-14px_rgba(15,23,42,0.55)]" />
                            <div className="absolute inset-y-1 left-0 w-[42%] rounded-l-[2px] bg-gradient-to-r from-black/35 to-transparent" />
                            <div className="absolute inset-y-1 right-0 w-[38%] rounded-r-[2px] bg-gradient-to-l from-white/18 to-transparent" />
                            <motion.div
                                animate={{ opacity: [0.35, 0.9, 0.35] }}
                                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-primary/10 via-primary/55 to-primary/10"
                            />
                        </div>

                        {/* Y-joint hub */}
                        <div className="relative -mt-px h-2.5 w-[4.5rem] rounded-sm bg-gradient-to-b from-[#4d525b] to-[#2f333b] shadow-[0_6px_16px_-10px_rgba(15,23,42,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] sm:w-20 md:w-[5.5rem]" aria-hidden>
                            <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                        </div>

                        {/* Base deck — premium platform */}
                        <div className="relative mt-0 w-full max-w-[11rem] sm:max-w-[12rem]" aria-hidden>
                            <div
                                className="relative mx-auto h-5 w-full rounded-[0.65rem] border border-slate-600/40 bg-gradient-to-b from-[#565c66] via-[#3b4049] to-[#252930] shadow-[0_18px_36px_-20px_rgba(15,23,42,0.62),inset_0_1px_0_rgba(255,255,255,0.16)] sm:h-6"
                                style={{ transform: 'perspective(500px) rotateX(68deg)', transformOrigin: '50% 0%' }}
                            />
                            <div
                                className="absolute left-1/2 top-[55%] h-2 w-[88%] -translate-x-1/2 rounded-[100%] border border-slate-700/30 bg-gradient-to-b from-[#2a2e35] to-[#12141a] shadow-[0_12px_28px_-16px_rgba(15,23,42,0.55)] sm:h-2.5"
                                style={{ transform: 'perspective(500px) rotateX(78deg)', transformOrigin: '50% 50%' }}
                            />
                        </div>

                        <div
                            className="pointer-events-none absolute -bottom-1 left-1/2 h-6 w-[46%] -translate-x-1/2 rounded-[100%] bg-slate-900/16 blur-xl md:h-7"
                            aria-hidden
                        />

                        <motion.div
                            animate={{ opacity: [0.25, 0.7, 0.25] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="pointer-events-none absolute inset-x-[28%] bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                            aria-hidden
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

function DocumentaryPreviewPanel({ scene, activeIndex, total }: { scene: DocumentaryScene; activeIndex: number; total: number }) {
    return (
        <figure className="w-full" aria-label={`${scene.label}: ${scene.title}`}>
            <DocumentaryPcChassis>
                <EditorialFrame className="w-full">
                <div className="relative aspect-[16/10] w-full max-h-[min(70vh,640px)] overflow-hidden lg:max-h-[min(68vh,600px)]">
                    <DocumentaryMediaChrome>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${scene.src}-${scene.mediaType}`}
                                initial={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.015, filter: 'blur(4px)' }}
                                transition={{ duration: 0.85, ease: EASE }}
                                className="absolute inset-0 will-change-[opacity,transform,filter]"
                            >
                                <CinematicSceneMedia scene={scene} />
                            </motion.div>
                        </AnimatePresence>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-white/6" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#5600e3]/8 via-transparent to-[#9b4dff]/8" />
                    </DocumentaryMediaChrome>

                    <DocumentarySceneHeroCaption scene={scene} />

                    <div className="absolute left-4 top-4 z-30 flex items-center gap-2 sm:left-5 sm:top-5">
                        <div className="rounded-full border border-white/68 bg-white/82 px-3.5 py-1.5 shadow-[0_12px_24px_rgba(15,23,42,0.1)] backdrop-blur-sm">
                            <p className="font-mono text-[10px] tracking-[0.26em] text-slate-600">CAPTURED IN AMSTERDAM</p>
                        </div>
                        <div className="rounded-full border border-white/50 bg-slate-950/28 px-3 py-1.5 backdrop-blur-sm">
                            <p className="font-mono text-[10px] tracking-[0.22em] text-white/88 tabular-nums">
                                0{activeIndex + 1} / 0{total}
                            </p>
                        </div>
                    </div>
                </div>
                </EditorialFrame>
            </DocumentaryPcChassis>
        </figure>
    );
}

function BehindSystemsExperience({ scenes }: { scenes: DocumentaryScene[] }) {
    const [active, setActive] = useState(0);
    const featured = scenes[active];
    const progress = ((active + 1) / scenes.length) * 100;

    return (
        <div className="mt-12 lg:mt-14">
            {/* Mobile / tablet: preview first, chapters below — preview stays in view while selecting */}
            <div className="flex flex-col gap-8 lg:hidden">
                <Reveal>
                    <BehindSystemsSectionHeader className="max-w-[31rem]" />
                </Reveal>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.75, ease: EASE_OUT }}
                >
                    <DocumentaryPreviewPanel scene={featured} activeIndex={active} total={scenes.length} />
                </motion.div>

                <div className="relative pl-5">
                    <div className="absolute bottom-0 left-0 top-0 w-px bg-slate-200/80" aria-hidden>
                        <motion.div
                            className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-primary/60 via-primary/25 to-transparent"
                            animate={{ height: `${progress}%` }}
                            transition={{ duration: 0.6, ease: EASE_OUT }}
                        />
                    </div>
                    <div className="space-y-3">
                        {scenes.map((scene, idx) => (
                            <DocumentaryChapterButton
                                key={scene.title}
                                scene={scene}
                                idx={idx}
                                isActive={idx === active}
                                onSelect={() => setActive(idx)}
                                variant="mobile"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop: one-viewport interactive documentary */}
            <div className="hidden lg:grid lg:grid-cols-[0.4fr_0.6fr] lg:items-stretch lg:gap-12 xl:gap-14 lg:min-h-[min(78vh,740px)]">
                <div className="flex min-h-0 flex-col">
                    <Reveal>
                        <BehindSystemsSectionHeader className="max-w-[26rem]" />
                    </Reveal>

                    <div className="relative mt-8 flex min-h-0 flex-1 flex-col">
                        <div className="absolute bottom-0 left-[11px] top-0 w-px bg-slate-200/75" aria-hidden>
                            <motion.div
                                className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-primary/65 via-primary/22 to-transparent"
                                animate={{ height: `${progress}%` }}
                                transition={{ duration: 0.65, ease: EASE_OUT }}
                            />
                        </div>

                        <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-2 [scrollbar-width:thin]">
                            {scenes.map((scene, idx) => (
                                <DocumentaryChapterButton
                                    key={scene.title}
                                    scene={scene}
                                    idx={idx}
                                    isActive={idx === active}
                                    onSelect={() => setActive(idx)}
                                    variant="desktop"
                                />
                            ))}
                        </div>

                        <p className="mt-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] text-slate-400 tabular-nums">
                            <StoryTagPill className="!text-[8px]">SCENE</StoryTagPill>
                            <span>
                                0{active + 1} OF 0{scenes.length}
                            </span>
                        </p>
                    </div>
                </div>

                <motion.div
                    className="flex min-h-full w-full flex-col justify-end self-stretch lg:pb-[3.35rem]"
                    initial={{ opacity: 0, scale: 0.985 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: EASE_OUT }}
                >
                    <DocumentaryPreviewPanel scene={featured} activeIndex={active} total={scenes.length} />
                </motion.div>
            </div>
        </div>
    );
}

function OpeningTrustStrip() {
    const items = [
        { label: 'Based in', value: 'Amsterdam', signal: 'NL HQ' },
        { label: 'Delivery', value: 'In-house team', signal: 'NO OUTSOURCE' },
        { label: 'Focus', value: 'AI Growth System', signal: 'MKT · AI · WEB' },
    ];

    return (
        <div className="mt-10 hidden border-t border-slate-200/60 pt-8 lg:block">
            <div className="grid grid-cols-3 gap-4">
                {items.map((item, idx) => (
                    <motion.div
                        key={item.label}
                        className="group rounded-xl border border-slate-200/65 bg-white/45 px-4 py-3.5 transition-all duration-500 hover:border-primary/22 hover:bg-white/75 hover:shadow-[0_12px_28px_-18px_rgba(86,0,227,0.2)]"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE_OUT }}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <p className="font-mono text-[8px] tracking-[0.28em] text-primary/48">{item.label.toUpperCase()}</p>
                            <StoryTagPill className="!px-1.5 !py-0.5 !text-[7px]">{item.signal}</StoryTagPill>
                        </div>
                        <p className="mt-2 text-[13px] font-semibold tracking-[-0.02em] text-slate-800 transition-colors duration-500 group-hover:text-slate-900">
                            {item.value}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function OfficeConfiguratorHotspot({
    room,
    index,
    active,
    onSelect,
}: {
    room: RoomCard;
    index: number;
    active: boolean;
    onSelect: () => void;
}) {
    return (
        <motion.button
            type="button"
            onClick={onSelect}
            aria-label={`Explore ${room.title}`}
            aria-pressed={active}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ top: room.pos.top, left: room.pos.left }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
        >
            {active ? (
                <>
                    <motion.span
                        animate={{ scale: [1, 3], opacity: [0.6, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-primary/50"
                        aria-hidden
                    />
                    <motion.span
                        animate={{ scale: [1, 2.2], opacity: [0.45, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.55 }}
                        className="absolute inset-0 rounded-full bg-[#9b4dff]/40"
                        aria-hidden
                    />
                    <motion.span
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -inset-5 rounded-full bg-primary/20 blur-md"
                        aria-hidden
                    />
                </>
            ) : null}

            <span
                className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-500 md:h-6 md:w-6 ${
                    active
                        ? 'border-white bg-primary shadow-[0_0_28px_rgba(155,77,255,0.9),0_0_0_6px_rgba(155,77,255,0.22)]'
                        : 'border-white/85 bg-white/15 group-hover:bg-white/40 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.45)]'
                }`}
            >
                <span className={`font-mono text-[8px] font-bold tabular-nums ${active ? 'text-white' : 'text-white/80'}`}>
                    {index + 1}
                </span>
                {active ? (
                    <motion.span
                        layoutId="office-hotspot-beam"
                        className="absolute -inset-3 rounded-full border-2 border-primary/50 md:-inset-3.5"
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                    />
                ) : null}
            </span>

            <span
                className={`absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-full border px-3 py-1 backdrop-blur-md transition-all duration-500 ${
                    active
                        ? 'border-primary/35 bg-slate-950/85 text-white shadow-[0_10px_32px_-8px_rgba(86,0,227,0.65)]'
                        : 'border-white/15 bg-slate-950/55 text-white/75 opacity-0 group-hover:opacity-100'
                }`}
            >
                <span className="font-mono text-[7px] tracking-[0.22em] md:text-[8px]">{room.title.toUpperCase()}</span>
            </span>
        </motion.button>
    );
}

function OfficeFloatingRoomCard({ room, index, pos }: { room: RoomCard; index: number; pos: { top: string; left: string } }) {
    const leftPct = parseFloat(pos.left);
    const topPct = parseFloat(pos.top);
    const cardOnLeft = leftPct > 52;

    return (
        <motion.div
            key={room.title}
            initial={{ opacity: 0, y: 16, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, scale: 0.97, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className={`pointer-events-none absolute z-20 w-[min(292px,88vw)] sm:w-[min(300px,44%)] ${
                cardOnLeft ? 'right-[4%] sm:right-[6%]' : 'left-[4%] sm:left-[6%]'
            }`}
            style={{ top: `clamp(8%, ${Math.min(Math.max(topPct - 4, 10), 48)}%, 48%)` }}
        >
            <div className="overflow-hidden rounded-[1.1rem] border border-white/18 bg-slate-950/72 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.75),0_0_0_1px_rgba(155,77,255,0.12)_inset] backdrop-blur-xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <StoryImage
                        image={room.image}
                        alt={`Ukonnect ${room.title}, ${room.team}`}
                        focal={room.focal}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-primary/[0.08]" />
                    <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-primary/25 px-2.5 py-1">
                        <p className="font-mono text-[7px] tracking-[0.24em] text-white/92">ROOM 0{index + 1}</p>
                    </div>
                </div>
                <div className="border-t border-white/10 px-4 py-3.5">
                    <p className="text-[15px] font-semibold tracking-[-0.02em] text-white">{room.title}</p>
                    <p className="mt-1 text-[12px] leading-[1.6] text-white/72">{room.blurb}</p>
                    <p className="mt-2 font-mono text-[8px] tracking-[0.2em] text-primary/80">TEAM · {room.team.toUpperCase()}</p>
                </div>
            </div>

            <motion.span
                className={`absolute top-8 h-px w-12 bg-gradient-to-r from-primary/70 to-transparent ${
                    cardOnLeft ? '-left-12 origin-right' : '-right-12 origin-left rotate-180'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, delay: 0.15, ease: EASE_OUT }}
                aria-hidden
            />
        </motion.div>
    );
}

function OfficeConfigurator({ panoramic, rooms }: { panoramic: string; rooms: RoomCard[] }) {
    const [active, setActive] = useState(0);
    const current = rooms[active];

    return (
        <motion.div
            className="relative mt-8 md:mt-10"
            initial={{ opacity: 0, y: 26, scale: 0.985, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.92, ease: EASE_OUT }}
        >
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#080a10] shadow-[0_40px_100px_-36px_rgba(86,0,227,0.5)] md:rounded-[1.9rem]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(155,77,255,0.16),transparent_42%),radial-gradient(circle_at_82%_100%,rgba(86,0,227,0.12),transparent_38%)]" aria-hidden />
                <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(155,77,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(155,77,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" aria-hidden />

                <div className="relative flex items-center justify-between border-b border-white/[0.08] px-4 py-3 md:px-6">
                    <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_rgba(155,77,255,0.8)]" />
                        </span>
                        <div>
                            <p className="font-mono text-[8px] tracking-[0.3em] text-primary/65 md:text-[9px]">STUDIO CONFIGURATOR</p>
                            <p className="text-[12px] font-medium text-white/55 md:text-[13px]">Amsterdam · Live floor map</p>
                        </div>
                    </div>
                    <div className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 backdrop-blur-sm">
                        <p className="font-mono text-[9px] tracking-[0.2em] text-white/70 tabular-nums md:text-[10px]">
                            0{active + 1} / 0{rooms.length}
                        </p>
                    </div>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-[76px_1fr]">
                    <div className="hidden border-r border-white/[0.08] lg:flex lg:flex-col lg:gap-1 lg:p-2">
                        {rooms.map((room, idx) => {
                            const isActive = idx === active;
                            return (
                                <motion.button
                                    key={room.title}
                                    type="button"
                                    onClick={() => setActive(idx)}
                                    aria-pressed={isActive}
                                    className={`group relative flex flex-col items-center rounded-xl px-1 py-3 transition-all duration-500 ${
                                        isActive ? 'bg-primary/15' : 'hover:bg-white/[0.04]'
                                    }`}
                                    whileHover={{ x: 2 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {isActive ? (
                                        <motion.span
                                            layoutId="office-rail-active"
                                            className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-primary shadow-[0_0_12px_rgba(155,77,255,0.8)]"
                                            transition={{ duration: 0.45, ease: EASE_OUT }}
                                        />
                                    ) : null}
                                    <span className={`font-mono text-[9px] tabular-nums ${isActive ? 'text-primary' : 'text-white/35'}`}>
                                        0{idx + 1}
                                    </span>
                                    <span
                                        className={`mt-1.5 text-center text-[9px] font-semibold leading-tight tracking-[-0.01em] [writing-mode:vertical-rl] rotate-180 ${
                                            isActive ? 'text-white' : 'text-white/45 group-hover:text-white/70'
                                        }`}
                                    >
                                        {room.title}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="relative">
                        <div className="relative aspect-[16/11] w-full overflow-hidden md:aspect-[16/10]">
                            <StoryImage
                                image={panoramic}
                                alt="Ukonnect studio floor plan"
                                focal="center 38%"
                                className="h-full w-full object-cover"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080a10]/75 via-[#080a10]/15 to-[#080a10]/25" />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#5600e3]/12 via-transparent to-[#9b4dff]/10" />
                            <motion.div
                                animate={{ y: ['-120%', '220%'] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                className="pointer-events-none absolute inset-x-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(155,77,255,0.14),transparent)] opacity-40"
                                aria-hidden
                            />

                            {rooms.map((room, idx) => (
                                <OfficeConfiguratorHotspot
                                    key={room.title}
                                    room={room}
                                    index={idx}
                                    active={idx === active}
                                    onSelect={() => setActive(idx)}
                                />
                            ))}

                            <AnimatePresence mode="wait">
                                <OfficeFloatingRoomCard room={current} index={active} pos={current.pos} />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="relative border-t border-white/[0.08] bg-[#06080d]/80 px-3 py-3 backdrop-blur-md md:px-5 md:py-4">
                    <div className="mb-2 flex items-center justify-between lg:hidden">
                        <p className="font-mono text-[8px] tracking-[0.24em] text-white/40">SELECT ROOM</p>
                        <p className="font-mono text-[8px] tracking-[0.18em] text-primary/70">{current.title.toUpperCase()}</p>
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-3 [&::-webkit-scrollbar]:hidden">
                        {rooms.map((room, idx) => {
                            const isActive = idx === active;
                            return (
                                <motion.button
                                    key={room.title}
                                    type="button"
                                    onClick={() => setActive(idx)}
                                    aria-pressed={isActive}
                                    className={`group relative min-w-[132px] shrink-0 overflow-hidden rounded-[0.95rem] border text-left transition-all duration-500 md:min-w-0 md:flex-1 ${
                                        isActive
                                            ? 'border-primary/40 shadow-[0_12px_36px_-12px_rgba(86,0,227,0.65)]'
                                            : 'border-white/10 hover:border-white/22'
                                    }`}
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <StoryImage
                                            image={room.image}
                                            alt={`${room.title}, ${room.team}`}
                                            focal={room.focal}
                                            className={`h-full w-full object-cover transition-all duration-700 ${
                                                isActive ? 'scale-100' : 'scale-105 opacity-55 group-hover:opacity-80'
                                            }`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10]/90 via-[#080a10]/20 to-transparent" />
                                        {isActive ? (
                                            <motion.span
                                                layoutId="office-dock-glow"
                                                className="absolute inset-0 ring-2 ring-primary/45 ring-inset"
                                                transition={{ duration: 0.45, ease: EASE_OUT }}
                                            />
                                        ) : null}
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 px-3 py-2.5">
                                        <p className="font-mono text-[7px] tracking-[0.2em] text-white/50">0{idx + 1}</p>
                                        <p className={`mt-0.5 text-[12px] font-semibold tracking-[-0.02em] ${isActive ? 'text-white' : 'text-white/65'}`}>
                                            {room.title}
                                        </p>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function JourneyAluminumFrame({
    step,
    index,
    active,
}: {
    step: JourneyStep;
    index: number;
    active: boolean;
}) {
    return (
        <div className="relative h-full w-full">
            <div className="pointer-events-none absolute -inset-3 rounded-[1.6rem] bg-[radial-gradient(circle_at_80%_0%,rgba(155,77,255,0.22),transparent_55%)] blur-xl" aria-hidden />

            <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] p-[2px] shadow-[0_28px_72px_-28px_rgba(15,23,42,0.55)] md:rounded-[1.5rem]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                    className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(148,163,184,0.35)_60deg,transparent_120deg,rgba(155,77,255,0.75)_200deg,transparent_260deg,rgba(203,213,225,0.4)_320deg,transparent_360deg)]"
                    aria-hidden
                />
                <div className="absolute inset-[2px] rounded-[1.28rem] bg-[linear-gradient(165deg,#1a1f2e_0%,#0f131c_42%,#171c28_100%)] md:rounded-[1.42rem]" />

                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[1.25rem] md:rounded-[1.4rem]">
                    <div className="flex items-center justify-between border-b border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-2.5 md:px-5">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-slate-500/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" />
                            <span className="h-2 w-2 rounded-full bg-slate-400/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                            <span className="h-2 w-2 rounded-full bg-primary/70 shadow-[0_0_8px_rgba(155,77,255,0.55)]" />
                        </div>
                        <p className="font-mono text-[8px] tracking-[0.28em] text-slate-400/80 md:text-[9px]">UKONNECT · GROWTH ENGINE</p>
                        <p className="font-mono text-[9px] tabular-nums text-primary/70">0{index + 1}</p>
                    </div>

                    <div className="relative flex-1 p-3 md:p-4">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.9rem] border border-white/[0.1] bg-[#0a0d14] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-24px_48px_rgba(0,0,0,0.35)] md:rounded-[1rem]">
                            <div className="pointer-events-none absolute inset-0 opacity-[0.45] bg-[linear-gradient(rgba(155,77,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(155,77,255,0.08)_1px,transparent_1px)] bg-[size:22px_22px]" />
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(155,77,255,0.18),transparent_38%)]" />
                            <motion.div
                                animate={{ y: ['-120%', '220%'] }}
                                transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
                                className="pointer-events-none absolute inset-x-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(155,77,255,0.12),transparent)] opacity-60"
                                aria-hidden
                            />

                            <AiPhaseScan phaseKey={step.title} />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, scale: 1.06, filter: 'blur(10px) brightness(1.15)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
                                    exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px) brightness(0.88)' }}
                                    transition={{ duration: 0.68, ease: EASE }}
                                    className="absolute inset-2 overflow-hidden rounded-[0.7rem] md:inset-2.5 md:rounded-[0.8rem]"
                                >
                                    <StoryImage
                                        image={step.image}
                                        alt={`Ukonnect team, ${step.title}: ${step.team}`}
                                        focal={step.focal}
                                        zoom
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0d14]/72 via-[#0a0d14]/10 to-primary/[0.06]" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-[#9b4dff]/12" />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute left-3 top-3 flex items-center gap-2">
                                <span className="rounded-full border border-white/15 bg-slate-950/55 px-2.5 py-1 backdrop-blur-sm">
                                    <p className="font-mono text-[8px] tracking-[0.24em] text-white/88">{step.tag}</p>
                                </span>
                                <span className="hidden rounded-full border border-primary/25 bg-primary/15 px-2 py-0.5 sm:inline-block">
                                    <p className="font-mono text-[7px] tracking-[0.2em] text-primary/90">LIVE NODE</p>
                                </span>
                            </div>

                            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                                <div className="rounded-xl border border-white/12 bg-slate-950/45 px-3 py-2 backdrop-blur-md">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">{step.title}</p>
                                    <p className="mt-0.5 text-[11px] text-white/65">{step.micro}</p>
                                </div>
                                <div className="hidden rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1.5 font-mono text-[8px] tracking-[0.18em] text-slate-300/70 sm:block">
                                    16:10 · AI RENDER
                                </div>
                            </div>

                            {active ? (
                                <motion.span
                                    layoutId="journey-aluminum-active"
                                    className="absolute inset-0 rounded-[0.9rem] ring-2 ring-primary/40 ring-offset-2 ring-offset-[#0a0d14] md:rounded-[1rem]"
                                    transition={{ duration: 0.45, ease: EASE_OUT }}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WorkAIPlatform({ steps }: { steps: JourneyStep[] }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isInView = useInView(sectionRef, { amount: 0.38, margin: '-8% 0px' });
    const [active, setActive] = useState(0);
    const [cycleKey, setCycleKey] = useState(0);
    const current = steps[active];

    const startAutoplay = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % steps.length);
            setCycleKey((k) => k + 1);
        }, JOURNEY_PHASE_MS);
    }, [steps.length]);

    const selectPhase = useCallback(
        (idx: number) => {
            setActive(idx);
            setCycleKey((k) => k + 1);
            startAutoplay();
        },
        [startAutoplay],
    );

    useEffect(() => {
        if (!isInView) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        setActive(0);
        setCycleKey((k) => k + 1);
        const boot = setTimeout(() => startAutoplay(), 700);

        return () => {
            clearTimeout(boot);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isInView, startAutoplay]);

    return (
        <motion.div
            ref={sectionRef}
            className="relative mt-8 md:mt-10"
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.92, ease: EASE_OUT }}
        >
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/70 bg-[linear-gradient(160deg,rgba(248,250,252,0.98)_0%,rgba(241,245,249,0.96)_48%,rgba(226,232,240,0.94)_100%)] p-4 shadow-[0_28px_80px_-40px_rgba(86,0,227,0.32)] md:rounded-[1.85rem] md:p-5 lg:p-6">
                <div className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top_left,rgba(155,77,255,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_45%)]" aria-hidden />
                <motion.div
                    animate={{ opacity: isInView ? [0.15, 0.35, 0.15] : 0.15 }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(155,77,255,0.08)_50%,transparent_100%)]"
                    aria-hidden
                />

                <div className="relative flex flex-wrap gap-2 border-b border-slate-200/65 pb-4">
                    {steps.map((step, idx) => {
                        const isActive = idx === active;
                        return (
                            <motion.button
                                key={step.title}
                                type="button"
                                onClick={() => selectPhase(idx)}
                                aria-pressed={isActive}
                                className={`relative overflow-hidden rounded-full border px-3.5 py-2 text-left transition-all duration-500 md:px-4 ${
                                    isActive
                                        ? 'border-primary/35 bg-primary/[0.09] shadow-[0_10px_28px_-16px_rgba(86,0,227,0.5)]'
                                        : 'border-slate-200/80 bg-white/60 hover:border-primary/18 hover:bg-white/85'
                                }`}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ duration: 0.4, ease: EASE_OUT }}
                            >
                                {isActive && isInView ? (
                                    <motion.span
                                        key={`progress-${cycleKey}-${idx}`}
                                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-primary via-[#9b4dff] to-primary/40"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: JOURNEY_PHASE_MS / 1000, ease: 'linear' }}
                                        aria-hidden
                                    />
                                ) : null}
                                <span className="font-mono text-[8px] tracking-[0.24em] text-primary/55 tabular-nums">0{idx + 1}</span>
                                <span className={`ml-2 text-[12px] font-semibold tracking-[-0.02em] md:text-[13px] ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {step.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                <div className="relative mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.12fr_0.88fr] lg:gap-5">
                    <JourneyAluminumFrame step={current} index={active} active />

                    <div className="flex flex-col justify-between rounded-[1.25rem] border border-slate-200/70 bg-white/78 p-5 backdrop-blur-sm md:p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.title}
                                initial={{ opacity: 0, x: 18, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -10, filter: 'blur(5px)' }}
                                transition={{ duration: 0.58, ease: EASE }}
                            >
                                <p className="font-mono text-[9px] tracking-[0.32em] text-primary/55">PHASE · 0{active + 1}</p>
                                <h4 className="mt-2 text-[22px] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-[26px]">
                                    {current.title}
                                </h4>
                                <p className="mt-3 text-[14px] leading-[1.7] text-slate-600 md:text-[15px]">{current.micro}</p>
                                <p className="mt-2 text-[12px] font-medium tracking-[0.06em] text-primary/70 uppercase">Team · {current.team}</p>
                                <p className="mt-3 text-[12.5px] leading-[1.68] text-slate-400">
                                    Each phase connects Marketing, AI Systems, and Web Development inside one growth engine.
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-6 [&::-webkit-scrollbar]:hidden">
                            {steps.map((step, idx) => (
                                <motion.button
                                    key={step.title}
                                    type="button"
                                    onClick={() => selectPhase(idx)}
                                    aria-label={`View ${step.title}`}
                                    className={`relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-[0.7rem] border transition-all duration-500 md:h-16 md:w-20 ${
                                        idx === active
                                            ? 'border-primary/40 shadow-[0_8px_24px_-12px_rgba(86,0,227,0.5)]'
                                            : 'border-slate-200/80 opacity-70 hover:opacity-100'
                                    }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <StoryImage image={step.image} alt={`${step.title}, ${step.team}`} focal={step.focal} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
                                    <span className="absolute bottom-1 left-1.5 font-mono text-[8px] text-white/90">0{idx + 1}</span>
                                    {idx === active ? (
                                        <motion.span
                                            layoutId="journey-thumb-active"
                                            className="absolute inset-0 ring-2 ring-primary/45 ring-inset"
                                            transition={{ duration: 0.45, ease: EASE_OUT }}
                                        />
                                    ) : null}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function CultureMosaicCard({ item, index, spanClass }: { item: CultureItem; index: number; spanClass: string }) {
    const feature = index === 0;

    return (
        <motion.article
            className={`group relative overflow-hidden rounded-[1.15rem] md:rounded-[1.35rem] ${spanClass}`}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
        >
            <StoryImage
                image={item.image}
                alt={`Ukonnect culture, ${item.title}`}
                focal={item.focal}
                zoom
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/25 to-slate-950/5" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-[#9b4dff]/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 rounded-[1.15rem] ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-primary/40 md:rounded-[1.35rem]" />

            <div className="absolute left-4 top-4 flex items-center gap-2 md:left-5 md:top-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-slate-950/40 font-mono text-[10px] font-semibold text-white/90 backdrop-blur-md">
                    {index + 1}
                </span>
                <span className="rounded-full border border-white/20 bg-slate-950/35 px-2.5 py-1 font-mono text-[8px] tracking-[0.24em] text-white/80 backdrop-blur-md">
                    {item.label.toUpperCase()}
                </span>
            </div>

            <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                <h4 className={`font-semibold leading-[1.02] tracking-[-0.03em] text-white ${feature ? 'text-[28px] md:text-[38px]' : 'text-[20px] md:text-[24px]'}`}>
                    {item.title}
                </h4>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <p className={`mt-2 leading-[1.6] text-white/78 ${feature ? 'text-[13px] md:text-[14.5px]' : 'text-[12px] md:text-[13px]'}`}>
                            {item.detail}
                        </p>
                    </div>
                </div>
                <span className="mt-2.5 block h-px w-8 origin-left scale-x-100 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-14" aria-hidden />
            </div>
        </motion.article>
    );
}

function CultureMosaic({ items }: { items: CultureItem[] }) {
    const spans = [
        'sm:col-span-2 lg:col-span-6 lg:row-span-2 min-h-[300px] sm:min-h-[360px] lg:min-h-0',
        'lg:col-span-3 min-h-[220px]',
        'lg:col-span-3 min-h-[220px]',
        'lg:col-span-3 min-h-[220px]',
        'lg:col-span-3 min-h-[220px]',
    ];

    return (
        <motion.div
            className="relative mt-8 md:mt-10"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.88, ease: EASE_OUT }}
        >
            <div className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 -z-10" aria-hidden>
                <div className="absolute left-[8%] top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(155,77,255,0.14),transparent_70%)] blur-2xl" />
                <div className="absolute right-[6%] top-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(86,0,227,0.12),transparent_70%)] blur-2xl" />
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 md:mb-6">
                <span className="font-mono text-[9px] tracking-[0.34em] text-primary/55">THE UKONNECT WAY</span>
                <span className="h-px flex-1 bg-gradient-to-r from-slate-300/70 to-transparent" aria-hidden />
                <p className="text-[12.5px] leading-[1.5] text-slate-500 md:text-[13px]">
                    Not a poster on the wall. This is how the studio actually operates, every day.
                </p>
            </div>

            <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-12 lg:grid-rows-2">
                {items.map((item, idx) => (
                    <CultureMosaicCard key={item.title} item={item} index={idx} spanClass={spans[idx]} />
                ))}
            </div>
        </motion.div>
    );
}

function LeadershipStatement({ image }: { image: string }) {
    const pillars = [
        {
            kicker: '01',
            title: 'Marketing',
            body: 'Paid advertising, conversion funnels, and lead generation strategy that fills the pipeline with high-intent prospects.',
        },
        {
            kicker: '02',
            title: 'AI Systems',
            body: 'AI automation, CRM integrations, and agent workflows that qualify leads and nurture prospects around the clock.',
        },
        {
            kicker: '03',
            title: 'Web Development',
            body: 'Conversion websites, landing pages, and tracking setup that turn traffic into measurable leads and attribution.',
        },
    ];

    return (
        <motion.div
            className="relative mt-10 md:mt-14"
            initial={{ opacity: 0, y: 28, x: -8 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
        >
            <div className="pointer-events-none absolute -inset-x-8 -top-12 bottom-0 -z-10" aria-hidden>
                <div className="absolute left-[6%] top-[10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(155,77,255,0.14),transparent_68%)] blur-3xl" />
                <div className="absolute right-[4%] bottom-[8%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(86,0,227,0.1),transparent_70%)] blur-3xl" />
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-[linear-gradient(155deg,#ffffff_0%,#faf7f2_42%,#f3ede4_100%)] shadow-[0_36px_90px_-40px_rgba(86,0,227,0.28)] md:rounded-[2.1rem]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_top_right,rgba(155,77,255,0.08),transparent_42%)]" aria-hidden />

                <div className="relative grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]">
                    <div className="relative border-b border-slate-200/60 p-5 md:p-7 lg:border-b-0 lg:border-r lg:p-8">
                        <div className="relative mx-auto max-w-[420px] lg:mx-0 lg:max-w-none">
                            <div className="group relative">
                                <motion.div
                                    animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.05, 1] }}
                                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                                    className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(155,77,255,0.22),transparent_62%)] blur-2xl"
                                    aria-hidden
                                />

                                <div className="relative overflow-hidden rounded-[1.5rem] p-[2px] shadow-[0_28px_70px_-28px_rgba(15,23,42,0.35)] md:rounded-[1.85rem]">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent,rgba(155,77,255,0.55),transparent,rgba(245,230,200,0.45),transparent,rgba(86,0,227,0.5),transparent)]"
                                        aria-hidden
                                    />
                                    <div className="absolute inset-[2px] rounded-[1.45rem] bg-[#fdfaf5] md:rounded-[1.8rem]" />

                                    <div className="relative m-[2px] aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-slate-900 md:rounded-[1.75rem]">
                                        <StoryImage
                                            image={image}
                                            alt="Raffy, Ukonnect leadership"
                                            focal="center 28%"
                                            eager
                                            zoom
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-white/10" />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-[#9b4dff]/10" />
                                        <motion.div
                                            animate={{ y: ['-120%', '220%'] }}
                                            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                            className="pointer-events-none absolute inset-x-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-40"
                                            aria-hidden
                                        />
                                    </div>
                                </div>

                                <motion.div
                                    className="absolute -bottom-5 left-4 right-4 rounded-[1rem] border border-white/70 bg-white/88 px-5 py-3.5 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.2)] backdrop-blur-xl md:-bottom-6 md:left-6 md:right-6 md:px-6 md:py-4"
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-mono text-[8px] tracking-[0.3em] text-primary/55">FOUNDER</p>
                                            <p className="mt-1 text-[19px] font-bold tracking-[-0.03em] text-slate-900 md:text-[22px]">Raffy</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono text-[8px] tracking-[0.22em] text-slate-400">UKONNECT</p>
                                            <p className="mt-1 text-[11px] text-slate-500">Marketing · AI Systems · Web</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 xl:p-12">
                        <p className="font-mono text-[9px] tracking-[0.34em] text-primary/55 md:text-[10px]">FOUNDER STATEMENT</p>

                        <h3 className="mt-5 max-w-[13ch] text-[34px] font-bold leading-[0.95] tracking-[-0.04em] text-slate-900 sm:text-[42px] md:mt-6 md:text-[50px] lg:text-[56px]">
                            We build long-term systems,
                            <span className="mt-1 block text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] via-[#7c3aed] to-[#9b4dff]">
                                not short-term hype.
                            </span>
                        </h3>

                        <div className="relative mt-8 md:mt-10">
                            <span className="absolute -left-1 -top-5 font-serif text-[72px] leading-none text-slate-200/70 md:-top-7 md:text-[96px]" aria-hidden>
                                &ldquo;
                            </span>
                            <blockquote className="relative z-10 max-w-[30ch] text-[18px] font-medium leading-[1.45] tracking-[-0.02em] text-slate-600 sm:text-[20px] md:text-[24px] lg:text-[26px]">
                                Turn AI into a reliable growth advantage for real businesses, with clarity, craftsmanship, and accountability.
                            </blockquote>
                            <div className="mt-5 h-px w-16 bg-gradient-to-r from-primary/60 to-transparent" aria-hidden />
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-3 md:mt-10">
                            {pillars.map((pillar, idx) => (
                                <motion.div
                                    key={pillar.title}
                                    className="group rounded-[1rem] border border-slate-200/70 bg-white/65 p-4 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:bg-white/90 hover:shadow-[0_14px_36px_-20px_rgba(86,0,227,0.25)]"
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.55, delay: 0.1 + idx * 0.08, ease: EASE_OUT }}
                                    whileHover={{ y: -2 }}
                                >
                                    <p className="font-mono text-[9px] tracking-[0.22em] text-primary/50">0{pillar.kicker} // {pillar.title.toUpperCase()}</p>
                                    <p className="mt-2.5 text-[12.5px] leading-[1.65] text-slate-500 md:text-[13px]">{pillar.body}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function CompanyStoryExperience() {
    const [modalOpen, setModalOpen] = useState(false);

    const assets = useMemo(
        () => ({
            teamHero: '/assets/company/team-hero.webp',
            meeting: '/assets/company/meeting-boardroom.webp',
            teamCollab: '/assets/company/team-collaboration.webp',
            officeWide: '/assets/company/office-panorama.webp',
            officePanorama: '/assets/company/office-panorama.webp',
            officeAiLab: '/assets/company/office-ai-lab.webp',
            officeStrategy: '/assets/company/office-strategy.webp',
            officeCreative: '/assets/company/office-creative.webp',
            officeAutomation: '/assets/company/office-automation.webp',
            officeClient: '/assets/company/office-client.webp',
            founder: '/assets/company/founder-raffy.webp',
            strategy: '/assets/company/strategy-whiteboard.webp',
            workshop: '/assets/company/workshop-whiteboard.webp',
            handshake: '/assets/company/client-handshake.webp',
            blueprint: '/assets/company/blueprint-collab.webp',
            devCollab: '/assets/company/dev-collab.webp',
            developer: '/assets/company/developer-laptop.webp',
            discussion: '/assets/company/discussion-table.webp',
            design: '/assets/company/design-collab.webp',
            planning: '/assets/company/planning-team.webp',
            growth: '/assets/company/growth-momentum.webp',
            cultureEnergy: '/assets/company/culture-energy.webp',
            cultureMeeting: '/assets/company/culture-meeting.webp',
            cultureMentoring: '/assets/company/culture-mentoring.webp',
            cultureTeam: '/assets/company/culture-team.webp',
            cultureFocus: '/assets/company/culture-focus.webp',
            collabLoop: '/assets/company/collab-loop.mp4',
            collabLoopPoster: '/assets/company/collab-loop-poster.webp',
            journeyDiscover: '/assets/company/journey-discover.webp',
            journeyDesign: '/assets/company/journey-design.webp',
            journeyBuild: '/assets/company/journey-build.webp',
            journeyLaunch: '/assets/company/journey-launch.webp',
            journeyScale: '/assets/company/journey-scale.webp',
        }),
        [],
    );

    const scenes: DocumentaryScene[] = useMemo(
        () => [
            {
                title: 'Desk-side build review',
                label: 'AI Systems',
                detail:
                    'Integrations, CRM syncs, and agent workflows reviewed at the desk before automation goes live in a client environment.',
                note: 'The same AI Systems capability from Our services: validating logic, routing edge cases, and tuning workflows while dashboards show live signal.',
                tagline: 'AI SYSTEMS · WORKFLOWS · CRM',
                alt: 'Ukonnect team reviewing AI integrations and automation workflows at a desk',
                mediaType: 'video',
                src: assets.collabLoop,
                poster: assets.collabLoopPoster,
                focal: 'center 42%',
                frame: 'panoramic',
            },
            {
                title: 'Direction gets aligned in the room',
                label: 'Marketing',
                detail:
                    'Google Ads, Meta campaigns, and funnel strategy aligned in one room before creative, budget, and targeting move forward.',
                note: 'Marketing delivery in practice: paid advertising, conversion funnels, and lead generation strategy decided together, not in silos.',
                tagline: 'MARKETING · PAID ADS · FUNNELS',
                alt: 'Ukonnect marketing team reviewing campaign direction around a boardroom table',
                mediaType: 'image',
                src: assets.meeting,
                focal: 'center 34%',
                frame: 'landscape',
            },
            {
                title: 'The sprint takes shape before the sprint starts',
                label: 'Funnel planning',
                detail:
                    'Landing page structure, conversion paths, and campaign priorities locked before web build and paid media launch together.',
                note: 'Where Marketing and Web Development meet: funnels, messaging, and page architecture planned as one connected system.',
                tagline: 'FUNNELS · LANDING PAGES · STRATEGY',
                alt: 'Ukonnect team planning conversion funnels and landing pages around a laptop and whiteboard',
                mediaType: 'image',
                src: assets.planning,
                focal: 'center 34%',
                frame: 'landscape',
            },
            {
                title: 'Questions are resolved in front of the system',
                label: 'Web delivery',
                detail:
                    'Conversion websites, tracking setup, and landing page performance reviewed live with the client before launch.',
                note: 'Web Development in the room: sites, analytics, and conversion decisions resolved in front of the actual build, not a slide deck.',
                tagline: 'WEB · TRACKING · CONVERSION',
                alt: 'Ukonnect web team presenting a conversion site and tracking setup in a workshop',
                mediaType: 'image',
                src: assets.workshop,
                focal: 'center 38%',
                frame: 'panoramic',
            },
        ],
        [assets],
    );

    const journey: JourneyStep[] = useMemo(
        () => [
            { title: 'Discover', image: assets.journeyDiscover, micro: 'Lead gen audit + growth strategy mapping', focal: 'center 32%', tag: 'SCAN', team: 'Sander & Kirsten' },
            { title: 'Design', image: assets.journeyDesign, micro: 'AI system architecture + conversion UX blueprint', focal: 'center 28%', tag: 'BLUEPRINT', team: 'Bram' },
            { title: 'Build', image: assets.journeyBuild, micro: 'Sites, automations, CRM integrations + QA', focal: 'center 30%', tag: 'COMPILE', team: 'Marco & Firman' },
            { title: 'Launch', image: assets.journeyLaunch, micro: 'Campaign rollout, site launch + tracking live', focal: 'center 32%', tag: 'DEPLOY', team: 'Edmerd & Paul' },
            { title: 'Scale', image: assets.journeyScale, micro: 'Performance optimization + pipeline growth loops', focal: 'center 30%', tag: 'MULTIPLY', team: 'Afifah & Thiago' },
        ],
        [assets],
    );

    const officeRooms: RoomCard[] = useMemo(
        () => [
            { title: 'AI Lab', image: assets.officeAiLab, blurb: 'AI Systems: automation, agents, and CRM workflows.', pos: { top: '18%', left: '22%' }, focal: 'center 30%', team: 'Bram' },
            { title: 'Strategy Room', image: assets.officeStrategy, blurb: 'Marketing: paid ads, funnels, and lead gen strategy.', pos: { top: '24%', left: '68%' }, focal: 'center 32%', team: 'Sander & Kirsten' },
            { title: 'Creative Studio', image: assets.officeCreative, blurb: 'Web Development: conversion sites and landing pages.', pos: { top: '58%', left: '18%' }, focal: 'center 30%', team: 'Rima & Tanisha' },
            { title: 'Automation Hub', image: assets.officeAutomation, blurb: 'AI Integrations & Workflows monitored in production.', pos: { top: '52%', left: '72%' }, focal: 'center 28%', team: 'Marco & Widhi' },
            { title: 'Client Success', image: assets.officeClient, blurb: 'Performance optimization and pipeline growth reviews.', pos: { top: '78%', left: '48%' }, focal: 'center 32%', team: 'Edmerd & Paul' },
        ],
        [assets],
    );

    const culture: CultureItem[] = useMemo(
        () => [
            {
                title: 'Ownership',
                image: assets.cultureFocus,
                focal: 'center 22%',
                label: 'Deep work',
                detail: 'Everyone owns outcomes end-to-end, not tickets waiting in a queue.',
                note: 'Accountability visible in the room during focused build sessions, not on a slide.',
            },
            {
                title: 'Innovation',
                image: assets.cultureEnergy,
                focal: 'center 40%',
                label: 'Momentum',
                detail: 'New ideas get tested against production standards, not pitch decks.',
                note: 'The energy in the studio when experiments move fast, but still survive real operations.',
            },
            {
                title: 'Execution',
                image: assets.cultureMeeting,
                focal: 'center 38%',
                label: 'Alignment',
                detail: 'Direction is resolved in the room before execution starts to fragment.',
                note: 'A working meeting with proximity and eye contact that feels candid, not performative.',
            },
            {
                title: 'Curiosity',
                image: assets.cultureMentoring,
                focal: 'center 32%',
                label: 'Mentorship',
                detail: 'Knowledge moves sideways across the team, not only top-down.',
                note: 'Side-by-side review moments where questions are welcomed in front of the system.',
            },
            {
                title: 'Growth',
                image: assets.cultureTeam,
                focal: 'center 34%',
                label: 'Together',
                detail: 'Progress is a team rhythm: strategy, build, and delivery in one operating cadence.',
                note: 'A company portrait that reads as culture evidence from a real team in motion.',
            },
        ],
        [assets],
    );

    const peoplePanels = [
        {
            title: 'Marketing',
            tag: 'GOOGLE · META · FUNNELS',
            body: 'Paid advertising on Meta and Google, conversion funnels, and lead generation strategy that attract high-intent prospects.',
        },
        {
            title: 'AI Systems',
            tag: 'AUTOMATION · CRM · AGENTS',
            body: 'AI lead generation, sales automation, marketing automation, and integrations that connect CRM, ads, and analytics into one system.',
        },
        {
            title: 'Web Development',
            tag: 'SITES · LANDING · TRACKING',
            body: 'Conversion websites, high-performance landing pages, and tracking infrastructure that turn traffic into measurable leads.',
        },
    ];

    return (
        <section id="company-story" className="relative overflow-hidden py-[60px] md:py-[72px] lg:py-[80px] px-6">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[520px] w-[980px] rounded-full bg-[#5600e3]/[0.055] blur-[100px]" />
                <div className="absolute -left-44 top-[18%] h-[560px] w-[560px] rounded-full bg-[#9b4dff]/[0.05] blur-[110px]" />
                <div className="absolute -right-44 bottom-0 h-[560px] w-[560px] rounded-full bg-[#5600e3]/[0.045] blur-[110px]" />
            </div>

            <div className="relative mx-auto max-w-[1300px]">
                {/* SECTION 1 */}
                <SectionStage variant="editorial" className="lg:max-h-[min(100vh-5.5rem,900px)]">
                    <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 xl:gap-x-10">
                        <Reveal className="lg:col-span-4 xl:col-span-4" variant="editorial">
                            <StoryLiveEyebrow index="00" label="Built by People. Powered by AI." />
                            <h2 className="mt-4 max-w-[12ch] text-[40px] leading-[0.92] tracking-[-0.052em] font-semibold text-slate-900 sm:text-[48px] md:mt-5 md:text-[56px] lg:text-[52px] xl:text-[58px] xl:leading-[0.92]">
                                The people behind{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] via-[#7c3aed] to-[#9b4dff]">
                                    the systems.
                                </span>
                            </h2>
                            <p className="mt-4 max-w-[38ch] text-[14px] leading-[1.75] text-slate-500/95 sm:text-[14.5px] md:text-[15px] lg:mt-3.5 lg:text-[14.5px] lg:leading-[1.72]">
                                The in-house team behind your <StoryTextAccent gradient>AI Growth System</StoryTextAccent>.{' '}
                                <StoryTextAccent>Marketing</StoryTextAccent>,{' '}
                                <StoryTextAccent gradient>AI Systems</StoryTextAccent>, and{' '}
                                <StoryTextAccent>Web Development</StoryTextAccent> delivered under one roof, from strategy through automation to measurable pipeline growth.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2 lg:mt-3">
                                {['MARKETING', 'AI SYSTEMS', 'WEB'].map((pill) => (
                                    <StoryTagPill key={pill} active={pill === 'AI SYSTEMS'}>
                                        {pill}
                                    </StoryTagPill>
                                ))}
                            </div>
                            <p className="mt-4 hidden text-[12px] leading-[1.7] text-slate-500/90 lg:block lg:max-w-[34ch]">
                                <StoryTagPill active className="!mr-2 !inline-flex">AMSTERDAM</StoryTagPill>
                                Shot during live build cycles on the studio floor. Proof of how Ukonnect ships, not how we pitch.
                            </p>
                        </Reveal>

                        <motion.figure
                            className="mt-10 lg:col-span-8 lg:mt-0 xl:col-span-8"
                            initial={{ opacity: 0, y: 22, scale: 0.98, filter: 'blur(8px)' }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-90px' }}
                            transition={{ duration: 0.85, ease: EASE_OUT }}
                        >
                            <OpeningEditorialFrame className="xl:-mr-2">
                                <div className="relative aspect-[5/4] w-full sm:aspect-[4/3] lg:aspect-[16/10] lg:max-h-[min(52vh,500px)]">
                                    <div className="absolute inset-0">
                                        <HeroFramedImage
                                            image={assets.teamHero}
                                            alt="The Ukonnect team, together"
                                            focal="center 10%"
                                            imageOffsetY={14}
                                        />
                                    </div>
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-white/10" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#5600e3]/5" />
                                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                                        <DocumentaryCapsuleLabel>DOCUMENTARY OPENING</DocumentaryCapsuleLabel>
                                    </div>
                                    <OpeningImageCaptionOverlay />
                                </div>
                            </OpeningEditorialFrame>
                        </motion.figure>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-5 lg:grid-cols-12 lg:gap-4">
                        <div className="contents sm:contents lg:col-span-9 lg:grid lg:grid-cols-3 lg:gap-3">
                            {peoplePanels.map((panel, idx) => (
                                <OpeningRoleCompact
                                    key={panel.title}
                                    index={idx + 1}
                                    title={panel.title}
                                    body={panel.body}
                                    tag={panel.tag}
                                    delay={idx * 0.05}
                                />
                            ))}
                        </div>
                        <OpeningTrustBand className="sm:col-span-2 lg:col-span-3" />
                    </div>

                    <div className="mt-6 rounded-[1rem] border border-slate-200/70 bg-white/50 p-4 lg:hidden">
                        <div className="flex items-center gap-2">
                            <StoryTagPill active>AMSTERDAM</StoryTagPill>
                            <span className="font-mono text-[9px] tracking-[0.22em] text-slate-300">/</span>
                            <StoryTagPill>STUDIO FLOOR</StoryTagPill>
                        </div>
                        <p className="mt-3 text-[12.5px] leading-[1.76] text-slate-500/88">
                            Shot on the studio floor during <StoryTextAccent>live build cycles</StoryTextAccent>. Proof of how Ukonnect ships, not how we pitch.
                        </p>
                    </div>
                </SectionStage>

                {/* SECTION 2 */}
                <SectionStage variant="tech" className="mt-24 md:mt-32 lg:mt-40">
                    <BehindSystemsExperience scenes={scenes} />
                </SectionStage>

                {/* SECTION 3 */}
                <SectionStage variant="tech" className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="02 / 05"
                        eyebrow="How We Work"
                        title="An interactive journey, not a static timeline."
                        subtitle="Five delivery phases across Marketing, AI Systems, and Web Development in one console."
                    />
                    <WorkAIPlatform steps={journey} />
                </SectionStage>

                {/* SECTION 4 */}
                <SectionStage variant="immersive" className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="03 / 05"
                        eyebrow="Office Experience"
                        title="An editorial view of where systems get built."
                        subtitle="Five studio rooms mapped to Marketing, AI Systems, and Web Development delivery."
                    />
                    <OfficeConfigurator panoramic={assets.officePanorama} rooms={officeRooms} />
                </SectionStage>

                {/* SECTION 5 */}
                <SectionStage variant="editorial" className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="04 / 05"
                        eyebrow="Culture"
                        title="Ownership, innovation, execution, curiosity, growth."
                        subtitle="Five values, one editorial wall. Hover any frame to read how it shows up in the work."
                    />
                    <CultureMosaic items={culture} />
                </SectionStage>

                {/* SECTION 6 */}
                <SectionStage variant="editorial" className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="05 / 05"
                        eyebrow="Leadership"
                        title="Built to outlast trends."
                        subtitle="A founder manifest inside one editorial panel: portrait, conviction, and operating pillars."
                    />
                    <LeadershipStatement image={assets.founder} />
                </SectionStage>

                {/* SECTION 7 */}
                <SectionStage variant="immersive" className="mt-24 md:mt-32 lg:mt-40">
                    <Reveal variant="immersive">
                        <StoryCard className="p-7 md:p-11">
                            {/* Ambient collaboration loop — muted, looping, masked behind a cinematic gradient */}
                            <video
                                className="absolute inset-0 h-full w-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                poster="/assets/company/collab-loop-poster.webp"
                                aria-hidden="true"
                            >
                                <source src="/assets/company/collab-loop.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/80 to-slate-950/55" />
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full bg-[#9b4dff]/30 blur-[95px]" />
                                <div className="absolute -bottom-20 -right-20 h-[420px] w-[420px] rounded-full bg-[#5600e3]/24 blur-[95px]" />
                            </div>

                            <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
                                <div>
                                    <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-[#c9b2ff]">Strategy session</p>
                                    <h3 className="mt-3 text-[30px] md:text-[52px] leading-[1.02] font-bold tracking-tight text-white">
                                        Let’s build your next
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#b98cff] to-[#8f5bff]">
                                            AI Growth System.
                                        </span>
                                    </h3>
                                </div>

                                <div className="flex justify-start md:justify-end">
                                    <motion.button
                                        type="button"
                                        aria-label="Open strategy call form"
                                        onClick={() => setModalOpen(true)}
                                        whileHover={{ y: -2, scale: 1.015 }}
                                        whileTap={{ scale: 0.985 }}
                                        transition={{ duration: 0.45, ease: EASE_OUT }}
                                        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 md:px-10 md:py-5 text-white font-semibold shadow-[0_18px_45px_rgba(86,0,227,0.38)] hover:bg-primary-hover transition-all"
                                    >
                                        Book a strategy call
                                        <ArrowRight2 size={17} color="#ffffff" variant="Bulk" />
                                    </motion.button>
                                </div>
                            </div>
                        </StoryCard>
                    </Reveal>
                </SectionStage>
            </div>

            <Suspense fallback={null}>
                <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </Suspense>
        </section>
    );
}

export default CompanyStoryExperience;

