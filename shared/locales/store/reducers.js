import SET_LOCALE from './types';
import getTranslations from '../index';

const initialState = {
  currentLocale: 'en',
  translations: getTranslations('en'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        currentLocale: action.currentLocale,
        translations: getTranslations(action.currentLocale),
      };
    default:
      return state;
  }
};
