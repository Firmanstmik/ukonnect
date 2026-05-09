import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, BarChart2, FileText, UserPlus } from 'lucide-react';
import icon from '../assets/Ukonnect Marketing icon.webp';

/* ── Design token (identical to AILeadGenerationEngine) ───── */

const NODE_STYLE = 'w-[54px] h-[54px] bg-[#ecedf1] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center';

/* ── Layout coordinates (viewBox 0 0 100 100) ─────────────── */

const AI_X = 50, AI_Y = 50;
const LEAD_X = 14, LEAD_Y = 50;

const CHANNELS = [
    { label: 'Email',   x: 82, y: 20, icon: 'mail'    },
    { label: 'Ads',     x: 82, y: 50, icon: 'ads'     },
    { label: 'Content', x: 82, y: 80, icon: 'content' },
] as const;

/* ── Dot path timing ──────────────────────────────────────── */

const LEAD_DURATION    = 2.0;
const LEAD_DELAY       = 0;

const OUTPUT_DURATIONS = [2.4, 2.0, 2.4] as const;
const OUTPUT_DELAYS    = [1.0, 1.1, 1.2] as const;

/* ── Helpers ─────────────────────────────────────────────── */

const mkPts = (x1: number, y1: number, x2: number, y2: number, n: number) =>
    Array.from({ length: n }, (_, i) => ({
        x: x1 + (x2 - x1) * (i / (n - 1)),
        y: y1 + (y2 - y1) * (i / (n - 1)),
    }));

const LEAD_PTS = mkPts(LEAD_X, LEAD_Y, AI_X, AI_Y, 10);

// Email: up from AI then right to node (follows the L-shaped path)
const EMAIL_PTS = [
    { x: 50, y: 50 }, { x: 50, y: 44 }, { x: 50, y: 38 },
    { x: 50, y: 32 }, { x: 50, y: 26 }, { x: 50, y: 23 },
    { x: 52, y: 20 }, { x: 58, y: 20 }, { x: 68, y: 20 }, { x: 82, y: 20 },
];

// Ads: straight horizontal (unchanged)
const ADS_PTS = mkPts(AI_X, AI_Y, CHANNELS[1].x, CHANNELS[1].y, 10);

// Content: down from AI then right to node (mirrors Email)
const CONTENT_PTS = [
    { x: 50, y: 50 }, { x: 50, y: 56 }, { x: 50, y: 62 },
    { x: 50, y: 68 }, { x: 50, y: 74 }, { x: 50, y: 77 },
    { x: 52, y: 80 }, { x: 58, y: 80 }, { x: 68, y: 80 }, { x: 82, y: 80 },
];

const CHANNEL_PTS = [EMAIL_PTS, ADS_PTS, CONTENT_PTS];

/* ── Signal dot ──────────────────────────────────────────── */

