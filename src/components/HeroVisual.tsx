import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { MouseEvent, ReactElement, ReactNode, WheelEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Profile2User, TrendUp } from 'iconsax-react';
import {
    IconBrain,
    IconFlash,
    IconRefresh,
    IconSparkle,
    IconTick,
    IconTrendUp,
    IconUsers,
    type IconsaxIconProps,
} from './icons/HeroIcons';

const EASE = [0.22, 1, 0.36, 1] as const;

type ChartPeriod = '7D' | '30D' | '90D';

type ChartPoint = { x: number; y: number; label: string; value: string };

const CHART_VIEW_W = 292;
const CHART_VIEW_H = 86;
const CHART_BASE_Y = 84;

const CHART_SERIES: Record<ChartPeriod, { growth: string; subtitle: string; points: ChartPoint[] }> = {
    '7D': {
        growth: '+42%',
        subtitle: 'Last 7 days',
        points: [
            { x: 14, y: 66, label: 'Mon', value: '+6%' },
            { x: 56, y: 60, label: 'Tue', value: '+9%' },
            { x: 98, y: 52, label: 'Wed', value: '+12%' },
            { x: 140, y: 42, label: 'Thu', value: '+18%' },
            { x: 182, y: 30, label: 'Fri', value: '+24%' },
            { x: 224, y: 20, label: 'Sat', value: '+34%' },
            { x: 266, y: 12, label: 'Sun', value: '+42%' },
        ],
    },
    '30D': {
        growth: '+185%',
        subtitle: 'Last 30 days',
        points: [
            { x: 14, y: 72, label: 'W1', value: '+22%' },
            { x: 56, y: 64, label: 'W2', value: '+48%' },
            { x: 98, y: 54, label: 'W3', value: '+76%' },
            { x: 140, y: 40, label: 'W4', value: '+112%' },
            { x: 182, y: 26, label: 'W5', value: '+148%' },
            { x: 224, y: 16, label: 'W6', value: '+168%' },
            { x: 266, y: 8, label: 'Now', value: '+185%' },
        ],
    },
    '90D': {
        growth: '+312%',
        subtitle: 'Last 90 days',
        points: [
            { x: 14, y: 74, label: 'M1', value: '+38%' },
            { x: 56, y: 68, label: 'M2', value: '+72%' },
            { x: 98, y: 58, label: 'M3', value: '+118%' },
            { x: 140, y: 44, label: 'M4', value: '+168%' },
            { x: 182, y: 30, label: 'M5', value: '+228%' },
            { x: 224, y: 18, label: 'M6', value: '+276%' },
            { x: 266, y: 10, label: 'Now', value: '+312%' },
        ],
    },
};

function buildSmoothPath(points: ChartPoint[]): string {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cx = (p0.x + p1.x) / 2;
        d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
}

