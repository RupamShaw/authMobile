import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 100,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 200,
    width: 200,
  },
});

const spinnerImage = require('../../../assets/spinner.gif');

const ActivityLoader = () => (
  <View style={styles.modalBackground}>
    <View style={styles.activityIndicatorWrapper}>
      <Image
        source={spinnerImage}
        style={styles.imageStyle}
        resizeMode="cover"
      />
    </View>
  </View>
);

export default ActivityLoader;
