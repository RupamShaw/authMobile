import * as actions from './actions';
import {
  LOGIN_ATTEMPT,
  LOGIN_FAILED,
  LOGIN_SUCCESSFULL,
} from './types';
import mockStore from '../../tests/setupTests';
import translations from '../../shared/locales/en-US';

describe('SignIn actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      userData: {},
      isLoading: false,
      isLoggedIn: false,
      lastError: undefined,
      hasError: false,
    });
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('successfull login', () => {
    const userEnteredData = {
      user: 'shaanetest',
      pass: 'password',
      compress: 'false',
    };
    const fetchReturnData =  {"userid":14,"auth":"5295439218","cpid":2,"cid":8}
    const expectedActions = [
      {
        type: LOGIN_ATTEMPT,
        isLoading: true,
      },
      {
        type: LOGIN_SUCCESSFULL,
        userData: {"userid":14,"auth":"5295439218","cpid":2,"cid":8},
        lastError: null,
      },
      {
        type: LOGIN_ATTEMPT,
        isLoading: false,
      }
    ];
    fetch.once(JSON.stringify(fetchReturnData));
    return store.dispatch(actions.login(userEnteredData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('server down or no internet connection', () => {
    const userEnteredData = {  user: 'shaanetest', pass: 'password', compress: 'false' };
    const expectedActions = [
      {
        type: LOGIN_ATTEMPT,
        isLoading: true,
      },
      {
        type: LOGIN_FAILED,
        lastError: {
          error: translations.login_check_internet_server_down,
        },
        hasError: true,
      },
      {
        type: LOGIN_ATTEMPT,
        isLoading: false,
      }
    ];
    fetch.mockRejectOnce();
    return store.dispatch(actions.login(userEnteredData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Not valid User Name or password', () => {
    const userEnteredData = {
      user: 'rus',
      pass: '123',
      compress: 'false',
    };
    const fetchReturnData = 0;
    const expectedActions = [
      {
        type: 'LOGIN_ATTEMPT',
        isLoading: true,
      },
      {
        type: LOGIN_FAILED,
        lastError: { error: translations.login_username_password_invalid },
        hasError: true,
      },
      { type: LOGIN_ATTEMPT, isLoading: false },
    ];
    fetch.once(JSON.stringify(fetchReturnData));
    return store.dispatch(actions.login(userEnteredData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('response from server  an error 401', () => {
    const userEnteredData = { user: 'rus', pass: '123', compress: 'false' };
    const fetchReturnData = { errorCode: 401, errorMessage: 'invalid params' };
    const expectedActions = [
      { type: LOGIN_ATTEMPT, isLoading: true },
      {
        type: LOGIN_FAILED,
        lastError: { error: translations.login_system_problem },
        hasError: true,
      },
      { type: LOGIN_ATTEMPT, isLoading: false }
    ];
    fetch.once(JSON.stringify(fetchReturnData));
    return store.dispatch(actions.login(userEnteredData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
