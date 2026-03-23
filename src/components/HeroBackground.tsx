import React, { useEffect, useRef } from 'react';

/* ── Node positions (normalized 0–1) ──────────────────────────
   Deliberately laid out to resemble a system / workflow diagram  */

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

interface Dot { from: number; to: number; t: number; spd: number }

function newDot(arrived: number, prev: number): Dot {
    const nbrs  = ADJ[arrived];
    const cands = nbrs.length > 1 ? nbrs.filter(n => n !== prev) : nbrs;
    const to    = cands[Math.floor(Math.random() * cands.length)] ?? arrived;
    return { from: arrived, to, t: 0, spd: 0.055 + Math.random() * 0.05 };
}

function edgeKey(i: number, j: number) { return `${Math.min(i, j)}-${Math.max(i, j)}`; }

/* ── Component ────────────────────────────────────────────── */

export const HeroBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef  = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const el = canvasRef.current;
        if (!el) return;

        /* ── Mutable state (lives inside the effect) ─────── */

        const blobs = [
            { x: 0.50, y: 0.10, r: 0.52, vx:  0.0022, vy:  0.0015 },
            { x: 0.14, y: 0.60, r: 0.30, vx: -0.0017, vy:  0.0021 },
            { x: 0.86, y: 0.33, r: 0.37, vx:  0.0020, vy: -0.0017 },
        ];

        /* Spread 5 dots across the graph at random starting positions */
        const STARTS = [0, 5, 9, 13, 19];
        const dots: Dot[] = STARTS.map(n => {
            const to = ADJ[n][Math.floor(Math.random() * ADJ[n].length)] ?? n;
            return { from: n, to, t: Math.random(), spd: 0.055 + Math.random() * 0.05 };
        });

        let ctaGlow = 0;
        const rings: { age: number }[] = [];
        const pulse  = new Map<string, number>();

        let raf: number;
        let last = performance.now();

        /* ── Resize ─────────────────────────────────────── */
        const resize = () => {
            const dpr  = devicePixelRatio || 1;
            el.width   = el.offsetWidth  * dpr;
            el.height  = el.offsetHeight * dpr;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        /* ── Mouse parallax ─────────────────────────────── */
        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            mouseRef.current = {
                x: (e.clientX - r.left) / r.width,
                y: (e.clientY - r.top)  / r.height,
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

            /* Parallax offset from mouse */
            const ox = (mouseRef.current.x - 0.5) * 22;
            const oy = (mouseRef.current.y - 0.5) * 14;
            const sx = (nx: number) => nx * W + ox;
            const sy = (ny: number) => ny * H + oy;

            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, W, H);

            /* ── Gradient blobs ────────────────────────── */
            for (const b of blobs) {
                b.x += b.vx * dt;  b.y += b.vy * dt;
                if (b.x < 0.08 || b.x > 0.92) b.vx *= -1;
                if (b.y < 0.08 || b.y > 0.92) b.vy *= -1;

                /* Blobs parallax at 25% of node parallax for depth */
                const cx = b.x * W + ox * 0.25;
                const cy = b.y * H + oy * 0.25;
                const r  = b.r * Math.max(W, H);
                const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                g.addColorStop(0, 'rgba(86,0,227,0.055)');
                g.addColorStop(1, 'rgba(86,0,227,0)');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, W, H);
            }

            /* ── Update dots ───────────────────────────── */
            for (let i = 0; i < dots.length; i++) {
                dots[i].t += dots[i].spd * dt;
                if (dots[i].t >= 1) {
                    const arrived = dots[i].to;
                    const prev    = dots[i].from;

                    if (arrived === CTA_IDX) {
                        ctaGlow = 1.0;
                        if (rings.length < 3) rings.push({ age: 0 });
                    }
                    pulse.set(edgeKey(prev, arrived), 0);
                    dots[i] = newDot(arrived, prev);
                }
            }

            /* Decay pulse & glow */
            for (const [k, age] of pulse) {
                const a = age + dt;
                if (a > 1.3) pulse.delete(k); else pulse.set(k, a);
            }
            if (ctaGlow > 0) ctaGlow = Math.max(0, ctaGlow - dt * 0.32);
            for (let i = rings.length - 1; i >= 0; i--) {
                rings[i].age += dt;
                if (rings[i].age > 2.6) rings.splice(i, 1);
            }

            /* ── Edges ─────────────────────────────────── */
            for (const [i, j] of EDGES) {
                const key = edgeKey(i, j);
                const p   = pulse.has(key) ? Math.max(0, 1 - pulse.get(key)! / 1.3) : 0;
                ctx.beginPath();
                ctx.moveTo(sx(NP[i][0]), sy(NP[i][1]));
                ctx.lineTo(sx(NP[j][0]), sy(NP[j][1]));
                ctx.strokeStyle = `rgba(86,0,227,${0.06 + p * 0.10})`;
                ctx.lineWidth   = 0.8;
                ctx.stroke();
            }

            /* ── Nodes ─────────────────────────────────── */
            for (let i = 0; i < N_NODES; i++) {
                const x     = sx(NP[i][0]);
                const y     = sy(NP[i][1]);
                const isCTA = i === CTA_IDX;
                const r     = isCTA ? 4 : 2.5;

                /* Soft glow when a dot is near this node */
                const dotNear = dots.some(d => d.from === i || d.to === i);
                const gAmt    = isCTA ? ctaGlow : (dotNear ? 0.5 : 0);

                if (gAmt > 0) {
                    const gR = isCTA ? 24 + ctaGlow * 14 : 11;
                    const gA = isCTA ? ctaGlow * 0.10 : 0.05;
                    const g  = ctx.createRadialGradient(x, y, 0, x, y, gR);
                    g.addColorStop(0, `rgba(86,0,227,${gA})`);
                    g.addColorStop(1, 'rgba(86,0,227,0)');
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(x, y, gR, 0, Math.PI * 2);
                    ctx.fill();
                }

                /* Node fill */
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(86,0,227,${isCTA ? 0.18 + ctaGlow * 0.22 : 0.11})`;
                ctx.fill();
            }

            /* ── CTA ripple rings (expand & fade on arrival) ── */
            for (const ring of rings) {
                const progress = ring.age / 2.6;
                const rr       = 5 + progress * 38;
                const alpha    = (1 - progress) * 0.16;
                ctx.beginPath();
                ctx.arc(sx(NP[CTA_IDX][0]), sy(NP[CTA_IDX][1]), rr, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(86,0,227,${alpha})`;
                ctx.lineWidth   = 1;
                ctx.stroke();
            }

            /* ── Moving dots ───────────────────────────── */
            for (const d of dots) {
                const [ax, ay] = NP[d.from];
                const [bx, by] = NP[d.to];
                const x = sx(ax + (bx - ax) * d.t);
                const y = sy(ay + (by - ay) * d.t);

                /* Soft glow trail */
                const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
                g.addColorStop(0, 'rgba(86,0,227,0.14)');
                g.addColorStop(1, 'rgba(86,0,227,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(x, y, 9, 0, Math.PI * 2);
                ctx.fill();

                /* Dot core */
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(86,0,227,0.72)';
                ctx.fill();
            }

            /* ── Bottom fade so hero blends into page ─── */
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
            className="absolute inset-0 w-full h-full pointer-events-none -z-10"
        />
    );
};
