import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AIAuditTool } from './AIAuditTool';
import { BuildIntegrateTerminal } from './BuildIntegrateTerminal';
import { LaunchOptimizeEngine } from './LaunchOptimizeEngine';
import { useLanguage } from '../i18n/LanguageContext';
import { SectionHeadingAccent } from './SectionHeadingAccent';

const TAB_SUFFIX_KEY: Record<string, 'process.annotation.websiteSuffix' | 'process.annotation.marketingSuffix'> = {
    website:   'process.annotation.websiteSuffix',
    marketing: 'process.annotation.marketingSuffix',
};

function useTypewriter(target: string, speed = 45) {
    const [displayed, setDisplayed] = useState(target);
    const prevRef = useRef(target);

    useEffect(() => {
        if (prevRef.current === target) return;
        const prev = prevRef.current;
        prevRef.current = target;

        let frame: ReturnType<typeof setTimeout>;
        let current = prev;

        const erase = () => {
            if (current.length > 0) {
                current = current.slice(0, -1);
                setDisplayed(current);
                frame = setTimeout(erase, speed * 0.6);
            } else {
                retype();
            }
        };

        const retype = () => {
            if (current.length < target.length) {
                current = target.slice(0, current.length + 1);
                setDisplayed(current);
                frame = setTimeout(retype, speed);
            }
        };

        frame = setTimeout(erase, speed);
        return () => clearTimeout(frame);
    }, [target, speed]);

    return displayed;
}

export const Process = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'website' | 'marketing'>('website');
    const suffix = useTypewriter(t(TAB_SUFFIX_KEY[activeTab]));

    return (
        <section id="process" className="scroll-mt-28 py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('process.label')}</p>
                <h2 className="section-title-cinematic mb-6 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                    {t('process.headingPre')}
                    <SectionHeadingAccent>{t('process.headingHighlight')}</SectionHeadingAccent>
                    {t('process.headingPost')}
                </h2>
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
                        <AIAuditTool onTabChange={setActiveTab} />

                        {/* Handwritten annotation — desktop only, left side with downward bow */}
                        <div
                            className="hidden md:block absolute pointer-events-none select-none z-10"
                            style={{ top: 0, left: 0, transform: 'translateX(calc(-100% + 44px)) translateY(calc(-48% - 9px))' }}
                        >
                            <div style={{ transform: 'rotate(-3deg)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                                <p style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    color: '#5600e3',
                                    lineHeight: 1.25,
                                    textAlign: 'left',
                                    margin: 0,
                                    whiteSpace: 'pre',
                                    minWidth: '162px',
                                    minHeight: '50px',
                                    transform: 'translateX(102px)',
                                }}>
                                    {t('process.annotation.free')}{suffix}
                                </p>
                                <svg width="54" height="120" viewBox="0 0 54 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="arrowGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#5600e3" />
                                            <stop offset="100%" stopColor="#9b4dff" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M 42,5 C 18,35 18,78 42,108"
                                        stroke="url(#arrowGrad)" strokeWidth="3.2" fill="none"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M 42,108 L 27,104 M 42,108 L 43,92"
                                        stroke="url(#arrowGrad)" strokeWidth="3.2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>
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
