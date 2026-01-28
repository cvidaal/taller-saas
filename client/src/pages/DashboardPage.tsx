import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // UseEffect hace esa tarea extra, solo se ejecuta al cargar la página y detecta si hay token válido.
  useEffect(() => {
    const checkAuth = async () => {
      //Busco el token en el local storage
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Envio token para que lo revise.
          },
        });

        if (!response.ok) {
          throw new Error("Token inválido");
        }

        const data = await response.json();
        setUser(data); // bien guardamoslos datos
      } catch (error) {
        console.error("Seguridad: Token falso detectado", error);
        handleLogout();
      }
    };

    checkAuth();
  }, []); // [] el array vacío es ejecuta solo al cargar la página.

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Panel de Control</h1>

        {/* Dentro de un botón se usa onClick */}
        <button
          className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus-outline-none"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
