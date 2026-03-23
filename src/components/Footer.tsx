import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import logo from '../assets/Ukonnect Marketing logo.webp';

export const Footer = () => {
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
                            AI-powered marketing and sales automation systems that drive revenue on autopilot.
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
                        <h4 className="font-semibold text-slate-900 mb-2">Product</h4>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Services</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Integrations</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Case Studies</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-slate-900 mb-2">Company</h4>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">About Us</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Careers</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Blog</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Contact</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-slate-900 mb-2">Legal</h4>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Security</a>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-400 text-sm">© 2026 Ukonnect. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-400 hover:text-slate-900 text-sm transition-colors">Help Center</a>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <a href="#" className="text-slate-400 hover:text-slate-900 text-sm transition-colors">Book a call</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
