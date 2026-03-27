import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Careers } from '../components/Careers';
import { Footer } from '../components/Footer';

export default function CareersPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900 selection:bg-primary/20">
            <Navbar />
            <main>
                <Careers />
            </main>
            <Footer />
        </div>
    );
}
