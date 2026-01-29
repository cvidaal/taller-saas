const API_URL = import.meta.env.VITE_API_URL;

export const getVehicles = async () => {
  // Recuperamos token
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    // Petición get
    const response = await fetch(`${API_URL}/vehicles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Enviamos el token para que nos deje pasar.
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener vehículos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getVehicles", error);
    throw error;
  }
};

export const getVehicleById = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`${API_URL}/vehicles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener vehículo por id");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getVehicleById", error);
    throw error;
  }
};
