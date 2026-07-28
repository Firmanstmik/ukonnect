import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const COPY = {
    en: {
        label: '404',
        title: 'Page not found',
        body: 'This page does not exist or has moved. Head back home to continue.',
        home: 'Back to home',
        contact: 'Contact us',
    },
    nl: {
        label: '404',
        title: 'Pagina niet gevonden',
        body: 'Deze pagina bestaat niet of is verplaatst. Ga terug naar home om verder te gaan.',
        home: 'Terug naar home',
        contact: 'Neem contact op',
    },
    pt: {
        label: '404',
        title: 'Página não encontrada',
        body: 'Esta página não existe ou foi movida. Volte à página inicial para continuar.',
        home: 'Voltar ao início',
        contact: 'Contacte-nos',
    },
    id: {
        label: '404',
        title: 'Halaman tidak ditemukan',
        body: 'Halaman ini tidak ada atau sudah dipindahkan. Kembali ke beranda untuk melanjutkan.',
        home: 'Kembali ke beranda',
        contact: 'Hubungi kami',
    },
} as const;

export default function NotFoundPage() {
    const { lang } = useLanguage();
    const copy = COPY[lang] ?? COPY.en;

    return (
        <div className="min-h-screen bg-[#ecedf1] font-sans text-slate-900">
            <Navbar />
            <main className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 pt-36 text-center md:pt-44">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">{copy.label}</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{copy.title}</h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 md:text-lg">{copy.body}</p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        to={`/${lang}`}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
                    >
                        {copy.home}
                    </Link>
                    <Link
                        to={`/${lang}/contact`}
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/30 hover:text-primary"
                    >
                        {copy.contact}
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
