import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const plans = [
    {
        name: "Growth",
        price: "$49",
        description: "For teams starting with AI automation.",
        features: [
            "AI Lead Capture Workflows",
            "CRM & Email Integration",
            "Automated Follow-up Sequences",
            "Lead Scoring & Qualification",
            "Performance Dashboard",
            "Dedicated Account Manager"
        ]
    },
    {
        name: "Scale",
        price: "$99",
        description: "Full AI growth engine for your team.",
        features: [
            "Everything in Growth",
            "AI Sales Agents & Chatbots",
            "Multi-Channel Ad Automation",
            "Custom AI Workflow Builder",
            "Advanced Revenue Analytics",
            "Priority Support & SLA"
        ],
        highlight: true
    }
];

export const Pricing = () => {
    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Pricing</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                    Plans That <span className="text-primary">Drive Revenue</span>
                </h2>
                <p className="text-slate-500 text-lg">
                    Choose the AI automation package that fits your growth stage.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className={`flex-1 rounded-3xl p-8 lg:p-10 border ${plan.highlight ? 'border-primary shadow-xl shadow-primary/10' : 'border-slate-200 shadow-lg shadow-slate-200/50'
                            } bg-white flex flex-col`}
                    >
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-4xl lg:text-5xl font-bold text-primary">{plan.price}</span>
                            <span className="text-slate-500 font-medium">/mo</span>
                        </div>
                        <p className="text-slate-500 text-sm mb-8 pb-8 border-b border-slate-100">{plan.description}</p>

                        <ul className="space-y-4 mb-10 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-slate-600 text-sm font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-3.5 rounded-full font-semibold transition-all ${plan.highlight
                                ? 'bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-hover hover:-translate-y-0.5'
                                : 'bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100 hover:-translate-y-0.5'
                            }`}>
                            Get Started
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
