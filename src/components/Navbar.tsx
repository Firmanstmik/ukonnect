import React, { useState, useEffect } from 'react';
import logo from '../assets/Ukonnect Marketing logo.webp';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-300 pointer-events-none">
            <div className="w-full max-w-[1300px] p-[5px] rounded-full transition-all duration-300 bg-transparent pointer-events-auto">
                <div className={`flex items-center justify-between rounded-full p-4 transition-all duration-300 bg-[#ecedf1] shadow-[inset_0_4px_8px_rgba(0,0,0,0.12),inset_0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)]`}>

                    {/* Logo & Brand */}
                    <div className="flex-1 flex items-center cursor-pointer">
                        <img src={logo} alt="Ukonnect Logo" width="215" className="flex-shrink-0 h-auto" />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex flex-shrink-0 items-center gap-10">
                        {['Process', 'Services', 'Benefits', 'About', 'Plans', 'FAQ'].map((item) => (
                            <a key={item} href="#" className="text-[15px] font-medium text-slate-700 hover:text-slate-900 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="flex-1 flex justify-end">
                        <button className="px-8 py-3 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-full text-[15px] font-medium transition-all shadow-sm">
                            Book a call
                        </button>
                    </div>

                </div>
            </div>
        </header>
    );
};
