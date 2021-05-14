import "./App.css";
import React from "react";
import Header from "./Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Authentication from "./Authentication/Authentication";
import { useAuthProvider } from "./Context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./Pages/Searchpage/SearchPage";
import DetailPage from "./Pages/DetailPage/DetailPage";
import LikedPage from "./Pages/Liked/LikedPage";
import WatchLater from "./Pages/WatchLater/WatchLater";
import PlayList from "./Pages/PlayList/PlayList";
import IndividualList from "./Pages/IndividualList/IndividualList";

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
              <Route path="/details/:movieId">
                <DetailPage />
              </Route>
              <Route path="/liked/:userId">
                <LikedPage />
              </Route>
              <Route path="/watchlater/:userId">
              <WatchLater/>
              </Route>
              <Route path="/playList/:userId">
              <PlayList/>
              </Route>
              <Route path="/invdiuallist/:listId">
              <IndividualList/>
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
