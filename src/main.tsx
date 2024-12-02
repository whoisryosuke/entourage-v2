import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Router from "./Router";
import AppWrapper from "./components/AppWrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper>
        <Router />
      </AppWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
