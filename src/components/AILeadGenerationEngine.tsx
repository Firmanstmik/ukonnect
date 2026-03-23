import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import icon         from '../assets/Ukonnect Marketing icon.webp';
import metaIcon     from '../assets/meta.webp';
import googleAdsIcon from '../assets/Ukonnect Google Ads.webp';
import wordpressIcon from '../assets/Wordpress.webp';
import googleIcon   from '../assets/google ukonnect.svg';

/* ── Design token ─────────────────────────────────────────── */

const NODE_STYLE      = 'w-[54px] h-[54px] bg-[#ecedf1] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center';
const LEAD_NODE_STYLE = 'w-[66px] h-[66px] bg-[#ecedf1] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center';

/* ── Layout coordinates (viewBox 0 0 100 100) ─────────────── */

const AI_X = 50, AI_Y = 50;

const CHANNELS = [
    { label: 'Meta Ads',   x: 18, y: 15, icon: 'meta'      },
    { label: 'Google Ads', x: 18, y: 38, icon: 'googleAds' },
    { label: 'Website',    x: 18, y: 62, icon: 'wordpress' },
    { label: 'SEO',        x: 18, y: 85, icon: 'google'    },
] as const;

/* ── SVG paths: channels → AI (L-shaped routing) ────────────
   Top two:    right → curve down  → AI
   Bottom two: right → curve up    → AI                      */

const CHANNEL_LINE_PATHS = [
    'M 18 15 L 46 15 Q 50 15 50 19 L 50 50',
    'M 18 38 L 47 38 Q 50 38 50 41 L 50 50',
    'M 18 62 L 47 62 Q 50 62 50 59 L 50 50',
    'M 18 85 L 46 85 Q 50 85 50 81 L 50 50',
] as const;

/* ── Dot path timing ──────────────────────────────────────── */

const CHANNEL_DURATIONS = [2.4, 2.2, 2.2, 2.4] as const;
const CHANNEL_DELAYS    = [0, 0.1, 0.2, 0.3]   as const;

/* ── Lead spawn timing ────────────────────────────────────── */

const SPAWN_INTERVAL  = 1750;   // ms between leads (normal)
const LEAD_DURATION   = 2.6;   // seconds to cross the card (normal)
const SPAWN_FAST      = 875;   // ms between leads (hovered)
const LEAD_FAST_DUR   = 1.3;   // seconds to cross (hovered)

/* ── Helpers ─────────────────────────────────────────────── */

const mkPts = (x1: number, y1: number, x2: number, y2: number, n: number) =>
    Array.from({ length: n }, (_, i) => ({
        x: x1 + (x2 - x1) * (i / (n - 1)),
        y: y1 + (y2 - y1) * (i / (n - 1)),
    }));

const CHANNEL_PTS = [
    [
        { x: 18, y: 15 }, { x: 26, y: 15 }, { x: 34, y: 15 },
        { x: 42, y: 15 }, { x: 46, y: 15 }, { x: 50, y: 19 },
        { x: 50, y: 28 }, { x: 50, y: 38 }, { x: 50, y: 44 }, { x: 50, y: 50 },
    ],
    [
        { x: 18, y: 38 }, { x: 27, y: 38 }, { x: 35, y: 38 },
        { x: 42, y: 38 }, { x: 47, y: 38 }, { x: 49, y: 39 },
        { x: 50, y: 41 }, { x: 50, y: 44 }, { x: 50, y: 47 }, { x: 50, y: 50 },
    ],
    [
        { x: 18, y: 62 }, { x: 27, y: 62 }, { x: 35, y: 62 },
        { x: 42, y: 62 }, { x: 47, y: 62 }, { x: 49, y: 61 },
        { x: 50, y: 59 }, { x: 50, y: 56 }, { x: 50, y: 53 }, { x: 50, y: 50 },
    ],
    [
        { x: 18, y: 85 }, { x: 26, y: 85 }, { x: 34, y: 85 },
        { x: 42, y: 85 }, { x: 46, y: 85 }, { x: 50, y: 81 },
        { x: 50, y: 72 }, { x: 50, y: 62 }, { x: 50, y: 56 }, { x: 50, y: 50 },
    ],
];

/* ── Signal dot (rAF-based) ──────────────────────────────── */

