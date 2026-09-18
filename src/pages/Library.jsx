import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import MovieList from "../components/movies/MovieList";

function Library() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab");

  const activeTab = tab === "watchlist" ? "watchlist" : "favorites";

  const favorites = useSelector((state) => state.library?.favorites || []);

  const watchlist = useSelector((state) => state.library?.watchlist || []);

  const movies = activeTab === "favorites" ? favorites : watchlist;

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  return (
    <div className="min-h-screen bg-[#080d10] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <h1 className="text-2xl font-semibold">My Library</h1>

        {/* Library Tabs */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => handleTabChange("favorites")}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
              activeTab === "favorites"
                ? "bg-[#f5c542] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Favorites
          </button>

          <button
            onClick={() => handleTabChange("watchlist")}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
              activeTab === "watchlist"
                ? "bg-[#f5c542] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Watchlist
          </button>
        </div>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {activeTab === "favorites" ? "Your Favorites" : "Your Watchlist"}
            </h2>

            <span className="text-xs text-gray-500">
              {movies.length} movies
            </span>
          </div>

          {movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/3 py-20 text-center">
              <p className="text-sm text-gray-500">
                {activeTab === "favorites"
                  ? "No favorite movies yet."
                  : "Your watchlist is empty."}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Library;
