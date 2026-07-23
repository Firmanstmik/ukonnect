import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const CompanyStoryExperience = lazy(() =>
    import('../components/company-story/CompanyStoryExperience').then(m => ({
        default: m.CompanyStoryExperience,
    })),
);
const AboutContent = lazy(() =>
    import('../components/AboutContent').then(m => ({ default: m.AboutContent })),
);

/**
 * About page — storytelling destination.
 * CompanyStoryExperience = documentary hero → systems → journey → office → culture → founder → CTA.
 * AboutContent (supplement) = mission/vision, full team, gallery, values (no duplicate hero).
 */
export default function AboutPage() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.slice(1);
            let attempts = 0;
            const scrollWhenReady = () => {
                const target = document.getElementById(id);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    return;
                }
                if (attempts++ < 40) window.setTimeout(scrollWhenReady, 50);
            };
            scrollWhenReady();
            return;
        }
        window.scrollTo(0, 0);
    }, [location.hash]);

    return (
        <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900 selection:bg-primary/20">
            <Navbar />
            <main>
                <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '100vh' }} />}>
                    <CompanyStoryExperience />
                </Suspense>
                <Suspense fallback={<div className="bg-[#ecedf1]" style={{ minHeight: '48rem' }} />}>
                    <AboutContent mode="supplement" />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
