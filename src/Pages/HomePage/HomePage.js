import React, { useState } from "react";
import Categories from "../../Components/Categories/Categories";
import MovieList from "../../Components/MovieList/MovieList";
import requests from "../../Components/Requests/requests";
import "./HomePage.css";

function HomePage() {
  const [selectedOption, setSelectedOption] = useState(requests.fetchAction);
  return (
    <div className="homepage">
      <Categories setSelectedOption={setSelectedOption} />
      <div className="homepage__content">
        <MovieList selectedOption={selectedOption} />
      </div>
    </div>
  );
}

export default HomePage;
