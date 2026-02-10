import { useEffect, useState } from "react";
import { deleteVehicle, getVehicles } from "../services/vehicle.service";
import { Link } from "react-router-dom";
import { CreateVehicleModal } from "../components/createVehicleModal";
import type { Client } from "../services/client.service";

interface Job {
  id: string;
  status: string; // 'PENDING', 'IN_PROGRESS, 'COMPLETED'
  description?: string;
}

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  jobs?: Job[];
  status: "En Taller" | "Terminado" | "Esperando Piezas";
  clientId: string;
  client?: Client;
}

const getVehicleStatus = (jobs?: Job[]) => {
  if (!jobs || jobs.length === 0) {
    return { label: "Disponible", color: "bg-green-100 text-green-800" };
  }

  //2. Buscamos si hay trabajos activos
  const activeJob = jobs.find((job) => job.status !== "COMPLETED");

  if (activeJob) {
    return { label: "En taller", color: "bg-yellow-100 text-yellow-800" };
  }

  return { label: "Listo para entregar", color: "bg-blue-100 text-blue-800" };
};

export const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);

  // Filtramos la lista original de vehículos.
  const filteredVehicles = vehicles.filter((vehicle) => {
    const term = searchTerm.toLowerCase();

    // Buscamos coincidencia
    const matchesPlate = vehicle.licensePlate.toLowerCase().includes(term);
    const matchesBrand = vehicle.brand.toLowerCase().includes(term);
    const matchesModel = vehicle.model.toLowerCase().includes(term);

    return matchesPlate || matchesBrand || matchesModel;
  });

  const openNewModal = () => {
    setVehicleToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle: Vehicle) => {
    setVehicleToEdit(vehicle);
    setIsModalOpen(true);
  };

  // UseEffect para ejecutar la carga de coches solo cuando se monte el componente.
  const loadVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Error cargando vehículos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este coche?")) {
      return;
    }

    try {
      await deleteVehicle(id);
      loadVehicles();
    } catch (error) {
      alert("Error al eliminar el vehículo");
      console.error(error);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [vehicles]);

  if (loading) {
    return <div className="p-4">Cargando vehículos...</div>;
  }
  return (
    <div>
      {/* Cabecera titulo y botón */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vehículos</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={openNewModal}
        >
          + Nuevo Vehículo
        </button>
      </div>

      {/* Buscador */}
      <div>
        <input
          type="text"
          placeholder="🔎 Buscar por matrícula, marca o modelo..."
          className="mb-3 w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          {/* Cabecera */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matrícula
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          {/* Cuerpo de la tabla */}
          <tbody className="divide-y divide-gray-200">
            {filteredVehicles.map((car) => {
              const statusInfo = getVehicleStatus(car.jobs);

              return (
                <tr key={car.id}>
                  {/* Brand y model */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {car.brand}
                    </div>
                    <div className="text-sm text-gray-500">{car.model}</div>
                  </td>
                  {/* licensePlate */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      to={`/vehicles/${car.id}`}
                      className="
                    text-blue-600 hover:text-blue-900 hover:underline font-medium"
                    >
                      {car.licensePlate}
                    </Link>
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* TODO: HACERLO DINAMICO */}
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold">
                      {statusInfo.label}
                    </span>
                  </td>
                  {/* Acciones */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justfiy-center gap-4">
                      <button
                        onClick={() => openEditModal(car)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(car.id)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <CreateVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVehicleCreated={loadVehicles}
        vehicleToEdit={vehicleToEdit}
      />
    </div>
  );
};
