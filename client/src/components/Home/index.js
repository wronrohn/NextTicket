import React from "react";
import Search from "../Search";
import MovieList from "../MovieList";
import RecommendWatchListMenu from "../RecommendWatchListMenu";

import { withAuthorization } from "../../Session";
import { withFirebase } from "../../Firebase";

const Home = () => (
  <div className="container">
    <Search />
    <RecommendWatchListMenu />
    <MovieList />
  </div>
);

export default withAuthorization()(withFirebase(Home));
