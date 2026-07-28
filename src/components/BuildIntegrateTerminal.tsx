import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';
import { getContactChannel } from '../lib/contactInfo';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="white" className="flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.054 23.25a.75.75 0 00.917.899l5.562-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.681-.502-5.223-1.381l-.374-.213-3.303.87.882-3.22-.232-.381A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
);

const CODE_BLOCKS = [
    { type: 'comment', text: '// Initialize CRM connection' },
    { type: 'code', text: 'connectCRM("hubspot")' },
    { type: 'status', text: 'Connecting CRM...' },
    { type: 'success', text: '✓ CRM Connected' },
    { type: 'blank', text: '' },
    { type: 'code', text: 'syncLeads({ source: "all" })' },
    { type: 'status', text: 'Syncing leads...' },
    { type: 'success', text: '✓ Lead pipeline active' },
    { type: 'blank', text: '' },
    { type: 'comment', text: '// Build automation workflow' },
    { type: 'code', text: 'createAutomationFlow({' },
    { type: 'code', text: '  trigger: "new_lead",' },
    { type: 'code', text: '  actions: ["qualify", "nurture"]' },
    { type: 'code', text: '})' },
    { type: 'success', text: '✓ Workflow deployed' },
    { type: 'blank', text: '' },
    { type: 'code', text: 'sendFollowUp({ delay: "2h" })' },
    { type: 'status', text: 'Scheduling follow-ups...' },
    { type: 'success', text: '✓ Sequences activated' },
    { type: 'blank', text: '' },
    { type: 'code', text: 'analyzeCampaignData()' },
    { type: 'status', text: 'Processing analytics...' },
    { type: 'success', text: '✓ Dashboard live' },
];

const TYPING_SPEED_MIN = 40;
const TYPING_SPEED_MAX = 70;
const BLOCK_PAUSE = 500;
const SUCCESS_PAUSE = 800;
const MAX_VISIBLE_LINES = 12;

const getLineColor = (type: string) => {
    switch (type) {
        case 'comment': return '#8b8fa3';
        case 'code': return '#5600e3';
        case 'status': return '#9ca3af';
        case 'success': return '#22c55e';
        default: return '#6b7280';
    }
};

const N_PLACEHOLDERS = 4;
const N_SUGGESTIONS  = 5;

