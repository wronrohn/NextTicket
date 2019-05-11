import React from "react";
import Rating from "react-rating";
import { Link, Route } from "react-router-dom";
import MovieDescription from "./MovieDescription";
import * as ROUTES from "../constants/routes";
const Movie = props => {
  const { title, category, rating, theme, _id: id } = props;

  return (
    <div
      style={{
        "box-shadow": "5px 5px 5px 5px rgba(0,0,0,0.5)"
      }}
    >
      <Link
        to={`/movie/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="card mt-4">
          <div className="row no-gutters">
            <div className="col-auto">
              <img
                src="http://via.placeholder.com/250x250"
                className="img-fluid"
                alt="Placehoder"
              />
            </div>
            <div className="d-flex align-self-center">
              <div className="align-self-center ml-2">
                <div className="card-block px-2">
                  <h2 className="card-title">{title}</h2>
                  <p className="card-text">Theme:{theme}</p>
                  <p className="card-text">Category:{category}</p>
                  <Rating
                    start={0}
                    stop={10}
                    step={2}
                    fractions={2}
                    readonly={true}
                    initialRating={rating}
                  />
                </div>
                <button className="btn btn-primary mt-3 ml-2">
                  Add to Watch list
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
