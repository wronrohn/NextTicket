import React from "react";
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'


const options ={
  
  continuous: false
}

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  startListening: PropTypes.func,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const Search =  ({
   transcript,
   resetTranscript,
   startListening,
   browserSupportsSpeechRecognition
   }) => {
     if (!browserSupportsSpeechRecognition) {
       return null;
     }
     return(
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
      {
        /* { value of the transcript is in the "{transcript}" } */ }
      <button type="submit" id="mic" onClick={{startListening} }><i className="fa fa-microphone"></i></button>
      
      
    </div>
  </form>
     );
}
  
Search.propTypes = propTypes;
export default SpeechRecognition(options)(Search);
