import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { SignupLoginStore } from './context/SignupLoginContext'

import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('app');

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SignupLoginStore>
        <App />
      </SignupLoginStore>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();