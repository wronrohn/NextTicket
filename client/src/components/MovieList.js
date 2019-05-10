import React from "react";
import movies from "../data";
import Movie from "./Movie";

const MovieList = () => {
  return (
    <div>
      {movies.map(movie => (
        <Movie key={movie.index} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
