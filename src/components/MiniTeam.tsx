import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import teamPhoto from '../assets/Ukonnect Team Portugal.webp';

/**
 * Mini Team — brief human introduction on the homepage.
 * Full documentary + roster live on the About page.
 */
export function MiniTeam() {
    const { t, lang } = useLanguage();

    return (
        <section id="mini-team" className="scroll-mt-28 py-[60px] md:py-[80px] lg:py-[100px]">
            <div className="mx-auto max-w-[1300px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55 }}
                    className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
                >
                    <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] shadow-[0_24px_60px_rgba(40,24,72,0.12)]">
                        <img
                            src={teamPhoto}
                            alt={t('miniTeam.photoAlt')}
                            className="h-full w-full object-cover object-top"
                            loading="lazy"
                        />
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.28) 100%)',
                            }}
                            aria-hidden
                        />
                    </div>

                    <div className="flex flex-col items-start gap-5 lg:pl-2">
                        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                            {t('miniTeam.label')}
                        </p>
                        <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                            {t('miniTeam.headingPre')}
                            <span className="text-[#5600e3]">{t('miniTeam.headingHighlight')}</span>
                            {t('miniTeam.headingPost')}
                        </h2>
                        <p className="max-w-xl text-lg font-medium leading-relaxed text-slate-600 whitespace-pre-line">
                            {t('miniTeam.body')}
                        </p>
                        <Link
                            to={`/${lang}/about`}
                            className="group mt-2 inline-flex items-center gap-2.5 rounded-2xl bg-primary px-8 py-3.5 text-[15px] font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
                        >
                            {t('miniTeam.cta')}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
