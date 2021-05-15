import React, { useState, useEffect } from "react";
import "./LikedPage.css";
import { useParams } from "react-router-dom";
import { db } from "../../Components/Firebase/firebase";
import MovieCard from "../../Components/MovieCard/MovieCard";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";
import { useAuthProvider } from "../../Context/AuthProvider";


function LikedPage() {
  const { userId } = useParams();
  const [movies, setMovies] = useState([]);
  const { user } = useAuthProvider();

  useEffect(() => {
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
      });
  }, []);

  const removeLike = (id) => {
    if(user){
      db.collection("users").doc(userId).collection("liked").doc(id).delete();
    }else{
      toast.error("You need to LogIn!");
    }
  };
  return (
    <div className="liked">
      <div className="liked__header">
        <h1>Your Favorites</h1>
      </div>
      <div className="liked__list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div>
              <MovieCard key={movie.data.id} movie={movie.data.data} />
              <div className="liked__remove">
                <IconButton
                  style={{
                    backgroundColor: "#1F2937",
                    color: "white",
                    marginRight: "10px",
                  }}
                  onClick={() => removeLike(movie.id)}
                >
                  <ClearIcon />
                </IconButton>
                Remove
              </div>
            </div>
          ))
        ) : (
          <div className="list__info">
            <h2>You haven't added any favorite Movies...</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedPage;
