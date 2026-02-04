const API_URL = import.meta.env.VITE_API_URL;

export interface createJobDTO {
  vehicleId: string;
  assignedMechanicId: string;
  description: string;
  cost: number;
}

export interface Job {
  id: string;
  description: string;
  status: string;
  cost: number;
  createdAt: string;
  closedAt?: string;
}

export const createJob = async (jobData: createJobDTO) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error("Error creando la reparación");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en createJob", error);
    throw error;
  }
};

export const updateJobStatus = async (jobId: string, newStatus: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Error actualizando el estado");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en updateJobStatus", error);
    throw error;
  }
};
