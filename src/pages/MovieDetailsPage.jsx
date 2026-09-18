import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MovieDetails from "../components/movies/MovieDetails";
import { getMovieDetails } from "../redux/actions/movieActions";

function MovieDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movies.selectedMovie);
  const loading = useSelector((state) => state.movies.detailsLoading);
  const error = useSelector((state) => state.movies.detailsError);

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d10]">
        <p className="text-sm text-gray-400">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#080d10] px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-400">
            Failed to load movie
          </h2>

          <p className="mt-2 text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d10]">
        <p className="text-sm text-gray-500">Movie not found.</p>
      </div>
    );
  }

  return <MovieDetails movie={movie} />;
}

export default MovieDetailsPage;
