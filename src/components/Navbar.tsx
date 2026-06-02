import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Ukonnect Marketing logo.webp';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

const ContactFormModal = lazy(() =>
    import('./ContactFormModal').then(m => ({ default: m.ContactFormModal }))
);

function renderWithBold(text: string, boldTerms: string[]): React.ReactNode {
    const escaped = boldTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const parts = text.split(new RegExp(`(${escaped.join('|')})`));
    return <>{parts.map((part, i) =>
        boldTerms.includes(part) ? <b key={i} className="font-semibold text-[#5600e3]">{part}</b> : part
    )}</>;
}

const TOPBAR_ITEMS = [
    { key: 'topbar.item1' as const, bold: ['Website'] },
    { key: 'topbar.item2' as const, bold: ['Marketing'] },
    { key: 'topbar.item4' as const, bold: ['3 uur', '3 hours', '3 horas', '3 jam'] },
];

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
    { code: 'nl', flag: '🇳🇱', label: 'NL' },
    { code: 'pt', flag: '🇵🇹', label: 'PT' },
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'id', flag: '🇮🇩', label: 'ID' },
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
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-full hover:bg-white/50 transition-all"
            >
                <Globe className="w-[18px] h-[18px] text-slate-600" />
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
                            className={`w-full flex items-center px-4 py-2.5 text-xl transition-colors text-left ${
                                lang === l.code
                                    ? 'bg-[#5600e3]/8'
                                    : 'hover:bg-white/60'
                            }`}
                        >
                            <span className="leading-none">{l.flag}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, lang } = useLanguage();

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const homePath = `/${lang}`;

    const scrollTo = (id: string) => {
        setMenuOpen(false);
        if (location.pathname !== homePath) {
            navigate(homePath);
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
        { labelKey: 'nav.about' as const, id: null, href: `/${lang}/about` },
        { labelKey: 'nav.contact' as const, id: null, href: `/${lang}/contact` },
    ];

    return (
        <>
        <header className="absolute top-0 left-0 right-0 z-50">
            {/* Top announcement bar — desktop only */}
            <div className="relative hidden lg:flex items-center justify-end gap-4 px-8 md:px-12 lg:px-16 xl:px-24 py-2 bg-white/20 backdrop-blur-[6px]">
                {TOPBAR_ITEMS.map(({ key, bold }, i) => (
                    <React.Fragment key={key}>
                        {i > 0 && <span className="text-[#5600e3] text-[11px] leading-none font-semibold">|</span>}
                        <span className="text-[13px] font-normal text-slate-700">
                            {renderWithBold(t(key), bold)}
                        </span>
                    </React.Fragment>
                ))}
                <span className="text-[#5600e3] text-[11px] leading-none font-semibold">|</span>
                {/* Google review badge */}
                <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    <span className="text-[13px] font-semibold text-slate-800 tracking-tight">4,9</span>
                    <span className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-2.5 h-2.5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        ))}
                    </span>
                    <span className="text-[13px] font-normal text-slate-500">Google</span>
                </span>
                <span className="text-[#5600e3] text-[11px] leading-none font-semibold">|</span>
                <a href="tel:0853331000" className="text-[13px] font-normal text-slate-700 hover:text-[#5600e3] transition-colors">
                    {t('topbar.phone')}
                </a>

                {/* Shockwave bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden">
                    <div className="absolute inset-y-0 bg-[rgba(86,0,227,0.06)] w-full" />
                    <div
                        className="absolute inset-y-0 w-[220px]"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(86,0,227,0.15) 30%, rgba(180,130,255,0.6) 48%, rgba(255,255,255,0.7) 50%, rgba(180,130,255,0.6) 52%, rgba(86,0,227,0.15) 70%, transparent 100%)',
                            animation: 'shockwave 4s linear infinite',
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between w-full px-8 md:px-12 lg:px-16 xl:px-24 pt-4 pb-7 bg-transparent">

                {/* Logo */}
                <div
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => {
                        if (location.pathname === homePath) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                            navigate(homePath);
                        }
                    }}
                >
                    <img src={logo} alt="Ukonnect Logo" className="block lg:hidden w-[140px] h-auto" />
                    <img src={logo} alt="Ukonnect Logo" className="hidden lg:block w-[230px] h-auto" />
                </div>

                {/* Desktop Navigation + Language + CTA */}
                <div className="hidden lg:flex items-center gap-10">
                    {navItems.map(({ labelKey, id, href }) => (
                        <button
                            key={labelKey}
                            onClick={() => href ? navigate(href) : scrollTo(id!)}
                            className="relative group text-[17px] font-semibold text-slate-800 transition-colors bg-transparent border-none cursor-pointer"
                        >
                            {t(labelKey)}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#5600e3] group-hover:w-full transition-all duration-300" />
                        </button>
                    ))}

                    <LanguageSwitcher />

                    <button onClick={() => setModalOpen(true)} className="flex items-center gap-2.5 px-8 py-3.5 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-2xl text-[17px] font-semibold transition-all shadow-sm">
                        <span className="relative flex items-center justify-center w-2 h-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
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
                    <span className={`block h-[2px] w-6 bg-slate-800 rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`block h-[2px] w-6 bg-slate-800 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                    <span className={`block h-[2px] w-6 bg-slate-800 rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-[rgba(236,237,241,0.96)] backdrop-blur-[16px] px-8 py-5 flex flex-col gap-1 border-t border-slate-200/40">
                    {navItems.map(({ labelKey, id, href }) => (
                        <button
                            key={labelKey}
                            onClick={() => {
                                if (href) { setMenuOpen(false); navigate(href); }
                                else scrollTo(id!);
                            }}
                            className="text-left text-[13px] font-semibold text-slate-800 transition-colors bg-transparent border-none cursor-pointer py-3.5 border-b border-slate-200/60 last:border-b-0"
                        >
                            {t(labelKey)}
                        </button>
                    ))}
                    <LanguageSwitcher mobile />
                    <button onClick={() => setModalOpen(true)} className="mt-4 flex items-center justify-center gap-2.5 px-8 py-4 bg-[#5600e3] hover:bg-[#4500b6] text-white rounded-2xl text-[12px] font-semibold transition-all shadow-sm w-full">
                        <span className="relative flex items-center justify-center w-2 h-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        {t('nav.cta')}
                    </button>
                </div>
            </div>
        </header>

        <Suspense fallback={null}>
            <ContactFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </Suspense>
        </>
    );
};