export const BuildIntegrateTerminal = () => {
    const { t, lang } = useLanguage();
    const whatsappHref = getContactChannel(lang).whatsappHref;

    const ROTATING_PLACEHOLDERS = Array.from({ length: N_PLACEHOLDERS }, (_, i) =>
        t(`process.step2.placeholder.${i}` as TranslationKey)
    );
    const ROTATING_PLACEHOLDERS_MOBILE = Array.from({ length: N_PLACEHOLDERS }, (_, i) =>
        t(`process.step2.placeholderMobile.${i}` as TranslationKey)
    );
    const SUGGESTIONS = Array.from({ length: N_SUGGESTIONS }, (_, i) =>
        t(`process.step2.suggestion.${i}` as TranslationKey)
    );

    const [lines, setLines] = useState<{ text: string; type: string; complete: boolean }[]>([]);
    const [cursorVisible, setCursorVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [promptValue, setPromptValue] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [hoveredChip, setHoveredChip] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Use refs for mutable state to avoid stale closures in setTimeout
    const blockIndexRef = useRef(0);
    const charIndexRef = useRef(0);
    const isHoveredRef = useRef(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const linesRef = useRef<{ text: string; type: string; complete: boolean }[]>([]);

    // Keep hover ref in sync
    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    const updateLines = (newLines: { text: string; type: string; complete: boolean }[]) => {
        linesRef.current = newLines;
        setLines(newLines);
    };

    const scheduleNext = (fn: () => void, delay: number) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(fn, delay);
    };

    const typeNextChar = () => {
        const blockIdx = blockIndexRef.current;
        const charIdx = charIndexRef.current;

        if (blockIdx >= CODE_BLOCKS.length) {
            // Reset and loop
            setIsTyping(false);
            scheduleNext(() => {
                blockIndexRef.current = 0;
                charIndexRef.current = 0;
                updateLines([]);
                scheduleNext(typeNextChar, 600);
            }, 1500);
            return;
        }

        const block = CODE_BLOCKS[blockIdx];
        const hovered = isHoveredRef.current;

        if (block.type === 'blank') {
            const newLines = [...linesRef.current, { text: '', type: 'blank', complete: true }];
            updateLines(newLines);
            blockIndexRef.current = blockIdx + 1;
            charIndexRef.current = 0;
            scheduleNext(typeNextChar, 100);
            return;
        }

        if (block.type === 'success') {
            const newLines = [...linesRef.current, { text: block.text, type: block.type, complete: true }];
            updateLines(newLines);
            setIsTyping(false);
            blockIndexRef.current = blockIdx + 1;
            charIndexRef.current = 0;
            scheduleNext(typeNextChar, hovered ? SUCCESS_PAUSE * 0.6 : SUCCESS_PAUSE);
            return;
        }

        setIsTyping(true);

        if (charIdx === 0) {
            // Start new line
            const newLines = [...linesRef.current, { text: '', type: block.type, complete: false }];
            updateLines(newLines);
        }

        if (charIdx < block.text.length) {
            // Type next character
            const currentLines = [...linesRef.current];
            const lastIdx = currentLines.length - 1;
            currentLines[lastIdx] = {
                ...currentLines[lastIdx],
                text: block.text.slice(0, charIdx + 1),
            };
            updateLines(currentLines);
            charIndexRef.current = charIdx + 1;

            const speed = TYPING_SPEED_MIN + Math.random() * (TYPING_SPEED_MAX - TYPING_SPEED_MIN);
            scheduleNext(typeNextChar, hovered ? speed * 0.5 : speed);
            return;
        }

        // Line complete
        const currentLines = [...linesRef.current];
        const lastIdx = currentLines.length - 1;
        currentLines[lastIdx] = { ...currentLines[lastIdx], complete: true };
        updateLines(currentLines);
        setIsTyping(false);

        blockIndexRef.current = blockIdx + 1;
        charIndexRef.current = 0;

        const pause = block.type === 'status' ? BLOCK_PAUSE * 0.6 : BLOCK_PAUSE;
        scheduleNext(typeNextChar, hovered ? pause * 0.6 : pause);
    };

    // Start the animation
    useEffect(() => {
        scheduleNext(typeNextChar, 600);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    // Rotating placeholder
    useEffect(() => {
        if (isFocused || promptValue) return;
        const interval = setInterval(() => {
            setPlaceholderIndex(prev => (prev + 1) % ROTATING_PLACEHOLDERS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [isFocused, promptValue]);

    const handleSend = () => {
        if (!promptValue.trim()) return;
        const message = `Hi Ukonnect,\n\nI came from your website.\n\nI'd like to improve:\n${promptValue.trim()}`;
        const encoded = encodeURIComponent(message);
        window.open(`${whatsappHref}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    // Trim visible lines
    const visibleLines = lines.slice(-MAX_VISIBLE_LINES);

    return (
        <div
            className="w-full h-full min-h-0 flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#d8d9de]">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
                <span className="ml-3 text-[11px] text-[#9ca0ad] font-mono tracking-wide">ukonnect — build</span>
            </div>

            {/* Terminal body */}
            <div
                ref={scrollRef}
                className="flex-1 min-h-0 px-5 py-4 overflow-hidden font-mono text-[12px] leading-[1.8] relative"
                style={{
                    filter: isHovered ? 'brightness(1.03)' : 'brightness(1)',
                    transition: 'filter 0.3s ease',
                }}
            >
                <AnimatePresence initial={false}>
                    {visibleLines.map((line, i) => (
                        <motion.div
                            key={`${lines.length - visibleLines.length + i}-${line.type}-${line.complete}`}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-2 relative"
                        >
                            {/* Line number */}
                            <span className="w-5 text-right text-[10px] text-[#b8b9c0] select-none flex-shrink-0">
                                {line.type !== 'blank' ? (lines.length - visibleLines.length + i + 1) : ''}
                            </span>

                            {/* Line content */}
                            <span style={{ color: getLineColor(line.type) }}>
                                {line.text}
                            </span>

                            {/* Cursor on last line */}
                            {i === visibleLines.length - 1 && !line.complete && (
                                <motion.span
                                    className="inline-block w-[7px] h-[14px] ml-[1px]"
                                    style={{ backgroundColor: '#5600e3' }}
                                    animate={{ opacity: cursorVisible ? 1 : 0 }}
                                    transition={{ duration: 0.08 }}
                                />
                            )}

                            {/* Glow sweep on completed lines */}
                            {line.complete && line.type !== 'blank' && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none rounded"
                                    initial={{ opacity: 0.15, x: '-100%' }}
                                    animate={{ opacity: 0, x: '100%' }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    style={{
                                        background: line.type === 'success'
                                            ? 'linear-gradient(90deg, transparent, rgba(34,197,94,0.08), transparent)'
                                            : 'linear-gradient(90deg, transparent, rgba(86,0,227,0.06), transparent)',
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Idle cursor when not typing */}
                {!isTyping && blockIndexRef.current >= CODE_BLOCKS.length && (
                    <div className="flex items-center gap-2 mt-0">
                        <span className="w-5 text-right text-[10px] text-[#b8b9c0] select-none flex-shrink-0">
                            {lines.length + 1}
                        </span>
                        <motion.span
                            className="inline-block w-[7px] h-[14px]"
                            style={{ backgroundColor: '#5600e3' }}
                            animate={{ opacity: cursorVisible ? 1 : 0 }}
                            transition={{ duration: 0.08 }}
                        />
                    </div>
                )}
            </div>

            {/* AI Prompt Box */}
            <div className="border-t border-[#d8d9de] px-4 py-3 flex flex-col gap-2">
                <p className="text-[11px] font-semibold text-slate-600 tracking-wide">{t('process.step2.question')}</p>
                <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-0 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={hoveredChip !== null && !isFocused ? hoveredChip : promptValue}
                            onChange={(e) => setPromptValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full px-3 py-1.5 text-[11px] rounded-lg border border-[#d8d9de] bg-white/60 text-slate-700 outline-none focus:border-[#5600e3]/40 focus:ring-1 focus:ring-[#5600e3]/20 transition-all"
                        />
                        {/* Animated placeholder overlay */}
                        {!isFocused && !promptValue && hoveredChip === null && (
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={placeholderIndex}
                                        className="text-[11px] text-slate-400 whitespace-nowrap"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span className="hidden sm:inline">{ROTATING_PLACEHOLDERS[placeholderIndex]}</span>
                                        <span className="sm:hidden">{ROTATING_PLACEHOLDERS_MOBILE[placeholderIndex]}</span>
                                    </motion.span>
                                </AnimatePresence>
                                <motion.span
                                    className="inline-block w-[1px] h-[12px] ml-[2px] bg-slate-400"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                />
                            </div>
                        )}
                        {/* Typing indicator dots */}
                        {!isFocused && !promptValue && hoveredChip === null && (
                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-[3px] pointer-events-none">
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="w-[4px] h-[4px] rounded-full bg-slate-400"
                                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.2,
                                            delay: i * 0.2,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleSend}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#1aad52] text-white text-[10px] font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                        <WhatsAppIcon />
                        Chat on WhatsApp
                    </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((s) => (
                        <button
                            key={s}
                            onMouseEnter={() => setHoveredChip(s)}
                            onMouseLeave={() => setHoveredChip(null)}
                            onClick={() => {
                                setPromptValue(s);
                                setHoveredChip(null);
                                inputRef.current?.focus();
                            }}
                            className="px-2 py-0.5 text-[10px] rounded-full border border-[#d8d9de] text-slate-500 hover:border-[#5600e3]/40 hover:text-[#5600e3] hover:-translate-y-[1px] hover:shadow-sm transition-all bg-white/40 whitespace-nowrap"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
