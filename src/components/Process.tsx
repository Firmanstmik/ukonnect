import React from 'react';
import { motion } from 'framer-motion';
import { AIAuditTool } from './AIAuditTool';
import { BuildIntegrateTerminal } from './BuildIntegrateTerminal';
import { LaunchOptimizeEngine } from './LaunchOptimizeEngine';
import { useLanguage } from '../i18n/LanguageContext';

export const Process = () => {
    const { t } = useLanguage();

    return (
        <section id="process" className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('process.label')}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">{t('process.heading')}</h2>
                <p className="text-slate-500 text-lg">
                    {t('process.sub')}
                </p>
            </div>

            <div className="grid md:grid-cols-1 gap-12 lg:gap-24 relative">
                {/* Step 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center gap-8 lg:gap-16"
                >
                    <div className="w-full md:w-[45%] aspect-[4/3] relative">
                        <AIAuditTool />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-6xl font-bold text-primary/20 mb-4 tracking-tighter">01</h3>
                        <h4 className="text-2xl font-bold text-slate-900 mb-3">{t('process.step1.title')}</h4>
                        <p className="text-slate-500 leading-relaxed max-w-md">
                            {t('process.step1.desc')}
                        </p>
                    </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-16"
                >
                    <div className="w-full md:w-[45%] bg-[#ecedf1] rounded-3xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex aspect-[4/3] relative overflow-hidden">
                        <BuildIntegrateTerminal />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-6xl font-bold text-primary/20 mb-4 tracking-tighter">02</h3>
                        <h4 className="text-2xl font-bold text-slate-900 mb-3">{t('process.step2.title')}</h4>
                        <p className="text-slate-500 leading-relaxed max-w-md">
                            {t('process.step2.desc')}
                        </p>
                    </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center gap-8 lg:gap-16"
                >
                    <div className="w-full md:w-[45%] bg-[#ecedf1] rounded-3xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex aspect-[4/3] relative overflow-hidden">
                        <LaunchOptimizeEngine />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-6xl font-bold text-primary/20 mb-4 tracking-tighter">03</h3>
                        <h4 className="text-2xl font-bold text-slate-900 mb-3">{t('process.step3.title')}</h4>
                        <p className="text-slate-500 leading-relaxed max-w-md">
                            {t('process.step3.desc')}
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
