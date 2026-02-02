const API_URL = import.meta.env.VITE_API_URL;

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

export const getClients = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`${API_URL}/clients`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Error al cargar clientes");
      return [];
    }

    const data = await response.json();
    return data as Client[];
  } catch (error) {
    console.error("Error en getClients", error);
    throw error;
  }
};
