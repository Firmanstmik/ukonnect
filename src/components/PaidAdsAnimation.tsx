import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import metaIcon      from '../assets/meta.webp';
import googleAdsIcon from '../assets/Ukonnect Google Ads.webp';

/* ── Inline brand logos ───────────────────────────────────── */

const TikTokLogo = () => (
    <svg viewBox="0 0 24 24" className="w-[28px] h-[28px]" fill="#000000">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.893 2.737 2.896 2.896 0 0 1-2.893-2.892 2.896 2.896 0 0 1 2.893-2.892c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.33 6.33 0 0 0-6.33 6.34 6.33 6.33 0 0 0 6.33 6.34 6.33 6.33 0 0 0 6.33-6.34V8.69a8.188 8.188 0 0 0 4.792 1.523V6.79a4.83 4.83 0 0 1-1.012-.104z" />
    </svg>
);

const SnapchatLogo = () => (
    <svg viewBox="0 0 24 24" className="w-[38px] h-[38px] block" fill="#FFFC00">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.008.14-.016.28-.024.42a.903.903 0 0 0 .558.1c.502-.143 1.007-.428 1.507-.28.503.144.85.682.877 1.094.026.414-.256.728-.65.942-.191.105-.33.225-.448.33-.428.38-.355.695-.27.917.095.245.477.617 1.283 1.053l.039.02c.35.188.57.406.69.663.16.361.086.733-.162.897-.245.162-.578.202-.934.155-.176-.023-.365-.067-.548-.1a.56.56 0 0 0-.16.009c-.23.042-.449.18-.661.433-.463.55-.862 1.296-1.482 1.679-.628.388-1.286.414-1.945.414-.3 0-.6-.008-.897-.008h-.126c-.335 0-.67.02-1.003.074-.48.08-.92.244-1.332.45a2.72 2.72 0 0 1-.557.208c-.181.041-.37.06-.557.06-.366 0-.736-.08-1.065-.277-.413-.245-.73-.652-1.023-1.018-.22-.272-.43-.533-.65-.738-.217-.2-.42-.3-.652-.348a.634.634 0 0 0-.147-.015c-.198 0-.42.056-.618.106-.146.038-.287.072-.417.085-.33.037-.636-.02-.842-.171-.235-.17-.312-.483-.174-.824.113-.282.44-.543.773-.704.08-.038.16-.074.238-.108.66-.296 1.115-.594 1.352-1.177.083-.208.12-.46-.102-.728a2.26 2.26 0 0 0-.374-.329c-.196-.155-.394-.312-.498-.508a.847.847 0 0 1 .135-.967 1.33 1.33 0 0 1 .773-.338c.243-.02.487.065.717.15.21.077.41.15.6.131a.955.955 0 0 0 .489-.13c-.007-.125-.014-.25-.021-.376-.076-1.373-.172-3.08.285-4.292C7.98 1.11 11.206.793 12.206.793z" />
    </svg>
);

const LinkedInLogo = () => (
    <svg viewBox="0 0 24 24" className="w-[28px] h-[28px] block" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const YouTubeLogo = () => (
    <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] block" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

/* ── Platform definitions ─────────────────────────────────── */

const PLATFORMS = [
    { id: 'meta',     color: '#1877F2', ax: 108, ay: 48, startDeg: 0,   speed: 13, burstInterval: 3500, burstDelay: 800  },
    { id: 'google',   color: '#EA4335', ax: 83,  ay: 38, startDeg: 60,  speed: 9,  burstInterval: 4000, burstDelay: 1600 },
    { id: 'tiktok',   color: '#010101', ax: 122, ay: 55, startDeg: 120, speed: 16, burstInterval: 3000, burstDelay: 300  },
    { id: 'snapchat', color: '#FFFC00', ax: 95,  ay: 44, startDeg: 180, speed: 11, burstInterval: 4500, burstDelay: 2300 },
    { id: 'linkedin', color: '#0A66C2', ax: 88,  ay: 42, startDeg: 240, speed: 12, burstInterval: 3800, burstDelay: 1100 },
    { id: 'youtube',  color: '#FF0000', ax: 115, ay: 52, startDeg: 300, speed: 14, burstInterval: 3200, burstDelay: 2700 },
] as const;

/* ── Pre-compute orbit keyframes (36-step ellipse) ────────── */

type Orbit = { x: number[]; y: number[] };

const mkOrbit = (ax: number, ay: number, startDeg: number, steps = 36): Orbit => {
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i <= steps; i++) {
        const angle = ((startDeg + (i / steps) * 360) * Math.PI) / 180;
        xs.push(Math.round(Math.cos(angle) * ax));
        ys.push(Math.round(Math.sin(angle) * ay));
    }
    return { x: xs, y: ys };
};

