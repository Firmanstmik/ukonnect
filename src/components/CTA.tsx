import React from 'react';
import { motion } from 'framer-motion';

export const CTA = () => {
    return (
        <section className="py-[60px] md:py-[80px] lg:py-[100px] px-6 max-w-[1300px] mx-auto">
            <div className="relative bg-slate-100 rounded-[3rem] p-12 lg:p-20 text-center overflow-hidden border border-slate-200 shadow-sm">
                {/* Decorative BG element */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
                        Ready to <span className="text-primary">Automate Your Growth?</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
                        Join hundreds of companies using AI to generate more leads
                        and close more deals on autopilot.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-10 py-5 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all shadow-xl shadow-primary/30"
                    >
                        Book a Call
                    </motion.button>
                </div>
            </div>
        </section>
    );
};
