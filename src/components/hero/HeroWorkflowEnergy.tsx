import { useEffect, useId, useRef, type RefObject } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import {
    CANVAS,
    HANDOFF_PATH,
    HERO_EASE,
    pct,
    TEAM_ORIGIN,
    WORKFLOW_FRONT_PATH,
    WORKFLOW_NODES,
    WORKFLOW_PATH,
} from './heroDesign';
import { HeroBrandLogo } from './HeroBrandLogo';

type Props = {
    animate: boolean;
    delay?: number;
};

const TRAIL = 6;

function useOrganicParticle(
    pathRef: RefObject<SVGPathElement | null>,
    particleRefs: RefObject<(SVGGElement | null)[]>,
    animate: boolean,
) {
    useEffect(() => {
        const path = pathRef.current;
        const particles = particleRefs.current;
        if (!path || !animate || particles.length === 0) return;

        const stage = path.closest('[data-cinematic-stage]');
        const length = path.getTotalLength();
        const timers = new Set<number>();
        let raf = 0;
        let progress = 0;
        let nextNode = 0;
        let last = performance.now();
        let pauseUntil = last + 1800;
        let visible = true;

        const pulse = (nodeIndex: number) => {
            const node = WORKFLOW_NODES[nodeIndex];
            const element = stage?.querySelector<HTMLElement>(`[data-workflow-node="${node.id}"]`);
            element?.classList.add('is-processing');
            const timer = window.setTimeout(() => {
                element?.classList.remove('is-processing');
                timers.delete(timer);
            }, 720);
            timers.add(timer);
        };

        const place = (group: SVGGElement | null, at: number) => {
            if (!group) return;
            const clamped = Math.max(0, Math.min(1, at));
            const point = path.getPointAtLength(clamped * length);
            const ahead = path.getPointAtLength(Math.min(1, clamped + 0.004) * length);
            const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
            group.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
            group.style.opacity = at < 0 || at > 1 ? '0' : '1';
        };

        const tick = (now: number) => {
            if (!visible) return;
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            if (now >= pauseUntil) {
                const speed = 0.072 * (0.9 + Math.sin(now * 0.0018) * 0.1);
                progress += speed * dt;
                const target = WORKFLOW_NODES[nextNode];
                if (target && progress >= target.progress) {
                    progress = target.progress;
                    pulse(nextNode);
                    pauseUntil = now + 160 + (nextNode % 3) * 40;
                    nextNode += 1;
                }
                if (progress >= 1) {
                    progress = 0;
                    nextNode = 0;
                    pauseUntil = now + 640;
                }
            }

            for (let i = 0; i < TRAIL; i += 1) {
                place(particles[i], progress - i * 0.0095);
            }
            raf = requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry?.isIntersecting ?? true;
            cancelAnimationFrame(raf);
            if (visible) {
                last = performance.now();
                raf = requestAnimationFrame(tick);
            }
        }, { rootMargin: '120px 0px' });

        observer.observe(path);
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            observer.disconnect();
            timers.forEach(window.clearTimeout);
        };
    }, [animate, particleRefs, pathRef]);
}

