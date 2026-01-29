import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeCard } from "../components/resumeCard";

const API_URL = import.meta.env.VITE_API_URL;

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

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
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkAuth();
  }, []); // [] el array vacío es ejecuta solo al cargar la página.

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Panel de Control</h1>
        <div className="flex flex-row">
          <ResumeCard title="Clientes" value={124} />
          <ResumeCard title="Vehículos" value={15} />
          <ResumeCard title="Reparaciones" value={3} />
        </div>
      </div>
    </div>
  );
};
