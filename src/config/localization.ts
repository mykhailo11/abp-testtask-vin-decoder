import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // do not use in production
    debug: true,
    fallbackLng: 'en',
    // lng: 'ua',
    interpolation: {
      escapeValue: false,
    },
    /*
     * lng - language allias
     * ns - namespace allias 
     */
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;