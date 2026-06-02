import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';
import emailjs from '@emailjs/browser';
import googleAdsIcon from '../assets/Ukonnect Google Ads.webp';
import wordpressIcon from '../assets/Wordpress.webp';

type Tab = 'website' | 'marketing';
type WebsitePhase = 'idle' | 'scanning' | 'results';
type Channel = 'facebook' | 'instagram' | 'google' | 'linkedin' | 'tiktok' | 'snapchat' | 'youtube' | 'shopify';

const CHANNELS: { id: Channel; label: string }[] = [
    { id: 'facebook',  label: 'Facebook' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'google',    label: 'Google' },
    { id: 'linkedin',  label: 'LinkedIn' },
    { id: 'tiktok',    label: 'TikTok' },
    { id: 'snapchat',  label: 'Snapchat' },
    { id: 'youtube',   label: 'YouTube' },
    { id: 'shopify',   label: 'Website audit' },
];

const WEBSITE_DEDUCTIONS = [-18, -14, -12, -11, -11];
const N_STEPS = 5;
const SCAN_STEP_MS = 25;

const EMAILJS_SERVICE_ID = 'service_ecmrpa5';
const EMAILJS_TEMPLATE_ID = 'template_2ce63ql';
const EMAILJS_PUBLIC_KEY = 'sItgs7yAONr4cjriF';

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="#1877F2" className="w-3.5 h-3.5 flex-shrink-0">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0">
        <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
        <circle cx="17.2" cy="6.8" r="1.1" fill="white"/>
        <defs>
            <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFCD00"/>
                <stop offset="35%" stopColor="#FF7A00"/>
                <stop offset="65%" stopColor="#C2185B"/>
                <stop offset="100%" stopColor="#7B1FA2"/>
            </linearGradient>
        </defs>
    </svg>
);

const SnapchatIcon = () => (
    <svg viewBox="0 0 24 24" fill="#FFFC00" className="w-3.5 h-3.5 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.25))' }}>
        <path d="M12.065.001C8.24-.024 5.35 2.165 4.34 5.298c-.27.839-.228 1.72-.206 2.595l.003.263c-.002.1-.049.147-.144.176-.26.08-.528.112-.796.112a2.73 2.73 0 01-.695-.09c-.08-.022-.16-.034-.239-.034-.277 0-.497.15-.567.388-.083.28.082.544.434.706.05.023.104.044.159.063.548.189 1.03.509 1.399.963.105.128.195.27.247.423.088.261-.006.494-.252.64-.376.224-.763.422-1.158.6-.456.204-.701.572-.637.96.071.43.488.726 1.012.726.11 0 .222-.013.33-.039.187-.044.374-.066.563-.066.195 0 .384.025.561.075l.067.019c-.137.979-.41 1.938-.815 2.835-.117.26-.017.563.237.698l.036.018c1.3.628 2.617.952 3.918 1.152.097.245.17.499.22.758.053.278.235.461.494.5.062.009.127.013.193.013.193 0 .392-.047.607-.094.303-.065.644-.138 1.064-.138.42 0 .761.073 1.063.138.215.047.415.094.608.094.066 0 .131-.004.193-.013.259-.039.441-.222.494-.5.05-.259.123-.513.22-.758 1.301-.2 2.618-.524 3.918-1.152l.036-.018c.254-.135.354-.438.237-.698-.405-.897-.678-1.856-.815-2.835l.067-.019c.177-.05.366-.075.561-.075.189 0 .376.022.563.066.108.026.22.039.33.039.524 0 .941-.296 1.012-.726.064-.388-.181-.756-.637-.96-.395-.178-.782-.376-1.158-.6-.246-.146-.34-.379-.252-.64.052-.153.142-.295.247-.423.369-.454.851-.774 1.399-.963.055-.019.109-.04.159-.063.352-.162.517-.426.434-.706-.07-.238-.29-.388-.567-.388-.079 0-.159.012-.239.034a2.73 2.73 0 01-.695.09c-.268 0-.536-.032-.796-.112-.095-.029-.142-.076-.144-.176l.003-.263c.022-.875.064-1.756-.206-2.595C18.584 2.11 15.764-.024 12.065.001z"/>
    </svg>
);

