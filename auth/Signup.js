import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { shape } from 'prop-types';
import Link from '../shared/base-components/link/Link';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  link: {
    margin: 2,
    marginTop: 10,
    height: 20,
  },
  linkText: {
    color: '#04f',
    fontSize: 16,
  },
});

const Signup = (props) => {
  const { translations } = props;
  return (
    <View style={styles.container}>
      <Link
        to="/login"
        textStyle={styles.linkText}
        style={styles.link}
        key="menuLink_Login"
      >
        {translations.login}
      </Link>
      <Text style={styles.text}>
        {translations.signup}
      </Text>
    </View>
  );
};
export const mapStateToProps = state => ({
  translations: {
    login: state.locale.translations.login,
    signup: state.locale.translations.signup,
  },
});

Signup.propTypes = {
  translations: shape().isRequired,
};

export default connect(mapStateToProps, null)(Signup);
