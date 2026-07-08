/**
 * Desktop navigation — the founder's original four-item bar, enriched.
 *
 * The bar renders the original top-level items in order (Hoe het werkt ·
 * Diensten · Over ons · Contact). Three are plain links; only "Diensten" opens
 * a premium, full-width glass panel that drops beneath the header. The panel
 * opens on hover intent (with a grace delay so the pointer can travel the gap)
 * and via keyboard.
 *
 * The component is presentational: every link reports its destination through
 * `onSelect`, and the Navbar owns the actual routing / modal behaviour.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight2 } from 'iconsax-react';
import { EASE_OUT } from './motion';
import { NAV_ITEMS, type MegaGroup, type MegaLink, type MegaSection, type MegaTarget } from './megaMenuData';
import type { Translate } from '../i18n/translations';

type MegaMenuProps = {
    t: Translate;
    onSelect: (target: MegaTarget) => void;
};

const panelVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.985 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.32, ease: EASE_OUT, staggerChildren: 0.045, delayChildren: 0.04 },
    },
    exit: { opacity: 0, y: 8, scale: 0.99, transition: { duration: 0.16, ease: EASE_OUT } },
};

const columnVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
};

/** Soft accent-tinted icon tile shared by links and group headers. */
function IconTile({
    Icon,
    accent,
    size = 40,
    iconSize = 20,
}: {
    Icon: MegaLink['Icon'];
    accent: string;
    size?: number;
    iconSize?: number;
}) {
    return (
        <span
            className="relative flex items-center justify-center rounded-xl shrink-0 ring-1 transition-transform duration-300 group-hover/link:scale-[1.06]"
            style={{
                width: size,
                height: size,
                background: `linear-gradient(145deg, ${accent}1f, ${accent}0a)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7)`,
                borderColor: `${accent}26`,
            }}
        >
            <Icon size={iconSize} color={accent} variant="Bulk" />
        </span>
    );
}

function LinkRow({ link, t, onSelect }: { link: MegaLink; t: Translate; onSelect: (target: MegaTarget) => void }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(link.target)}
            className="group/link relative flex w-full items-start gap-3.5 rounded-2xl px-3 py-2.5 text-left transition-colors duration-200 hover:bg-[#5600e3]/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5600e3]/40"
        >
            <IconTile Icon={link.Icon} accent={link.accent} />
            <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                    <span className="text-[15px] font-semibold text-slate-800 transition-colors group-hover/link:text-[#5600e3]">
                        {t(link.titleKey)}
                    </span>
                    <ArrowRight2
                        size={14}
                        color="#5600e3"
                        variant="Linear"
                        className="-translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                    />
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">
                    {t(link.descKey)}
                </span>
            </span>
        </button>
    );
}

function GroupColumn({ group, t, onSelect }: { group: MegaGroup; t: Translate; onSelect: (target: MegaTarget) => void }) {
    return (
        <motion.div variants={columnVariants} className="flex flex-col">
            <div className="mb-2 flex items-center gap-2.5 px-3">
                <IconTile Icon={group.Icon} accent={group.accent} size={30} iconSize={16} />
                <span className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-800">{t(group.labelKey)}</span>
                    <span className="text-[11px] font-medium text-slate-400">{t(group.tagKey)}</span>
                </span>
            </div>
            <div className="flex flex-col gap-0.5">
                {group.links.map(link => (
                    <LinkRow key={link.titleKey} link={link} t={t} onSelect={onSelect} />
                ))}
            </div>
        </motion.div>
    );
}

const FEATURE_STYLES: Record<
    MegaSection['feature']['variant'],
    { gradient: string; ring: string; eyebrow: string; title: string; desc: string; button: string; blob: string; icon: string }
