import React from "react";
import movies from "../data";
import Movie from "./Movie";
import SpeechRecognition from "./Search"




const MovieList = () =>{
  return(
    <div className="container">
    {/* <form className="form-inline mt-5 row no-gutters">
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
      
      
      
    </form> */}
    < SpeechRecognition />

    {movies.map(movie => (
      <Movie key={movie.index} {...movie} />
    ))}
  </div>

  );
} 
 
  

  export default MovieList;


