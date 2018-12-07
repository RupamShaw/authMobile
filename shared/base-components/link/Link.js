import React from 'react';
import {
  Text,
  Platform,
} from 'react-native';
import {
  string,
  array,
  object,
  oneOfType,
  number,
  any,
} from 'prop-types';
import { Link as NativeLink } from '../../routing/router';

const isWeb = Platform.OS === 'web';

const Link = ({
  to,
  children,
  style,
  textStyle,
}) => (
  <NativeLink
    to={to}
    style={isWeb ? {} : style}
    className={isWeb ? style : ''}
  >
    <Text style={textStyle}>{children}</Text>
  </NativeLink>
);

Link.defaultProps = {
  children: '',
};

Link.propTypes = {
  to: oneOfType([object, string]).isRequired,
  children: any,
  textStyle: oneOfType([object, array, string, number]).isRequired,
  style: oneOfType([object, array, string, number]).isRequired,
};

export default Link;
