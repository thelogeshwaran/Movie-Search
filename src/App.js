import './App.css';
import React, { useState } from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import MovieList from "./MovieList/MovieList";
import requests from "./Requests/requests";

function App() {
  const [selectedOption, setSelectedOption] = useState(requests.fetchAction);

  return (
    <div className="App">
      <Header/>
      <Navbar setSelectedOption={setSelectedOption}/>
      <MovieList selectedOption={selectedOption}/>
    </div>
  );
}

export default App;
