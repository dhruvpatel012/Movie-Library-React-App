import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import MovieList from "../components/movies/MovieList";
import { searchMovieList } from "../redux/actions/movieActions";

function Search() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchMovieList(query));
    }, 500);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

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

    // Use the local poster from public/posters.
    poster: `/posters/${movie.id}.jpg`,

    backdrop: `/posters/${movie.id}.jpg`,

    trailer: movie.trailer || null,
  }));

  return (
    <div className="min-h-screen bg-[#080d10] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <h1 className="text-2xl font-semibold text-white">Search Movies</h1>

        {!query.trim() && (
          <p className="mt-8 text-sm text-gray-500">
            Start typing to search for movies.
          </p>
        )}

        {loading && (
          <p className="mt-8 text-sm text-gray-400">Searching movies...</p>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <p className="text-sm text-red-400">Failed to search movies.</p>

            <p className="mt-2 text-xs text-gray-500">{error}</p>
          </div>
        )}

        {!loading && !error && query.trim() && formattedMovies.length > 0 && (
          <section className="mt-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Search Results
              </h2>

              <span className="text-xs text-gray-500">
                {formattedMovies.length} movies
              </span>
            </div>

            <MovieList movies={formattedMovies} />
          </section>
        )}

        {!loading && !error && query.trim() && formattedMovies.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/5 bg-white/3 p-8 text-center">
            <p className="text-sm text-gray-400">
              No movies found for "{query}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
