import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies, removeFromWatchList }) => {

  let seen = new Map();

  if (movies) {
    return (
      <div className="mb-5 mt-5">
        {movies.map(movie => {
            // Some recommendations overlap. Don't list the same movie twice.
            if( ! seen.has(movie._id)) {
                seen.set(movie._id, true);
                return (
                    <Movie
                        key={movie._id}
                        {...movie}
                        removeFromWatchList={removeFromWatchList}
                    />
                );
            }
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default MovieList;
