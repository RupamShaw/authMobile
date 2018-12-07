import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Link from '../shared/base-components/link/Link';

export const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
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

const routes = [
  {
    to: '/',
    label: 'Home',
  },
];

export const Menu = () => (
  <View style={styles.container}>
    {routes.map(route => (
      <Link to={route.to} textStyle={styles.linkText} style={styles.link} key={`menuLink_${route.label}`}>
        {route.label}
      </Link>
    ))}
  </View>
);
