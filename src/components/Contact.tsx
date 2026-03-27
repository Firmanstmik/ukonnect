import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Calendar, ArrowRight, Phone, Globe, ChevronLeft, Loader2, Target } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import Cal, { getCalApi } from '@calcom/embed-react';
import emailjs from '@emailjs/browser';

import teamPhoto from '../assets/Ukonnect Team Portugal.webp';
import officePhoto from '../assets/Ukonnect Marketing.webp';
import googleAdsIcon from '../assets/Ukonnect Google Ads.webp';
import googleIcon from '../assets/google ukonnect.svg';
import wordpressIcon from '../assets/Wordpress.webp';
import aiIcon from '../assets/AI.webp';
import metaIcon from '../assets/meta.webp';
// ── Cal.com ──
const CAL_USERNAME = 'ukonnect';
const CAL_EVENT_SLUG = 'strategiegesprek';

// ── EmailJS — fill in after setup at emailjs.com ──
const EMAILJS_SERVICE_ID = 'service_ecmrpa5';
const EMAILJS_TEMPLATE_ID = 'template_2ce63ql';
const EMAILJS_PUBLIC_KEY = 'sItgs7yAONr4cjriF';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay },
});

const SERVICES: { label: string; icon?: string; IconComp?: React.ComponentType<{ className?: string }> }[] = [
    { label: 'AI Leadgen', IconComp: Target },
    { label: 'Google Ads', icon: googleAdsIcon },
    { label: 'SEO', icon: googleIcon },
    { label: 'Webdesign', icon: wordpressIcon },
    { label: 'SEO AI', icon: aiIcon },
    { label: 'Social Media', icon: metaIcon },
];

const STAT_VALUES = ['4,000+', '500+', '98%'];

const INPUT_CLS =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-[#ecedf1] text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5600e3]/30 focus:border-[#5600e3]/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]';

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 280, damping: 28 } },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.22 } }),
};

