import {
  LOGIN_ATTEMPT,
  LOGIN_FAILED,
  LOGIN_SUCCESSFULL,
  LOGIN_RESET_CONTROL_VARS,
  LOGIN_LOGOUT,
} from './types';

export const INITIAL_STATE = {
  userData: {},
  isLoading: false,
  isLoggedIn: false,
  lastError: undefined,
  hasError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFULL:
      return {
        ...state,
        userData: action.userData,
        isLoggedIn: true,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        lastError: action.lastError,
        hasError: action.hasError,
        isLoggedIn: false,
      };

    case LOGIN_ATTEMPT:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case LOGIN_RESET_CONTROL_VARS:
      return {
        ...state,
        lastError: null,
        hasError: false,
      };

    case LOGIN_LOGOUT:
      return {
        ...state,
        userData: null,
        hasError: false,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
