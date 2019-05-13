import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SpeechToText from "./SpeechToText";
import Network from "./Network";
import { AuthUserContext } from "../Session";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: props.searchText ? props.searchText : "",
      uid: null,
      transcript: "",
      redirectTo: null,
      accepted: null,
      error: null
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
    const { searchText } = props;
    console.log(`Search Text ${searchText}`);
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

  async performSearch(text) {
    let searchMovies = await this.network.getSearchResultForText(text);
    if (searchMovies) {
      this.setState({
        searchResults: searchMovies
      });
    }
  }
  async performAdd(uid, name) {
    let movieData = await this.network.getMovieFromMovieName(name);
    console.log(movieData);
    if (movieData) {

      try {
        let resultData = await this.network.addMovieToWatchList(
          uid,
          movieData._id
        );
        console.log(resultData);

        this.setState( { accepted : `Added ${name} to watchlist.`} );
        return resultData;

    } catch (e) {
        this.setState( { error : "Please try again. Couldn't get you accurately!"} );
      }
    }
  }

  async performRemove(name, uid) {
    let movieData = await this.network.getMovieFromMovieName(name);
    if (movieData) {
      try {
        let resultData = await this.network.removeMovieFromWatchlist(
          uid,
          movieData._id
        );
        this.setState( { accepted : `Removed ${name}.` } );
        return resultData;
      } catch (e) {
        this.setState( { error : "Please try again. Couldn't get you accurately!" } );
      }
    } else {
      this.setState( { error : "Please try again. Couldn't get you accurately!" } );
    }
  }

    onFinalTranscript(transcript, uid) {

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
        }
        else if (transcript.includes("add")) {

            transcriptWordArray.shift();
            let movieName = transcriptWordArray.join(" ");

            this.performAdd(uid, movieName);
        }
        else if (transcript.includes("remove")) {

            console.log("")

            transcriptWordArray.shift();

            let movieName = transcriptWordArray.join(" ");
            this.performRemove(movieName, uid);
        }
        else if (
            transcript.includes("show") ||
            transcript.includes("recommendations") ||
            transcript.includes("recommend")  ||
            transcript.includes("watchlist") ||
            transcript.includes("watch") ||
            transcript.includes("list")
        ) {

            if(
                transcript.includes("recommendations") ||
                transcript.includes("recommend")
            ) {
                this.props.onRecomemndationTapped(uid);
            }
            else if(
                transcript.includes("watchlist") ||
                transcript.includes("watch") ||
                transcript.includes("list")
            ) {
                this.props.onWatchListTapped(uid);
            }
            else {
                this.setState( { error : `Please try again. I heard ${transcript}` } );
            }
        }
        else {
            this.setState( { error : `Please try again. I heard ${transcript}` } );
        }
    }

  render() {
    console.log("render search");
    const { searchValue } = this.state;
    const isInvalid = searchValue === "";
    console.log(`Search val ${searchValue}`);

    const voiceActionPerformedLabel = ( ! this.state.accepted) ? null :
        <div className="row alert alert-success alert-anim ml-2 mr-2" role="alert">
            {`${this.state.accepted}`}
        </div>

    const voiceActionErrorLabel = ( ! this.state.error) ? null :
        <div className="row alert alert-danger alert-anim ml-2 mr-2" role="alert">
            {`${this.state.error}`}
        </div>

    return (
      <div>
        <form className="mt-5 row no-gutters">
          <div className="input-group">
            <label
              className="sr-only"
              htmlFor="search"
              style={{ color: "#2f922f" }}
            >
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
              disabled={isInvalid}
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
        {voiceActionPerformedLabel && voiceActionPerformedLabel}
        {voiceActionErrorLabel && voiceActionErrorLabel}
      </div>
    );
  }
}
export default Search;
