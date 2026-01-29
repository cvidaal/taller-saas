import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
        Taller Manager 🔧
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="block px-4 py-2.5 hover:bg-gray-800 rounded transition-colors"
        >
          📊 Panel Principal
        </Link>
        {/* Vehicles */}
        <Link
          to="/vehicles"
          className="block px-4 py-2.5 hover:bg-gray-800 rounded transition-colors"
        >
          🏎️ Vehículos
        </Link>
        <Link
          to="/clients"
          className="block px-4 py-2.5 hover:bg-gray-800 rounded transition-colors"
        >
          👥 Clientes
        </Link>
        {/* Clientes */}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};
