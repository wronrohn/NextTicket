import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Search from "../Search";
import MovieList from "../MovieList";
import RecommendWatchListMenu from "../RecommendWatchListMenu";

import { withAuthorization } from "../../Session";
import { withFirebase } from "../../Firebase";
import Network from "../Network";
import Error from "../Error";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchText: "",
      recommendation: true,
      watchList: false,
      error: null,
      voiceSelectMovie: null
    };
    this.onWatchListTapped = this.onWatchListTapped.bind(this);
    this.onRecomemndationTapped = this.onRecomemndationTapped.bind(this);
    this.onShowMovieCard = this.onShowMovieCard.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.removeFromWatchList = this.removeFromWatchList.bind(this);
    this.network = new Network();
  }
  async onWatchListTapped(uid) {
    try {
      const watchList = await this.network.getWatchListForUser(uid);
      if (watchList) {
        this.setState({
          movies: watchList,
          searchText: "",
          recommendation: false,
          watchList: true,
          error: null
        });
      }
    } catch (e) {
      this.setState({
        movies: [],
        searchText: "",
        recommendation: false,
        watchList: true,
        error: e
      });
    }
  }
  async removeFromWatchList(uid) {
    await this.onWatchListTapped(uid);
  }
  async onRecomemndationTapped(uid) {
    let recomMovies = [];
    let error;
    try {
      recomMovies = await this.network.getRecommendedMoviesForUser(uid);
    } catch (e) {
      recomMovies = [];
      error = e;
    }
    this.setState({
      movies: recomMovies,
      searchText: "",
      recommendation: true,
      watchList: false,
      error: error
    });
  }
  async componentDidMount() {
    const { uid: currentUserUID } = this.props.firebase.auth.currentUser;
    if (currentUserUID) {
      this.onRecomemndationTapped(currentUserUID);
    }
  }

  /**
   * Signals the Home page that the user has attempted to select a movie using
   * the web voice api.
   *
   * NOTICE: The index page will be unmounted shortly after this method
   *         completes. As a result the method must be synchronous otherwise
   *         React will issue an exception.
   * @param {string} movie_id
   */
  onShowMovieCard(movie_id) {
    this.setState({ voiceSelectMovie: movie_id });
  }

  async performSearch(text) {
    try {
      const searchMovies = await this.network.getSearchResultForText(text);
      if (searchMovies) {
        this.setState({
          movies: searchMovies,
          searchText: text,
          recommendation: false,
          watchList: false,
          error: null
        });
      }
    } catch (e) {
      this.setState({
        movies: [],
        searchText: text,
        recommendation: false,
        watchList: false,
        error: e
      });
    }
  }
  render() {
    const { movies, searchText, recommendation, watchList, error } = this.state;

    let retVal = null;

    if (this.state.voiceSelectMovie) {
      retVal = <Redirect to={`/movie/${this.state.voiceSelectMovie}`} />;
    } else {
      retVal = (
        <div className="container">
          <Search
            performSearch={this.performSearch}
            searchText={searchText}
            onRecomemndationTapped={this.onRecomemndationTapped}
            onWatchListTapped={this.onWatchListTapped}
            onShowMovieCard={this.onShowMovieCard}
          />
          <RecommendWatchListMenu
            onWatchListTapped={this.onWatchListTapped}
            onRecomemndationTapped={this.onRecomemndationTapped}
            recommendation={recommendation}
            watchlist={watchList}
          />
          {error &&
            (error.message ? (
              <Error message={error.message} />
            ) : (
              <Error message={`Something bad happened`} />
            ))}
          {movies && (
            <MovieList
              movies={movies}
              removeFromWatchList={watchList ? this.removeFromWatchList : null}
              error={error}
            />
          )}
        </div>
      );
    }
    return retVal;
  }
}

export default withAuthorization()(withFirebase(Home));
