import React from 'react';
import {
  View,
  TextInput,
  Animated,
} from 'react-native';
import { shallow } from 'enzyme';
import FloatingLabelInput from './FloatingLabelInput';
import translations from '../../locales/en-US';
import {
  ERROR_COLOR,
  DEFAULT_TEXTBOX_BORDER_COLOR,
} from '../../baseStyles';

describe(' component', () => {
  const value = 'matrak';
  let tree;
  const mockFunc = jest.fn();
  const userImage = require('../../../assets/user.png');
  it('renders proper label and textInput value ', () => {
    const userNameErrorLabel = translations.login_username_required;
    tree = shallow(
      <FloatingLabelInput
        label={translations.login__username__placeholder}
        value={value}
        onChangeText={mockFunc}
        onKeyPress={mockFunc}
        errorLabel={userNameErrorLabel}
      />,
    );
    expect(tree.find(Animated.Text).at(0).props().children).toEqual(
      translations.login__username__placeholder,
    );
  });

  it(' textInput default props underline and autocorrect ', () => {
    tree = shallow(
      <FloatingLabelInput
        label={translations.login__username__placeholder}
        value={value}
        onChangeText={mockFunc}
        onKeyPress={mockFunc}
      />,
    );
    const textInput = tree.find(TextInput);
    expect(tree.find(TextInput).props().underlineColorAndroid).toEqual(
      'transparent',
    );
    expect(textInput.props().autoCorrect).toEqual(false);
  });

  it('renders changed Value of TextInput', () => {
    tree = shallow(
      <FloatingLabelInput
        label={translations.login__username__placeholder}
        value={value}
        onChangeText={mockFunc}
        onKeyPress={mockFunc}
      />,
    );
    const textInput = tree.find(TextInput);
    textInput.simulate('change', value);
    expect(tree.find(TextInput).props().value).toEqual(value);
  });

  it('FloatingLabelInput passes the right props', () => {
    tree = shallow(
      <FloatingLabelInput
        label={translations.login__username__placeholder}
        value={value}
        onChangeText={mockFunc}
        autoCorrect={false}
        onKeyPress={mockFunc}
        underlineColorAndroid="transparent"
        imageSource={userImage}
      />,
    );
    const textInput = tree.find(TextInput);
    const image = tree.find('Image');
    expect(tree.find(Animated.Text).at(0).props().children).toEqual(
      translations.login__username__placeholder,
    );
    expect(textInput.props().value).toEqual(value);
    expect(textInput.props().onChangeText).toEqual(mockFunc);
    expect(textInput.props().onKeyPress).toEqual(mockFunc);
    expect(image.props().source).toEqual(userImage);
  });

  it(' textInput empty then errorLabel and textInput border should be there', () => {
    const errorLabel = translations.login_username_required;
    tree = shallow(
      <FloatingLabelInput
        label={translations.login__username__placeholder}
        formDirty
        value=""
        errorLabel={errorLabel}
        onChangeText={mockFunc}
        imageSource={userImage}
        autoCorrect={false}
        onKeyPress={mockFunc}
        underlineColorAndroid="transparent"
      />,
    );
    let errorBorderColor = tree.find(View).at(0).props().style.find(obj => (
      obj.borderColor === ERROR_COLOR)).borderColor;
    expect(errorBorderColor).toEqual(ERROR_COLOR);
    expect(tree.find(Animated.Text).at(1).props().children).toEqual(errorLabel);
    tree = shallow(
      <FloatingLabelInput
        label={translations.login__username__placeholder}
        formDirty
        value="Matrak"
        errorLabel=""
        onChangeText={mockFunc}
        autoCorrect={false}
        onKeyPress={mockFunc}
        underlineColorAndroid="transparent"
      />,
    );
    errorBorderColor = tree.find(View).at(0).props().style.find(obj => (
      obj.borderColor === DEFAULT_TEXTBOX_BORDER_COLOR
    )).borderColor;
    expect(errorBorderColor).toEqual(DEFAULT_TEXTBOX_BORDER_COLOR);
    expect(tree.find(Animated.Text).at(1).props().children).toEqual('');
  });

  it('after trigger onFocus onBLur it unmounts properly', () => {
    tree = shallow(
      <FloatingLabelInput
        label={translations.login__username__placeholder}
        value={value}
        onChangeText={mockFunc}
        onKeyPress={mockFunc}
      />,
    );
    const textInput = tree.find(TextInput);
    textInput.simulate('focus');
    textInput.simulate('blur');
    tree.unmount();
  });
});
