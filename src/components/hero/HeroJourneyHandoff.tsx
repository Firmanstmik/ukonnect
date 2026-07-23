import { motion, useReducedMotion, type MotionValue } from 'framer-motion';
import { UkonnectMark } from '../UkonnectMark';

type Props = {
    label: string;
    scaleY?: MotionValue<number>;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroJourneyHandoff({ label, scaleY }: Props) {
    const reduced = Boolean(useReducedMotion());

    return (
        <motion.div
            className="cinematic-handoff"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.55, ease: EASE }}
        >
            <div className="cinematic-handoff-rail" aria-hidden>
                <motion.span
                    className="cinematic-handoff-line"
                    style={scaleY !== undefined ? { scaleY } : undefined}
                />
                <span className="cinematic-handoff-particle" />
                <span className="cinematic-handoff-particle cinematic-handoff-particle--delayed" />
            </div>

            <div className="cinematic-handoff-mark-wrap" aria-hidden={!label}>
                <span className="cinematic-handoff-mark-glow cinematic-handoff-mark-glow--cyan" />
                <span className="cinematic-handoff-mark-glow cinematic-handoff-mark-glow--violet" />
                <motion.div
                    className="cinematic-handoff-mark"
                    animate={
                        reduced
                            ? undefined
                            : {
                                  y: [0, -3, 0],
                                  rotate: [0, 1.5, 0, -1.5, 0],
                              }
                    }
                    transition={
                        reduced
                            ? undefined
                            : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
                    }
                >
                    <UkonnectMark className="cinematic-handoff-mark-icon" />
                </motion.div>
            </div>

            <small className="cinematic-handoff-label">{label}</small>
        </motion.div>
    );
}
