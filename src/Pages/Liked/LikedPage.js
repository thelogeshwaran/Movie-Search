import React, { useState, useEffect } from "react";
import "./LikedPage.css";
import { useParams } from "react-router-dom";
import { db } from "../../Components/Firebase/firebase";
import { toast } from "react-toastify";
import { useAuthProvider } from "../../Context/AuthContext";
import { Loader } from "../../Components/Loader/Loader";
import DetailCard from "../../Components/DetailCard/DetailCard";

function LikedPage() {
  const { userId } = useParams();
  const [movies, setMovies] = useState([]);
  const { user } = useAuthProvider();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoader(true);
      db.collection("users")
        .doc(userId)
        .collection("liked")
        .onSnapshot((snap) => {
          setMovies(
            snap.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setLoader(false);
        });
    }
    fetchData();
  }, []);

  console.log(movies);

  const removeLike = (movie) => {
    if (user) {
      db.collection("users")
        .doc(userId)
        .collection("liked")
        .doc(movie.id)
        .delete();
    } else {
      toast.error("You need to LogIn!");
    }
  };
  return (
    <div className="liked">
      <div className="liked__header">
        <h1>Your Favorites</h1>
      </div>
      {loader ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <DetailCard movies={movies} remove={removeLike} />
      )}
    </div>
  );
}

export default LikedPage;
