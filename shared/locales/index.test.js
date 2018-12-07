import getTranslations from './index';

const USLocale = require('./en-US.js');

const CNLocale = require('./cn-CN.js');

const locales = {
  en: USLocale,
  cn: CNLocale,
};

describe('Locales', () => {
  it('returns en by default', () => {
    const translations = getTranslations();
    expect(translations.login).toEqual(locales.en.login);
  });
  it('returns the currect translations for en', () => {
    const translations = getTranslations('en');
    expect(translations.login).toEqual(locales.en.login);
  });
  it('returns the currect translations for cn', () => {
    const translations = getTranslations('cn');
    expect(translations.login).toEqual(locales.cn.login);
  });
});
