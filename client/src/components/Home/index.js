import React, { Component } from "react";
import Search from "../Search";
import MovieList from "../MovieList";
import RecommendWatchListMenu from "../RecommendWatchListMenu";

import { withAuthorization } from "../../Session";
import { withFirebase } from "../../Firebase";
import Network from "../Network";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.onWatchListTapped = this.onWatchListTapped.bind(this);
    this.onRecomemndationTapped = this.onRecomemndationTapped.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.network = new Network();
  }
  async onWatchListTapped(uid) {
    const watchList = await this.network.getWatchListForUser(uid);
    if (watchList) {
      this.setState({
        movies: watchList
      });
    }
  }
  async onRecomemndationTapped(uid) {
    const recomMovies = await this.network.getRecommendedMoviesForUser(uid);
    if (recomMovies) {
      this.setState({
        movies: recomMovies
      });
    }
  }
  async performSearch(text) {
    const searchMovies = await this.network.getSearchResultForText(text);
    if (searchMovies) {
      this.setState({
        movies: searchMovies
      });
    }
  }
  render() {
    const { movies } = this.state;
    return (
      <div className="container">
        <Search performSearch={this.performSearch} />
        <RecommendWatchListMenu
          onWatchListTapped={this.onWatchListTapped}
          onRecomemndationTapped={this.onRecomemndationTapped}
        />
        {movies && <MovieList movies={movies} />}
      </div>
    );
  }
}

export default withAuthorization()(withFirebase(Home));
