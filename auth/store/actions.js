import {
  LOGIN_ATTEMPT,
  LOGIN_FAILED,
  LOGIN_SUCCESSFULL,
  LOGIN_RESET_CONTROL_VARS,
  LOGIN_LOGOUT,
} from './types';
import { INITIAL_STATE } from './reducers';
import translations from '../../shared/locales/en-US';
import api from '../../shared/api/api';

function getErrorTranslationForResponseCode(responseCodeMessage) {
  switch (responseCodeMessage) {
    case '401': return translations.login_system_problem;
    case '422': return translations.login_username_password_invalid;
    default: return translations.login_check_internet_server_down;
  }
}

export function loginIsLoading(bool: boolean) {
  return {
    type: LOGIN_ATTEMPT,
    isLoading: bool,
  };
}

export function loginSuccess(userData: Object) {
  return {
    type: LOGIN_SUCCESSFULL,
    userData,
    lastError: null,
  };
}

export function loginFailed(lastError: Object) {
  return {
    type: LOGIN_FAILED,
    lastError,
    hasError: lastError !== undefined,
  };
}

export function resetLoginControlVars() {
  return (dispatch) => {
    dispatch({
      type: LOGIN_RESET_CONTROL_VARS,
      lastError: null,
      hasError: false,
    });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOGOUT,
      ...INITIAL_STATE,
    });
  };
}

export function login(userValues: Object) {
  return async (dispatch) => {
    dispatch(loginIsLoading(true));
    try {
      const user = await api.login(userValues.userName, userValues.password);
      if (typeof user === 'object') {
        if (Object.keys(user).length === 0) {
          // Invalid username or password code=422
          // eslint-disable-next-line no-console
          console.log(` error code 422 Unprocessable Entity`);
          throw new Error('422');
        }else if (user.errorCode) {
          // Invalid params code=401
          // eslint-disable-next-line no-console
          console.log(` error code ${user.errorCode} invalid params system problem`);
          throw new Error(user.errorCode);
        } else {
          dispatch(loginSuccess(user));
        }
      }else if(user === 0){
         // Invalid username or password code=422
          // eslint-disable-next-line no-console
        console.log('invalid username and password')
        throw new Error('422');
      }
    } catch (responseCode) {
      //responseCode will be empty when no internet else Error(message) thrown
      let code=''
      if(responseCode!==undefined )
        code=responseCode.message
      dispatch(loginFailed({ error: getErrorTranslationForResponseCode(code) }));
    } finally {
      dispatch(loginIsLoading(false));
    }
  };
}