const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0">
        <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
        <path fill="white" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);


const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.77a4.85 4.85 0 01-1.07-.08z"/>
    </svg>
);

const ScanTabIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
        <path d="M4 7V5a1 1 0 011-1h2M13 4h2a1 1 0 011 1v2M16 13v2a1 1 0 01-1 1h-2M7 16H5a1 1 0 01-1-1v-2"/>
        <rect x="7" y="7" width="6" height="6" rx="0.5"/>
    </svg>
);

const MarketingTabIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
        <path d="M3 13l4-5 3 3 3-5 4 4"/>
    </svg>
);

export const AIAuditTool = ({ onTabChange }: { onTabChange?: (tab: Tab) => void } = {}) => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<Tab>('website');

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        onTabChange?.(tab);
    };

    // Website tab state
    const [websitePhase, setWebsitePhase] = useState<WebsitePhase>('idle');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [progress, setProgress] = useState(0);

    // Marketing tab state
    const [marketingStep, setMarketingStep] = useState<1 | 2 | 3>(1);
    const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);
    const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
    const [marketingName, setMarketingName] = useState('');
    const [marketingPhone, setMarketingPhone] = useState('');
    const [marketingEmail, setMarketingEmail] = useState('');
    const [marketingWebsite, setMarketingWebsite] = useState('');
    const [marketingSubmitting, setMarketingSubmitting] = useState(false);
    const [marketingSubmitted, setMarketingSubmitted] = useState(false);

    // Scanner effect — website tab only
    useEffect(() => {
        if (activeTab !== 'website' || websitePhase !== 'scanning') return;

        setProgress(0);
        let current = 0;
        const id = setInterval(() => {
            current += 1;
            setProgress(current);
            if (current >= 100) {
                clearInterval(id);
                setTimeout(() => setWebsitePhase('results'), 300);
            }
        }, SCAN_STEP_MS);
        return () => clearInterval(id);
    }, [websitePhase, activeTab]);

    const isValidUrl = (val: string) => {
        const url = /^https?:\/\//i.test(val) ? val : `https://${val}`;
        try {
            const { hostname } = new URL(url);
            return hostname.includes('.');
        } catch {
            return false;
        }
    };

    const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isValidPhone = (val: string) => /^[\+]?[\d\s\-\(\)]{7,}$/.test(val);

    const urlInvalid = activeTab === 'website' && websiteUrl.trim().length > 0 && !isValidUrl(websiteUrl.trim());
    const phoneInvalid = marketingPhone.trim().length > 0 && !isValidPhone(marketingPhone.trim());
    const emailInvalid = marketingEmail.trim().length > 0 && !isValidEmail(marketingEmail.trim());
    const mWebsiteInvalid = marketingWebsite.trim().length > 0 && !isValidUrl(marketingWebsite.trim());
    const canScan = isValidUrl(websiteUrl.trim());

    const canSubmitMarketing =
        selectedChannels.length > 0 &&
        marketingName.trim().length > 0 &&
        isValidPhone(marketingPhone.trim()) &&
        isValidEmail(marketingEmail.trim()) &&
        isValidUrl(marketingWebsite.trim()) &&
        !marketingSubmitting;

    const toggleChannel = (ch: Channel) =>
        setSelectedChannels(prev =>
            prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
        );

    const toggleFocus = (f: string) =>
        setSelectedFocus(prev =>
            prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
        );

    const submitMarketingAudit = async () => {
        setMarketingSubmitting(true);
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: marketingName,
                    from_email: marketingEmail,
                    company: '—',
                    phone: marketingPhone.trim() || '—',
                    website: marketingWebsite.trim() || '—',
                    services: `[Marketing Audit] Channels: ${selectedChannels.join(', ')} | Focus: ${selectedFocus.join(', ') || 'Not specified'}`,
                    to_email: 'info@ukonnect.nl',
                },
                EMAILJS_PUBLIC_KEY,
            );
            setMarketingSubmitted(true);
        } catch {
            // keep button active so user can retry
        } finally {
            setMarketingSubmitting(false);
        }
    };

    const resetMarketing = () => {
        setMarketingSubmitted(false);
        setMarketingStep(1);
        setMarketingName('');
        setMarketingPhone('');
        setMarketingEmail('');
        setMarketingWebsite('');
        setSelectedChannels([]);
        setSelectedFocus([]);
    };

    const steps    = Array.from({ length: N_STEPS }, (_, i) => t(`auditTool.website.step.${i}` as TranslationKey));
    const issues   = Array.from({ length: N_STEPS }, (_, i) => t(`auditTool.website.issue.${i}` as TranslationKey));
    const focusOptions = Array.from({ length: 4 }, (_, i) => t(`auditTool.marketing.focus.${i}` as TranslationKey));

    return (
        <div className="absolute inset-0 bg-[#ecedf1] rounded-3xl shadow-[0_4px_8px_rgba(0,0,0,0.12),0_-2px_4px_rgba(255,255,255,0.9),0_1px_1px_rgba(255,255,255,0.8)] overflow-hidden flex flex-col">

            {/* ── Full-width tab bar ── */}
            <div className="flex flex-shrink-0">
                <button
                    onClick={() => handleTabChange('website')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-[11px] font-bold tracking-wide transition-all border-r border-white/10 ${
                        activeTab === 'website'
                            ? 'bg-[#5600e3] text-white'
                            : 'bg-[#160a3d] text-white/50 hover:text-white/70'
                    }`}
                >
                    <ScanTabIcon />
                    {t('auditTool.tab.website')}
                </button>
                <button
                    onClick={() => handleTabChange('marketing')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-[11px] font-bold tracking-wide transition-all ${
                        activeTab === 'marketing'
                            ? 'bg-[#5600e3] text-white'
                            : 'bg-[#160a3d] text-white/50 hover:text-white/70'
                    }`}
                >
                    <MarketingTabIcon />
                    {t('auditTool.tab.marketing')}
                </button>
            </div>

            {/* ── Content area ── */}
            <div className="flex-1 min-h-0 flex flex-col p-5">

                {/* ════════════════ WEBSITE TAB ════════════════ */}

                {/* Website — idle */}
                {activeTab === 'website' && websitePhase === 'idle' && (
                    <div className="flex flex-col h-full">
                        <div className="mt-5 flex-shrink-0 text-center">
                            <h3 className="text-[22px] font-black text-slate-900 leading-tight tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9333ea]">AI</span>
                                {t('auditTool.website.headingSuffix')}
                            </h3>
                            <p className="text-[11px] text-slate-500 mt-0.5">{t('auditTool.website.subheading')}</p>
                        </div>

                        <div className="flex-1 flex flex-col justify-center pb-12">
                            <div className="w-[78%] mx-auto flex flex-col gap-2.5">
                                <div>
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block text-center">Website URL</label>
                                    <input
                                        type="text"
                                        value={websiteUrl}
                                        onChange={e => setWebsiteUrl(e.target.value)}
                                        placeholder="https://"
                                        onKeyDown={e => e.key === 'Enter' && canScan && setWebsitePhase('scanning')}
                                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white/70 border text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-all ${
                                            urlInvalid
                                                ? 'border-red-300 focus:ring-red-200'
                                                : 'border-white/80 focus:ring-[#5600e3]/20'
                                        }`}
                                    />
                                </div>
                                <button
                                    onClick={() => setWebsitePhase('scanning')}
                                    disabled={!canScan}
                                    className="w-full py-3 rounded-2xl bg-[#5600e3] hover:bg-[#4500b6] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-[0_4px_12px_rgba(86,0,227,0.35)] hover:shadow-[0_6px_16px_rgba(86,0,227,0.45)]"
                                >
                                    {t('auditTool.website.scanBtn')} →
                                </button>
                            </div>
                            <div className="flex justify-center gap-4 pt-8">
                                {([0, 1, 2] as const).map(i => (
                                    <span key={i} className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                        {t(`auditTool.website.badge.${i}` as TranslationKey)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Website — scanning */}
                {activeTab === 'website' && websitePhase === 'scanning' && (
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex items-center justify-between flex-shrink-0">
                            <p className="text-xs font-semibold text-[#5600e3] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#5600e3] animate-pulse flex-shrink-0" />
                                {t('auditTool.website.scanning')}
                            </p>
                            <span className="text-xs font-bold text-slate-400 tabular-nums">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.10)] flex-shrink-0">
                            <div
                                className="h-full bg-gradient-to-r from-[#5600e3] to-[#9333ea] rounded-full"
                                style={{ width: `${progress}%`, transition: 'width 60ms linear' }}
                            />
                        </div>
                        <div className="flex flex-col gap-2.5 flex-1">
                            {steps.map((step, i) => {
                                const visible = progress >= i * 20;
                                const done    = progress >= (i + 1) * 20;
                                return (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                            done
                                                ? 'bg-green-500 shadow-[0_2px_6px_rgba(34,197,94,0.35)]'
                                                : 'bg-white border border-slate-200'
                                        }`}>
                                            {done ? (
                                                <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
                                                    <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ) : (
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                                            )}
                                        </div>
                                        <span className={`text-xs font-medium transition-colors ${done ? 'text-slate-800' : 'text-slate-400'}`}>{step}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Website — results */}
                {activeTab === 'website' && websitePhase === 'results' && (
                    <div className="flex flex-col gap-3 flex-1">
                        <div className="flex items-center gap-3 bg-white/50 rounded-2xl p-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] flex-shrink-0">
                            <div className="flex items-baseline gap-1 flex-shrink-0">
                                <span className="text-4xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-500">34</span>
                                <span className="text-base font-bold text-slate-300">/100</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                                    <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full" style={{ width: '34%' }} />
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium truncate">{t('auditTool.website.scoreLabel')}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            {issues.map((issue, i) => (
                                <div key={i} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                                        <span className="text-xs text-slate-600 truncate">{issue}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-red-500 flex-shrink-0 tabular-nums">{WEBSITE_DEDUCTIONS[i]} pts</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                            <button
                                onClick={() => navigate(`/${lang}/contact`)}
                                className="w-full py-2.5 rounded-2xl bg-[#5600e3] hover:bg-[#4500b6] text-white text-xs font-bold transition-all shadow-[0_4px_12px_rgba(86,0,227,0.30)]"
                            >
                                {t('auditTool.cta')} →
                            </button>
                            <button
                                onClick={() => { setWebsitePhase('idle'); setWebsiteUrl(''); }}
                                className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors text-center py-0.5"
                            >
                                {t('auditTool.website.reset')}
                            </button>
                        </div>
                    </div>
                )}

                {/* ════════════════ MARKETING TAB ════════════════ */}

                {/* Marketing — success */}
                {activeTab === 'marketing' && marketingSubmitted && (
                    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center">
                        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-base font-black text-slate-900 mb-1">{t('auditTool.marketing.success.title')}</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                                {t('auditTool.marketing.success.body')}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate(`/${lang}/contact`)}
                            className="w-full max-w-[200px] py-2.5 rounded-2xl bg-[#5600e3] hover:bg-[#4500b6] text-white text-xs font-bold transition-all shadow-[0_4px_12px_rgba(86,0,227,0.30)]"
                        >
                            {t('auditTool.marketing.bookCall')} →
                        </button>
                        <button
                            onClick={resetMarketing}
                            className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {t('auditTool.marketing.reset')}
                        </button>
                    </div>
                )}

                {/* Marketing — step wizard */}
                {activeTab === 'marketing' && !marketingSubmitted && (
                    <div className="flex flex-col h-full">

                        {/* Step header */}
                        <div className="mt-0.5 flex-shrink-0">
                            {/* Progress bar */}
                            <style>{`
                                @keyframes energy-glow {
                                    0%, 100% { filter: brightness(0.9) saturate(1); }
                                    50% { filter: brightness(1.3) saturate(1.4); }
                                }
                                @keyframes energy-shimmer {
                                    0% { transform: translateX(-100%); }
                                    60%, 100% { transform: translateX(500%); }
                                }
                                .energy-fill { animation: energy-glow 1.6s ease-in-out infinite; }
                                .energy-shimmer { animation: energy-shimmer 1.8s ease-in-out infinite; }
                            `}</style>
                            <div className="relative h-1.5 w-full rounded-full bg-slate-200 overflow-hidden mb-1.5">
                                <div
                                    className="energy-fill absolute inset-y-0 left-0 rounded-full overflow-hidden"
                                    style={{
                                        width: `${(marketingStep / 3) * 100}%`,
                                        background: 'linear-gradient(90deg, #5600e3, #9333ea)',
                                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                >
                                    <div
                                        className="energy-shimmer absolute inset-y-0 w-1/3"
                                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
                                    />
                                </div>
                            </div>
                            {/* Step label */}
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-bold text-[#5600e3] uppercase tracking-wider">
                                    {t('auditTool.marketing.stepLabel').replace('{n}', String(marketingStep))}
                                </p>
                                <p className="text-[10px] text-slate-400">
                                    {marketingStep === 1 && t('auditTool.marketing.channelsLabel')}
                                    {marketingStep === 2 && t('auditTool.marketing.focusLabel')}
                                    {marketingStep === 3 && t('auditTool.marketing.detailsLabel')}
                                </p>
                            </div>
                        </div>

                        {/* Step content */}
                        <div className="flex-1 flex flex-col justify-center pb-2">

                            {/* Step 1 — Channels */}
                            {marketingStep === 1 && (
                                <div className="flex flex-col gap-4">
                                    <div className="text-center">
                                        <h3 className="text-[17px] font-black text-slate-900 leading-tight">{t('auditTool.marketing.channelsHeading')}</h3>
                                        <p className="text-[11px] text-slate-500 mt-0.5">{t('auditTool.marketing.selectAll')}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {CHANNELS.map(ch => {
                                            const sel = selectedChannels.includes(ch.id);
                                            return (
                                                <button
                                                    key={ch.id}
                                                    onClick={() => toggleChannel(ch.id)}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-[12px] font-semibold transition-all border ${
                                                        sel
                                                            ? 'bg-[#5600e3]/10 border-[#5600e3]/30 text-[#5600e3]'
                                                            : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white/90'
                                                    }`}
                                                >
                                                    {ch.id === 'facebook'  && <FacebookIcon />}
                                                    {ch.id === 'instagram' && <InstagramIcon />}
                                                    {ch.id === 'google'    && <img src={googleAdsIcon} alt="" className="w-3.5 h-3.5 object-contain flex-shrink-0" />}
                                                    {ch.id === 'linkedin'  && <LinkedInIcon />}
                                                    {ch.id === 'tiktok'    && <TikTokIcon />}
                                                    {ch.id === 'snapchat'  && <SnapchatIcon />}
                                                    {ch.id === 'youtube'   && <YouTubeIcon />}
                                                    {ch.id === 'shopify'   && <img src={wordpressIcon} alt="" className="w-3.5 h-3.5 object-contain flex-shrink-0" />}
                                                    {ch.label}
                                                    {sel && (
                                                        <span className="ml-auto w-3.5 h-3.5 rounded-full bg-[#5600e3] flex items-center justify-center flex-shrink-0">
                                                            <svg viewBox="0 0 10 10" fill="none" className="w-2 h-2">
                                                                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <button
                                        onClick={() => setMarketingStep(2)}
                                        disabled={selectedChannels.length === 0}
                                        className="w-full py-3 rounded-2xl bg-[#5600e3] hover:bg-[#4500b6] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-[0_4px_12px_rgba(86,0,227,0.35)]"
                                    >
                                        {t('auditTool.marketing.next')} →
                                    </button>
                                </div>
                            )}

                            {/* Step 2 — Focus areas */}
                            {marketingStep === 2 && (
                                <div className="w-[78%] mx-auto flex flex-col gap-4">
                                    <div className="text-center">
                                        <h3 className="text-[17px] font-black text-slate-900 leading-tight">{t('auditTool.marketing.focusHeading')}</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {focusOptions.map(f => {
                                            const sel = selectedFocus.includes(f);
                                            return (
                                                <button
                                                    key={f}
                                                    onClick={() => toggleFocus(f)}
                                                    className={`flex items-center justify-between px-3 py-3 rounded-2xl text-[11px] font-semibold transition-all border text-left leading-tight ${
                                                        sel
                                                            ? 'bg-[#5600e3]/10 border-[#5600e3]/30 text-[#5600e3]'
                                                            : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white/90'
                                                    }`}
                                                >
                                                    {f}
                                                    {sel && (
                                                        <span className="w-3.5 h-3.5 rounded-full bg-[#5600e3] flex items-center justify-center flex-shrink-0">
                                                            <svg viewBox="0 0 10 10" fill="none" className="w-2 h-2">
                                                                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setMarketingStep(1)}
                                            className="flex-shrink-0 px-4 py-3 rounded-2xl bg-white/60 border border-slate-200 text-slate-600 text-sm font-bold transition-all hover:bg-white/90"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={() => setMarketingStep(3)}
                                            className="flex-1 py-3 rounded-2xl bg-[#5600e3] hover:bg-[#4500b6] text-white text-sm font-bold transition-all shadow-[0_4px_12px_rgba(86,0,227,0.35)]"
                                        >
                                            {t('auditTool.marketing.next')} →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3 — Contact details */}
                            {marketingStep === 3 && (
                                <div className="w-[78%] mx-auto flex flex-col gap-2">
                                    <div className="text-center">
                                        <h3 className="text-[17px] font-black text-slate-900 leading-tight">{t('auditTool.marketing.detailsHeading')}</h3>
                                    </div>
                                    <input
                                        type="text"
                                        value={marketingName}
                                        onChange={e => setMarketingName(e.target.value)}
                                        placeholder={t('auditTool.marketing.nameLabel')}
                                        disabled={marketingSubmitting}
                                        className="w-full px-3.5 py-2 rounded-xl bg-white/70 border border-white/80 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5600e3]/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] disabled:opacity-60"
                                    />
                                    <input
                                        type="tel"
                                        value={marketingPhone}
                                        onChange={e => setMarketingPhone(e.target.value)}
                                        placeholder={t('auditTool.marketing.phoneLabel')}
                                        disabled={marketingSubmitting}
                                        className={`w-full px-3.5 py-2 rounded-xl bg-white/70 border text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] disabled:opacity-60 transition-all ${phoneInvalid ? 'border-red-300 focus:ring-red-200' : 'border-white/80 focus:ring-[#5600e3]/20'}`}
                                    />
                                    <input
                                        type="email"
                                        value={marketingEmail}
                                        onChange={e => setMarketingEmail(e.target.value)}
                                        placeholder={t('auditTool.marketing.emailLabel')}
                                        disabled={marketingSubmitting}
                                        className={`w-full px-3.5 py-2 rounded-xl bg-white/70 border text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] disabled:opacity-60 transition-all ${emailInvalid ? 'border-red-300 focus:ring-red-200' : 'border-white/80 focus:ring-[#5600e3]/20'}`}
                                    />
                                    <input
                                        type="text"
                                        value={marketingWebsite}
                                        onChange={e => setMarketingWebsite(e.target.value)}
                                        onBlur={e => {
                                            const v = e.target.value.trim();
                                            if (v && !/^https?:\/\//i.test(v)) setMarketingWebsite('https://' + v);
                                        }}
                                        onKeyDown={e => e.key === 'Enter' && canSubmitMarketing && submitMarketingAudit()}
                                        placeholder="https://"
                                        disabled={marketingSubmitting}
                                        className={`w-full px-3.5 py-2 rounded-xl bg-white/70 border text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] disabled:opacity-60 transition-all ${mWebsiteInvalid ? 'border-red-300 focus:ring-red-200' : 'border-white/80 focus:ring-[#5600e3]/20'}`}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setMarketingStep(2)}
                                            disabled={marketingSubmitting}
                                            className="flex-shrink-0 px-4 py-2.5 rounded-2xl bg-white/60 border border-slate-200 text-slate-600 text-sm font-bold transition-all hover:bg-white/90 disabled:opacity-40"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={submitMarketingAudit}
                                            disabled={!canSubmitMarketing}
                                            className="flex-1 py-2.5 rounded-2xl bg-[#5600e3] hover:bg-[#4500b6] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-[0_4px_12px_rgba(86,0,227,0.35)] flex items-center justify-center gap-2"
                                        >
                                            {marketingSubmitting ? (
                                                <>
                                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                                    </svg>
                                                    {t('auditTool.marketing.submitting')}
                                                </>
                                            ) : (
                                                <>{t('auditTool.marketing.submitBtn')} →</>
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-1">
                                        {([0, 1, 2] as const).map(i => (
                                            <span key={i} className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                                {t(`auditTool.marketing.badge.${i}` as TranslationKey)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
