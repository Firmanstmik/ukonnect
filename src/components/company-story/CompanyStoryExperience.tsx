import React, { Suspense, lazy, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight2 } from 'iconsax-react';
import { EASE_OUT } from '../motion';

const ContactFormModal = lazy(() => import('../ContactFormModal').then(m => ({ default: m.ContactFormModal })));
const EASE = [0.22, 1, 0.36, 1] as const;

type DocumentaryScene = {
    title: string;
    label: string;
    detail: string;
    note: string;
    alt: string;
    mediaType: 'image' | 'video';
    src: string;
    poster?: string;
    focal?: string;
    frame: 'landscape' | 'panoramic';
};
type JourneyStep = { title: string; image: string; micro: string; focal?: string; ratio: string };
type RoomCard = {
    title: string;
    image: string;
    blurb: string;
    pos: { top: string; left: string };
    focal?: string;
};
type CultureItem = {
    title: string;
    image: string;
    focal?: string;
    label: string;
    detail: string;
    note: string;
};

function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.72, delay, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
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

// Hero parallax that NEVER crops faces: a whisper of scale anchored to the top edge,
// so heads sitting at the top of the frame are always preserved on every breakpoint.
function HeroFramedImage({ image, alt, focal }: { image: string; alt: string; focal?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02]);
    const y = useTransform(scrollYProgress, [0, 1], [6, -6]);

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

