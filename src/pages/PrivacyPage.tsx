import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Privacy } from '../components/Privacy';
import { Footer } from '../components/Footer';

export default function PrivacyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900 selection:bg-primary/20">
            <Navbar />
            <main>
                <Privacy />
            </main>
            <Footer />
        </div>
    );
}
