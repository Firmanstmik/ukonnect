/**
 * CTAGrowthVisual — capability overview beside the closing CTA.
 * No fabricated client KPIs — qualitative system story only.
 */
import { motion, type Variants } from 'framer-motion';
import type { ReactElement } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { EASE_OUT } from './motion';
import { IconSparkle, IconTrendUp, IconUsers, type IconsaxIconProps } from './icons/HeroIcons';

function CapabilityRow({
    icon: Icon,
    label,
    detail,
    index,
}: {
    icon: (props: IconsaxIconProps) => ReactElement;
    label: string;
    detail: string;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + index * 0.08, duration: 0.5, ease: EASE_OUT }}
            className="flex items-start gap-3 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
        >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-white/10">
                <Icon size={14} />
            </div>
            <div>
                <p className="text-[13px] font-semibold tracking-tight text-white">{label}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-white/45">{detail}</p>
            </div>
        </motion.div>
    );
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function CTAGrowthVisual() {
    const { t } = useLanguage();

    return (
        <div className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-[380px]">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                className="hero-frame-violet rounded-[1.75rem] shadow-[0_24px_70px_-24px_rgba(86,0,227,0.5)]"
            >
                <div className="hero-card-dark hero-gloss-sheen relative overflow-hidden rounded-[calc(1.75rem-1px)] p-5 sm:p-6">
                    <div className="hero-workflow-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />

                    <div className="relative z-10 mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#5600e3] to-[#9b4dff] shadow-lg shadow-primary/40 ring-1 ring-white/20">
                                <IconSparkle size={15} color="#ffffff" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/55">
                                {t('cta.visual.badge')}
                            </span>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-white/[0.06] px-2.5 py-1 text-[9px] font-semibold tracking-wide text-white/50 ring-1 ring-white/10">
                            {t('cta.visual.live')}
                        </span>
                    </div>

                    <div className="relative z-10 mb-6">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
                            {t('cta.visual.statLabel')}
                        </p>
                        <p className="text-[1.35rem] font-bold leading-snug tracking-tight text-white sm:text-[1.5rem]">
                            {t('cta.visual.statCaption')}
                        </p>
                    </div>

                    <div className="relative z-10 space-y-0">
                        <CapabilityRow
                            icon={(p) => <IconUsers {...p} color="#34d399" />}
                            label={t('cta.visual.leadsLabel')}
                            detail={t('cta.visual.cap1')}
                            index={0}
                        />
                        <CapabilityRow
                            icon={(p) => <IconTrendUp {...p} color="#c4b1ff" />}
                            label={t('cta.visual.conversionLabel')}
                            detail={t('cta.visual.cap2')}
                            index={1}
                        />
                        <CapabilityRow
                            icon={(p) => <IconSparkle {...p} color="#e9d5ff" />}
                            label={t('cta.visual.roiLabel')}
                            detail={t('cta.visual.cap3')}
                            index={2}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
