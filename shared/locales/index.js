import en from './en-US';
import cn from './cn-CN';

const locales = {
  en,
  cn,
};

export const localeOptions = [
  {
    label: 'en',
    value: 'en',
  },
  {
    label: 'cn',
    value: 'cn',
  },
];

const getTranslations = (locale = 'en') => locales[locale];

export default getTranslations;
