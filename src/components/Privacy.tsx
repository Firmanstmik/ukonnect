import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export const Privacy = () => {
    const { t } = useLanguage();

    return (
        <section className="pt-36 pb-20 max-w-[800px] mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('privacy.label')}</p>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{t('privacy.heading')}</h1>
                <p className="text-slate-400 text-sm mb-12">Last updated: March 2026</p>

                <div className="space-y-8 text-slate-600">
                    {[
                        {
                            title: '1. Introduction',
                            body: 'Ukonnect ("we", "our", "us") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.',
                        },
                        {
                            title: '2. Information We Collect',
                            body: 'We may collect: your name, email address, phone number, company name, and any other information you voluntarily provide through our contact forms. We also collect usage data through analytics tools to improve our services.',
                        },
                        {
                            title: '3. How We Use Your Information',
                            body: 'We use your information to respond to your inquiries, provide our services, send relevant communications about our offerings (with your consent), and improve our website and services.',
                        },
                        {
                            title: '4. Data Storage & Security',
                            body: 'Your data is stored securely on servers within the European Union, in compliance with GDPR. We apply appropriate technical and organisational measures to protect your data against unauthorised access, alteration, or disclosure.',
                        },
                        {
                            title: '5. Third-Party Services',
                            body: 'We may use third-party services such as CRM platforms, analytics tools, and advertising platforms. These providers operate under their own privacy policies and we ensure compliance with applicable data protection law.',
                        },
                        {
                            title: '6. Your Rights (GDPR)',
                            body: 'You have the right to: access your personal data, correct inaccurate data, request deletion of your data, object to processing, and request data portability. To exercise these rights, contact us at privacy@ukonnect.nl.',
                        },
                        {
                            title: '7. Cookies',
                            body: 'Our website uses essential cookies for basic functionality. Non-essential analytics and marketing cookies (Google Analytics, Microsoft Clarity, Meta Pixel) load only after you accept them via our cookie banner. You can decline non-essential cookies or control cookies through your browser preferences.',
                        },
                        {
                            title: '8. Contact',
                            body: 'For privacy-related questions, contact us at: privacy@ukonnect.nl or Ukonnect, Amsterdam, Netherlands.',
                        },
                    ].map((section) => (
                        <div key={section.title}>
                            <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                            <p className="leading-relaxed">{section.body}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
