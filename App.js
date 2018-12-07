<script src="http://localhost:8097"></script>
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ch from 'react-intl/locale-data/zh';
import {
  Font,
  AppLoading,
} from 'expo';
import store from './store/store';
import Home from './home/Home';
import { ConnectAccountLogin } from './auth/AccountLogin';
import ForgotPassword from './auth/ForgotPassword';
import Signup from './auth/Signup';
import NotFound from './home/NotFound';
import { ConnectPrivateRoute } from './shared/routing/private-route/PrivateRoute';
import {
  Router,
  Switch,
  Route,
} from './shared/routing/router';
import IntlProvider from './shared/locales/intlProvider';
import { ConnectToastWrapper } from './shared/base-components/toast/ToastWrapper';

global.Intl = require('intl');

const FontBlack = require('./assets/fonts/Muli-Black.ttf');
const FontBlackItalic = require('./assets/fonts/Muli-BlackItalic.ttf');
const FontBold = require('./assets/fonts/Muli-Bold.ttf');
const FontBoldItalic = require('./assets/fonts/Muli-BoldItalic.ttf');
const FontExtraBold = require('./assets/fonts/Muli-ExtraBold.ttf');
const FontExtraBoldItalic = require('./assets/fonts/Muli-ExtraBoldItalic.ttf');
const FontExtraLight = require('./assets/fonts/Muli-ExtraLight.ttf');
const FontExtraLightItalic = require('./assets/fonts/Muli-ExtraLightItalic.ttf');

const FontItalic = require('./assets/fonts/Muli-Italic.ttf');
const FontLight = require('./assets/fonts/Muli-Light.ttf');
const FontLightItalic = require('./assets/fonts/Muli-LightItalic.ttf');
const FontRegular = require('./assets/fonts/Muli-Regular.ttf');
const FontSemiBold = require('./assets/fonts/Muli-SemiBold.ttf');
const FontSemiBoldItalic = require('./assets/fonts/Muli-SemiBoldItalic.ttf');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    try {
      await Font.loadAsync({
        FontBlack,
        FontBlackItalic,
        FontBold,
        FontBoldItalic,
        FontExtraBold,
        FontExtraBoldItalic,
        FontExtraLight,
        FontExtraLightItalic,
        FontItalic,
        FontLight,
        FontLightItalic,
        FontRegular,
        FontSemiBold,
        FontSemiBoldItalic,
      });
      this.setState({ fontLoaded: true });
    } catch (error) { // eslint-disable-next-line no-console
      console.log('error in loading font', error);
    }
  }

  render() {
    addLocaleData([en, ch]);
    const { fontLoaded } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" hidden={false} />
        {fontLoaded ? (
          <Provider store={store}>
            <IntlProvider locale="en">
              <View>
                <Router>
                  <Switch>
                    <Route
                      exact
                      path="/login"
                      component={ConnectAccountLogin}
                    />
                    <Route
                      exact
                      path="/forgotPassword"
                      component={ForgotPassword}
                    />
                    <Route exact path="/signup" component={Signup} />
                    <ConnectPrivateRoute exact path="/" component={Home} />
                    <Route component={NotFound} />
                  </Switch>
                </Router>
                <ConnectToastWrapper />
              </View>
            </IntlProvider>
          </Provider>
        ) : (
          <AppLoading />
        )}
      </View>
    );
  }
}
export default App;