function InteractivePipelineChart({
    className = 'h-[80px]',
    uid,
    tight,
    period,
    fillHeight = false,
}: {
    className?: string;
    uid: string;
    tight?: boolean;
    period: ChartPeriod;
    fillHeight?: boolean;
}) {
    const [drawn, setDrawn] = useState(false);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [zoom, setZoom] = useState(1);
    const [panX, setPanX] = useState(0);
    const canvasRef = useRef<HTMLDivElement>(null);
    const lastWheelRef = useRef(0);

    const series = CHART_SERIES[period];
    const linePath = useMemo(() => buildSmoothPath(series.points), [series.points]);
    const areaPath = useMemo(
        () => `${linePath} L${series.points.at(-1)!.x} ${CHART_BASE_Y} L${series.points[0].x} ${CHART_BASE_Y} Z`,
        [linePath, series.points],
    );
    const lastPoint = series.points.at(-1)!;
    const hovered = activeIdx !== null ? series.points[activeIdx] : lastPoint;

    useEffect(() => {
        setDrawn(false);
        const t = setTimeout(() => setDrawn(true), 120);
        return () => clearTimeout(t);
    }, [period]);

    useEffect(() => {
        setActiveIdx(null);
        setZoom(1);
        setPanX(0);
    }, [period]);

    const handleWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const now = Date.now();
        if (now - lastWheelRef.current < 40) return;
        lastWheelRef.current = now;
        const delta = e.deltaY > 0 ? -0.14 : 0.14;
        setZoom((z) => Math.min(2.15, Math.max(1, Number((z + delta).toFixed(2)))));
    }, []);

    const handleCanvasClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('[data-chart-point]')) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const ratio = (e.clientX - rect.left) / rect.width;
        setPanX((ratio - 0.5) * 28);
        setZoom((z) => (z >= 1.75 ? 1 : Number((z + 0.38).toFixed(2))));
    }, []);

    const handleDoubleClick = useCallback(() => {
        setZoom(1);
        setPanX(0);
        setActiveIdx(null);
    }, []);

    const fillId = `heroChartFill-${uid}`;
    const fillGlowId = `heroChartFillGlow-${uid}`;
    const lineId = `heroChartLine-${uid}`;
    const lineShineId = `heroChartLineShine-${uid}`;
    const meshId = `heroChartMesh-${uid}`;
    const glowFilterId = `heroChartGlow-${uid}`;
    const neonFilterId = `heroChartNeon-${uid}`;
    const dotGradId = `heroChartDot-${uid}`;
    const scanGradId = `heroChartScan-${uid}`;

    return (
        <div
            ref={canvasRef}
            role="img"
            aria-label={`Pipeline growth chart for ${period}, ${series.growth}`}
            onWheel={handleWheel}
            onClick={handleCanvasClick}
            onDoubleClick={handleDoubleClick}
            onMouseLeave={() => setActiveIdx(null)}
            className={`hero-chart-canvas hero-chart-canvas--interactive relative w-full select-none ${tight ? 'px-1 py-0.5' : 'p-1.5'} ${
                fillHeight ? 'flex flex-col justify-end' : ''
            } ${className}`}
        >
            <div className="absolute inset-0 rounded-[0.65rem] overflow-hidden pointer-events-none">
                <div className="absolute -top-6 right-4 w-24 h-24 bg-[#9b4dff]/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-4 w-20 h-16 bg-[#5600e3]/12 rounded-full blur-xl" />
            </div>

            {zoom > 1 && (
                <div className="absolute top-1 right-1.5 z-20 flex items-center gap-1 rounded-full bg-white/85 ring-1 ring-primary/10 px-1.5 py-0.5 text-[6.5px] font-bold text-primary pointer-events-none">
                    <span>{Math.round(zoom * 100)}%</span>
                    <span className="text-slate-400 font-medium">· dbl-click reset</span>
                </div>
            )}

            {activeIdx !== null && (
                <motion.div
                    key={`${period}-${activeIdx}`}
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="hero-chart-tooltip absolute z-30 pointer-events-none -translate-x-1/2"
                    style={{
                        left: `${(hovered.x / CHART_VIEW_W) * 100}%`,
                        top: `${Math.max(4, (hovered.y / CHART_VIEW_H) * 100 - 22)}%`,
                    }}
                >
                    <div className="rounded-lg bg-slate-900/92 text-white px-2 py-1 shadow-xl shadow-primary/20 ring-1 ring-white/10 backdrop-blur-md">
                        <p className="text-[7px] font-semibold text-violet-200 uppercase tracking-wide">{hovered.label}</p>
                        <p className="text-[10px] font-bold tabular-nums">{hovered.value}</p>
                    </div>
                </motion.div>
            )}

            <div className={`absolute inset-0 flex flex-col justify-between pointer-events-none px-2 ${tight ? 'py-1' : 'py-2'}`}>
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                ))}
            </div>

            <motion.div
                className="relative w-full h-full"
                animate={{ scale: zoom, x: panX }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{ transformOrigin: '50% 65%' }}
            >
            <svg
                viewBox={`0 0 ${CHART_VIEW_W} ${CHART_VIEW_H}`}
                className="relative w-full h-full overflow-visible"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <radialGradient id={meshId} cx="75%" cy="20%" r="65%">
                        <stop offset="0%" stopColor="#9b4dff" stopOpacity="0.14" />
                        <stop offset="55%" stopColor="#5600e3" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9b4dff" stopOpacity="0.45" />
                        <stop offset="35%" stopColor="#7c3aed" stopOpacity="0.22" />
                        <stop offset="70%" stopColor="#5600e3" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id={fillGlowId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#5600e3" stopOpacity="0" />
                        <stop offset="50%" stopColor="#9b4dff" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.25" />
                    </linearGradient>
                    <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4500b6" />
                        <stop offset="35%" stopColor="#5600e3" />
                        <stop offset="65%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#c4b5fd" />
                    </linearGradient>
                    <linearGradient id={lineShineId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="40%" stopColor="white" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id={scanGradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0" />
                        <stop offset="45%" stopColor="#9b4dff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#5600e3" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id={dotGradId} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="40%" stopColor="#c4b5fd" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </radialGradient>
                    <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feColorMatrix in="blur" type="matrix"
                            values="0 0 0 0 0.55  0 0 0 0 0.2  0 0 0 0 0.95  0 0 0 0.55 0" />
                    </filter>
                    <filter id={neonFilterId} x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="1.8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <rect width={CHART_VIEW_W} height={CHART_VIEW_H} fill={`url(#${meshId})`} rx="8" />

                {drawn && (
                    <motion.rect
                        x={0}
                        y={0}
                        width={18}
                        height={CHART_VIEW_H}
                        fill={`url(#${scanGradId})`}
                        opacity={0.45}
                        animate={{ x: [-18, CHART_VIEW_W] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
                    />
                )}

                <motion.path
                    key={`area-${period}`}
                    d={areaPath}
                    fill={`url(#${fillId})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: drawn ? 1 : 0 }}
                    transition={{ duration: 0.85, ease: EASE }}
                />
                <motion.path
                    key={`area-glow-${period}`}
                    d={areaPath}
                    fill={`url(#${fillGlowId})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: drawn ? 0.65 : 0 }}
                    transition={{ duration: 0.95, delay: 0.08, ease: EASE }}
                />

                <motion.path
                    key={`line-glow-${period}`}
                    d={linePath}
                    stroke="#9b4dff"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.2"
                    filter={`url(#${glowFilterId})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 0.2 : 0 }}
                    transition={{ duration: 1.35, ease: EASE }}
                />
                <motion.path
                    key={`line-${period}`}
                    d={linePath}
                    stroke={`url(#${lineId})`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter={`url(#${neonFilterId})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
                    transition={{ duration: 1.25, ease: EASE }}
                />
                <motion.path
                    key={`line-shine-${period}`}
                    d={linePath}
                    stroke={`url(#${lineShineId})`}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 0.85 : 0 }}
                    transition={{ duration: 1.3, delay: 0.08, ease: EASE }}
                />

                {series.points.map((pt, i) => {
                    const isActive = activeIdx === i;
                    const isLast = i === series.points.length - 1;
                    const r = isLast ? 5 : isActive ? 4.5 : 3.2;
                    return (
                        <g key={`${period}-${pt.label}`} data-chart-point>
                            {(isActive || isLast) && (
                                <circle cx={pt.x} cy={pt.y} r={isLast ? 12 : 9} fill="#9b4dff" fillOpacity={isLast ? 0.14 : 0.1}>
                                    {isLast && (
                                        <>
                                            <animate attributeName="r" values="10;13;10" dur="3s" repeatCount="indefinite" />
                                            <animate attributeName="fill-opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
                                        </>
                                    )}
                                </circle>
                            )}
                            <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={r + 6}
                                fill="transparent"
                                className="cursor-pointer"
                                onMouseEnter={() => setActiveIdx(i)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIdx(i);
                                    setZoom((z) => Math.min(2.15, z + 0.2));
                                }}
                            />
                            {(drawn && (isActive || isLast)) && (
                                <motion.circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r={r}
                                    fill={isLast ? `url(#${dotGradId})` : isActive ? '#7c3aed' : '#c4b5fd'}
                                    stroke="white"
                                    strokeWidth="2"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.9 + i * 0.04, duration: 0.4, ease: EASE }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>
            </motion.div>
        </div>
    );
}

function WorkflowNode({ x, y, delay, active, selected, size = 'md', dark, vivid, onSelect, onHover, onLeave }: {
    x: string; y: string; delay: number; active?: boolean; selected?: boolean;
    size?: 'xs' | 'sm' | 'md'; dark?: boolean; vivid?: boolean;
    onSelect?: () => void; onHover?: () => void; onLeave?: () => void;
}) {
    const dim = size === 'xs' ? 'w-5 h-5' : size === 'sm' ? 'w-6 h-6' : 'w-7 h-7';
    const isHighlighted = active || selected;

    const inactiveClass = dark
        ? vivid
            ? 'bg-white/[0.16] border border-[#c4b5fd]/55 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_10px_rgba(196,181,253,0.28)]'
            : 'bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
        : 'bg-white border-slate-200/90 shadow-sm';

    const inactiveDot = dark
        ? vivid
            ? 'w-2 h-2 rounded-full bg-[#ede9fe] shadow-[0_0_10px_rgba(233,213,255,0.95)] ring-1 ring-white/40'
            : 'w-1.5 h-1.5 rounded-full bg-[#c4b5fd]/80 shadow-[0_0_6px_rgba(196,181,253,0.5)]'
        : 'w-1.5 h-1.5 rounded-full bg-slate-300';

    const flashSize = size === 'xs' ? 10 : size === 'sm' ? 12 : 14;

    return (
        <motion.button
            type="button"
            aria-pressed={selected}
            onClick={onSelect}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="absolute cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c4b5fd]/60 rounded-lg"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: selected ? 1.08 : 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            transition={{ delay: 0.9 + delay, duration: 0.45, ease: EASE }}
        >
            <div className={`${dim} rounded-lg border flex items-center justify-center transition-shadow ${
                isHighlighted
                    ? 'bg-gradient-to-br from-[#5600e3] via-[#7c3aed] to-[#9b4dff] border-white/25 shadow-lg shadow-primary/50 ring-1 ring-white/20 hero-workflow-node--active'
                    : `${inactiveClass} hover:border-[#c4b5fd]/35 hover:bg-white/[0.12]`
            }`}>
                {isHighlighted ? <IconFlash size={flashSize} /> : <div className={inactiveDot} />}
            </div>
            {isHighlighted && (
                <>
                    <motion.div
                        className="absolute inset-0 rounded-lg border border-[#c4b5fd]/40 pointer-events-none"
                        animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <div className="absolute -inset-1 rounded-xl bg-primary/25 blur-md -z-10 pointer-events-none" />
                </>
            )}
        </motion.button>
    );
}

const WORKFLOW_NODES = [
    { id: 0, x: '2px', y: '18px', label: 'Lead in', detail: '24 leads/hr', description: 'Captures inbound leads from forms, ads & landing pages.' },
    { id: 1, x: '34px', y: '4px', label: 'AI Engine', detail: '98% accuracy', description: 'Scores and routes leads with AI in real time.' },
    { id: 2, x: '66px', y: '18px', label: 'Qualify', detail: 'High intent', description: 'Flags high-intent prospects for your sales team.' },
    { id: 3, x: '34px', y: '32px', label: 'CRM sync', detail: 'Real-time', description: 'Syncs qualified leads to your CRM instantly.' },
] as const;

const MOBILE_WORKFLOW_NODES = [
    { id: 0, x: '10px', y: '14px', label: 'Lead in', detail: '24 leads/hr', description: 'Captures inbound leads from forms, ads & landing pages.' },
    { id: 1, x: '38px', y: '0px', label: 'AI Engine', detail: '98% accuracy', description: 'Scores and routes leads with AI in real time.' },
    { id: 2, x: '66px', y: '14px', label: 'Qualify', detail: 'High intent', description: 'Flags high-intent prospects for your sales team.' },
    { id: 3, x: '38px', y: '26px', label: 'CRM sync', detail: 'Real-time', description: 'Syncs qualified leads to your CRM instantly.' },
] as const;

const MOBILE_WORKFLOW_LINES = [
    { x1: 20, y1: 24, x2: 48, y2: 10, delay: 1.1 },
    { x1: 48, y1: 10, x2: 76, y2: 24, delay: 1.25 },
    { x1: 48, y1: 10, x2: 48, y2: 36, delay: 1.4 },
] as const;

const MOBILE_WORKFLOW_PARTICLES = [
    { cx: [20, 48] as [number, number], cy: [24, 10] as [number, number], delay: 0 },
    { cx: [48, 76] as [number, number], cy: [10, 24] as [number, number], delay: 0.6 },
    { cx: [48, 48] as [number, number], cy: [10, 36] as [number, number], delay: 1.2 },
] as const;

function WorkflowDiagramLines({ flowUid, mobile }: { flowUid: string; mobile: boolean }) {
    const gradId = `workflow-line-grad-${flowUid}`;
    const glowId = `workflow-line-glow-${flowUid}`;

    if (mobile) {
        return (
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 96 44" preserveAspectRatio="xMidYMid meet" aria-hidden>
                <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.75" />
                        <stop offset="50%" stopColor="#f5f3ff" stopOpacity="1" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.75" />
                    </linearGradient>
                    <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="1.4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {MOBILE_WORKFLOW_LINES.map((line, i) => (
                    <g key={i}>
                        <motion.line
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="#c4b5fd"
                            strokeOpacity={0.28}
                            strokeWidth={3.5}
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: line.delay, duration: 0.7 }}
                        />
                        <motion.line
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke={`url(#${gradId})`}
                            strokeWidth={2.25}
                            strokeLinecap="round"
                            filter={`url(#${glowId})`}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: line.delay, duration: 0.7 }}
                        />
                    </g>
                ))}
                {MOBILE_WORKFLOW_PARTICLES.map((p, i) => (
                    <motion.circle
                        key={i}
                        r="2.25"
                        fill="#f5f3ff"
                        opacity={0.95}
                        animate={{ cx: p.cx, cy: p.cy }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: p.delay }}
                    />
                ))}
            </svg>
        );
    }

    return (
        <svg className="absolute inset-0 w-full h-full overflow-visible" aria-hidden>
            <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
                </linearGradient>
            </defs>
            <motion.line x1="14" y1="30" x2="48" y2="14" stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1, duration: 0.7 }} />
            <motion.line x1="48" y1="14" x2="82" y2="30" stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.25, duration: 0.7 }} />
            <motion.line x1="48" y1="14" x2="48" y2="44" stroke="#c4b5fd" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.6 }} />
            {[
                { cx: [14, 48], cy: [30, 14], delay: 0 },
                { cx: [48, 82], cy: [14, 30], delay: 0.6 },
                { cx: [48, 48], cy: [14, 44], delay: 1.2 },
            ].map((p, i) => (
                <motion.circle
                    key={i}
                    r="2"
                    fill="#e9d5ff"
                    opacity={0.85}
                    animate={{ cx: p.cx, cy: p.cy }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: p.delay }}
                />
            ))}
        </svg>
    );
}

