import React, { Component } from "react";
import SpeechToText from "./SpeechToText";
import axios from "axios";
import MovieList from "./MovieList";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchResults: null
    };
    super(props);
    this.onFinalTranscript = this.onFinalTranscript.bind(this);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    this.onSubmittingSearch = this.onSubmittingSearch.bind(this);
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000/api"
    });
  }

  onSearchFieldChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  async onSubmittingSearch(event) {
    const { searchValue } = this.state;
    event.preventDefault();
    let seachMoviesData = await this.axiosInstance.get(
      `/search/${searchValue}`
    );
    if (seachMoviesData && seachMoviesData.data) {
      this.setState({
        searchResults: seachMoviesData.data
      });
    }
  }

  onFinalTranscript(transcript) {
    console.log(`Final Transcript ${transcript}`);
  }

  render() {
    const { searchValue, searchResults } = this.state;
    return (
      <div>
        <form className="mt-5 row no-gutters">
          <div className="input-group">
            <label className="sr-only" htmlFor="search">
              Search
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              id="search"
              value={searchValue}
              onChange={this.onSearchFieldChange}
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
        {searchResults && <MovieList movies={searchResults} />}
      </div>
    );
  }
}
export default Search;
