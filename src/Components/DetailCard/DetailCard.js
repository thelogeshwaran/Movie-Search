import React from "react";
import MovieCard from "../../Components/MovieCard/MovieCard";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import "./DetailCard.css";

export default function DetailCard({ movies, remove }) {
  return (
    <div>
      <div className="detailCard__list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.data.id}>
              <MovieCard movie={movie.data.data} />
              <div className="detailCard__remove">
                <IconButton
                  style={{
                    backgroundColor: "#1F2937",
                    color: "white",
                    marginRight: "10px",
                  }}
                  onClick={() => remove(movie)}
                >
                  <ClearIcon />
                </IconButton>
                Remove
              </div>
            </div>
          ))
        ) : (
          <div className="list__info">
            <h2>You haven't added any Movies...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
