import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "What exactly does Ukonnect do?",
        answer: "We build AI-powered marketing and sales automation systems. We connect your CRM, email, ads, and messaging tools into intelligent workflows that generate leads, qualify them, and move them through your pipeline automatically."
    },
    {
        question: "How long does it take to go live?",
        answer: "Most clients have their first AI automations running within 2 to 4 weeks, depending on the number of tools and workflows being integrated."
    },
    {
        question: "Does it work with the tools we already use?",
        answer: "Yes. We integrate with all major CRMs, email platforms, ad networks, and messaging tools including HubSpot, Salesforce, Mailchimp, Google Ads, Meta, and more."
    },
    {
        question: "Do we need technical expertise to use this?",
        answer: "Not at all. We handle the entire setup, integration, and optimization. Your team just uses the dashboards and reaps the results."
    },
    {
        question: "What kind of results can we expect?",
        answer: "Clients typically see a 30-50% increase in qualified leads and significantly lower cost per acquisition within the first 3 months of going live."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[800px] mx-auto px-6">
            <div className="text-center mb-16">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Your Questions, Answered</h2>
                <p className="text-slate-500 text-lg">
                    Everything you need to know about our AI automation systems.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`border border-slate-200 rounded-2xl overflow-hidden bg-white transition-shadow ${isOpen ? 'shadow-md shadow-slate-200' : 'shadow-sm hover:shadow-md hover:shadow-slate-100'}`}
                        >
                            <button
                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                            >
                                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 mt-2 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
