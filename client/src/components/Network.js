import axios from "axios";
class Network {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000/api"
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

  async addMovieToWatchList(uid, movieID) {
    let watchListedMovieData = await this.axiosInstance.post("/movies", {
      movieid: movieID,
      uid: uid
    });
    if (watchListedMovieData && watchListedMovieData.data) {
      return watchListedMovieData.data;
    }
  }
}

export default Network;
