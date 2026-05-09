import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { UserPlus, Euro } from 'lucide-react';

/* ── Types ───────────────────────────────────────────────────��─ */

type ParticleKind = 'drop1' | 'drop2' | 'through';

interface Particle {
    id: number;
    startX: number;   // px from center, random ±88
    kind: ParticleKind;
    duration: number;
    dir: 1 | -1;      // sideways-exit direction
}

interface Deal {
    id: number;
}

/* ── Timing ──────────────────────────────────────────────────── */

const SPAWN_MS      = 1100;
const SPAWN_FAST_MS = 650;
const BASE_DUR      = 2.7;
const FAST_DUR      = 1.35;

/* ── Chip style ──────────────────────────────────────────────── */

const CHIP = 'bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.10)] flex items-center justify-center';

/* ── Component ───────────────────────────────────────────────── */

export const ConversionFunnelAnimation = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [deals,     setDeals]     = useState<Deal[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const nextIdRef    = useRef(0);
    const isHoveredRef = useRef(false);

    /* ── Spring mouse-follow ─────────────────────────────── */
    const rawX    = useMotionValue(0);
    const rawY    = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 100, damping: 18 });
    const springY = useSpring(rawY, { stiffness: 100, damping: 18 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left  - rect.width  / 2) * 0.3);
        rawY.set((e.clientY - rect.top   - rect.height / 2) * 0.3);
    };

    const handleMouseEnter = () => { isHoveredRef.current = true;  };
    const handleMouseLeave = () => {
        isHoveredRef.current = false;
        rawX.set(0);
        rawY.set(0);
    };

    /* ── Particle spawner ────────────────────────────────── */
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const spawn = () => {
            const fast   = isHoveredRef.current;
            const startX = (Math.random() * 2 - 1) * 88;
            const roll   = Math.random();
            const kind: ParticleKind = roll < 0.28 ? 'drop1' : roll < 0.48 ? 'drop2' : 'through';
            const mult   = kind === 'drop1' ? 0.44 : kind === 'drop2' ? 0.72 : 1;
            const dir    = startX >= 0 ? 1 : -1;

            setParticles(prev => [...prev, {
                id: nextIdRef.current++,
                startX,
                kind,
                duration: (fast ? FAST_DUR : BASE_DUR) * mult,
                dir,
            }]);

            timer = setTimeout(spawn, fast ? SPAWN_FAST_MS : SPAWN_MS);
        };

        timer = setTimeout(spawn, 500);
        return () => clearTimeout(timer);
    }, []);

    const removeParticle = useCallback((id: number, spawnDeal: boolean) => {
        setParticles(prev => prev.filter(p => p.id !== id));
        if (spawnDeal) setDeals(prev => [...prev, { id: nextIdRef.current++ }]);
    }, []);

    const removeDeal = useCallback((id: number) => {
        setDeals(prev => prev.filter(d => d.id !== id));
    }, []);

    /* ── Render ──────────────────────────────────────────── */
    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* ── Funnel background ───────────────────────── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    {/* Vertical fill gradient — whisper at top, rich at bottom */}
                    <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#5600e3" stopOpacity="0.07" />
                        <stop offset="60%"  stopColor="#5600e3" stopOpacity="0.20" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0.48" />
                    </linearGradient>
                    {/* Edge stroke gradient */}
                    <linearGradient id="edgeL" x1="20" y1="0" x2="44" y2="88" gradientUnits="userSpaceOnUse">
                        <stop offset="0%"   stopColor="#5600e3" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0.55" />
                    </linearGradient>
                    <linearGradient id="edgeR" x1="80" y1="0" x2="56" y2="88" gradientUnits="userSpaceOnUse">
                        <stop offset="0%"   stopColor="#5600e3" stopOpacity="0.10" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0.55" />
                    </linearGradient>
                    {/* Spout glow */}
                    <radialGradient id="spoutGlow" cx="50%" cy="100%" r="22%" gradientUnits="objectBoundingBox">
                        <stop offset="0%"   stopColor="#5600e3" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Spout bloom */}
                <ellipse cx="50" cy="88" rx="14" ry="7" fill="url(#spoutGlow)" />

                {/* Single unified funnel fill */}
                <polygon points="20,0 80,0 56,88 44,88" fill="url(#funnelFill)" />

                {/* Glowing edge lines */}
                <line x1="20" y1="0" x2="44" y2="88" stroke="url(#edgeL)" strokeWidth="0.9" />
                <line x1="80" y1="0" x2="56" y2="88" stroke="url(#edgeR)" strokeWidth="0.9" />

                {/* Clean stage dividers */}
                <line x1="29" y1="37" x2="71" y2="37" stroke="rgba(86,0,227,0.18)" strokeWidth="0.5" />
                <line x1="38" y1="67" x2="62" y2="67" stroke="rgba(86,0,227,0.26)" strokeWidth="0.5" />
            </svg>

            {/* ── Stage labels — centered inside each band ── */}
            {[
                { label: 'Visitors', top: '18%', opacity: 'text-primary/40' },
                { label: 'Leads',    top: '52%', opacity: 'text-primary/55' },
                { label: 'Deals',    top: '77%', opacity: 'text-primary/75' },
            ].map(({ label, top, opacity }) => (
                <div
                    key={label}
                    className={`absolute pointer-events-none left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold tracking-[0.18em] uppercase ${opacity}`}
                    style={{ top }}
                >
                    {label}
                </div>
            ))}

            {/* ── Spring wrapper ───────────────────────────── */}
            <motion.div className="absolute inset-0" style={{ x: springX, y: springY }}>

                {/* Visitor particles */}
                <AnimatePresence>
                    {particles.map(p => {
                        const sx  = p.startX;
                        const dir = p.dir;

                        /* drop1 — exits at stage 1/2 boundary */
                        if (p.kind === 'drop1') return (
                            <motion.div
                                key={p.id}
                                className="absolute pointer-events-none"
                                style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                                initial={{ x: sx, y: -80, opacity: 0, scale: 0 }}
                                animate={{
                                    x: [sx, sx * 0.55, sx * 0.55 + dir * 90],
                                    y: [-80, -25, -12],
                                    opacity: [0, 1, 0],
                                    scale: [0, 0.85, 0.5],
                                }}
                                transition={{ duration: p.duration, ease: 'easeInOut', times: [0, 0.55, 1] }}
                                onAnimationComplete={() => removeParticle(p.id, false)}
                            >
                                <div className={`w-8 h-8 ${CHIP}`}>
                                    <UserPlus className="w-[14px] h-[14px] text-primary" />
                                </div>
                            </motion.div>
                        );

                        /* drop2 — exits at stage 2/3 boundary */
                        if (p.kind === 'drop2') return (
                            <motion.div
                                key={p.id}
                                className="absolute pointer-events-none"
                                style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                                initial={{ x: sx, y: -80, opacity: 0, scale: 0 }}
                                animate={{
                                    x: [sx, sx * 0.55, sx * 0.20, sx * 0.20 + dir * 74],
                                    y: [-80, -25, 25, 42],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0, 0.85, 0.85, 0.5],
                                }}
                                transition={{ duration: p.duration, ease: 'easeInOut', times: [0, 0.33, 0.72, 1] }}
                                onAnimationComplete={() => removeParticle(p.id, false)}
                            >
                                <div className={`w-8 h-8 ${CHIP}`}>
                                    <UserPlus className="w-[14px] h-[14px] text-primary" />
                                </div>
                            </motion.div>
                        );

                        /* through — full traversal, triggers deal chip */
                        return (
                            <motion.div
                                key={p.id}
                                className="absolute pointer-events-none"
                                style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                                initial={{ x: sx, y: -80, opacity: 0, scale: 0 }}
                                animate={{
                                    x: [sx, sx * 0.55, sx * 0.18, 0],
                                    y: [-80, -25, 25, 72],
                                    opacity: [0, 1, 1, 1, 0],
                                    scale: [0, 0.85, 0.85, 0.8, 0],
                                }}
                                transition={{ duration: p.duration, ease: 'easeInOut', times: [0, 0.33, 0.66, 0.9, 1] }}
                                onAnimationComplete={() => removeParticle(p.id, true)}
                            >
                                <div className={`w-8 h-8 ${CHIP}`}>
                                    <UserPlus className="w-[14px] h-[14px] text-primary" />
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Deal chips */}
                <AnimatePresence>
                    {deals.map(d => (
                        <motion.div
                            key={d.id}
                            className="absolute pointer-events-none"
                            style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                            initial={{ x: 0, y: 72, opacity: 0, scale: 0 }}
                            animate={{
                                y: [72, 88, 102],
                                opacity: [0, 1, 0],
                                scale: [0, 1.1, 0.8],
                            }}
                            transition={{ duration: 1.0, ease: 'easeOut', times: [0, 0.35, 1] }}
                            onAnimationComplete={() => removeDeal(d.id)}
                        >
                            <div className={`w-8 h-8 ${CHIP}`}>
                                <Euro className="w-[14px] h-[14px] text-emerald-500" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};
