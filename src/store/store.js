import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
  // window.__REDUX_DEVTOOLS_EXTENSION && window._REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
