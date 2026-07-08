import { motion } from 'framer-motion';
import { Verify } from 'iconsax-react';
import { useLanguage } from '../i18n/LanguageContext';

const EASE = [0.22, 1, 0.36, 1] as const;

function BadgeCopy({ text, compact }: { text: string; compact?: boolean }) {
    const parts = text.split(/(\b84\b)/);

    return (
        <span
            className={`font-medium text-slate-600 leading-snug ${
                compact
                    ? 'text-[10.5px] line-clamp-2'
                    : 'text-[11px] sm:text-[12px] lg:text-[14px]'
            }`}
        >
            {parts.map((part, i) =>
                part === '84' ? (
                    <span
                        key={i}
                        className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] via-[#7c3aed] to-[#9b4dff] tabular-nums tracking-tight mx-0.5"
                    >
                        84
                    </span>
                ) : (
                    <span key={i}>{part}</span>
                ),
            )}
        </span>
    );
}

export function HeroTrustBadge() {
    const { t } = useLanguage();

    return (
        <>
            {/* Mobile */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0, ease: EASE }}
                className="order-1 lg:hidden self-center max-w-[min(100%,340px)] w-full"
            >
                <div className="hero-signature-badge mx-auto">
                    <div className="hero-signature-badge-inner flex items-center gap-2 pl-1.5 pr-3 py-2 rounded-full">
                        <LiveChip />
                        <LogoMark size="sm" />
                        <BadgeCopy text={t('hero.badgeMobile')} compact />
                    </div>
                </div>
            </motion.div>

            {/* Desktop */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0, ease: EASE }}
                className="order-1 hidden lg:block lg:col-start-1 lg:row-start-1 self-start max-w-xl"
            >
                <div className="hero-signature-badge inline-flex max-w-full">
                    <div className="hero-signature-badge-inner flex items-center gap-3 pl-2.5 pr-4 py-3 rounded-full">
                        <LiveChip />
                        <LogoMark size="md" />
                        <BadgeCopy text={t('hero.badge')} />
                        <span className="shrink-0 w-px h-5 bg-gradient-to-b from-transparent via-primary/20 to-transparent mx-0.5" />
                        <Verify size={18} color="#5600e3" variant="Bulk" />
                    </div>
                </div>
            </motion.div>
        </>
    );
}

function LiveChip() {
    return (
        <div className="hero-signature-live flex items-center gap-1.5 px-2 py-1 rounded-full shrink-0">
            <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-55" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.65)]" />
            </span>
            <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                Live
            </span>
        </div>
    );
}

function LogoMark({ size }: { size: 'sm' | 'md' }) {
    const dim = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
    const img = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

    return (
        <div className={`${dim} hero-signature-logo rounded-[10px] p-[1.5px] shrink-0`}>
            <div className="w-full h-full rounded-[calc(10px-1.5px)] bg-white/95 flex items-center justify-center">
                <img src="/favicon.png" alt="" className={`${img} object-contain`} aria-hidden />
            </div>
        </div>
    );
}
