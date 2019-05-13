import axios from "axios";
class Network {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3001/api"
    });
    this.getSearchResultForText = this.getSearchResultForText.bind(this);
  }
  async getSearchResultForText(text) {
    let seachMoviesData = await this.axiosInstance.get(`/search/${text}`);
    if (seachMoviesData && seachMoviesData.data) {
      return seachMoviesData.data;
    }
  }
  async getMovieWithId(id) {
    let seachMoviesData = await this.axiosInstance.get(`/movies/${id}`);
    console.log(seachMoviesData);
    if (seachMoviesData && seachMoviesData.data) {
      return seachMoviesData.data;
    }
  }
  async getMovieFromMovieName(name) {
    let searchData = await this.axiosInstance.get(`/movies/name/?text=${name}`);
    console.log(searchData);
    if (searchData && searchData.data) {
      return searchData.data;
    }
  }

  async addMovieToWatchList(uid, movieID) {
    let watchListedMovieData = await this.axiosInstance.post(
      "/movies/watchlist/",
      {
        movieid: movieID,
        uid: uid
      }
    );
    if (watchListedMovieData && watchListedMovieData.data) {
      return watchListedMovieData.data;
    }
  }

  /**
   * Synchronizes a user's watchlist when they fist log in. Ensures
   * recommendations can be retrieved.
   *
   * @param {string} uid The user id.
   */
  async syncWatchlistForLogin(uid) {
      await this.axiosInstance.post("/movies/sync", { uid: uid });
  }

  async removeMovieFromWatchlist(uid, movieID) {
    let watchListedMovieData = await this.axiosInstance.put(
      "/movies/watchlist/",
      {
        movieid: movieID,
        uid: uid
      }
    );
    if (watchListedMovieData && watchListedMovieData.data) {
      return watchListedMovieData.data;
    }
  }

  async getWatchListForUser(uid) {
    let watchListData = await this.axiosInstance.get(
      `/movies/watchlist/${uid}`
    );
    if (watchListData && watchListData.data) {
      return watchListData.data;
    }
  }

  async getRecommendedMoviesForUser(uid) {
    let recommData = await this.axiosInstance.get(
      `/movies/recommendation/${uid}`
    );
    if (recommData && recommData.data) {
      return recommData.data;
    }
  }
}

export default Network;
