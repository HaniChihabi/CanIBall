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
        eV
    },
    lng: 'ln',
    fallbackLng: 'ln',
    interpolation: { escapeValue: false },
  });

export default i18n;
