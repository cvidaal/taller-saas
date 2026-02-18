import { notify } from "../utils/notify";

const API_URL = import.meta.env.VITE_API_URL;

export interface UpdateVehicleData {
  brand?: string;
  model?: string;
  year?: number;
  licensePlate?: string;
}

export interface Vehicle {
  id: string;
  clientId: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
}

export interface CreateVehicleDto {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  clientId: string;
}

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

export const createVehicle = async (vehicleData: CreateVehicleDto) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`${API_URL}/vehicles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error creando el vehículo");
    }

    return data;
  } catch (error) {
    console.error("Error en createVehicle", error);
    throw error;
  }
};

export const deleteVehicle = async (id: string | number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`${API_URL}/vehicles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar vehículo");
    }

    notify.success("Vehículo eliminado correctamente");
  } catch (error) {
    notify.error("Error al eliminar vehículo. Revisa la conexión");
    console.error("Error en DeleteVehicle", error);
    throw error;
  }
};

export const updateVehicle = async (id: string, data: UpdateVehicleData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`${API_URL}/vehicles/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al actualizar el vehículo");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en UpdateVehicle", error);
    throw error;
  }
};
