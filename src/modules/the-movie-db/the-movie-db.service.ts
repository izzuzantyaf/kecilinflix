import axios from "axios";

class TheMovieDbService {
  private readonly baseUrl = "https://api.themoviedb.org/3";
  private readonly authBearerToken = `Bearer ${process.env.THE_MOVIE_DB_ACCESS_TOKEN}`;

  async getPopularMovies() {
    const response = await axios.get<TheMovieDb.PopularMoviesResponse>(
      `${this.baseUrl}/movie/popular`,
      {
        headers: {
          Authorization: this.authBearerToken,
        },
      }
    );

    return response;
  }

  async getNowPlayingMovies() {
    const response = await axios.get<TheMovieDb.NowPlayingMoviesResponse>(
      `${this.baseUrl}/movie/now_playing`,
      {
        headers: {
          Authorization: this.authBearerToken,
        },
      }
    );

    return response;
  }

  async searchMovies(keyword: string) {
    const response = await axios.get<TheMovieDb.SearchMoviesResponse>(
      `${this.baseUrl}/search/movie`,
      {
        params: {
          query: keyword,
        },
        headers: {
          Authorization: this.authBearerToken,
        },
      }
    );

    return response;
  }

  getMoviePosterUrl(posterPath: TheMovieDb.Movie["poster_path"]) {
    return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`;
  }

  getMovieUrl(movieId: TheMovieDb.Movie["id"]) {
    return `https://www.themoviedb.org/movie/${movieId}`;
  }
}

export const theMovieDbService = new TheMovieDbService();
