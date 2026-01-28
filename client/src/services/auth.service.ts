const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
  try {
    // 2. Petición POST
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // 3. Leemos repsuesta del servidor
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al iniciar sesión");
    }

    //5. Si va bien vendra el token
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
