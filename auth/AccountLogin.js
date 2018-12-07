import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { PropTypes } from 'prop-types';
import Button from '../shared/base-components/button/Button';
import { Redirect } from '../shared/routing/router';
import { ConnectLanguageDropdown } from '../shared/locales/LanguageDropDown';
import { ConnectHeader } from './Header';
import { ConnectSignIn } from './SignIn';
import ActivityLoader from '../shared/base-components/loader/ActivityLoader';
import baseStyles, {
  LOGIN_IMAGE_BACKGROUND_COLOR,
} from '../shared/baseStyles';

const imageBackground = require('../assets/main-bg.jpg');

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: LOGIN_IMAGE_BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    margin: 0,
  },
  absoluteImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 0,
    right: 0,
  },
  newMatrakSignupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 60,
  },
});

export class AccountLogin extends Component {
  state = {
    signupRedirect: false,
  };

  signupRenderRedirect = () => {
    const { signupRedirect } = this.state;
    if (signupRedirect) {
      return <Redirect to="/signup" />;
    }
  };

  setSignupRedirect = () => {
    this.setState({
      signupRedirect: true,
    });
  };

  render() {
    const { isLoggedIn, translations, isLoading } = this.props;
    return isLoggedIn ? (
      <Redirect to="/" />
    ) : (
      <View style={styles.mainContainer}>
        <Image
          source={imageBackground}
          resizeMode="contain"
          style={styles.absoluteImage}
          alt="background"
        />
        <View style={styles.container}>
          <ConnectHeader />
          {isLoading ? <ActivityLoader /> : null}
          <ConnectSignIn />
          <View style={styles.newMatrakSignupContainer}>
            <Text style={baseStyles.mediumText}>{translations.new_matrak}</Text>
            <Button
              textStyle={baseStyles.majorLinkText}
              onClick={this.setSignupRedirect}
              text={translations.signup}
            />
            {this.signupRenderRedirect()}
          </View>
          <ConnectLanguageDropdown />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentLocale: state.locale.currentLocale,
  isLoggedIn: state.auth.isLoggedIn,
  translations: {
    new_matrak: state.locale.translations.new_matrak,
    signup: state.locale.translations.signup,
  },
  isLoading: state.auth.isLoading,
});

AccountLogin.defaultProps = {
  isLoggedIn: false,
  isLoading: false,
};

AccountLogin.propTypes = {
  isLoggedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
  translations: PropTypes.shape().isRequired,
};

export const ConnectAccountLogin = connect(mapStateToProps, null)(AccountLogin);
