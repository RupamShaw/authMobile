import React from 'react';
import {
  string,
  arrayOf,
  func,
  object,
  number,
  oneOfType,
} from 'prop-types';
import { Picker as NativePicker } from 'react-native';

const Picker = ({
  style,
  currentValue,
  onChange,
  options,
}) => (
  <NativePicker
    style={style}
    selectedValue={currentValue}
    onValueChange={onChange}
  >
    {options.map(option => (
      <NativePicker.Item key={`${option.label}_${option.value}`} label={option.label} value={option.value} />
    ))}
  </NativePicker>
);

Picker.defaultProps = {
  style: {},
};

Picker.propTypes = {
  style: oneOfType([object, string, number]),
  currentValue: string.isRequired,
  onChange: func.isRequired,
  options: arrayOf(object).isRequired,
};

export default Picker;
