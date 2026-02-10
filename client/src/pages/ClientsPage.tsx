import { useEffect, useState } from "react";
import {
  deleteClient,
  getClients,
  type Client,
} from "../services/client.service";
import { CreateClientModal } from "../components/createClientModal";
import { notify } from "../utils/notify";

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error("Error cargando clients", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (client: Client) => {
    setClientToEdit(client);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("¿Estás seguro de que quieres borrar este cliente?")) {
      return;
    }

    try {
      await deleteClient(id);
      loadClients();
    } catch (error) {
      notify.error("Error al eliminar al cliente");
      console.error(error);
    }
  };

  useEffect(() => {
    loadClients();
  }, [clients]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700
        transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <p className="p-4 text-center text-gray-500">Cargando clients...</p>
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {client.firstName} {client.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.phone || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email || "-"}
                  </td>
                  <td>
                    <div className="flex items-center justfiy-center gap-4">
                      <button
                        onClick={() => openEditModal(client)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(client.id)}
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CreateClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClientCreated={loadClients}
        clientToEdit={clientToEdit!}
      />
    </div>
  );
};
