import { notify } from "../utils/notify";

const API_URL = import.meta.env.VITE_API_URL;

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface ClientCreateDTO {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
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

export const createClient = async (clientData: ClientCreateDTO) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`${API_URL}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(clientData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error creando el vehículo");
    }

    return data;
  } catch (error) {
    console.error("Error en getClients", error);
    throw error;
  }
};

export const deleteClient = async (id: string | number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar vehículo");
    }

    notify.success("Cliente eliminado correctamente");
  } catch (error) {
    console.error("Error en DeleteClient", error);
    throw error;
  }
};

// Omit<Client, "id"> Sirve para omitir el id
export const updateClient = async (id: string, data: Omit<Client, "id">) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token disponible");
  }

  try {
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al actualizar el cliente");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en UpdateClient", error);
    throw error;
  }
};
