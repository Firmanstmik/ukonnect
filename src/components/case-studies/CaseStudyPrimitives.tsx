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
            className={`group relative overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-slate-950 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] ${TYPE_ASPECT[item.type]} ${className}`}
        >
            <img
                src={item.imageSrc}
                alt={alt || item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                style={{ objectPosition }}
                loading="lazy"
                decoding="async"
            />

            <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{ background: `radial-gradient(circle at 20% 15%, ${theme.glow}, transparent 50%)` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-slate-950/10" />

            {!compact ? (
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-white/80 backdrop-blur-md">
                        {item.type}
                    </span>
                </div>
            ) : null}

            <div className={`absolute inset-x-0 bottom-0 ${compact ? 'p-2.5' : 'p-5'}`}>
                {!compact ? (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{item.type}</p>
                ) : null}
                <p
                    className={`font-semibold tracking-tight text-white ${compact ? 'text-[11px] leading-tight' : 'mt-1 text-lg'}`}
                >
                    {item.title}
                </p>
            </div>

            {interactive ? (
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition duration-500 group-hover:ring-white/25" />
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
