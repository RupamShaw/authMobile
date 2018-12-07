import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import Link from '../shared/base-components/link/Link';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
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

const ForgotPassword = (props) => {
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
        {translations.forgot_password}
      </Text>
    </View>
  );
};

ForgotPassword.propTypes = {
  translations: PropTypes.shape().isRequired,
};

export const mapStateToProps = state => ({
  translations: {
    login: state.locale.translations.login,
    forgot_password: state.locale.translations.forgot_password,
  },
});

export default connect(mapStateToProps, null)(ForgotPassword);
