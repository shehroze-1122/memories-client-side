import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'; 
import { assignPosts } from './reducers/posts';
import { authReducer } from './reducers/auth';
import App from './App';
import './index.css';

const root = combineReducers({assignPosts, authReducer});
const store = createStore(root, compose(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

