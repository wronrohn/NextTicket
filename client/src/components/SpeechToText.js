import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

class SpeechToTextButton extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const {
      browserSupportsSpeechRecognition,
      resetTranscript,
      finalTranscript,
      onFinalTranscript
    } = this.props;
    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        {console.log(`transcript ${finalTranscript}`)}
        {finalTranscript && onFinalTranscript(finalTranscript)}
      </div>
    );
  }
}

export default SpeechRecognition(SpeechToTextButton);
