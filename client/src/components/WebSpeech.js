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

const SpeechSearch =  ({
   transcript,
   resetTranscript,
   startListening,
   browserSupportsSpeechRecognition
   }) => {
     if (!browserSupportsSpeechRecognition) {
       return null;
     }
     return(

      
      
        /* { value of the transcript is in the "{transcript}" } */ 
      <button type="submit" id="mic" onClick={{startListening} }><i className="fa fa-microphone"></i></button>
      
      
    
  
     );
}
  
SpeechSearch.propTypes = propTypes;
export default SpeechRecognition(options)(SpeechSearch);
