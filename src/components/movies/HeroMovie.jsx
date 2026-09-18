import { Heart, Play } from "lucide-react";

function HeroMovie({ movie }) {
  if (!movie) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/5">
      {/* Movie backdrop */}
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlays keep the movie information readable */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 bg-linear-to-r from-[#080d10] via-[#080d10]/45 to-transparent" />

      <div className="absolute inset-0 bg-linear-to-t from-[#080d10]/80 via-transparent to-black/10" />

      {/* Movie information */}
      <div className="relative flex min-h-97.5 items-end p-6 sm:min-h-110 sm:p-8 lg:min-h-117.5 lg:p-10">
        <div className="max-w-xl">
          {/* Movie metadata */}
          <div className="mb-5 flex flex-wrap gap-2">
            {movie.genre && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                {movie.genre}
              </span>
            )}

            {movie.year && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                {movie.year}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {movie.title}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-lg text-[#f5c542]">★</span>

            <span className="text-sm font-semibold text-white">
              {movie.rating}
            </span>

            <span className="text-sm text-gray-400">Rating</span>
          </div>

          {/* Description */}
          <p className="mt-4 max-w-lg text-sm leading-6 text-gray-300">
            {movie.description}
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-[#f5c542] px-5 py-3 text-sm font-semibold text-[#101416] transition hover:bg-[#ffd45c]">
              <Play size={16} fill="currentColor" />
              Watch Trailer
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/10">
              <Heart size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroMovie;