export function HeroWorkflowBack({ animate, delay = 0.34 }: Props) {
    const uid = useId().replace(/:/g, '');
    const pathRef = useRef<SVGPathElement>(null);
    const particleRefs = useRef<(SVGGElement | null)[]>([]);
    useOrganicParticle(pathRef, particleRefs, animate);

    const gradientId = `story-energy-${uid}`;
    const beamId = `story-beam-${uid}`;
    const softGlowId = `story-soft-${uid}`;
    const particleGlowId = `story-particle-${uid}`;
    const nodeGlowId = `story-node-${uid}`;
    const draw = animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 };

    return (
        <div className="pointer-events-none absolute inset-0 z-[8]" aria-hidden>
            <svg viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} className="h-full w-full overflow-visible">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00D4E8" stopOpacity="0.55" />
                        <stop offset="28%" stopColor="#38BDF8" stopOpacity="0.85" />
                        <stop offset="52%" stopColor="#6C30FF" stopOpacity="1" />
                        <stop offset="78%" stopColor="#8B5CF6" stopOpacity="0.88" />
                        <stop offset="100%" stopColor="#00D4E8" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id={beamId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                        <stop offset="40%" stopColor="#E0F9FF" stopOpacity="0.15" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="60%" stopColor="#DDD6FE" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#6C30FF" stopOpacity="0" />
                    </linearGradient>
                    <filter id={softGlowId} x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="2.2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={particleGlowId} x="-800%" y="-800%" width="1600%" height="1600%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values="0.4 0 0 0 0.05
                                    0 0.9 0 0 0.4
                                    0 0 1 0 0.55
                                    0 0 0 1.1 0"
                            result="tint"
                        />
                        <feMerge>
                            <feMergeNode in="tint" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={nodeGlowId} x="-300%" y="-300%" width="700%" height="700%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <radialGradient id={`${uid}-core`} cx="35%" cy="30%" r="65%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="45%" stopColor="#CFFAFE" stopOpacity="1" />
                        <stop offset="100%" stopColor="#6C30FF" stopOpacity="1" />
                    </radialGradient>
                </defs>

                {/* Soft under-glow — thin, not a thick tube */}
                <motion.path
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke="rgba(108,48,255,0.16)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    initial={draw}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 2.4, delay, ease: HERO_EASE }}
                    filter={`url(#${softGlowId})`}
                />

                {/* Hairline white base */}
                <motion.path
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke="rgba(255,255,255,0.78)"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    initial={draw}
                    animate={{ pathLength: 1, opacity: 0.55 }}
                    transition={{ duration: 2.4, delay, ease: HERO_EASE }}
                />

                {/* Precision brand stroke */}
                <motion.path
                    ref={pathRef}
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    initial={draw}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.4, delay, ease: HERO_EASE }}
                />

                {/* Traveling light bead */}
                <motion.path
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke={`url(#${beamId})`}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeDasharray="28 340"
                    className={animate ? 'cinematic-energy-beam' : ''}
                    initial={draw}
                    animate={{ pathLength: 1, opacity: animate ? 0.95 : 0.3 }}
                    transition={{ duration: 2.4, delay: delay + 0.08, ease: HERO_EASE }}
                />

                {/* Micro tick marks */}
                <motion.path
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth="0.65"
                    strokeLinecap="round"
                    strokeDasharray="0.7 11"
                    className={animate ? 'cinematic-energy-dashes' : ''}
                    initial={draw}
                    animate={{ pathLength: 1, opacity: 0.55 }}
                    transition={{ duration: 2.4, delay: delay + 0.1, ease: HERO_EASE }}
                />

                <motion.path
                    d={HANDOFF_PATH}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    initial={animate ? { pathLength: 0, opacity: 0 } : false}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 0.85, delay: 2.0, ease: HERO_EASE }}
                />

                {/* Junction dots — minimal, no large rings */}
                {WORKFLOW_NODES.map((node, index) => (
                    <g key={node.id} className="cinematic-orbit-dot" style={{ animationDelay: `${index * 0.22}s` }}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="2.85"
                            fill={`url(#${uid}-core)`}
                            filter={`url(#${nodeGlowId})`}
                        />
                        <circle cx={node.x} cy={node.y} r="1" fill="#FFFFFF" opacity="0.95" />
                    </g>
                ))}

                {/* Comet particle + trail */}
                {Array.from({ length: TRAIL }, (_, index) => {
                    const isHead = index === 0;
                    const scale = 1 - index * 0.12;
                    return (
                        <g
                            key={index}
                            ref={(element) => { particleRefs.current[index] = element; }}
                            transform={`translate(${TEAM_ORIGIN.x} ${TEAM_ORIGIN.y})`}
                            opacity={0}
                        >
                            {isHead ? (
                                <>
                                    <ellipse
                                        cx="-5"
                                        cy="0"
                                        rx="8"
                                        ry="1.5"
                                        fill="rgba(0,212,232,0.35)"
                                        filter={`url(#${particleGlowId})`}
                                    />
                                    <circle
                                        r="3.2"
                                        fill={`url(#${uid}-core)`}
                                        filter={`url(#${particleGlowId})`}
                                    />
                                    <circle r="1.2" fill="#FFFFFF" />
                                </>
                            ) : (
                                <circle
                                    r={Math.max(0.6, 1.9 * scale)}
                                    fill={index < 3 ? '#67E8F9' : '#DDD6FE'}
                                    opacity={0.5 - index * 0.06}
                                    filter={index < 2 ? `url(#${particleGlowId})` : undefined}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

export function HeroWorkflowFront({ animate, delay = 0.34 }: Props) {
    return (
        <div className="pointer-events-none absolute inset-0 z-[31]" aria-hidden>
            <svg viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} className="h-full w-full overflow-visible">
                <motion.path
                    d={WORKFLOW_FRONT_PATH}
                    fill="none"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.4"
                    initial={animate ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.85, delay: delay + 1.15, ease: HERO_EASE }}
                />
                <motion.path
                    d={WORKFLOW_FRONT_PATH}
                    fill="none"
                    stroke="rgba(0,212,232,0.5)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    initial={animate ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.85, delay: delay + 1.15, ease: HERO_EASE }}
                />
                <motion.path
                    d={WORKFLOW_FRONT_PATH}
                    fill="none"
                    stroke="rgba(108,48,255,0.38)"
                    strokeWidth="0.95"
                    strokeLinecap="round"
                    initial={animate ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.85, delay: delay + 1.22, ease: HERO_EASE }}
                />
                {animate ? (
                    <motion.path
                        d={WORKFLOW_FRONT_PATH}
                        fill="none"
                        stroke="rgba(255,255,255,0.92)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeDasharray="20 180"
                        className="cinematic-energy-beam"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ duration: 0.85, delay: delay + 1.2, ease: HERO_EASE }}
                    />
                ) : null}
            </svg>
        </div>
    );
}

export function HeroWorkflowNodes({ animate }: Props) {
    const { t } = useLanguage();

    return (
        <div className="pointer-events-none absolute inset-0 z-[38]" role="group" aria-label="Human-led growth workflow">
            {WORKFLOW_NODES.map((node, index) => (
                <div
                    key={node.id}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: pct(node.x, CANVAS.w), top: pct(node.y, CANVAS.h) }}
                >
                    <motion.a
                        href="#process"
                        data-workflow-node={node.id}
                        data-brand-count={node.brands.length}
                        aria-label={`${node.step}. ${t(node.labelKey)}`}
                        className="cinematic-brand-node pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C30FF]/45 focus-visible:ring-offset-2"
                        style={animate ? { animationDelay: `${index * -0.47}s` } : undefined}
                        initial={animate ? { opacity: 0, scale: 0.88, y: 6 } : false}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.52, delay: 0.72 + index * 0.07, ease: HERO_EASE }}
                        whileHover={animate ? { y: -2, scale: 1.03 } : undefined}
                    >
                        <span className="cinematic-brand-node-logos" aria-hidden>
                            {node.brands.map((brand) => (
                                <i key={brand}><HeroBrandLogo brand={brand} /></i>
                            ))}
                        </span>
                        <span className="cinematic-brand-node-copy">
                            <small>{node.step}</small>
                            <strong>{t(node.labelKey)}</strong>
                        </span>
                    </motion.a>
                </div>
            ))}
        </div>
    );
}