function MetricCard({ label, value, delta, icon: Icon, index, compact, dense }: {
    label: string; value: string; delta: string;
    icon: (props: IconsaxIconProps) => ReactElement;
    index: number; compact?: boolean; dense?: boolean;
}) {
    const isLive = delta === 'Live';

    const accentBars = [
        'bg-gradient-to-b from-emerald-400 to-emerald-600/50',
        'bg-gradient-to-b from-slate-300 to-slate-400/40',
        'bg-gradient-to-b from-[#5600e3] to-[#9b4dff]',
    ];

    const iconTones = [
        'bg-emerald-500/10 text-emerald-600 ring-emerald-500/15',
        'bg-slate-500/8 text-slate-500 ring-slate-400/15',
        'bg-primary/10 text-primary ring-primary/15',
    ];

    const valueTones = [
        'text-slate-900',
        'text-slate-900',
        'bg-gradient-to-br from-[#5600e3] to-[#9b4dff] bg-clip-text text-transparent',
    ];

    const iconSize = compact ? 14 : dense ? 11 : 14;
    const iconBox = compact ? 'w-[18px] h-[18px]' : dense ? 'w-4 h-4' : 'w-[18px] h-[18px]';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + index * 0.07, ease: EASE }}
            className={`relative flex flex-col justify-between min-w-0 overflow-hidden ${
                dense
                    ? 'min-h-[54px] px-1.5 py-2'
                    : `min-h-[64px] sm:min-h-[70px] px-2.5 py-2.5 sm:px-3 sm:py-2.5`
            } ${index > 0 ? 'border-l border-white/40' : ''}`}
        >
            <div className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
            <div className={`absolute left-0 top-3 bottom-3 w-[2px] rounded-full opacity-80 ${accentBars[index]}`} />
            <div className={`flex items-center justify-between gap-0.5 pl-1.5 mb-auto ${dense ? 'pr-0.5' : 'pl-2 gap-1'}`}>
                <span className={`font-semibold uppercase text-slate-400 tracking-[0.06em] truncate ${
                    compact
                        ? 'text-[7.5px]'
                        : dense
                            ? 'text-[7.5px]'
                            : 'text-[8.5px] sm:text-[9px]'
                }`}>
                    {label}
                </span>
                {!dense && (
                    <div className={`shrink-0 ${iconBox} rounded-[5px] flex items-center justify-center ring-1 ${iconTones[index]}`}>
                        <Icon size={iconSize} />
                    </div>
                )}
            </div>
            <p className={`pl-1.5 mt-1 font-bold tabular-nums leading-none tracking-tight truncate ${
                compact ? 'text-sm' : dense ? 'text-base' : 'text-xl sm:text-2xl'
            } ${valueTones[index]}`}>
                {value}
            </p>
            <div className="pl-1.5 mt-1">
                <span className={`inline-flex items-center gap-0.5 font-bold rounded-full ${
                    dense ? 'text-[6.5px] px-1 py-px' : compact ? 'text-[7px] px-1.5 py-0.5' : 'text-[8px] sm:text-[8.5px] px-1.5 py-0.5'
                } ${
                    isLive
                        ? 'text-primary bg-primary/[0.07] ring-1 ring-primary/10'
                        : 'text-emerald-700 bg-emerald-50/80 ring-1 ring-emerald-100/80'
                }`}>
                    {isLive && (
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                        </span>
                    )}
                    {delta}
                </span>
            </div>
        </motion.div>
    );
}

