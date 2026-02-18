import type React from "react";
import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { notify } from "../utils/notify";

export const LoginPage = () => {
  // Memoría para nuestros campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { login: loginContext } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(email, password);
      loginContext(data.user, data.token);
      notify.success(`¡Bienvenido, ${data.user.name}!`);
      navigate("/dashboard");
    } catch (error) {
      setError("Credenciales incorrectas");
      notify.error("Error al iniciar sesión");
      console.error(error);
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover shadow-md"
      style={{ backgroundImage: "url('/images/bgtaller.jpg')" }}
    >
      {/* Tarjeta del login */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          FixFlow 🔧
        </h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">
              {error}
            </div>
          )}

          {/* Input email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="admin@google.com"
              value={email} // El valor lo dicta el estado
              onChange={(e) => setEmail(e.target.value)} // Al escribir actualizamos el estado
            />
          </div>

          {/* Input password */}
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus-outline-none"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
