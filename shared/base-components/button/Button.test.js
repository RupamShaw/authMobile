import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { shallow } from 'enzyme';
import Button from './Button';

const text = 'test button';

describe('Button component', () => {
  describe('functionality', () => {
    it('button should apply styles to children', () => {
      const mockFunc = jest.fn();
      const buttonStyle = {
        color: '#898989',
      };
      const buttonTextStyle = {
        color: '#f5f5f5',
      };
      const tree = shallow(
        <Button onClick={mockFunc} text={text} style={buttonStyle} textStyle={buttonTextStyle} />,
      );
      expect(
        tree.contains(
          <TouchableOpacity onPress={mockFunc} style={buttonStyle}>
            <Text style={buttonTextStyle}>{text}</Text>
          </TouchableOpacity>,
        ),
      ).toBe(true);
    });

    it('trigger onClick callback', () => {
      const mockFunc = jest.fn();
      const tree = shallow(
        <Button text={text} onClick={mockFunc} />,
      );
      const btn = tree.find(TouchableOpacity);
      btn.simulate('press');
      expect(mockFunc.mock.calls).toHaveLength(1);
      expect(mockFunc).toBeCalled();
    });
  });
});
