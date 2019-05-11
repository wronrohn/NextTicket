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
  abortListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const SpeechSearch =  ({
   transcript,
   resetTranscript,
   startListening,
   abortListening,
   browserSupportsSpeechRecognition
   }) => {
     
     if (!browserSupportsSpeechRecognition) {
       return null;
     }
     return(

      <div>
      {abortListening} 
        
      <button type="none" id="mic" onClick={startListening}><i className="fa fa-microphone"></i></button>
      <input type="text" value={transcript}></input>
      </div>
       
      
      
    
  
     );
}
  
SpeechSearch.propTypes = propTypes;
export default SpeechRecognition(options)(SpeechSearch);
