import React, { Component } from "react";
import Network from "./Network";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import Error from "./Error";
import { AuthUserContext } from "../Session";
import Rating from "react-rating";
class MovieDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      error: null
    };
    super(props);
    this.network = new Network();
    this.watchlistButtonClicked = this.watchlistButtonClicked.bind(this);
    this.removeFromWatchList = this.removeFromWatchList.bind(this);
  }
  async componentDidMount() {
    const { location } = this.props;
    try {
      if (location) {
        const pathName = location.pathname;
        const movieID = pathName.substr(pathName.lastIndexOf("/") + 1);
        const movie = await this.network.getMovieWithId(movieID);
        this.setState({
          movie: movie
        });
      }
    } catch (e) {
      this.setState({
        movie: null,
        error: e
      });
    }
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
    const { movie, error } = this.state;
    if (error) {
      if (error.message) {
        return <Error message={error.message} />;
      } else {
        return <Error message="Something Bad Happened" />;
      }
    }
    if (movie) {
      const {
        title,
        description,
        genre,
        subgenre,
        theme,
        movie: name,
        watchlist,
        rating,
        releasedate
      } = movie;
      return (
        <div className="container">
          <div className="row movie-description-inner">
            <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12">
              <img
                src={`http://localhost:3001/images/${name}.jpg`}
                className="movie-description-img"
                alt="Placehoder"
              />
            </div>

            <div className="col-md-12 col-sm-12 col-lg-6 col-xs-12">
              <div className="text-white">
                <div>
                  <h1
                    className="display-4 movie-title"
                    style={{ fontSize: "2em" }}
                  >
                    {title}
                  </h1>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-8 col-sm-8 col-xs-12">
                    <p>
                      Genre: {genre} {subgenre && ` - ${subgenre}`}
                    </p>
                    {theme && <p>Theme: {theme}</p>}
                    {watchlist && watchlist.length > 0 && (
                      <p className="watch-list-text">
                        {`${watchlist.length} ${
                          watchlist.length > 1 ? `persons have` : `person has`
                        } this movie in their watchlist`}
                      </p>
                    )}
                  </div>

                  <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12">
                    <AuthUserContext.Consumer>
                      {authUser => {
                        if (watchlist && watchlist.includes(authUser.uid)) {
                          return (
                            <button
                              className="btn btn-primary wishlist-cta-btn"
                              style={{ marginBottom: "1rem" }}
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
                              style={{ marginBottom: "1rem" }}
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
                {releasedate && <p className="">Released On: {releasedate}</p>}
                {/* {
                  <div >
                    <p> Rating:</p>
                    <Rating
                      start={0}
                      stop={10}
                      step={2}
                      fractions={2}
                      readonly={true}
                      initialRating={rating}
                    />
                  </div>
                } */}
                {description && (
                  <h2 style={{ fontSize: "1.5em" }}>Description</h2>
                )}
                <p
                  className="lead movie-description"
                  style={{ fontSize: "1rem" }}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withAuthorization()(withFirebase(MovieDescription));
