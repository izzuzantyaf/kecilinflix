import { theMovieDbService } from "@/modules/the-movie-db/the-movie-db.service";
import axios from "axios";
import useSWR from "swr";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

export function useGetPopularMovies() {
  const { isLoading, data, error, mutate } = useSWR("get-popular-movies", key =>
    axios.get<
      Awaited<ReturnType<typeof theMovieDbService.getPopularMovies>>["data"]
    >("/api/tmdb/movie/popular")
  );

  return {
    isGetPopularMoviesLoading: isLoading,
    getPopularMoviesError: error,
    getPopularMoviesData: data?.data,
    getPopularMovies: mutate,
  };
}

export function useGetNowPlayingMovies() {
  const { isLoading, data, error, mutate } = useSWR(
    "get-now-playing-movies",
    key =>
      axios.get<
        Awaited<
          ReturnType<typeof theMovieDbService.getNowPlayingMovies>
        >["data"]
      >("/api/tmdb/movie/now_playing")
  );

  return {
    isNowPlayingMoviesLoading: isLoading,
    nowPlayingMoviesError: error,
    nowPlayingMoviesData: data?.data,
    nowPlayingMovies: mutate,
  };
}

export function useSearchMovies(keyword: string) {
  const { isLoading, data, error, mutate } = useSWR(
    keyword ? `search-movies-${keyword}` : null,
    key =>
      axios.get<
        Awaited<ReturnType<typeof theMovieDbService.searchMovies>>["data"]
      >("/api/tmdb/search/movie", { params: { keyword } })
  );

  return {
    isSearchMoviesLoading: isLoading,
    searchMoviesError: error,
    searchMoviesData: data?.data,
    searchMovies: mutate,
  };
}

export function useBookmarkMovie() {
  const bookmarkedMoviesMapJson =
    useReadLocalStorage<string>("bookmarked-movies-map") ?? "{}";
  const bookmarkedMoviesMap = JSON.parse(bookmarkedMoviesMapJson) as Record<
    string,
    true | undefined
  >;

  const bookmarkedMoviesJson =
    useReadLocalStorage<string>("bookmarked-movies") ?? "[]";
  const bookmarkedMovies = JSON.parse(
    bookmarkedMoviesJson
  ) as TheMovieDb.Movie[];

  const [, setBookmarkedMovies] = useLocalStorage<string>(
    "bookmarked-movies",
    bookmarkedMoviesJson
  );
  const [, setBookmarkedMoviesMap] = useLocalStorage(
    "bookmarked-movies-map",
    bookmarkedMoviesMapJson
  );

  function isMovieBookmarked(movieId: TheMovieDb.Movie["id"]) {
    return bookmarkedMoviesMap[movieId] ? true : false;
  }

  function bookmarkMovie(movie: TheMovieDb.Movie) {
    const isBookmarked = isMovieBookmarked(movie.id);
    if (isBookmarked) return;

    bookmarkedMovies.unshift(movie);
    bookmarkedMoviesMap[movie.id] = true;

    setBookmarkedMovies(JSON.stringify(bookmarkedMovies));
    setBookmarkedMoviesMap(JSON.stringify(bookmarkedMoviesMap));
  }

  function unbookmarkMovie(movieId: TheMovieDb.Movie["id"]) {
    const newBookmarkedMovies = bookmarkedMovies.filter(
      movie => movie.id !== movieId
    );
    delete bookmarkedMoviesMap[movieId];

    setBookmarkedMovies(JSON.stringify(newBookmarkedMovies));
    setBookmarkedMoviesMap(JSON.stringify(bookmarkedMoviesMap));
  }

  return {
    bookmarkedMovies,
    bookmarkedMoviesMap,
    bookmarkMovie,
    unbookmarkMovie,
    isMovieBookmarked,
  };
}
