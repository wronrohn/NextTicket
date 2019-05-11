import React, { Component } from "react";
import SpeechToText from "./SpeechToText";
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    super(props);
    this.onFinalTranscript = this.onFinalTranscript.bind(this);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000/api"
    });
  }

  onSearchFieldChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  async onSubmittingSearch(event) {
    event.preventDefault();
    const { searchValue } = this.state;
    let seachMovies = await this.axiosInstance.get(`/search/${searchValue}`);
    console.log(`Search Movies ${seachMovies}`);
  }

  onFinalTranscript(transcript) {
    console.log(`Final Transcript ${transcript}`);
  }
  render() {
    const { searchValue: value } = this.state;
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
            value={value}
            placeholder="Search All Movies"
          />
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={this.onSubmittingSearch}
          >
            Search
          </button>
          <SpeechToText onFinalTranscript={this.onFinalTranscript} />
        </div>
      </form>
    );
  }
}
export default Search;
