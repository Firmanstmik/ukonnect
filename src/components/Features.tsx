import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { BrainCircuit, Edit3, Target, TrendingUp, Crosshair, Activity, Zap } from 'lucide-react';
import { AILeadGenerationEngine } from './AILeadGenerationEngine';

const TABS = ['Marketing', 'AI Systems', 'Web Development'] as const;
const DEFAULT_TAB = 1; // AI Systems active by default

/* ── Illustration Components ─────────────────────────────── */

// AI Systems
const IllBrainOrbit = () => (
    <>
        <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center z-10">
            <BrainCircuit className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-dashed border-slate-300 animate-[spin_20s_linear_infinite]" />
            <div className="w-32 h-32 absolute rounded-full border border-dashed border-slate-300 animate-[spin_15s_linear_infinite_reverse]" />
        </div>
    </>
);

const IllChat = () => (
    <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-[280px] bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
            <div className="h-3 w-2/3 bg-slate-100 rounded-full mb-3" />
            <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
        </div>
        <div className="w-full max-w-[280px] bg-primary text-white rounded-xl p-4 shadow-sm self-end opacity-90">
            <div className="h-3 w-2/3 bg-white/20 rounded-full mb-3" />
            <div className="h-3 w-full bg-white/20 rounded-full" />
        </div>
    </div>
);

const IllEditor = () => (
    <div className="w-[80%] h-[150%] bg-white border border-slate-200 rounded-t-xl shadow-sm absolute bottom-0 flex flex-col p-6">
        <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-3 h-3 rounded-full bg-slate-200" />
        </div>
        <div className="h-6 w-1/3 bg-slate-100 rounded-md mb-4" />
        <div className="space-y-3">
            <div className="h-2 w-full bg-slate-100 rounded-full" />
            <div className="h-2 w-full bg-slate-100 rounded-full" />
            <div className="h-2 w-4/5 bg-slate-100 rounded-full" />
        </div>
        <div className="mt-auto self-end bg-primary w-10 h-10 rounded-full flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-white" />
        </div>
    </div>
);

const IllBarChart = () => (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-4 flex gap-4 shadow-sm items-end h-[160px]">
        <div className="w-1/4 bg-slate-100 rounded flex-1 h-[40%]" />
        <div className="w-1/4 bg-primary/20 rounded flex-1 h-[70%]" />
        <div className="w-1/4 bg-primary/40 rounded flex-1 h-[50%]" />
        <div className="w-1/4 bg-primary rounded flex-1 h-[90%]" />
    </div>
);

// Marketing
const IllTarget = () => (
    <>
        <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center z-10">
            <Target className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-44 h-44 rounded-full border-2 border-primary/10 animate-[pulse_3s_ease-in-out_infinite]" />
            <div className="w-28 h-28 absolute rounded-full border-2 border-primary/15 animate-[pulse_3s_ease-in-out_0.5s_infinite]" />
        </div>
    </>
);

const IllFunnel = () => (
    <div className="flex flex-col items-center gap-0 w-full max-w-[200px]">
        <div className="w-full h-10 bg-primary/10 rounded-t-xl flex items-center justify-center">
            <div className="h-2.5 w-3/4 bg-primary/15 rounded-full" />
        </div>
        <div className="w-3/4 h-10 bg-primary/15 flex items-center justify-center">
            <div className="h-2.5 w-2/3 bg-primary/20 rounded-full" />
        </div>
        <div className="w-1/2 h-10 bg-primary/20 flex items-center justify-center">
            <div className="h-2.5 w-1/2 bg-primary/30 rounded-full" />
        </div>
        <div className="w-1/4 h-10 bg-primary rounded-b-xl" />
    </div>
);

const IllTrend = () => (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <div className="h-2.5 w-20 bg-slate-100 rounded-full" />
        </div>
        <svg viewBox="0 0 200 80" className="w-full" fill="none">
            <path d="M0 70 Q50 65 80 50 T160 20 L200 10" stroke="#5600e3" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <path d="M0 70 Q50 65 80 50 T160 20 L200 10 L200 80 L0 80 Z" fill="url(#trendFill)" />
            <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5600e3" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#5600e3" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    </div>
);

const IllStrategy = () => (
    <>
        <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center z-10">
            <Crosshair className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="absolute w-full h-px bg-slate-300" />
            <div className="absolute w-px h-full bg-slate-300" />
            <div className="absolute w-3/4 h-px bg-slate-200 rotate-45" />
            <div className="absolute w-3/4 h-px bg-slate-200 -rotate-45" />
        </div>
    </>
);

// Web Development
const IllBrowser = () => (
    <div className="w-[85%] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100">
            <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
            <div className="flex-1 h-5 bg-slate-50 rounded-md ml-2" />
        </div>
        <div className="p-4 space-y-3">
            <div className="h-16 bg-primary/10 rounded-lg" />
            <div className="grid grid-cols-3 gap-2">
                <div className="h-10 bg-slate-100 rounded" />
                <div className="h-10 bg-slate-100 rounded" />
                <div className="h-10 bg-slate-100 rounded" />
            </div>
        </div>
    </div>
);

