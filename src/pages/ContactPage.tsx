import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export default function ContactPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900 selection:bg-primary/20">
            <Navbar />
            <main>
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
