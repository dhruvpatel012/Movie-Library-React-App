const genres = [
  "Trending",
  "Adventure",
  "Action",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
];

function GenreFilter({ activeGenre, onGenreChange }) {
  return (
    <div className="mt-5 overflow-x-auto pb-1">
      <div className="flex min-w-max gap-2">
        {genres.map((genre) => {
          const isActive = activeGenre === genre;

          return (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                isActive
                  ? "bg-white text-[#101416]"
                  : "bg-white/[0.07] text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GenreFilter;