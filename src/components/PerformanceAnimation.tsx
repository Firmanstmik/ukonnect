import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ── Metric definitions ──────────────────────────────────────── */

const LABELS  = ['Sessions', 'Conv. Rate', 'Revenue'];
const DELTAS  = ['+24%', '+0.8pp', '+31%'];
const FORMATS = [
    (v: number) => Math.round(v).toLocaleString('en'),
    (v: number) => v.toFixed(1) + '%',
    (v: number) => '€' + v.toFixed(1) + 'K',
];
const INIT_TARGETS = [4821, 3.2, 12.4];

/* ── easeOut ─────────────────────────────────────────────────── */

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* ── Component ───────────────────────────────────────────────── */

export const PerformanceAnimation = () => {
    const [displayValues, setDisplayValues] = useState([0, 0, 0]);
    const [showDeltas,    setShowDeltas]    = useState(false);
    const [cycle,         setCycle]         = useState(0);

    const targetsRef = useRef([...INIT_TARGETS]);
    const valuesRef  = useRef([0, 0, 0]);
    const rafRef     = useRef<number>(0);

    /* ── Counter: each cycle starts from current value → new high ── */
    useEffect(() => {
        setShowDeltas(false);
        cancelAnimationFrame(rafRef.current);

        const prev = targetsRef.current;
        const next = cycle === 0 ? [...INIT_TARGETS] : [
            prev[0] * 1.14,
            Math.min(prev[1] + 0.2, 4.8),
            prev[2] * 1.12,
        ];
        targetsRef.current = next;

        const from  = [...valuesRef.current];
        const dur   = cycle === 0 ? 2000 : 1800;
        const start = performance.now();

        const tick = (now: number) => {
            const t   = Math.min((now - start) / dur, 1);
            const e   = easeOut(t);
            const cur = next.map((tgt, i) => from[i] + (tgt - from[i]) * e);
            valuesRef.current = cur;
            setDisplayValues([...cur]);
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                valuesRef.current = next;
                setDisplayValues([...next]);
                setTimeout(() => setShowDeltas(true), 80);
            }
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [cycle]);

    /* ── Cycle every 5s ──────────────────────────────────────── */
    useEffect(() => {
        const id = setInterval(() => setCycle(c => c + 1), 5000);
        return () => clearInterval(id);
    }, []);

    /* ── Render ──────────────────────────────────────────────── */
    return (
        <div className="absolute inset-0 overflow-hidden">

            {/* Static white dashboard card */}
            <div className="absolute inset-2 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col">

                {/* Browser chrome */}
                <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                    <div className="flex-1 mx-3 h-3.5 bg-white rounded-full border border-slate-200 flex items-center justify-center">
                        <span className="text-[6.5px] text-slate-400 tracking-tight">analytics.google.com</span>
                    </div>
                </div>

                {/* Dashboard body */}
                <div className="flex flex-col flex-1 px-3 pt-2.5 pb-2.5 gap-2 min-h-0">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] font-semibold text-slate-700 tracking-tight">Performance Overview</span>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[7px] text-green-600 font-semibold tracking-wide">LIVE</span>
                        </div>
                    </div>

                    {/* KPI tiles */}
                    <div className="grid grid-cols-3 gap-1.5">
                        {LABELS.map((label, i) => (
                            <div key={label} className="bg-slate-50 rounded-lg px-2 py-1.5">
                                <div className="text-[6.5px] text-slate-400 font-medium mb-0.5 tracking-tight">{label}</div>
                                <div className="text-[10px] font-bold text-slate-800 tabular-nums leading-none mb-1">
                                    {FORMATS[i](displayValues[i])}
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 3 }}
                                    animate={{ opacity: showDeltas ? 1 : 0, y: showDeltas ? 0 : 3 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center gap-0.5"
                                >
                                    <svg className="w-2 h-2 text-green-500 flex-shrink-0" viewBox="0 0 8 8" fill="none">
                                        <path d="M4 6.5V1.5M1.5 4L4 1.5L6.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-[6.5px] text-green-600 font-semibold">{DELTAS[i]}</span>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Chart — left-edge gradient masks the seamless loop restart */}
                    <div
                        className="flex-1 bg-slate-50 rounded-lg px-2 pt-1.5 pb-1 min-h-0 overflow-hidden"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent 0%, black 14%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%)',
                        }}
                    >
                        <svg viewBox="0 0 200 52" className="w-full h-full" preserveAspectRatio="none" fill="none">
                            <defs>
                                <linearGradient id="perfFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%"   stopColor="#5600e3" stopOpacity="0.18" />
                                    <stop offset="100%" stopColor="#5600e3" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="perfLine" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%"   stopColor="#5600e3" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#5600e3" stopOpacity="1" />
                                </linearGradient>
                            </defs>

                            {/* Grid */}
                            <line x1="0" y1="13" x2="200" y2="13" stroke="#e2e8f0" strokeWidth="0.5" />
                            <line x1="0" y1="26" x2="200" y2="26" stroke="#e2e8f0" strokeWidth="0.5" />
                            <line x1="0" y1="39" x2="200" y2="39" stroke="#e2e8f0" strokeWidth="0.5" />

                            {/* Area fill — fades in when line is nearly drawn, fades out with line */}
                            <motion.path
                                d="M0,48 C15,46 25,44 40,40 S65,34 80,28 S105,18 125,14 S155,8 175,5 L200,3 L200,52 L0,52 Z"
                                fill="url(#perfFill)"
                                animate={{ opacity: [0, 0, 0.9, 0.9, 0] }}
                                transition={{ duration: 4.5, times: [0, 0.48, 0.58, 0.88, 1], repeat: Infinity, repeatDelay: 0.4 }}
                            />

                            {/* Line: draws up, holds, then fades — restart at opacity 0 is invisible */}
                            <motion.path
                                d="M0,48 C15,46 25,44 40,40 S65,34 80,28 S105,18 125,14 S155,8 175,5 L200,3"
                                stroke="url(#perfLine)"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 1 }}
                                animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
                                transition={{ duration: 4.5, times: [0, 0.55, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
                            />

                            {/* Live tip dot — appears as line finishes, fades with line */}
                            <motion.circle
                                cx="200" cy="3" r="2.5"
                                fill="#5600e3"
                                animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] }}
                                transition={{ duration: 4.5, times: [0, 0.5, 0.58, 0.88, 1], repeat: Infinity, repeatDelay: 0.4 }}
                            />
                        </svg>
                    </div>

                </div>
            </div>
        </div>
    );
};
