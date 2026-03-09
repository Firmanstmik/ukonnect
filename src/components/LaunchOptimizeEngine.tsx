import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import icon from '../assets/Ukonnect Marketing icon.webp';
import metaIcon from '../assets/meta.webp';
import googleAdsIcon from '../assets/Ukonnect Google Ads.webp';
import wordpressIcon from '../assets/Wordpress.webp';
import slackIcon from '../assets/Slack.webp';
import googleIcon from '../assets/google ukonnect.svg';
import hubspotIcon from '../assets/ukonnect hubspot.webp';

const NODE_STYLE = 'w-20 h-20 bg-[#ecedf1] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center';

const CENTER = 50;
const RADIUS = 34;
const BEND = 3;

const INTEGRATIONS: { label: string; x: number; y: number; icon: string }[] = [
    { label: 'Slack',      x: CENTER - RADIUS * 0.4,     y: CENTER - RADIUS * 0.9,    icon: 'slack' },
    { label: 'WordPress',  x: CENTER + RADIUS * 0.4,     y: CENTER - RADIUS * 0.9,    icon: 'wordpress' },
    { label: 'Google',     x: CENTER - RADIUS * 1.1,     y: CENTER,                   icon: 'google' },
    { label: 'Meta Ads',   x: CENTER + RADIUS * 1.1,     y: CENTER,                   icon: 'meta' },
    { label: 'HubSpot',    x: CENTER - RADIUS * 0.4,     y: CENTER + RADIUS * 0.9,    icon: 'hubspot' },
    { label: 'Google Ads', x: CENTER + RADIUS * 0.4,     y: CENTER + RADIUS * 0.9,    icon: 'googleAds' },
];

const bezAt = (t: number, p0: number, p1: number, p2: number) =>
    (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

const T_VALUES = Array.from({ length: 11 }, (_, i) => i / 10);

const DURATIONS = [2.4, 3.0, 2.8, 2.6, 3.4, 2.2];

const CONNECTIONS = INTEGRATIONS.map((node) => {
    const dx = node.x - CENTER;
    const dy = node.y - CENTER;
    const len = Math.sqrt(dx * dx + dy * dy);
    const perpX = -dy / len;
    const perpY = dx / len;
    const ctrlX = (CENTER + node.x) / 2 + perpX * BEND;
    const ctrlY = (CENTER + node.y) / 2 + perpY * BEND;
    const pathD = `M ${CENTER} ${CENTER} Q ${ctrlX} ${ctrlY} ${node.x} ${node.y}`;

    const cx = T_VALUES.map(t => bezAt(t, CENTER, ctrlX, node.x));
    const cy = T_VALUES.map(t => bezAt(t, CENTER, ctrlY, node.y));

    return { pathD, cx, cy };
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

export const LaunchOptimizeEngine = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-full h-full relative overflow-hidden">
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {CONNECTIONS.map((conn, i) => (
                    <React.Fragment key={INTEGRATIONS[i].label}>
                        {/* Connection line */}
                        <motion.path
                            d={conn.pathD}
                            stroke="#CBD5E1"
                            strokeWidth="0.7"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.45 }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                        />

                        {/* Signal dot */}
                        <SignalDot
                            cxValues={conn.cx}
                            cyValues={conn.cy}
                            duration={DURATIONS[i]}
                            delay={i * 0.4}
                            isHovered={isHovered}
                        />
                    </React.Fragment>
                ))}
            </svg>

            {/* Integration nodes */}
            {INTEGRATIONS.map((node, i) => (
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
                                ? <img src={metaIcon} alt="Meta" className="w-[60px] h-[60px] object-contain" />
                                : node.icon === 'googleAds'
                                ? <img src={googleAdsIcon} alt="Google Ads" className="w-[46px] h-[46px] object-contain" />
                                : node.icon === 'wordpress'
                                ? <img src={wordpressIcon} alt="WordPress" className="w-[46px] h-[46px] object-contain" />
                                : node.icon === 'slack'
                                ? <img src={slackIcon} alt="Slack" className="w-[46px] h-[46px] object-contain" />
                                : node.icon === 'google'
                                ? <img src={googleIcon} alt="Google" className="w-[46px] h-[46px] object-contain" />
                                : node.icon === 'hubspot'
                                ? <img src={hubspotIcon} alt="HubSpot" className="w-[46px] h-[46px] object-contain" />
                                : node.icon}
                        </motion.div>
                    </motion.div>
                </div>
            ))}

            {/* Center Ukonnect node — hover triggers heartbeat */}
            <div
                className="absolute z-20"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
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
                            className="w-10 h-10 object-contain"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
