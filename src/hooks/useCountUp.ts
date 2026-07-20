import { useEffect, useState } from 'react';

type ParsedStat = {
    prefix: string;
    target: number;
    suffix: string;
    decimals: number;
};

function parseStat(value: string): ParsedStat {
    const match = value.match(/^([€$]?)([\d.]+)(.*)$/);
    if (!match) return { prefix: '', target: 0, suffix: value, decimals: 0 };
    const num = parseFloat(match[2]);
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
    return { prefix: match[1], target: num, suffix: match[3], decimals };
}

export function useCountUp(value: string, duration = 1500, delay = 0, enabled = true) {
    const parsed = parseStat(value);
    const [display, setDisplay] = useState(enabled ? `${parsed.prefix}0${parsed.suffix}` : value);

    useEffect(() => {
        if (!enabled) {
            setDisplay(value);
            return;
        }

        let frame = 0;
        let start = 0;
        const timeout = window.setTimeout(() => {
            const step = (ts: number) => {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = parsed.target * eased;
                const formatted =
                    parsed.decimals > 0
                        ? current.toFixed(parsed.decimals)
                        : String(Math.round(current));
                setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
                if (progress < 1) frame = requestAnimationFrame(step);
            };
            frame = requestAnimationFrame(step);
        }, delay);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(frame);
        };
    }, [value, duration, delay, enabled, parsed.prefix, parsed.suffix, parsed.target, parsed.decimals]);

    return display;
}
