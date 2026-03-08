import React from 'react';
import { motion } from 'framer-motion';
import { MarketingAuditScanner } from './MarketingAuditScanner';
import { BuildIntegrateTerminal } from './BuildIntegrateTerminal';

export const Process = () => {
    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">How It Works</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">How We Build Your AI System</h2>
                <p className="text-slate-500 text-lg">
                    From audit to live automation in three straightforward steps.
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
                        <MarketingAuditScanner />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-6xl font-bold text-primary/20 mb-4 tracking-tighter">01</h3>
                        <h4 className="text-2xl font-bold text-slate-900 mb-3">Marketing & Sales Audit</h4>
                        <p className="text-slate-500 leading-relaxed max-w-md">
                            We map your current marketing and sales stack,
                            identify automation gaps in your lead pipeline,
                            and design an AI system tailored to your revenue goals.
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
                        <h4 className="text-2xl font-bold text-slate-900 mb-3">Build & Integrate</h4>
                        <p className="text-slate-500 leading-relaxed max-w-md">
                            We connect your marketing stack and build AI systems that improve sales, campaigns, automate workflows, and increase conversions.
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
                    <div className="w-full md:w-[45%] bg-[#ecedf1] rounded-3xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] flex flex-col items-center justify-center aspect-[4/3] relative overflow-hidden">
                        {/* Rocket illustration */}
                        <div className="absolute inset-6 bg-[#e2e3e8] rounded-xl flex items-center justify-center relative">
                            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.06]">
                                {[...Array(16)].map((_, i) => <div key={i} className="border border-[#c4c5cc]" />)}
                            </div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-6xl font-bold text-primary/20 mb-4 tracking-tighter">03</h3>
                        <h4 className="text-2xl font-bold text-slate-900 mb-3">Launch & Optimize</h4>
                        <p className="text-slate-500 leading-relaxed max-w-md">
                            Go live with a fully automated growth engine. Your AI systems
                            generate leads, nurture prospects, and drive revenue on autopilot.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
