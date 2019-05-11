import React from "react";
import Search from "../Search";
import MovieList from "../MovieList";
import RecommendWatchListMenu from "../RecommendWatchListMenu";

const Home = () => (
  <div className="container">
    <Search />
    <RecommendWatchListMenu />
    <MovieList />
  </div>
);

export default Home;
