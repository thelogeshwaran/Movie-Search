import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../../Components/MovieCard/MovieCard";
import "./SearchPage.css";
import { useMovieProvider } from "../../Context/MovieContext";
import { Loader } from "../../Components/Loader/Loader";

function SearchPage() {
  const { query } = useParams();
  const [searchMovies, setSearchMovies] = useState([]);
  const { setSearchOpen } = useMovieProvider();
  const [loader, setLoader] = useState(false);
  const search_api = "https://api.themoviedb.org/3/search/";

  useEffect(() => {
    async function fetchData() {
      setLoader(true);
      const response = await axios.get(
        `${search_api}movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`
      );
      setSearchMovies(response.data.results);
      setLoader(false);
    }
    if (query) {
      fetchData();
    }
    setSearchOpen(true);
    return () => {
      setSearchOpen(false);
    };
  }, [query]);

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <h2>
          Search Results for <em>{query}</em>
        </h2>
      </div>
      {loader ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <div className="search__list">
          {searchMovies.length > 0 ? (
            searchMovies.map((movie) => <MovieCard movie={movie} />)
          ) : (
            <div className="search__message">
              <h2>There is no movies for your search .. </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
