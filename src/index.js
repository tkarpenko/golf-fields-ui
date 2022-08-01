import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import environment from './app/environment';

import './app/i18n';



const Styles = React.lazy(() => import('./app/Styles.js').then(module => ({
  default: module.Styles
})));


const container = document.getElementById('root');
const root = createRoot(container);

console.log('UI updated');
const readonlySettingsPromise1 = new Promise((resolve, reject) => {
  const xmlhttp = new XMLHttpRequest();
  const method = 'GET';
  const url = 'http://10.102.190.212:5000/api/v1.0/User/TestGet';
  xmlhttp.open(method, url, true);
  xmlhttp.onload = () => {
      if (xmlhttp.status === 200) {
        console.log('CURL 1 = ', JSON.parse(xmlhttp.responseText));
          resolve();
      } else {
        console.log('CURL 2 = ', JSON.parse(xmlhttp.responseText));
          resolve();
      }
  };
  xmlhttp.send();
});


const readonlySettingsPromise = new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    const method = 'GET';
    const url = '/app.json';
    xmlhttp.open(method, url, true);
    xmlhttp.onload = () => {
        if (xmlhttp.status === 200) {
            resolve(JSON.parse(xmlhttp.responseText));
        } else {
            resolve(environment);
        }
    };
    xmlhttp.send();
});

Promise.all([readonlySettingsPromise]).then((jsonFiles) => {
    environment.settings = {...jsonFiles[0]};

    root.render(
      <React.StrictMode>
        <Provider store={setupStore({})}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
        <Styles />
      </React.StrictMode>
    );
    
    reportWebVitals(console.log);
});

