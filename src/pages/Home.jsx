import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeroMovie from "../components/movies/HeroMovie";
import GenreFilter from "../components/movies/GenreFilter";
import MovieList from "../components/movies/MovieList";
import { getPopularMovies } from "../redux/actions/movieActions";

function Home() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  const [activeGenre, setActiveGenre] = useState("Trending");

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  const formattedMovies = movies.map((movie) => ({
    id: movie.id,

    title: movie.primaryTitle || "Untitled",

    year: movie.startYear || null,

    rating: movie.averageRating || null,

    genre: movie.genres?.[0] || null,

    genres: movie.genres || [],

    languages: movie.spokenLanguages || [],

    releaseDate: movie.releaseDate || null,

    description: movie.description || "No description available.",

    // Use the local poster stored inside public/posters.
    poster: `/posters/${movie.id}.jpg`,

    // Use the same local poster for the hero background.
    backdrop: `/posters/${movie.id}.jpg`,

    trailer: movie.trailer || null,
  }));

  const filteredMovies =
    activeGenre === "Trending"
      ? formattedMovies
      : formattedMovies.filter((movie) => movie.genres.includes(activeGenre));

  const heroMovie = formattedMovies[0];

  return (
    <div className="min-h-screen bg-[#080d10] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Loading State */}
        {loading && (
          <div className="flex min-h-100 items-center justify-center">
            <p className="text-sm text-gray-400">Loading movies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="text-sm text-red-400">Failed to load movies.</p>

            <p className="mt-2 text-xs text-gray-500">{error}</p>
          </div>
        )}

        {/* Movie Content */}
        {!loading && !error && formattedMovies.length > 0 && (
          <>
            {/* Hero */}
            <HeroMovie movie={heroMovie} />

            {/* Genre Filter */}
            <GenreFilter
              activeGenre={activeGenre}
              onGenreChange={setActiveGenre}
            />

            {/* Movies */}
            <section className="mt-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Popular Movies
                </h2>

                <span className="text-xs text-gray-500">
                  {filteredMovies.length} movies
                </span>
              </div>

              <MovieList movies={filteredMovies} />
            </section>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && formattedMovies.length === 0 && (
          <div className="flex min-h-100 items-center justify-center">
            <p className="text-sm text-gray-500">No movies available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
