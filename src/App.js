import './App.css';
import React, { useState } from "react";
import Header from "./Header/Header";
import HomePage from "./Pages/HomePage";
import Authentication from "./Authentication/Authentication";
import { useAuthProvider } from "./Context/AuthProvider";



function App() {
  const { user } = useAuthProvider();
  
  return (
    <div >
      {
        user ? 
        <div className="App">
          <Header/>
          <HomePage/>
          </div>
        :
      <Authentication/>

      }
      
    </div>
  );
}

export default App;
