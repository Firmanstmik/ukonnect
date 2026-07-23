import { useEffect, useId, useRef, type CSSProperties, type RefObject } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import {
    CANVAS,
    HANDOFF_PATH,
    HERO_EASE,
    NODE_DRIFT,
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

const TRAIL = 7;
const DRAW_EASE = [0.16, 1, 0.3, 1] as const;

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
        let pauseUntil = last + 2100;
        let visible = true;
        let crawl = 1;

        const clearClassLater = (element: Element | null | undefined, className: string, ms: number) => {
            if (!element) return;
            element.classList.add(className);
            const timer = window.setTimeout(() => {
                element.classList.remove(className);
                timers.delete(timer);
            }, ms);
            timers.add(timer);
        };

        const pulse = (nodeIndex: number) => {
            const node = WORKFLOW_NODES[nodeIndex];
            clearClassLater(
                stage?.querySelector(`[data-workflow-node="${node.id}"]`),
                'is-processing',
                880,
            );
            clearClassLater(
                stage?.querySelector(`[data-orbit-node="${node.id}"]`),
                'is-energized',
                880,
            );
        };

        const pulseTrust = () => {
            clearClassLater(
                stage?.closest('.cinematic-hero')?.querySelector('.cinematic-client-destination')
                    ?? document.querySelector('.cinematic-client-destination'),
                'is-arriving',
                1400,
            );
            clearClassLater(
                stage?.closest('.cinematic-hero')?.querySelector('.cinematic-handoff')
                    ?? document.querySelector('.cinematic-handoff'),
                'is-receiving',
                1600,
            );
        };

        const curvatureAt = (at: number) => {
            const clamped = Math.max(0, Math.min(0.96, at));
            const p0 = path.getPointAtLength(clamped * length);
            const p1 = path.getPointAtLength(Math.min(1, clamped + 0.018) * length);
            const p2 = path.getPointAtLength(Math.min(1, clamped + 0.036) * length);
            const a1 = Math.atan2(p1.y - p0.y, p1.x - p0.x);
            const a2 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            let delta = Math.abs(a2 - a1);
            if (delta > Math.PI) delta = Math.PI * 2 - delta;
            return Math.min(1, delta / 0.42);
        };

        const place = (group: SVGGElement | null, at: number, head = false) => {
            if (!group) return;
            const clamped = Math.max(0, Math.min(1, at));
            const point = path.getPointAtLength(clamped * length);
            const ahead = path.getPointAtLength(Math.min(1, clamped + 0.004) * length);
            const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
            group.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
            if (at < -0.01 || at > 1.01) {
                group.style.opacity = '0';
                return;
            }
            const fade = head ? 1 : Math.max(0.12, 1 - Math.abs(progress - at) * 55);
            group.style.opacity = String(fade);
        };

        const tick = (now: number) => {
            if (!visible) return;
            const dt = Math.min((now - last) / 1000, 0.048);
            last = now;

            const holding = now < pauseUntil;
            if (holding) {
                // Never fully freeze — soft crawl through dwell moments.
                crawl = 0.18;
            } else {
                crawl = 1;
            }

            const curve = curvatureAt(progress);
            const breathe = 0.92 + Math.sin(now * 0.0014) * 0.08;
            const corner = 1.14 - curve * 0.52;
            const speed = 0.068 * breathe * corner * crawl;
            progress += speed * dt;

            const target = WORKFLOW_NODES[nextNode];
            if (target && progress >= target.progress) {
                progress = target.progress;
                pulse(nextNode);
                pauseUntil = now + 95 + (nextNode % 4) * 28;
                nextNode += 1;
            }

            if (progress >= 1) {
                pulseTrust();
                progress = 0;
                nextNode = 0;
                pauseUntil = now + 420;
            }

            for (let i = 0; i < TRAIL; i += 1) {
                place(particles[i], progress - i * 0.0088, i === 0);
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
        }, { rootMargin: '140px 0px' });

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
    const originGlowId = `story-origin-${uid}`;
    const draw = animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 };

    return (
        <div className="pointer-events-none absolute inset-0 z-[8]" aria-hidden>
            <svg viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} className="h-full w-full overflow-visible">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00D4E8" stopOpacity="0.5" />
                        <stop offset="28%" stopColor="#38BDF8" stopOpacity="0.82" />
                        <stop offset="52%" stopColor="#6C30FF" stopOpacity="1" />
                        <stop offset="78%" stopColor="#8B5CF6" stopOpacity="0.86" />
                        <stop offset="100%" stopColor="#00D4E8" stopOpacity="0.38" />
                    </linearGradient>
                    <linearGradient id={beamId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                        <stop offset="38%" stopColor="#E0F9FF" stopOpacity="0.12" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="62%" stopColor="#DDD6FE" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#6C30FF" stopOpacity="0" />
                    </linearGradient>
                    <filter id={softGlowId} x="-45%" y="-45%" width="190%" height="190%">
                        <feGaussianBlur stdDeviation="2.6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={particleGlowId} x="-800%" y="-800%" width="1600%" height="1600%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2.6" result="blur" />
                        <feColorMatrix
                            in="blur"
                            type="matrix"
                            values="0.35 0 0 0 0.04
                                    0 0.85 0 0 0.38
                                    0 0 1 0 0.58
                                    0 0 0 1.15 0"
                            result="tint"
                        />
                        <feMerge>
                            <feMergeNode in="tint" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={nodeGlowId} x="-320%" y="-320%" width="740%" height="740%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={originGlowId} x="-400%" y="-400%" width="900%" height="900%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur" />
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
                    <radialGradient id={`${uid}-origin`} cx="40%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="40%" stopColor="#A5F3FC" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#6C30FF" stopOpacity="0.9" />
                    </radialGradient>
                </defs>

                {/* Human Strategy origin — energy begins behind the team */}
                <g className="cinematic-svg-origin" transform={`translate(${TEAM_ORIGIN.x} ${TEAM_ORIGIN.y})`}>
                    <circle r="14" fill="rgba(108,48,255,0.08)" filter={`url(#${originGlowId})`} />
                    <circle r="7.5" fill="rgba(0,212,232,0.12)" filter={`url(#${originGlowId})`} />
                    <circle r="3.4" fill={`url(#${uid}-origin)`} filter={`url(#${originGlowId})`} />
                    <circle r="1.15" fill="#FFFFFF" opacity="0.95" />
                </g>

                {/* Soft volumetric under-glow */}
                <motion.path
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke="rgba(108,48,255,0.18)"
                    strokeWidth="5.2"
                    strokeLinecap="round"
                    initial={draw}
                    animate={{ pathLength: 1, opacity: 0.72 }}
                    transition={{ duration: 2.65, delay, ease: DRAW_EASE }}
                    filter={`url(#${softGlowId})`}
                />

                {/* Hairline white base */}
                <motion.path
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2.05"
                    strokeLinecap="round"
                    initial={draw}
                    animate={{ pathLength: 1, opacity: 0.52 }}
                    transition={{ duration: 2.65, delay, ease: DRAW_EASE }}
                />

                {/* Precision brand stroke — draws on load */}
                <motion.path
                    ref={pathRef}
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={draw}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.65, delay, ease: DRAW_EASE }}
                />

                {/* Continuous travelling soft glow */}
                <motion.path
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke={`url(#${beamId})`}
                    strokeWidth="1.85"
                    strokeLinecap="round"
                    strokeDasharray="32 320"
                    className={animate ? 'cinematic-energy-beam' : ''}
                    initial={draw}
                    animate={{ pathLength: 1, opacity: animate ? 0.96 : 0.28 }}
                    transition={{ duration: 2.65, delay: delay + 0.08, ease: DRAW_EASE }}
                />

                {/* Micro energy ticks */}
                <motion.path
                    d={WORKFLOW_PATH}
                    fill="none"
                    stroke="rgba(255,255,255,0.62)"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    strokeDasharray="0.65 10.5"
                    className={animate ? 'cinematic-energy-dashes' : ''}
                    initial={draw}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 2.65, delay: delay + 0.1, ease: DRAW_EASE }}
                />

                <motion.path
                    d={HANDOFF_PATH}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    initial={animate ? { pathLength: 0, opacity: 0 } : false}
                    animate={{ pathLength: 1, opacity: 0.55 }}
                    transition={{ duration: 0.95, delay: 2.15, ease: DRAW_EASE }}
                />

                {/* Junction cores — light when energy enters the card */}
                {WORKFLOW_NODES.map((node, index) => (
                    <g
                        key={node.id}
                        data-orbit-node={node.id}
                        className="cinematic-orbit-dot"
                        style={{ animationDelay: `${index * 0.22}s` }}
                    >
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="5.5"
                            fill="rgba(108,48,255,0.06)"
                            className="cinematic-orbit-ring"
                        />
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="2.9"
                            fill={`url(#${uid}-core)`}
                            filter={`url(#${nodeGlowId})`}
                        />
                        <circle cx={node.x} cy={node.y} r="1" fill="#FFFFFF" opacity="0.95" />
                    </g>
                ))}

                {/* Living comet + trail */}
                {Array.from({ length: TRAIL }, (_, index) => {
                    const isHead = index === 0;
                    const scale = 1 - index * 0.11;
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
                                        cx="-6"
                                        cy="0"
                                        rx="9"
                                        ry="1.55"
                                        fill="rgba(0,212,232,0.38)"
                                        filter={`url(#${particleGlowId})`}
                                    />
                                    <circle
                                        r="3.35"
                                        fill={`url(#${uid}-core)`}
                                        filter={`url(#${particleGlowId})`}
                                    />
                                    <circle r="1.25" fill="#FFFFFF" />
                                </>
                            ) : (
                                <circle
                                    r={Math.max(0.55, 1.85 * scale)}
                                    fill={index < 3 ? '#67E8F9' : '#DDD6FE'}
                                    opacity={0.48 - index * 0.05}
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
                    stroke="rgba(255,255,255,0.72)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.38"
                    initial={animate ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: delay + 1.2, ease: DRAW_EASE }}
                />
                <motion.path
                    d={WORKFLOW_FRONT_PATH}
                    fill="none"
                    stroke="rgba(0,212,232,0.52)"
                    strokeWidth="1.28"
                    strokeLinecap="round"
                    initial={animate ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: delay + 1.2, ease: DRAW_EASE }}
                />
                <motion.path
                    d={WORKFLOW_FRONT_PATH}
                    fill="none"
                    stroke="rgba(108,48,255,0.4)"
                    strokeWidth="0.95"
                    strokeLinecap="round"
                    initial={animate ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: delay + 1.28, ease: DRAW_EASE }}
                />
                {animate ? (
                    <motion.path
                        d={WORKFLOW_FRONT_PATH}
                        fill="none"
                        stroke="rgba(255,255,255,0.94)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeDasharray="22 170"
                        className="cinematic-energy-beam"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.82 }}
                        transition={{ duration: 0.9, delay: delay + 1.25, ease: DRAW_EASE }}
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
            {WORKFLOW_NODES.map((node, index) => {
                const drift = NODE_DRIFT[node.id];
                const wrapStyle = {
                    left: pct(node.x, CANVAS.w),
                    top: pct(node.y + drift.dy, CANVAS.h),
                    '--node-amp': `${drift.amp}px`,
                    '--node-rot': `${drift.rotate}deg`,
                    '--node-duration': `${drift.duration}s`,
                    transform: `translate(-50%, -50%) rotate(${drift.rotate}deg)`,
                } as CSSProperties;

                return (
                    <div
                        key={node.id}
                        className="pointer-events-none absolute"
                        style={wrapStyle}
                    >
                        <motion.a
                            href="#process"
                            data-workflow-node={node.id}
                            data-brand-count={node.brands.length}
                            aria-label={`${node.step}. ${t(node.labelKey)}`}
                            className="cinematic-brand-node pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C30FF]/45 focus-visible:ring-offset-2"
                            style={
                                animate
                                    ? { animationDelay: `${index * -0.53}s` }
                                    : undefined
                            }
                            initial={animate ? { opacity: 0, scale: 0.9, y: 8 } : false}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.58, delay: 0.78 + index * 0.065, ease: HERO_EASE }}
                            whileHover={animate ? { y: -3, scale: 1.025 } : undefined}
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
                );
            })}
        </div>
    );
}
