"use client";
import { Navbar } from "@/components/organisms/Navbar";
import { Button } from "@/components/atoms/Button";
import Image from "next/image";
import Link from "next/link";
import {
  useBookmarkMovie,
  useGetNowPlayingMovies,
  useGetPopularMovies,
  useSearchMovies,
} from "@/modules/the-movie-db/the-movie-db.hooks";
import { Skeleton } from "@/components/atoms/Skeleton";
import { theMovieDbService } from "@/modules/the-movie-db/the-movie-db.service";
import { ScrollArea, ScrollBar } from "@/components/atoms/ScrollArea";
import { TypographyH3 } from "@/components/atoms/TypographyH3";
import { BookmarkIcon, BookmarkXIcon } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import { useDebounceValue } from "usehooks-ts";
import { cn } from "@/lib/utils";

export default function Home() {
  const {
    isGetPopularMoviesLoading,
    getPopularMoviesError,
    getPopularMoviesData,
  } = useGetPopularMovies();
  const {
    isNowPlayingMoviesLoading,
    nowPlayingMoviesData,
    nowPlayingMoviesError,
  } = useGetNowPlayingMovies();
  const {
    bookmarkedMovies,
    bookmarkedMoviesMap,
    bookmarkMovie,
    unbookmarkMovie,
    isMovieBookmarked,
  } = useBookmarkMovie();

  const handleBookmarkMovie = (movie: TheMovieDb.Movie) => {
    bookmarkMovie(movie);
  };

  const handleUnbookmarkMovie = (movieId: TheMovieDb.Movie["id"]) => {
    unbookmarkMovie(movieId);
  };

  const [debouncedKeyword, updateDebouncedKeyword] = useDebounceValue("", 500);
  const { isSearchMoviesLoading, searchMoviesData, searchMoviesError } =
    useSearchMovies(debouncedKeyword);

  return (
    <>
      <main>
        {/* Navbar */}
        <Navbar />
        {/* end of Navbar */}

        {/* Search movie */}
        <div className="max-w-screen-xl mx-auto px-[16px] mt-[24px]">
          <Input
            type="search"
            placeholder="Search movies"
            onChange={event => {
              updateDebouncedKeyword(event.target.value);
            }}
          />
        </div>
        {/* end of Search movie */}

        {/* Search result */}
        {debouncedKeyword && (
          <>
            <div className="px-[16px] xl:px-[56px] pt-0 mt-[24px] mx-auto">
              <TypographyH3>Result for {debouncedKeyword}</TypographyH3>
            </div>
            <div className="articles px-[16px] xl:px-[56px] mt-[16px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 justify-items-center gap-[16px]">
              {isSearchMoviesLoading ? (
                Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="w-full h-[300px]" />
                  ))
              ) : searchMoviesError ? (
                <>
                  <p className="col-span-full">Something went wrong</p>
                </>
              ) : searchMoviesData ? (
                searchMoviesData?.results?.map(movie => {
                  const width = 400;
                  const height = 600;

                  return (
                    <MovieCard
                      key={movie.id}
                      isBookmarked={isMovieBookmarked(movie.id)}
                      url={theMovieDbService.getMovieUrl(movie.id)}
                      posterSrc={theMovieDbService.getMoviePosterUrl(
                        movie.poster_path
                      )}
                      posterWidth={width}
                      posterHeight={height}
                      title={movie.title}
                      handleUnbookmark={() => handleUnbookmarkMovie(movie.id)}
                      handleBookmark={() => handleBookmarkMovie(movie)}
                      className="w-full"
                    />
                  );
                })
              ) : (
                <>
                  <p className="col-span-full">No movies</p>
                </>
              )}
            </div>
          </>
        )}
        {/* end of Search result */}

        {/* Your watchlist */}
        <div
          className={cn(
            "px-[16px] xl:px-[56px] pt-0 mt-[24px] mx-auto",
            debouncedKeyword ? "hidden" : "block"
          )}
        >
          <TypographyH3>My watchlist</TypographyH3>
        </div>
        <ScrollArea
          className={cn(
            "w-full mt-[16px] whitespace-nowrap",
            debouncedKeyword ? "hidden" : "block"
          )}
        >
          <div className="flex gap-[16px] px-[16px] xl:px-[56px] pb-[16px]">
            {isGetPopularMoviesLoading ? (
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="w-[200px] h-[300px]" />
                ))
            ) : getPopularMoviesError ? (
              <>
                <p className="col-span-full">Something went wrong</p>
              </>
            ) : bookmarkedMovies.length > 0 ? (
              bookmarkedMovies?.map(movie => {
                return (
                  <MovieCard
                    key={movie.id}
                    isBookmarked={isMovieBookmarked(movie.id)}
                    url={theMovieDbService.getMovieUrl(movie.id)}
                    posterSrc={theMovieDbService.getMoviePosterUrl(
                      movie.poster_path
                    )}
                    title={movie.title}
                    handleUnbookmark={() => handleUnbookmarkMovie(movie.id)}
                    handleBookmark={() => handleBookmarkMovie(movie)}
                  />
                );
              })
            ) : (
              <>
                <div className="h-[300px] rounded-lg flex items-center grow justify-center bg-slate-50 dark:bg-slate-900">
                  <p className="col-span-full">
                    Click <BookmarkIcon className="inline" /> to add watchlist
                  </p>
                </div>
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* end of Your watchlist */}

        {/* Popular movie list */}
        <div
          className={cn(
            "px-[16px] xl:px-[56px] pt-0 mt-[24px] mx-auto",
            debouncedKeyword ? "hidden" : "block"
          )}
        >
          <TypographyH3>Popular movies</TypographyH3>
        </div>

        <ScrollArea
          className={cn(
            "w-full mt-[16px] whitespace-nowrap",
            debouncedKeyword ? "hidden" : "block"
          )}
        >
          <div className="flex w-max gap-[16px] px-[16px] xl:px-[56px] pb-[16px]">
            {isGetPopularMoviesLoading ? (
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="w-[200px] h-[300px]" />
                ))
            ) : getPopularMoviesError ? (
              <>
                <p className="col-span-full">Something went wrong</p>
              </>
            ) : getPopularMoviesData ? (
              getPopularMoviesData.results?.map(movie => {
                return (
                  <MovieCard
                    key={movie.id}
                    isBookmarked={isMovieBookmarked(movie.id)}
                    url={theMovieDbService.getMovieUrl(movie.id)}
                    posterSrc={theMovieDbService.getMoviePosterUrl(
                      movie.poster_path
                    )}
                    title={movie.title}
                    handleUnbookmark={() => handleUnbookmarkMovie(movie.id)}
                    handleBookmark={() => handleBookmarkMovie(movie)}
                  />
                );
              })
            ) : (
              <>
                <p className="col-span-full">No movies</p>
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* end of Popular movie list */}

        {/* Now playing list */}
        <div
          className={cn(
            "px-[16px] xl:px-[56px] pt-0 mt-[24px] mx-auto",
            debouncedKeyword ? "hidden" : "block"
          )}
        >
          <TypographyH3>Now playing</TypographyH3>
        </div>

        <ScrollArea
          className={cn(
            "w-full mt-[16px] whitespace-nowrap",
            debouncedKeyword ? "hidden" : "block"
          )}
        >
          <div className="flex w-max gap-[16px] px-[16px] xl:px-[56px] pb-[16px]">
            {isNowPlayingMoviesLoading ? (
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="w-[200px] h-[300px]" />
                ))
            ) : nowPlayingMoviesError ? (
              <>
                <p className="col-span-full">Something went wrong</p>
              </>
            ) : nowPlayingMoviesData ? (
              nowPlayingMoviesData.results?.map(movie => {
                return (
                  <MovieCard
                    key={movie.id}
                    isBookmarked={isMovieBookmarked(movie.id)}
                    url={theMovieDbService.getMovieUrl(movie.id)}
                    posterSrc={theMovieDbService.getMoviePosterUrl(
                      movie.poster_path
                    )}
                    title={movie.title}
                    handleUnbookmark={() => handleUnbookmarkMovie(movie.id)}
                    handleBookmark={() => handleBookmarkMovie(movie)}
                  />
                );
              })
            ) : (
              <>
                <p className="col-span-full">No movies</p>
              </>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* end of Now playing list */}
      </main>
    </>
  );
}

function MovieCard({
  className,
  isBookmarked,
  handleBookmark,
  handleUnbookmark,
  url,
  posterSrc,
  title,
  posterWidth,
  posterHeight,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement> & {
  isBookmarked: boolean;
  handleBookmark: (arg: any) => any;
  handleUnbookmark: (arg: any) => any;
  url: string;
  posterSrc: string;
  posterWidth?: number;
  posterHeight?: number;
  title: string;
}) {
  return (
    <div className={cn("w-[200px] relative", className)} {...props}>
      {isBookmarked ? (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-[8px] right-[8px]"
          onClick={handleUnbookmark}
        >
          <BookmarkXIcon />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-[8px] right-[8px]"
          onClick={handleBookmark}
        >
          <BookmarkIcon />
        </Button>
      )}

      <Link href={url} target="_blank" rel="noreferrer noopener" className="">
        <Image
          src={posterSrc}
          alt={`Movie poster of ${title}`}
          width={posterWidth ?? 200}
          height={posterHeight ?? 300}
          className="rounded-lg"
        />
        <p className="font-bold text-wrap mt-[8px]">{title}</p>
      </Link>
    </div>
  );
}
