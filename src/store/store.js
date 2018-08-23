import React from 'react';
import { createStore, combineReducers } from 'redux';
import reducers from '../reducers';

export const store = createStore(
    combineReducers({
        state: reducers
    }),
    window.__REDUX_DEVTOOLS_EXTENSION && window._REDUX_DEVTOOLS_EXTENSION__()
);
