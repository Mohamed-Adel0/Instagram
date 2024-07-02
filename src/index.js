import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./StyleForAllPages.scss";
import "./MediaResponsive.scss"
import { AuthProvider } from "./Routing/AuthProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
  </>
);

reportWebVitals();
