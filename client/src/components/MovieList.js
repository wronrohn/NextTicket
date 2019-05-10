import React from "react";
import movies from "../data";
import Movie from "./Movie";

const MovieList = () => (
  <div className="container">
    <form className="form-inline mt-5 row no-gutters">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        id="search"
        placeholder="Search All Movies"
      />
      <button type="submit" class="btn btn-primary mb-2">
        Search
      </button>
    </form>
    {movies.map(movie => (
      <Movie key={movie.index} {...movie} />
    ))}
  </div>
);

export default MovieList;
