import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'; 
import { assignPosts } from './reducers/posts';
import { QueryClient, QueryClientProvider } from 'react-query'; 
import App from './App';
import './index.css';

const queryClient = new QueryClient();

const store = createStore(assignPosts, compose(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

