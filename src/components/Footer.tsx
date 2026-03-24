import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import logo from '../assets/Ukonnect Marketing logo.webp';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-slate-200 mt-[60px] md:mt-[80px] lg:mt-[100px]">
            <div className="max-w-[1300px] mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">

                    {/* Brand Col */}
                    <div className="col-span-2 lg:col-span-2 flex flex-col">
                        <div className="mb-6">
                            <img src={logo} alt="Ukonnect Logo" width="180" className="h-auto" />
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">
                            {t('footer.brand')}
                        </p>
                        <div className="flex gap-4 items-center">
                            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors hover:shadow-sm">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors hover:shadow-sm">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors hover:shadow-sm">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-slate-900 mb-2">{t('footer.product')}</h4>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.productServices')}</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.productIntegrations')}</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.productCaseStudies')}</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-slate-900 mb-2">{t('footer.company')}</h4>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.companyAbout')}</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.companyCareers')}</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.companyBlog')}</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.companyContact')}</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-slate-900 mb-2">{t('footer.legal')}</h4>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.legalPrivacy')}</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.legalTerms')}</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">{t('footer.legalSecurity')}</a>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-sm">{t('footer.copyright')}</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-400 hover:text-slate-900 text-sm transition-colors">{t('footer.helpCenter')}</a>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <a href="#" className="text-slate-400 hover:text-slate-900 text-sm transition-colors">{t('footer.bookCall')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
