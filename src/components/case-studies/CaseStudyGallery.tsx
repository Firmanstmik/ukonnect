import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { PlaceholderFrame } from './CaseStudyPrimitives';
import { EASE_OUT } from '../motion';

export function CaseStudyGallery({ study }: { study: CaseStudyExperience }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = study.gallery[activeIndex];

    const go = (direction: -1 | 1) => {
        setActiveIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return study.gallery.length - 1;
            if (next >= study.gallery.length) return 0;
            return next;
        });
    };

    return (
        <div>
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="font-mono text-[10px] tracking-[0.28em] text-primary/55">GALLERY</p>
                    <h4 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Project visuals</h4>
                    <p className="mt-2 max-w-xl text-sm text-slate-500">
                        Placeholder screenshots designed to be replaced with verified client assets.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous gallery item"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 transition hover:border-primary/25 hover:text-primary"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next gallery item"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 transition hover:border-primary/25 hover:text-primary"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 0.985, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.01, filter: 'blur(6px)' }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                    <PlaceholderFrame item={active} theme={study.theme} className="min-h-[280px] md:min-h-[360px]" />
                </motion.div>
            </AnimatePresence>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {study.gallery.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`overflow-hidden rounded-xl border text-left transition ${
                            index === activeIndex
                                ? 'border-primary/35 shadow-[0_12px_30px_-18px_rgba(86,0,227,0.35)]'
                                : 'border-slate-200/70 opacity-75 hover:opacity-100'
                        }`}
                    >
                        <PlaceholderFrame item={item} theme={study.theme} className="!aspect-[4/3] !rounded-xl" />
                    </button>
                ))}
            </div>
        </div>
    );
}
