import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';
import metaIcon from '../assets/meta.webp';
import googleAdsIcon from '../assets/Ukonnect Google Ads.webp';

type Tab = 'website' | 'marketing';
type Phase = 'idle' | 'scanning' | 'results';
type Channel = 'meta' | 'google' | 'linkedin' | 'tiktok';

const CHANNELS: { id: Channel; label: string }[] = [
    { id: 'meta',     label: 'Meta' },
    { id: 'google',   label: 'Google' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'tiktok',   label: 'TikTok' },
];

const WEBSITE_DEDUCTIONS = [-18, -14, -12, -11, -11];
const MARKETING_DEDUCTIONS = [-16, -14, -12, -10, -7];
const N_STEPS = 5;
const SCAN_STEP_MS = 25;

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

export const AIAuditTool = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<Tab>('website');
    const [websitePhase, setWebsitePhase] = useState<Phase>('idle');
    const [marketingPhase, setMarketingPhase] = useState<Phase>('idle');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [accountName, setAccountName] = useState('');
    const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);
    const [progress, setProgress] = useState(0);

    const phase = activeTab === 'website' ? websitePhase : marketingPhase;

    useEffect(() => {
        const isScanning =
            (activeTab === 'website' && websitePhase === 'scanning') ||
            (activeTab === 'marketing' && marketingPhase === 'scanning');
        if (!isScanning) return;

        setProgress(0);
        let current = 0;
        const id = setInterval(() => {
            current += 1;
            setProgress(current);
            if (current >= 100) {
                clearInterval(id);
                setTimeout(() => {
                    if (activeTab === 'website') setWebsitePhase('results');
                    else setMarketingPhase('results');
                }, 300);
            }
        }, SCAN_STEP_MS);
        return () => clearInterval(id);
    }, [websitePhase, marketingPhase, activeTab, setWebsitePhase, setMarketingPhase]);

    const startScan = () => {
        if (activeTab === 'website') setWebsitePhase('scanning');
        else setMarketingPhase('scanning');
    };

    const reset = () => {
        if (activeTab === 'website') { setWebsitePhase('idle'); setWebsiteUrl(''); }
        else { setMarketingPhase('idle'); setAccountName(''); setSelectedChannels([]); }
    };

    const toggleChannel = (ch: Channel) =>
        setSelectedChannels(prev =>
            prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
        );

    const steps      = Array.from({ length: N_STEPS }, (_, i) => t(`auditTool.${activeTab}.step.${i}` as TranslationKey));
    const issues     = Array.from({ length: N_STEPS }, (_, i) => t(`auditTool.${activeTab}.issue.${i}` as TranslationKey));
    const deductions = activeTab === 'website' ? WEBSITE_DEDUCTIONS : MARKETING_DEDUCTIONS;
    const score      = activeTab === 'website' ? 34 : 41;

    const isValidUrl = (val: string) => {
        const url = /^https?:\/\//i.test(val) ? val : `https://${val}`;
        try {
            const { hostname } = new URL(url);
            return hostname.includes('.');
        } catch {
            return false;
        }
    };

    const canScan = activeTab === 'website'
        ? isValidUrl(websiteUrl.trim())
        : selectedChannels.length > 0;

    const urlInvalid = activeTab === 'website' && websiteUrl.trim().length > 0 && !isValidUrl(websiteUrl.trim());

    return (
        <div className="absolute inset-0 bg-[#ecedf1] rounded-3xl shadow-[inset_0_4px_8px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">

            {/* ── Full-width tab bar ── */}
            <div className="flex flex-shrink-0">
                <button
                    onClick={() => setActiveTab('website')}
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
                    onClick={() => setActiveTab('marketing')}
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

                {/* ── IDLE ── */}
                {phase === 'idle' && (
                    <div className="flex flex-col h-full">

                        {/* Heading */}
                        <div className="mb-4 mt-2 flex-shrink-0 text-center">
                            <h3 className="text-[22px] font-black text-slate-900 leading-tight tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5600e3] to-[#9333ea]">AI</span>
                                {activeTab === 'website' ? ' Website Scan' : ' Marketing Audit'}
                            </h3>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                                {activeTab === 'website'
                                    ? 'Discover what\'s holding your website back'
                                    : 'Find gaps in your marketing channels'
                                }
                            </p>
                        </div>

                        {/* Inputs */}
                        <div className="flex flex-col gap-2.5 flex-1 min-h-0">
                            {activeTab === 'website' ? (
                                <div>
                                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block text-center">Website URL</label>
                                    <input
                                        type="text"
                                        value={websiteUrl}
                                        onChange={e => setWebsiteUrl(e.target.value)}
                                        placeholder={t('auditTool.website.inputPlaceholder')}
                                        onKeyDown={e => e.key === 'Enter' && canScan && startScan()}
                                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white/70 border text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-all ${
                                            urlInvalid
                                                ? 'border-red-300 focus:ring-red-200'
                                                : 'border-white/80 focus:ring-[#5600e3]/20'
                                        }`}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Channels</label>
                                        <div className="flex flex-wrap gap-1.5">
                                            {CHANNELS.map(ch => {
                                                const sel = selectedChannels.includes(ch.id);
                                                return (
                                                    <button
                                                        key={ch.id}
                                                        onClick={() => toggleChannel(ch.id)}
                                                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all border ${
                                                            sel
                                                                ? 'bg-[#5600e3]/10 border-[#5600e3]/30 text-[#5600e3]'
                                                                : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white/80'
                                                        }`}
                                                    >
                                                        {ch.id === 'meta'     && <img src={metaIcon}      alt="" className="w-3.5 h-3.5 object-contain" />}
                                                        {ch.id === 'google'   && <img src={googleAdsIcon} alt="" className="w-3.5 h-3.5 object-contain" />}
                                                        {ch.id === 'linkedin' && <LinkedInIcon />}
                                                        {ch.id === 'tiktok'   && <TikTokIcon />}
                                                        {ch.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Account</label>
                                        <input
                                            type="text"
                                            value={accountName}
                                            onChange={e => setAccountName(e.target.value)}
                                            placeholder={t('auditTool.marketing.inputPlaceholder')}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-white/80 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5600e3]/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Trust badges */}
                        <div className="flex justify-center gap-4 py-3 flex-shrink-0">
                            {['100% Free', 'AI-powered', 'Instant'].map(badge => (
                                <span key={badge} className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* Scan button */}
                        <button
                            onClick={startScan}
                            disabled={!canScan}
                            className="w-full py-3 rounded-2xl bg-[#5600e3] hover:bg-[#4500b6] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-[0_4px_12px_rgba(86,0,227,0.35)] hover:shadow-[0_6px_16px_rgba(86,0,227,0.45)] flex-shrink-0"
                        >
                            {t(activeTab === 'website' ? 'auditTool.website.scanBtn' : 'auditTool.marketing.scanBtn')} →
                        </button>

                    </div>
                )}

                {/* ── SCANNING ── */}
                {phase === 'scanning' && (
                    <div className="flex flex-col gap-4 flex-1">

                        <div className="flex items-center justify-between flex-shrink-0">
                            <p className="text-xs font-semibold text-[#5600e3] flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#5600e3] animate-pulse flex-shrink-0" />
                                {t(activeTab === 'website' ? 'auditTool.website.scanning' : 'auditTool.marketing.scanning')}
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

                {/* ── RESULTS ── */}
                {phase === 'results' && (
                    <div className="flex flex-col gap-3 flex-1">

                        {/* Score card */}
                        <div className="flex items-center gap-3 bg-white/50 rounded-2xl p-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] flex-shrink-0">
                            <div className="flex items-baseline gap-1 flex-shrink-0">
                                <span className="text-4xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-500">{score}</span>
                                <span className="text-base font-bold text-slate-300">/100</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium truncate">
                                    {t(activeTab === 'website' ? 'auditTool.website.scoreLabel' : 'auditTool.marketing.scoreLabel')}
                                </p>
                            </div>
                        </div>

                        {/* Issues */}
                        <div className="flex flex-col gap-1.5 flex-1">
                            {issues.map((issue, i) => (
                                <div key={i} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                                        <span className="text-xs text-slate-600 truncate">{issue}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-red-500 flex-shrink-0 tabular-nums">{deductions[i]} pts</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                            <button
                                onClick={() => navigate(`/${lang}/contact`)}
                                className="w-full py-2.5 rounded-2xl bg-[#5600e3] hover:bg-[#4500b6] text-white text-xs font-bold transition-all shadow-[0_4px_12px_rgba(86,0,227,0.30)]"
                            >
                                {t('auditTool.cta')} →
                            </button>
                            <button
                                onClick={reset}
                                className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors text-center py-0.5"
                            >
                                {t(activeTab === 'website' ? 'auditTool.website.reset' : 'auditTool.marketing.reset')}
                            </button>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};
