import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  string,
  func,
} from 'prop-types';
import baseStyles, {
  ERROR_COLOR,
  MESSAGE_COLOR,
} from '../../baseStyles';

export const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    backgroundColor: ERROR_COLOR,
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    zIndex: 100,
    position: 'absolute',
    top: 0,
  },
  messageText: {
    fontFamily: 'FontLight',
    color: MESSAGE_COLOR,
  },
  touchableCloseImageMargin: {
    margin: 3.5,
  },
  closeImage: {
    width: '100%',
    height: '100%',
  },

});

const errorExclaimImage = require('../../../assets/error-exclaim.png');
const closeImage = require('../../../assets/close.png');

export const Toast = (props) => {
  const { message, handleClose, color } = props;
  const bgcolor = { backgroundColor: `${color}` };
  return (
    <View style={[styles.messageContainer, bgcolor]}>
      <Image
        style={baseStyles.extraLargeIcon}
        source={errorExclaimImage}
        resizeMode="contain"
      />
      <Text style={styles.messageText}>
        {message}
      </Text>
      <TouchableOpacity
        style={[styles.touchableCloseImageMargin, baseStyles.largeIcon]}
        onPress={handleClose}
      >
        <Image style={styles.closeImage} source={closeImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
Toast.defaultProps = {
  color: ERROR_COLOR,
};
Toast.propTypes = {
  message: string.isRequired,
  handleClose: func.isRequired,
  color: string,
};
