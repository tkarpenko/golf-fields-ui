import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import HttpApi from 'i18next-http-backend';

// i18n
//   .use(initReactI18next) 
//   .init({
//     resources: {},
//     fallbackLng: 'en',
//     lng: 'en', 
//     interpolation: {
//       escapeValue: false 
//     },
//   });

// const options = {
//   loadPath: '/locales/{{ns}}/{{lng}}.json',
// };

i18n
// .use(HttpApi)
.use(initReactI18next) 
.init({
  // partialBundledLanguages: true,
  // debug: true,
  fallbackLng: 'en',
  // react: {
  //   useSuspense: false
  // },
  ns: [],
  resources: {},
  // backend: options,
});

// i18n.loadNamespaces(['common', 'login'])
// i18n.loadLanguages(['en', 'ua'])

  export default i18n;