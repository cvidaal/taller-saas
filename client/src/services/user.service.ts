const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const getUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error obteniendo usuarios");
  }

  return (await response.json()) as User[];
};
