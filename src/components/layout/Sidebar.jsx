import {
  Home,
  Heart,
  Clock3,
  TrendingUp,
  Settings,
  CircleHelp,
  PlaySquare,
  X,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const menuItems = [
  { label: "Home", icon: Home, path: "/" },
  {
    label: "Favorites",
    icon: Heart,
    path: "/library?tab=favorites",
  },
  {
    label: "Watchlist",
    icon: Clock3,
    path: "/library?tab=watchlist",
  },
  {
    label: "Trending",
    icon: TrendingUp,
    path: "/",
  },
];

const secondaryItems = [
  { label: "Settings", icon: Settings },
  { label: "Support", icon: CircleHelp },
];

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("cineviaAuth");

    dispatch({
      type: "LOGOUT",
    });

    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-white/5 bg-[#0c1114] px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5c542] text-[#0c1114]">
              <PlaySquare size={18} strokeWidth={2.5} />
            </div>

            <span className="text-lg font-bold tracking-wide text-white">
              cinevia
            </span>
          </Link>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 space-y-2">
          {secondaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto hidden lg:block">
          <div className="mb-3 flex items-center gap-2 px-1 text-xs font-medium text-gray-400">
            <PlaySquare size={14} />
            Continue Watching
          </div>

          <div className="overflow-hidden rounded-xl bg-[#171d20]">
            <div className="relative h-24 overflow-hidden">
              <img
                src="https://image.tmdb.org/t/p/w500/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg"
                alt="Continue watching"
                className="h-full w-full object-cover opacity-80"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

              <span className="absolute bottom-2 left-3 text-xs text-white">
                Continue watching
              </span>
            </div>

            <div className="px-3 py-2">
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[55%] rounded-full bg-[#f5c542]" />
              </div>

              <p className="mt-1 text-[10px] text-gray-500">55% watched</p>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-white/5 pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
