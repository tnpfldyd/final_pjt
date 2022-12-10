import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store from './store.js'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization")
axios.defaults.headers.common["Access-Control-Allow-Origin"] = '*'

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient
export let persistor = persistStore(store)

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
