import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Menu,
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state) => state.auth?.user);

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const userName = user?.name || "Cinevia User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-3 bg-[#0c1114]/90 px-4 backdrop-blur-xl sm:px-6 lg:ml-60 lg:px-8">
      <button
        onClick={onMenuClick}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <button className="hidden h-10 items-center gap-3 rounded-xl bg-white/10 px-4 text-sm text-gray-200 sm:flex">
        Movies
        <ChevronDown size={15} className="text-gray-500" />
      </button>

      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleSearch}
          placeholder="Movies, series, shows..."
          className="h-10 w-full rounded-xl border border-white/5 bg-white/[0.07] pl-11 pr-12 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/10 focus:bg-white/9"
        />

        <button
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 hover:bg-white/10 hover:text-white"
          aria-label="Filter"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      <button
        className="hidden h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white sm:flex"
        aria-label="Notifications"
      >
        <Bell size={17} />
      </button>

      <div className="flex h-10 items-center gap-2 rounded-xl bg-white/5 px-2 pr-3">
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#f5c542] text-xs font-bold text-black">
          {userInitial}
        </div>

        <div className="hidden text-left md:block">
          <p className="text-xs font-medium text-white">{userName}</p>

          <p className="text-[10px] text-[#f5c542]">Premium</p>
        </div>

        <ChevronDown size={14} className="hidden text-gray-500 md:block" />
      </div>
    </header>
  );
}

export default Navbar;
