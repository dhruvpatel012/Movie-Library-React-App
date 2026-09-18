import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/2 py-16 text-center">
        <p className="text-sm text-gray-500">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
