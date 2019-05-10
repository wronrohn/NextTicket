import React from "react";
import movies from "../data";
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'


const options={
  autoStart: false,
  continuous: false
}
const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  startListening: PropTypes.func,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const MovieList = ({
  transcript,
  startListening,
  browserSupportsSpeechRecognition}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      
    <div>
    <div>
      
      <link rel="stylesheet" href="style.css" />
      <form>
      <input type="text" placeholder="Search.." size="55" id="search"/> 
      <button type="submit"><i className="fa fa-search" ></i></button>
      <button  type="submit" id="mic" onClick={startListening}><i className="fa fa-microphone"></i></button>
      </form>

      <span>{transcript}</span>
    </div>

    

    

    
    
  </div>
    </div>
  );
};

  
    
  

MovieList.propTypes = propTypes;

export default SpeechRecognition(options)(MovieList);
