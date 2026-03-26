import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Eye, Heart, Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';
import teamPhoto from '../assets/Ukonnect Team Portugal.webp';
import cultureLargeLeft      from '../assets/Culture/Large left.jpg';
import cultureBentoUpper     from '../assets/Culture/Top bento row (upper).jpg';
import cultureBentoLower     from '../assets/Culture/Top bento row (lower).jpg';
import cultureBottomLeft     from '../assets/Culture/bottom row (left).jpg';
import cultureBottomCenter   from '../assets/Culture/bottom row (center).jpg';
import cultureBottomRight    from '../assets/Culture/bottom row (right).jpg';
import cultureExtraLeft      from '../assets/Culture/New bottom (left).jpg';
import cultureExtraRight     from '../assets/Culture/new bottom (right).jpg';
import teamRaffy   from '../assets/Team/Raffy.webp';
import teamKirsten from '../assets/Team/Kirsten.webp';
import teamSander  from '../assets/Team/Sander.webp';
import teamMarco   from '../assets/Team/Marco.webp';
import teamTanisha from '../assets/Team/Tanisha.webp';
import teamBram    from '../assets/Team/Bram.webp';
import teamGino    from '../assets/Team/Gino.webp';
import teamAfifah  from '../assets/Team/Afifah.webp';
import teamPaul    from '../assets/Team/Paul.webp';
import teamEdmerd  from '../assets/Team/Edmerd.webp';

// ── Animated number counter ────────────────────────────────────────────────
function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const duration = 1800;
        const startTime = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, to]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// ── Team members ───────────────────────────────────────────────────────────
const TEAM_MEMBERS = [
    { name: 'Marco',   roleKey: 'aboutPage.role.leadDev' as TranslationKey,            img: teamMarco   },
    { name: 'Sander',  roleKey: 'aboutPage.role.coo' as TranslationKey,                img: teamSander  },
    { name: 'Tanisha', roleKey: 'aboutPage.role.contentStrategist' as TranslationKey,  img: teamTanisha },
    { name: 'Kirsten', roleKey: 'aboutPage.role.cmo' as TranslationKey,                img: teamKirsten },
    { name: 'Bram',    roleKey: 'aboutPage.role.headAI' as TranslationKey,             img: teamBram    },
    { name: 'Paul',    roleKey: 'aboutPage.role.leadGen' as TranslationKey,            img: teamPaul    },
    { name: 'Gino',    roleKey: 'aboutPage.role.marketingStrategist' as TranslationKey, img: teamGino   },
    { name: 'Afifah',  roleKey: 'aboutPage.role.growthSpecialist' as TranslationKey,   img: teamAfifah  },
    { name: 'Edmerd',  roleKey: 'aboutPage.role.accountManager' as TranslationKey,     img: teamEdmerd  },
    { name: 'Raffy',   roleKey: 'aboutPage.role.ceo' as TranslationKey,                img: teamRaffy   },
];

// ── Value icons ────────────────────────────────────────────────────────────
const VALUE_ICONS = [
    <Zap className="w-5 h-5" />,
    <Eye className="w-5 h-5" />,
    <Heart className="w-5 h-5" />,
    <Rocket className="w-5 h-5" />,
];

// ── Ticker items ───────────────────────────────────────────────────────────
const TICKER_ITEMS = [
    'AI-First', 'Lead Generation', 'Transparent', 'Paid Ads',
    'Client-Obsessed', 'AI Automation', 'Fast Execution', 'Web Development',
];


