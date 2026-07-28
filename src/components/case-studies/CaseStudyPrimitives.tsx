import type { ReactNode } from 'react';
import type { CaseStudyGalleryItem, CaseStudyTheme } from './caseStudyExperienceData';

const TYPE_ASPECT: Record<CaseStudyGalleryItem['type'], string> = {
    hero: 'aspect-[16/10]',
    desktop: 'aspect-[16/10]',
    mobile: 'aspect-[9/16] max-h-[320px]',
    dashboard: 'aspect-[16/9]',
    analytics: 'aspect-[16/9]',
    workflow: 'aspect-[16/10]',
};

type GalleryFrameProps = {
    item: CaseStudyGalleryItem;
    theme: CaseStudyTheme;
    className?: string;
    interactive?: boolean;
    compact?: boolean;
    alt?: string;
};

export function GalleryFrame({
    item,
    theme,
    className = '',
    interactive = false,
    compact = false,
    alt = '',
}: GalleryFrameProps) {
    const objectPosition = item.objectPosition ?? 'center top';

    return (
        <div
            className={`group/frame relative overflow-hidden rounded-[1.35rem] bg-slate-950 cs-lux-vignette ${TYPE_ASPECT[item.type]} ${className}`}
        >
            <img
                src={item.imageSrc}
                alt={alt || item.title}
                className="cs-lux-img absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition }}
                loading="lazy"
                decoding="async"
            />

            {/* Soft key light */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.34]"
                style={{
                    background: `radial-gradient(ellipse 70% 55% at 22% 12%, ${theme.glow}, transparent 58%)`,
                }}
            />
            {/* Natural vignette + base read */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(4,9,21,0.12) 0%, transparent 34%, rgba(4,9,21,0.55) 78%, rgba(4,9,21,0.78) 100%)',
                }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
                style={{
                    background:
                        'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.35), transparent 42%)',
                }}
            />

            <div className={`absolute inset-x-0 bottom-0 ${compact ? 'p-2.5' : 'p-5 md:p-7'}`}>
                <p
                    className={`font-semibold tracking-tight text-white/95 ${
                        compact ? 'text-[11px] leading-tight' : 'text-lg leading-snug md:text-[1.35rem]'
                    }`}
                >
                    {item.title}
                </p>
            </div>

            {interactive ? (
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08] transition duration-500 group-hover/frame:ring-white/18" />
            ) : null}
        </div>
    );
}

/** @deprecated Use GalleryFrame — kept for any lingering imports */
export const PlaceholderFrame = GalleryFrame;

export function IllustrativeBadge({ className = '' }: { className?: string }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300/35 bg-amber-50/90 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-700 ${className}`}
        >
            Illustrative Example
        </span>
    );
}

export function DemoBadge({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={`inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 ${className}`}
        >
            {children}
        </span>
    );
}
