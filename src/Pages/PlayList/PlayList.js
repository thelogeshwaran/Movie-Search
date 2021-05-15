import React, { useEffect, useState } from "react";
import "./PlayList.css";
import { useParams } from "react-router-dom";
import { db } from "../../Components/Firebase/firebase";
import { Link } from "react-router-dom";
import FilterNoneIcon from "@material-ui/icons/FilterNone";

function PlayList() {
  const { userId } = useParams();
  const [movies, setMovies] = useState([]);
  const image_api = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    db.collection("users")
      .doc(userId)
      .collection("playlist")
      .onSnapshot((snap) => {
        setMovies(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="playlist">
      <div className="playlist__header">
        <h1>Your Playlist</h1>
      </div>
      <div>
        <div className="playlist__content">
          {movies &&
            movies.map((item) => (
              <div className="playlist__separate">
                <Link
                  to={`/invdiuallist/${item.id}/${userId}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <h2>{item.data.name}</h2>
                  <div className="playlist__body">
                    {item.data.data.slice(0, 3).map((movie) => (
                      <div className="playlist__data" key={movie.id}>
                        <img
                          src={`${image_api}${
                            movie.backdrop_path || movie.poster_path
                          }`}
                          alt="Movie Image"
                        ></img>
                        <h3>{movie.title || movie.original_name}</h3>
                      </div>
                    ))}
                    {item.data.data.length > 3 && (
                      <div className="playlist__data more">
                        <FilterNoneIcon />
                        <h2>More</h2>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default PlayList;
