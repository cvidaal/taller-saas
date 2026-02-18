import type { Client } from "./client.service";
import type { Job } from "./job.service";
import type { Vehicle } from "./vehicle.service";

const API_URL = import.meta.env.VITE_API_URL;

export interface SearchResult {
  clients: Client[];
  vehicles: Vehicle[];
  jobs: Job[];
}

export const search = async (query: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await fetch(
      `${API_URL}/search?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      const message = (data as { error?: string }).error ?? "Error buscando";
      console.error("Search API error:", response.status, data);
      throw new Error(message);
    }

    return data as SearchResult;
  } catch (error) {
    console.error("Error en search", error);
    throw error;
  }
};
