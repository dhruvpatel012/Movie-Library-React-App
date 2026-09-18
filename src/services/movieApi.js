import movies from "../data/movies.json";

export const fetchPopularMovies = async () => {
  return movies;
};

export const searchMovies = async (query) => {
  const searchTerm = query.toLowerCase().trim();

  return movies.filter((movie) =>
    movie.primaryTitle.toLowerCase().includes(searchTerm)
  );
};

export const fetchMovieDetails = async (imdbId) => {
  const movie = movies.find(
    (movie) => movie.id === imdbId
  );

  if (!movie) {
    throw new Error("Movie not found");
  }

  return movie;
};