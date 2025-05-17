const FeedbackModal = ({ isOpen, success, message, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <h2 className={`text-lg font-semibold mb-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
          {success ? '¡Éxito!' : 'Error'}
        </h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default FeedbackModal
