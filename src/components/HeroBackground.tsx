import React, { useEffect, useRef } from 'react';

/* ── Node positions (normalized 0–1) ─────────────────────── */

const NP: [number, number][] = [
    [0.04, 0.07], [0.14, 0.20], [0.07, 0.37],   //  0–2  top-left
    [0.28, 0.05], [0.38, 0.17], [0.50, 0.08],   //  3–5  top-centre-L
    [0.60, 0.20], [0.72, 0.07],                  //  6–7  top-centre-R
    [0.85, 0.15], [0.93, 0.07], [0.90, 0.30],   //  8–10 top-right
    [0.20, 0.44], [0.34, 0.38], [0.50, 0.36],   // 11–13 mid
    [0.64, 0.42], [0.79, 0.37],                  // 14–15 mid-right
    [0.17, 0.65], [0.33, 0.70],                  // 16–17 lower-left
    [0.50, 0.74],                                 // 18    ← CTA focal node
    [0.67, 0.70], [0.83, 0.65],                  // 19–20 lower-right
    [0.40, 0.88], [0.62, 0.88],                  // 21–22 bottom
];
const CTA_IDX = 18;
const N_NODES  = NP.length;

/* ── Build adjacency list once at module load ─────────────── */

const EDGES: [number, number][] = [];
const ADJ: number[][]           = Array.from({ length: N_NODES }, () => []);

{
    const DIST = 0.30, MAX_DEG = 5;
    const deg  = new Array(N_NODES).fill(0);
    const cands: [number, number, number][] = [];

    for (let i = 0; i < N_NODES; i++)
        for (let j = i + 1; j < N_NODES; j++) {
            const dx = NP[i][0] - NP[j][0], dy = NP[i][1] - NP[j][1];
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d <= DIST) cands.push([i, j, d]);
        }
    cands.sort((a, b) => a[2] - b[2]);

    for (const [i, j] of cands) {
        if (deg[i] < MAX_DEG && deg[j] < MAX_DEG) {
            EDGES.push([i, j]);
            ADJ[i].push(j); ADJ[j].push(i);
            deg[i]++; deg[j]++;
        }
    }
}

/* ── Dot helpers ──────────────────────────────────────────── */

interface Dot { from: number; to: number; t: number; spd: number; chaser: boolean }

/* Random-walk dot, with a 30% cursor-bias on next hop selection */
function newDot(arrived: number, prev: number, cx: number, cy: number): Dot {
    const nbrs  = ADJ[arrived];
    const cands = nbrs.length > 1 ? nbrs.filter(n => n !== prev) : nbrs;
    let to: number;
    if (Math.random() < 0.30 && cands.length > 1) {
        // Prefer the neighbor closest to cursor
        let best = cands[0], bestD = Infinity;
        for (const n of cands) {
            const dx = NP[n][0] - cx, dy = NP[n][1] - cy;
            const d = dx * dx + dy * dy;
            if (d < bestD) { bestD = d; best = n; }
        }
        to = best;
    } else {
        to = cands[Math.floor(Math.random() * cands.length)] ?? arrived;
    }
    return { from: arrived, to, t: 0, spd: 0.055 + Math.random() * 0.05, chaser: false };
}

/* Cursor-chasing dot — always picks neighbor closest to cursor */
function newChaser(arrived: number, prev: number, cx: number, cy: number): Dot {
    const nbrs  = ADJ[arrived];
    const cands = nbrs.length > 1 ? nbrs.filter(n => n !== prev) : nbrs;
    let best = cands[0] ?? arrived, bestD = Infinity;
    for (const n of cands) {
        const dx = NP[n][0] - cx, dy = NP[n][1] - cy;
        const d  = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = n; }
    }
    return { from: arrived, to: best, t: 0, spd: 0.10 + Math.random() * 0.04, chaser: true };
}

function edgeKey(i: number, j: number) { return `${Math.min(i, j)}-${Math.max(i, j)}`; }

/* ── Magnetic field constants ─────────────────────────────── */

