import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { MovieProvider } from "./Context/MovieContext";
import { DetailePageProvider } from "./Context/DetailPageContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MovieProvider>
        <DetailePageProvider>
          <App />
        </DetailePageProvider>
      </MovieProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
