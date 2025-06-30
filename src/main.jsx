import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {store,persistor} from "./redux/store.js";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
          <persistor loading={null} persistor={persistor}>
    <App />
    </persistor>
    </Provider>
  </React.StrictMode>
);
