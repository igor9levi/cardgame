import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

export default store;
