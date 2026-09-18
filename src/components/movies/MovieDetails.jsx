import { ArrowLeft, Heart, Play, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function MovieDetails({ movie }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.library.favorites);

  const watchlist = useSelector((state) => state.library.watchlist);

  const isFavorite = favorites.some((item) => item.id === movie.id);

  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  const title = movie.primaryTitle || movie.title || "Untitled";

  // Use the local poster stored inside public/posters.
  const poster = `/posters/${movie.id}.jpg`;

  // Use the same local poster for the backdrop.
  const backdrop = poster;

  const genres = movie.genres || [];

  const languages = movie.spokenLanguages || [];

  const year = movie.startYear || movie.releaseDate?.slice(0, 4);

  const rating = movie.averageRating;

  const runtime = movie.runtimeMinutes ? `${movie.runtimeMinutes} min` : null;

  const description = movie.description || "No description available.";

  const cast = movie.cast || [];

  const directors = movie.directors || [];

  const writers = movie.writers || [];

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

  const handleWatchlist = () => {
    if (isInWatchlist) {
      dispatch({
        type: "REMOVE_WATCHLIST",
        payload: movie.id,
      });
    } else {
      dispatch({
        type: "ADD_WATCHLIST",
        payload: movie,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#080d10] text-white">
      {/* Hero */}
      <section className="relative min-h-130 overflow-hidden">
        {backdrop && (
          <img
            src={backdrop}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-r from-[#080d10] via-[#080d10]/85 to-[#080d10]/40" />

        <div className="absolute inset-0 bg-linear-to-t from-[#080d10] via-transparent to-[#080d10]/40" />

        <div className="relative mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="grid items-end gap-8 md:grid-cols-[220px_1fr]">
            {/* Poster */}
            <div className="hidden overflow-hidden rounded-2xl bg-[#171d20] shadow-2xl md:block">
              {poster ? (
                <img
                  src={poster}
                  alt={title}
                  className="aspect-2/3 w-full object-cover"
                />
              ) : (
                <div className="flex aspect-2/3 items-center justify-center p-4 text-center text-sm text-gray-500">
                  No poster available
                </div>
              )}
            </div>

            {/* Movie Information */}
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                {year && <span>{year}</span>}

                {runtime && (
                  <>
                    <span>•</span>
                    <span>{runtime}</span>
                  </>
                )}

                {rating && (
                  <>
                    <span>•</span>

                    <span className="flex items-center gap-1 text-[#f5c542]">
                      ★ {rating}
                    </span>
                  </>
                )}

                {movie.contentRating && (
                  <>
                    <span>•</span>
                    <span>{movie.contentRating}</span>
                  </>
                )}
              </div>

              <p className="mt-6 max-w-3xl text-sm leading-7 text-gray-300 sm:text-base">
                {description}
              </p>

              {/* Actions */}
              <div className="mt-7 flex flex-wrap gap-3">
                {movie.trailer && (
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#f5c542] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110"
                  >
                    <Play size={16} fill="currentColor" />
                    Watch Trailer
                  </a>
                )}

                <button
                  onClick={handleWatchlist}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${
                    isInWatchlist
                      ? "bg-[#f5c542] text-black"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  <Plus size={17} />
                  {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>

                <button
                  onClick={handleFavorite}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                    isFavorite
                      ? "bg-[#f5c542] text-black"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                  aria-label={
                    isFavorite
                      ? `Remove ${title} from favorites`
                      : `Add ${title} to favorites`
                  }
                >
                  <Heart
                    size={18}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            <h2 className="text-xl font-semibold">Overview</h2>

            <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-400">
              {description}
            </p>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-semibold">Cast</h2>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {cast.slice(0, 8).map((person, index) => {
                    const personName =
                      typeof person === "string"
                        ? person
                        : person.name || person.primaryName || "Unknown";

                    const personImage =
                      typeof person === "object"
                        ? person.primaryImage || person.image
                        : null;

                    return (
                      <div
                        key={person.id || `${personName}-${index}`}
                        className="overflow-hidden rounded-xl bg-white/4"
                      >
                        {personImage ? (
                          <img
                            src={personImage}
                            alt={personName}
                            className="aspect-square w-full object-cover"
                          />
                        ) : (
                          <div className="flex aspect-square items-center justify-center bg-[#171d20] text-xs text-gray-500">
                            No image
                          </div>
                        )}

                        <p className="truncate px-3 py-3 text-sm text-gray-300">
                          {personName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Movie Information */}
          <aside className="h-fit rounded-2xl border border-white/5 bg-white/3 p-5">
            <h2 className="text-base font-semibold">Movie Information</h2>

            <div className="mt-5 space-y-5 text-sm">
              {movie.releaseDate && (
                <div>
                  <p className="text-xs text-gray-500">Release Date</p>

                  <p className="mt-1 text-gray-300">{movie.releaseDate}</p>
                </div>
              )}

              {runtime && (
                <div>
                  <p className="text-xs text-gray-500">Runtime</p>

                  <p className="mt-1 text-gray-300">{runtime}</p>
                </div>
              )}

              {languages.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500">Languages</p>

                  <p className="mt-1 text-gray-300">{languages.join(", ")}</p>
                </div>
              )}

              {directors.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500">Directors</p>

                  <p className="mt-1 text-gray-300">
                    {directors
                      .map((director) =>
                        typeof director === "string"
                          ? director
                          : director.name || director.primaryName,
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              )}

              {writers.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500">Writers</p>

                  <p className="mt-1 text-gray-300">
                    {writers
                      .map((writer) =>
                        typeof writer === "string"
                          ? writer
                          : writer.name || writer.primaryName,
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              )}

              {movie.averageRating && (
                <div>
                  <p className="text-xs text-gray-500">IMDb Rating</p>

                  <p className="mt-1 text-[#f5c542]">★ {movie.averageRating}</p>
                </div>
              )}

              {movie.metascore && (
                <div>
                  <p className="text-xs text-gray-500">Metascore</p>

                  <p className="mt-1 text-gray-300">{movie.metascore}</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;