> = {
    platform: {
        gradient: 'linear-gradient(155deg, #2a0a6e 0%, #5600e3 55%, #7b3ff2 100%)',
        ring: 'rgba(155,77,255,0.4)',
        eyebrow: 'text-violet-200',
        title: 'text-white',
        desc: 'text-violet-100/80',
        button: 'bg-white text-[#5600e3] hover:bg-violet-50',
        blob: 'rgba(155,77,255,0.55)',
        icon: '#ffffff',
    },
    customers: {
        gradient: 'linear-gradient(155deg, #1e1533 0%, #3b2170 55%, #5600e3 100%)',
        ring: 'rgba(245,158,11,0.35)',
        eyebrow: 'text-amber-200',
        title: 'text-white',
        desc: 'text-violet-100/80',
        button: 'bg-amber-300 text-slate-900 hover:bg-amber-200',
        blob: 'rgba(245,158,11,0.4)',
        icon: '#fcd34d',
    },
    company: {
        gradient: 'linear-gradient(155deg, #0f172a 0%, #1e293b 55%, #334155 100%)',
        ring: 'rgba(148,163,184,0.35)',
        eyebrow: 'text-slate-300',
        title: 'text-white',
        desc: 'text-slate-300/80',
        button: 'bg-white text-slate-900 hover:bg-slate-100',
        blob: 'rgba(86,0,227,0.4)',
        icon: '#e2e8f0',
    },
};

