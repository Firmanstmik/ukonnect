import { AnimatePresence, motion } from 'framer-motion';
import { CloseCircle, Element3 } from 'iconsax-react';

type MobileMenuToggleProps = {
    open: boolean;
    onClick: () => void;
};

export function MobileMenuToggle({ open, onClick }: MobileMenuToggleProps) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden relative flex items-center justify-center w-11 h-11 shrink-0"
        >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5600e3]/25 via-[#9b4dff]/15 to-[#5600e3]/10 opacity-80" />
            <span className="absolute inset-[1px] rounded-[calc(1rem-1px)] bg-white/85 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,1)]" />
            <span className="absolute inset-0 rounded-2xl ring-1 ring-white/90 shadow-[0_4px_20px_rgba(86,0,227,0.18)]" />
            {!open && (
                <span className="absolute inset-0 rounded-2xl nav-menu-glow pointer-events-none" aria-hidden />
            )}
            <AnimatePresence mode="wait" initial={false}>
                {open ? (
                    <motion.span
                        key="close"
                        initial={{ rotate: -80, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 80, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10"
                    >
                        <CloseCircle size={22} color="#5600e3" variant="Bold" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="menu"
                        initial={{ rotate: 80, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -80, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10"
                    >
                        <Element3 size={22} color="#5600e3" variant="Bulk" />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
