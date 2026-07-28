import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LanguageProvider, VALID_LANGS } from './i18n/LanguageContext.tsx'
import type { Language } from './i18n/translations.ts'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

const ContactPage  = lazy(() => import('./pages/ContactPage.tsx'))
const AboutPage    = lazy(() => import('./pages/AboutPage.tsx'))
const CareersPage  = lazy(() => import('./pages/CareersPage.tsx'))
const PrivacyPage  = lazy(() => import('./pages/PrivacyPage.tsx'))
const TermsPage    = lazy(() => import('./pages/TermsPage.tsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'))

const LangRedirect = () => {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    const lang: Language = VALID_LANGS.includes(browserLang as Language)
        ? (browserLang as Language)
        : 'en';
    return <Navigate to={`/${lang}`} replace />;
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Suspense fallback={<div style={{ minHeight: '100vh', background: '#ecedf1' }} />}>
                    <Routes>
                        <Route path="/" element={<LangRedirect />} />
                        <Route path="/:lang" element={<LanguageProvider />}>
                            <Route index element={<App />} />
                            <Route path="about" element={<AboutPage />} />
                            <Route path="contact" element={<ContactPage />} />
                            <Route path="careers" element={<CareersPage />} />
                            <Route path="privacy" element={<PrivacyPage />} />
                            <Route path="terms" element={<TermsPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                        <Route path="*" element={<LangRedirect />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </ErrorBoundary>
    </StrictMode>,
)