const SignalDot = ({
    cxValues, cyValues, duration, delay, isHovered, onArrival,
}: {
    cxValues: number[];
    cyValues: number[];
    duration: number;
    delay: number;
    isHovered: boolean;
    onArrival?: () => void;
}) => {
    const ref          = useRef<HTMLDivElement>(null);
    const progressRef  = useRef(0);
    const hoveredRef   = useRef(isHovered);
    const arrivalRef   = useRef(onArrival);
    hoveredRef.current = isHovered;
    arrivalRef.current = onArrival;

    useEffect(() => {
        let frameId: number;
        let lastTime  = performance.now();
        let started   = false;
        const startTime = performance.now() + delay * 1000;

        const tick = (now: number) => {
            if (!started && now < startTime) { frameId = requestAnimationFrame(tick); return; }
            if (!started) { started = true; lastTime = now; }

            const dt    = (now - lastTime) / 1000;
            lastTime    = now;
            const speed = hoveredRef.current ? 2 / duration : 1 / duration;

            const prev = progressRef.current;
            progressRef.current = (prev + dt * speed) % 1;

            // Dot just crossed the finish line (wrapped 1→0)
            if (prev > 0.85 && progressRef.current < 0.15) {
                arrivalRef.current?.();
            }

            const t = progressRef.current;
            const n = cxValues.length - 1;
            const idx = t * n;
            const lo  = Math.floor(idx);
            const hi  = Math.min(lo + 1, n);
            const frac = idx - lo;
            const cx = cxValues[lo] + (cxValues[hi] - cxValues[lo]) * frac;
            const cy = cyValues[lo] + (cyValues[hi] - cyValues[lo]) * frac;

            const opacity = t < 0.1 ? (t / 0.1) * 0.8
                          : t > 0.9 ? ((1 - t) / 0.1) * 0.8
                          : 0.8;

            if (ref.current) {
                ref.current.style.left    = cx + '%';
                ref.current.style.top     = cy + '%';
                ref.current.style.opacity = String(opacity);
            }
            frameId = requestAnimationFrame(tick);
        };

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div ref={ref} className="absolute w-2 h-2 rounded-full bg-primary pointer-events-none" style={{ transform: 'translate(-50%, -50%)', opacity: 0 }} />;
};

/* ── Channel icon map ────────────────────────────────────── */

const ChannelIcon = ({ type }: { type: string }) => {
    const cls = 'w-[22px] h-[22px] text-primary';
    if (type === 'mail')    return <Mail      className={cls} />;
    if (type === 'ads')     return <BarChart2 className={cls} />;
    if (type === 'content') return <FileText  className={cls} />;
    return null;
};

/* ── Main component ──────────────────────────────────────── */

export const AIMarketingAutomation = () => {
    const [isHovered, setIsHovered] = useState(false);
    // Each entry increments when its dot arrives → remounts the pulse ring → plays one-shot animation
    const [pulseKeys, setPulseKeys] = useState([0, 0, 0]);

    const handleArrival = useCallback((i: number) => {
        setPulseKeys(prev => prev.map((k, idx) => idx === i ? k + 1 : k));
    }, []);

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ── SVG layer: lines + dots ───────────────── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {/* Lead → AI line */}
                <motion.line
                    x1={LEAD_X} y1={LEAD_Y} x2={AI_X} y2={AI_Y}
                    stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                />

                {/* AI → Email: vertical up then curve right (L-shape) */}
                <motion.path
                    d="M 50 50 L 50 23 Q 50 20 54 20 L 82 20"
                    stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />

                {/* AI → Ads: straight horizontal (unchanged) */}
                <motion.line
                    x1={AI_X} y1={AI_Y} x2={CHANNELS[1].x} y2={CHANNELS[1].y}
                    stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />

                {/* AI → Content: vertical down then curve right (L-shape, mirrors Email) */}
                <motion.path
                    d="M 50 50 L 50 77 Q 50 80 54 80 L 82 80"
                    stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" fill="none"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                />

            </svg>

            {/* Signal dots — HTML divs so they stay perfectly circular */}
            <SignalDot
                cxValues={LEAD_PTS.map(p => p.x)}
                cyValues={LEAD_PTS.map(p => p.y)}
                duration={LEAD_DURATION}
                delay={LEAD_DELAY}
                isHovered={isHovered}
            />
            {CHANNEL_PTS.map((pts, i) => (
                <SignalDot
                    key={i}
                    cxValues={pts.map(p => p.x)}
                    cyValues={pts.map(p => p.y)}
                    duration={OUTPUT_DURATIONS[i]}
                    delay={OUTPUT_DELAYS[i]}
                    isHovered={isHovered}
                    onArrival={() => handleArrival(i)}
                />
            ))}

            {/* ── Lead input node ───────────────────────── */}
            <div
                className="absolute z-10 pointer-events-none"
                style={{ left: `${LEAD_X}%`, top: `${LEAD_Y}%`, transform: 'translate(-50%, -50%)' }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <motion.div
                        className={NODE_STYLE}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
                    >
                        <div className="flex flex-col items-center justify-center gap-0.5">
                            <UserPlus className="w-[18px] h-[18px] text-primary" />
                            <span className="text-[7px] font-semibold text-slate-600 leading-none">Lead</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Ukonnect AI node (center) ─────────────── */}
            <div
                className="absolute z-20"
                style={{ left: `${AI_X}%`, top: `${AI_Y}%`, transform: 'translate(-50%, -50%)' }}
            >
                <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                >
                    <motion.div
                        className={NODE_STYLE}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <img src={icon} alt="Ukonnect AI" className="w-[27px] h-[27px] object-contain" />
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Channel output nodes ──────────────────── */}
            {CHANNELS.map((ch, i) => (
                <div
                    key={ch.label}
                    className="absolute z-10 pointer-events-none"
                    style={{ left: `${ch.x}%`, top: `${ch.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.5 + i * 0.1,
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                        }}
                    >
                        <motion.div
                            className={`${NODE_STYLE} relative`}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 3.5 + i * 0.4,
                                ease: 'easeInOut',
                                delay: i * 0.5,
                            }}
                        >
                            <ChannelIcon type={ch.icon} />

                            {/* One-shot pulse ring — remounts each time dot arrives */}
                            {pulseKeys[i] > 0 && (
                                <motion.div
                                    key={pulseKeys[i]}
                                    className="absolute inset-0 rounded-2xl border border-primary/60 pointer-events-none"
                                    initial={{ scale: 1, opacity: 0.6 }}
                                    animate={{ scale: 1.55, opacity: 0 }}
                                    transition={{ duration: 0.65, ease: 'easeOut' }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};
