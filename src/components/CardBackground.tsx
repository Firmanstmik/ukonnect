import React, { useEffect, useRef } from 'react';

/* ── 6 distinct node layouts (normalized 0–1) ────────────── */

const LAYOUTS: [number, number][][] = [
    // 0 — sparse diagonal, top-left → bottom-right
    [
        [0.06, 0.10], [0.32, 0.06], [0.62, 0.14],
        [0.18, 0.40], [0.50, 0.38], [0.82, 0.32],
        [0.28, 0.72], [0.60, 0.68], [0.90, 0.60],
        [0.45, 0.92], [0.85, 0.90],
    ],
    // 1 — two clusters, left and right
    [
        [0.08, 0.18], [0.22, 0.08], [0.18, 0.38], [0.34, 0.28],
        [0.66, 0.14], [0.80, 0.08], [0.92, 0.28], [0.76, 0.38],
        [0.12, 0.70], [0.30, 0.80],
        [0.70, 0.72], [0.88, 0.82],
    ],
    // 2 — ring-like scatter
    [
        [0.50, 0.06],
        [0.82, 0.20], [0.96, 0.50], [0.82, 0.80], [0.50, 0.94],
        [0.18, 0.80], [0.04, 0.50], [0.18, 0.20],
        [0.50, 0.38], [0.72, 0.55], [0.28, 0.55],
    ],
    // 3 — dense centre, sparse corners
    [
        [0.06, 0.08], [0.94, 0.10],
        [0.30, 0.28], [0.50, 0.20], [0.70, 0.28],
        [0.24, 0.52], [0.50, 0.48], [0.76, 0.52],
        [0.34, 0.74], [0.66, 0.74],
        [0.08, 0.90], [0.92, 0.88],
    ],
    // 4 — top-heavy triangle rows
    [
        [0.20, 0.06], [0.50, 0.06], [0.80, 0.06],
        [0.10, 0.30], [0.35, 0.26], [0.65, 0.26], [0.90, 0.30],
        [0.24, 0.58], [0.50, 0.52], [0.76, 0.58],
        [0.40, 0.82], [0.60, 0.82],
    ],
    // 5 — bottom-left cluster + top-right spread
    [
        [0.06, 0.60], [0.18, 0.46], [0.10, 0.82], [0.28, 0.74],
        [0.44, 0.56], [0.36, 0.88],
        [0.60, 0.10], [0.78, 0.06], [0.92, 0.18],
        [0.70, 0.34], [0.88, 0.42],
        [0.52, 0.30],
    ],
];

/* ── Build edges per layout ──────────────────────────────── */

interface Layout {
    np: [number, number][];
    edges: [number, number][];
    adj: number[][];
}

function buildLayout(np: [number, number][]): Layout {
    const n    = np.length;
    const edges: [number, number][] = [];
    const adj: number[][] = Array.from({ length: n }, () => []);
    const DIST = 0.46, MAX_DEG = 4;
    const deg  = new Array(n).fill(0);
    const cands: [number, number, number][] = [];

    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++) {
            const dx = np[i][0] - np[j][0], dy = np[i][1] - np[j][1];
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d <= DIST) cands.push([i, j, d]);
        }
    cands.sort((a, b) => a[2] - b[2]);

    for (const [i, j] of cands) {
        if (deg[i] < MAX_DEG && deg[j] < MAX_DEG) {
            edges.push([i, j]);
            adj[i].push(j); adj[j].push(i);
            deg[i]++; deg[j]++;
        }
    }
    return { np, edges, adj };
}

const BUILT = LAYOUTS.map(buildLayout);

/* ── Dot helpers ──────────────────────────────────────────── */

interface Dot { from: number; to: number; t: number; spd: number; chaser: boolean }

function newDot(adj: number[][], np: [number, number][], arrived: number, prev: number, cx: number, cy: number): Dot {
    const nbrs  = adj[arrived];
    const cands = nbrs.length > 1 ? nbrs.filter(n => n !== prev) : nbrs;
    const to    = cands[Math.floor(Math.random() * cands.length)] ?? arrived;
    return { from: arrived, to, t: 0, spd: 0.06 + Math.random() * 0.05, chaser: false };
}

