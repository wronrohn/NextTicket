import React, { Component } from "react";
import SpeechToText from "./SpeechToText";
import Network from "./Network";
import { AuthUserContext } from "../Session";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: props.searchText ? props.searchText : "",
      uid: null
    };
    super(props);
    this.onFinalTranscript = this.onFinalTranscript.bind(this);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    this.onSubmittingSearch = this.onSubmittingSearch.bind(this);
    this.network = new Network();
  }

  onSearchFieldChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  componentWillReceiveProps(props) {
    console.log(`props ${JSON.stringify(props)}`);
    const { searchText } = props;
    console.log(searchText);
    if (searchText !== undefined) {
      this.setState({
        searchValue: searchText
      });
    }
  }

  async onSubmittingSearch(event) {
    const { searchValue } = this.state;
    event.preventDefault();
    await this.props.performSearch(searchValue);
  }

  async performAdd(name, uid) {
    let movieData = await this.network.getMovieFromMovieName(name);
    console.log(movieData);
    if (movieData) {
      console.log(this.authUser);
      let resultData = await this.network.addMovieToWatchList(
        uid,
        movieData._id
      );
      if (resultData) {
        alert("Watchlist added");
        return resultData;
      } else {
        alert("Try again. Couldn't find movie");
      }
    }
  }

  async performRemove(name, uid) {
    let movieData = await this.network.getMovieFromMovieName(name);
    console.log(movieData);
    if (movieData) {
      let resultData = await this.network.removeMovieFromWatchlist(
        uid,
        movieData._id
      );
      alert("Removed from watchlist");
      return resultData;
    } else {
      alert("Removing failed");
    }
  }

  onFinalTranscript(transcript, uid) {
    console.log("here");
    console.log(transcript);
    let transcriptWordArray = transcript.toLowerCase().split(" ");
    if (transcript.includes("search")) {
      transcriptWordArray.shift();
      let nextVal = transcriptWordArray.join(" ");
      if (nextVal) {
        this.setState({
          searchValue: nextVal
        });
        this.props.performSearch(nextVal);
      }
    } else if (transcript.includes("add")) {
      transcriptWordArray.shift();
      let movieName = transcriptWordArray.join(" ");
      console.log(movieName);
      this.performAdd(movieName, uid);
    } else if (transcript.includes("remove")) {
      transcriptWordArray.shift();
      console.log(transcriptWordArray);
      let movieName = transcriptWordArray.join(" ");
      console.log(movieName);
      this.performRemove(movieName, uid);
    }
  }

  render() {
    console.log("render search");
    const { searchValue } = this.state;
    console.log(`Search val ${searchValue}`);
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
            <AuthUserContext.Consumer>
              {authUser => {
                return (
                  <SpeechToText
                    onFinalTranscript={transcript => {
                      this.onFinalTranscript(transcript, authUser.uid);
                    }}
                  />
                );
              }}
            </AuthUserContext.Consumer>
          </div>
        </form>
      </div>
    );
  }
}
export default Search;
