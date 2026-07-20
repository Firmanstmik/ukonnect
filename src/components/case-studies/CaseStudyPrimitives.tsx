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

type PlaceholderFrameProps = {
    item: Pick<CaseStudyGalleryItem, 'type' | 'title' | 'overlay'>;
    theme: CaseStudyTheme;
    className?: string;
    interactive?: boolean;
};

export function PlaceholderFrame({ item, theme, className = '', interactive = false }: PlaceholderFrameProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${TYPE_ASPECT[item.type]} ${className}`}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.mesh}`} />
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{ background: `radial-gradient(circle at 30% 20%, ${theme.glow}, transparent 55%)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[9px] tracking-[0.22em] text-white/75 backdrop-blur-md">
                    {item.overlay.toUpperCase()}
                </span>
                <span className="rounded-full border border-white/10 bg-slate-950/35 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-white/55 backdrop-blur-md">
                    PENDING FOUNDER VERIFICATION
                </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{item.type}</p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white">{item.title}</p>
            </div>

            {interactive ? (
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition duration-500 group-hover:ring-white/20" />
            ) : null}
        </div>
    );
}

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
