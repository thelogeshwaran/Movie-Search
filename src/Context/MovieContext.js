import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../Components/Firebase/firebase";
import { useAuthProvider } from "./AuthContext";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const { user } = useAuthProvider();
  const [likedMovies, setLikedMovies] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [playList, setPlayList] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .collection("liked")
      .onSnapshot((snap) => {
        setLikedMovies(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    db.collection("users")
      .doc(user.uid)
      .collection("watchlater")
      .onSnapshot((snap) => {
        setWatchLater(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    db.collection("users")
      .doc(user.uid)
      .collection("playlist")
      .onSnapshot((snap) => {
        setPlayList(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [user]);

  return (
    <MovieContext.Provider
      value={{
        searchOpen,
        setSearchOpen,
        likedMovies,
        setLikedMovies,
        playList,
        setPlayList,
        watchLater,
        setWatchLater,
        mobileNavOpen,
        setMobileNavOpen,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieProvider() {
  return useContext(MovieContext);
}
