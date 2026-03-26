import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LanguageProvider, VALID_LANGS } from './i18n/LanguageContext.tsx'
import type { Language } from './i18n/translations.ts'

const ContactPage = lazy(() => import('./pages/ContactPage.tsx'))
const AboutPage   = lazy(() => import('./pages/AboutPage.tsx'))

const LangRedirect = () => {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    const lang: Language = VALID_LANGS.includes(browserLang as Language)
        ? (browserLang as Language)
        : 'en';
    return <Navigate to={`/${lang}`} replace />;
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<LangRedirect />} />
                    <Route path="/:lang" element={<LanguageProvider />}>
                        <Route index element={<App />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    </StrictMode>,
)
