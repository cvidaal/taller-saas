import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById } from "../services/vehicle.service";
import { CreateJobModal } from "../components/createJobModal";
import { deleteJob, updateJob, type Job } from "../services/job.service";
import { notify } from "../utils/notify";
import type { Client } from "../services/client.service";

interface VehicleDetail {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  client: Client;
  jobs: Job[];
}

export const VehicleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

  const openNewModal = () => {
    setJobToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setJobToEdit(job);
    setIsModalOpen(true);
  };

  const loadVehicle = async () => {
    try {
      if (!id) return;

      const data = await getVehicleById(id!);
      setVehicle(data);
    } catch (error) {
      console.error("Error cargando vehículos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este cliente?")) {
      return;
    }

    try {
      const deletePromise = deleteJob(id);

      await notify.promise(deletePromise, {
        loading: "Borrando...",
        success: "Eliminado correctamente",
        error: "Error al borrar",
      });
      loadVehicle();
    } catch (error) {
      notify.error("Error al eliminar al cliente");
      console.error(error);
    }
  };

  // Función para manejar el clic
  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      await updateJob(jobId, { status: newStatus });
      await loadVehicle();
    } catch (error) {
      alert("No se pudo cambiar el estado, Revisa la consola");
      console.error(error);
    }
  };

  // Por ejemplo: este useEffect se usa cada vez que el id se refresca o es nuevo.
  useEffect(() => {
    loadVehicle(); // Hay que llamar la función en el useEffect
  }, [id]);

  if (loading) {
    return <div className="p-4">Cargando vehículo...</div>;
  }
  if (!vehicle) return <div>No se encontró el vehículo</div>;
  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/vehicles")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          ⏪ Volver
        </button>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={openNewModal}
        >
          + Nueva Reparación
        </button>
      </div>

      {/*Marca, modelo, matrícula */}
      <h1 className="text-3xl font-bold mb-6">
        {vehicle.brand} {vehicle.model} ({vehicle.licensePlate})
      </h1>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta cliente */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Propietario</h2>
          <p className="text-lg font-medium">
            {vehicle.client.firstName} {vehicle.client.lastName}
          </p>
          <p className="text-gray-500">📞 {vehicle.client.phone}</p>
          <p className="text-gray-500">✉️ {vehicle.client.email}</p>
        </div>
        {/* Tarjeta Vehículo */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            Historial de Reparaciones
          </h2>

          {vehicle.jobs.length === 0 ? (
            <p className="text-gray-400">
              Este coche no tiene reparaciones todavía
            </p>
          ) : (
            <ul className="space-y-3">
              {vehicle.jobs.map((job) => (
                <li
                  key={job.id}
                  className="border-l-4 border-blue-500 pl-3 bg-gray-50 p-2 rounded"
                >
                  {/* Info del trabajo */}
                  <div>
                    <div className="font-bold text-gray-800">
                      {job.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(job.createdAt).toLocaleString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -<span className="font-mono ml-1">{job.cost}€</span>
                    </div>
                  </div>

                  {/* Derecha: Botonera inteligente */}
                  <div className="flex gap-2">
                    {job.status === "PENDING" && (
                      <button
                        onClick={() =>
                          handleStatusChange(job.id, "IN_PROGRESS")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-3 rounded shadow transition-colors"
                      >
                        ▶️ Empezar
                      </button>
                    )}

                    {job.status === "IN_PROGRESS" && (
                      <button
                        onClick={() => handleStatusChange(job.id, "COMPLETED")}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded shadow transition-colors"
                      >
                        ✅ Finalizar
                      </button>
                    )}

                    {job.status === "COMPLETED" && (
                      <div className="flex gap-2 mt-1">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">
                          Completado el{" "}
                          {job.closedAt
                            ? new Date(job.closedAt).toLocaleString("es-ES", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                        <button
                          onClick={() =>
                            handleStatusChange(job.id, "IN_PROGRESS")
                          }
                          className="bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold py-1 px-3 rounded shadow transition-colors"
                        >
                          🔧 Reabrir
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row items-center gap-3 mt-2 text-sm md:text-base">
                    <button
                      className="flex items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors duration-200 font-medium focus:outline-none"
                      title="Editar reparación"
                      onClick={() => openEditModal(job)}
                    >
                      {/* Icono de lápiz (SVG) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                      </svg>
                      Editar
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      className="flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors duration-200 font-medium focus:outline-none"
                      onClick={() => handleDelete(job.id)}
                      title="Borrar reparación"
                    >
                      {/* Icono de papelera (SVG) */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Borrar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {id && (
        <CreateJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          vehicleId={id}
          onJobCreated={loadVehicle}
          jobToEdit={jobToEdit}
        />
      )}
    </div>
  );
};
