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
  onClickSpeech(event) {
    event.preventDefault();
    if (!this.state.isListening) {
      this.props.resetTranscript();
      this.props.startListening();
    } else {
      this.props.stopListening();
    }
    this.setState((state, _) => ({
      isListening: !state.isListening
    }));
  }

  render() {
    const {
      browserSupportsSpeechRecognition,
      finalTranscript,
      onFinalTranscript
    } = this.props;
    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    return (
      <div>
        <button onClick={this.onClickSpeech}>
          {this.state.isListening ? "Stop" : "Start"}
        </button>
        {finalTranscript && onFinalTranscript(finalTranscript)}
      </div>
    );
  }
}

export default SpeechRecognition({ autoStart: false })(SpeechToTextButton);
