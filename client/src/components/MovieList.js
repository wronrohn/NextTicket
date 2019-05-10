import React from "react";
import movies from "../data";
import Movie from "./Movie";
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const MovieList = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  return(
    <div className="container">
    <form className="form-inline mt-5 row no-gutters">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        type="text" value={transcript}
        className="form-control mb-2 mr-sm-2"
        id="search"
        placeholder="Search All Movies"
      />
     
      <button type="submit" class="btn btn-primary mb-2">
        Search
      </button>
      <button type="reset" value="Reset" id="mic" onClick={{resetTranscript} }><i className="fa fa-microphone"></i></button>
      
      <button>Start new test</button>
      
    </form>
    {movies.map(movie => (
      <Movie key={movie.index} {...movie} />
    ))}
  </div>

  )};
 
  MovieList.propTypes = propTypes;

  export default SpeechRecognition(MovieList);


