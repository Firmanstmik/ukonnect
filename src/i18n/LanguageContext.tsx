import { createContext, useContext } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { type Language, type TranslationKey, getTranslation } from './translations';

export const VALID_LANGS: Language[] = ['en', 'pt', 'nl'];

interface LanguageContextValue {
    lang: Language;
    setLang: (l: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = () => {
    const { lang: rawLang } = useParams<{ lang: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const lang = (VALID_LANGS.includes(rawLang as Language) ? rawLang : 'en') as Language;

    const setLang = (l: Language) => {
        const newPath = location.pathname.replace(`/${rawLang}`, `/${l}`);
        navigate(newPath, { replace: true });
    };

    const t = (key: TranslationKey) => getTranslation(lang, key);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            <Outlet />
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextValue => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
    return ctx;
};
