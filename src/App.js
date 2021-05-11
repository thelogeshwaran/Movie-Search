import "./App.css";
import React, { useState } from "react";
import Header from "./Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Authentication from "./Authentication/Authentication";
import { useAuthProvider } from "./Context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./Pages/Searchpage/SearchPage";

function App() {
  const { user } = useAuthProvider();

  return (
    <div>
      {user ? (
        <div className="App">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/">
                <HomePage />
              </Route>
              <Route path="/search/:query">
                <SearchPage />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      ) : (
        <Authentication />
      )}
    </div>
  );
}

export default App;
