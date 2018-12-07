import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export const NotFound = () => (
  <View style={styles.container}>
    <Text>404 Page Not Found</Text>
  </View>
);