export const Contact = () => {
    const { t, lang } = useLanguage();
    const mapSrc = lang === 'pt'
        ? 'https://maps.google.com/maps?q=Rua+Almirante+Reis+2,+2950-270+Palmela,+Portugal&t=&z=15&ie=UTF8&iwloc=&output=embed'
        : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40000!2d5.2585316!3d52.4064411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c61784ef713eff%3A0xdfb5fa9f5b017ac8!2sMAC%C2%B3PARK%20Creative%20Campus!5e0!3m2!1sen!2snl!4v1';
    const STATS = [
        { value: STAT_VALUES[0], label: t('contact.stat0') },
        { value: STAT_VALUES[1], label: t('contact.stat1') },
        { value: STAT_VALUES[2], label: t('contact.stat2') },
    ];
    const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', website: '' });
    const [selected, setSelected] = useState<string[]>(['AI Leadgen']);
    const [view, setView] = useState<'form' | 'calendar' | 'success'>('form');
    const [direction, setDirection] = useState(1);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);

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

    // Listen for Cal.com booking success
    useEffect(() => {
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
    }, []);

    return (
        <>
            {/* ── Hero Banner ── */}
            <section className="relative pt-40 pb-10 px-6 overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#5600e3]/6 rounded-full blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-[#5600e3]/4 rounded-full blur-[80px] -z-10 pointer-events-none" />
                <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-[#5600e3]/4 rounded-full blur-[80px] -z-10 pointer-events-none" />

                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="text-[#5600e3] font-semibold tracking-wide uppercase text-sm mb-4">
                    {t('contact.label')}
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.07 }}
                    className="text-[42px] md:text-5xl lg:text-[62px] font-bold leading-[1.12] tracking-tight text-slate-900 mb-6 max-w-3xl mx-auto">
                    {t('contact.headingPre')}<br /><span className="text-[#5600e3]">{t('contact.headingHighlight')}</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.14 }}
                    className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto mb-12">
                    {t('contact.sub')}
                </motion.p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {STATS.map(({ value, label }, i) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.22 + i * 0.09 }}
                            className="flex items-center gap-2.5 px-5 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm">
                            <span className="text-[#5600e3] font-bold text-[15px]">{value}</span>
                            <span className="text-slate-500 text-sm">{label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Main Section ── */}
            <section className="px-6 pb-[80px] lg:pb-[120px] max-w-[1300px] mx-auto">
                <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 items-stretch">

                    {/* ── Left ── */}
                    <div className="flex flex-col gap-6 h-full">

                        {/* Map card */}
                        <motion.div {...fadeUp(0)} className="relative rounded-[2.5rem] overflow-hidden flex-1" style={{ minHeight: '280px' }}>
                            <iframe
                                title="Ukonnect office location"
                                src={mapSrc}
                                className="absolute inset-0 w-full h-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                <div className="grid grid-cols-3 gap-3">
                                    <motion.a href="https://wa.me/351927497086" target="_blank" rel="noopener noreferrer"
                                        whileHover={{ scale: 1.06, backgroundColor: 'rgba(37,211,102,0.25)' }} whileTap={{ scale: 0.94 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                        className="flex flex-col items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-2xl px-3 py-3 text-center border border-white/20 cursor-pointer">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        <p className="text-white font-bold text-xs">{t('contact.whatsapp')}</p>
                                    </motion.a>
                                    <motion.a href="mailto:info@ukonnect.nl"
                                        whileHover={{ scale: 1.06, backgroundColor: 'rgba(86,0,227,0.35)' }} whileTap={{ scale: 0.94 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                        className="flex flex-col items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-2xl px-3 py-3 text-center border border-white/20 cursor-pointer">
                                        <Mail className="w-5 h-5 text-white" />
                                        <p className="text-white font-bold text-xs">{t('contact.email')}</p>
                                    </motion.a>
                                    <motion.a href="tel:+351927497086"
                                        whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.94 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                        className="flex flex-col items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-2xl px-3 py-3 text-center border border-white/20 cursor-pointer">
                                        <Phone className="w-5 h-5 text-white" />
                                        <p className="text-white font-bold text-xs">{t('contact.phone')}</p>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Office / team photo card */}
                        <motion.div {...fadeUp(0.08)} className="relative rounded-[2.5rem] overflow-hidden flex-1" style={{ minHeight: '280px' }}>
                            <img
                                src={lang === 'pt' ? teamPhoto : officePhoto}
                                alt={lang === 'pt' ? 'The Ukonnect team' : 'Ukonnect office at MAC³PARK Almere'}
                                className="absolute inset-0 w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                                <div>
                                    <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{t('contact.teamLabel')}</p>
                                    <p className="text-white text-lg font-bold leading-snug">{t('contact.teamTitle')}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-white text-xs font-medium">{t('contact.available')}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right: Shared card with sliding views ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden"
                    >
                        <AnimatePresence mode="wait" custom={direction}>

                            {/* ── Success ── */}
                            {view === 'success' && (
                                <motion.div key="success" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                                    className="p-12 text-center flex flex-col items-center justify-center min-h-[560px]">
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

                            {/* ── Calendar (Cal.com embed) ── */}
                            {view === 'calendar' && (
                                <motion.div key="calendar" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                                    className="flex flex-col min-h-[560px]">

                                    {/* Header */}
                                    <div className="flex items-center gap-3 px-8 pt-8 pb-4">
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

                                    {/* Cal.com embed */}
                                    <div className="flex-1 min-h-[480px]">
                                        <Cal
                                            calLink={`${CAL_USERNAME}/${CAL_EVENT_SLUG}`}
                                            style={{ width: '100%', height: '100%', minHeight: '480px', overflow: 'scroll' }}
                                            config={{}}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Form ── */}
                            {view === 'form' && (
                                <motion.form key="form" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                                    onSubmit={handleSubmit}
                                    className="p-8 lg:p-10 flex flex-col gap-5">
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
                                            <label className="text-sm font-medium text-slate-700">{t('contact.form.company')} <span className="text-slate-400 font-normal">{t('contact.form.optional')}</span></label>
                                            <input type="text" placeholder="Acme Inc." value={form.company}
                                                onChange={e => setForm(s => ({ ...s, company: e.target.value }))} className={INPUT_CLS} />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium text-slate-700">{t('contact.form.phone')} <span className="text-slate-400 font-normal">{t('contact.form.optional')}</span></label>
                                            <div className="relative">
                                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                <input type="tel" placeholder="+1 555 000 0000" value={form.phone}
                                                    onChange={e => setForm(s => ({ ...s, phone: e.target.value }))} className={INPUT_CLS + ' pl-10'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700">{t('contact.form.website')} <span className="text-slate-400 font-normal">{t('contact.form.optional')}</span></label>
                                        <div className="relative">
                                            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                            <input type="url" placeholder="https://yoursite.com" value={form.website}
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
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {SERVICES.map(({ label, icon, IconComp }) => {
                                                const isSelected = selected.includes(label);
                                                return (
                                                    <motion.button key={label} type="button" onClick={() => toggle(label)} whileTap={{ scale: 0.94 }}
                                                        className={`relative flex flex-col items-center gap-2.5 px-3 py-4 rounded-2xl border text-sm font-medium transition-all duration-200 cursor-pointer overflow-hidden
                                                            ${isSelected
                                                                ? 'bg-[#5600e3] border-[#5600e3] text-white shadow-lg shadow-[#5600e3]/30 scale-[1.02]'
                                                                : 'bg-[#ecedf1] border-slate-200 text-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] hover:border-[#5600e3]/40 hover:text-slate-900'}`}>
                                                        {IconComp
                                                            ? <IconComp className={`w-9 h-9 ${isSelected ? 'text-[#5ce1e6]' : 'text-[#5600e3]'}`} />
                                                            : <img src={icon} alt={label} className={`w-9 h-9 object-contain${label === 'SEO AI' && isSelected ? ' drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] brightness-150' : ''}`} />}
                                                        <span className="leading-tight text-center font-bold">{label}</span>
                                                        {isSelected && (
                                                            <motion.div layoutId={`check-${label}`} initial={{ scale: 0 }} animate={{ scale: 1 }}
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
                    </motion.div>
                </div>
            </section>

        </>
    );
};
