import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, PiggyBank, ShieldCheck, Activity, RefreshCw, Handshake } from 'lucide-react';

const benefits = [
    {
        icon: <Workflow className="w-6 h-6" />,
        title: "Pipeline on Autopilot",
        description: "Automate lead capture, nurturing, and follow-ups so your pipeline grows without manual effort."
    },
    {
        icon: <PiggyBank className="w-6 h-6" />,
        title: "Lower Cost Per Lead",
        description: "Reduce acquisition costs by automating repetitive marketing and sales tasks that drain your budget."
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Higher Conversion Rates",
        description: "AI-qualified leads and personalized follow-ups mean more prospects convert into paying customers."
    },
    {
        icon: <Activity className="w-6 h-6" />,
        title: "Real-time Performance Data",
        description: "Track lead flow, conversion rates, and campaign ROI with live dashboards across all channels."
    },
    {
        icon: <RefreshCw className="w-6 h-6" />,
        title: "All Tools Connected",
        description: "Sync your CRM, email platform, ad accounts, and messaging tools into one seamless system."
    },
    {
        icon: <Handshake className="w-6 h-6" />,
        title: "Done-For-You Setup",
        description: "Our team builds, configures, and optimizes your AI systems so you see results without technical complexity."
    }
];

export const Benefits = () => {
    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Benefits</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Why Companies Choose Ukonnect</h2>
                <p className="text-slate-500 text-lg">
                    Revenue-focused AI systems, not generic automation tools.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-[1.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all text-center flex flex-col items-center group cursor-default"
                    >
                        <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            {benefit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {benefit.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
