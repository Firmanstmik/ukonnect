import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Language, type TranslationKey, getTranslation } from './translations';

interface LanguageContextValue {
    lang: Language;
    setLang: (l: Language) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>('pt');

    const t = (key: TranslationKey) => getTranslation(lang, key);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextValue => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
    return ctx;
};
