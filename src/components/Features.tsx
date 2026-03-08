import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, MessageSquare, Edit3, BarChart } from 'lucide-react';

export const Features = () => {
    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6 bg-slate-50/50 rounded-[3rem]">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Services</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Your AI Growth Engine</h2>
                <p className="text-slate-500 text-lg">
                    Four core systems that automate your marketing and sales pipeline.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Card 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col group overflow-hidden"
                >
                    <div className="flex-1 min-h-[240px] bg-slate-50/50 rounded-2xl mb-8 border border-slate-100 flex items-center justify-center p-8 relative">
                        <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center z-10">
                            <BrainCircuit className="w-8 h-8 text-primary" />
                        </div>
                        {/* Orbits */}
                        <div className="absolute inset-0 flex items-center justify-center -z-0">
                            <div className="w-48 h-48 rounded-full border border-dashed border-slate-300 animate-[spin_20s_linear_infinite]" />
                            <div className="w-32 h-32 absolute rounded-full border border-dashed border-slate-300 animate-[spin_15s_linear_infinite_reverse]" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 block">AI Lead Generation</h3>
                    <p className="text-slate-500 leading-relaxed block">
                        Automatically identify and capture high-intent leads across channels using AI-driven targeting and scoring.
                    </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col group overflow-hidden"
                >
                    <div className="flex-1 min-h-[240px] bg-slate-50/50 rounded-2xl mb-8 border border-slate-100 flex flex-col items-center justify-center p-8 relative">
                        <div className="w-full max-w-[280px] bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
                            <div className="h-3 w-2/3 bg-slate-100 rounded-full mb-3" />
                            <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
                        </div>
                        <div className="w-full max-w-[280px] bg-primary text-white rounded-xl p-4 shadow-sm self-end opacity-90">
                            <div className="h-3 w-2/3 bg-white/20 rounded-full mb-3" />
                            <div className="h-3 w-full bg-white/20 rounded-full" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 block">AI Sales Automation</h3>
                    <p className="text-slate-500 leading-relaxed block">
                        AI agents that qualify leads, handle follow-ups, and book meetings so your sales team focuses on closing.
                    </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col group overflow-hidden"
                >
                    <div className="flex-1 min-h-[240px] bg-slate-50/50 rounded-2xl mb-8 border border-slate-100 flex items-center justify-center p-8 pt-12 relative overflow-hidden">
                        <div className="w-[80%] h-[150%] bg-white border border-slate-200 rounded-t-xl shadow-sm absolute bottom-0 flex flex-col p-6">
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-slate-200" />
                                <div className="w-3 h-3 rounded-full bg-slate-200" />
                                <div className="w-3 h-3 rounded-full bg-slate-200" />
                            </div>
                            <div className="h-6 w-1/3 bg-slate-100 rounded-md mb-4" />
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-slate-100 rounded-full" />
                                <div className="h-2 w-full bg-slate-100 rounded-full" />
                                <div className="h-2 w-4/5 bg-slate-100 rounded-full" />
                            </div>
                            <div className="mt-auto self-end bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                                <Edit3 className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 block">AI Marketing Automation</h3>
                    <p className="text-slate-500 leading-relaxed block">
                        Automated email sequences, ad campaigns, and content workflows that nurture prospects and drive conversions.
                    </p>
                </motion.div>

                {/* Card 4 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col group overflow-hidden"
                >
                    <div className="flex-1 min-h-[240px] bg-slate-50/50 rounded-2xl mb-8 border border-slate-100 flex items-center justify-center p-8 relative overflow-hidden">
                        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 flex gap-4 shadow-sm items-end h-[160px]">
                            <div className="w-1/4 bg-slate-100 rounded flex-1 h-[40%]" />
                            <div className="w-1/4 bg-primary/20 rounded flex-1 h-[70%]" />
                            <div className="w-1/4 bg-primary/40 rounded flex-1 h-[50%]" />
                            <div className="w-1/4 bg-primary rounded flex-1 h-[90%]" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 block">AI Integrations & Workflows</h3>
                    <p className="text-slate-500 leading-relaxed block">
                        Connect your CRM, email, ads, and messaging tools into one unified AI-powered workflow that runs itself.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};
