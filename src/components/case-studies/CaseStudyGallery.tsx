import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { GalleryFrame } from './CaseStudyPrimitives';
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
                        Desktop and mobile captures from the live build — curated for this case study experience.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous gallery item"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:border-primary/25 hover:text-primary"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next gallery item"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:border-primary/25 hover:text-primary"
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
                    className="overflow-hidden rounded-[1.5rem] ring-1 ring-slate-200/60"
                >
                    <GalleryFrame
                        item={active}
                        theme={study.theme}
                        alt={study.coverAlt}
                        className="min-h-[280px] rounded-[1.5rem] md:min-h-[360px]"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {study.gallery.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`group overflow-hidden rounded-xl border text-left transition duration-300 ${
                            index === activeIndex
                                ? 'border-primary/40 shadow-[0_16px_40px_-20px_rgba(86,0,227,0.45)] ring-2 ring-primary/20'
                                : 'border-slate-200/70 opacity-80 hover:opacity-100 hover:shadow-md'
                        }`}
                    >
                        <GalleryFrame
                            item={item}
                            theme={study.theme}
                            alt={study.coverAlt}
                            compact
                            interactive
                            className="!aspect-[4/3] !rounded-xl !shadow-none"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
