import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import App from "./App";
import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";
import jalaliday from "jalaliday";

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
