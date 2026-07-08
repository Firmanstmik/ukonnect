import React, { Suspense, lazy, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight2, Flash, MagicStar, ShieldTick, TickCircle, TrendUp } from 'iconsax-react';
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
type CultureItem = { title: string; image: string; icon: React.ReactNode; focal?: string; span: string; label?: string };

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
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.035, 1, 1.035]);
    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden">
            <motion.div style={{ scale, transformOrigin: 'center top' }} className="absolute inset-0 will-change-transform">
                <StoryImage image={image} alt={alt} focal={focal} eager className="h-full w-full object-cover" />
            </motion.div>
        </div>
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
            <div className="pointer-events-none absolute -inset-x-8 -top-12 -bottom-10 -z-10" aria-hidden="true">
                <div className="absolute left-1/2 top-1/2 h-[78%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[3.2rem] bg-[radial-gradient(circle_at_center,rgba(155,77,255,0.18),transparent_68%)] blur-[92px]" />
            </div>

            <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.65, ease: EASE_OUT }}
                className="relative rounded-[1.7rem] md:rounded-[2.15rem] border border-white/80 bg-gradient-to-b from-white via-white to-[#f3f0ea] p-2.5 md:p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.88)_inset,0_28px_64px_-30px_rgba(15,23,42,0.42),0_80px_140px_-58px_rgba(86,0,227,0.36)]"
            >
                <div className="relative overflow-hidden rounded-[1.2rem] md:rounded-[1.55rem] bg-[#ebe6dd] ring-1 ring-inset ring-slate-900/10">
                    {children}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.58),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_-48px_90px_rgba(15,23,42,0.1)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(15,23,42,0.14)_100%)]" />
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

const DOCUMENTARY_LAYOUTS: Record<DocumentaryScene['frame'], string> = {
    landscape: 'aspect-[4/3] md:aspect-[3/2]',
    panoramic: 'aspect-[16/10] md:aspect-[16/9]',
};

function DocumentarySceneMedia({ scene }: { scene: DocumentaryScene }) {
    if (scene.mediaType === 'video') {
        return (
            <video
                key={scene.src}
                className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out will-change-transform group-hover:scale-[1.025]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={scene.poster}
                style={scene.focal ? { objectPosition: scene.focal } : undefined}
            >
                <source src={scene.src} type="video/mp4" />
            </video>
        );
    }

    return <StoryImage image={scene.src} alt={scene.alt} focal={scene.focal} zoom className="h-full w-full object-cover" />;
}

