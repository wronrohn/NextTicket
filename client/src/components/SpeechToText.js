import React, { Component } from "react";
import SpeechRecognition from "react-speech-recognition";

class SpeechToTextButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListening: false
    };
    this.onClickSpeech = this.onClickSpeech.bind(this);
  }
  componentDidMount() {

        console.log(">>>>> Speech did mount");

    this.props.resetTranscript();
    this.props.stopListening();
  }
  componentWillUnmount() {

    console.log(">>>>> Speech will unmount");

    this.props.resetTranscript();
    this.props.abortListening();
  }
  onClickSpeech(event) {
    event.preventDefault();

    console.log(">>>>> Speech on click", `${this.state.isListening}`);


    const {
      finalTranscript,
      onFinalTranscript,
      resetTranscript,
      startListening,
      stopListening
    } = this.props;
    if (!this.state.isListening) {
      resetTranscript();
      startListening();
    } else {
      stopListening();
      finalTranscript && onFinalTranscript(finalTranscript);
    }
    this.setState((state, _) => ({
      isListening: !state.isListening
    }));
  }

  render() {
    const { browserSupportsSpeechRecognition } = this.props;
    if (!browserSupportsSpeechRecognition) {
      // If the browser doesn't support speech, then return a disabled
      // button. This way if you run it in Firefox by accident there's a
      // hint that web-speech exists.
      return (
        <div>
            <button className="btn btn-primary mb-2 start-btn" disabled>
                <i className="fas fa-microphone" />
            </button>
        </div>
      );
    }
    return (
      <div>
        <label for="voicecommand" />
        <button
          className="btn btn-primary mb-2 start-btn"
          onClick={this.onClickSpeech}
          id="voicecommand"
        >
          {this.state.isListening ? (
            <i className="fas fa-microphone-slash" />
          ) : (
            <i className="fas fa-microphone" />
          )}
        </button>
      </div>
    );
  }
}

export default SpeechRecognition({ autoStart: false })(SpeechToTextButton);
