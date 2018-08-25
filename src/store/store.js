import { createStore } from 'redux';
import reducer from '../reducers';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION && window._REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
