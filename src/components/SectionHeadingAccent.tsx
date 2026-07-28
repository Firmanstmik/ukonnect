import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    /** Block display (stacked headline) vs inline (mid-sentence highlight). */
    block?: boolean;
    /** Light sections vs dark (CTA) backgrounds. */
    tone?: 'default' | 'on-dark';
    className?: string;
};

/**
 * Static hero-style accent line — same Caveat script + cyan/violet rail as HeroHighlightRotator,
 * for section headings site-wide.
 */
export function SectionHeadingAccent({ children, block = false, tone = 'default', className = '' }: Props) {
    return (
        <span
            className={`cinematic-headline-accent cinematic-headline-accent-static ${block ? 'cinematic-headline-accent-static--block' : 'cinematic-headline-accent-static--inline'} ${tone === 'on-dark' ? 'cinematic-headline-accent-static--on-dark' : ''} ${className}`}
        >
            <span className="cinematic-headline-rotator-rail cinematic-headline-accent-static-rail" aria-hidden>
                <i />
            </span>
            <span className="cinematic-headline-rotator-text cinematic-headline-accent-static-text">
                {children}
            </span>
        </span>
    );
}

type SectionTitleProps = {
    pre?: string;
    highlight: string;
    post?: string;
    className?: string;
    highlightBlock?: boolean;
};

/** Full h2 pattern: dark pre + script accent + optional post. */
export function SectionTitle({ pre, highlight, post, className = '', highlightBlock = false }: SectionTitleProps) {
    return (
        <h2
            className={`section-title-cinematic text-balance text-3xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-4xl lg:text-[3.05rem] ${className}`}
        >
            {pre ? <span className="cinematic-headline-pre section-title-cinematic-pre">{pre}</span> : null}
            <SectionHeadingAccent block={highlightBlock || Boolean(pre && !post)}>
                {highlight}
            </SectionHeadingAccent>
            {post ? <span className="section-title-cinematic-post">{post}</span> : null}
        </h2>
    );
}
