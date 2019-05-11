import React from "react";
import Movie from "./Movie";

const MovieList = ({ movies }) => {
  if (movies) {
    return (
      <div>
        {movies.map(movie => (
          <Movie key={movie.index} {...movie} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default MovieList;
