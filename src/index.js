import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import configureStore from './app/store'
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = configureStore;
ReactDOM.render(
 
  <React.StrictMode>
    <Provider store={store}> 
    <App />
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

reportWebVitals();
