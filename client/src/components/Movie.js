import React, { Component } from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import Network from "./Network";
class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props
    };
    this.watchlistButtonClicked = this.watchlistButtonClicked.bind(this);
    this.removeFromWatchList = this.removeFromWatchList.bind(this);
    this.network = new Network();
  }

  async watchlistButtonClicked(userID) {
    const { _id: movieID } = this.state.movie;
    const movie = await this.network.addMovieToWatchList(userID, movieID);
    this.setState({ movie: movie });
  }

  async removeFromWatchList(userID) {
    const { _id: movieID } = this.state.movie;
    const movie = await this.network.removeMovieFromWatchlist(userID, movieID);
    this.setState({ movie: movie });
  }

  render() {
    const {
      title,
      category,
      rating,
      theme,
      _id: id,
      watchlist
    } = this.state.movie;
    return (
      <div
        style={{
          boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.5)"
        }}
      >
        <div className="card mt-4">
          <div className="row movie-container-div">
            <div className="img-wrapper col-md-4">
              <img
                src="https://www.flightjournal.com/wp-content/uploads/2011/12/P-40flight.jpg"
                alt="Placehoder"
              />
            </div>
            <div className="col-md-8">
              <div className="align-self-center ml-2">
                <Link
                  to={`/movie/${id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="card-block px-2">
                    <h2 className="card-title movie-title">{title}</h2>
                    <p className="card-text movie-theme">Theme: {theme}</p>
                    <p className="card-text movie-category">Category: {category}</p>
                    <Rating
                      start={0}
                      stop={10}
                      step={2}
                      fractions={2}
                      readonly={true}
                      initialRating={rating}
                    />
                  </div>
                </Link>

                <AuthUserContext.Consumer>
                  {authUser => {
                    if (watchlist && watchlist.includes(authUser.uid)) {
                      return (
                        <button
                          className="btn btn-primary wishlist-cta-btn"
                          onClick={e => {
                            this.removeFromWatchList(authUser.uid);
                          }}
                        >
                          Remove from Watchlist
                        </button>
                      );
                    } else {
                      return (
                        <button
                          className="btn btn-primary wishlist-cta-btn"
                          onClick={e => {
                            this.watchlistButtonClicked(authUser.uid);
                          }}
                        >
                          Add to Watch list
                        </button>
                      );
                    }
                  }}
                </AuthUserContext.Consumer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
