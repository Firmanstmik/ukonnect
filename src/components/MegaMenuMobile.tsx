/**
 * Mobile navigation — the same four-item model as desktop, sheet-friendly.
 *
 * Plain destinations (Hoe het werkt · Over ons · Contact) render as tappable
 * rows. Only "Diensten" expands into an accordion revealing its grouped links,
 * so the sheet stays compact and the mental model matches desktop.
 */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight2 } from 'iconsax-react';
import { EASE_OUT } from './motion';
import { NAV_ITEMS, type MegaLink, type MegaTarget } from './megaMenuData';
import type { Translate } from '../i18n/translations';

type MegaMenuMobileProps = {
    t: Translate;
    onSelect: (target: MegaTarget) => void;
};

function MobileLink({ link, t, onSelect }: { link: MegaLink; t: Translate; onSelect: (target: MegaTarget) => void }) {
    const { Icon } = link;
    return (
        <button
            type="button"
            onClick={() => onSelect(link.target)}
            className="group flex w-full items-center gap-3 rounded-2xl bg-white/60 px-3 py-2.5 text-left ring-1 ring-white/70 transition-colors hover:bg-white/90"
        >
            <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1"
                style={{
                    background: `linear-gradient(145deg, ${link.accent}1f, ${link.accent}0a)`,
                    borderColor: `${link.accent}26`,
                }}
            >
                <Icon size={17} color={link.accent} variant="Bulk" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-semibold text-slate-800">{t(link.titleKey)}</span>
                <span className="block truncate text-[11.5px] text-slate-500">{t(link.descKey)}</span>
            </span>
            <ArrowRight2 size={15} color="#94a3b8" variant="Linear" className="shrink-0" />
        </button>
    );
}

export function MegaMenuMobile({ t, onSelect }: MegaMenuMobileProps) {
    // Diensten (the only mega item) starts expanded so the services are visible.
    const megaId = NAV_ITEMS.find(item => item.kind === 'mega')?.id ?? null;
    const [open, setOpen] = useState<string | null>(megaId);

    return (
        <div className="flex flex-col gap-2">
            {NAV_ITEMS.map(item => {
                if (item.kind === 'link') {
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onSelect(item.target)}
                            className="flex w-full items-center justify-between rounded-2xl border border-white/70 bg-white/40 px-4 py-3 text-left transition-colors hover:bg-white/70"
                        >
                            <span className="text-[14px] font-semibold text-slate-800">{t(item.labelKey)}</span>
                            <ArrowRight2 size={16} color="#94a3b8" variant="Linear" />
                        </button>
                    );
                }

                const section = item.section;
                const isOpen = open === item.id;
                return (
                    <div key={item.id} className="overflow-hidden rounded-2xl border border-white/70 bg-white/40">
                        <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpen(isOpen ? null : item.id)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left"
                        >
                            <span className="text-[14px] font-semibold text-slate-800">{t(item.labelKey)}</span>
                            <svg
                                className={`h-4 w-4 text-[#5600e3] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: EASE_OUT }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex flex-col gap-3 px-3 pb-3">
                                        {section.groups.map(group => (
                                            <div key={group.labelKey} className="flex flex-col gap-1.5">
                                                <span className="px-1 pt-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
                                                    {t(group.labelKey)}
                                                </span>
                                                {group.links.map(link => (
                                                    <MobileLink key={link.titleKey} link={link} t={t} onSelect={onSelect} />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
