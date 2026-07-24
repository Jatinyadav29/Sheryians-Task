import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  ShoppingCart,
  LogOut,
  ChevronsLeftRightEllipsisIcon,
} from "lucide-react";
import { MyStore } from "../Context/MyContext";

const Navbar = () => {
  let { setCurrentUser, currentUser } = useContext(MyStore);
  let navigate = useNavigate();

  let onLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="mx-auto max-w-6xl w-full flex items-center justify-between px-6 py-2.5 border border-zinc-800/80 rounded-full bg-zinc-900/50 text-white sticky top-4 z-50 backdrop-blur-md shadow-2xl">
      <NavLink to="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-md transition-transform duration-300 group-hover:scale-105">
          <ChevronsLeftRightEllipsisIcon />
        </div>
        <span className="font-semibold text-sm tracking-wide text-white select-none">
          201<span className="text-zinc-400 font-normal">Mart</span>
        </span>
      </NavLink>

      <div className="flex items-center gap-8 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition duration-200 ${
              isActive
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `transition duration-200 ${
              isActive
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `transition duration-200 ${
              isActive
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`
          }
        >
          About
        </NavLink>
      </div>

      <div className="flex items-center gap-3">
        {/* User Badge */}
        {currentUser && (
          <div className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/60 text-xs font-medium text-zinc-300">
            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center text-[10px] uppercase font-bold">
              {currentUser?.name?.[0] || "U"}
            </div>
            <span className="max-w-25 truncate">
              {currentUser?.name || "User"}
            </span>
          </div>
        )}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `p-2.5 rounded-full border transition-all duration-200 flex items-center justify-center ${
              isActive
                ? "bg-white text-black border-white"
                : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700"
            }`
          }
          title="Cart"
        >
          <ShoppingCart className="w-4 h-4" />
        </NavLink>

        <button
          onClick={onLogout}
          className="p-2.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-red-400 hover:border-red-950/60 hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