function FeatureRail({
    feature,
    t,
    onSelect,
}: {
    feature: MegaSection['feature'];
    t: Translate;
    onSelect: (target: MegaTarget) => void;
}) {
    const s = FEATURE_STYLES[feature.variant];
    const { Icon } = feature;
    return (
        <motion.div
            variants={columnVariants}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 ring-1"
            style={{ background: s.gradient, borderColor: s.ring }}
        >
            {/* soft light blobs */}
            <div
                className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full blur-2xl"
                style={{ background: s.blob }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25" />

            <div className="relative">
                <span
                    className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ring-white/25"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                >
                    <Icon size={22} color={s.icon} variant="Bulk" />
                </span>
                <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${s.eyebrow}`}>{t(feature.eyebrowKey)}</p>
                <h4 className={`mt-1.5 text-[19px] font-semibold leading-snug ${s.title}`}>{t(feature.titleKey)}</h4>
                <p className={`mt-2 text-[13.5px] leading-relaxed ${s.desc}`}>{t(feature.descKey)}</p>
            </div>

            <button
                type="button"
                onClick={() => onSelect(feature.ctaTarget)}
                className={`relative mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold shadow-sm transition-all duration-200 hover:gap-3 ${s.button}`}
            >
                {t(feature.ctaKey)}
                <ArrowRight2 size={16} color="currentColor" variant="Linear" />
            </button>
        </motion.div>
    );
}

function Panel({
    section,
    t,
    onSelect,
    onMouseEnter,
    onMouseLeave,
}: {
    section: MegaSection;
    t: Translate;
    onSelect: (target: MegaTarget) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}) {
    const wide = section.groups.length > 1;
    return (
        <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="pointer-events-auto w-full overflow-hidden rounded-[28px] border border-white/70 p-5"
            style={{
                maxWidth: wide ? 1120 : 760,
                background: 'linear-gradient(150deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.9) 45%, rgba(248,245,255,0.94) 100%)',
                backdropFilter: 'blur(24px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                boxShadow:
                    '0 0 0 1px rgba(155,77,255,0.06), 0 24px 60px rgba(86,0,227,0.16), 0 48px 100px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,1)',
            }}
        >
            <div className="grid gap-5" style={{ gridTemplateColumns: 'minmax(0,1fr) 300px' }}>
                <div className={`grid gap-x-4 gap-y-6 ${wide ? 'grid-cols-3' : 'grid-cols-1'}`}>
                    {section.groups.map(group => (
                        <GroupColumn key={group.labelKey} group={group} t={t} onSelect={onSelect} />
                    ))}
                </div>
                <FeatureRail feature={section.feature} t={t} onSelect={onSelect} />
            </div>
        </motion.div>
    );
}

export function MegaMenu({ t, onSelect }: MegaMenuProps) {
    const [active, setActive] = useState<string | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const cancelClose = useCallback(() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
    }, []);
    const open = useCallback((id: string) => {
        cancelClose();
        setActive(id);
    }, [cancelClose]);
    const scheduleClose = useCallback(() => {
        cancelClose();
        closeTimer.current = setTimeout(() => setActive(null), 140);
    }, [cancelClose]);
    const closeNow = useCallback(() => {
        cancelClose();
        setActive(null);
    }, [cancelClose]);

    useEffect(() => () => cancelClose(), [cancelClose]);

    const handleSelect = (target: MegaTarget) => {
        closeNow();
        onSelect(target);
    };

    // The one mega item and its panel; the rest are plain destinations.
    const megaItem = NAV_ITEMS.find(item => item.kind === 'mega');
    const activeSection: MegaSection | null =
        megaItem?.kind === 'mega' && active === megaItem.id ? megaItem.section : null;

    return (
        <div
            ref={wrapperRef}
            className="flex items-center gap-1"
            onMouseLeave={scheduleClose}
            onMouseEnter={cancelClose}
            onKeyDown={e => {
                if (e.key === 'Escape') closeNow();
            }}
            onBlur={e => {
                if (!wrapperRef.current?.contains(e.relatedTarget as Node)) closeNow();
            }}
        >
            {NAV_ITEMS.map(item => {
                // Plain destinations close any open panel on hover, so moving from
                // Diensten across to a sibling link dismisses the mega cleanly.
                if (item.kind === 'link') {
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onMouseEnter={scheduleClose}
                            onFocus={closeNow}
                            onClick={() => handleSelect(item.target)}
                            className="group relative flex items-center rounded-full px-3.5 py-2 text-[16px] font-semibold text-slate-800 transition-colors duration-200 hover:text-[#5600e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5600e3]/40"
                        >
                            <span className="absolute inset-0 rounded-full bg-[#5600e3]/[0.06] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                            <span className="relative">{t(item.labelKey)}</span>
                        </button>
                    );
                }

                const isActive = active === item.id;
                return (
                    <button
                        key={item.id}
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isActive}
                        onMouseEnter={() => open(item.id)}
                        onFocus={() => open(item.id)}
                        onClick={() => (isActive ? closeNow() : open(item.id))}
                        className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[16px] font-semibold transition-colors duration-200 ${
                            isActive ? 'text-[#5600e3]' : 'text-slate-800 hover:text-[#5600e3]'
                        }`}
                    >
                        <span
                            className={`absolute inset-0 rounded-full bg-[#5600e3]/[0.06] transition-opacity duration-200 ${
                                isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        <span className="relative">{t(item.labelKey)}</span>
                        <svg
                            className={`relative h-3 w-3 transition-transform duration-300 ${isActive ? 'rotate-180 text-[#5600e3]' : 'text-slate-400'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                );
            })}

            {/* Backdrop — dims the page beneath the header, leaving the nav bar
                itself crisp. Anchored to the header via `top-full`. */}
            <AnimatePresence>
                {activeSection && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        onClick={closeNow}
                        className="absolute left-0 right-0 top-full z-40 h-screen bg-slate-900/[0.05] backdrop-blur-[1.5px]"
                    />
                )}
            </AnimatePresence>

            {/* Panel layer — container is always mounted (relative to the header)
                so the panel itself can play its enter/exit animation. */}
            <div className="pointer-events-none absolute left-0 right-0 top-full z-50 flex justify-center px-6 pt-3">
                <AnimatePresence mode="wait">
                    {activeSection && (
                        <Panel
                            key={activeSection.id}
                            section={activeSection}
                            t={t}
                            onSelect={handleSelect}
                            onMouseEnter={cancelClose}
                            onMouseLeave={scheduleClose}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
