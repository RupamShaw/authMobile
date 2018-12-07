import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Keyboard } from "react-native";
import { func, shape, bool } from "prop-types";
import { login, resetLoginControlVars } from "./store/actions";
import { setToast } from "../shared/base-components/toast/store/actions";
import Button from "../shared/base-components/button/Button";
import {
  extractValueFromEvent,
  extractKeyFromEvent
} from "../shared/event-helpers";
import FloatingLabelInput from "../shared/base-components/floatingLabelInput/FloatingLabelInput";
import { Redirect } from "../shared/routing/router";
import baseStyles from "../shared/baseStyles";
import { isUsernameValid, isPasswordValid } from "../utils/validationHelper";
const userImage = require("../assets/user.png");
const lockImage = require("../assets/lock.png");

export const styles = StyleSheet.create({
  userNameFLI: {
    marginTop: 20
  },
  passwordFLI: {
    marginTop: 10
  },
  loginForm: {
    backgroundColor: "transparent",
    top: 44,
    flexDirection: "column",
    height: 280,
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    marginTop: 49
  },
  forgotLink: {
    marginTop: 11,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 50
  },
  forgotText: {
    justifyContent: "flex-end"
  }
});
/* eslint-disable react/no-unused-state */
export class SignIn extends Component {
  lastDisplayedError = "";
  // state error only for test

  state = {
    userName: "",
    password: "",
    userNameErrorLabel: "",
    passwordErrorLabel: "",
    error: "",
    forgotPasswordRedirect: false,
    formDirty: false
  };

  componentDidUpdate() {
    this.serverErrorToast();
  }

  setforgotPasswordRedirect = () => {
    this.setState({
      forgotPasswordRedirect: true
    });
  };

  forgotPasswordRenderRedirect = () => {
    const { forgotPasswordRedirect } = this.state;
    if (forgotPasswordRedirect) {
      return <Redirect to="/forgotPassword" />;
    }
  };

  onUserNameChange = event => {
    this.setState({
      userName: extractValueFromEvent(event),
      userNameErrorLabel: ""
    });
  };

  onPasswordChange = event => {
    this.setState({
      password: extractValueFromEvent(event),
      passwordErrorLabel: ""
    });
  };

  validateTextInput = () => {
    const { userName, password } = this.state;
    const { translations } = this.props;
    const userNameErrorLabel = isUsernameValid(userName) ? "" : translations.login_username_invalid;
    const passwordErrorLabel = isPasswordValid(password) ? "" : translations.login_password_invalid;
    const error = this.getToastMessageforInvalid();
    this.setState({ error, userNameErrorLabel, passwordErrorLabel });
  };

  validateRequiredTextInput = () => {
    const { userName, password } = this.state;
    const { translations } = this.props;
    const userNameErrorLabel = userName ? "" : translations.login_username_required;
    const passwordErrorLabel = password ? "" : translations.login_password_required;
    const error = this.getToastMessage();
    this.setState({ error, userNameErrorLabel, passwordErrorLabel });
  };

  getToastMessage = () => {
    const { userName, password } = this.state;
    const { translations } = this.props;
    if (!userName && !password) {
      return translations.login_username_password_required;
    }
    if (!userName) {
      return translations.login_username_required;
    }
    if (!password) {
      return translations.login_password_required;
    }
    return ""  
  };
  getToastMessageforInvalid = () => {
    const { userName, password } = this.state;
    const { translations } = this.props;
    if (!isUsernameValid(userName) && !isPasswordValid(password)) {
      return translations.login_username_password_invalid;
    }
    if (!isUsernameValid(userName)) {
      return translations.login_username_invalid;
    }
    if (!isPasswordValid(password)) {
      return translations.login_password_invalid;
    }
    return "";
  };
  loginSubmit = () => {
    const { userName, password } = this.state;
    const user = {
      userName,
      password
    };
    const { dispatchLogin, dispatchResetLoginError } = this.props;
    dispatchResetLoginError();
    let error = this.getToastMessage();
    if(error === ""){
      error = this.getToastMessageforInvalid();
      this.validateTextInput(); //setstate for clientside error
    } else {
      this.validateRequiredTextInput(); //setstate for clientside error
    }
    this.lastDisplayedError = "";
    Keyboard.dismiss();
    if (error === "") {
      dispatchLogin(user);
    } else {
      this.showToast(error); //dispatchToast
      this.setState({ formDirty: true });
    }
  };

