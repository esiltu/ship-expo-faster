import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from 'i18next';
import { getItem, setItem } from '../store/storage';

interface LanguageContextProps {
    language: string;
    setLanguage: (lang: string) => void;
}

interface LanguageProviderProps {
    children: ReactNode;
}

const LanguageContext = createContext<LanguageContextProps>({
    language: 'en',
    setLanguage: () => { },
});

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const initializeLanguage = async () => {
            try {
                const storedLanguage = await getItem('app_language');
                const initialLanguage = storedLanguage || 'en';
                setLanguage(initialLanguage);
                await i18n.changeLanguage(initialLanguage);
            } catch (error) {
                console.error('Failed to initialize language:', error);
            }
        };

        initializeLanguage();
    }, []);

    const changeLanguage = async (lang: string) => {
        try {
            await setItem('app_language', lang);
            await i18n.changeLanguage(lang);
            setLanguage(lang);
        } catch (error) {
            console.error('Failed to change language:', error);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
