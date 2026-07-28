import { motion } from 'framer-motion';
import type { CaseStudyExperience } from './caseStudyExperienceData';
import { EASE_OUT } from '../motion';

type Props = {
    study: CaseStudyExperience;
    hovered?: boolean;
    reduce?: boolean;
    /** Compact card vs expanded overlay hero */
    variant?: 'card' | 'hero';
    layoutImageId?: string;
};

/** Desktop cover + floating mobile device — shared across card and overlay. */
export function CaseStudyVisual({
    study,
    hovered = false,
    reduce = false,
    variant = 'card',
    layoutImageId,
}: Props) {
    const isHero = variant === 'hero';

    const ImageTag = layoutImageId ? motion.img : 'img';

    return (
        <div className={`relative overflow-hidden ${isHero ? 'h-full min-h-[240px] sm:min-h-[320px] lg:min-h-[520px]' : 'aspect-[4/3] sm:aspect-[16/11]'}`}>
            <ImageTag
                {...(layoutImageId ? { layoutId: layoutImageId } : {})}
                src={study.coverImage}
                alt={study.coverAlt}
                loading="lazy"
                {...(layoutImageId
                    ? {
                          animate: { scale: hovered && !reduce ? 1.06 : 1 },
                          transition: { duration: 1.1, ease: EASE_OUT },
                      }
                    : {})}
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div
                className={`absolute inset-0 bg-gradient-to-br ${study.theme.mesh} opacity-45 mix-blend-multiply`}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
                }}
                aria-hidden
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(8,13,25,0.15) 0%, transparent 38%, rgba(8,13,25,0.78) 100%)',
                }}
                aria-hidden
            />

            {/* Floating mobile preview */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 16, x: 8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT }}
                className={`absolute z-[2] ${isHero ? 'right-5 bottom-5 w-[28%] min-w-[96px] max-w-[140px] sm:right-8 sm:bottom-8 sm:max-w-[168px]' : 'right-3 bottom-3 w-[34%] min-w-[88px] max-w-[118px] sm:right-4 sm:bottom-4 sm:max-w-[132px]'}`}
            >
                <div className="relative rounded-[1.15rem] border border-white/25 bg-slate-950/80 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:rounded-[1.35rem] sm:p-1.5">
                    <div className="overflow-hidden rounded-[0.85rem] sm:rounded-[1rem]">
                        <img
                            src={study.mobileCoverImage}
                            alt={`${study.clientName} mobile experience`}
                            loading="lazy"
                            className="aspect-[9/16] w-full object-cover object-top"
                        />
                    </div>
                    <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-white/30" aria-hidden />
                </div>
            </motion.div>
        </div>
    );
}