export const AboutContent = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const STATS = [
        { value: 178, suffix: '',  labelKey: 'aboutPage.stat0.label' as TranslationKey },
        { value: 500, suffix: '+', labelKey: 'aboutPage.stat1.label' as TranslationKey },
        { value: 98,  suffix: '%', labelKey: 'aboutPage.stat2.label' as TranslationKey },
        { value: 3,   suffix: '+', labelKey: 'aboutPage.stat3.label' as TranslationKey },
    ];

    return (
        <>
            {/* ══════════════════════════════════════════════════════
                HERO
            ══════════════════════════════════════════════════════ */}
            <section className="relative pt-36 pb-20 overflow-hidden">

                {/* Background: dot grid + floating orbs */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, rgba(86,0,227,0.07) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }} />
                    <motion.div
                        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-10 right-[10%] w-[500px] h-[500px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(86,0,227,0.10) 0%, transparent 68%)' }}
                    />
                    <motion.div
                        animate={{ x: [0, -25, 0], y: [0, 35, 0], scale: [1, 1.18, 1] }}
                        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                        className="absolute -bottom-20 -left-10 w-[380px] h-[380px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(86,0,227,0.07) 0%, transparent 68%)' }}
                    />
                </div>

                <div className="max-w-[1300px] mx-auto px-6 relative">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">

                        {/* Left: copy */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55 }}
                                className="inline-flex items-center gap-2 bg-primary/8 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-6"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                {t('aboutPage.heroLabel')}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12, duration: 0.65 }}
                                className="text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-slate-900 leading-[1.06] mb-6"
                            >
                                {t('aboutPage.heroHeadingPre')}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9b4dff]">
                                    {t('aboutPage.heroHeadingHighlight')}
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.26, duration: 0.6 }}
                                className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg"
                            >
                                {t('aboutPage.heroSub')}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.42 }}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="px-8 py-3.5 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-full font-semibold transition-all shadow-md shadow-[#5600e3]/25 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 text-[15px]"
                                >
                                    {t('aboutPage.ctaButton')}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        </div>

                        {/* Right: team photo with floating stat badges */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.18, duration: 0.75 }}
                            className="relative"
                        >
                            {/* Glow halo behind photo */}
                            <div className="absolute inset-[-8px] rounded-[2.8rem] bg-gradient-to-br from-[#5600e3]/20 to-[#9b4dff]/10 blur-2xl" />

                            {/* Photo */}
                            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-slate-300/60">
                                <img
                                    src={teamPhoto}
                                    alt="Ukonnect team"
                                    className="w-full h-full object-cover object-top"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#5600e3]/20 via-transparent to-transparent" />
                            </div>

                            {/* Floating badge: companies */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                                className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-xl shadow-slate-200/80 border border-slate-100"
                            >
                                <p className="text-2xl font-bold text-[#5600e3] leading-none mb-0.5">178</p>
                                <p className="text-slate-500 text-xs font-medium">{t('aboutPage.stat0.label')}</p>
                            </motion.div>

                            {/* Floating badge: retention */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.85, type: 'spring', stiffness: 200 }}
                                className="absolute -top-5 -right-5 bg-[#5600e3] rounded-2xl px-5 py-4 shadow-xl shadow-[#5600e3]/30"
                            >
                                <p className="text-2xl font-bold text-white leading-none mb-0.5">98%</p>
                                <p className="text-white/70 text-xs font-medium">{t('aboutPage.stat2.label')}</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                SCROLLING TICKER
            ══════════════════════════════════════════════════════ */}
            <div className="overflow-hidden border-y border-slate-200 py-5 my-6">
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
                    className="flex w-max items-center gap-0"
                >
                    {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span key={i} className="flex items-center gap-5 px-0">
                            <span className="text-slate-400 font-semibold text-[13px] tracking-[0.18em] uppercase whitespace-nowrap">{item}</span>
                            <span className="w-1 h-1 rounded-full bg-[#5600e3] opacity-40 mx-5" />
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* ══════════════════════════════════════════════════════
                MISSION & VISION
            ══════════════════════════════════════════════════════ */}
            <section className="py-[60px] md:py-[80px] lg:py-[100px] max-w-[1300px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-6 items-stretch">

                    {/* Mission — purple */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-[#5600e3] text-white rounded-[2rem] p-10 md:p-12 overflow-hidden"
                    >
                        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/5" />
                        <div className="absolute -right-8 -bottom-12 w-40 h-40 rounded-full bg-white/5" />
                        <div className="absolute left-10 bottom-0 w-20 h-20 rounded-full bg-white/4" />
                        <div className="relative z-10">
                            <p className="text-white/55 font-semibold tracking-widest uppercase text-xs mb-5">{t('aboutPage.missionLabel')}</p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{t('aboutPage.missionHeading')}</h2>
                            <p className="text-white/75 text-lg leading-relaxed">{t('aboutPage.missionBody')}</p>
                        </div>
                    </motion.div>

                    {/* Vision — white */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.12 }}
                        className="bg-white rounded-[2rem] p-10 md:p-12 border border-slate-200 shadow-sm"
                    >
                        <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-5">{t('aboutPage.visionLabel')}</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">{t('aboutPage.visionHeading')}</h2>
                        <p className="text-slate-500 text-lg leading-relaxed">{t('aboutPage.visionBody')}</p>
                    </motion.div>
                </div>

                {/* Animated stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="bg-white rounded-[1.5rem] p-7 border border-slate-200 shadow-sm text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-[#5600e3] mb-1.5 tabular-nums">
                                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-slate-500 text-sm font-medium">{t(stat.labelKey)}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                TEAM GRID
            ══════════════════════════════════════════════════════ */}
            <section className="py-[60px] md:py-[80px] lg:py-[100px] max-w-[1300px] mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-3"
                    >{t('aboutPage.teamLabel')}</motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5"
                    >{t('aboutPage.teamHeading')}</motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.18 }}
                        className="text-slate-500 text-lg"
                    >{t('aboutPage.teamSub')}</motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                    {TEAM_MEMBERS.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.065, duration: 0.5 }}
                            whileHover={{ y: -6 }}
                            className="group relative bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden cursor-default transition-shadow hover:shadow-xl hover:shadow-slate-200/60"
                        >
                            {/* Photo */}
                            <div className="aspect-square overflow-hidden bg-slate-100">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                {/* Hover gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#5600e3]/0 group-hover:from-[#5600e3]/15 to-transparent transition-all duration-500" />
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
                                <p className="text-primary text-sm font-medium">{t(member.roleKey)}</p>
                            </div>

                            {/* Bottom accent bar on hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5600e3] to-[#9b4dff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                PHOTO GALLERY
            ══════════════════════════════════════════════════════ */}
            <section className="py-[60px] md:py-[80px] max-w-[1300px] mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-3"
                    >{t('aboutPage.galleryLabel')}</motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900"
                    >{t('aboutPage.galleryHeading')}</motion.h2>
                </div>

                {/* Top bento row */}
                <div className="grid grid-cols-12 gap-4" style={{ minHeight: '420px' }}>
                    {/* Large left photo (group from above) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="col-span-12 md:col-span-7 rounded-[2rem] overflow-hidden group relative"
                    >
                        <img
                            src={cultureLargeLeft}
                            alt="Ukonnect team"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 min-h-[300px] md:min-h-0"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>

                    {/* Two stacked right photos */}
                    <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex-1 rounded-[2rem] overflow-hidden group relative min-h-[180px]"
                        >
                            <img
                                src={cultureBentoUpper}
                                alt="Team on call"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.18 }}
                            className="flex-1 rounded-[2rem] overflow-hidden group relative min-h-[180px]"
                        >
                            <img
                                src={cultureBentoLower}
                                alt="Strategy session"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom row: 3 equal photos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {[
                        { src: cultureBottomLeft,   alt: 'Team culture' },
                        { src: cultureBottomCenter, alt: 'Strategy sessions' },
                        { src: cultureBottomRight,  alt: 'Deep work' },
                    ].map((photo, i) => (
                        <motion.div
                            key={photo.alt}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.09, duration: 0.5 }}
                            className="aspect-[4/3] rounded-[2rem] overflow-hidden group relative"
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Extra row: 2 wide photos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {[
                        { src: cultureExtraLeft,  alt: 'Working together' },
                        { src: cultureExtraRight, alt: 'Team discussion' },
                    ].map((photo, i) => (
                        <motion.div
                            key={photo.alt}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="aspect-video rounded-[2rem] overflow-hidden group relative"
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                VALUES
            ══════════════════════════════════════════════════════ */}
            <section className="py-[60px] md:py-[80px] lg:py-[100px] max-w-[1300px] mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-3"
                    >{t('aboutPage.valuesLabel')}</motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900"
                    >{t('aboutPage.valuesHeading')}</motion.h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {VALUE_ICONS.map((icon, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -6 }}
                            className="group bg-white rounded-[1.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all cursor-default"
                        >
                            <div className="w-12 h-12 bg-primary/8 text-primary rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                {icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                                {t(`aboutPage.value${i}.title` as TranslationKey)}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {t(`aboutPage.value${i}.desc` as TranslationKey)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                CTA BANNER
            ══════════════════════════════════════════════════════ */}
            <section className="pb-[80px] md:pb-[120px] max-w-[1300px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-[#5600e3] rounded-[2.5rem] p-12 md:p-16 lg:p-20 text-center overflow-hidden"
                >
                    {/* Decorative orbs */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/6" />
                    <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-white/6" />
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white"
                    />

                    {/* Dot grid overlay */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }} />

                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5"
                        >
                            {t('aboutPage.ctaHeading')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
                        >
                            {t('aboutPage.ctaSub')}
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ y: -2, scale: 1.02 }}
                            onClick={() => navigate('/contact')}
                            className="inline-flex items-center gap-2.5 px-10 py-4 bg-white text-[#5600e3] rounded-full font-bold text-[15px] hover:bg-white/92 transition-all shadow-xl shadow-slate-900/20"
                        >
                            {t('aboutPage.ctaButton')}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        </>
    );
};
