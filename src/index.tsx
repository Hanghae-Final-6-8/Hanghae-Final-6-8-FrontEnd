import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import DeviceDetect from './lib/DeviceDetect';

// import reportWebVitals from './reportWebVitals';
import './index.css';

declare global {
  interface Window {
    // eslint-disable-next-line
    kakao: any;
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line
    Kakao: any;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <DeviceDetect>
        <App />
      </DeviceDetect>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals();
