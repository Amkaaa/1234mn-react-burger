import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import reducers from './redux/reducers'

const container = document.getElementById('app');

const root = createRoot(container)

const loggerMiddleware = store => {
  return next => {
    return action => {
      // console.log('My Logger middleware [Dispatching] ==> ', action)
      // console.log('My Logger middleware [State BEFORE] ==> ', store.getState())
      const result = next(action);
      // console.log('My Logger middleware [State AFTER] ==> ', store.getState())
      return result;
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [loggerMiddleware, thunk];

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
