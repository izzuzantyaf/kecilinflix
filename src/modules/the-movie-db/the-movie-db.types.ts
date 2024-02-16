namespace TheMovieDb {
  // There are more fields in the response, but we only need these for now
  export interface Movie {
    id: number;
    overview: string;
    poster_path: string;
    title: string;
  }
  export interface PopularMoviesResponse {
    page: number;
    results: Movie[];
  }
  export interface NowPlayingMoviesResponse {
    page: number;
    results: Movie[];
  }
  export interface SearchMoviesResponse {
    page: number;
    results: Movie[];
  }
}
