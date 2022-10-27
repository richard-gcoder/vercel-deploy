import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Router
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// Redux
import { store } from './store/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist' 
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store) 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
