import { StyleSheet } from 'react-native';

export const ERROR_COLOR = '#FF5959';
export const SUCCESS_COLOR = '#3F9E4D';
export const MESSAGE_COLOR = '#FFFFFF';
export const LOGIN_IMAGE_BACKGROUND_COLOR = '#F1FAFF';
export const DEFAULT_TEXTBOX_BORDER_COLOR = '#C9ECFF';
export const INPUT_TEXTBOX_BACKGROUND_COLOR = '#fff';
export const BUTTON_BACKGROUND_COLOR = '#4986FF';
export const TEXT_INPUT_FONT_SIZE = 20;
export const MINOR_LABEL_FONT_SIZE = 11;
export const MAJOR_LABEL_FONT_SIZE = 14;
export const MINOR_LABEL_COLOR = '#898989';
export const MAJOR_LABEL_COLOR = '#C4C4C4';

const baseStyles = StyleSheet.create({
  mainText: {// in header text
    color: '#4A4A4A',
    fontFamily: 'FontRegular',
    fontSize: 17,
    lineHeight: 18,
  },
  smallIcon: {
    height: 15,
    width: 13,
  },
  mediumIcon: {
    height: 19,
    width: 13,
  },
  largeIcon: {
    width: 20,
    height: 20,
  },
  extraLargeIcon: {
    width: 27,
    height: 27,
  },
  whiteTextButton: { // signin
    color: '#FFFFFF',
    fontFamily: 'FontBlack',
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 25,
  },
  bigButton: {// signin
    backgroundColor: BUTTON_BACKGROUND_COLOR,
    width: 295,
    height: 50,
    marginTop: 49,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  mediumText: {// newMatText
    color: '#898989',
    fontFamily: 'FontSemiBold',
    fontSize: 15,
    letterSpacing: -0.54,
    lineHeight: 19,
  },
  majorLinkText: {// signup
    color: '#4986FF',
    fontFamily: 'FontExtraBold',
    fontSize: 15,
    letterSpacing: -0.5,
    lineHeight: 19,
  },
  minorLinkText: { // forgot
    color: '#4986FF',
    height: 18,
    fontFamily: 'FontSemiBold',
    fontSize: 14,
    letterSpacing: -0.5,
    lineHeight: 18,
  },
  textInputImageSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: INPUT_TEXTBOX_BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: DEFAULT_TEXTBOX_BORDER_COLOR,
    width: 295,
    height: 50,
    borderRadius: 5,
  },
  errorLabelText: {
    fontSize: MINOR_LABEL_FONT_SIZE,
    color: ERROR_COLOR,
    fontFamily: 'FontSemiBoldItalic',
    lineHeight: 14,
  },
});

export default baseStyles;
