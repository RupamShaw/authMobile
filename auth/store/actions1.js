import {
    LOGIN_ATTEMPT,
    LOGIN_FAILED,
    LOGIN_SUCCESSFULL,
    LOGIN_RESET_CONTROL_VARS,
    LOGIN_LOGOUT,
  } from './types';
  import { INITIAL_STATE } from './reducers';
  import Config from '../../shared/config';
  import translations from '../../shared/locales/en-US';
  
  
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

  function queryString(params) {
    const esc = encodeURIComponent;
    return Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join('&');
  }
 
  
  export function login(userValues: Object) {

    return (dispatch) => {
      // Dispatch loading to show Spinner on screen
      dispatch(loginIsLoading(true));
      const userEnteredData = {
        user: userValues.userName,
        pass: userValues.password,
        compress: 'false',
      };
     
      let URL = `${Config.BASE_URL}login?${queryString(userEnteredData)}`;
      // if (Config.ROUTE_LOGIN ===undefined)
      //   URL = Config.BASE_URL
    
      console.log(URL)
      
      return fetch(URL, { method: 'POST', body: JSON.stringify(userEnteredData) })
        .then((response) => {
          if (response.status >= 200 && response.status <= 304) {
            response.json().then((data) => {
              if (data === 0) {
                // no json for invalid username pwd
                const error = {
                  error: translations.login_username_password_invalid,
                };
                dispatch(loginIsLoading(false));
                dispatch(loginFailed(error)); // no employee access rights or invalid username or  pwd
              }
              if (typeof data === 'object') {
                // its json {'userid':579,'auth':'1487514331','cpid':131,'cid':528}
                // or {errorCode: 401, errorMessage: 'Invalid Parameters.'}
                dispatch(loginIsLoading(false));
                if (data.errorCode) {
                  // Invalid params code=401
                  // eslint-disable-next-line no-console
                  console.log(` code ${data.errorCode} msg {data.errorMessage}`);
                  dispatch(
                    loginFailed({ error: translations.login_system_problem }),
                  );
                } else {
                  dispatch(loginSuccess(data));
                }
              }
            });
          } else {
            // eslint-disable-next-line no-console
            console.log('in the action when server response not in 200 or304');
            const error = { error: response.statusText };
            dispatch(loginIsLoading(false));
            dispatch(loginFailed(error));
            // throw error;
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('in the  action when server down/ no internet', error);
          // If any other error occurs like  no interenet connection
          dispatch(loginIsLoading(false));
          dispatch(
            loginFailed({ error: translations.login_check_internet_server_down }),
          );
        });
    };
  }