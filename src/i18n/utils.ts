import { ui, defaultLang } from './ui';
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

export function getLocalePaths(url: URL) {
  return Object.keys(locales).map((lang) => {
    // console.log(getRelativeLocaleUrl("en","about"));

    return {
      lang: lang,
      path: getRelativeLocaleUrl(lang, url.pathname.replace(/^\/[a-zA-Z-]+/, ''))
    }
  });
}