function BehindSystemsExperience({ scenes }: { scenes: DocumentaryScene[] }) {
    const [active, setActive] = useState(0);
    const featured = scenes[active];

    return (
        <div className="mt-12 grid grid-cols-1 gap-10 xl:grid-cols-[0.52fr_0.48fr] xl:items-start">
            <div>
                <Reveal>
                    <div className="max-w-[30rem]">
                        <p className="font-mono text-[11px] tracking-[0.28em] text-primary/68">DOCUMENTARY / CHAPTER 01</p>
                        <h3 className="mt-3 text-[34px] md:text-[54px] leading-[0.96] tracking-[-0.035em] font-semibold text-slate-900">
                            Behind the Systems
                        </h3>
                        <p className="mt-5 text-[16px] md:text-[18px] leading-relaxed text-slate-500">
                            Captured in Amsterdam. These aren&apos;t staged gestures or stock-office scenes. They&apos;re the real rooms, review loops, and desk-side decisions that shape delivery.
                        </p>
                    </div>
                </Reveal>

                <div className="mt-10 space-y-5 md:space-y-6">
                    {scenes.map((scene, idx) => {
                        const isActive = idx === active;
                        return (
                            <motion.button
                                key={scene.title}
                                type="button"
                                onClick={() => setActive(idx)}
                                className="group w-full border-b border-slate-300/75 pb-5 text-left"
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.998 }}
                                transition={{ duration: 0.45, ease: EASE_OUT }}
                            >
                                <div className="flex gap-4 md:gap-5">
                                    <span className={`pt-0.5 font-mono text-[10px] md:text-[11px] tracking-[0.2em] tabular-nums transition-colors ${
                                        isActive ? 'text-primary/80' : 'text-slate-400 group-hover:text-primary/60'
                                    }`}>
                                        0{idx + 1}
                                    </span>
                                    <div className="min-w-0">
                                        <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                                            isActive ? 'text-primary/75' : 'text-slate-400 group-hover:text-primary/65'
                                        }`}>
                                            {scene.label}
                                        </p>
                                        <p className={`mt-2 text-[21px] md:text-[26px] leading-[1.08] tracking-[-0.03em] transition-colors ${
                                            isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                                        }`}>
                                            {scene.title}
                                        </p>
                                        <p className="mt-2.5 max-w-[34ch] text-[14px] md:text-[15px] leading-relaxed text-slate-500">
                                            {scene.note}
                                        </p>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <motion.figure
                className="relative"
                initial={{ opacity: 0, scale: 0.985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
            >
                <EditorialFrame>
                    <motion.div
                        layout
                        transition={{ layout: { duration: 0.6, ease: EASE } }}
                        className={`relative ${DOCUMENTARY_LAYOUTS[featured.frame]}`}
                    >
                        <motion.div
                            key={`${featured.src}-${featured.mediaType}`}
                            initial={{ opacity: 0.32, scale: 1.035 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.72, ease: EASE }}
                            className="absolute inset-0"
                        >
                            <DocumentarySceneMedia scene={featured} />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-white/6" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#5600e3]/8 via-transparent to-[#9b4dff]/8" />
                        <div className="absolute left-4 top-4 rounded-full border border-white/65 bg-white/82 px-3 py-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:left-5 sm:top-5">
                            <p className="font-mono text-[10px] tracking-[0.24em] text-slate-600">CAPTURED IN AMSTERDAM</p>
                        </div>
                    </motion.div>
                </EditorialFrame>

                <figcaption className="mt-6 flex flex-col gap-4 md:mt-7 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="font-mono text-[11px] tracking-[0.28em] text-primary/68">SCENE 0{active + 1}</p>
                        <p className="mt-2 text-[24px] md:text-[31px] font-semibold tracking-[-0.03em] text-slate-900">
                            {featured.title}
                        </p>
                    </div>
                    <p className="max-w-[29ch] text-[14px] md:text-[15px] leading-relaxed text-slate-500 md:text-right">
                        {featured.detail}
                    </p>
                </figcaption>
            </motion.figure>
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

function OfficeEditorial({ panoramic, rooms }: { panoramic: string; rooms: RoomCard[] }) {
    return (
        <StoryCard className="mt-8 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]">
            <div className="absolute inset-0">
                <StoryImage image={panoramic} alt="Inside the Ukonnect studio during a strategy session" focal="center 38%" className="h-full w-full object-cover opacity-[0.82]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/0 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#5600e3]/10 via-transparent to-[#9b4dff]/12" />
            </div>

            <div className="hidden md:block absolute inset-0">
                {rooms.map((room, idx) => (
                    <motion.div
                        key={room.title}
                        className="absolute"
                        style={{ top: room.pos.top, left: room.pos.left }}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-70px' }}
                        transition={{ duration: 0.7, delay: idx * 0.06, ease: EASE_OUT }}
                        whileHover={{ y: -6, scale: 1.02 }}
                    >
                        <div
                            className="group relative w-[220px] rounded-[1.35rem] overflow-hidden border border-white/65 bg-white/12 backdrop-blur-xl shadow-[0_16px_50px_rgba(15,23,42,0.2)]"
                        >
                            <div className="absolute inset-0">
                                <StoryImage
                                    image={room.image}
                                    alt={room.title}
                                    focal={room.focal}
                                    zoom
                                    className="h-full w-full object-cover opacity-55"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
                            </div>
                            <div className="relative px-4 py-4">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/82">{room.title}</p>
                                <p className="mt-1.5 text-[13px] text-white/90 leading-snug">{room.blurb}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="md:hidden relative p-5">
                <div className="grid grid-cols-2 gap-3">
                    {rooms.map((room, idx) => (
                        <Reveal key={room.title} delay={idx * 0.05}>
                            <div
                                className="relative rounded-xl border border-white/60 bg-white/12 p-3 backdrop-blur-md"
                            >
                                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90">{room.title}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </StoryCard>
    );
}

function CultureFlow({ items }: { items: CultureItem[] }) {
    return (
        <div className="mt-9 grid grid-cols-2 lg:grid-cols-6 auto-rows-[150px] lg:auto-rows-[184px] gap-4">
            {items.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.05} className={`${item.span} h-full`}>
                    <motion.div
                        className="group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/10"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                    >
                        <StoryImage image={item.image} alt={item.title} focal={item.focal} zoom className="h-full w-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/12 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4">
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/14 text-white shadow-[0_8px_24px_rgba(86,0,227,0.25)]">
                                {item.icon}
                            </span>
                            <span className="min-w-0">
                                <span className="block text-[13.5px] font-semibold leading-tight text-white">{item.title}</span>
                                {item.label ? <span className="mt-0.5 block text-[11px] tracking-wide text-white/70">{item.label}</span> : null}
                            </span>
                        </div>
                    </motion.div>
                </Reveal>
            ))}
        </div>
    );
}

function FounderEditorial({ image }: { image: string }) {
    return (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-10 lg:gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, ease: EASE_OUT }}
                className="relative"
            >
                <div className="group relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[1.75rem] shadow-[0_40px_100px_-35px_rgba(15,23,42,0.5)] lg:mx-0 lg:max-w-none">
                    <StoryImage image={image} alt="Ukonnect leadership at work" focal="center top" zoom className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
                </div>
                <div className="absolute -right-4 -bottom-4 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 backdrop-blur-md shadow-[0_14px_40px_rgba(15,23,42,0.14)]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/70">Leadership</p>
                    <p className="mt-1 text-[14px] italic text-slate-700">The team behind Ukonnect</p>
                </div>
            </motion.div>

            <div>
                <Reveal>
                    <h3 className="text-[32px] md:text-[52px] leading-[0.98] font-bold tracking-[-0.03em] text-slate-900 max-w-[16ch]">
                        We build long-term systems,
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9b4dff]">
                            not short-term hype.
                        </span>
                    </h3>
                </Reveal>
                <Reveal delay={0.1}>
                    <blockquote className="mt-8 border-l-2 border-primary/30 pl-6 md:pl-8 text-[21px] md:text-[30px] leading-[1.32] font-medium tracking-[-0.01em] text-slate-600 max-w-[24ch] md:max-w-[26ch]">
                        “Turn AI into a reliable growth advantage for real businesses — with clarity, craftsmanship, and accountability.”
                    </blockquote>
                </Reveal>
                <Reveal delay={0.18}>
                    <p className="mt-8 text-[12px] uppercase tracking-[0.22em] font-semibold text-primary/70">
                        Strategy · Systems · Growth
                    </p>
                </Reveal>
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
            founder: '/assets/company/founder-portrait.webp',
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
                detail: 'Two teammates working through the logic together, before it becomes production behaviour.',
                note: 'The strongest moving asset in the library: natural body language, clear gestures, and a real sense of hands-on problem solving.',
                alt: 'Two Ukonnect teammates reviewing build logic together on a laptop',
                mediaType: 'video',
                src: assets.collabLoop,
                poster: assets.collabLoopPoster,
                focal: 'center center',
                frame: 'panoramic',
            },
            {
                title: 'Direction gets aligned in the room.',
                label: 'Boardroom session',
                detail: 'Leadership, delivery, and growth share the same table before execution starts.',
                note: 'It has the best group energy of the meeting stills without feeling staged or overly posed.',
                alt: 'Ukonnect team reviewing direction together around a boardroom table',
                mediaType: 'image',
                src: assets.meeting,
                focal: 'center 34%',
                frame: 'landscape',
            },
            {
                title: 'The sprint takes shape before the sprint starts.',
                label: 'Planning wall',
                detail: 'Design, delivery, and priorities are mapped in one conversation instead of handed off in pieces.',
                note: 'Strong eye-lines and depth make this feel candid, collaborative, and grounded in real working rhythm.',
                alt: 'Ukonnect team planning work together around a laptop and whiteboard',
                mediaType: 'image',
                src: assets.planning,
                focal: 'center 34%',
                frame: 'landscape',
            },
            {
                title: 'Questions are resolved in front of the system.',
                label: 'Workshop floor',
                detail: 'Client-facing decisions happen live, with the whiteboard and the room carrying the discussion.',
                note: 'The framing is clean and documentary-like, with enough air around the scene to feel premium rather than busy.',
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
            { title: 'Ownership', image: assets.cultureFocus, icon: <ShieldTick size={16} variant="Bulk" color="#ffffff" />, focal: 'center 22%', span: 'col-span-2 row-span-2 lg:col-span-2 lg:row-span-2', label: 'Deep work' },
            { title: 'Innovation', image: assets.cultureEnergy, icon: <MagicStar size={16} variant="Bulk" color="#ffffff" />, focal: 'center 40%', span: 'col-span-2 lg:col-span-4', label: 'Momentum' },
            { title: 'Execution', image: assets.cultureMeeting, icon: <TickCircle size={16} variant="Bulk" color="#ffffff" />, focal: 'center 38%', span: 'col-span-1 lg:col-span-2' },
            { title: 'Curiosity', image: assets.cultureMentoring, icon: <Flash size={16} variant="Bulk" color="#ffffff" />, focal: 'center 32%', span: 'col-span-1 lg:col-span-2' },
            { title: 'Growth', image: assets.cultureTeam, icon: <TrendUp size={16} variant="Bulk" color="#ffffff" />, focal: 'center 34%', span: 'col-span-2 lg:col-span-6', label: 'Together' },
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
                    <Reveal>
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.34fr)] lg:items-end">
                            <div>
                                <div className="flex items-center gap-3.5">
                                    <span className="font-mono text-[12px] md:text-[13px] font-medium tracking-[0.28em] text-primary/70">00</span>
                                    <span className="h-px w-8 md:w-12 bg-gradient-to-r from-primary/45 to-transparent" />
                                    <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.24em] text-primary/70">Built by People. Powered by AI.</p>
                                </div>
                                <h2 className="mt-5 max-w-[13ch] text-[40px] md:text-[68px] lg:text-[84px] leading-[0.92] tracking-[-0.05em] font-semibold text-slate-900">
                                    The people behind the systems.
                                </h2>
                                <p className="mt-6 max-w-[44ch] text-[16px] md:text-[18px] leading-relaxed text-slate-500">
                                    Not models. Not placeholders. The actual team shaping strategy, automation, and delivery inside Ukonnect.
                                </p>
                            </div>

                            <div className="max-w-[24ch] lg:justify-self-end">
                                <div className="border-l border-slate-300/80 pl-5">
                                    <p className="font-mono text-[11px] tracking-[0.28em] text-primary/68">AMSTERDAM / STUDIO FLOOR</p>
                                    <p className="mt-3 text-[14px] leading-relaxed text-slate-500">
                                        Photographed during regular working sessions, so the section opens with evidence instead of marketing theatre.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <motion.div
                        className="mt-10 md:mt-14"
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-90px' }}
                        transition={{ duration: 0.8, ease: EASE_OUT }}
                    >
                        <figure className="relative mx-auto max-w-[1180px]">
                            <EditorialFrame>
                                <div className="relative aspect-[4/3] w-full">
                                    <div className="absolute inset-0">
                                        <HeroFramedImage image={assets.teamHero} alt="The Ukonnect team, together" focal="center 22%" />
                                    </div>
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/12 via-transparent to-white/8" />
                                    <div className="absolute left-4 top-4 rounded-full border border-white/65 bg-white/82 px-3 py-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:left-5 sm:top-5">
                                        <p className="font-mono text-[10px] tracking-[0.24em] text-slate-600">DOCUMENTARY OPENING</p>
                                    </div>
                                </div>
                            </EditorialFrame>

                            <figcaption className="mt-7 flex flex-col gap-4 pl-0.5 md:mt-8 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <p className="font-mono text-[11px] md:text-[12px] tracking-[0.3em] text-primary/70">DOCUMENTARY&nbsp;&nbsp;№&nbsp;00</p>
                                    <p className="mt-2.5 text-[22px] md:text-[31px] font-semibold tracking-[-0.03em] text-slate-900 leading-[1.12]">
                                        Real people. Real rooms. Real operating rhythm.
                                    </p>
                                </div>
                                <p className="text-[13px] md:text-[14px] leading-relaxed text-slate-400 md:max-w-[26ch] md:text-right">
                                    A company portrait that reads as a company portrait, not a startup stock-image substitute.
                                </p>
                            </figcaption>
                        </figure>

                        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-3">
                            {peoplePanels.map((panel, idx) => (
                                <Reveal
                                    key={panel.title}
                                    delay={idx * 0.05}
                                    className="border-t border-slate-300/80 pt-4"
                                >
                                    <div className="flex items-baseline gap-2.5">
                                        <span className="font-mono text-[11px] tracking-[0.18em] text-primary/55 tabular-nums">0{idx + 1}</span>
                                        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-800">{panel.title}</p>
                                    </div>
                                    <p className="mt-3 max-w-[34ch] text-[13.5px] leading-relaxed text-slate-500">{panel.body}</p>
                                </Reveal>
                            ))}
                        </div>
                    </motion.div>
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
                    />
                    <div className="relative left-1/2 w-screen -translate-x-1/2">
                        <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-10">
                            <OfficeEditorial panoramic={assets.officeWide} rooms={officeRooms} />
                        </div>
                    </div>
                </div>

                {/* SECTION 5 */}
                <div className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading
                        index="04 / 05"
                        eyebrow="Culture"
                        title="Ownership, innovation, execution, curiosity, growth."
                    />
                    <CultureFlow items={culture} />
                </div>

                {/* SECTION 6 */}
                <div className="mt-24 md:mt-32 lg:mt-40">
                    <SectionHeading index="05 / 05" eyebrow="Leadership" title="Built to outlast trends." />
                    <FounderEditorial image={assets.founder} />
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

