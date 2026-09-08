import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TransactionsProvider } from "./contexts/TransactionsContext";
import { BudgetsProvider } from "./contexts/BudgetsContext";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TransactionsProvider>
          <BudgetsProvider>
            <App />
          </BudgetsProvider>
        </TransactionsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