const IllLandingPage = () => (
    <div className="w-[75%] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 space-y-3 text-center">
            <div className="h-4 w-1/2 bg-slate-200 rounded-full mx-auto" />
            <div className="h-2.5 w-3/4 bg-slate-100 rounded-full mx-auto" />
            <div className="h-2.5 w-2/3 bg-slate-100 rounded-full mx-auto" />
            <div className="h-8 w-24 bg-primary rounded-lg mx-auto mt-2" />
        </div>
        <div className="px-4 pb-4">
            <div className="h-16 bg-slate-50 rounded-lg border border-slate-100" />
        </div>
    </div>
);

const IllTracking = () => (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="h-14 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary/40" />
            </div>
            <div className="h-14 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center">
                <div className="h-2 w-12 bg-slate-200 rounded-full" />
            </div>
        </div>
        <div className="h-[60px] bg-slate-50 rounded-lg border border-slate-100 flex items-end p-2 gap-1.5">
            {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-sm" style={{ height: `${h}%` }} />
            ))}
        </div>
    </div>
);

const IllSpeed = () => (
    <>
        <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center z-10">
            <Zap className="w-8 h-8 text-primary" />
        </div>
        <svg className="absolute w-40 h-40" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="6 4" />
            <circle cx="50" cy="50" r="42" stroke="#5600e3" strokeWidth="4" strokeDasharray="6 4" strokeDashoffset="60" opacity="0.3" />
        </svg>
    </>
);

/* ── Tab card data ───────────────────────────────────────── */

const TAB_CARDS: Record<string, { title: string; description: string; illustration: React.ReactNode }[]> = {
    'Marketing': [
        { title: 'Paid Advertising', description: 'Performance campaigns on Meta and Google that generate high-intent leads.', illustration: <IllTarget /> },
        { title: 'Conversion Funnels', description: 'High-converting funnels designed to turn traffic into qualified opportunities.', illustration: <IllFunnel /> },
        { title: 'Performance Optimization', description: 'Continuous testing and AI-driven optimization to improve cost per lead and ROI.', illustration: <IllTrend /> },
        { title: 'Lead Generation Strategy', description: 'Targeting, messaging, and positioning that attract the right customers.', illustration: <IllStrategy /> },
    ],
    'AI Systems': [
        { title: 'AI Lead Generation', description: 'AI-powered campaigns that continuously generate high-intent leads through Meta, Google, and performance-driven targeting.', illustration: <AILeadGenerationEngine /> },
        { title: 'AI Sales Automation', description: 'AI agents that qualify leads, handle follow-ups, and book meetings so your sales team focuses on closing.', illustration: <IllChat /> },
        { title: 'AI Marketing Automation', description: 'Automated email sequences, ad optimization, and content workflows that nurture prospects and increase conversions.', illustration: <IllEditor /> },
        { title: 'AI Integrations & Workflows', description: 'Connect your CRM, ads, messaging, and analytics tools into one unified AI-powered system.', illustration: <IllBarChart /> },
    ],
    'Web Development': [
        { title: 'Conversion Websites', description: 'Websites designed specifically to convert visitors into leads.', illustration: <IllBrowser /> },
        { title: 'Landing Pages', description: 'High-performance landing pages optimized for paid traffic.', illustration: <IllLandingPage /> },
        { title: 'Tracking & Analytics Setup', description: 'Proper tracking infrastructure for ads, conversions, and attribution.', illustration: <IllTracking /> },
        { title: 'Performance Optimization', description: 'Fast, lightweight websites optimized for speed and SEO.', illustration: <IllSpeed /> },
    ],
};

/* ── Constants ───────────────────────────────────────────── */

const PANEL_PCT = 100 / TABS.length; // 33.333…%

/* ── Component ───────────────────────────────────────────── */

