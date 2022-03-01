import React from "react";
import ReactDOM from "react-dom";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import App from "./App";
import { TransactionProvider } from "./context/TransactionContext";

import "./index.css";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <TransactionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TransactionProvider>
  </AlertProvider>,
  document.getElementById("root")
);
