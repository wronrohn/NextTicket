import React from "react";
import movies from "../data";
import Movie from "./Movie";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

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
