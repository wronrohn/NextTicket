import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies, removeFromWatchList }) => {
  if (movies) {
    return (
      <div className="mb-5 mt-5">
        {movies.map(movie => (
          <Movie
            key={movie._id}
            {...movie}
            removeFromWatchList={removeFromWatchList}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default MovieList;
