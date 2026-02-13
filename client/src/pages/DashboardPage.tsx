import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeCard } from "../components/resumeCard";
import type { User } from "../services/user.service";
import { notify } from "../utils/notify";
import {
  getDashboardStats,
  type DashBoardStats,
} from "../services/dashboard.service";
import { Banknote, Car, Users, Wrench } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashBoardStats | null>(null);

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

  const getStats = async () => {
    try {
      setLoading(true);
      const stats = await getDashboardStats();
      setStats(stats);
      setLoading(false);
    } catch (error) {
      notify.error("Error al cargar el panel");
      console.error(error);
      setLoading(false);
    }
  };

  const formatmoney = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  // UseEffect hace esa tarea extra, solo se ejecuta al cargar la página y detecta si hay token válido.
  useEffect(() => {
    checkAuth();
    getStats();
  }, []); // [] el array vacío es ejecuta solo al cargar la página.

  return (
    <div className="p-8 min-h-screen">
      {" "}
      {/* Fondo gris suave para que resalten las tarjetas blancas */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-gray-500 mt-1">
          Resumen de la actividad de tu taller
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResumeCard
          title="Clientes"
          value={loading ? "..." : stats?.clients || 0}
          icon={<Users size={24} />}
          colorClass="bg-blue-100 text-blue-600"
          trend="+2 nuevos"
        />
        <ResumeCard
          title="Vehículos"
          value={loading ? "..." : stats?.vehicles || 0}
          icon={<Car size={24} />}
          colorClass="bg-indigo-100 text-indigo-600"
        />
        <ResumeCard
          title="Reparaciones"
          value={loading ? "..." : stats?.jobs || 0}
          icon={<Wrench size={24} />}
          colorClass="bg-orange-100 text-orange-600"
        />
        <ResumeCard
          title="Facturación Total"
          value={loading ? "..." : formatmoney(stats?.revenue || 0)}
          icon={<Banknote size={24} />}
          colorClass="bg-green-100 text-green-600"
        />
      </div>
    </div>
  );
};
