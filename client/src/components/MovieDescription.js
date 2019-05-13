import React, { Component } from "react";
import Network from "./Network";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import Error from "./Error";
import { AuthUserContext } from "../Session";
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
        watchlist
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
                  <h1 className="display-4 movie-title">{title}</h1>
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
                {description && <h2>Description</h2>}
                <p className="lead movie-description">{description}</p>
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
