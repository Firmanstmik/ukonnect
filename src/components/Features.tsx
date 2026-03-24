import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Edit3, Target, TrendingUp, Crosshair, Zap, Globe, Mail, Music, Settings } from 'lucide-react';
import { AILeadGenerationEngine } from './AILeadGenerationEngine';
import { AISalesChat } from './AISalesChat';
import { AIMarketingAutomation } from './AIMarketingAutomation';
import { AIWorkflowSync } from './AIWorkflowSync';

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
const BROWSER_SCROLL = 172;
const BROWSER_VIEWPORT_H = 198;
const DOCK_H = 50;

const BrowserContent = () => (
    <motion.div
        animate={{ y: [0, -BROWSER_SCROLL, -BROWSER_SCROLL, 0] }}
        transition={{ duration: 10, times: [0, 0.68, 0.86, 1.0], ease: ['easeInOut', 'easeInOut', 'easeIn'], repeat: Infinity, repeatType: 'loop' }}
    >
        <div className="px-3.5 pt-4 pb-3">
            <div className="h-[10px] w-14 bg-primary/15 rounded-full mb-2" />
            <div className="h-3.5 w-[72%] bg-slate-200 rounded mb-1.5" />
            <div className="h-3.5 w-[52%] bg-slate-200 rounded mb-2" />
            <div className="h-[7px] w-full bg-slate-100 rounded-full mb-1" />
            <div className="h-[7px] w-4/5 bg-slate-100 rounded-full mb-3" />
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} className="h-[22px] w-[68px] bg-primary rounded-full" />
        </div>
        <div className="px-3.5 py-2.5 border-t border-slate-100">
            <div className="h-[7px] w-20 bg-slate-200 rounded mb-2" />
            <div className="flex gap-1.5">{[0,1,2,3,4].map(i => <div key={i} className="flex-1 h-[18px] bg-slate-100 rounded" />)}</div>
        </div>
        <div className="px-3.5 py-2.5 border-t border-slate-100">
            <div className="h-[9px] w-1/3 bg-slate-200 rounded mb-2" />
            <div className="grid grid-cols-3 gap-1.5">
                {[0,1,2].map(i => (
                    <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-2">
                        <div className="h-[10px] w-[10px] bg-primary/20 rounded mb-1.5" />
                        <div className="h-[6px] w-full bg-slate-200 rounded mb-1" />
                        <div className="h-[6px] w-3/4 bg-slate-100 rounded" />
                    </div>
                ))}
            </div>
        </div>
        <div className="px-3.5 py-4 border-t border-slate-100 bg-primary/[0.04] flex flex-col items-center">
            <div className="h-3 w-2/3 bg-slate-200 rounded mb-1.5" />
            <div className="h-[7px] w-1/2 bg-slate-100 rounded mb-3" />
            <motion.div
                animate={{ scale: [1, 1.06, 1], boxShadow: ['0 0 0 0 rgba(86,0,227,0)', '0 0 0 7px rgba(86,0,227,0.13)', '0 0 0 0 rgba(86,0,227,0)'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="h-[24px] w-[80px] bg-primary rounded-full"
                style={{ borderRadius: 9999 }}
            />
        </div>
    </motion.div>
);

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.054 23.25a.75.75 0 00.917.899l5.562-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.681-.502-5.223-1.381l-.374-.213-3.303.87.882-3.22-.232-.381A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
);

type DockApp = { icon: React.ReactNode; bg: string; onClick?: () => void; isBrowser?: boolean };
const DOCK_APPS: DockApp[] = [
    { icon: <WhatsAppIcon />, bg: 'linear-gradient(145deg,#25d366,#128c7e)', onClick: () => window.open('https://wa.me/31853331000', '_blank') },
    { icon: <Mail     size={14} />, bg: 'linear-gradient(145deg,#64d2ff,#2c7be5)', onClick: () => window.open('mailto:info@ukonnect.nl') },
    { icon: <Globe    size={14} />, bg: 'linear-gradient(145deg,#34aadc,#0a84ff)', isBrowser: true },
    { icon: <Music    size={14} />, bg: 'linear-gradient(145deg,#ff6b81,#fc3c58)', onClick: () => window.open('https://open.spotify.com', '_blank') },
    { icon: <Settings size={13} />, bg: 'linear-gradient(145deg,#aeaeb2,#636366)' },
];

const IllBrowser = () => {
    const [showing,   setShowing]   = useState(true);
    const [maximized, setMaximized] = useState(false);
    const lastActionRef = useRef<'close' | 'minimize'>('close');

    const handleRed    = () => { lastActionRef.current = 'close';    setMaximized(false); setShowing(false); };
    const handleYellow = () => { lastActionRef.current = 'minimize'; setMaximized(false); setShowing(false); };
    const handleGreen  = () => setMaximized(m => !m);
    const openBrowser  = () => setShowing(true);

    /* Normal window bounds (px / %) within the absolute inset-0 wrapper */
    const normalLeft   = '11%';
    const normalRight  = '11%';
    const normalTop    = 8;
    const normalBottom = DOCK_H + 8;

    const genieExit = {
        clipPath: [
            'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            'polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)',
            'polygon(43% 0%, 57% 0%, 52% 100%, 48% 100%)',
            'polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)',
        ] as any,
        y: [0, 8, 32, 64],
        opacity: [1, 1, 0.8, 0],
        transition: { duration: 0.52, times: [0, 0.26, 0.66, 1.0] },
    };

    const isMinimizeRestore = lastActionRef.current === 'minimize';

    return (
        <div className="absolute inset-0 rounded-[inherit] overflow-hidden">

            {/* ── Browser window ────────────────────────────── */}
            <AnimatePresence mode="wait">
                {showing && (
                    <motion.div
                        key="browser-win"
                        className="absolute flex flex-col bg-white overflow-hidden"
                        style={{ border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', borderRadius: maximized ? 0 : 12 }}
                        initial={isMinimizeRestore
                            ? { clipPath: 'polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)', y: 60, opacity: 0, left: normalLeft, right: normalRight, top: normalTop, bottom: normalBottom }
                            : { opacity: 0, scale: 0.86, left: normalLeft, right: normalRight, top: normalTop, bottom: normalBottom }
                        }
                        animate={{
                            left:   maximized ? 0 : normalLeft,
                            right:  maximized ? 0 : normalRight,
                            top:    maximized ? 0 : normalTop,
                            bottom: maximized ? 0 : normalBottom,
                            borderRadius: maximized ? 0 : 12,
                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                            y: 0, opacity: 1, scale: 1,
                        }}
                        exit={lastActionRef.current === 'minimize' ? genieExit : { opacity: 0, scale: 0.88, transition: { duration: 0.18 } }}
                        transition={{
                            left:         { type: 'spring', stiffness: 380, damping: 32 },
                            right:        { type: 'spring', stiffness: 380, damping: 32 },
                            top:          { type: 'spring', stiffness: 380, damping: 32 },
                            bottom:       { type: 'spring', stiffness: 380, damping: 32 },
                            borderRadius: { type: 'spring', stiffness: 380, damping: 32 },
                            clipPath:     { duration: 0.44, ease: 'easeOut' },
                            y:            { duration: 0.44 },
                            opacity:      { duration: 0.28 },
                            scale:        { duration: 0.28 },
                        }}
                    >
                        {/* Chrome bar */}
                        <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 border-b border-[#d8d9de]">
                            <button onClick={handleRed}    className="w-2.5 h-2.5 rounded-full focus:outline-none group relative" style={{ backgroundColor: '#FF5F57' }}>
                                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7px] font-bold text-[#820005]">✕</span>
                            </button>
                            <button onClick={handleYellow} className="w-2.5 h-2.5 rounded-full focus:outline-none group relative" style={{ backgroundColor: '#FEBC2E' }}>
                                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7px] font-bold text-[#6b4100]">−</span>
                            </button>
                            <button onClick={handleGreen}  className="w-2.5 h-2.5 rounded-full focus:outline-none group relative" style={{ backgroundColor: '#28C840' }}>
                                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-[7px] font-bold text-[#004d10]">{maximized ? '⊡' : '⊞'}</span>
                            </button>
                            <div className="h-[16px] bg-slate-100 rounded-md ml-2 flex-1 max-w-[110px]" />
                        </div>

                        {/* Scrolling content */}
                        <div className="overflow-hidden flex-1 min-h-0" style={{ height: maximized ? undefined : BROWSER_VIEWPORT_H }}>
                            <BrowserContent />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── macOS Dock ────────────────────────────────── */}
            <AnimatePresence>
                {!maximized && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-1.5"
                        style={{ height: DOCK_H }}
                        initial={{ y: DOCK_H, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: DOCK_H, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                        <div className="flex items-end gap-1.5 px-2.5 py-1.5 rounded-2xl"
                            style={{ background: 'rgba(255,255,255,0.38)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.65)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
                        >
                            {DOCK_APPS.map((app, i) => (
                                <motion.button
                                    key={i}
                                    onClick={app.isBrowser ? openBrowser : ('onClick' in app ? app.onClick : undefined)}
                                    className="relative focus:outline-none"
                                    whileTap={{ scale: 0.9 }}
                                    style={{ cursor: (app.isBrowser || 'onClick' in app) ? 'pointer' : 'default' }}
                                >
                                    <motion.div
                                        className="w-7 h-7 rounded-xl flex items-center justify-center text-white"
                                        style={{ background: app.bg, boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }}
                                        whileHover={{ boxShadow: '0 0 0 2.5px rgba(255,255,255,0.85), 0 1px 4px rgba(0,0,0,0.18)' }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {app.icon}
                                    </motion.div>
                                    {/* Running / minimized indicator dot */}
                                    {app.isBrowser && (
                                        <motion.div
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-slate-500/70"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: showing ? 1 : 0 }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* Landing page content — no outer scroll animation; parent drives Y */
const LandingPageContent = () => (
    <div>
        {/* Hero */}
        <div className="px-4 pt-5 pb-4 text-center flex flex-col items-center bg-gradient-to-b from-primary/[0.04] to-transparent">
            <div className="h-[8px] w-10 bg-primary/20 rounded-full mb-2.5" />
            <div className="h-[11px] w-[80%] bg-slate-800/20 rounded mb-1.5" />
            <div className="h-[11px] w-[60%] bg-slate-800/15 rounded mb-2.5" />
            <div className="h-[7px] w-[70%] bg-slate-300/70 rounded-full mb-1" />
            <div className="h-[7px] w-[55%] bg-slate-300/70 rounded-full mb-3.5" />
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="h-[22px] w-[72px] bg-primary rounded-full"
            />
        </div>

        {/* Social proof — logo strip */}
        <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between gap-1">
            {[26, 20, 30, 18, 24, 28].map((w, i) => (
                <div key={i} className="h-[5px] rounded-full bg-slate-200/80" style={{ width: w }} />
            ))}
        </div>

        {/* Stats row */}
        <div className="px-3 py-2.5 border-t border-slate-100 grid grid-cols-3 gap-2">
            {[['w-8', 'w-10'], ['w-6', 'w-12'], ['w-7', 'w-9']].map(([a, b], i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-2 flex flex-col items-center gap-1">
                    <div className={`h-[9px] ${a} bg-primary/30 rounded`} />
                    <div className={`h-[5px] ${b} bg-slate-200 rounded-full`} />
                </div>
            ))}
        </div>

        {/* 5 benefit rows */}
        <div className="px-3 py-2.5 border-t border-slate-100 space-y-2">
            {([['w-2/3','w-1/2'],['w-3/4','w-2/5'],['w-1/2','w-3/5'],['w-4/5','w-1/3'],['w-3/5','w-2/3']] as [string,string][]).map(([a, b], i) => (
                <div key={i} className="flex items-start gap-2">
                    <div className="w-[9px] h-[9px] rounded-sm bg-primary/20 flex-shrink-0 mt-[2px]" />
                    <div className="flex-1 space-y-1">
                        <div className={`h-[6px] ${a} bg-slate-200 rounded-full`} />
                        <div className={`h-[5px] ${b} bg-slate-100 rounded-full`} />
                    </div>
                </div>
            ))}
        </div>

        {/* How it works — 3 steps */}
        <div className="px-3 py-2.5 border-t border-slate-100">
            <div className="h-[6px] w-1/3 bg-slate-200 rounded mb-2.5" />
            <div className="space-y-2">
                {[1, 2, 3].map(n => (
                    <div key={n} className="flex items-center gap-2">
                        <div className="w-[14px] h-[14px] rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                            <div className="w-[6px] h-[6px] rounded-full bg-primary/40" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="h-[6px] w-3/4 bg-slate-200 rounded-full" />
                            <div className="h-[5px] w-1/2 bg-slate-100 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Testimonial snippet */}
        <div className="px-3 py-2.5 border-t border-slate-100 bg-slate-50/60">
            <div className="h-[5px] w-full bg-slate-200/80 rounded-full mb-1.5" />
            <div className="h-[5px] w-4/5 bg-slate-200/80 rounded-full mb-1.5" />
            <div className="h-[5px] w-2/3 bg-slate-200/60 rounded-full mb-2" />
            <div className="flex items-center gap-1.5">
                <div className="w-[14px] h-[14px] rounded-full bg-slate-200" />
                <div className="h-[5px] w-16 bg-slate-200 rounded-full" />
            </div>
        </div>

        {/* Final CTA band */}
        <div className="px-3 py-4 border-t border-slate-100 bg-primary/[0.04] flex flex-col items-center gap-2">
            <div className="h-[8px] w-2/3 bg-slate-200 rounded-full" />
            <div className="h-[7px] w-1/2 bg-slate-100 rounded-full" />
            <motion.div
                animate={{ scale: [1, 1.06, 1], boxShadow: ['0 0 0 0 rgba(86,0,227,0)', '0 0 0 6px rgba(86,0,227,0.12)', '0 0 0 0 rgba(86,0,227,0)'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="h-[22px] w-[76px] bg-primary rounded-full mt-1"
                style={{ borderRadius: 9999 }}
            />
        </div>
    </div>
);

/* Scrollbar geometry — longer content, separate from BROWSER_SCROLL */
const LP_SCROLL    = 300;
const LP_TRACK_H   = BROWSER_VIEWPORT_H - 12;                                       // 186
const LP_THUMB_H   = Math.round((BROWSER_VIEWPORT_H / (BROWSER_VIEWPORT_H + LP_SCROLL)) * LP_TRACK_H); // ~74
const LP_MAX_THUMB = LP_TRACK_H - LP_THUMB_H;                                       // ~112

const IllLandingPage = () => {
    const thumbY   = useMotionValue(0);
    const contentY = useTransform(thumbY, [0, LP_MAX_THUMB], [0, -LP_SCROLL]);
    const ctrlRef  = useRef<{ stop: () => void } | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dragging = useRef(false);

    const stopAll = useCallback(() => {
        ctrlRef.current?.stop();
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    const startLoop = useCallback(() => {
        const ctrl = animate(thumbY, [0, LP_MAX_THUMB, LP_MAX_THUMB, 0], {
            duration: 12,
            times: [0, 0.65, 0.82, 1.0],
            ease: ['easeInOut', 'easeInOut', 'easeIn'] as any,
            repeat: Infinity,
            repeatType: 'loop',
        });
        ctrlRef.current = ctrl;
    }, [thumbY]);

    /* Resume from wherever the user left the thumb — no jump */
    const resumeFrom = useCallback((from: number) => {
        stopAll();
        if (dragging.current) return;

        const remaining = LP_MAX_THUMB - Math.min(from, LP_MAX_THUMB);

        const goUp = () => {
            const ctrl = animate(thumbY, 0, {
                duration: 1.8,
                ease: 'easeIn',
                onComplete: () => { if (!dragging.current) startLoop(); },
            });
            ctrlRef.current = ctrl;
        };

        const holdThenUp = () => {
            timerRef.current = setTimeout(() => { if (!dragging.current) goUp(); }, 1800);
        };

        if (remaining <= 1) {
            holdThenUp();
        } else {
            const ctrl = animate(thumbY, LP_MAX_THUMB, {
                duration: Math.max(0.5, (remaining / LP_MAX_THUMB) * 7.8),
                ease: 'easeInOut',
                onComplete: () => { if (!dragging.current) holdThenUp(); },
            });
            ctrlRef.current = ctrl;
        }
    }, [thumbY, stopAll, startLoop]);

    useEffect(() => { startLoop(); return stopAll; }, [startLoop, stopAll]);

    const onDragStart = useCallback(() => { dragging.current = true;  stopAll(); }, [stopAll]);
    const onDragEnd   = useCallback(() => {
        const from = thumbY.get();
        dragging.current = false;
        resumeFrom(from);
    }, [thumbY, resumeFrom]);

    return (
        <div className="absolute inset-0 rounded-[inherit] overflow-hidden flex justify-center items-end">
            <div className="w-[75%] bg-white overflow-hidden rounded-t-xl"
                style={{ border: '1px solid #e2e8f0', borderBottom: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
            >
                {/* Chrome bar — decorative only */}
                <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 border-b border-[#d8d9de]">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
                    <div className="h-[16px] bg-slate-100 rounded-md ml-2 flex-1 max-w-[110px]" />
                </div>

                {/* Viewport */}
                <div className="relative overflow-hidden" style={{ height: BROWSER_VIEWPORT_H }}>
                    {/* Scrolling content */}
                    <motion.div style={{ y: contentY }}>
                        <LandingPageContent />
                    </motion.div>

                    {/* Scrollbar track */}
                    <div
                        className="absolute right-1 top-1.5 bottom-1.5 w-[5px] rounded-full bg-slate-100"
                        style={{ height: LP_TRACK_H }}
                        onPointerDown={e => e.stopPropagation()}
                    >
                        {/* Thumb */}
                        <motion.div
                            drag="y"
                            dragConstraints={{ top: 0, bottom: LP_MAX_THUMB }}
                            dragElastic={0}
                            dragMomentum={false}
                            style={{ y: thumbY, height: LP_THUMB_H }}
                            className="w-full rounded-full bg-slate-300 hover:bg-slate-400 cursor-grab active:cursor-grabbing"
                            onDragStart={onDragStart}
                            onDragEnd={onDragEnd}
                            onPointerDown={e => e.stopPropagation()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

/* GA4-style progressive line chart — wide viewBox to fill full card width */
const GA4_SEGS = [
    'M6,40 C22,40 22,32 45,32',
    'M45,32 C68,32 68,23 90,23',
    'M90,23 C112,23 112,27 135,27',
    'M135,27 C158,27 158,13 180,13',
    'M180,13 C202,13 202,7 222,7',
] as const;
const GA4_DOTS = [[6,40],[45,32],[90,23],[135,27],[180,13],[222,7]] as [number,number][];

const GA4LineChart = () => {
    const s0=useMotionValue(0), s1=useMotionValue(0), s2=useMotionValue(0), s3=useMotionValue(0), s4=useMotionValue(0);
    const d0=useMotionValue(0), d1=useMotionValue(0), d2=useMotionValue(0), d3=useMotionValue(0), d4=useMotionValue(0), d5=useMotionValue(0);

    useEffect(() => {
        const segs = [s0,s1,s2,s3,s4];
        const dots = [d0,d1,d2,d3,d4,d5];
        let alive = true;
        (async () => {
            while (alive) {
                segs.forEach(s => s.set(0));
                dots.forEach(d => d.set(0));
                await new Promise<void>(r => setTimeout(r, 60));
                if (!alive) return;
                await animate(d0, 1, { duration: 0.22 });
                for (let i = 0; i < 5; i++) {
                    if (!alive) return;
                    await animate(segs[i], 1, { duration: 0.52, ease: 'easeInOut' });
                    if (!alive) return;
                    await animate(dots[i + 1], 1, { duration: 0.22 });
                }
                await new Promise<void>(r => setTimeout(r, 1500));
            }
        })();
        return () => { alive = false; };
    }, [s0,s1,s2,s3,s4,d0,d1,d2,d3,d4,d5]);

    return (
        <div className="relative overflow-hidden h-[100px] bg-slate-50 rounded-lg border border-slate-100">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 228 52" fill="none" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gaLineFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5600e3" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Static area fill */}
                <path d="M6,40 C22,40 22,32 45,32 C68,32 68,23 90,23 C112,23 112,27 135,27 C158,27 158,13 180,13 C202,13 202,7 222,7 L222,52 L6,52 Z" fill="url(#gaLineFill)" />
                {/* Progressively drawn segments */}
                {[s0,s1,s2,s3,s4].map((sv, i) => (
                    <motion.path key={i} d={GA4_SEGS[i]} stroke="rgba(86,0,227,0.55)" strokeWidth="1.5" strokeLinecap="round" fill="none" style={{ pathLength: sv }} />
                ))}
                {/* Dots that appear one by one */}
                {GA4_DOTS.map(([cx, cy], i) => (
                    <motion.circle key={i} cx={cx} cy={cy} r={3} fill="white" stroke="rgba(86,0,227,0.65)" strokeWidth="1.5" style={{ opacity: [d0,d1,d2,d3,d4,d5][i] }} />
                ))}
            </svg>
        </div>
    );
};

const TRACK_BARS   = [40, 65, 45, 80, 55, 70, 90, 60] as const;
const TRACK_DELTAS = [ 9, -8, 10, -7,  9,-10,  7, -9] as const;
const TRACK_DURS   = [3.8, 4.4, 3.4, 5.0, 4.0, 4.6, 3.6, 4.8] as const;

const IllTracking = () => (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        {/* GA4-style progressive line chart — full width */}
        <div className="mb-3">
            <GA4LineChart />
        </div>

        {/* Bar chart — graceful organic rise-and-fall per bar */}
        <div className="h-[84px] bg-slate-50 rounded-lg border border-slate-100 flex items-end p-2 gap-1.5">
            {TRACK_BARS.map((h, i) => (
                <motion.div
                    key={i}
                    className="flex-1 bg-primary/20 rounded-sm"
                    animate={{ height: [
                        `${h}%`,
                        `${h + TRACK_DELTAS[i] * 0.35}%`,
                        `${h + TRACK_DELTAS[i]}%`,
                        `${h + TRACK_DELTAS[i] * 0.55}%`,
                        `${h}%`,
                    ]}}
                    transition={{
                        duration: TRACK_DURS[i],
                        repeat: Infinity,
                        ease: 'easeInOut',
                        times: [0, 0.22, 0.50, 0.76, 1.0],
                        delay: i * 0.24,
                    }}
                />
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
        { title: 'AI Sales Automation', description: 'AI agents that qualify leads, handle follow-ups, and book meetings so your sales team focuses on closing.', illustration: <AISalesChat /> },
        { title: 'AI Marketing Automation', description: 'Automated email sequences, ad optimization, and content workflows that nurture prospects and increase conversions.', illustration: <AIMarketingAutomation /> },
        { title: 'AI Integrations & Workflows', description: 'Connect your CRM, ads, messaging, and analytics tools into one unified AI-powered system.', illustration: <AIWorkflowSync /> },
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
        <section id="system-modules" className="py-[60px] md:py-[80px] lg:py-[80px] max-w-[1300px] mx-auto px-6 bg-slate-50/50 rounded-[3rem]">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">System Modules</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Your AI Growth System</h2>
                <p className="text-slate-500 text-lg">
                    Four systems that automate and optimize your marketing and sales pipeline.
                </p>
            </div>

            {/* Segmented tabs — static labels with sliding pill */}
            <div className="flex justify-center mb-8 md:mb-10">
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
                            className="shrink-0 grid md:grid-cols-2 gap-5 px-10 pt-4 pb-8"
                            style={{ width: `${PANEL_PCT}%` }}
                        >
                            {TAB_CARDS[tab].map((card, j) => (
                                <div
                                    key={j}
                                    className="bg-[#ecedf1] rounded-3xl p-6 md:p-7 shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex flex-col group overflow-hidden"
                                >
                                    <div className="flex-1 min-h-[180px] bg-[#e2e3e8] rounded-2xl mb-5 flex items-center justify-center p-5 relative overflow-hidden">
                                        {card.illustration}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
