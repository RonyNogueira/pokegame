import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./assets/scss/main.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../src/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
