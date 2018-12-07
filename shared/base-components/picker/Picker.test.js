import { Platform } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Picker from './Picker';

const isWeb = Platform.OS === 'web';

const currentValue = 'en';
const localeOptions = [
  {
    label: 'en',
    value: 'en',
  },
  {
    label: 'ch',
    value: 'ch',
  },
];

describe('Picker component', () => {
  it('should pass style to children ', () => {
    const mockFunc = jest.fn();
    const pickerStyle = {
      borderColor: '#898989',
    };
    const tree = shallow(
      <Picker
        currentValue={currentValue}
        options={localeOptions}
        onChange={mockFunc}
        style={pickerStyle}
      />,
    );
    expect(tree.find('Picker').props().style).toEqual(pickerStyle);
  });

  it('trigger onChange callback', () => {
    const mockFunc = jest.fn();
    const pickerStyle = {
      borderColor: '#898989',
    };
    const tree = renderer.create(
      <Picker
        currentValue={currentValue}
        options={localeOptions}
        onChange={mockFunc}
        style={pickerStyle}
      />,
    ).root;

    const value = 'ch';
    if (isWeb) {
      const event = { target: { value } };
      tree.findByType('select').props.onChange(event);
    } else {
      const event = 'ch';
      const pickerProp = {
        style: pickerStyle,
      };
      tree.findByProps(pickerProp).props.onChange(event);
    }

    expect(mockFunc.mock.calls).toHaveLength(1);
    expect(mockFunc).toBeCalledWith(value);
  });
});
