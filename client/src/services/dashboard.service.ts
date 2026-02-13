const API_URL = import.meta.env.VITE_API_URL;

export interface DashBoardStats {
  clients: number;
  vehicles: number;
  jobs: number;
  revenue: number;
}

export const getDashboardStats = async (): Promise<DashBoardStats> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Error al obtener estadísticas");

  return await response.json();
};
