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
    const movie = await this.network.getMovieWithId(
      "b24453b6-55dc-47c3-b7b1-3e2331ef9043"
    );
    console.log(`movie ${JSON.stringify(movie)}`);
    this.setState({
      movie: movie
    });
  }
  render() {
    const { movie } = this.state;

    if (movie) {
      const { title, description, subgenre } = movie;
      return (
        <div className="container mt-5 mb-5">
          <div className="row">
            <img
              src="https://www.flightjournal.com/wp-content/uploads/2011/12/P-40flight.jpg"
              className="offset-2 col-8"
              alt="Placehoder"
            />
          </div>
          <div className="row">
            <div className="offset-2 col-8 mt-3 text-white">
              <h1 className="display-4">{title}</h1>
              <p>Genre: {subgenre}</p>
              <p className="lead">{description}</p>
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
