import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';

import { shape, func } from 'prop-types';
import { logout as logoutAction } from '../../auth/store/actions';
import Button from '../../shared/base-components/button/Button';
import { Menu } from '../Menu';

const logo = require('../../assets/matrak-logo.png');

export const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: '#F5FCFF',
    margin: 20,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biggerText: {
    fontSize: 17,
    alignSelf: 'center',
  },
  button: {
    margin: 5,
  },
  buttonText: {
    color: '#00F',
  },
  image: {
    width: 200,
    height: 40,
  },
});

export const Dashboard = (props) => {
  const { translations, logout } = props;
  return (
    <View style={styles.container}>
      <Menu />
      <View style={styles.content}>
        <Text style={styles.biggerText}>{translations.home__welcome}</Text>
        <Image
          source={logo}
          style={styles.image}
        />
        <View style={styles.row}>
          <Button
            style={styles.button}
            text={translations.logout}
            onClick={logout}
            textStyle={styles.buttonText}
          />
        </View>
        <Text style={styles.text}>
          {translations.home__loggedin}
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  translations: {
    home__loggedin: state.locale.translations.home__loggedin,
    home__welcome: state.locale.translations.home__welcome,
    logout: state.locale.translations.logout,
  },
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});

Dashboard.propTypes = {
  logout: func.isRequired,
  translations: shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
