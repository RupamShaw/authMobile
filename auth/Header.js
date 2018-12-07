import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import baseStyles from '../shared/baseStyles';

const source = require('../assets/matrak-logo.png');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 124,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  mainTextStyle: {
    marginTop: 14,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    height: 21,
    width: 183,
  },
  image: {
    width: 183,
    height: 39,
  },
});

export const Header = (props) => {
  const { translations } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={source} resizeMode="contain" />
      <Text style={[baseStyles.mainText, styles.mainTextStyle]}>{translations.signin_started}</Text>
    </View>
  );
};

const mapStateToProps = state => ({
  currentLocale: state.locale.currentLocale,
  translations: {
    signin_started: state.locale.translations.signin_started,
  },
});

Header.propTypes = {
  translations: shape().isRequired,
};

export const ConnectHeader = connect(mapStateToProps, null)(Header);
