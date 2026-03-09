import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PIN_POSITIONS = [
    { x: 18, y: 20 },   // top-left
    { x: 78, y: 18 },   // top-right
    { x: 80, y: 75 },   // bottom-right
    { x: 15, y: 78 },   // bottom-left
];

const SCAN_PATH = [
    { x: 50, y: 50 },   // center
    { x: 18, y: 20 },   // top-left
    { x: 78, y: 18 },   // top-right
    { x: 80, y: 75 },   // bottom-right
    { x: 15, y: 78 },   // bottom-left
];

// Timings (ms)
const INITIAL_DELAY = 400;
const MOVE_INTERVAL = 2200;
const PIN_DROP_AFTER_ARRIVE = 1400;
const PAUSE_AT_END = 1800;

const LocationPin = ({ x, y, index }: { x: number; y: number; index: number }) => (
    <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%` }}
        initial={{ opacity: 0, scale: 0, y: 8, x: '-50%' }}
        animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, scale: 0, y: 4, x: '-50%' }}
        transition={{
            type: 'spring',
            stiffness: 400,
            damping: 14,
            mass: 0.8,
        }}
    >
        {/* Pin glow */}
        <motion.div
            className="absolute -inset-2 rounded-full bg-primary/10 blur-sm"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
        />
        <svg width="32" height="40" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '-40px' }}>
            <path d="M11 0C4.925 0 0 4.925 0 11c0 8.25 11 17 11 17s11-8.75 11-17c0-6.075-4.925-11-11-11z" fill="#5600e3" />
            <circle cx="11" cy="11" r="4.5" fill="white" />
        </svg>
    </motion.div>
);

const Reticle = ({ x, y }: { x: number; y: number }) => (
    <motion.div
        className="absolute z-30 pointer-events-none"
        style={{ width: 140, height: 140 }}
        animate={{
            left: `${x}%`,
            top: `${y}%`,
            x: '-50%',
            y: '-50%',
        }}
        transition={{
            duration: 1.6,
            type: 'spring',
            stiffness: 40,
            damping: 12,
            mass: 1.5,
        }}
    >
        {/* Rotating reticle */}
        <motion.svg
            width="140"
            height="140"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        >
            {/* Outer ring */}
            <circle cx="24" cy="24" r="16" stroke="#5600e3" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3" />
            {/* Inner ring */}
            <circle cx="24" cy="24" r="9" stroke="#5600e3" strokeWidth="1.5" strokeOpacity="0.5" />
            {/* Crosshairs */}
            <line x1="24" y1="2" x2="24" y2="11" stroke="#5600e3" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="24" y1="37" x2="24" y2="46" stroke="#5600e3" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="2" y1="24" x2="11" y2="24" stroke="#5600e3" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="37" y1="24" x2="46" y2="24" stroke="#5600e3" strokeWidth="1.5" strokeOpacity="0.6" />
        </motion.svg>

        {/* Non-rotating center dot with pulse */}
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#5600e3]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
        />
    </motion.div>
);

const RadarPulse = ({ x, y }: { x: number; y: number }) => (
    <>
        <motion.div
            className="absolute rounded-full border border-[#5600e3]/15 pointer-events-none z-20"
            style={{
                width: 70,
                height: 70,
                left: `${x}%`,
                top: `${y}%`,
            }}
            animate={{
                scale: [0.5, 2.8],
                opacity: [0.4, 0],
                x: '-50%',
                y: '-50%',
                left: `${x}%`,
                top: `${y}%`,
            }}
            transition={{
                scale: { repeat: Infinity, duration: 1.8, ease: 'easeOut' },
                opacity: { repeat: Infinity, duration: 1.8, ease: 'easeOut' },
                left: { duration: 0.8, type: 'spring', stiffness: 90, damping: 14 },
                top: { duration: 0.8, type: 'spring', stiffness: 90, damping: 14 },
            }}
        />
        <motion.div
            className="absolute rounded-full border border-[#5600e3]/10 pointer-events-none z-20"
            style={{
                width: 70,
                height: 70,
                left: `${x}%`,
                top: `${y}%`,
            }}
            animate={{
                scale: [0.5, 2.8],
                opacity: [0.3, 0],
                x: '-50%',
                y: '-50%',
                left: `${x}%`,
                top: `${y}%`,
            }}
            transition={{
                scale: { repeat: Infinity, duration: 1.8, ease: 'easeOut', delay: 0.6 },
                opacity: { repeat: Infinity, duration: 1.8, ease: 'easeOut', delay: 0.6 },
                left: { duration: 0.8, type: 'spring', stiffness: 90, damping: 14 },
                top: { duration: 0.8, type: 'spring', stiffness: 90, damping: 14 },
            }}
        />
    </>
);

const HOVER_ICONS = [
    {
        label: 'Analytics',
        x: '-14%', y: '2%',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5600e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="12" width="4" height="9" rx="1" />
                <rect x="10" y="7" width="4" height="14" rx="1" />
                <rect x="17" y="3" width="4" height="18" rx="1" />
            </svg>
        ),
    },
    {
        label: 'Reporting',
        x: '94%', y: '-2%',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5600e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
            </svg>
        ),
    },
    {
        label: 'Growth',
        x: '-12%', y: '68%',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5600e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
    },
    {
        label: 'Automation',
        x: '92%', y: '66%',
        icon: (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5600e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        ),
    },
];

const FloatingIcon = ({ icon, x, y, delay, label }: { icon: React.ReactNode; x: string; y: string; delay: number; label: string }) => (
    <motion.div
        className="absolute z-40 flex flex-col items-center gap-1"
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: 14 }}
        transition={{ delay: delay * 0.5, duration: 0.3, type: 'spring', stiffness: 500, damping: 20 }}
    >
        <motion.div
            className="w-20 h-20 bg-[#ecedf1] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: delay + 0.3, ease: 'easeInOut' }}
        >
            {icon}
        </motion.div>
        <span className="text-[11px] font-medium text-slate-400 hidden sm:block">{label}</span>
    </motion.div>
);

// CRM-style dataset rows: y position (%) and bar width (%)
const DATASET_ROWS = [
    { y: 10, width: 60 },
    { y: 16, width: 88 },
    { y: 22, width: 42 },
    { y: 28, width: 75 },
    { y: 36, width: 52 },
    { y: 42, width: 85 },
    { y: 50, width: 38 },
    { y: 58, width: 72 },
    { y: 64, width: 48 },
    { y: 72, width: 82 },
    { y: 78, width: 58 },
    { y: 85, width: 44 },
];

// Which rows highlight for each scan step
const STEP_HIGHLIGHT_ROWS: Record<number, number[]> = {
    1: [1, 2],
    2: [3, 4],
    3: [8, 9],
    4: [10, 11],
};

const ROW_HIGHLIGHT_DELAY = 800;
const ROW_HIGHLIGHT_DURATION = 600;

const DatasetRow = ({ y, width, highlighted }: { y: number; width: number; highlighted: boolean }) => (
    <div
        className="absolute flex items-center gap-2.5 pointer-events-none"
        style={{ top: `${y}%`, left: '8%', right: '8%' }}
    >
        <div
            className="absolute -inset-y-1.5 -inset-x-2 rounded-md transition-opacity duration-200"
            style={{
                background: 'linear-gradient(90deg, rgba(86,0,227,0.08), rgba(86,0,227,0.03), transparent)',
                opacity: highlighted ? 1 : 0,
            }}
        />
        <div
            className="w-[6px] h-[6px] rounded-full flex-shrink-0 relative z-10 transition-all duration-200"
            style={{
                backgroundColor: highlighted ? '#5600e3' : '#c4c5cc',
                transform: highlighted ? 'scale(1.4)' : 'scale(1)',
            }}
        />
        <div
            className="h-[3px] rounded-full relative z-10 transition-all duration-200"
            style={{
                width: `${width}%`,
                backgroundColor: highlighted ? '#7c3aed' : '#d0d1d6',
                opacity: highlighted ? 0.6 : 0.35,
            }}
        />
    </div>
);

export const MarketingAuditScanner = () => {
    const [step, setStep] = useState(0);
    const [visiblePins, setVisiblePins] = useState<number[]>([]);
    const [highlightedRows, setHighlightedRows] = useState<number[]>([]);
    const [isHovered, setIsHovered] = useState(false);

    const runCycle = useCallback(() => {
        setStep(0);
        setVisiblePins([]);
        setHighlightedRows([]);

        const timers: ReturnType<typeof setTimeout>[] = [];
        let elapsed = INITIAL_DELAY;

        for (let i = 1; i <= 4; i++) {
            const moveAt = elapsed;
            const highlightAt = elapsed + ROW_HIGHLIGHT_DELAY;
            const unhighlightAt = highlightAt + ROW_HIGHLIGHT_DURATION;
            const pinAt = elapsed + PIN_DROP_AFTER_ARRIVE;

            timers.push(
                setTimeout(() => setStep(i), moveAt),
                setTimeout(() => setHighlightedRows(STEP_HIGHLIGHT_ROWS[i] || []), highlightAt),
                setTimeout(() => setHighlightedRows([]), unhighlightAt),
                setTimeout(() => setVisiblePins(prev => [...prev, i - 1]), pinAt),
            );

            elapsed += MOVE_INTERVAL;
        }

        // Schedule next cycle
        const cycleLength = elapsed + PAUSE_AT_END;
        const cycleTimer = setTimeout(() => runCycle(), cycleLength);
        timers.push(cycleTimer);

        return timers;
    }, []);

    useEffect(() => {
        const timers = runCycle();
        return () => timers.forEach(clearTimeout);
    }, [runCycle]);

    const reticlePos = SCAN_PATH[step] ?? SCAN_PATH[4];

    return (
        <div
            className="w-full h-full relative"
            style={{ perspective: '800px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Hover floating icons */}
            <AnimatePresence>
                {isHovered && HOVER_ICONS.map((item, i) => (
                    <FloatingIcon
                        key={item.label}
                        icon={item.icon}
                        x={item.x}
                        y={item.y}
                        delay={i * 0.08}
                        label={item.label}
                    />
                ))}
            </AnimatePresence>

            {/* Main card with 3D tilt on hover */}
            <motion.div
                className="w-full h-full bg-[#ecedf1] rounded-3xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] relative overflow-hidden"
                animate={{
                    rotateX: isHovered ? 10 : 0,
                    rotateY: isHovered ? -6 : 0,
                    scale: isHovered ? 0.72 : 1,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Dataset rows */}
                {DATASET_ROWS.map((row, i) => (
                    <DatasetRow
                        key={i}
                        y={row.y}
                        width={row.width}
                        highlighted={highlightedRows.includes(i)}
                    />
                ))}

                {/* Radar pulse rings that follow reticle */}
                <RadarPulse x={reticlePos.x} y={reticlePos.y} />

                {/* Reticle */}
                <Reticle x={reticlePos.x} y={reticlePos.y} />

                {/* Location pins */}
                <AnimatePresence>
                    {visiblePins.map((pinIndex) => (
                        <LocationPin
                            key={`pin-${pinIndex}`}
                            x={PIN_POSITIONS[pinIndex].x}
                            y={PIN_POSITIONS[pinIndex].y}
                            index={pinIndex}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
