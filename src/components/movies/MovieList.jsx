import { useState } from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  const [activeMovieId, setActiveMovieId] = useState(null);

  if (!movies || movies.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/2 py-16 text-center">
        <p className="text-sm text-gray-500">No movies found.</p>
      </div>
    );
  }

  const handleCardTap = (movieId) => {
    setActiveMovieId((currentId) => (currentId === movieId ? null : movieId));
  };

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isTouchVisible={activeMovieId === movie.id}
          onCardTap={() => handleCardTap(movie.id)}
        />
      ))}
    </div>
  );
}

export default MovieList;
