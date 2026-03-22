import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
import icon from '../assets/Ukonnect Marketing icon.webp';
import metaIcon from '../assets/meta.webp';
import googleAdsIcon from '../assets/Ukonnect Google Ads.webp';
import wordpressIcon from '../assets/Wordpress.webp';
import googleIcon from '../assets/google ukonnect.svg';

const NODE_STYLE = 'w-[54px] h-[54px] bg-[#ecedf1] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center';

const BUS_X = 42;
const BUS_TOP_Y = 8;
const BUS_BOT_Y = 92;
const CENTER_X = 63;
const CENTER_Y = 50;

const SOURCES: { label: string; x: number; y: number; icon: string }[] = [
    { label: 'Meta Ads',   x: 15, y: 8,  icon: 'meta' },
    { label: 'Google Ads', x: 15, y: 33, icon: 'googleAds' },
    { label: 'Website',    x: 15, y: 67, icon: 'wordpress' },
    { label: 'SEO',        x: 15, y: 92, icon: 'google' },
];

const DURATIONS = [2.4, 2.8, 2.6, 3.0];

const mkPts = (x1: number, y1: number, x2: number, y2: number, n: number) =>
    Array.from({ length: n }, (_, i) => ({
        x: x1 + (x2 - x1) * (i / (n - 1)),
        y: y1 + (y2 - y1) * (i / (n - 1)),
    }));

// Each dot travels: source → horizontal to bus → vertical along bus to center → horizontal to AI
const CONNECTIONS = SOURCES.map((node) => {
    const seg1 = mkPts(node.x, node.y, BUS_X, node.y, 5);        // horizontal to bus
    const seg2 = mkPts(BUS_X, node.y, BUS_X, CENTER_Y, 5);       // vertical along bus
    const seg3 = mkPts(BUS_X, CENTER_Y, CENTER_X, CENTER_Y, 5);  // horizontal to AI

    const allPts = [...seg1.slice(0, -1), ...seg2.slice(0, -1), ...seg3];

    return {
        pathD: `M ${node.x} ${node.y} L ${BUS_X} ${node.y}`,
        cx: allPts.map(p => p.x),
        cy: allPts.map(p => p.y),
    };
});

const SignalDot = ({ cxValues, cyValues, duration, delay, isHovered }: {
    cxValues: number[];
    cyValues: number[];
    duration: number;
    delay: number;
    isHovered: boolean;
}) => {
    const ref = useRef<SVGEllipseElement>(null);
    const progressRef = useRef(0);
    const hoveredRef = useRef(isHovered);
    hoveredRef.current = isHovered;

    useEffect(() => {
        let frameId: number;
        let lastTime = performance.now();
        let started = false;
        const startTime = performance.now() + delay * 1000;

        const tick = (now: number) => {
            if (!started && now < startTime) {
                frameId = requestAnimationFrame(tick);
                return;
            }
            if (!started) {
                started = true;
                lastTime = now;
            }

            const dt = (now - lastTime) / 1000;
            lastTime = now;
            const speed = hoveredRef.current ? 2 / duration : 1 / duration;
            progressRef.current = (progressRef.current + dt * speed) % 1;

            const t = progressRef.current;
            const n = cxValues.length - 1;
            const idx = t * n;
            const lo = Math.floor(idx);
            const hi = Math.min(lo + 1, n);
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

    return (
        <ellipse
            ref={ref}
            rx={0.7}
            ry={0.95}
            fill="#5600e3"
            opacity={0}
        />
    );
};

export const AILeadGenerationEngine = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [leads, setLeads] = useState<{ id: number }[]>([]);
    const nextIdRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = nextIdRef.current++;
            setLeads((prev) => [...prev, { id }]);
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    const handleLeadComplete = (id: number) => {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
    };

    return (
        <div className="w-full h-full relative overflow-hidden">
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {/* Vertical bus line */}
                <motion.line
                    x1={BUS_X} y1={BUS_TOP_Y} x2={BUS_X} y2={BUS_BOT_Y}
                    stroke="#CBD5E1"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                />

                {/* Bus center → AI node */}
                <motion.line
                    x1={BUS_X} y1={CENTER_Y} x2={CENTER_X} y2={CENTER_Y}
                    stroke="#CBD5E1"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                />

                {/* Per-source horizontal lines to bus */}
                {CONNECTIONS.map((conn, i) => (
                    <React.Fragment key={SOURCES[i].label}>
                        <motion.path
                            d={conn.pathD}
                            stroke="#CBD5E1"
                            strokeWidth="0.7"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.45 }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                        />

                        {/* Signal dot travels source → bus → AI */}
                        <SignalDot
                            cxValues={conn.cx}
                            cyValues={conn.cy}
                            duration={DURATIONS[i]}
                            delay={i * 0.35}
                            isHovered={isHovered}
                        />
                    </React.Fragment>
                ))}
            </svg>

            {/* Source nodes */}
            {SOURCES.map((node, i) => (
                <div
                    key={node.label}
                    className="absolute z-10 pointer-events-none"
                    style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
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
                            className={NODE_STYLE}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 3.5 + i * 0.4,
                                ease: 'easeInOut',
                                delay: i * 0.3,
                            }}
                        >
                            {node.icon === 'meta'
                                ? <img src={metaIcon} alt="Meta Ads" className="w-[40px] h-[40px] object-contain" />
                                : node.icon === 'googleAds'
                                ? <img src={googleAdsIcon} alt="Google Ads" className="w-[30px] h-[30px] object-contain" />
                                : node.icon === 'wordpress'
                                ? <img src={wordpressIcon} alt="WordPress" className="w-[30px] h-[30px] object-contain" />
                                : node.icon === 'google'
                                ? <img src={googleIcon} alt="Google" className="w-[30px] h-[30px] object-contain" />
                                : node.icon}
                        </motion.div>
                    </motion.div>
                </div>
            ))}

            {/* Center Ukonnect AI node */}
            <div
                className="absolute z-20"
                style={{ left: '63%', top: '50%', transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{
                        repeat: Infinity,
                        duration: 4.5,
                        ease: 'easeInOut',
                    }}
                >
                    <motion.div
                        className={NODE_STYLE}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <img
                            src={icon}
                            alt="Ukonnect AI"
                            className="w-[27px] h-[27px] object-contain"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Lead output nodes */}
            <AnimatePresence>
                {leads.map((lead) => (
                    <motion.div
                        key={lead.id}
                        className="absolute z-20"
                        style={{ top: '50%', transform: 'translateY(-50%)' }}
                        initial={{ left: '69%', opacity: 0, scale: 0 }}
                        animate={{ left: '118%', opacity: [0, 1, 1, 0], scale: [0, 0.9, 0.9, 0.9] }}
                        transition={{
                            duration: 2.8,
                            ease: 'linear',
                            opacity: { times: [0, 0.06, 0.97, 1], duration: 2.8 },
                            scale: { times: [0, 0.1, 0.5, 1], duration: 2.8 },
                        }}
                        onAnimationComplete={() => handleLeadComplete(lead.id)}
                    >
                        <div className={NODE_STYLE}>
                            <div className="flex flex-col items-center justify-center gap-0.5">
                                <User className="w-[16px] h-[16px] text-primary" />
                                <div className="text-[8px] font-semibold text-slate-700 leading-tight">New Lead</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