export const Features = () => {
    const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
    const containerRef = useRef<HTMLDivElement>(null);
    const tabBarRef = useRef<HTMLDivElement>(null);
    const [pw, setPw] = useState(0);
    const activeTabRef = useRef(activeTab);
    activeTabRef.current = activeTab;

    // Single motion value drives the strip (% of strip width)
    const stripX = useMotionValue(-DEFAULT_TAB * PANEL_PCT);
    const stripXStyle = useTransform(stripX, v => `${v}%`);

    // Measure container width
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setPw(el.offsetWidth));
        ro.observe(el);
        setPw(el.offsetWidth);
        return () => ro.disconnect();
    }, []);

    // Spring to a tab
    const goToTab = useCallback((i: number) => {
        setActiveTab(i);
        animate(stripX, -i * PANEL_PCT, { type: 'spring', stiffness: 300, damping: 30 });
    }, [stripX]);

    // Elastic resistance at edges
    const clampX = useCallback((val: number) => {
        const min = -(TABS.length - 1) * PANEL_PCT;
        if (val < min) return min + (val - min) * 0.12;
        if (val > 0) return val * 0.12;
        return val;
    }, []);

    /* ── Pill indicator tracking ──────────────────────── */

    // Pill position derived from strip position (percentage-based)
    const pillX = useTransform(stripX, (v) => `${(-v / PANEL_PCT) * 100}%`);

    // Track which tab the pill is closest to (for text color)
    const [pillTab, setPillTab] = useState(DEFAULT_TAB);
    const pillTabRef = useRef(DEFAULT_TAB);
    useEffect(() => {
        const unsub = stripX.on('change', (v) => {
            const frac = -v / PANEL_PCT;
            const closest = Math.round(Math.max(0, Math.min(TABS.length - 1, frac)));
            if (closest !== pillTabRef.current) {
                pillTabRef.current = closest;
                setPillTab(closest);
            }
        });
        return unsub;
    }, [stripX]);

    /* ── Tab bar drag — pill + cards follow in real-time ── */

    const onTabDrag = useCallback((_: unknown, info: { offset: { x: number } }) => {
        const barW = tabBarRef.current?.offsetWidth || 300;
        const tabW = (barW - 12) / TABS.length; // inner width excluding p-1.5 padding
        const frac = info.offset.x / tabW;
        stripX.set(clampX(-(activeTabRef.current + frac) * PANEL_PCT));
    }, [stripX, clampX]);

    const onTabDragEnd = useCallback((_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
        const barW = tabBarRef.current?.offsetWidth || 300;
        const tabW = (barW - 12) / TABS.length;
        const frac = info.offset.x / tabW;
        let newTab = Math.round(activeTabRef.current + frac);
        if (Math.abs(info.velocity.x) > 500) {
            newTab = info.velocity.x > 0 ? activeTabRef.current + 1 : activeTabRef.current - 1;
        }
        newTab = Math.max(0, Math.min(TABS.length - 1, newTab));
        setActiveTab(newTab);
        animate(stripX, -newTab * PANEL_PCT, { type: 'spring', stiffness: 300, damping: 30 });
    }, [stripX]);

    /* ── Strip pan — swipe directly on cards ─────────── */

    const onStripPan = useCallback((_: unknown, info: { offset: { x: number } }) => {
        if (pw <= 0) return;
        const offset = (info.offset.x / pw) * PANEL_PCT;
        stripX.set(clampX(-activeTabRef.current * PANEL_PCT + offset));
    }, [pw, stripX, clampX]);

    const onStripPanEnd = useCallback((_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
        if (pw <= 0) return;
        const threshold = pw / 5;
        let newTab = activeTabRef.current;
        if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 500) {
            newTab = info.offset.x > 0 ? newTab - 1 : newTab + 1;
        }
        newTab = Math.max(0, Math.min(TABS.length - 1, newTab));
        setActiveTab(newTab);
        animate(stripX, -newTab * PANEL_PCT, { type: 'spring', stiffness: 300, damping: 30 });
    }, [pw, stripX]);

    return (
        <section id="system-modules" className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6 bg-slate-50/50 rounded-[3rem]">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">System Modules</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Your AI Growth System</h2>
                <p className="text-slate-500 text-lg">
                    Four systems that automate and optimize your marketing and sales pipeline.
                </p>
            </div>

            {/* Segmented tabs — static labels with sliding pill */}
            <div className="flex justify-center mb-12 md:mb-16">
                <motion.div
                    ref={tabBarRef}
                    className="relative inline-grid grid-cols-3 bg-[#e2e3e8] rounded-xl p-1.5 select-none cursor-grab active:cursor-grabbing"
                    style={{ touchAction: 'pan-y' }}
                    onPan={onTabDrag}
                    onPanEnd={onTabDragEnd}
                >
                    {/* Sliding pill indicator */}
                    <motion.div
                        className="absolute top-1.5 bottom-1.5 left-1.5 rounded-lg bg-[#ecedf1] shadow-[0_2px_4px_rgba(0,0,0,0.08),0_-1px_2px_rgba(255,255,255,0.8)] z-0 pointer-events-none"
                        style={{
                            width: `calc((100% - 12px) / ${TABS.length})`,
                            x: pillX,
                        }}
                    />
                    {/* Static text labels */}
                    {TABS.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => goToTab(i)}
                            className={`relative z-10 px-5 md:px-7 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                                pillTab === i ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Grid slider — continuous horizontal strip */}
            <div ref={containerRef} className="overflow-hidden -mx-10">
                <motion.div
                    onPan={onStripPan}
                    onPanEnd={onStripPanEnd}
                    className="flex cursor-grab active:cursor-grabbing"
                    style={{
                        x: stripXStyle,
                        width: `${TABS.length * 100}%`,
                        touchAction: 'pan-y',
                    }}
                >
                    {TABS.map((tab) => (
                        <div
                            key={tab}
                            className="shrink-0 grid md:grid-cols-2 gap-8 px-10 pt-8 pb-12"
                            style={{ width: `${PANEL_PCT}%` }}
                        >
                            {TAB_CARDS[tab].map((card, j) => (
                                <div
                                    key={j}
                                    className="bg-[#ecedf1] rounded-3xl p-8 md:p-10 shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex flex-col group overflow-hidden"
                                >
                                    <div className="flex-1 min-h-[240px] bg-[#e2e3e8] rounded-2xl mb-8 flex items-center justify-center p-8 relative overflow-hidden">
                                        {card.illustration}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{card.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
