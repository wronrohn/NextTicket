import React, { Component } from "react";
import SpeechToText from "./SpeechToText";

class Search extends Component {
  constructor(props) {
    super(props);
    this.onFinalTranscript = this.onFinalTranscript.bind(this);
  }
  onFinalTranscript(transcript) {
    console.log(`Final Transcript ${transcript}`);
  }
  render() {
    return (
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
          <button type="submit" className="btn btn-primary mb-2">
            Search
          </button>
          <SpeechToText onFinalTranscript={this.onFinalTranscript} />
        </div>
      </form>
    );
  }
}
export default Search;