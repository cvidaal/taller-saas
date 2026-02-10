import { useEffect, useState } from "react";
import { getClients, type Client } from "../services/client.service";
import {
  createVehicle,
  updateVehicle,
  type CreateVehicleDto,
} from "../services/vehicle.service";
import { notify } from "../utils/notify";

export interface Vehicle extends CreateVehicleDto {
  id: string;
  // client?: Client
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onVehicleCreated?: () => void;
  vehicleToEdit?: Vehicle | null;
}

export const CreateVehicleModal = ({
  isOpen,
  onClose,
  onVehicleCreated,
  vehicleToEdit,
}: Props) => {
  // 1. Estado para la lista de clientes.
  const [clients, setClients] = useState<Client[]>([]);

  // 2. Estado para el formulario
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    licensePlate: "",
    clientId: "",
  });

  const [loading, setLoading] = useState(false);

  // Cargar clientes cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      getClients().then((data) => setClients(data));
    }

    if (vehicleToEdit) {
      setFormData({
        brand: vehicleToEdit.brand,
        model: vehicleToEdit.model,
        licensePlate: vehicleToEdit.licensePlate,
        year: vehicleToEdit.year,
        clientId: vehicleToEdit.clientId,
      });
    } else {
      setFormData({
        brand: "",
        model: "",
        licensePlate: "",
        year: 0,
        clientId: "",
      });
    }
  }, [isOpen, vehicleToEdit]);

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
      const dataToSend = {
        ...formData,
        year: Number(formData.year),
      };

      const savePromise = vehicleToEdit
        ? updateVehicle(vehicleToEdit.id, dataToSend)
        : createVehicle(formData);

      await notify.promise(savePromise, {
        loading: "Guardando vehículo...",
        success: "¡Vehículo guardado correctamente! 🎉",
        error: "Error al guardar. Revisa los datos.",
      });

      if (onVehicleCreated) onVehicleCreated();
      onClose();

      // Limpio formulario
      setFormData({
        brand: "",
        model: "",
        year: 2024,
        licensePlate: "",
        clientId: "",
      });
    } catch (error) {
      notify.error("Error al crear el vehículo. Revisa los datos");
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
          <h3 className="text-lg font-semibold text-gray-900">
            {vehicleToEdit ? "Editar Vehículo" : "Nuevo Vehículo"}
          </h3>
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
          {/* Sector de cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dueño (Cliente)
            </label>
            <select
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 bg-white"
            >
              <option value="">-- Seleccionar un cliente --</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <input
                type="text"
                name="brand"
                required
                className="w-full border rounded p-2"
                placeholder="Ej: Toyota"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modelo
              </label>
              <input
                type="text"
                name="model"
                required
                className="w-full border rounded p-2"
                placeholder="Ej: Corolla"
                value={formData.model}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matrícula
              </label>
              <input
                type="text"
                name="licensePlate"
                required
                className="w-full border rounded p-2"
                placeholder="1234-BBB"
                value={formData.licensePlate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Año
              </label>
              <input
                type="number"
                name="year"
                required
                className="w-full border rounded p-2"
                value={formData.year}
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
              {loading
                ? "Guardando..."
                : vehicleToEdit
                  ? "Actualizar Vehículo"
                  : "Guardar Vehículo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
