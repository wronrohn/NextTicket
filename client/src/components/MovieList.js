import React from "react";
import Movie from "./Movie";
import NoResultFound from "../NoResultFound";

const MovieList = ({ movies, removeFromWatchList, error }) => {

  let seen = new Map();

  if (movies.length > 0) {
    return (
      <div className="mb-5 mt-5">
        {movies.map(movie => {
            // Some recommendations overlap. Don't list the same movie twice.
            if( ! seen.has(movie._id)) {
                seen.set(movie._id, true);
                return (
                    <Movie
                        key={movie._id}
                        {...movie}
                        removeFromWatchList={removeFromWatchList}
                    />
                );
            }
        })}
      </div>
    );
  } else {
    if (!error) {
      console.log("here in no result");
      return <NoResultFound />;
    } else {
      return null;
    }
  }
};

export default MovieList;
