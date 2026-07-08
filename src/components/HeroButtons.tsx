import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { IconArrow } from './icons/HeroIcons';

type HeroPrimaryButtonProps = {
    children: ReactNode;
    onClick: () => void;
    className?: string;
};

type HeroSecondaryButtonProps = {
    children: ReactNode;
    href: string;
};

export function HeroPrimaryButton({ children, onClick, className = '' }: HeroPrimaryButtonProps) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileTap={{ scale: 0.97 }}
            className={`hero-btn-primary group relative w-full sm:w-auto isolate overflow-hidden rounded-2xl px-8 py-4 text-[15px] font-semibold text-white ${className}`}
        >
            <span className="absolute inset-0 bg-gradient-to-r from-[#4500b6] via-[#5600e3] to-[#7c3aed] transition-all duration-500 group-hover:from-[#5600e3] group-hover:via-[#9b4dff] group-hover:to-[#5600e3]" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.22),transparent_55%)]" />
            <span className="hero-btn-shine absolute inset-0 pointer-events-none" />
            <span className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md bg-primary/50 -z-10" />
            <span className="relative z-10 inline-flex items-center justify-center gap-2.5 w-full">
                {children}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 inline-flex">
                    <IconArrow size={18} color="#ffffff" variant="Bold" />
                </span>
            </span>
        </motion.button>
    );
}

export function HeroMobileStickyCta({
    onPrimaryClick,
    primaryLabel,
    secondaryHref,
    secondaryLabel,
}: {
    onPrimaryClick: () => void;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
}) {
    return (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 hero-mobile-sticky-cta px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="max-w-[440px] mx-auto flex flex-col gap-2">
                <HeroPrimaryButton onClick={onPrimaryClick}>{primaryLabel}</HeroPrimaryButton>
                <a
                    href={secondaryHref}
                    className="text-center text-[13px] font-semibold text-slate-500 py-1 active:text-primary transition-colors"
                >
                    {secondaryLabel}
                </a>
            </div>
        </div>
    );
}

export function HeroSecondaryButton({ children, href, className = '' }: HeroSecondaryButtonProps & { className?: string }) {
    return (
        <a
            href={href}
            className={`hero-btn-secondary group relative w-full sm:w-auto isolate overflow-hidden rounded-2xl px-8 py-4 text-[15px] font-semibold text-slate-700 ${className}`}
        >
            <span className="absolute inset-0 bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-2xl transition-all duration-400 group-hover:bg-white group-hover:border-primary/25 group-hover:shadow-[0_8px_32px_rgba(86,0,227,0.12)]" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/[0.04] via-transparent to-[#9b4dff]/[0.06] rounded-2xl" />
            <span className="hero-btn-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100" />
            <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full transition-colors duration-300 group-hover:text-primary">
                {children}
            </span>
        </a>
    );
}
