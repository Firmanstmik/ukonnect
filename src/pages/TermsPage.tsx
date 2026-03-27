import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Terms } from '../components/Terms';
import { Footer } from '../components/Footer';

export default function TermsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900 selection:bg-primary/20">
            <Navbar />
            <main>
                <Terms />
            </main>
            <Footer />
        </div>
    );
}
