import React from 'react';
import {
  string,
  func,
  number,
  object,
  oneOfType,
  array,
} from 'prop-types';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

const Button = ({
  style,
  onClick,
  text,
  textStyle,
}) => (
  <TouchableOpacity onPress={onClick} style={style}>
    <Text style={textStyle}>{text}</Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  style: {},
  textStyle: {},
  onClick: () => {},
};

Button.propTypes = {
  style: oneOfType([object, array, string, number]),
  textStyle: oneOfType([object, array, string, number]),
  onClick: func,
  text: string.isRequired,
};

export default Button;
