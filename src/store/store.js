import React from 'react';
import { createStore } from 'redux';
import reducer from '../reducers';

console.log(reducer)

const store = createStore(reducer);

export default store;
// export const store = createStore(
//     combineReducers({
//         state: reducers
//     }),
//     window.__REDUX_DEVTOOLS_EXTENSION && window._REDUX_DEVTOOLS_EXTENSION__()
// );
