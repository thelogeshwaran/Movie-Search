import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from "./Context/AuthProvider";
import { MovieProvider } from "./Context/MovieProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MovieProvider>
      <App />
      </MovieProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

