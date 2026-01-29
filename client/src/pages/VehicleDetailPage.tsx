import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById } from "../services/vehicle.service";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface Job {
  id: string;
  description: string;
  status: string;
  cost: string;
  createdAt: string;
}

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

  // Por ejemplo: este useEffect se usa cada vez que el id se refresca o es nuevo.
  useEffect(() => {
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
    loadVehicle(); // Hay que llamar la función en el useEffect
  }, [id]);

  if (loading) {
    return <div className="p-4">Cargando vehículo...</div>;
  }
  if (!vehicle) return <div>No se encontró el vehículo</div>;
  return (
    <div>
      <button
        onClick={() => navigate("/vehicles")}
        className="p-2  bg-blue-500 hover:bg-blue-700 font-medium mb-4 text-white  flex items-center gap-2 rounded"
      >
        ⏪ Volver
      </button>
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
                  <div className="font-bold text-gray-800">
                    {job.description}
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-mono bg-white px-2 rounded border">
                      {job.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
