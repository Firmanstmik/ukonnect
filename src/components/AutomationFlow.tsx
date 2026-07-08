import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    BadgeCheck,
    CalendarCheck,
    Database,
    Sparkles,
    UserPlus,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import type { TranslationKey, Translate } from '../i18n/translations';
import { EASE_OUT } from './motion';

type FlowStep = {
    icon: LucideIcon;
    labelKey: TranslationKey;
    descKey: TranslationKey;
};

const STEPS: FlowStep[] = [
    { icon: UserPlus, labelKey: 'caseStudies.workflow.step.lead', descKey: 'caseStudies.workflow.step.lead.desc' },
    { icon: Sparkles, labelKey: 'caseStudies.workflow.step.ai', descKey: 'caseStudies.workflow.step.ai.desc' },
    { icon: Database, labelKey: 'caseStudies.workflow.step.crm', descKey: 'caseStudies.workflow.step.crm.desc' },
    { icon: Workflow, labelKey: 'caseStudies.workflow.step.automation', descKey: 'caseStudies.workflow.step.automation.desc' },
    { icon: CalendarCheck, labelKey: 'caseStudies.workflow.step.appointment', descKey: 'caseStudies.workflow.step.appointment.desc' },
    { icon: BadgeCheck, labelKey: 'caseStudies.workflow.step.deal', descKey: 'caseStudies.workflow.step.deal.desc' },
];

function Connector({ index, vertical, reduce }: { index: number; vertical: boolean; reduce: boolean | null }) {
    return (
        <div
            className={
                vertical
                    ? 'relative mx-auto my-1 h-7 w-[2px] overflow-hidden rounded-full bg-slate-200/80'
                    : 'relative my-auto h-[2px] flex-1 overflow-hidden rounded-full bg-slate-200/80'
            }
            aria-hidden
        >
            {!reduce && (
                <motion.span
                    className="absolute rounded-full"
                    style={
                        vertical
                            ? { left: 0, right: 0, height: '60%', background: 'linear-gradient(180deg, transparent, #9b4dff, transparent)' }
                            : { top: 0, bottom: 0, width: '60%', background: 'linear-gradient(90deg, transparent, #9b4dff, transparent)' }
                    }
                    initial={vertical ? { top: '-60%' } : { left: '-60%' }}
                    animate={vertical ? { top: ['-60%', '100%'] } : { left: ['-60%', '100%'] }}
                    transition={{
                        duration: 1.6,
                        delay: index * 0.26,
                        repeat: Infinity,
                        repeatDelay: STEPS.length * 0.34,
                        ease: 'easeInOut',
                    }}
                />
            )}
        </div>
    );
}

export function AutomationFlow({ t, className = '' }: { t: Translate; className?: string }) {
    const reduce = useReducedMotion();

    return (
        <div role="list" className={`flex flex-col lg:flex-row lg:items-start ${className}`}>
            {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === STEPS.length - 1;
                return (
                    <Fragment key={step.labelKey}>
                        <motion.div
                            role="listitem"
                            initial={{ opacity: 0, y: 16, scale: 0.96 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.09, ease: EASE_OUT }}
                            className="group flex flex-1 flex-row items-center gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                        >
                            <div className="relative shrink-0 lg:mb-3">
                                <div
                                    className="absolute -inset-1.5 rounded-2xl bg-primary/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                                    aria-hidden
                                />
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-white shadow-[0_6px_20px_rgba(86,0,227,0.10)] ring-1 ring-white transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] to-[#9b4dff]/[0.08]" aria-hidden />
                                    <Icon className="relative h-6 w-6 text-primary" strokeWidth={1.9} />
                                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                                        {i + 1}
                                    </span>
                                </div>
                            </div>
                            <div className="lg:px-2">
                                <p className="text-sm font-bold tracking-tight text-slate-900">{t(step.labelKey)}</p>
                                <p className="mt-0.5 text-xs leading-snug text-slate-500 lg:mx-auto lg:max-w-[14ch]">
                                    {t(step.descKey)}
                                </p>
                            </div>
                        </motion.div>

                        {!isLast && (
                            <>
                                {/* vertical connector on mobile */}
                                <div className="flex justify-start pl-7 lg:hidden">
                                    <Connector index={i} vertical reduce={reduce} />
                                </div>
                                {/* horizontal connector on desktop, aligned with the icon row */}
                                <div className="hidden self-start lg:flex lg:h-14 lg:flex-1 lg:items-center lg:px-1">
                                    <Connector index={i} vertical={false} reduce={reduce} />
                                </div>
                            </>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}
