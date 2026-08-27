import { CheckCircle2, XCircle } from 'lucide-react'

const FeedbackModal = ({ isOpen, success, message, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-sm p-6 text-center">
        {success ? (
          <CheckCircle2 size={40} className="mx-auto mb-3 text-emerald-400" />
        ) : (
          <XCircle size={40} className="mx-auto mb-3 text-rose-400" />
        )}

        <h2 className="mb-2 text-xl font-bold">{success ? '¡Éxito!' : 'Error'}</h2>
        <p className="mb-5 text-sm text-slate-400">{message}</p>

        <button onClick={onClose} className="btn-primary w-full py-2 text-sm">
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default FeedbackModal
