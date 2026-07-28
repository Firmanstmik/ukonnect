import { motion } from 'framer-motion';
import { Play } from 'iconsax-react';
import { useCountUp } from '../hooks/useCountUp';

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
    { value: '250K+', label: 'Qualified Leads Generated' },
    { value: '3.2x', label: 'Average ROI Improvement' },
    { value: '€12M+', label: 'Revenue Influenced for Our Clients' },
    { value: '98%', label: 'Client Satisfaction Rate' },
] as const;

function StatValue({ value, delay }: { value: string; delay: number }) {
    const display = useCountUp(value, 1500, delay * 1000 + 900);
    return (
        <span className="font-display text-[1.35rem] xl:text-[1.75rem] font-extrabold tracking-tight text-[#6C30FF] tabular-nums">
            {display}
        </span>
    );
}

export function HeroStatsBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.82, ease: EASE }}
            className="hidden lg:block relative z-30 -mt-12 xl:-mt-16 w-full"
        >
            <div className="hero-stats-bar rounded-[1.5rem] xl:rounded-[2rem] px-8 py-5 xl:px-10 xl:py-6">
                <div className="flex items-center gap-5 xl:gap-8">
                    <div className="flex flex-1 items-stretch divide-x divide-[#6C30FF]/12 min-w-0">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.88 + i * 0.08, ease: EASE }}
                                className="flex flex-1 flex-col justify-center px-5 xl:px-7 first:pl-0 last:pr-3"
                            >
                                <StatValue value={stat.value} delay={i * 0.08} />
                                <span className="mt-1 text-[9px] xl:text-[10px] font-medium leading-snug text-[#5D708D] max-w-[140px]">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        type="button"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.55, delay: 1.1, ease: EASE }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="hero-stats-video group flex shrink-0 items-center gap-3 rounded-2xl border border-white/90 bg-white/85 px-4 py-2.5 xl:px-5 xl:py-3 backdrop-blur-md transition-shadow hover:shadow-lg hover:shadow-[#6C30FF]/12"
                        aria-label="Watch how we work, 90 second overview"
                    >
                        <span className="relative flex h-11 w-[3.25rem] xl:h-12 xl:w-[3.75rem] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#F5F3FF]">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                                <Play size={14} color="#6C30FF" variant="Bold" className="ml-0.5" />
                            </span>
                        </span>
                        <span className="text-left">
                            <span className="block text-[11px] xl:text-xs font-bold text-[#080D19]">See how we work</span>
                            <span className="block text-[9px] xl:text-[10px] text-[#5D708D] font-medium">Watch 90 sec</span>
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
