import authReducer from './reducers';
import {
  LOGIN_ATTEMPT,
  LOGIN_FAILED,
  LOGIN_SUCCESSFULL,
  LOGIN_LOGOUT,
} from './types';

const fakeState = { test: 'fakeState' };

describe('Auth reducer', () => {
  it('throw an error without an action', () => {
    expect(() => authReducer(fakeState)).toThrow();
  });

  it('return the same state without a matching action.type', () => {
    const newState = authReducer(fakeState, { type: 'fakeAction' });
    expect(newState).toEqual(fakeState);
  });

  it('return the proper initialState when called without a state', () => {
    const newState = authReducer(undefined, { type: 'fakeAction' });
    expect(newState).toEqual({
      userData: {},
      isLoading: false,
      isLoggedIn: false,
      lastError: undefined,
      hasError: false,
    });
  });

  it('return the proper state for a LOGIN_SUCCESSFULL action type', () => {
    const newState = authReducer(fakeState, {
      type: LOGIN_SUCCESSFULL,
      userData: { name: 'fakeUser' },
    });
    expect(newState).toEqual({
      test: 'fakeState',
      userData: { name: 'fakeUser' },
      isLoggedIn: true,
    });
  });

  it('return the proper state for a LOGIN_FAILED action type', () => {
    const newState = authReducer(fakeState, {
      type: LOGIN_FAILED,
      lastError: { error: 'invalid' },
      hasError: true,
    });
    expect(newState).toEqual({
      test: 'fakeState',
      lastError: { error: 'invalid' },
      hasError: true,
      isLoggedIn: false,
    });
  });

  it('return the proper state for a LOGIN_ATTEMPT action type', () => {
    const newState = authReducer(fakeState, {
      type: LOGIN_ATTEMPT,
      isLoading: true,
    });
    expect(newState).toEqual({
      test: 'fakeState',
      isLoading: true,
    });
  });

  it('return the proper state for a LOGOUT action type adn call logout function from auth module', () => {
    const newState = authReducer(fakeState, { type: LOGIN_LOGOUT });
    expect(newState).toEqual({
      test: 'fakeState',
      userData: null,
      isLoggedIn: false,
      lastError: undefined,
      hasError: false,
    });
  });
});
