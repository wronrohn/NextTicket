import React from "react";
import movies from "../data";
import Movie from "./Movie";
import Search from "./Search";

const MovieList = () => (
  <div>
    {movies.map(movie => (
      <Movie key={movie.index} {...movie} />
    ))}
  </div>
);

export default MovieList;
