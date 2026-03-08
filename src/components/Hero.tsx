import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// Framer Icon SVG Component
const FramerIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-700 w-3.5 h-3.5">
        <path d="M0 0H14V7H7L0 0Z" fill="currentColor" />
        <path d="M0 7H14V14H7L0 7Z" fill="currentColor" />
        <path d="M7 14V21L0 14H7Z" fill="currentColor" />
    </svg>
);

// Placeholder logos for scrolling animation
const logos = [
    <div key="1" className="flex items-center gap-2 text-slate-400 font-bold text-xl grayscale opacity-70"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg> LOGOIPSUM</div>,
    <div key="2" className="flex items-center gap-2 text-slate-400 font-bold text-xl grayscale opacity-70"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg> LOGO</div>,
    <div key="3" className="flex items-center gap-2 text-slate-400 font-bold text-xl grayscale opacity-70"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /></svg> LOGOIPSUM</div>,
    <div key="4" className="flex items-center gap-2 text-slate-400 font-bold text-xl grayscale opacity-70"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> LOGO</div>,
    <div key="5" className="flex items-center gap-2 text-slate-400 font-bold text-xl grayscale opacity-70"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></svg> LOGOIPSUM</div>,
];

export const Hero = () => {
    return (
        <section className="relative pt-56 pb-[60px] md:pb-[80px] lg:pb-[120px] px-6 flex flex-col items-center text-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#5600e3]/5 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 shadow-sm text-[13px] font-medium text-slate-600 mb-8 bg-white/50 backdrop-blur-sm"
            >
                <FramerIcon />
                <span>AI-Powered Growth Systems</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[44px] md:text-5xl lg:text-[64px] font-bold leading-[1.15] tracking-tight text-slate-900 mb-6 max-w-[1100px]"
            >
                AI Systems That Generate and<br />
                <span className="text-[#5600e3]">Convert More Leads</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[15px] md:text-base text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
                We build AI-powered marketing and sales automations that connect your tools, qualify leads, and close deals on autopilot.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center gap-8"
            >
                <button className="px-8 py-3 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-full text-[15px] font-medium transition-all shadow-sm shadow-[#5600e3]/20 hover:-translate-y-0.5 hover:shadow-md">
                    See plans
                </button>

                {/* Reviews Pill */}
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-sm shadow-slate-200/50 rounded-full p-2 pr-6">
                    <div className="flex -space-x-2.5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-[30px] h-[30px] rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="avatar" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-start justify-center mt-0.5">
                        <div className="flex items-center text-[#5600e3] gap-0.5 mb-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                        <span className="text-[12px] text-slate-600 font-medium">Trusted by <span className="text-[#5600e3]">4000+ companies</span></span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-28 w-full max-w-[1300px] overflow-hidden"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
            >
                {/* Auto-scrolling logo track */}
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                    className="flex w-max gap-16 md:gap-24 items-center"
                >
                    {/* Double the logos to create seamless infinite loop */}
                    {[...logos, ...logos, ...logos].map((logo, idx) => (
                        <div key={idx} className="flex-shrink-0">
                            {logo}
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};
