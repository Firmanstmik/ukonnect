import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { EASE_OUT } from './motion';

type FormatOptions = {
    prefix?: string;
    suffix?: string;
    decimals?: number;
    /** Custom formatter for the running value; overrides prefix/suffix/decimals. */
    format?: (value: number) => string;
};

type AnimatedCounterProps = FormatOptions & {
    to: number;
    from?: number;
    duration?: number;
    className?: string;
};

function formatValue(value: number, { prefix = '', suffix = '', decimals = 0, format }: FormatOptions): string {
    if (format) return format(value);
    return `${prefix}${value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })}${suffix}`;
}

export function AnimatedCounter({
    to,
    from = 0,
    suffix = '',
    prefix = '',
    decimals = 0,
    duration = 2,
    className = '',
    format,
}: AnimatedCounterProps) {
    const wrapRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(wrapRef, { once: true, margin: '-80px' });
    const reduceMotion = useReducedMotion();
    const [done, setDone] = useState(false);

    // The count lives in a MotionValue and is rendered through a motion.span, so
    // each frame writes straight to the DOM — no React state, no per-frame re-render.
    const count = useMotionValue(from);
    const text = useTransform(count, (value) => formatValue(value, { prefix, suffix, decimals, format }));

    useEffect(() => {
        if (!inView) return;
        if (reduceMotion) {
            // Snap to the final value; the completion bounce is skipped under reduced motion.
            count.set(to);
            return;
        }
        const controls = animate(count, to, {
            duration,
            ease: EASE_OUT,
            onComplete: () => setDone(true),
        });
        return () => controls.stop();
    }, [inView, to, duration, reduceMotion, count]);

    return (
        <motion.span
            ref={wrapRef}
            className={className}
            animate={done && !reduceMotion ? { scale: [1, 1.04, 1] } : undefined}
            transition={{ duration: 0.35 }}
        >
            <motion.span className="tabular-nums">{text}</motion.span>
        </motion.span>
    );
}
