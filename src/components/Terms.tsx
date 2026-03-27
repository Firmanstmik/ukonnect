import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export const Terms = () => {
    const { t } = useLanguage();

    return (
        <section className="pt-36 pb-20 max-w-[800px] mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">{t('terms.label')}</p>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{t('terms.heading')}</h1>
                <p className="text-slate-400 text-sm mb-12">Last updated: March 2026</p>

                <div className="space-y-8 text-slate-600">
                    {[
                        {
                            title: '1. Acceptance of Terms',
                            body: 'By accessing or using the Ukonnect website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
                        },
                        {
                            title: '2. Services',
                            body: 'Ukonnect provides AI-powered marketing and sales automation systems for real estate agencies. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.',
                        },
                        {
                            title: '3. Client Obligations',
                            body: 'Clients are responsible for providing accurate information, maintaining the confidentiality of account credentials, and using our services in compliance with applicable laws and regulations.',
                        },
                        {
                            title: '4. Intellectual Property',
                            body: 'All content, technology, and materials provided by Ukonnect remain the intellectual property of Ukonnect. Clients may not reproduce, distribute, or create derivative works without our express written consent.',
                        },
                        {
                            title: '5. Payment Terms',
                            body: 'Payment terms are specified in individual service agreements. Ukonnect operates on a results-based model where applicable — specific terms are outlined in your contract.',
                        },
                        {
                            title: '6. Limitation of Liability',
                            body: 'To the maximum extent permitted by law, Ukonnect shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.',
                        },
                        {
                            title: '7. Termination',
                            body: 'Either party may terminate the service agreement as specified in the individual contract. Upon termination, client data will be handled in accordance with our Privacy Policy.',
                        },
                        {
                            title: '8. Governing Law',
                            body: 'These terms are governed by the laws of the Netherlands. Any disputes shall be resolved in the competent courts of Amsterdam, Netherlands.',
                        },
                        {
                            title: '9. Contact',
                            body: 'For questions about these Terms of Service, contact us at: legal@ukonnect.nl or Ukonnect, Amsterdam, Netherlands.',
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