function CrmStepper({ steps, compact, dense, mobile }: { steps: string[]; compact?: boolean; dense?: boolean; mobile?: boolean }) {
    const shortLabels = ['Captured', 'Qualified', 'Synced'];
    const [activeStep, setActiveStep] = useState(2);
    const premium = !compact;
    const useShortLabels = compact && !mobile;

    return (
        <div className={`hero-status-bar hero-gloss-sheen rounded-2xl border border-white/55 ${
            premium ? 'hero-status-bar--premium' : ''
        } ${compact && !mobile ? 'p-2' : mobile ? 'p-2.5' : dense ? 'p-2' : 'p-2.5 sm:p-3'}`}>
            <div className="relative">
                {premium && (
                    <>
                        <div className={`absolute h-px bg-slate-200/70 pointer-events-none ${
                            mobile || dense
                                ? 'top-[13px] left-[20%] right-[20%]'
                                : 'top-[15px] sm:top-[17px] left-[18%] right-[18%]'
                        }`} />
                        <motion.div
                            className={`absolute h-px hero-step-connector pointer-events-none ${
                                mobile || dense
                                    ? 'top-[13px] left-[20%]'
                                    : 'top-[15px] sm:top-[17px] left-[18%]'
                            }`}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '64%', opacity: 1 }}
                            transition={{ delay: 1.1, duration: 1.1, ease: EASE }}
                        />
                    </>
                )}
                <div className={`grid grid-cols-3 ${compact && !mobile ? 'gap-1' : mobile || dense ? 'gap-1' : 'gap-1.5'}`}>
                    {steps.map((step, i) => {
                        const isLast = i === 2;
                        const isActive = activeStep === i;
                        const nodeSize = compact && !mobile
                            ? 'w-6 h-6'
                            : mobile || dense
                                ? 'w-[26px] h-[26px]'
                                : 'w-7 h-7 sm:w-[30px] sm:h-[30px]';
                        const iconSize = compact && !mobile ? 12 : mobile || dense ? 12 : 14;
                        return (
                            <motion.button
                                type="button"
                                key={step}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ delay: 1.05 + i * 0.08, ease: EASE }}
                                onClick={() => setActiveStep(i)}
                                className={`relative flex flex-col items-center text-center rounded-xl px-0.5 cursor-pointer transition-shadow ${
                                    compact && !mobile ? 'py-1.5' : mobile || dense ? 'py-1.5' : 'py-2'
                                } ${
                                    isLast || isActive
                                        ? 'bg-gradient-to-b from-primary/[0.1] to-[#9b4dff]/[0.05] ring-1 ring-primary/15 shadow-sm shadow-primary/10'
                                        : 'hover:bg-white/50'
                                }`}
                            >
                                {isLast && premium && (
                                    <span className="absolute -top-1 right-1 flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                                    </span>
                                )}
                                <div className={`relative z-10 flex items-center justify-center rounded-full ring-[2.5px] ring-white shadow-sm transition-transform ${nodeSize} ${
                                    isLast
                                        ? 'bg-gradient-to-br from-[#5600e3] to-[#9b4dff] text-white shadow-md shadow-primary/30 hero-step-node--live'
                                        : 'bg-emerald-50 text-emerald-600 ring-emerald-100/50'
                                } ${isActive ? 'scale-105' : ''}`}>
                                    {isLast ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
                                        <IconRefresh size={iconSize} />
                                    </motion.div>
                                ) : (
                                    <IconTick size={iconSize} />
                                )}
                                </div>
                                <span className={`mt-1 font-medium leading-tight ${
                                    useShortLabels ? 'text-[6.5px]' : mobile ? 'text-[7px]' : dense ? 'text-[6.5px]' : 'text-[7.5px] sm:text-[8.5px]'
                                }`}>
                                    {useShortLabels ? (
                                        <span className="text-slate-600 font-semibold">{shortLabels[i]}</span>
                                    ) : (
                                        <>
                                            <span className="block text-slate-700 font-semibold">{step.split(' ')[0]}</span>
                                            <span className="block text-slate-400">{step.split(' ').slice(1).join(' ')}</span>
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function DashboardPanel({ dense = false, mobile = false }: { dense?: boolean; mobile?: boolean }) {
    const chartUid = useId();
    const [leadCount, setLeadCount] = useState(16);
    const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('30D');
    const chartMeta = CHART_SERIES[chartPeriod];
    const isTight = dense || mobile;

    useEffect(() => {
        const id = setInterval(() => setLeadCount((c) => (c >= 24 ? 14 : c + 1)), 2800);
        return () => clearInterval(id);
    }, []);

    const steps = ['Lead captured', 'AI qualified', 'CRM synced'];

    return (
        <div className={`hero-frame-violet rounded-[1.65rem] sm:rounded-[1.85rem] h-full ${mobile ? '' : 'min-h-0'}`}>
            <div className="relative flex flex-col h-full min-h-0 hero-dashboard-shell hero-gloss-sheen overflow-hidden rounded-[calc(1.65rem-1px)] sm:rounded-[calc(1.85rem-1px)]">
                <div className="hero-gloss-sweep" aria-hidden />
                <div className="absolute inset-0 hero-mesh-glow pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none z-[4]" />

                {/* Title bar */}
                <div className={`relative z-[5] shrink-0 flex items-center gap-2 border-b border-white/50 bg-gradient-to-b from-white/80 via-white/50 to-white/30 backdrop-blur-md ${
                    isTight ? 'px-3.5 py-2.5' : 'px-4 sm:px-5 py-3 sm:py-3.5'
                }`}>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-sm shadow-[#ff5f57]/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-sm shadow-[#febc2e]/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-sm shadow-[#28c840]/30" />
                    </div>
                    <div className="flex-1 flex justify-center min-w-0">
                        <div className="hero-frame-violet rounded-full max-w-full">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
                                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#5600e3] via-[#7c3aed] to-[#9b4dff] flex items-center justify-center shrink-0 shadow-lg shadow-primary/35 ring-1 ring-white/50">
                                    <IconBrain size={12} />
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 uppercase tracking-[0.12em] whitespace-nowrap">
                                    AI Growth OS
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`shrink-0 flex justify-end ${mobile ? 'w-auto' : 'w-[52px] hidden sm:flex'}`}>
                        <span className="hero-live-pill inline-flex items-center gap-1 text-[8px] font-semibold text-emerald-700 bg-emerald-50/90 px-2 py-0.5 rounded-full">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                            </span>
                            Live
                        </span>
                    </div>
                </div>

                <div className={`relative z-[5] flex flex-col flex-1 min-h-0 hero-dashboard-inner ${
                    mobile ? 'p-3 gap-2.5' : isTight ? 'p-3 gap-2.5' : 'p-4 sm:p-5 gap-3 lg:gap-3.5'
                }`}>
                    {/* Metrics tray — glossy glass strip */}
                    <div className="hero-metric-tray hero-gloss-sheen rounded-2xl border border-white/60 shrink-0 min-w-0">
                        <div className="grid grid-cols-3 min-w-0">
                            <MetricCard label="Leads" value={`${leadCount}`} delta="+24%" icon={IconUsers} index={0} dense={isTight} />
                            <MetricCard label="Conv." value="68%" delta="+12%" icon={IconTrendUp} index={1} dense={isTight} />
                            <MetricCard label="ROI" value="4.2x" delta="Live" icon={IconSparkle} index={2} dense={isTight} />
                        </div>
                    </div>

                    {/* Chart — glossy glass panel */}
                    <div className={`relative min-w-0 hero-frame-violet rounded-2xl ${
                        mobile ? 'shrink-0' : 'flex flex-1 min-h-0 flex-col'
                    }`}>
                        <div className={`hero-chart-panel hero-gloss-sheen relative rounded-[calc(1rem-1px)] border border-white/70 ${
                            mobile ? '' : 'flex flex-1 min-h-0 flex-col'
                        } ${isTight ? 'p-2.5' : 'p-3 sm:p-3.5'}`}>
                            <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#9b4dff]/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#5600e3]/[0.04] to-transparent pointer-events-none" />
                            <div className={`relative shrink-0 flex items-center justify-between gap-2 ${isTight ? 'mb-1.5' : 'mb-3'}`}>
                                <div className="min-w-0">
                                    <p className={`font-bold text-slate-800 uppercase tracking-[0.08em] ${
                                        isTight ? 'text-[8.5px]' : 'text-[9px] sm:text-[10px]'
                                    }`}>
                                        Pipeline Growth
                                    </p>
                                    <p className={`text-slate-400 mt-0.5 ${mobile ? 'block' : 'hidden sm:block'} ${isTight ? 'text-[7px]' : 'text-[8px]'}`}>
                                        {chartMeta.subtitle}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <div className={`${mobile ? 'flex' : 'hidden sm:flex'} items-center rounded-lg bg-white/70 ring-1 ring-slate-200/60 shadow-sm ${
                                        isTight ? 'p-px' : 'p-0.5'
                                    }`} role="tablist" aria-label="Chart period">
                                        {(['7D', '30D', '90D'] as ChartPeriod[]).map((period) => (
                                            <button
                                                key={period}
                                                type="button"
                                                role="tab"
                                                aria-selected={chartPeriod === period}
                                                onClick={() => setChartPeriod(period)}
                                                className={`font-bold rounded-md transition-all cursor-pointer ${
                                                    isTight ? 'text-[6.5px] px-1.5 py-px' : 'text-[7.5px] px-2 py-0.5'
                                                } ${
                                                    chartPeriod === period
                                                        ? 'bg-gradient-to-r from-[#5600e3] to-[#7c3aed] text-white shadow-sm scale-105'
                                                        : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                            >
                                                {period}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <motion.span
                                            key={chartPeriod}
                                            initial={{ opacity: 0, scale: 0.92 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.35, ease: EASE }}
                                            className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9b4dff] tabular-nums leading-none ${
                                                isTight ? 'text-[11px]' : 'text-xs sm:text-sm'
                                            }`}
                                        >
                                            {chartMeta.growth}
                                        </motion.span>
                                    </div>
                                </div>
                            </div>
                            <div className={`relative overflow-visible ${mobile ? '' : 'flex-1 min-h-0'}`}>
                                <InteractivePipelineChart
                                    uid={chartUid}
                                    tight={isTight}
                                    period={chartPeriod}
                                    fillHeight={!mobile}
                                    className={
                                        mobile ? 'h-[100px]' : 'h-full min-h-[132px] lg:min-h-[148px] xl:min-h-[164px]'
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* CRM stepper */}
                    <div className={`shrink-0 ${mobile ? 'mt-auto' : ''}`}>
                        <div className={`flex items-center justify-between ${isTight ? 'mb-1.5' : 'mb-2'}`}>
                            <p className={`font-semibold text-slate-400 uppercase tracking-[0.12em] ${
                                isTight ? 'text-[7.5px]' : 'text-[8px] sm:text-[8.5px]'
                            }`}>
                                Automation status
                            </p>
                            <span className={`inline-flex items-center gap-1 text-slate-400 font-medium ${
                                isTight ? 'text-[7px]' : 'text-[8px]'
                            }`}>
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                </span>
                                3/3 active
                            </span>
                        </div>
                        <CrmStepper steps={steps} mobile={mobile} dense={dense && !mobile} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const MOBILE_FLOAT_W = 'w-[158px]';
const MOBILE_COMPACT_H = 'h-[100px]';
const MOBILE_WORKFLOW_H = 100;
const MOBILE_WORKFLOW_H_EXPANDED = 192;

function MobileFloatShell({
    frame,
    innerClass,
    children,
    shellClassName,
    compact = false,
}: {
    frame: 'emerald' | 'aurora' | 'violet';
    innerClass?: string;
    children: ReactNode;
    shellClassName?: string;
    compact?: boolean;
}) {
    const frameClass =
        frame === 'emerald' ? 'hero-frame-emerald' : frame === 'aurora' ? 'hero-frame-aurora' : 'hero-frame-violet';

    return (
        <div className={`${frameClass} rounded-[1.15rem] h-full ${shellClassName ?? MOBILE_COMPACT_H}`}>
            <div
                className={`hero-float-card hero-mobile-float-card hero-gloss-sheen relative flex flex-col h-full rounded-[calc(1.15rem-1px)] overflow-hidden ${
                    compact ? 'p-2.5' : 'p-3'
                } ${innerClass ?? ''}`}
            >
                <div className="hero-gloss-sweep pointer-events-none" aria-hidden />
                <div className="absolute inset-x-2.5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
                {children}
            </div>
        </div>
    );
}
function FloatLeadCard({ mobile = false }: { mobile?: boolean }) {
    const inner = (
        <div className="relative flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
                <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-[0.75rem] rounded-tr-sm bg-gradient-to-br from-emerald-400/20 via-emerald-50 to-white border border-emerald-200/50 flex items-center justify-center shadow-inner">
                        <Profile2User size={15} color="#10b981" variant="Bulk" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm shadow-emerald-500/40" />
                </div>
                <div className="min-w-0">
                    <p className="text-[10.5px] font-bold text-slate-900 leading-tight">New Lead</p>
                    <p className="text-[8.5px] text-slate-400 leading-tight">AI Qualified</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-emerald-700 bg-gradient-to-r from-emerald-50 to-emerald-100/60 px-2 py-0.5 rounded-full border border-emerald-200/40">High intent</span>
                <ArrowRight size={13} color="rgba(16,185,129,0.7)" variant="Bulk" />
            </div>
        </div>
    );

    const desktopInner = (
        <>
            <div className="flex items-center gap-2.5 mb-2.5">
                <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-[0.85rem] rounded-tr-sm bg-gradient-to-br from-emerald-400/20 via-emerald-50 to-white border border-emerald-200/50 flex items-center justify-center shadow-inner">
                        <Profile2User size={16} color="#10b981" variant="Bulk" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm shadow-emerald-500/40" />
                </div>
                <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">New Lead</p>
                    <p className="text-[9px] text-slate-400">AI Qualified</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold text-emerald-700 bg-gradient-to-r from-emerald-50 to-emerald-100/60 px-2.5 py-0.5 rounded-full border border-emerald-200/40">High intent</span>
                <ArrowRight size={14} color="rgba(16,185,129,0.7)" variant="Bulk" />
            </div>
        </>
    );

    if (mobile) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.65, ease: EASE }}
                className={`w-full h-full ${MOBILE_COMPACT_H}`}
            >
                <MobileFloatShell
                    frame="emerald"
                    compact
                    innerClass="bg-gradient-to-br from-white via-white to-emerald-50/40 backdrop-blur-xl"
                >
                    <div className="absolute left-0 top-2.5 bottom-2.5 w-[2px] rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600/40 pointer-events-none" />
                    {inner}
                </MobileFloatShell>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, y: -8 }}
            animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
            transition={{
                opacity: { delay: 0.85, duration: 0.65, ease: EASE },
                x: { delay: 0.85, duration: 0.65, ease: EASE },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
            }}
            className="w-[152px] shrink-0"
        >
            <div className="hero-frame-emerald rounded-[1.35rem] rounded-tr-lg">
                <div className="hero-float-card hero-notify-tail relative group rounded-[calc(1.35rem-1px)] rounded-tr-[calc(0.75rem-1px)] bg-gradient-to-br from-white via-white to-emerald-50/40 backdrop-blur-xl p-4 overflow-visible">
                    <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                    <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600/40" />
                    {desktopInner}
                </div>
            </div>
        </motion.div>
    );
}

function FloatWorkflowCard({ mobile = false }: { mobile?: boolean }) {
    const flowUid = useId();
    const [activeNode, setActiveNode] = useState(1);
    const [hoverNode, setHoverNode] = useState<number | null>(null);
    const [tappedNode, setTappedNode] = useState<number | null>(null);
    const displayNode = WORKFLOW_NODES[hoverNode ?? activeNode];
    const mobileDisplayNode = tappedNode !== null ? WORKFLOW_NODES[tappedNode] : null;

    useEffect(() => {
        if (hoverNode !== null || (mobile && tappedNode !== null)) return;
        const id = setInterval(() => {
            setActiveNode((n) => (n + 1) % WORKFLOW_NODES.length);
        }, 3200);
        return () => clearInterval(id);
    }, [hoverNode, mobile, tappedNode]);

    const handleNodeSelect = (id: number) => {
        setActiveNode(id);
        if (mobile) {
            setTappedNode((prev) => (prev === id ? null : id));
        }
    };

    const isWorkflowExpanded = mobile && tappedNode !== null;
    const workflowNodes = mobile ? MOBILE_WORKFLOW_NODES : WORKFLOW_NODES;
    const diagramHeight = mobile ? (isWorkflowExpanded ? 'h-[48px]' : 'h-[44px]') : 'h-[52px]';
    const headerMb = mobile ? 'mb-1' : 'mb-2.5';
    const nodeSize = mobile ? 'xs' : 'sm';

    const workflowInner = (
        <>
            <div className="absolute inset-0 hero-workflow-mesh opacity-70 pointer-events-none" />
            <div className={`absolute left-0 ${mobile ? 'top-2.5 bottom-2.5' : 'top-4 bottom-4'} w-[2px] rounded-full bg-gradient-to-b from-[#9b4dff]/60 via-[#5600e3]/40 to-transparent pointer-events-none`} />

            <div className={`relative flex items-center justify-between gap-2 ${headerMb}`}>
                <p className="text-[8px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e9d5ff] to-[#a78bfa] uppercase tracking-[0.14em]">
                    AI Workflow
                </p>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-[6.5px] font-bold text-emerald-300 uppercase tracking-wide">
                    <span className="relative flex h-1 w-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                        <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    </span>
                    Live
                </span>
            </div>

            <div className={`relative ${diagramHeight} shrink-0 overflow-visible flex justify-center items-center`}>
                <div
                    className={`relative h-full ${
                        mobile
                            ? `w-[96px] ${!isWorkflowExpanded ? 'hero-workflow-diagram--compact hero-workflow-diagram--centered' : ''}`
                            : 'w-full'
                    }`}
                >
                    <WorkflowDiagramLines flowUid={flowUid} mobile={mobile} />
                    {workflowNodes.map((node, i) => (
                        <WorkflowNode
                            key={node.id}
                            x={node.x}
                            y={node.y}
                            delay={i * 0.12}
                            active={!mobile && node.id === 1}
                            selected={activeNode === node.id}
                            size={nodeSize}
                            dark
                            vivid={mobile}
                            onSelect={() => handleNodeSelect(node.id)}
                            onHover={mobile ? undefined : () => setHoverNode(node.id)}
                            onLeave={mobile ? undefined : () => setHoverNode(null)}
                        />
                    ))}
                </div>
            </div>

            {mobile ? (
                <AnimatePresence initial={false}>
                    {mobileDisplayNode && (
                        <motion.div
                            key={mobileDisplayNode.id}
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            className="relative overflow-hidden"
                        >
                            <div className="hero-workflow-tip rounded-xl ring-1 ring-white/15 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#5600e3]/25 via-[#7c3aed]/15 to-transparent pointer-events-none" />
                                <div className="relative px-2.5 py-2">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <div className="flex items-center gap-1 min-w-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                                            <p className="text-[7.5px] font-bold text-white uppercase tracking-wider truncate">
                                                {mobileDisplayNode.label}
                                            </p>
                                        </div>
                                        <span className="shrink-0 text-[6.5px] font-bold text-[#e9d5ff] bg-white/10 px-1.5 py-0.5 rounded-full border border-white/10 tabular-nums">
                                            {mobileDisplayNode.detail}
                                        </span>
                                    </div>
                                    <p className="text-[7px] text-white/85 leading-snug">{mobileDisplayNode.description}</p>
                                    <p className="mt-1.5 text-[6px] text-[#c4b5fd]/55 text-center tracking-wide">Tap node again to close</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            ) : (
                <motion.div
                    key={displayNode.id}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mt-2 rounded-lg bg-white/[0.06] border border-white/[0.08] px-2 py-1 text-center"
                >
                    <p className="text-[7px] font-bold text-[#e9d5ff] uppercase tracking-wide">{displayNode.label}</p>
                    <p className="text-[7.5px] font-semibold text-white/80">{displayNode.detail}</p>
                </motion.div>
            )}

            <div className={`relative shrink-0 flex items-center justify-between ${
                mobile
                    ? isWorkflowExpanded
                        ? 'mt-1.5 pt-1.5 border-t border-white/[0.08]'
                        : 'mt-2 pt-0.5'
                    : 'mt-auto pt-2 border-t border-white/[0.08]'
            }`}>
                <span className="text-[7px] font-medium text-[#c4b5fd]/80">
                    <motion.span
                        animate={{ opacity: [0.65, 1, 0.65] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                    >
                        3 nodes active
                    </motion.span>
                </span>
                <span className="text-[7px] font-bold text-white/90">Automated</span>
            </div>
        </>
    );

    if (mobile) {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    height: isWorkflowExpanded ? MOBILE_WORKFLOW_H_EXPANDED : MOBILE_WORKFLOW_H,
                }}
                transition={{
                    opacity: { delay: 0.48, duration: 0.65, ease: EASE },
                    height: { type: 'spring', stiffness: 420, damping: 34 },
                }}
                className="w-full shrink-0 overflow-hidden"
            >
                <MobileFloatShell
                    frame="aurora"
                    compact
                    innerClass={`hero-workflow-card hero-workflow-card--interactive h-full ${
                        isWorkflowExpanded ? 'hero-workflow-card--expanded' : ''
                    }`}
                    shellClassName="h-full"
                >
                    <div className="relative flex flex-col h-full min-h-0">{workflowInner}</div>
                </MobileFloatShell>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
            whileHover={{ scale: 1.02 }}
            transition={{
                opacity: { delay: 0.95, duration: 0.65, ease: EASE },
                x: { delay: 0.95, duration: 0.65, ease: EASE },
                y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 },
            }}
            className="w-[142px] shrink-0"
        >
            <div className="hero-frame-aurora rounded-[1.35rem] rounded-bl-[2.25rem]">
                <div className="hero-float-card hero-workflow-card hero-workflow-card--interactive hero-gloss-sheen relative rounded-[calc(1.35rem-1.5px)] rounded-bl-[calc(2.25rem-1.5px)] p-3.5 overflow-hidden">
                    <div className="hero-gloss-sweep" aria-hidden />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    {workflowInner}
                </div>
            </div>
        </motion.div>
    );
}

function FloatGrowthCard({ mobile = false }: { mobile?: boolean }) {
    const growthMobile = (
        <div className="relative flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[0.75rem] bg-gradient-to-br from-[#5600e3] via-[#7c3aed] to-[#9b4dff] flex items-center justify-center shrink-0 shadow-lg shadow-primary/35 ring-2 ring-white/80">
                    <TrendUp size={15} color="#ffffff" variant="Bulk" />
                </div>
                <div className="min-w-0">
                    <p className="text-[10.5px] font-bold text-slate-900 leading-tight">Growth</p>
                    <p className="text-[8.5px] text-slate-400 leading-tight">Pipeline</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-base font-bold bg-gradient-to-r from-slate-900 to-primary bg-clip-text text-transparent leading-none tracking-tight">+68%</p>
                <span className="text-[8.5px] font-bold text-primary bg-primary/[0.08] px-1.5 py-0.5 rounded-full border border-primary/15">+12%</span>
            </div>
        </div>
    );

    if (mobile) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56, duration: 0.65, ease: EASE }}
                className={`w-full h-full ${MOBILE_COMPACT_H}`}
            >
                <MobileFloatShell
                    frame="violet"
                    compact
                    innerClass="bg-gradient-to-br from-white via-white to-primary/[0.04] backdrop-blur-xl"
                >
                    <div className="absolute left-0 top-2.5 bottom-2.5 w-[2px] rounded-full bg-gradient-to-b from-[#9b4dff]/50 via-[#5600e3]/30 to-transparent pointer-events-none" />
                    {growthMobile}
                </MobileFloatShell>
            </motion.div>
        );
    }

    const pill = (
        <div className="hero-frame-aurora rounded-full w-full">
            <div className="relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-white via-white to-primary/[0.04] backdrop-blur-xl px-3.5 py-2.5 w-full hero-float-card overflow-hidden">
                <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5600e3] via-[#7c3aed] to-[#9b4dff] flex items-center justify-center shrink-0 shadow-lg shadow-primary/35 ring-2 ring-white/80">
                    <TrendUp size={16} color="#ffffff" variant="Bulk" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide leading-none whitespace-nowrap">Growth</p>
                    <p className="text-base font-bold bg-gradient-to-r from-slate-900 to-primary bg-clip-text text-transparent leading-tight tracking-tight whitespace-nowrap">+68%</p>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.65, ease: EASE }}
            className="w-[152px] shrink-0"
        >
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
                {pill}
            </motion.div>
        </motion.div>
    );
}

