import React, { useState, useEffect } from "react";
import "./IndividualList.css";
import { useParams } from "react-router-dom";
import { db } from "../../Components/Firebase/firebase";
import MovieCard from "../../Components/MovieCard/MovieCard";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import firebase from "firebase";
import { useAuthProvider } from "../../Context/AuthContext";
import { toast } from "react-toastify";

function IndividualList() {
  const { listId, userId } = useParams();
  const [movies, setMovies] = useState([]);
  const { user } = useAuthProvider();

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .collection("playlist")
      .onSnapshot((snap) => {
        let document = snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        const filtered = document.filter((item) => item.id === listId);
        setMovies(filtered[0].data);
      });
  }, []);

  const removeLike = (movie) => {
    if(user){
      db.collection("users")
      .doc(userId)
      .collection("playlist")
      .doc(listId)
      .update({ data: firebase.firestore.FieldValue.arrayRemove(movie) });
    }else{
      toast.error("You need to LogIn!");
    }
  };

  return (
    <div className="individual">
      <div className="individual__header">
        <h1>{movies.name}</h1>
      </div>
      <div className="individual__list">
        {movies?.data ? (
          movies.data.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
              <div className="individual__remove">
                <IconButton
                  style={{
                    backgroundColor: "#1F2937",
                    color: "white",
                    marginRight: "10px",
                  }}
                  onClick={() => removeLike(movie)}
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

export default IndividualList;
