import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ukonnectIcon from '../assets/Ukonnect Marketing icon.webp';

/* ── Types ───────────────────────────────────────────────────── */

interface Blip {
    id: number;
    x: number;   // px from container center
    y: number;
    pulse: boolean;
}

/* ── Constants ───────────────────────────────────────────────── */

const SWEEP_MS     = 4000;  // ms per full revolution
const BLIPS_PER_REV = 6;   // leads detected per sweep
const OUTER_FRAC   = 0.88;  // matches SVG outer ring r=88/viewBox-half=100

/* ── Spread N angles evenly with jitter ──────────────────────── */

const generateAngles = (): number[] =>
    Array.from({ length: BLIPS_PER_REV }, (_, i) => {
        const base = (i / BLIPS_PER_REV) * 360;
        return (base + Math.random() * (360 / BLIPS_PER_REV) * 0.8) % 360;
    });

/* ── Component ───────────────────────────────────────────────── */

export const LeadRadarAnimation = () => {
    const [blips, setBlips] = useState<Blip[]>([]);
    const [count, setCount] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const nextId       = useRef(0);

    /* ── Spawn a blip at the sweep's current angle ───────────── */
    const spawnBlipAt = useCallback((angleDeg: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        const w    = rect?.width  ?? 280;
        const h    = rect?.height ?? 200;
        const outerR = Math.min(w, h) * OUTER_FRAC / 2; // px

        // Bias toward outer ring (65%) with some inner scatter (35%)
        const frac = Math.random() < 0.65
            ? 0.50 + Math.random() * 0.43
            : 0.15 + Math.random() * 0.37;
        const r = frac * outerR;

        // angle 0° = top (12 o'clock), clockwise — matches CSS conic-gradient
        const rad = (angleDeg * Math.PI) / 180;
        const x   =  Math.sin(rad) * r;
        const y   = -Math.cos(rad) * r;

        setBlips(prev => [...prev, {
            id:    nextId.current++,
            x, y,
            pulse: Math.random() < 0.28,
        }]);
        setCount(c => c + 1);
    }, []);

    /* ── Schedule each revolution's blips ───────────────────── */
    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        const scheduleRevolution = () => {
            generateAngles().forEach(angle => {
                const delay = (angle / 360) * SWEEP_MS;
                timers.push(setTimeout(() => spawnBlipAt(angle), delay));
            });
            // Kick off the next revolution
            timers.push(setTimeout(scheduleRevolution, SWEEP_MS));
        };

        scheduleRevolution();
        return () => timers.forEach(clearTimeout);
    }, [spawnBlipAt]);

    const removeBlip = (id: number) =>
        setBlips(prev => prev.filter(b => b.id !== id));

    /* ── Render ──────────────────────────────────────────────── */
    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden flex items-center justify-center">

            {/* ── Radar rings (SVG) ───────────────────────── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 200"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="#5600e3" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="100" cy="100" r="88" fill="url(#radarBg)" />

                {/* Crosshairs */}
                <line x1="100" y1="16"  x2="100" y2="184" stroke="rgba(86,0,227,0.08)" strokeWidth="0.6" />
                <line x1="16"  y1="100" x2="184" y2="100" stroke="rgba(86,0,227,0.08)" strokeWidth="0.6" />

                {/* Rings */}
                <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(86,0,227,0.10)" strokeWidth="0.7" />
                <circle cx="100" cy="100" r="54" fill="none" stroke="rgba(86,0,227,0.13)" strokeWidth="0.7" />
                <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(86,0,227,0.16)" strokeWidth="0.8" />
                <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(86,0,227,0.22)" strokeWidth="0.9" />
            </svg>

            {/* ── Sweep wedge — height: 88% + aspectRatio keeps it a
                   perfect circle matching the outer radar ring ──── */}
            <motion.div
                className="absolute"
                style={{
                    height: '88%',
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    // Trailing fade from 310° → bright leading edge at 360°
                    background: 'conic-gradient(from 0deg, transparent 308deg, rgba(86,0,227,0.04) 325deg, rgba(86,0,227,0.16) 345deg, rgba(86,0,227,0.42) 360deg)',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: SWEEP_MS / 1000, repeat: Infinity, ease: 'linear' }}
            />

            {/* ── Center icon ──────────────────────────────── */}
            <img
                src={ukonnectIcon}
                alt="Ukonnect"
                className="absolute z-10 rounded-xl object-contain pointer-events-none"
                style={{
                    width: 30, height: 30,
                    left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* ── Blips (pixel-offset from container center) ── */}
            <AnimatePresence>
                {blips.map(b => (
                    <motion.div
                        key={b.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: '50%',
                            top:  '50%',
                            x: b.x - 5,  // -5 centers the 10px dot
                            y: b.y - 5,
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: [0, 1.5, 1], opacity: [1, 1, 0] }}
                        transition={{ duration: 2.8, times: [0, 0.15, 1], ease: 'easeOut' }}
                        onAnimationComplete={() => removeBlip(b.id)}
                    >
                        <div
                            className="w-2.5 h-2.5 rounded-full bg-primary"
                            style={{ boxShadow: '0 0 6px rgba(86,0,227,0.6)' }}
                        />
                        {b.pulse && (
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ border: '1.5px solid rgba(86,0,227,0.55)' }}
                                initial={{ scale: 1, opacity: 0.6 }}
                                animate={{ scale: 3.2, opacity: 0 }}
                                transition={{ duration: 0.9, ease: 'easeOut' }}
                            />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* ── Counter ─────────────────────────────────── */}
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                <span className="text-[8px] font-semibold text-slate-500 tabular-nums">
                    Leads found: {count}
                </span>
            </div>

        </div>
    );
};
