import SET_LOCALE from './types';

// in future actions having more methods
// eslint-disable-next-line import/prefer-default-export
export const setLocale = currentLocale => ({
  type: SET_LOCALE,
  currentLocale,
});
