import { useEffect, useState } from "react";
import { createJob, updateJob, type Job } from "../services/job.service";
import { getUsers, type User } from "../services/user.service";
import { notify } from "../utils/notify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated?: () => void;
  vehicleId: string;
  jobToEdit?: Job | null;
}

export const CreateJobModal = ({
  isOpen,
  onClose,
  onJobCreated,
  vehicleId,
  jobToEdit,
}: Props) => {
  // 2. Estado para el formulario
  const [formData, setFormData] = useState({
    description: "",
    cost: 0,
    assignedMechanicId: "",
  });

  const [mechanics, setMechanics] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getUsers().then((data) => setMechanics(data));
    }

    if (jobToEdit) {
      setFormData({
        description: jobToEdit.description,
        cost: jobToEdit.cost,
        assignedMechanicId: jobToEdit.assignedMechanicId,
      });
    } else {
      setFormData({
        description: "",
        cost: 0,
        assignedMechanicId: "",
      });
    }
  }, [isOpen, jobToEdit]);

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

    if (!formData.assignedMechanicId) {
      notify.error("Debes asignar un mecánico");
      setLoading(false);
      return;
    }

    try {
      const dataToSend = {
        description: formData.description,
        cost: Number(formData.cost),
        assignedMechanicId: formData.assignedMechanicId,
      };

      const savePromise = jobToEdit
        ? updateJob(jobToEdit.id, dataToSend)
        : createJob({ ...dataToSend, vehicleId });

      await notify.promise(savePromise, {
        loading: "Guardando reparación...",
        success: "Reparación guardada! 🔧",
        error: "Error al guardar al datos",
      });

      if (onJobCreated) onJobCreated();
      onClose();

      // Limpio formulario
      setFormData({
        description: "",
        cost: 0,
        assignedMechanicId: "",
      });
    } catch (error) {
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
            {jobToEdit ? "Editar reparación" : "Nueva reparación"}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mecánico
              </label>
              <select
                name="assignedMechanicId"
                value={formData.assignedMechanicId}
                onChange={handleChange}
                required
                className="w-full border rounded p-2 bg-white"
              >
                <option value="">-- Seleccionar un mecánico</option>
                {mechanics.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                descripción
              </label>
              <input
                type="text"
                name="description"
                required
                className="w-full border rounded p-2"
                placeholder="Ej: Cambio de acite"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coste
              </label>
              <input
                type="number"
                name="cost"
                required
                className="w-full border rounded p-2"
                placeholder="Ej: 30"
                value={formData.cost}
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
