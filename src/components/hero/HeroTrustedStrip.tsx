import type { CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { PARTNERS } from '../partnersData';

type Props = {
    compact?: boolean;
};

export function HeroTrustedStrip({ compact = false }: Props) {
    const { t } = useLanguage();
    const reduced = Boolean(useReducedMotion());
    const logos = PARTNERS;
    const track = [...logos, ...logos];
    const durationStyle = {
        '--client-marquee-duration': compact ? '28s' : '34s',
    } as CSSProperties;

    return (
        <div
            className={
                compact
                    ? 'cinematic-client-destination cinematic-client-destination--mobile'
                    : 'cinematic-client-destination'
            }
        >
            <div className="cinematic-client-destination-inner">
                <span className="cinematic-client-destination-label">
                    <i aria-hidden />
                    {t('hero.clientEyebrow')}
                </span>

                <span className="cinematic-client-destination-divider" aria-hidden />

                <div className="cinematic-client-marquee" aria-label={t('hero.clientEyebrow')}>
                    <div
                        className={`cinematic-client-marquee-track${reduced ? ' is-static' : ''}`}
                        style={durationStyle}
                    >
                        {track.map((partner, index) => (
                            <img
                                key={`${partner.alt}-${index}`}
                                src={partner.src}
                                alt={index < logos.length ? partner.alt : ''}
                                loading="lazy"
                                aria-hidden={index >= logos.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
