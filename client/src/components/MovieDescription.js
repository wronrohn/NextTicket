import React, { Component } from "react";
import Network from "./Network";

class MovieDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
    super(props);
    this.network = new Network();
  }
  async componentDidMount() {
    const { location } = this.props;
    if (location) {
      const pathName = location.pathname;
      const movieID = pathName.substr(pathName.lastIndexOf("/") + 1);
      const movie = await this.network.getMovieWithId(movieID);
      this.setState({
        movie: movie
      });
    }
  }
  render() {
    const { movie } = this.state;

    if (movie) {
      const { title, description, genre, subgenre, theme } = movie;
      return (
        <div className="container">
          <div className="row movie-description-inner">
            <div className="col-md-6 col-sm-12 col-lg-6 col-xs-12">
              <img
                src="https://www.flightjournal.com/wp-content/uploads/2011/12/P-40flight.jpg"
                className="movie-description-img"
                alt="Placehoder"
              />
            </div>

            <div className="col-md-12 col-sm-12 col-lg-6 col-xs-12">
              <div className="text-white">
                <div>
                  <h1 className="display-4">{title}</h1>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-8 col-sm-8 col-xs-12">
                    <p>
                      Genre: {genre} {subgenre && ` - ${subgenre}`}
                    </p>
                    {theme && <p>Theme: {theme}</p>}
                  </div>
                  <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12">
                    <button className="btn btn-primary wishlist-cta-btn">
                      Add to Watch list
                    </button>
                  </div>
                </div>
                {description && <h2>Description</h2>}
                <p className="lead">{description}</p>
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

export default MovieDescription;
