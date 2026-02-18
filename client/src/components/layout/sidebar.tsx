import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/getInitials";
import { SearchBar } from "../SearchBar";

export const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `block px-4 py-2.5 rounded transition-colors flex items-center gap-2 ${
      isActive
        ? "bg-blue-600 text-white font-medium"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
        FixFlow 🔧
      </div>

      {/* Buscador */}
      <div className="px-3 py-3"></div>
      <SearchBar />
      <hr className="my-4 border-gray-700" />

      {/* 2. Navegación */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <Link to="/dashboard" className={getLinkClass("/dashboard")}>
          📊 <span>Panel Principal</span>
        </Link>

        <Link to="/vehicles" className={getLinkClass("/vehicles")}>
          🏎️ <span>Vehículos</span>
        </Link>

        <Link to="/clients" className={getLinkClass("/clients")}>
          👥 <span>Clientes</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-700">
        {user && (
          <div className="p-4 border-t border-slate-800 bg-slate-900">
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar */}
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold shadow-lg ring-2 ring-slate-800">
                {getInitials(user.name)}
              </div>

              {/* Info Texto */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-400 truncate capitalize">
                  {user.role == "MECHANIC" ? "Mecánico" : "Administrador"}
                </p>
              </div>
            </div>

            {/* Botón Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