function OpeningRolePanel({
    index,
    title,
    body,
    delay = 0,
}: {
    index: number;
    title: string;
    body: string;
    delay?: number;
}) {
    return (
        <Reveal delay={delay}>
            <motion.div
                className="group relative border-t border-slate-200/70 pt-5 transition-[border-color] duration-500 hover:border-primary/22 md:pt-[1.35rem]"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
            >
                <span
                    className="absolute left-0 top-5 h-px w-0 bg-gradient-to-r from-primary/55 to-primary/10 transition-all duration-500 group-hover:w-full md:top-[1.35rem]"
                    aria-hidden
                />
                <div className="flex items-baseline gap-3 pl-0.5">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-primary/48 tabular-nums transition-colors duration-500 group-hover:text-primary/62">
                        0{index}
                    </span>
                    <p className="text-[14px] font-semibold tracking-[-0.022em] text-slate-800 transition-colors duration-500 group-hover:text-slate-900 md:text-[15px]">
                        {title}
                    </p>
                </div>
                <p className="mt-3 max-w-[32ch] pl-[1.65rem] text-[13px] leading-[1.76] text-slate-500/92 transition-colors duration-500 group-hover:text-slate-500 md:text-[13.5px]">
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
        <Reveal>
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

function DocumentaryPreviewPanel({ scene, activeIndex, total }: { scene: DocumentaryScene; activeIndex: number; total: number }) {
    return (
        <figure className="w-full">
            <EditorialFrame className="w-full">
                <div className="relative aspect-[16/10] w-full max-h-[min(70vh,640px)] overflow-hidden lg:max-h-[min(68vh,600px)]">
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

                    <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5">
                        <div className="rounded-full border border-white/68 bg-white/80 px-3.5 py-1.5 shadow-[0_12px_24px_rgba(15,23,42,0.1)] backdrop-blur-sm">
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

            <figcaption className="mt-5 border-t border-slate-200/75 pt-5 sm:mt-6 sm:pt-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`caption-${scene.title}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.55, ease: EASE_OUT }}
                    >
                        <p className="font-mono text-[10px] tracking-[0.28em] text-primary/66">{scene.label.toUpperCase()}</p>
                        <p className="mt-2 text-[20px] sm:text-[24px] font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900">
                            {scene.title}
                        </p>
                        <p className="mt-2.5 max-w-[48ch] text-[13px] sm:text-[14px] leading-[1.72] text-slate-500">
                            {scene.detail}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </figcaption>
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
                    <div className="max-w-[31rem]">
                        <p className="font-mono text-[10px] tracking-[0.3em] text-primary/66">DOCUMENTARY / CHAPTER 01</p>
                        <h3 className="mt-3 text-[34px] leading-[0.94] tracking-[-0.04em] font-semibold text-slate-900">
                            Behind the Systems
                        </h3>
                    </div>
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
                        {scenes.map((scene, idx) => {
                            const isActive = idx === active;
                            return (
                                <motion.button
                                    key={scene.title}
                                    type="button"
                                    onClick={() => setActive(idx)}
                                    aria-pressed={isActive}
                                    className={`w-full rounded-xl border px-4 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 ${
                                        isActive
                                            ? 'border-primary/28 bg-primary/[0.05]'
                                            : 'border-transparent bg-transparent'
                                    }`}
                                    whileTap={{ scale: 0.998 }}
                                >
                                    <p className={`font-mono text-[10px] tracking-[0.22em] tabular-nums ${isActive ? 'text-primary/75' : 'text-slate-400'}`}>
                                        0{idx + 1}
                                    </p>
                                    <p className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${isActive ? 'text-primary/70' : 'text-slate-400'}`}>
                                        {scene.label}
                                    </p>
                                    <p className={`mt-1 text-[17px] font-semibold tracking-[-0.02em] ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                        {scene.title}
                                    </p>
                                    <AnimatePresence initial={false}>
                                        {isActive ? (
                                            <motion.p
                                                key={`note-${idx}`}
                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                transition={{ duration: 0.4, ease: EASE_OUT }}
                                                className="overflow-hidden text-[13px] leading-[1.65] text-slate-500"
                                            >
                                                {scene.note}
                                            </motion.p>
                                        ) : null}
                                    </AnimatePresence>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Desktop: one-viewport interactive documentary */}
            <div className="hidden lg:grid lg:grid-cols-[0.4fr_0.6fr] lg:items-stretch lg:gap-12 xl:gap-14 lg:min-h-[min(78vh,740px)]">
                <div className="flex min-h-0 flex-col">
                    <Reveal>
                        <div className="max-w-[26rem]">
                            <p className="font-mono text-[10px] tracking-[0.3em] text-primary/66">DOCUMENTARY / CHAPTER 01</p>
                            <h3 className="mt-3 text-[40px] xl:text-[52px] leading-[0.94] tracking-[-0.04em] font-semibold text-slate-900">
                                Behind the Systems
                            </h3>
                            <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.72] text-slate-500">
                                Captured in Amsterdam. Real rooms, review loops, and desk-side decisions — explored scene by scene.
                            </p>
                        </div>
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
                            {scenes.map((scene, idx) => {
                                const isActive = idx === active;
                                return (
                                    <motion.button
                                        key={scene.title}
                                        type="button"
                                        onClick={() => setActive(idx)}
                                        aria-pressed={isActive}
                                        className={`group relative w-full rounded-xl py-3.5 pl-8 pr-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 ${
                                            isActive ? 'bg-primary/[0.045]' : 'hover:bg-slate-50/80'
                                        }`}
                                        whileHover={{ x: 2 }}
                                        whileTap={{ scale: 0.998 }}
                                        transition={{ duration: 0.5, ease: EASE_OUT }}
                                    >
                                        <span
                                            className={`absolute left-[7px] top-4 h-2 w-2 rounded-full border transition-all duration-500 ${
                                                isActive
                                                    ? 'border-primary/70 bg-primary shadow-[0_0_0_4px_rgba(86,0,227,0.12)]'
                                                    : 'border-slate-300/90 bg-white group-hover:border-primary/35'
                                            }`}
                                            aria-hidden
                                        />
                                        <p className={`font-mono text-[10px] tracking-[0.24em] tabular-nums transition-colors ${
                                            isActive ? 'text-primary/78' : 'text-slate-400 group-hover:text-primary/55'
                                        }`}>
                                            0{idx + 1}
                                        </p>
                                        <p className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] transition-colors ${
                                            isActive ? 'text-primary/72' : 'text-slate-400'
                                        }`}>
                                            {scene.label}
                                        </p>
                                        <p className={`mt-1.5 text-[19px] xl:text-[21px] font-semibold leading-[1.08] tracking-[-0.03em] transition-colors ${
                                            isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                                        }`}>
                                            {scene.title}
                                        </p>
                                        <AnimatePresence initial={false}>
                                            {isActive ? (
                                                <motion.p
                                                    key={`note-${idx}`}
                                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
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
                            })}
                        </div>

                        <p className="mt-5 font-mono text-[10px] tracking-[0.28em] text-slate-400 tabular-nums">
                            SCENE 0{active + 1} OF 0{scenes.length}
                        </p>
                    </div>
                </div>

                <motion.div
                    className="sticky top-[5.25rem] flex min-h-0 w-full items-start self-start"
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
        { label: 'Based in', value: 'Amsterdam' },
        { label: 'Delivery', value: 'In-house team' },
        { label: 'Focus', value: 'Production systems' },
    ];

    return (
        <div className="mt-10 hidden border-t border-slate-200/60 pt-8 lg:block">
            <div className="grid grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.label}>
                        <p className="font-mono text-[9px] tracking-[0.3em] text-primary/48">{item.label.toUpperCase()}</p>
                        <p className="mt-1.5 text-[13px] font-medium tracking-[-0.01em] text-slate-800">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OfficeRoomChip({
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
            aria-pressed={active}
            className={`group min-w-[148px] shrink-0 text-left transition-colors md:min-w-0 ${
                active ? 'opacity-100' : 'opacity-72 hover:opacity-95'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.998 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
        >
            <div
                className={`relative overflow-hidden rounded-[1rem] border transition-all duration-500 ${
                    active
                        ? 'border-primary/30 shadow-[0_14px_36px_-20px_rgba(86,0,227,0.35)]'
                        : 'border-slate-200/70 group-hover:border-primary/18'
                }`}
            >
                <div className="aspect-[4/3] overflow-hidden bg-[#ebe6de]">
                    <StoryImage
                        image={room.image}
                        alt={room.title}
                        focal={room.focal}
                        zoom
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                </div>
                <span
                    className={`absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-500 ${
                        active ? 'scale-x-100 bg-primary/55' : 'scale-x-0 bg-primary/35 group-hover:scale-x-100'
                    }`}
                    aria-hidden
                />
            </div>
            <p className={`mt-2.5 font-mono text-[9px] tracking-[0.28em] tabular-nums ${active ? 'text-primary/62' : 'text-slate-400'}`}>
                0{index + 1}
            </p>
            <p className={`mt-1 text-[13px] font-semibold tracking-[-0.02em] ${active ? 'text-slate-900' : 'text-slate-700'}`}>
                {room.title}
            </p>
        </motion.button>
    );
}

function OfficeExperience({ panoramic, rooms }: { panoramic: string; rooms: RoomCard[] }) {
    const [active, setActive] = useState(0);
    const current = rooms[active];
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

    return (
        <div ref={ref} className="mt-10 md:mt-12">
            <motion.figure
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, ease: EASE_OUT }}
            >
                <OpeningEditorialFrame>
                    <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
                        <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
                            <StoryImage
                                image={panoramic}
                                alt="Inside the Ukonnect studio during a strategy session"
                                focal="center 38%"
                                className="h-full w-full object-cover"
                            />
                        </motion.div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/42 via-slate-950/6 to-white/8" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#5600e3]/10 via-transparent to-[#9b4dff]/10" />
                        <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(15,23,42,0.85)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(15,23,42,0.85)_0.5px,transparent_0.5px)] bg-[size:3px_3px]" />

                        <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                            <DocumentaryCapsuleLabel>STUDIO TOUR</DocumentaryCapsuleLabel>
                        </div>

                        <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
                            <div className="rounded-full border border-white/45 bg-slate-950/28 px-3 py-1.5 backdrop-blur-sm">
                                <p className="font-mono text-[10px] tracking-[0.22em] text-white/88 tabular-nums">
                                    0{active + 1} / 0{rooms.length}
                                </p>
                            </div>
                        </div>

                        <div className="absolute inset-0 hidden lg:block">
                            {rooms.map((room, idx) => {
                                const isActive = idx === active;
                                return (
                                    <motion.button
                                        key={room.title}
                                        type="button"
                                        onClick={() => setActive(idx)}
                                        aria-label={`View ${room.title}`}
                                        className="absolute -translate-x-1/2 -translate-y-1/2"
                                        style={{ top: room.pos.top, left: room.pos.left }}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.96 }}
                                        transition={{ duration: 0.45, ease: EASE_OUT }}
                                    >
                                        <span
                                            className={`relative flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                                                isActive
                                                    ? 'border-white bg-primary shadow-[0_0_0_6px_rgba(86,0,227,0.22)]'
                                                    : 'border-white/85 bg-white/35 hover:bg-white/55'
                                            }`}
                                        >
                                            {isActive ? (
                                                <motion.span
                                                    layoutId="office-active-pin"
                                                    className="absolute -inset-2 rounded-full border border-primary/35"
                                                    transition={{ duration: 0.45, ease: EASE_OUT }}
                                                />
                                            ) : null}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div className="absolute inset-x-4 bottom-4 hidden sm:inset-x-auto sm:bottom-5 sm:right-5 sm:block sm:w-[min(300px,36%)]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.title}
                                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                                    transition={{ duration: 0.55, ease: EASE_OUT }}
                                    className="overflow-hidden rounded-[1.05rem] border border-white/22 bg-white/10 backdrop-blur-md"
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <StoryImage
                                            image={current.image}
                                            alt={current.title}
                                            focal={current.focal}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="px-4 py-3.5">
                                        <p className="font-mono text-[9px] tracking-[0.3em] text-white/68">ROOM 0{active + 1}</p>
                                        <p className="mt-1 text-[15px] font-semibold tracking-[-0.02em] text-white">{current.title}</p>
                                        <p className="mt-1 text-[12px] leading-[1.65] text-white/82">{current.blurb}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </OpeningEditorialFrame>

                <motion.figcaption
                    className="mt-7 md:mt-9"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT }}
                >
                    <div className="grid gap-5 border-t border-slate-200/65 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-14 md:pt-7">
                        <div className="max-w-[32rem]">
                            <p className="font-mono text-[9px] tracking-[0.34em] text-primary/52 md:text-[10px]">AMSTERDAM / STUDIO FLOOR</p>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.title}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.45, ease: EASE_OUT }}
                                >
                                    <p className="mt-3 text-[21px] font-semibold leading-[1.06] tracking-[-0.036em] text-slate-900 sm:text-[24px] md:text-[28px]">
                                        {current.title}
                                    </p>
                                    <p className="mt-2.5 max-w-[42ch] text-[13px] leading-[1.76] text-slate-500 md:text-[14px]">
                                        {current.blurb}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="md:max-w-[24ch] md:text-right">
                            <span className="mb-3.5 hidden h-px w-10 bg-gradient-to-l from-slate-300/70 to-transparent md:ml-auto md:block" aria-hidden />
                            <p className="text-[12.5px] leading-[1.78] text-slate-400 md:text-[13px]">
                                Five rooms. One operating rhythm — mapped for clients who want to see where the work happens.
                            </p>
                        </div>
                    </div>
                </motion.figcaption>
            </motion.figure>

            <div className="mt-8 md:mt-10">
                <div className="flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
                    {rooms.map((room, idx) => (
                        <OfficeRoomChip
                            key={room.title}
                            room={room}
                            index={idx}
                            active={idx === active}
                            onSelect={() => setActive(idx)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function WorkJourney({ steps }: { steps: JourneyStep[] }) {
    const [activeStep, setActiveStep] = useState(2);
    const current = steps[activeStep];

    return (
        <div className="mt-9 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-5 items-start">
            <StoryCard className="p-5 md:p-6">
                <div className="relative">
                    <div className="absolute left-[15px] top-[18px] bottom-[18px] w-px bg-gradient-to-b from-primary/35 via-primary/15 to-transparent" />
                    <div className="space-y-3">
                        {steps.map((step, idx) => {
                            const active = idx === activeStep;
                            return (
                                <motion.button
                                    key={step.title}
                                    type="button"
                                    onClick={() => setActiveStep(idx)}
                                    className={`w-full text-left rounded-2xl border px-4 py-3 transition-all ${
                                        active
                                            ? 'border-primary/35 bg-primary/[0.08] shadow-[0_10px_30px_rgba(86,0,227,0.15)]'
                                            : 'border-white/70 bg-white/30 hover:border-primary/20'
                                    }`}
                                    whileHover={{ x: 2 }}
                                    whileTap={{ scale: 0.995 }}
                                    transition={{ duration: 0.4, ease: EASE_OUT }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`relative h-8 w-8 rounded-full border flex items-center justify-center ${
                                            active ? 'border-primary/45 bg-primary text-white' : 'border-slate-200/80 bg-white text-slate-500'
                                        }`}>
                                            <span className="text-[11px] font-bold">{idx + 1}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-700">{step.title}</p>
                                            <p className="mt-1 text-[13px] text-slate-500">{step.micro}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </StoryCard>

            <StoryCard className={`group w-full ${current.ratio}`}>
                <motion.div
                    key={current.title}
                    initial={{ opacity: 0.28, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.75, ease: EASE }}
                    className="absolute inset-0"
                >
                    <StoryImage image={current.image} alt={current.title} focal={current.focal} zoom className="h-full w-full object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/58 via-slate-950/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#5600e3]/14 via-transparent to-[#9b4dff]/15" />

                <div className="absolute left-6 right-6 bottom-6">
                    <motion.div
                        key={`${current.title}-overlay`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                        className="rounded-2xl border border-white/25 bg-white/12 backdrop-blur-md px-4 py-3"
                    >
                        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/85">{current.title}</p>
                        <p className="mt-1 text-[13px] text-white/90">{current.micro}</p>
                    </motion.div>
                </div>
            </StoryCard>
        </div>
    );
}

function CulturePaperFrame({
    item,
    index,
    active,
}: {
    item: CultureItem;
    index: number;
    active: boolean;
}) {
    return (
        <div className="relative h-full w-full">
            <div className="pointer-events-none absolute -inset-3 rounded-[1.6rem] bg-[radial-gradient(circle_at_20%_0%,rgba(155,77,255,0.16),transparent_55%)] blur-xl" aria-hidden />

            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] shadow-[0_24px_64px_-32px_rgba(15,23,42,0.28),0_0_0_1px_rgba(15,23,42,0.04)] md:rounded-[1.5rem]">
                <div className="flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 py-2.5 md:px-5">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
                        <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
                        <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
                    </div>
                    <p className="font-mono text-[8px] tracking-[0.28em] text-slate-400 md:text-[9px]">UKONNECT · CULTURE NODE</p>
                    <p className="font-mono text-[9px] tabular-nums text-primary/55">0{index + 1}</p>
                </div>

                <div className="relative flex-1 p-3 md:p-4">
                    <div className="relative h-full min-h-[200px] overflow-hidden rounded-[1rem] border border-slate-200/70 bg-[#f3f0ea] md:min-h-[260px] lg:min-h-[300px]">
                        <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(86,0,227,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(86,0,227,0.06)_1px,transparent_1px)] bg-[size:18px_18px]" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.99, filter: 'blur(3px)' }}
                                transition={{ duration: 0.5, ease: EASE_OUT }}
                                className="absolute inset-2 overflow-hidden rounded-[0.75rem] md:inset-2.5 md:rounded-[0.85rem]"
                            >
                                <StoryImage
                                    image={item.image}
                                    alt={item.title}
                                    focal={item.focal}
                                    className="h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/38 via-transparent to-white/8" />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute left-3 top-3 rounded-full border border-white/40 bg-slate-950/35 px-2.5 py-1 backdrop-blur-sm">
                            <p className="font-mono text-[8px] tracking-[0.24em] text-white/88">{item.label.toUpperCase()}</p>
                        </div>

                        {active ? (
                            <motion.span
                                layoutId="culture-paper-active"
                                className="absolute inset-0 rounded-[1rem] ring-2 ring-primary/35 ring-offset-2 ring-offset-[#f3f0ea]"
                                transition={{ duration: 0.45, ease: EASE_OUT }}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CultureAIPlatform({ items }: { items: CultureItem[] }) {
    const [active, setActive] = useState(0);
    const current = items[active];

    return (
        <motion.div
            className="relative mt-8 md:mt-10"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
        >
            <div className="overflow-hidden rounded-[1.5rem] border border-white/75 bg-[linear-gradient(160deg,rgba(255,255,255,0.97)_0%,rgba(248,244,238,0.95)_55%,rgba(241,235,226,0.98)_100%)] p-4 shadow-[0_28px_80px_-40px_rgba(86,0,227,0.28)] md:rounded-[1.85rem] md:p-5 lg:p-6">
                <div className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[radial-gradient(circle_at_top_right,rgba(155,77,255,0.08),transparent_42%)]" aria-hidden />

                <div className="relative flex flex-wrap gap-2 border-b border-slate-200/65 pb-4">
                    {items.map((item, idx) => {
                        const isActive = idx === active;
                        return (
                            <motion.button
                                key={item.title}
                                type="button"
                                onClick={() => setActive(idx)}
                                aria-pressed={isActive}
                                className={`rounded-full border px-3.5 py-2 text-left transition-all duration-500 md:px-4 ${
                                    isActive
                                        ? 'border-primary/30 bg-primary/[0.08] shadow-[0_10px_28px_-16px_rgba(86,0,227,0.45)]'
                                        : 'border-slate-200/80 bg-white/55 hover:border-primary/18 hover:bg-white/80'
                                }`}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ duration: 0.4, ease: EASE_OUT }}
                            >
                                <span className="font-mono text-[8px] tracking-[0.24em] text-primary/50 tabular-nums">0{idx + 1}</span>
                                <span className={`ml-2 text-[12px] font-semibold tracking-[-0.02em] md:text-[13px] ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {item.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                <div className="relative mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-5">
                    <CulturePaperFrame item={current} index={active} active />

                    <div className="flex flex-col justify-between rounded-[1.25rem] border border-slate-200/70 bg-white/72 p-5 backdrop-blur-sm md:p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.title}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 3 }}
                                transition={{ duration: 0.4, ease: EASE_OUT }}
                            >
                                <p className="font-mono text-[9px] tracking-[0.32em] text-primary/52">MANIFEST · 0{active + 1}</p>
                                <h4 className="mt-2 text-[22px] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-[26px]">
                                    {current.title}
                                </h4>
                                <p className="mt-3 text-[14px] leading-[1.7] text-slate-600 md:text-[15px]">{current.detail}</p>
                                <p className="mt-3 text-[12.5px] leading-[1.68] text-slate-400">{current.note}</p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-6 [&::-webkit-scrollbar]:hidden">
                            {items.map((item, idx) => (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={() => setActive(idx)}
                                    aria-label={`View ${item.title}`}
                                    className={`relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-[0.7rem] border transition-all duration-500 md:h-16 md:w-20 ${
                                        idx === active
                                            ? 'border-primary/35 shadow-[0_8px_24px_-12px_rgba(86,0,227,0.45)]'
                                            : 'border-slate-200/80 opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <StoryImage image={item.image} alt={item.title} focal={item.focal} className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                                    <span className="absolute bottom-1 left-1.5 font-mono text-[8px] text-white/90">0{idx + 1}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function LeadershipStatement({ image }: { image: string }) {
    const pillars = [
        { kicker: '01', title: 'Strategy', body: 'Commercial clarity before automation enters the room.' },
        { kicker: '02', title: 'Systems', body: 'Architecture that survives daily operations, not demos.' },
        { kicker: '03', title: 'Growth', body: 'Outcomes tracked, refined, and scaled with accountability.' },
    ];

    return (
        <div className="relative mt-16 md:mt-24">
            {/* Ambient Background Glow */}
            <motion.div
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
                className="pointer-events-none absolute -left-20 top-0 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
                style={{
                    background: 'linear-gradient(45deg, rgba(86,0,227,0.15), rgba(155,77,255,0.1), rgba(255,77,155,0.05), rgba(86,0,227,0.15))',
                    backgroundSize: '400% 400%',
                }}
                aria-hidden
            />

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 xl:gap-24">
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: EASE_OUT }}
                >
                    <div className="relative mx-auto max-w-[480px] lg:mx-0 lg:max-w-none group">
                        {/* The Living Frame */}
                        <div className="relative rounded-[2.2rem] bg-white/10 p-[3px] backdrop-blur-2xl md:rounded-[2.7rem] shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_32px_80px_-24px_rgba(15,23,42,0.3)]">
                            
                            {/* Animated Gradient Border using Framer Motion */}
                            <div className="absolute inset-0 overflow-hidden rounded-[2.2rem] md:rounded-[2.7rem]">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                    className="absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,rgba(155,77,255,0.8)_180deg,transparent_240deg)]"
                                />
                                {/* Inner mask to hollow out the rotating gradient */}
                                <div className="absolute inset-[3px] rounded-[2.1rem] bg-[#fdfaf5] md:rounded-[2.6rem]" />
                            </div>

                            {/* Inner Image Wrapper */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.05rem] md:rounded-[2.55rem] bg-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)] m-[3px]">
                                <StoryImage
                                    image={image}
                                    alt="Raffy, Ukonnect leadership"
                                    focal="center 30%"
                                    eager
                                    className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-[1.04]"
                                />
                                {/* Cinematic Overlays inside the image */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-white/10 mix-blend-overlay" />
                                <div className="pointer-events-none absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_40%)]" />
                                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] rounded-[2rem] md:rounded-[2.5rem]" />
                            </div>
                        </div>

                        {/* Floating Nameplate */}
                        <motion.div 
                            className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-8 rounded-[1.25rem] border border-white/60 bg-white/85 px-6 py-4 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.15)] backdrop-blur-xl md:px-8 md:py-5 z-20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
                        >
                            <p className="font-mono text-[9px] font-semibold tracking-[0.35em] text-primary/60 md:text-[10px]">LEADERSHIP</p>
                            <p className="mt-1.5 text-[20px] font-bold tracking-[-0.03em] text-slate-900 md:text-[24px]">Raffy</p>
                            <p className="mt-1 text-[13px] text-slate-500 md:text-[14px]">Strategy · Systems · Growth</p>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="relative">
                    <div className="relative z-10 lg:pl-4 xl:pl-8">
                        <Reveal>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-gradient-to-r from-primary/50 to-transparent md:w-12" />
                                <p className="font-mono text-[10px] font-medium tracking-[0.36em] text-primary/60 md:text-[11px]">FOUNDER STATEMENT</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h3 className="mt-8 max-w-[15ch] text-[36px] font-bold leading-[0.96] tracking-[-0.03em] text-slate-900 sm:text-[44px] md:mt-10 md:text-[54px] lg:text-[60px] xl:text-[68px]">
                                We build long-term systems,
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9b4dff]">
                                    not short-term hype.
                                </span>
                            </h3>
                        </Reveal>

                        <Reveal delay={0.18}>
                            <div className="relative mt-10 md:mt-14">
                                <div className="absolute -left-4 -top-6 text-[100px] leading-none text-slate-200/60 font-serif md:-left-8 md:-top-8 md:text-[140px]" aria-hidden>“</div>
                                <blockquote className="relative z-10 max-w-[28ch] text-[20px] font-medium leading-[1.4] tracking-[-0.015em] text-slate-600 sm:text-[24px] md:text-[28px] lg:text-[32px]">
                                    Turn AI into a reliable growth advantage for real businesses — with clarity, craftsmanship, and accountability.
                                </blockquote>
                            </div>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <div className="mt-12 grid gap-8 border-t border-slate-200/60 pt-8 sm:grid-cols-3 md:mt-16 md:gap-10 md:pt-10">
                                {pillars.map((pillar, idx) => (
                                    <div key={pillar.title} className="relative">
                                        <p className="font-mono text-[10px] font-medium tracking-[0.2em] text-primary/50">0{idx + 1} // {pillar.title.toUpperCase()}</p>
                                        <p className="mt-3 text-[13.5px] leading-[1.7] text-slate-500 md:text-[14.5px]">{pillar.body}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CompanyStoryExperience() {
    const [modalOpen, setModalOpen] = useState(false);

    const assets = useMemo(
        () => ({
            teamHero: '/assets/company/team-hero.webp',
            meeting: '/assets/company/meeting-boardroom.webp',
            teamCollab: '/assets/company/team-collaboration.webp',
            officeWide: '/assets/company/office-wide.webp',
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
        }),
        [],
    );

    const scenes: DocumentaryScene[] = useMemo(
        () => [
            {
                title: 'Desk-side build review',
                label: 'Operators at work',
                detail: 'Two teammates working through the build in real time, before the outcome ever looks effortless from the outside.',
                note: 'An intimate working moment with natural gestures, quiet concentration, and the kind of proximity that makes the process feel real.',
                alt: 'Ukonnect team reviewing build decisions together at a desk with laptop and dashboard',
                mediaType: 'video',
                src: assets.collabLoop,
                poster: assets.collabLoopPoster,
                focal: 'center 42%',
                frame: 'panoramic',
            },
            {
                title: 'Direction gets aligned in the room',
                label: 'Boardroom session',
                detail: 'Leadership, delivery, and growth share the same table before execution begins to move.',
                note: 'The strongest meeting still: enough energy in the room to feel lived-in, but composed enough to read as premium editorial photography.',
                alt: 'Ukonnect team reviewing direction together around a boardroom table',
                mediaType: 'image',
                src: assets.meeting,
                focal: 'center 34%',
                frame: 'landscape',
            },
            {
                title: 'The sprint takes shape before the sprint starts',
                label: 'Planning wall',
                detail: 'Priorities, design, and delivery are resolved in one conversation instead of being handed off in fragments.',
                note: 'It has the clearest sense of shared focus, with strong eyelines and enough depth to feel candid rather than arranged.',
                alt: 'Ukonnect team planning work together around a laptop and whiteboard',
                mediaType: 'image',
                src: assets.planning,
                focal: 'center 34%',
                frame: 'landscape',
            },
            {
                title: 'Questions are resolved in front of the system',
                label: 'Workshop floor',
                detail: 'Client-facing decisions happen live, with the room, the whiteboard, and the people carrying the discussion together.',
                note: 'The composition has the calm openness of a documentary still, which keeps the chapter from feeling crowded or performative.',
                alt: 'A workshop session with Ukonnect presenting in front of a whiteboard',
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
            { title: 'Discover', image: assets.discussion, micro: 'Context mapping + target clarity', focal: 'center 38%', ratio: 'aspect-[3/2]' },
            { title: 'Design', image: assets.blueprint, micro: 'System architecture + UX orchestration', focal: 'center 44%', ratio: 'aspect-[3/2]' },
            { title: 'Build', image: assets.developer, micro: 'Integrations + automation logic + QA', focal: 'center 32%', ratio: 'aspect-[4/5] max-w-[460px] mx-auto' },
            { title: 'Launch', image: assets.handshake, micro: 'Rollout + training + signal monitoring', focal: 'center 40%', ratio: 'aspect-[3/2]' },
            { title: 'Scale', image: assets.growth, micro: 'Optimization loops + growth multipliers', focal: 'center 46%', ratio: 'aspect-[3/2]' },
        ],
        [assets],
    );

    const officeRooms: RoomCard[] = useMemo(
        () => [
            { title: 'AI Lab', image: assets.devCollab, blurb: 'Experimentation with production standards.', pos: { top: '14%', left: '8%' }, focal: 'center 34%' },
            { title: 'Strategy Room', image: assets.strategy, blurb: 'Where priorities become action plans.', pos: { top: '10%', left: '58%' }, focal: 'center 38%' },
            { title: 'Creative Studio', image: assets.teamCollab, blurb: 'Interface, messaging, and conversion thinking.', pos: { top: '44%', left: '6%' }, focal: 'center 34%' },
            { title: 'Automation Hub', image: assets.developer, blurb: 'Integrations monitored and continuously improved.', pos: { top: '42%', left: '56%' }, focal: 'center 30%' },
            { title: 'Client Success', image: assets.handshake, blurb: 'Partnership reviews and growth roadmap syncs.', pos: { top: '68%', left: '25%' }, focal: 'center 40%' },
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
                detail: 'Everyone owns outcomes end-to-end — not tickets waiting in a queue.',
                note: 'Photographed during focused build sessions where accountability is visible in the room, not on a slide.',
            },
            {
                title: 'Innovation',
                image: assets.cultureEnergy,
                focal: 'center 40%',
                label: 'Momentum',
                detail: 'New ideas get tested against production standards, not pitch decks.',
                note: 'The energy in the studio when experiments move fast — but still have to survive real operations.',
            },
            {
                title: 'Execution',
                image: assets.cultureMeeting,
                focal: 'center 38%',
                label: 'Alignment',
                detail: 'Direction is resolved in the room before execution starts to fragment.',
                note: 'A working meeting with enough proximity and eye contact to feel candid, not performative.',
            },
            {
                title: 'Curiosity',
                image: assets.cultureMentoring,
                focal: 'center 32%',
                label: 'Mentorship',
                detail: 'Knowledge moves sideways across the team, not only top-down.',
                note: 'Side-by-side review moments where questions are welcomed and resolved in front of the system.',
            },
            {
                title: 'Growth',
                image: assets.cultureTeam,
                focal: 'center 34%',
                label: 'Together',
                detail: 'Progress is a team rhythm — strategy, build, and delivery in one operating cadence.',
                note: 'A company portrait that reads as culture evidence, not a stock substitute for a real team.',
            },
        ],
        [assets],
    );

    const peoplePanels = [
        { title: 'System Architects', body: 'Mapping the logic, constraints, and customer journey before automation enters the room.' },
        { title: 'Automation Engineers', body: 'Turning those decisions into reliable working systems that can survive daily use.' },
        { title: 'Growth Strategists', body: 'Keeping every technical choice tied to adoption, outcomes, and commercial reality.' },
    ];

    return (
        <section id="company-story" className="relative overflow-hidden py-[60px] md:py-[82px] lg:py-[118px] px-6">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[520px] w-[980px] rounded-full bg-[#5600e3]/[0.055] blur-[100px]" />
                <div className="absolute -left-44 top-[18%] h-[560px] w-[560px] rounded-full bg-[#9b4dff]/[0.05] blur-[110px]" />
                <div className="absolute -right-44 bottom-0 h-[560px] w-[560px] rounded-full bg-[#5600e3]/[0.045] blur-[110px]" />
            </div>

            <div className="relative mx-auto max-w-[1300px]">
                {/* SECTION 1 */}
                <div>
                    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <Reveal className="lg:col-span-5 xl:col-span-4 lg:pt-1">
                            <div className="max-w-[46rem] lg:max-w-none">
                                <div className="flex items-center gap-3 md:gap-3.5">
                                    <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-primary/62 tabular-nums md:text-[12px]">00</span>
                                    <span className="h-px w-7 bg-gradient-to-r from-primary/38 to-transparent md:w-10" />
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/58 md:text-[11px]">
                                        Built by People. Powered by AI.
                                    </p>
                                </div>
                                <h2 className="mt-6 max-w-[11ch] text-[40px] leading-[0.9] tracking-[-0.052em] font-semibold text-slate-900 sm:text-[52px] md:mt-7 md:text-[64px] lg:text-[72px] xl:text-[80px] xl:leading-[0.9] xl:tracking-[-0.056em]">
                                    The people behind the systems.
                                </h2>
                                <p className="mt-5 max-w-[36ch] text-[14.5px] leading-[1.82] text-slate-500/95 sm:mt-6 sm:text-[15px] md:max-w-[34ch] md:text-[16px] md:leading-[1.8]">
                                    Not models. Not placeholders. The actual team shaping strategy, automation, and delivery inside Ukonnect.
                                </p>
                            </div>

                            <div className="relative mt-8 max-w-[27ch] lg:mt-9 lg:max-w-none">
                                <span
                                    className="absolute bottom-1 left-0 top-1 w-px bg-gradient-to-b from-primary/32 via-slate-300/55 to-transparent"
                                    aria-hidden
                                />
                                <div className="pl-6 md:pl-7">
                                    <p className="font-mono text-[9px] tracking-[0.34em] text-primary/52 md:text-[10px]">AMSTERDAM / STUDIO FLOOR</p>
                                    <p className="mt-3.5 text-[12.5px] leading-[1.78] text-slate-500/88 md:mt-4 md:text-[13px] md:leading-[1.76]">
                                        Photographed during regular working sessions, so the section opens with evidence instead of marketing theatre.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 hidden lg:block lg:mt-12">
                                <div className="space-y-0">
                                    {peoplePanels.map((panel, idx) => (
                                        <OpeningRolePanel
                                            key={panel.title}
                                            index={idx + 1}
                                            title={panel.title}
                                            body={panel.body}
                                            delay={idx * 0.07}
                                        />
                                    ))}
                                </div>
                                <OpeningTrustStrip />
                            </div>
                        </Reveal>

                        <motion.div
                            className="mt-11 lg:col-span-7 lg:row-span-2 lg:mt-0 lg:sticky lg:top-[5.5rem] lg:self-start xl:col-span-8"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-90px' }}
                            transition={{ duration: 0.85, ease: EASE_OUT }}
                        >
                            <figure className="relative mx-auto max-w-[1180px] lg:max-w-none">
                                <OpeningEditorialFrame className="xl:-mr-4">
                                    <div className="relative aspect-[5/4] w-full sm:aspect-[4/3] lg:aspect-[16/11]">
                                        <div className="absolute inset-0">
                                            <HeroFramedImage image={assets.teamHero} alt="The Ukonnect team, together" focal="center 20%" />
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/8 via-transparent to-white/12" />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#5600e3]/5" />
                                        <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                                            <DocumentaryCapsuleLabel>DOCUMENTARY OPENING</DocumentaryCapsuleLabel>
                                        </div>
                                    </div>
                                </OpeningEditorialFrame>

                                <motion.figcaption
                                    className="mt-7 md:mt-8"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.7, delay: 0.14, ease: EASE_OUT }}
                                >
                                    <div className="grid gap-5 border-t border-slate-200/65 pt-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 md:pt-7 lg:gap-14">
                                        <div className="max-w-[30rem]">
                                            <p className="font-mono text-[9px] tracking-[0.34em] text-primary/52 md:text-[10px]">DOCUMENTARY&nbsp;&nbsp;№&nbsp;00</p>
                                            <p className="mt-3 text-[21px] font-semibold leading-[1.06] tracking-[-0.036em] text-slate-900 sm:text-[24px] md:mt-3.5 md:text-[28px] md:tracking-[-0.038em]">
                                                Real people. Real rooms. Real operating rhythm.
                                            </p>
                                        </div>
                                        <div className="md:max-w-[22ch] md:text-right">
                                            <span className="mb-3.5 hidden h-px w-10 bg-gradient-to-l from-slate-300/70 to-transparent md:ml-auto md:block" aria-hidden />
                                            <p className="text-[12.5px] leading-[1.78] text-slate-400 md:text-[13px] md:leading-[1.74]">
                                                A company portrait, not a stock-image substitute.
                                            </p>
                                        </div>
                                    </div>
                                </motion.figcaption>
                            </figure>
                        </motion.div>

                        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-3 lg:hidden">
                            {peoplePanels.map((panel, idx) => (
                                <OpeningRolePanel
                                    key={panel.title}
                                    index={idx + 1}
                                    title={panel.title}
                                    body={panel.body}
                                    delay={idx * 0.06}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* SECTION 2 */}
                <div className="mt-24 md:mt-32 lg:mt-40">
                    <BehindSystemsExperience scenes={scenes} />
                </div>

                {/* SECTION 3 */}
                <div className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="02 / 05"
                        eyebrow="How We Work"
                        title="An interactive journey, not a static timeline."
                        subtitle="Discover ↓ Design ↓ Build ↓ Launch ↓ Scale"
                    />
                    <WorkJourney steps={journey} />
                </div>

                {/* SECTION 4 */}
                <div className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="03 / 05"
                        eyebrow="Office Experience"
                        title="An editorial view of where systems get built."
                        subtitle="Five rooms. One studio rhythm — explore where strategy, build, and delivery converge."
                    />
                    <div className="relative left-1/2 w-screen -translate-x-1/2">
                        <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-10">
                            <OfficeExperience panoramic={assets.officeWide} rooms={officeRooms} />
                        </div>
                    </div>
                </div>

                {/* SECTION 5 */}
                <div className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="04 / 05"
                        eyebrow="Culture"
                        title="Ownership, innovation, execution, curiosity, growth."
                        subtitle="Five values in one view — switch nodes without scrolling through a long grid."
                    />
                    <CultureAIPlatform items={culture} />
                </div>

                {/* SECTION 6 */}
                <div className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="05 / 05"
                        eyebrow="Leadership"
                        title="Built to outlast trends."
                        subtitle="A founder statement with portrait weight — strategy led from inside the studio."
                    />
                    <LeadershipStatement image={assets.founder} />
                </div>

                {/* SECTION 7 */}
                <div className="mt-24 md:mt-32 lg:mt-40">
                    <Reveal>
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
                                    <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-[#c9b2ff]">Exclusive Strategy Session</p>
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
                                        Start Private Session
                                        <ArrowRight2 size={17} color="#ffffff" variant="Bulk" />
                                    </motion.button>
                                </div>
                            </div>
                        </StoryCard>
                    </Reveal>
                </div>
            </div>

            <Suspense fallback={null}>
                <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </Suspense>
        </section>
    );
}

export default CompanyStoryExperience;

