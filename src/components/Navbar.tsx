import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Ukonnect Marketing logo.webp';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
    { code: 'pt', flag: '🇵🇹', label: 'PT' },
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'nl', flag: '🇳🇱', label: 'NL' },
];

const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
    const { lang, setLang } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const current = LANGUAGES.find(l => l.code === lang)!;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    if (mobile) {
        return (
            <div className="flex items-center gap-2 pt-1 pb-2 border-t border-slate-200/60 mt-1">
                {LANGUAGES.map(l => (
                    <button
                        key={l.code}
                        onClick={() => setLang(l.code)}
                        className={`flex items-center justify-center w-9 h-9 rounded-xl text-lg transition-all ${
                            lang === l.code
                                ? 'bg-[#5600e3]/10 ring-2 ring-[#5600e3]/30'
                                : 'bg-slate-100 hover:bg-slate-200'
                        }`}
                    >
                        {l.flag}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(p => !p)}
                className="flex items-center gap-1 px-2 py-2 rounded-full text-xl hover:bg-white/50 transition-all"
            >
                <span className="leading-none">{current.flag}</span>
                <svg className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute top-full mt-2 right-0 min-w-[56px] rounded-2xl bg-[rgba(236,237,241,0.95)] backdrop-blur-[12px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.10)] border border-white/60 overflow-hidden py-1.5 z-50">
                    {LANGUAGES.map(l => (
                        <button
                            key={l.code}
                            onClick={() => { setLang(l.code); setOpen(false); }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xl transition-colors text-left ${
                                lang === l.code
                                    ? 'bg-[#5600e3]/8'
                                    : 'hover:bg-white/60'
                            }`}
                        >
                            <span className="leading-none">{l.flag}</span>
                            {lang === l.code && (
                                <svg className="w-3.5 h-3.5 text-[#5600e3] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { labelKey: 'nav.howItWorks' as const, id: 'process', href: null },
        { labelKey: 'nav.services' as const, id: 'system-modules', href: null },
        { labelKey: 'nav.about' as const, id: null, href: '/about' },
        { labelKey: 'nav.contact' as const, id: null, href: '/contact' },
    ];

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-300 pointer-events-none">
            <div className="w-full max-w-[1300px] p-[5px] rounded-full transition-all duration-300 bg-transparent pointer-events-auto">
                <div className="flex items-center justify-between rounded-full p-4 transition-all duration-300 bg-[rgba(236,237,241,0.40)] backdrop-blur-[7px] shadow-[inset_0_4px_8px_rgba(0,0,0,0.12),inset_0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)]">

                    {/* Logo */}
                    <div
                        className="flex-1 flex items-center cursor-pointer"
                        onClick={() => {
                            if (location.pathname === '/') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                                navigate('/');
                            }
                        }}
                    >
                        <img src={logo} alt="Ukonnect Logo" className="block lg:hidden w-[140px] h-auto flex-shrink-0" />
                        <img src={logo} alt="Ukonnect Logo" className="hidden lg:block w-[215px] h-auto flex-shrink-0" />
                    </div>

                    {/* Desktop Navigation + Language + CTA */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map(({ labelKey, id, href }) => (
                            <button
                                key={labelKey}
                                onClick={() => href ? navigate(href) : scrollTo(id!)}
                                className="text-[15px] font-medium text-slate-700 hover:text-slate-900 transition-colors bg-transparent border-none cursor-pointer"
                            >
                                {t(labelKey)}
                            </button>
                        ))}

                        <LanguageSwitcher />

                        <button className="flex items-center gap-2.5 px-8 py-3 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-full text-[15px] font-medium transition-all shadow-sm">
                            <span className="relative flex items-center justify-center w-2 h-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-80 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            {t('nav.cta')}
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] bg-transparent border-none cursor-pointer"
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-[2px] w-6 bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`block h-[2px] w-6 bg-slate-700 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                        <span className={`block h-[2px] w-6 bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>

                </div>

                {/* Mobile Dropdown Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="rounded-3xl bg-[rgba(236,237,241,0.85)] backdrop-blur-[12px] shadow-[inset_0_4px_8px_rgba(0,0,0,0.08),inset_0_-2px_4px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.06)] px-6 py-5 flex flex-col gap-1">
                        {navItems.map(({ labelKey, id, href }) => (
                            <button
                                key={labelKey}
                                onClick={() => {
                                    if (href) { setMenuOpen(false); navigate(href); }
                                    else scrollTo(id!);
                                }}
                                className="text-left text-[15px] font-medium text-slate-700 hover:text-slate-900 transition-colors bg-transparent border-none cursor-pointer py-3 border-b border-slate-200/60 last:border-b-0"
                            >
                                {t(labelKey)}
                            </button>
                        ))}
                        <LanguageSwitcher mobile />
                        <button className="mt-3 flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-full text-[15px] font-medium transition-all shadow-sm w-full">
                            <span className="relative flex items-center justify-center w-2 h-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-80 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            {t('nav.cta')}
                        </button>
                    </div>
                </div>

            </div>
        </header>
    );
};
