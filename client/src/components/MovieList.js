import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies }) => {
  if (movies) {
    return (
      <div className="mb-5 mt-5">
        {movies.map(movie => (
          <Movie key={movie._id} {...movie} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default MovieList;
