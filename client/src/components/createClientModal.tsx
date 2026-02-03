import { useState } from "react";
import { createClient } from "../services/client.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onClientCreated?: () => void;
}

export const CreateClientModal = ({
  isOpen,
  onClose,
  onClientCreated,
}: Props) => {
  // 2. Estado para el formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // 4. Manejador genérico de inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 5. Enviar al servidor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createClient(formData);

      alert("Cliente creado con éxito!");
      if (onClientCreated) onClientCreated();
      onClose();

      // Limpio formulario
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      alert("Error al crear el vehículo. Revisa los datos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    // Fondo oscuro (overlay)
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Caja blanca del modal */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        // Clave e.stopPropagation para que se cierre el formulario en el fondo negro
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Nuevo Cliente</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full border rounded p-2"
                placeholder="Ej: Carlos"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos
              </label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full border rounded p-2"
                placeholder="Ej: Sánchez"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full border rounded p-2"
                placeholder="608439421"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border rounded p-2"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar Vehículo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