  handleKeyDown = event => {
    if (extractKeyFromEvent(event) === "Enter") {
      this.loginSubmit();
    }
  };

  showToast = errorToastMessage => {
    const { dispatchSetToast } = this.props;
    dispatchSetToast(errorToastMessage);
  };

  validateTextInputServerError = () => {
    const { userName, password } = this.state;
    const { translations } = this.props;

    const userNameErrorLabel = translations.login_username_invalid;
    const passwordErrorLabel = translations.login_password_invalid;
    this.setState({ userNameErrorLabel, passwordErrorLabel });
  };

  onServerErrorValidateErrorTextBox = () => {
    const { hasError, lastError, translations } = this.props;
    if (hasError) {
      if (Object.keys(lastError).length !== 0) {
        const toastMessage = lastError.error;
        if (toastMessage === translations.login_username_password_invalid) {
          this.validateTextInputServerError();
          this.setState({ error: toastMessage });
        }
      }
    }
  };

  serverErrorToast() {
    const { hasError, lastError } = this.props;
    if (hasError) {
      if (Object.keys(lastError).length !== 0) {
        const toastMessage = lastError.error;
        if (this.lastDisplayedError !== toastMessage) {
          this.lastDisplayedError = toastMessage;
          this.setState({ error: toastMessage });
          this.showToast(toastMessage);
          this.onServerErrorValidateErrorTextBox();
        }
      }
    }
  }

  render() {
    const { translations } = this.props;
    const {
      userName,
      password,
      userNameErrorLabel,
      passwordErrorLabel,
      formDirty
    } = this.state;

    return (
      <View style={styles.loginForm}>
        <View style={styles.userNameFLI}>
          <FloatingLabelInput
            errorLabel={userNameErrorLabel}
            label={translations.login__username__placeholder}
            value={userName}
            onChangeText={this.onUserNameChange}
            autoCorrect={false}
            onKeyPress={this.handleKeyDown}
            underlineColorAndroid="transparent"
            formDirty={formDirty}
            imageSource={userImage}
            imageStyle={baseStyles.smallIcon}
          />
        </View>
        <View style={styles.passwordFLI}>
          <FloatingLabelInput
            errorLabel={passwordErrorLabel}
            label={translations.login__password__placeholder}
            value={password}
            secureTextEntry
            onChangeText={this.onPasswordChange}
            autoCorrect={false}
            onKeyPress={this.handleKeyDown}
            underlineColorAndroid="transparent"
            formDirty={formDirty}
            imageSource={lockImage}
            imageStyle={baseStyles.mediumIcon}
          />
        </View>
        <Button
          style={styles.forgotLink}
          textStyle={[baseStyles.minorLinkText, styles.forgotText]}
          onClick={this.setforgotPasswordRedirect}
          text={translations.forgot_password}
        />
        {this.forgotPasswordRenderRedirect()}
        <Button
          style={[styles.loginButton, baseStyles.bigButton]}
          textStyle={baseStyles.whiteTextButton}
          onClick={this.loginSubmit}
          text={translations.login}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  translations: {
    login__username__placeholder:
      state.locale.translations.login__username__placeholder,
    login__password__placeholder:
      state.locale.translations.login__password__placeholder,
    login: state.locale.translations.login,
    login_username_invalid: state.locale.translations.login_username_invalid,
    login_password_invalid: state.locale.translations.login_password_invalid,
    login_username_required: state.locale.translations.login_username_required,
    login_password_required: state.locale.translations.login_password_required,
    login_username_password_required:
      state.locale.translations.login_username_password_required,
    login_username_password_invalid:
      state.locale.translations.login_username_password_invalid,
    login_system_problem: state.locale.translations.login_system_problem,
    login_check_internet_server_down:
      state.locale.translations.login_check_internet_server_down,
    forgot_password: state.locale.translations.forgot_password
  },
  data: state.auth.userData,
  lastError: state.auth.lastError,
  hasError: state.auth.hasError
});

const mapDispatchToProps = dispatch => ({
  dispatchLogin: user => dispatch(login(user)),
  dispatchSetToast: dispatchMessage => dispatch(setToast(dispatchMessage)),
  dispatchResetLoginError: () => dispatch(resetLoginControlVars())
});

SignIn.defaultProps = {
  lastError: null,
  hasError: false,
  dispatchSetToast: () => {}
};

SignIn.propTypes = {
  hasError: bool,
  lastError: shape(),
  translations: shape().isRequired,
  dispatchLogin: func.isRequired,
  dispatchSetToast: func
};

export const ConnectSignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
