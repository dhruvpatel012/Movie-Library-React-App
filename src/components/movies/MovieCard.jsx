import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.library.favorites);

  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  // Use the local poster stored inside public/posters.
  const poster = `/posters/${movie.id}.jpg`;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: "REMOVE_FAVORITE",
        payload: movie.id,
      });
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        payload: movie,
      });
    }
  };

  return (
    <article className="group min-w-0">
      <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-[#171d20]">
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center">
            <span className="text-sm text-gray-500">No poster available</span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <button
          onClick={handleFavorite}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition ${
            isFavorite
              ? "bg-[#f5c542] text-black"
              : "bg-black/50 text-white opacity-0 group-hover:opacity-100"
          }`}
          aria-label={
            isFavorite
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
        >
          <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <Link
          to={`/movie/${movie.id}`}
          className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black opacity-0 transition group-hover:opacity-100"
        >
          View Details
        </Link>
      </div>

      <div className="mt-3">
        <h3 className="truncate text-sm font-medium text-white">
          {movie.title}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          {movie.year && <span>{movie.year}</span>}

          {movie.year && movie.rating && <span>•</span>}

          {movie.rating && (
            <span className="flex items-center gap-1 text-[#f5c542]">
              ★ {movie.rating}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