export function HeroVisual() {
    return (
        <>
            {/* Mobile — AI app widget shell */}
            <div className="lg:hidden w-full">
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                    className="hero-mobile-device rounded-[1.75rem] p-2.5 sm:p-3"
                >
                    <div className="flex items-center justify-center gap-1.5 mb-2.5">
                        <div className="h-1 w-10 rounded-full bg-slate-300/50" />
                    </div>
                    <DashboardPanel mobile dense />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
                    className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1 -mx-1 px-1 items-start"
                >
                    <div className={`snap-center shrink-0 ${MOBILE_FLOAT_W} ${MOBILE_COMPACT_H}`}>
                        <FloatLeadCard mobile />
                    </div>
                    <div className={`snap-center shrink-0 ${MOBILE_FLOAT_W}`}>
                        <FloatWorkflowCard mobile />
                    </div>
                    <div className={`snap-center shrink-0 ${MOBILE_FLOAT_W} ${MOBILE_COMPACT_H}`}>
                        <FloatGrowthCard mobile />
                    </div>
                </motion.div>
            </div>

            {/* Desktop — grid layout: floats in side columns, dashboard center (no overlap) */}
            <div className="hidden lg:block relative w-full max-w-full h-[min(660px,60dvh)] min-h-[480px] xl:min-h-[520px] xl:h-[min(700px,64dvh)]">
                <div className="absolute inset-[1%] bg-gradient-to-br from-primary/10 via-[#9b4dff]/5 to-transparent rounded-[2.75rem] blur-3xl pointer-events-none" />
                <div className="absolute inset-[6%] rounded-[2rem] border border-primary/[0.07] pointer-events-none" />

                <div className="relative grid h-full w-full grid-cols-[148px_minmax(0,1fr)_130px] xl:grid-cols-[156px_minmax(0,1fr)_136px] grid-rows-[auto_1fr_auto] gap-x-4 xl:gap-x-5 items-stretch">
                    {/* Center: main dashboard — capped width + offset so it doesn't crowd AI Workflow */}
                    <motion.div
                        initial={{ opacity: 0, y: 28, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                        className="col-start-2 row-start-1 row-span-3 min-h-0 min-w-0 py-1 pl-1 xl:pl-2"
                    >
                        <div className="h-full w-full max-w-[min(100%,548px)] ml-0.5 xl:ml-1 mr-auto">
                            <DashboardPanel dense />
                        </div>
                    </motion.div>

                    {/* Top-right: lead notification */}
                    <div className="col-start-3 row-start-1 self-start pt-1 z-20">
                        <FloatLeadCard />
                    </div>

                    {/* Left: workflow — nudged right for clearer separation from dashboard */}
                    <div className="col-start-1 row-start-2 self-end pb-6 z-20 ml-4 xl:ml-6">
                        <FloatWorkflowCard />
                    </div>

                    {/* Bottom-right: growth pill — aligned with New Lead card */}
                    <div className="col-start-3 row-start-3 self-end pb-2 z-20">
                        <FloatGrowthCard />
                    </div>
                </div>
            </div>
        </>
    );
}
