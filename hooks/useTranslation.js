import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getItem, setItem } from '../store/storage';

import en from '../assets/locales/english.json';
import nl from '../assets/locales/dutch.json';
import tr from '../assets/locales/turkish.json';
import ar from '../assets/locales/arabic.json';
import zh from '../assets/locales/chinese.json';
import es from '../assets/locales/spanish.json';
import fr from '../assets/locales/french.json';
import de from '../assets/locales/deutsch.json';

const resources = {
    en: { translation: en },
    nl: { translation: nl },
    tr: { translation: tr },
    ar: { translation: ar },
    zh: { translation: zh },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de }
};

const initializeLanguage = async () => {
    try {
        const storedLanguage = await getItem('app_language');
        console.log(storedLanguage)
        const deviceLanguage = 'en'; // Set fallback device language if necessary

        // Set initial language
        const initialLanguage = storedLanguage || deviceLanguage;

        await i18n
            .use(initReactI18next)
            .init({
                resources,
                lng: initialLanguage,
                fallbackLng: 'en', // Set a consistent fallback language
                interpolation: {
                    escapeValue: false,
                },
                compatibilityJSON: 'v3',
            });

        // Store the language preference if not already stored
        if (!storedLanguage) {
            await setItem('app_language', initialLanguage);
        }
    } catch (error) {
        console.error('Failed to initialize i18next:', error);
    }
};

initializeLanguage();

const getCurrentLanguage = () => i18n.language;

export default i18n;
export { getCurrentLanguage };
