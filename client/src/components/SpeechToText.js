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
    this.props.resetTranscript();
    this.props.stopListening();
  }
  componentWillUnmount() {
    this.props.resetTranscript();
    this.props.abortListening();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.finalTranscript && this.state.isListening) {
      nextProps.stopListening && nextProps.stopListening();
      nextProps.onFinalTranscript &&
        nextProps.onFinalTranscript(nextProps.finalTranscript);
      this.setState((state, _) => ({ isListening: false }));
    }
  }

  onClickSpeech(event) {
    event.preventDefault();
    const { resetTranscript, startListening, stopListening } = this.props;

    if (!this.state.isListening) {
      resetTranscript();
      startListening();
      this.setState((state, _) => ({ isListening: true }));
    } else {
      stopListening();
      this.setState((state, _) => ({ isListening: false }));
    }
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
