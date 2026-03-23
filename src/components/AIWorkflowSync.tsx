import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Database, UserPlus, Mail, BarChart2 } from 'lucide-react';
import icon from '../assets/Ukonnect Marketing icon.webp';

/* ── Design token ─────────────────────────────────────────── */

const NODE_STYLE = 'w-[54px] h-[54px] bg-[#ecedf1] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center';
const AI_NODE_STYLE = 'w-[66px] h-[66px] bg-[#ecedf1] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center';

/* ── Nodes: position in viewBox 0 0 100 100 ─────────────────── */

const NODES = [
    { label: 'CRM',         x: 10, y: 50, icon: 'database' },
    { label: 'Lead',        x: 28, y: 25, icon: 'user'     },
    { label: 'Ukonnect AI', x: 50, y: 50, icon: 'ai'       },
    { label: 'Messaging',   x: 72, y: 75, icon: 'mail'     },
    { label: 'Analytics',   x: 90, y: 50, icon: 'chart'    },
] as const;

/* ── Smooth S-curve path through all 5 nodes ─────────────────── */

const PATH_D = 'M 10 50 C 19 50 19 25 28 25 C 37 25 37 50 50 50 C 63 50 63 75 72 75 C 81 75 81 50 90 50';

/* ── Dot config ──────────────────────────────────────────────── */

const DOT_DURATION  = 4.5;   // seconds for one full traversal (normal)
const DOT_DURATION_HOVERED = 2.25;
const N_DOTS = 3;

/* ── FlowingDot (rAF-based) ──────────────────────────────────── */

const FlowingDot = ({
    pathSamples,
    startOffset,
    isHovered,
    nodeTs,
    onNodeArrival,
}: {
    pathSamples: { x: number; y: number }[];
    startOffset: number;   // 0–1, initial position on path
    isHovered: boolean;
    nodeTs: number[];
    onNodeArrival: (nodeIdx: number) => void;
}) => {
    const ref           = useRef<SVGCircleElement>(null);
    const progressRef   = useRef(startOffset);
    const hoveredRef    = useRef(isHovered);
    hoveredRef.current  = isHovered;
    const onArrivalRef  = useRef(onNodeArrival);
    onArrivalRef.current = onNodeArrival;
    const arrivedRef    = useRef<Set<number>>(new Set());

    useEffect(() => {
        if (pathSamples.length === 0) return;

        let frameId: number;
        let lastTime = performance.now();
        const n = pathSamples.length - 1;

        const tick = (now: number) => {
            const dt  = (now - lastTime) / 1000;
            lastTime  = now;

            const dur   = hoveredRef.current ? DOT_DURATION_HOVERED : DOT_DURATION;
            const speed = 1 / dur;
            const prev  = progressRef.current;
            progressRef.current = (prev + dt * speed) % 1;
            const t = progressRef.current;

            /* Wrap detection → reset arrived set */
            if (prev > t) arrivedRef.current.clear();

            /* Node arrival callbacks */
            nodeTs.forEach((nt, i) => {
                if (!arrivedRef.current.has(i) && prev <= nt && t >= nt) {
                    arrivedRef.current.add(i);
                    onArrivalRef.current(i);
                }
            });

            /* Interpolate position */
            const idx  = t * n;
            const lo   = Math.floor(idx);
            const hi   = Math.min(lo + 1, n);
            const frac = idx - lo;
            const px   = pathSamples[lo].x + (pathSamples[hi].x - pathSamples[lo].x) * frac;
            const py   = pathSamples[lo].y + (pathSamples[hi].y - pathSamples[lo].y) * frac;

            /* Fade near path endpoints */
            const opacity = t < 0.04 ? (t / 0.04) * 0.85
                          : t > 0.96 ? ((1 - t) / 0.04) * 0.85
                          : 0.85;

            if (ref.current) {
                ref.current.setAttribute('cx', String(px));
                ref.current.setAttribute('cy', String(py));
                ref.current.setAttribute('opacity', String(opacity));
            }

            frameId = requestAnimationFrame(tick);
        };

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathSamples]);

    return <circle ref={ref} r={1.2} fill="#5600e3" opacity={0} />;
};

/* ── Node icon ────────────────────────────────────────────────── */

const NodeIcon = ({ type }: { type: string }) => {
    const cls = 'w-[22px] h-[22px] text-primary';
    if (type === 'database') return <Database  className={cls} />;
    if (type === 'user')     return <UserPlus  className={cls} />;
    if (type === 'mail')     return <Mail      className={cls} />;
    if (type === 'chart')    return <BarChart2 className={cls} />;
    if (type === 'ai')       return <img src={icon} alt="Ukonnect AI" className="w-[27px] h-[27px] object-contain" />;
    return null;
};

/* ── Main component ───────────────────────────────────────────── */

export const AIWorkflowSync = () => {
    const [isHovered,    setIsHovered]    = useState(false);
    const [pathSamples,  setPathSamples]  = useState<{ x: number; y: number }[]>([]);
    const [nodeTs,       setNodeTs]       = useState<number[]>([]);
    const [pulseKeys,    setPulseKeys]    = useState(() => NODES.map(() => 0));

    const pathRef = useRef<SVGPathElement>(null);

    /* Sample path geometry once it's in the DOM */
    useEffect(() => {
        const el = pathRef.current;
        if (!el) return;

        const total = el.getTotalLength();
        const N = 300;
        const samples = Array.from({ length: N + 1 }, (_, i) => {
            const pt = el.getPointAtLength((i / N) * total);
            return { x: pt.x, y: pt.y };
        });
        setPathSamples(samples);

        /* Find t (0-1) along path closest to each node's centre */
        const ts = NODES.map(node => {
            let bestT = 0, bestDist = Infinity;
            samples.forEach((s, i) => {
                const d = Math.hypot(s.x - node.x, s.y - node.y);
                if (d < bestDist) { bestDist = d; bestT = i / N; }
            });
            return bestT;
        });
        setNodeTs(ts);
    }, []);

    const handleNodeArrival = useCallback((idx: number) => {
        setPulseKeys(prev => prev.map((k, i) => i === idx ? k + 1 : k));
    }, []);

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ── SVG: path + dots ─────────────────────────── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <motion.path
                    ref={pathRef}
                    d={PATH_D}
                    stroke="#CBD5E1" strokeWidth="0.7" strokeLinecap="round" fill="none"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                />

                {pathSamples.length > 0 && nodeTs.length === NODES.length &&
                    Array.from({ length: N_DOTS }, (_, i) => (
                        <FlowingDot
                            key={i}
                            pathSamples={pathSamples}
                            startOffset={i / N_DOTS}
                            isHovered={isHovered}
                            nodeTs={nodeTs}
                            onNodeArrival={handleNodeArrival}
                        />
                    ))
                }
            </svg>

            {/* ── Node overlays ────────────────────────────── */}
            {NODES.map((node, i) => {
                const isAI = node.icon === 'ai';
                return (
                    <div
                        key={node.label}
                        className="absolute z-10 pointer-events-none"
                        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
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
                                className={`${isAI ? AI_NODE_STYLE : NODE_STYLE} relative`}
                                animate={isAI
                                    ? { scale: [1, 1.03, 1] }
                                    : { y: [0, -4, 0] }
                                }
                                transition={{
                                    repeat: Infinity,
                                    duration: isAI ? 4.5 : 3.5 + i * 0.4,
                                    ease: 'easeInOut',
                                    delay: i * 0.4,
                                }}
                            >
                                <NodeIcon type={node.icon} />

                                {/* One-shot pulse ring on dot arrival */}
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
                );
            })}
        </div>
    );
};
