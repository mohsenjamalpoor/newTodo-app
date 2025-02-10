import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./stor/store";
import { Provider } from 'react-redux'
import App from "./App";
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

var toObject = require("dayjs/plugin/toObject");
dayjs.extend(jalaliday);
dayjs.extend(toObject);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
