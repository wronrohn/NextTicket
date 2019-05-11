import React, { Component } from "react";
import SpeechToText from "./SpeechToText";
import MovieList from "./MovieList";
import Network from "./Network";

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
    this.performSearch = this.performSearch.bind(this);
    this.network = new Network();
  }

  onSearchFieldChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  async onSubmittingSearch(event) {
    const { searchValue } = this.state;
    event.preventDefault();
    await this.performSearch(searchValue);
  }

  async performSearch(text) {
    let searchMovies = await this.network.getSearchResultForText(text);
    if (searchMovies) {
      this.setState({
        searchResults: searchMovies
      });
    }
  }

  onFinalTranscript(transcript) {
    console.log(transcript);
    const transcriptWordArray = transcript.toLowerCase().split(" ");
    const indexOfSearch = transcriptWordArray.indexOf("search");
    if (indexOfSearch >= 0) {
      const nextVal = transcriptWordArray[indexOfSearch + 1];
      if (nextVal) {
        this.setState({
          searchValue: nextVal
        });
        this.performSearch(nextVal);
      }
    }
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
