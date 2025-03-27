import { ui, defaultLang, showDefaultLang } from './ui';
import { getRelativeLocaleUrl } from "astro:i18n";

const locales = {
  es: {},
  en: {},
  br: {}
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}

export function removeLanguagePrefix(url: String){

  const supportedLanguages = ['en', 'br','es'];  // Lista de idiomas soportados
  
  const segments = url.split('/');

  // return supportedLanguages.includes(segments[1]) ? 'tiene prefijo' : ''

  if(supportedLanguages.includes(segments[1])){
    return segments[2]
  }else{
    return segments[1]
  }

  // if (segments[1]) {
  //   return 'tiene / o /prefijo'
  // }else if(segments.length >)

  

  // / && /prefijo length = 2
  // otro > 2
  
}

export function getLocalePaths(url: URL) {

  let newUrl = removeLanguagePrefix(url.pathname)

  console.log(newUrl);

  return Object.keys(locales).map((lang) => {
    return {
      lang: lang,
      path: getRelativeLocaleUrl(lang, newUrl)
    }
  });
}