import {
  combineReducers,
  applyMiddleware,
  createStore,
} from 'redux';
//import { composeWithDevTools } from 'remote-redux-devtools';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from '../auth/store/reducers';
import localeReducer from '../shared/locales/store/reducers';
import toastReducer from '../shared/base-components/toast/store/reducers';

const initialState = {};

const rootReducer = combineReducers({
  locale: localeReducer,
  auth: authReducer,
  toast: toastReducer,
});

const middlewares = [thunk];
const composeEnhancers = composeWithDevTools({ realtime: true, port: 19001, suppressConnectErrors: false });
//const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
//export default createStore(rootReducer, initialState, enhancer);
export default createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
