import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { dictionary } from './dictionary';

i18n
    .use(initReactI18next)
    .init({
        resources: dictionary,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;