const SignalDot = ({
    cxValues, cyValues, duration, delay, isHovered,
}: {
    cxValues: number[];
    cyValues: number[];
    duration: number;
    delay: number;
    isHovered: boolean;
}) => {
    const ref          = useRef<SVGEllipseElement>(null);
    const progressRef  = useRef(0);
    const hoveredRef   = useRef(isHovered);
    hoveredRef.current = isHovered;

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
            progressRef.current = (progressRef.current + dt * speed) % 1;

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
                ref.current.setAttribute('cx', String(cx));
                ref.current.setAttribute('cy', String(cy));
                ref.current.setAttribute('opacity', String(opacity));
            }
            frameId = requestAnimationFrame(tick);
        };

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <ellipse ref={ref} rx={0.7} ry={0.95} fill="#5600e3" opacity={0} />;
};

/* ── Channel icon ────────────────────────────────────────── */

const ChannelIcon = ({ type }: { type: string }) => {
    if (type === 'meta')      return <img src={metaIcon}      alt="Meta Ads"   className="w-[40px] h-[40px] object-contain" />;
    if (type === 'googleAds') return <img src={googleAdsIcon} alt="Google Ads" className="w-[30px] h-[30px] object-contain" />;
    if (type === 'wordpress') return <img src={wordpressIcon} alt="Website"    className="w-[30px] h-[30px] object-contain" />;
    if (type === 'google')    return <img src={googleIcon}    alt="SEO"        className="w-[30px] h-[30px] object-contain" />;
    return null;
};

/* ── Main component ──────────────────────────────────────── */

interface Lead { id: number; duration: number }

export const AILeadGenerationEngine = () => {
    const [isHovered, setIsHovered] = useState(false);
    const isHoveredRef = useRef(false);

    const [leads, setLeads] = useState<Lead[]>([]);
    const nextIdRef = useRef(0);

    // Keep ref in sync so spawn timer can read it without stale closure
    const handleMouseEnter = useCallback(() => { setIsHovered(true);  isHoveredRef.current = true;  }, []);
    const handleMouseLeave = useCallback(() => { setIsHovered(false); isHoveredRef.current = false; }, []);

    // Adaptive lead spawner — interval halves on hover
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const spawn = () => {
            const fast = isHoveredRef.current;
            setLeads(prev => [...prev, { id: nextIdRef.current++, duration: fast ? LEAD_FAST_DUR : LEAD_DURATION }]);
            timer = setTimeout(spawn, fast ? SPAWN_FAST : SPAWN_INTERVAL);
        };

        timer = setTimeout(spawn, 600);
        return () => clearTimeout(timer);
    }, []);

    const handleLeadComplete = useCallback((id: number) => {
        setLeads(prev => prev.filter(l => l.id !== id));
    }, []);

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* ── SVG: lines + channel dots ─────────────── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {CHANNEL_LINE_PATHS.map((d, i) => (
                    <motion.path
                        key={i}
                        d={d}
                        stroke="#CBD5E1" strokeWidth="0.7" strokeLinecap="round" fill="none"
                        initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                    />
                ))}

                {CHANNEL_PTS.map((pts, i) => (
                    <SignalDot
                        key={i}
                        cxValues={pts.map(p => p.x)}
                        cyValues={pts.map(p => p.y)}
                        duration={CHANNEL_DURATIONS[i]}
                        delay={CHANNEL_DELAYS[i]}
                        isHovered={isHovered}
                    />
                ))}
            </svg>

            {/* ── Channel source nodes (left) ───────────── */}
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
                            duration: 0.4, delay: 0.3 + i * 0.1,
                            type: 'spring', stiffness: 300, damping: 20,
                        }}
                    >
                        <motion.div
                            className={NODE_STYLE}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 3.5 + i * 0.4, ease: 'easeInOut', delay: i * 0.4 }}
                        >
                            <ChannelIcon type={ch.icon} />
                        </motion.div>
                    </motion.div>
                </div>
            ))}

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

            {/* ── Lead nodes: pop from AI, slide right, fade out ── */}
            <AnimatePresence>
                {leads.map(lead => (
                    <motion.div
                        key={lead.id}
                        className="absolute z-20 pointer-events-none"
                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                        initial={{ left: '57%', opacity: 0, scale: 0 }}
                        animate={{
                            left: '118%',
                            opacity: [0, 1, 1, 0],
                            scale:   [0, 0.9, 0.9, 0.9],
                        }}
                        transition={{
                            duration: lead.duration,
                            ease: 'linear',
                            opacity: { times: [0, 0.06, 0.9, 1],  duration: lead.duration },
                            scale:   { times: [0, 0.08, 0.5, 1], duration: lead.duration },
                        }}
                        onAnimationComplete={() => handleLeadComplete(lead.id)}
                    >
                        <div className={LEAD_NODE_STYLE}>
                            <div className="flex flex-col items-center justify-center gap-0.5">
                                <UserPlus className="w-[20px] h-[20px] text-primary" />
                                <span className="text-[8px] font-semibold text-slate-600 leading-none">Lead</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
