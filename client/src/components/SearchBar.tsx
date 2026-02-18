import { useEffect, useState } from "react";
import { search, type SearchResult } from "../services/search.service";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notify";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await search(searchTerm.trim());
        setResults(data);
        notify.success("Resultados encontrados");
      } catch (error) {
        notify.error("Error al buscar");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer); // Limpiar timeout cuando el componente se desmonta
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        className="mx-auto w-[90%] px-3 py-2 text-sm rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 block"
        value={searchTerm} // Aquí se muestra el valor del estado en el input
        onChange={(e) => setSearchTerm(e.target.value)} // Aquí se actualiza el estado con el valor del input
      />
      {loading && <p className="text-sm text-gray-400 px-1">Buscando...</p>}
      {results && (
        <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 p-2">
          {/* Clientes */}
          {(results.clients ?? []).length > 0 && (
            <div className="mb-2">
              <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Clientes
              </p>
              <ul className="space-y-0.5">
                {(results.clients ?? []).map((client) => (
                  <li key={client.id}>
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/clients");
                        setResults(null);
                        setSearchTerm("");
                      }}
                      className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-700 text-white"
                    >
                      {client.firstName} {client.lastName}
                      {client.email && (
                        <span className="text-gray-400 text-xs block">
                          {client.email}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Vehículos */}
          {(results.vehicles ?? []).length > 0 && (
            <div className="mb-2">
              <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Vehículos
              </p>
              <ul className="space-y-0.5">
                {(results.vehicles ?? []).map((vehicle) => (
                  <li key={vehicle.id}>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/vehicles/${vehicle.id}`);
                        setResults(null);
                        setSearchTerm("");
                      }}
                      className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-700 text-white"
                    >
                      {vehicle.brand} {vehicle.model} — {vehicle.licensePlate}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Reparaciones (jobs) */}
          {(results.jobs ?? []).length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Reparaciones
              </p>
              <ul className="space-y-0.5">
                {(results.jobs ?? []).map((job) => (
                  <li key={job.id}>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/vehicles/${job.vehicleId}`);
                        setResults(null);
                        setSearchTerm("");
                      }}
                      className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-700 text-white"
                    >
                      {job.description}
                      <span className="text-gray-400 text-xs block">
                        Ver vehículo
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(results.clients ?? []).length === 0 &&
            (results.vehicles ?? []).length === 0 &&
            (results.jobs ?? []).length === 0 && (
              <p className="text-sm text-gray-400 py-2">Sin resultados</p>
            )}
        </div>
      )}
    </div>
  );
};
