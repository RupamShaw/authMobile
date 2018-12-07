import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const intl = require('intl');

const IntlPolyfill = intl;

const areIntlLocalesSupported = require('intl-locales-supported');

const localesMyAppSupports = [
  /* list locales here */
];
if (global.Intl) {
  // `Intl` exists, but it doesn't have the data we need, so load the
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // polyfill and replace the constructors with need with the polyfill's.
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = intl;
}
const mapStateToProps = state => ({
  key: state.locale.currentLocale,
  currentLocale: state.locale.currentLocale,
  translations: state.locale.translations,
});

export default connect(mapStateToProps)(IntlProvider);
