import { useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type CursorLightProps = {
    children: ReactNode;
    className?: string;
    glow?: string;
};

export function CursorLight({ children, className = '', glow = 'rgba(155,77,255,0.18)' }: CursorLightProps) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [pos, setPos] = useState({ x: 50, y: 50, active: false });

    return (
        <div
            ref={ref}
            className={`relative ${className}`}
            onMouseMove={(e) => {
                if (reduce || !ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                setPos({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                    active: true,
                });
            }}
            onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
        >
            <motion.div
                className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500"
                animate={{ opacity: pos.active ? 0.7 : 0 }}
                aria-hidden
            >
                <div
                    className="absolute h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                    style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        background: `radial-gradient(circle, ${glow}, transparent 70%)`,
                    }}
                />
            </motion.div>
            <div className="relative z-[2]">{children}</div>
        </div>
    );
}
