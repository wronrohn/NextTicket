import React from "react";
import Rating from "react-rating";
const Movie = ({ title, category, rating, genre }) => (
  <div className="card mt-3">
    <div className="row no-gutters">
      <div className="col-auto">
        <img
          src="http://via.placeholder.com/250x250"
          className="img-fluid"
          alt=""
        />
      </div>
      <div className="col align-self-center ml-2">
        <div className="card-block px-2">
          <h2 className="card-title">{title}</h2>
          <p className="card-text">Genre:{genre}</p>
          <p className="card-text">Category:{category}</p>
          <Rating
            start={0}
            stop={10}
            step={2}
            fractions={2}
            readonly={true}
            initialRating={rating}
          />
          <button className="card-text btn btn-primary">
            Add to Watch list
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Movie;
