import { useEffect, useRef } from 'react';

type Dust = {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    drift: number;
    phase: number;
};

export function HeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

        const dust: Dust[] = Array.from({ length: 18 }, (_, index) => ({
            x: ((index * 47) % 101) / 100,
            y: ((index * 73 + 19) % 97) / 100,
            radius: 0.55 + (index % 4) * 0.28,
            alpha: 0.08 + (index % 5) * 0.018,
            drift: 0.0022 + (index % 3) * 0.0007,
            phase: index * 0.83,
        }));

        let raf = 0;
        let visible = true;
        let last = performance.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
            canvas.width = Math.round(canvas.offsetWidth * dpr);
            canvas.height = Math.round(canvas.offsetHeight * dpr);
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const draw = (now: number) => {
            if (!visible) return;
            const context = canvas.getContext('2d');
            if (!context) return;
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            context.clearRect(0, 0, width, height);
            dust.forEach((particle) => {
                particle.y -= particle.drift * dt;
                if (particle.y < -0.02) particle.y = 1.02;
                const x = particle.x * width + Math.sin(now * 0.00018 + particle.phase) * 8;
                const y = particle.y * height;
                const breath = 0.72 + Math.sin(now * 0.0006 + particle.phase) * 0.28;
                context.beginPath();
                context.arc(x, y, particle.radius, 0, Math.PI * 2);
                context.fillStyle = `rgba(108,48,255,${particle.alpha * breath})`;
                context.fill();
            });
            raf = requestAnimationFrame(draw);
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry?.isIntersecting ?? true;
            cancelAnimationFrame(raf);
            if (visible) {
                last = performance.now();
                raf = requestAnimationFrame(draw);
            }
        }, { rootMargin: '120px 0px' });
        observer.observe(canvas);
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            observer.disconnect();
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className="cinematic-background pointer-events-none absolute inset-0 z-[-1]" aria-hidden>
            <span className="cinematic-background-orb cinematic-background-orb--one" />
            <span className="cinematic-background-orb cinematic-background-orb--two" />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <span className="cinematic-background-grain absolute inset-0" />
        </div>
    );
}
