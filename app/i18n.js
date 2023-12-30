import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ln from './locales/ln.json';
import en from './locales/en.json';
import de from './locales/de.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import sv from './locales/sv.json';
import ar from './locales/ar.json';
import kr from './locales/kr.json';
import jp from './locales/jp.json';
import ch from './locales/ch.json';
import rs from './locales/rs.json';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      ln: { translation: ln },   
      de: { translation: de },
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      pt: { translation: pt },
      sv: { translation: sv },
      ar: { translation: ar },
      kr: { translation: kr },
      jp: { translation: jp },
      ch: { translation: ch },
      rs: { translation: rs },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