const ATTRACT_R    = 260;   // px: radius nodes feel the pull
const MAX_PULL     = 55;    // px: maximum node displacement
const LERP_IN      = 5;     // spring-in speed  (higher = snappier follow)
const LERP_OUT     = 3.5;   // spring-out speed (lower = slower return, ~0.8s 95%)
const DOT_FIELD_R  = 170;   // px: radius where dots accelerate & glow
const DOT_BOOST    = 2.0;   // speed multiplier at cursor centre
const LINE_FIELD_R = 200;   // px: midpoint radius for opacity/bend boost
const CURSOR_R     = 85;    // px: soft cursor glow radius
const CURSOR_ALPHA = 0.055; // cursor glow opacity (keep premium)
const BEND_MAX     = 14;    // px: max bezier bend at line midpoint

/* ── Component ────────────────────────────────────────────── */

export const HeroBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef  = useRef({ x: 0.5, y: 0.5, active: false });

    useEffect(() => {
        const el = canvasRef.current;
        if (!el) return;

        /* ── Gradient blobs ─────────────────────────────── */
        const blobs = [
            { x: 0.50, y: 0.10, r: 0.52, vx:  0.0022, vy:  0.0015 },
            { x: 0.14, y: 0.60, r: 0.30, vx: -0.0017, vy:  0.0021 },
            { x: 0.86, y: 0.33, r: 0.37, vx:  0.0020, vy: -0.0017 },
        ];

        /* 5 random-walk dots + 3 cursor chasers */
        const dots: Dot[] = [
            ...[0, 5, 9, 13, 19].map(n => {
                const to = ADJ[n][Math.floor(Math.random() * ADJ[n].length)] ?? n;
                return { from: n, to, t: Math.random(), spd: 0.055 + Math.random() * 0.05, chaser: false };
            }),
            ...[2, 7, 15].map(n => {
                const to = ADJ[n][Math.floor(Math.random() * ADJ[n].length)] ?? n;
                return { from: n, to, t: Math.random() * 0.5, spd: 0.10 + Math.random() * 0.04, chaser: true };
            }),
        ];

        let ctaGlow = 0;
        const rings: { age: number }[] = [];
        const pulse  = new Map<string, number>();

        /* Per-node spring offsets [currentX, currentY, velX, velY] */
        const nodeOffsets: [number, number][] = NP.map(() => [0, 0]);

        let raf: number;
        let last = performance.now();

        /* ── Resize ─────────────────────────────────────── */
        const resize = () => {
            const dpr = devicePixelRatio || 1;
            el.width  = el.offsetWidth  * dpr;
            el.height = el.offsetHeight * dpr;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        /* ── Mouse tracking ─────────────────────────────── */
        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            mouseRef.current = {
                x: (e.clientX - r.left) / r.width,
                y: (e.clientY - r.top)  / r.height,
                active: true,
            };
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        /* ── Draw loop ──────────────────────────────────── */
        const draw = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            const W   = el.offsetWidth;
            const H   = el.offsetHeight;
            const dpr = devicePixelRatio || 1;
            const ctx = el.getContext('2d');
            if (!ctx) { raf = requestAnimationFrame(draw); return; }

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            /* Parallax offset */
            const ox = (mx - 0.5) * 20;
            const oy = (my - 0.5) * 12;

            /* Cursor screen coords */
            const csx = mx * W;
            const csy = my * H;

            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, W, H);

            /* ── Gradient blobs ─────────────────────────── */
            for (const b of blobs) {
                b.x += b.vx * dt;  b.y += b.vy * dt;
                if (b.x < 0.08 || b.x > 0.92) b.vx *= -1;
                if (b.y < 0.08 || b.y > 0.92) b.vy *= -1;
                const cx = b.x * W + ox * 0.25;
                const cy = b.y * H + oy * 0.25;
                const r  = b.r * Math.max(W, H);
                const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                g.addColorStop(0, 'rgba(86,0,227,0.055)');
                g.addColorStop(1, 'rgba(86,0,227,0)');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, W, H);
            }

            /* ── Smooth magnetic node positions ─────────── */
            /* On mobile, stretch nodes horizontally by 30% (centered) so the
               graph breathes more on narrow viewports */
            const isMobile = W < 768;
            const xStretch = isMobile ? 1.30 : 1;
            const xShift   = isMobile ? W * 0.15 : 0;

            const screenPos: [number, number][] = NP.map((p, i) => {
                const bx = p[0] * W * xStretch - xShift + ox;
                const by = p[1] * H + oy;
                const dx = csx - bx;
                const dy = csy - by;
                const d  = Math.sqrt(dx * dx + dy * dy);

                /* Target pull */
                let targetX = 0, targetY = 0;
                if (d < ATTRACT_R && d > 0) {
                    const t    = 1 - d / ATTRACT_R;
                    const pull = t * t * MAX_PULL;     // quadratic falloff
                    targetX = (dx / d) * pull;
                    targetY = (dy / d) * pull;
                }

                /* Use a slower lerp when returning to rest vs following cursor */
                const isApproaching = (
                    targetX * targetX + targetY * targetY >
                    nodeOffsets[i][0] * nodeOffsets[i][0] + nodeOffsets[i][1] * nodeOffsets[i][1]
                );
                const lerpK = isApproaching ? LERP_IN : LERP_OUT;
                const lf    = 1 - Math.exp(-lerpK * dt);

                nodeOffsets[i][0] += (targetX - nodeOffsets[i][0]) * lf;
                nodeOffsets[i][1] += (targetY - nodeOffsets[i][1]) * lf;

                return [bx + nodeOffsets[i][0], by + nodeOffsets[i][1]];
            });

            /* ── Update dots (with cursor speed-boost) ──── */
            for (let i = 0; i < dots.length; i++) {
                const d   = dots[i];
                const [ax, ay] = screenPos[d.from];
                const [bx, by] = screenPos[d.to];
                const dotSX = ax + (bx - ax) * d.t;
                const dotSY = ay + (by - ay) * d.t;
                const dotD  = Math.sqrt((csx - dotSX) ** 2 + (csy - dotSY) ** 2);

                /* Accelerate when inside cursor field */
                const boost  = dotD < DOT_FIELD_R
                    ? 1 + (1 - dotD / DOT_FIELD_R) * (DOT_BOOST - 1)
                    : 1;
                dots[i].t += d.spd * boost * dt;

                if (dots[i].t >= 1) {
                    const arrived = dots[i].to;
                    const prev    = dots[i].from;

                    if (arrived === CTA_IDX) {
                        ctaGlow = 1.0;
                        if (rings.length < 3) rings.push({ age: 0 });
                    }
                    pulse.set(edgeKey(prev, arrived), 0);
                    dots[i] = d.chaser
                        ? newChaser(arrived, prev, mx, my)
                        : newDot(arrived, prev, mx, my);
                }
            }

            /* ── Decay pulse & CTA ──────────────────────── */
            for (const [k, age] of pulse) {
                const a = age + dt;
                if (a > 1.3) pulse.delete(k); else pulse.set(k, a);
            }
            if (ctaGlow > 0) ctaGlow = Math.max(0, ctaGlow - dt * 0.32);
            for (let i = rings.length - 1; i >= 0; i--) {
                rings[i].age += dt;
                if (rings[i].age > 2.6) rings.splice(i, 1);
            }

            /* ── Edges (with opacity boost + midpoint bend) */
            for (const [i, j] of EDGES) {
                const key = edgeKey(i, j);
                const p   = pulse.has(key) ? Math.max(0, 1 - pulse.get(key)! / 1.3) : 0;

                const [x1, y1] = screenPos[i];
                const [x2, y2] = screenPos[j];
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                const midD = Math.sqrt((csx - midX) ** 2 + (csy - midY) ** 2);

                /* Opacity ramps up smoothly near cursor */
                const proximity = midD < LINE_FIELD_R
                    ? (1 - midD / LINE_FIELD_R) ** 1.5
                    : 0;
                const alpha = 0.06 + p * 0.10 + proximity * 0.14;

                ctx.beginPath();
                ctx.moveTo(x1, y1);

                if (proximity > 0.05 && midD > 0) {
                    /* Slight bezier bend — control point nudged toward cursor */
                    const bend  = proximity * BEND_MAX;
                    const cpx   = midX + ((csx - midX) / midD) * bend;
                    const cpy   = midY + ((csy - midY) / midD) * bend;
                    ctx.quadraticCurveTo(cpx, cpy, x2, y2);
                } else {
                    ctx.lineTo(x2, y2);
                }

                ctx.strokeStyle = `rgba(86,0,227,${alpha})`;
                ctx.lineWidth   = 0.8 + proximity * 0.5;
                ctx.stroke();
            }

            /* ── Nodes ──────────────────────────────────── */
            for (let i = 0; i < N_NODES; i++) {
                const [x, y] = screenPos[i];
                const isCTA  = i === CTA_IDX;
                const r      = isCTA ? 4 : 2.5;

                const nodeDist  = Math.sqrt((csx - x) ** 2 + (csy - y) ** 2);
                const hoverT    = nodeDist < ATTRACT_R
                    ? Math.max(0, 1 - nodeDist / ATTRACT_R)
                    : 0;
                const dotNear   = dots.some(d => d.from === i || d.to === i);

                /* Glow */
                if (hoverT > 0 || dotNear || (isCTA && ctaGlow > 0)) {
                    const gR = isCTA ? 24 + ctaGlow * 14 : 10 + hoverT * 12;
                    const gA = Math.max(
                        isCTA ? ctaGlow * 0.10 : 0,
                        dotNear ? 0.05 : 0,
                        hoverT * hoverT * 0.10,
                    );
                    const g = ctx.createRadialGradient(x, y, 0, x, y, gR);
                    g.addColorStop(0, `rgba(86,0,227,${gA})`);
                    g.addColorStop(1, 'rgba(86,0,227,0)');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(x, y, gR, 0, Math.PI * 2);
                    ctx.fill();
                }

                /* Node fill — grows and brightens near cursor */
                const nodeR     = r + hoverT * 1.5;
                const nodeAlpha = isCTA
                    ? 0.18 + ctaGlow * 0.22
                    : 0.11 + hoverT * 0.18;
                ctx.beginPath();
                ctx.arc(x, y, nodeR, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(86,0,227,${nodeAlpha})`;
                ctx.fill();
            }

            /* ── CTA ripple rings ────────────────────────── */
            const [ctaX, ctaY] = screenPos[CTA_IDX];
            for (const ring of rings) {
                const progress = ring.age / 2.6;
                ctx.beginPath();
                ctx.arc(ctaX, ctaY, 5 + progress * 38, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(86,0,227,${(1 - progress) * 0.16})`;
                ctx.lineWidth   = 1;
                ctx.stroke();
            }

            /* ── Dots ───────────────────────────────────── */
            for (const d of dots) {
                const [ax, ay] = screenPos[d.from];
                const [bx, by] = screenPos[d.to];
                const x = ax + (bx - ax) * d.t;
                const y = ay + (by - ay) * d.t;

                const dotD  = Math.sqrt((csx - x) ** 2 + (csy - y) ** 2);
                const inField = dotD < DOT_FIELD_R
                    ? (1 - dotD / DOT_FIELD_R)
                    : 0;

                /* Glow brightens inside cursor field */
                const glowA = d.chaser ? 0.18 + inField * 0.12 : 0.13 + inField * 0.09;
                const glowR = d.chaser ? 11 + inField * 5 : 9 + inField * 4;
                const g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
                g.addColorStop(0, `rgba(86,0,227,${glowA})`);
                g.addColorStop(1, 'rgba(86,0,227,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(x, y, glowR, 0, Math.PI * 2);
                ctx.fill();

                /* Core */
                const coreR = (d.chaser ? 2.3 : 2) + inField * 0.8;
                const coreA = (d.chaser ? 0.82 : 0.70) + inField * 0.15;
                ctx.beginPath();
                ctx.arc(x, y, coreR, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(86,0,227,${coreA})`;
                ctx.fill();
            }

            /* ── Soft cursor glow ───────────────────────── */
            if (mouseRef.current.active) {
                const g = ctx.createRadialGradient(csx, csy, 0, csx, csy, CURSOR_R);
                g.addColorStop(0, `rgba(86,0,227,${CURSOR_ALPHA})`);
                g.addColorStop(0.5, `rgba(86,0,227,${CURSOR_ALPHA * 0.4})`);
                g.addColorStop(1, 'rgba(86,0,227,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(csx, csy, CURSOR_R, 0, Math.PI * 2);
                ctx.fill();
            }

            /* ── Bottom fade ────────────────────────────── */
            const fade = ctx.createLinearGradient(0, H * 0.72, 0, H);
            fade.addColorStop(0, 'rgba(255,255,255,0)');
            fade.addColorStop(1, 'rgba(255,255,255,0.85)');
            ctx.fillStyle = fade;
            ctx.fillRect(0, 0, W, H);

            ctx.restore();
            raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[-1]"
        />
    );
};
