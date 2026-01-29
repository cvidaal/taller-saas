interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateVehicleModal = ({ isOpen, onClose }: Props) => {
  // Si esta abierta no hacemos nada
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
            Nuevo Vehículo
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
        <div className="p-6">
          <p className="text-gray-500 mb-4">Aquí inputs</p>
          {/* Botones acción */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
