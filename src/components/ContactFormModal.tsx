import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Calendar, ArrowRight, Phone, Globe, ChevronLeft, Loader2, X, Target } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import emailjs from '@emailjs/browser';

import googleAdsIcon from '../assets/Ukonnect Google Ads.webp';
import googleIcon from '../assets/google ukonnect.svg';
import wordpressIcon from '../assets/Wordpress.webp';
import ukonnectIcon from '../assets/Ukonnect Marketing icon.webp';
import metaIcon from '../assets/meta.webp';
const CAL_USERNAME = 'ukonnect';
const CAL_EVENT_SLUG = 'strategiegesprek';

const EMAILJS_SERVICE_ID = 'service_ecmrpa5';
const EMAILJS_TEMPLATE_ID = 'template_2ce63ql';
const EMAILJS_PUBLIC_KEY = 'sItgs7yAONr4cjriF';

const SERVICES: { label: string; icon?: string; IconComp?: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Leadgen', IconComp: Target },
    { label: 'Google Ads', icon: googleAdsIcon },
    { label: 'SEO', icon: googleIcon },
    { label: 'Webdesign', icon: wordpressIcon },
    { label: 'AI & SEO AI', icon: ukonnectIcon },
    { label: 'Social Media', icon: metaIcon },
];

const INPUT_CLS =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#ecedf1] text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5600e3]/30 focus:border-[#5600e3]/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]';

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 280, damping: 28 } },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.22 } }),
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactFormModal = ({ isOpen, onClose }: Props) => {
    const { t } = useLanguage();
    const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', website: '' });
    const [selected, setSelected] = useState<string[]>(['Leadgen']);
    const [view, setView] = useState<'form' | 'calendar' | 'success'>('form');
    const [direction, setDirection] = useState(1);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const [CalComponent, setCalComponent] = useState<React.ComponentType<any> | null>(null);

    const goTo = (v: 'form' | 'calendar' | 'success', dir: number) => {
        setDirection(dir);
        setView(v);
    };

    const toggle = (label: string) =>
        setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setSendError(null);
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    company: form.company || '—',
                    phone: form.phone || '—',
                    website: form.website || '—',
                    services: selected.length > 0 ? selected.join(', ') : '—',
                    to_email: 'info@ukonnect.nl',
                },
                EMAILJS_PUBLIC_KEY,
            );
            goTo('success', 1);
        } catch {
            setSendError('Something went wrong. Please try again or email us directly.');
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        import('@calcom/embed-react').then(({ default: Cal, getCalApi }) => {
            setCalComponent(() => Cal);
            getCalApi().then((cal) => {
                cal('ui', {
                    theme: 'light',
                    styles: { branding: { brandColor: '#5600e3' } },
                    hideEventTypeDetails: false,
                });
                cal('on', {
                    action: 'bookingSuccessful',
                    callback: () => goTo('success', 1),
                });
            });
        });
    }, [isOpen]);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setForm({ name: '', email: '', company: '', phone: '', website: '' });
            setSelected(['Leadgen']);
            setView('form');
            setDirection(1);
            setSendError(null);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal card */}
                    <motion.div
                        key="modal"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
                    >
                        <div className="relative w-full sm:max-w-lg bg-white border border-slate-200 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[92dvh] sm:max-h-none sm:overflow-hidden pointer-events-auto">

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors sm:top-5 sm:right-5"
                            >
                                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>

                            <AnimatePresence mode="wait" custom={direction}>

                                {/* ── Success ── */}
                                {view === 'success' && (
                                    <motion.div key="success" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                                        className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[320px] sm:min-h-[480px]">
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                                            className="w-20 h-20 rounded-full bg-[#5600e3]/10 flex items-center justify-center mb-7">
                                            <svg className="w-10 h-10 text-[#5600e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('contact.success.title')}</h3>
                                        <p className="text-slate-500 text-base leading-relaxed max-w-xs">
                                            {t('contact.success.body')}
                                        </p>
                                    </motion.div>
                                )}

                                {/* ── Calendar ── */}
                                {view === 'calendar' && (
                                    <motion.div key="calendar" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                                        className="flex flex-col min-h-[420px] sm:min-h-[480px]">
                                        <div className="flex items-center gap-3 px-5 sm:px-8 pt-6 sm:pt-8 pb-4">
                                            <motion.button
                                                onClick={() => goTo('form', -1)}
                                                whileHover={{ scale: 1.08, backgroundColor: 'rgba(86,0,227,0.08)' }}
                                                whileTap={{ scale: 0.94 }}
                                                className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 text-slate-500 hover:text-[#5600e3] transition-colors flex-shrink-0"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </motion.button>
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium">{t('contact.cal.schedule')}</p>
                                                <p className="text-sm font-semibold text-slate-900">{t('contact.cal.pick')}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-h-[360px] sm:min-h-[420px]">
                                            {CalComponent && (
                                                <CalComponent
                                                    calLink={`${CAL_USERNAME}/${CAL_EVENT_SLUG}`}
                                                    style={{ width: '100%', height: '100%', minHeight: '360px', overflow: 'scroll' }}
                                                    config={{}}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── Form ── */}
                                {view === 'form' && (
                                    <motion.form key="form" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                                        onSubmit={handleSubmit}
                                        className="p-5 pt-16 sm:p-8 sm:pt-20 flex flex-col gap-4 sm:gap-5">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-medium text-slate-700">{t('contact.form.name')}</label>
                                                <input required type="text" placeholder="Jane Smith" value={form.name}
                                                    onChange={e => setForm(s => ({ ...s, name: e.target.value }))} className={INPUT_CLS} />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-medium text-slate-700">{t('contact.form.email')}</label>
                                                <input required type="email" placeholder="jane@company.com" value={form.email}
                                                    onChange={e => setForm(s => ({ ...s, email: e.target.value }))} className={INPUT_CLS} />
                                            </div>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-medium text-slate-700">{t('contact.form.company')}</label>
                                                <input required type="text" placeholder="Acme Inc." value={form.company}
                                                    onChange={e => setForm(s => ({ ...s, company: e.target.value }))} className={INPUT_CLS} />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-medium text-slate-700">{t('contact.form.phone')}</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                    <input required type="tel" placeholder="+1 555 000 0000" value={form.phone}
                                                        onChange={e => setForm(s => ({ ...s, phone: e.target.value }))} className={INPUT_CLS + ' pl-10'} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium text-slate-700">{t('contact.form.website')}</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                <input required type="url" placeholder="https://yoursite.com" value={form.website}
                                                    onChange={e => setForm(s => ({ ...s, website: e.target.value }))}
                                                    onBlur={e => {
                                                        const v = e.target.value.trim();
                                                        if (v && !/^https?:\/\//i.test(v)) {
                                                            setForm(s => ({ ...s, website: 'https://' + v }));
                                                        }
                                                    }}
                                                    className={INPUT_CLS + ' pl-10'} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="text-sm font-medium text-slate-700">{t('contact.form.services')}</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {SERVICES.map(({ label, icon, IconComp }) => {
                                                    const isSelected = selected.includes(label);
                                                    return (
                                                        <motion.button key={label} type="button" onClick={() => toggle(label)} whileTap={{ scale: 0.94 }}
                                                            className={`relative flex flex-col items-center gap-2 px-2 py-3 rounded-2xl border text-sm font-medium transition-all duration-200 cursor-pointer overflow-hidden
                                                                ${isSelected
                                                                    ? 'bg-[#5600e3] border-[#5600e3] text-white shadow-lg shadow-[#5600e3]/30 scale-[1.02]'
                                                                    : 'bg-[#ecedf1] border-slate-200 text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] hover:border-[#5600e3]/40 hover:text-slate-900'}`}>
                                                            {IconComp
                                                                ? <IconComp className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-[#5600e3]'}`} />
                                                                : <img src={icon} alt={label} className="w-8 h-8 object-contain" />}
                                                            <span className="leading-tight text-center font-bold text-xs">{label}</span>
                                                            {isSelected && (
                                                                <motion.div layoutId={`modal-check-${label}`} initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                                    className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                                                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                                                                    </svg>
                                                                </motion.div>
                                                            )}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        {sendError && (
                                            <p className="text-sm text-red-500 text-center -mt-1">{t('contact.form.error')}</p>
                                        )}
                                        <motion.button type="submit" disabled={sending} whileHover={sending ? {} : { scale: 1.02 }} whileTap={sending ? {} : { scale: 0.98 }}
                                            className="mt-1 w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#5600e3] hover:bg-[#4500b6] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-full font-semibold text-[15px] transition-all shadow-lg shadow-[#5600e3]/25">
                                            {sending ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" />{t('contact.form.sending')}</>
                                            ) : (
                                                <>{t('contact.form.submit')}<ArrowRight className="w-4 h-4" /></>
                                            )}
                                        </motion.button>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-px bg-slate-200" />
                                            <span className="text-xs text-slate-400 font-medium">{t('contact.form.or')}</span>
                                            <div className="flex-1 h-px bg-slate-200" />
                                        </div>
                                        <motion.button type="button" onClick={() => goTo('calendar', 1)}
                                            whileHover={{ scale: 1.02, borderColor: '#5600e3' }} whileTap={{ scale: 0.98 }}
                                            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                                            className="group w-full flex items-center justify-center gap-2.5 px-8 py-3.5 border border-slate-200 bg-[#ecedf1] rounded-full font-semibold text-[15px] text-slate-700 hover:text-[#5600e3] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
                                            <Calendar className="w-4 h-4 text-[#5600e3]" />
                                            {t('contact.form.bookCall')}
                                        </motion.button>
                                        <p className="text-center text-xs text-slate-400">{t('contact.form.responseTime')}</p>
                                    </motion.form>
                                )}

                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
