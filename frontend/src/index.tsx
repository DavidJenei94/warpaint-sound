import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { FeedbackContextProvider } from './store/feedback-context';
import store from './store/store';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import App from './App';
import { AuthContextProvider } from './store/auth-context';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY!}
    container={{
      element: 'reCaptcha-badge',
      parameters: {
        badge: 'bottomright',
        theme: 'dark',
      },
    }}
  >
    <FeedbackContextProvider>
      <AuthContextProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </AuthContextProvider>
    </FeedbackContextProvider>
  </GoogleReCaptchaProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