function newChaser(adj: number[][], np: [number, number][], arrived: number, prev: number, cx: number, cy: number): Dot {
    const nbrs  = adj[arrived];
    const cands = nbrs.length > 1 ? nbrs.filter(n => n !== prev) : nbrs;
    let best = cands[0] ?? arrived, bestD = Infinity;
    for (const n of cands) {
        const dx = np[n][0] - cx, dy = np[n][1] - cy;
        const d  = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = n; }
    }
    return { from: arrived, to: best, t: 0, spd: 0.11 + Math.random() * 0.04, chaser: true };
}

function edgeKey(i: number, j: number) { return `${Math.min(i, j)}-${Math.max(i, j)}`; }

/* ── Constants ────────────────────────────────────────────── */

const ATTRACT_R    = 90;
const MAX_PULL     = 14;
const LERP_IN      = 5;
const LERP_OUT     = 3.5;
const DOT_FIELD_R  = 65;
const DOT_BOOST    = 1.8;
const LINE_FIELD_R = 75;
const CURSOR_R     = 35;

/* ── Component ────────────────────────────────────────────── */

export const CardBackground: React.FC<{ index: number }> = ({ index }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef  = useRef({ x: 0.5, y: 0.5, active: false });

    useEffect(() => {
        const el = canvasRef.current;
        if (!el) return;

        const { np, edges, adj } = BUILT[index % BUILT.length];
        const N = np.length;

        /* Pick 2 start nodes spread apart */
        const startA = Math.floor(N * 0.2);
        const startB = Math.floor(N * 0.7);

        const dots: Dot[] = [
            { from: startA, to: adj[startA][0] ?? startA, t: Math.random(), spd: 0.06 + Math.random() * 0.05, chaser: false },
            { from: startB, to: adj[startB][0] ?? startB, t: Math.random(), spd: 0.06 + Math.random() * 0.05, chaser: false },
        ];

        const pulse        = new Map<string, number>();
        const nodeOffsets: [number, number][] = np.map(() => [0, 0]);

        let raf: number;
        let last = performance.now();

        const resize = () => {
            const dpr = devicePixelRatio || 1;
            el.width  = el.offsetWidth  * dpr;
            el.height = el.offsetHeight * dpr;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
                mouseRef.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, active: true };
            } else {
                mouseRef.current.active = false;
            }
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        const draw = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            const W   = el.offsetWidth;
            const H   = el.offsetHeight;
            const dpr = devicePixelRatio || 1;
            const ctx = el.getContext('2d');
            if (!ctx) { raf = requestAnimationFrame(draw); return; }

            const { active, x: mx, y: my } = mouseRef.current;
            const csx = mx * W;
            const csy = my * H;

            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, W, H);

            /* ── Magnetic node positions ─────────────────── */
            const screenPos: [number, number][] = np.map((p, i) => {
                const bx = p[0] * W;
                const by = p[1] * H;

                let targetX = 0, targetY = 0;
                if (active) {
                    const dx = csx - bx, dy = csy - by;
                    const d  = Math.sqrt(dx * dx + dy * dy);
                    if (d < ATTRACT_R && d > 0) {
                        const pull = (1 - d / ATTRACT_R) ** 2 * MAX_PULL;
                        targetX = (dx / d) * pull;
                        targetY = (dy / d) * pull;
                    }
                }

                const growing = targetX * targetX + targetY * targetY > nodeOffsets[i][0] ** 2 + nodeOffsets[i][1] ** 2;
                const lf = 1 - Math.exp(-(growing ? LERP_IN : LERP_OUT) * dt);
                nodeOffsets[i][0] += (targetX - nodeOffsets[i][0]) * lf;
                nodeOffsets[i][1] += (targetY - nodeOffsets[i][1]) * lf;

                return [bx + nodeOffsets[i][0], by + nodeOffsets[i][1]];
            });

            /* ── Dots ─────────────────────────────────────── */
            for (let i = 0; i < dots.length; i++) {
                const d   = dots[i];
                const [ax, ay] = screenPos[d.from];
                const [bx, by] = screenPos[d.to];
                const dotSX = ax + (bx - ax) * d.t;
                const dotSY = ay + (by - ay) * d.t;
                const dotD  = Math.sqrt((csx - dotSX) ** 2 + (csy - dotSY) ** 2);
                const boost = active && dotD < DOT_FIELD_R ? 1 + (1 - dotD / DOT_FIELD_R) * (DOT_BOOST - 1) : 1;
                dots[i].t  += d.spd * boost * dt;

                if (dots[i].t >= 1) {
                    pulse.set(edgeKey(d.from, d.to), 0);
                    dots[i] = newDot(adj, np, d.to, d.from, mx, my);
                }
            }

            for (const [k, age] of pulse) {
                const a = age + dt;
                if (a > 1.2) pulse.delete(k); else pulse.set(k, a);
            }

            /* ── Edges ───────────────────────────────────── */
            for (const [i, j] of edges) {
                const key = edgeKey(i, j);
                const p   = pulse.has(key) ? Math.max(0, 1 - pulse.get(key)! / 1.2) : 0;

                const [x1, y1] = screenPos[i];
                const [x2, y2] = screenPos[j];
                const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
                const midD = Math.sqrt((csx - midX) ** 2 + (csy - midY) ** 2);
                const prox = active && midD < LINE_FIELD_R ? (1 - midD / LINE_FIELD_R) ** 1.5 : 0;

                // very low base opacity — only gently brightens on hover / pulse
                const alpha = 0.025 + p * 0.055 + prox * 0.07;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                if (prox > 0.05 && midD > 0) {
                    const bend = prox * 5;
                    ctx.quadraticCurveTo(midX + ((csx - midX) / midD) * bend, midY + ((csy - midY) / midD) * bend, x2, y2);
                } else {
                    ctx.lineTo(x2, y2);
                }
                ctx.strokeStyle = `rgba(86,0,227,${alpha})`;
                ctx.lineWidth   = 0.6 + prox * 0.3;
                ctx.stroke();
            }

            /* ── Nodes ───────────────────────────────────── */
            for (let i = 0; i < N; i++) {
                const [x, y] = screenPos[i];
                const nd = Math.sqrt((csx - x) ** 2 + (csy - y) ** 2);
                const hT = active && nd < ATTRACT_R ? Math.max(0, 1 - nd / ATTRACT_R) : 0;

                ctx.beginPath();
                ctx.arc(x, y, 1.6 + hT * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(86,0,227,${0.06 + hT * 0.10})`;
                ctx.fill();
            }

            /* ── Dot cores ───────────────────────────────── */
            for (const d of dots) {
                const [ax, ay] = screenPos[d.from];
                const [bx, by] = screenPos[d.to];
                const x = ax + (bx - ax) * d.t;
                const y = ay + (by - ay) * d.t;
                const dotD = Math.sqrt((csx - x) ** 2 + (csy - y) ** 2);
                const inF  = active && dotD < DOT_FIELD_R ? (1 - dotD / DOT_FIELD_R) : 0;

                // soft glow
                const gR = 6 + inF * 3;
                const gA = 0.08 + inF * 0.06;
                const g = ctx.createRadialGradient(x, y, 0, x, y, gR);
                g.addColorStop(0, `rgba(86,0,227,${gA})`);
                g.addColorStop(1, 'rgba(86,0,227,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(x, y, gR, 0, Math.PI * 2);
                ctx.fill();

                // core
                ctx.beginPath();
                ctx.arc(x, y, 1.5 + inF * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(86,0,227,${0.45 + inF * 0.20})`;
                ctx.fill();
            }

            /* ── Cursor glow (only when hovering) ────────── */
            if (active) {
                const g = ctx.createRadialGradient(csx, csy, 0, csx, csy, CURSOR_R);
                g.addColorStop(0, 'rgba(86,0,227,0.030)');
                g.addColorStop(0.5, 'rgba(86,0,227,0.012)');
                g.addColorStop(1, 'rgba(86,0,227,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(csx, csy, CURSOR_R, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
            raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);
        return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('mousemove', onMove); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[-1]" />;
};