const ORBITS = PLATFORMS.map(p => mkOrbit(p.ax, p.ay, p.startDeg));

/* ── Logo node ────────────────────────────────────────────── */

const NODE = 'w-14 h-14 bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.13)] flex items-center justify-center relative';

const LogoIcon = ({ id }: { id: string }) => {
    if (id === 'meta')     return <img src={metaIcon}      alt="Meta"   className="w-[38px] h-[38px] object-contain" />;
    if (id === 'google')   return <img src={googleAdsIcon} alt="Google" className="w-[30px] h-[30px] object-contain" />;
    if (id === 'tiktok')   return <TikTokLogo />;
    if (id === 'snapchat') return <SnapchatLogo />;
    if (id === 'linkedin') return <LinkedInLogo />;
    if (id === 'youtube')  return <YouTubeLogo />;
    return null;
};

/* ── Main component ──────────────────────────────────────────*/

export const PaidAdsAnimation = () => {
    const [burstKeys, setBurstKeys] = useState([0, 0, 0, 0, 0, 0]);
    const containerRef = useRef<HTMLDivElement>(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 100, damping: 18 });
    const springY = useSpring(rawY, { stiffness: 100, damping: 18 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left - rect.width  / 2) * 0.3);
        rawY.set((e.clientY - rect.top  - rect.height / 2) * 0.3);
    };

    const handleMouseLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    // Independent burst timer per logo
    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        PLATFORMS.forEach((p, i) => {
            const fire = () => {
                setBurstKeys(prev => prev.map((k, idx) => idx === i ? k + 1 : k));
                timers[i] = setTimeout(fire, p.burstInterval);
            };
            timers[i] = setTimeout(fire, p.burstDelay);
        });

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Subtle center dot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300/60" />

            {/* Spring-offset wrapper — shifts orbit center toward cursor */}
            <motion.div className="absolute inset-0" style={{ x: springX, y: springY }}>
            {PLATFORMS.map((p, i) => {
                const orbit = ORBITS[i];
                const bursting = burstKeys[i];

                return (
                    <motion.div
                        key={p.id}
                        className="absolute pointer-events-none"
                        style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
                        animate={{ x: orbit.x, y: orbit.y }}
                        transition={{ duration: p.speed, repeat: Infinity, ease: 'linear', times: orbit.x.map((_, j) => j / (orbit.x.length - 1)) }}
                    >
                        {/* Burst scale wrapper — re-mounts on each burst */}
                        <motion.div
                            key={bursting}
                            initial={{ scale: 1 }}
                            animate={{ scale: bursting > 0 ? [1, 1.35, 1] : 1 }}
                            transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className={NODE}>
                                <LogoIcon id={p.id} />

                                {/* Ring 1 */}
                                {bursting > 0 && (
                                    <motion.div
                                        key={`r1-${bursting}`}
                                        className="absolute inset-0 rounded-xl pointer-events-none"
                                        style={{ border: `1.5px solid ${p.color}` }}
                                        initial={{ scale: 1, opacity: 0.75 }}
                                        animate={{ scale: 2.2, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                    />
                                )}
                                {/* Ring 2 */}
                                {bursting > 0 && (
                                    <motion.div
                                        key={`r2-${bursting}`}
                                        className="absolute inset-0 rounded-xl pointer-events-none"
                                        style={{ border: `1px solid ${p.color}` }}
                                        initial={{ scale: 1, opacity: 0.45 }}
                                        animate={{ scale: 3.0, opacity: 0 }}
                                        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
            </motion.div>
        </div>
    );
};
