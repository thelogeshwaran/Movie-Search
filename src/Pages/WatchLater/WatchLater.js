import React, { useState, useEffect } from "react";
import "./WatchLater.css";
import { useParams } from "react-router-dom";
import { db } from "../../Components/Firebase/firebase";
import { useAuthProvider } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import DetailCard from "../../Components/DetailCard/DetailCard";
import { Loader } from "../../Components/Loader/Loader";

function WatchLater() {
  const { userId } = useParams();
  const [movies, setMovies] = useState([]);
  const { user } = useAuthProvider();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    function fetchData() {
      setLoader(true);
      db.collection("users")
        .doc(userId)
        .collection("watchlater")
        .onSnapshot((snap) => {
          setMovies(
            snap.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      setLoader(false);
    }
    fetchData();
  }, []);

  const removeWatchLater = (movie) => {
    if (user) {
      db.collection("users")
        .doc(userId)
        .collection("watchlater")
        .doc(movie.id)
        .delete();
    } else {
      toast.error("You need to LogIn!");
    }
  };
  return (
    <div className="watchlater">
      <div className="watchlater__header">
        <h1>WatchList</h1>
      </div>
      {loader ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <DetailCard movies={movies} remove={removeWatchLater} />
      )}
    </div>
  );
}

export default WatchLater;
