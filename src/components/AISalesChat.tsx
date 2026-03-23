import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Conversation script ─────────────────────────────────── */

const CONVERSATION: { type: 'user' | 'ai'; text: string }[] = [
    { type: 'user', text: "Hi, I'm interested in selling my house." },
    { type: 'ai',   text: "Great! What's your property location?" },
    { type: 'user', text: "Amsterdam." },
    { type: 'ai',   text: "Perfect. What's your expected price range?" },
    { type: 'user', text: "Around €650k." },
    { type: 'ai',   text: "I can connect you with a local agent. Book a call?" },
    { type: 'user', text: "Yes, please." },
    { type: 'ai',   text: "Done. You're scheduled for tomorrow at 14:00." },
];

/* ── Timing ──────────────────────────────────────────────── */

const AI_TYPING_DUR   = 1100;   // ms dots show before AI message reveals
const USER_TYPING_DUR = 650;    // ms dots show before user message reveals
const INTER_MSG       = 1400;   // ms between messages
const LOOP_PAUSE      = 2200;   // ms pause before loop restarts
const MAX_VISIBLE     = 5;      // max bubbles shown at once

/* ── Types ───────────────────────────────────────────────── */

type MsgType = 'user' | 'ai' | 'typing-user' | 'typing-ai';
interface Msg { id: number; type: MsgType; text?: string }

/* ── Animated dots ───────────────────────────────────────── */

const Dots = ({ ai }: { ai: boolean }) => (
    <div className="flex gap-1">
        {[0, 1, 2].map(i => (
            <motion.span
                key={i}
                className={`block w-1.5 h-1.5 rounded-full ${ai ? 'bg-white/70' : 'bg-slate-400'}`}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
        ))}
    </div>
);

/* ── Single chat bubble ──────────────────────────────────── */

const ChatBubble = ({ msg, ghosted }: { msg: Msg; ghosted: boolean }) => {
    const isAI      = msg.type === 'ai'      || msg.type === 'typing-ai';
    const isTyping  = msg.type === 'typing-user' || msg.type === 'typing-ai';

    return (
        <motion.div
            layout="position"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: ghosted ? 0.12 : 1, y: 0 }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.3 } }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`flex shrink-0 ${isAI ? 'justify-end' : 'justify-start'}`}
        >
            {/* Bubble shell — stays in place, only content crossfades */}
            <motion.div
                layout
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`px-3.5 py-2.5 text-[13px] leading-snug ${
                    isAI
                        ? 'rounded-2xl rounded-tr-sm shadow-[0_2px_8px_rgba(86,0,227,0.25)]'
                        : 'rounded-2xl rounded-tl-sm border border-slate-200 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] text-slate-700'
                }`}
                style={isAI ? { background: 'linear-gradient(135deg, #7c3aed 0%, #5600e3 100%)' } : undefined}
            >
                {/* Crossfade: dots → text, in-place, no positional jump */}
                <AnimatePresence mode="wait" initial={false}>
                    {isTyping ? (
                        <motion.div
                            key="typing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                        >
                            <Dots ai={isAI} />
                        </motion.div>
                    ) : (
                        <motion.span
                            key="text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.28 }}
                            className={isAI ? 'text-white' : ''}
                        >
                            {msg.text}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

/* ── Main component ──────────────────────────────────────── */

export const AISalesChat = () => {
    const [messages, setMessages] = useState<Msg[]>([]);
    const convIdxRef = useRef(0);
    const msgIdRef   = useRef(0);
    const mountedRef = useRef(true);
    const timerRef   = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        mountedRef.current = true;

        const step = () => {
            if (!mountedRef.current) return;

            const idx = convIdxRef.current;
            const msg = CONVERSATION[idx];

            /* End of script — pause then restart */
            if (!msg) {
                convIdxRef.current = 0;
                setMessages([]);
                timerRef.current = setTimeout(step, LOOP_PAUSE);
                return;
            }

            convIdxRef.current = idx + 1;

            const id          = msgIdRef.current++;
            const typingType  = msg.type === 'ai' ? 'typing-ai' : 'typing-user';
            const typingDur   = msg.type === 'ai' ? AI_TYPING_DUR : USER_TYPING_DUR;

            /* 1. Insert typing bubble */
            setMessages(prev => {
                const next: Msg[] = [...prev, { id, type: typingType }];
                return next.length > MAX_VISIBLE ? next.slice(-MAX_VISIBLE) : next;
            });

            /* 2. Replace typing bubble with actual message (same id = same key → in-place crossfade) */
            timerRef.current = setTimeout(() => {
                if (!mountedRef.current) return;
                setMessages(prev =>
                    prev.map(m => m.id === id ? { id, type: msg.type, text: msg.text } : m)
                );
                timerRef.current = setTimeout(step, INTER_MSG);
            }, typingDur);
        };

        timerRef.current = setTimeout(step, 600);

        return () => {
            mountedRef.current = false;
            clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div className="absolute inset-0 flex flex-col justify-end gap-2.5 p-5 overflow-hidden">
            <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                    <ChatBubble
                        key={msg.id}
                        msg={msg}
                        ghosted={i === 0 && messages.length >= MAX_VISIBLE}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
