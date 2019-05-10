import React from "react";
import SpeechRecognition from './WebSpeech'


const Search = () => (
  <form className="mt-5 row no-gutters">
    <div className="input-group">
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
      <SpeechRecognition />

    </div>
  </form>
);
export default Search;
