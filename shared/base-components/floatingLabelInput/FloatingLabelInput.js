import {
  TextInput,
  View,
  StyleSheet,
  Animated,
  Image,
}
  from 'react-native';

import React from 'react';
import {
  string,
  func,
  bool,
  object,
  oneOfType,
  number,
  array,
} from 'prop-types';
import baseStyles, {
  MINOR_LABEL_FONT_SIZE,
  MAJOR_LABEL_FONT_SIZE,
  MAJOR_LABEL_COLOR,
  MINOR_LABEL_COLOR,
  TEXT_INPUT_FONT_SIZE,
  ERROR_COLOR,
  DEFAULT_TEXTBOX_BORDER_COLOR,
} from '../../baseStyles';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingLeft: 8,
    flex: 1,
  },
  textInput: {
    marginBottom: 5,
    height: 50,
    fontSize: TEXT_INPUT_FONT_SIZE,
  },
  errorLabel: {
    position: 'absolute',
    right: 2,
    marginTop: 43,
  },
  defaultTextBoxBorderColor: {
    borderColor: DEFAULT_TEXTBOX_BORDER_COLOR,
  },
  textboxBorderErrorColor: {
    borderColor: ERROR_COLOR,
  },
  imageMargin: {
    margin: 10,
  },
});
class FloatingLabelInput extends React.Component {
  currentAnimation = null;

  constructor(props) {
    super(props);
    this.state = {
      isDirty: false, // user untouched is false
    };
  }

  componentWillMount() {
    const { value } = this.props;
    this.animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);
  }

  componentWillUnmount() {
    if (this.currentAnimation != null) this.currentAnimation.stop();
  }

  handleFocus = () => this.updateAnimatedFocus(true);

  handleBlur = () => {
    this.setState({ isDirty: true });
    this.updateAnimatedFocus(false);
  }

  handleChange = (event) => {
    const { onChangeText } = this.props;
    this.setState({ isDirty: true });
    onChangeText(event);
  }

  updateAnimatedFocus(isFocused) {
    const { value } = this.props;
    this.currentAnimation = Animated.timing(this.animatedIsFocused, {
      toValue: (isFocused || value !== '') ? 1 : 0,
      duration: 0,
    });
    this.currentAnimation.start();
  }

  render() {
    const redBorder = styles.textboxBorderErrorColor;
    const defaultBorder = styles.defaultTextBoxBorderColor;
    const {
      label,
      errorLabel,
      formDirty,
      imageStyle,
      imageSource,
      ...props
    } = this.props;
    const {
      isDirty,
    } = this.state;
    const checkImage = imageSource;
    const errorText = formDirty || isDirty ? errorLabel : '';
    const borderStyle = errorText === '' ? defaultBorder : redBorder;

    const labelStyle = {
      position: 'absolute',
      left: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 5],
      }),
      marginTop: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [28, 15],
      }),
      fontSize: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [MAJOR_LABEL_FONT_SIZE, MINOR_LABEL_FONT_SIZE],
      }),
      color: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [MAJOR_LABEL_COLOR, MINOR_LABEL_COLOR],
      }),
      fontFamily: 'FontSemiBoldItalic',
      lineHeight: this.animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 14],
      }),
    };

    return (
      <View
        style={[
          baseStyles.textInputImageSection,
          borderStyle,
        ]}
      >
        <View style={styles.container}>
          <Animated.Text style={labelStyle}>
            {label}
          </Animated.Text>
          <TextInput
            {...props}
            style={styles.textInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
          />
          <Animated.Text style={[styles.errorLabel, baseStyles.errorLabelText]}>
            {errorText}
          </Animated.Text>
        </View>
        {checkImage > 0 && (
        <Image
          source={imageSource}
          style={[styles.imageMargin, imageStyle]}
          resizeMode="contain"
        />
        )}
      </View>
    );
  }
}

FloatingLabelInput.defaultProps = {
  autoCorrect: false,
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
  errorLabel: '',
  formDirty: false,
  imageStyle: {},
  imageSource: 0,
};

FloatingLabelInput.propTypes = {
  autoCorrect: bool,
  formDirty: bool,
  underlineColorAndroid: string,
  label: string.isRequired,
  errorLabel: string,
  value: string.isRequired,
  onChangeText: func.isRequired,
  onKeyPress: func.isRequired,
  imageStyle: oneOfType([object, number, array]),
  imageSource: number,
};

export default FloatingLabelInput;
