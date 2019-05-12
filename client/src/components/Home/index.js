import React, { Component } from "react";
import Search from "../Search";
import MovieList from "../MovieList";
import RecommendWatchListMenu from "../RecommendWatchListMenu";

import { withAuthorization, AuthUserContext } from "../../Session";
import { withFirebase } from "../../Firebase";
import Network from "../Network";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchText: ""
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
        movies: watchList,
        searchText: ""
      });
    }
  }
  async onRecomemndationTapped(uid) {
    const recomMovies = await this.network.getRecommendedMoviesForUser(uid);
    if (recomMovies) {
      this.setState({
        movies: recomMovies,
        searchText: ""
      });
    }
  }
  async componentDidMount() {
    const { uid: currentUserUID } = this.props.firebase.auth.currentUser;
    console.log(this.props.firebase.auth.currentUser.uid);
    if (currentUserUID) {
      console.log(`HEre`);
      this.onRecomemndationTapped(currentUserUID);
    }
  }

  async performSearch(text) {
    const searchMovies = await this.network.getSearchResultForText(text);
    if (searchMovies) {
      this.setState({
        movies: searchMovies,
        searchText: text
      });
    }
  }
  render() {
    const { movies, searchText } = this.state;
    console.log(`Re-rendered`);
    return (
      <div className="container">
        <Search performSearch={this.performSearch} searchText={searchText} />
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
