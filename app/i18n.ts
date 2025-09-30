import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';


import arcommon from './comps/locales/ar/common.json';
import frcommon from './comps/locales/fr/common.json';
import encommon from './comps/locales/en/common.json';

export async function initTranslations(
  locale: string,
  namespaces: string[] = ['common']
) {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .init({
      resources: {
        ar: {
          common: arcommon, 
        },
        en: {
          common: encommon, 
        },
        fr: {
          common: frcommon, 
        },
      },
      lng: locale,       
      fallbackLng: 'ar', 
      ns: namespaces,     
      defaultNS: 'common' 
    });

  return i18nInstance;
}
