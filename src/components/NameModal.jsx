import { useState } from 'react'

const NameModal = ({ isOpen, onClose, onConfirm, guardando = false }) => {
  const [nombre, setNombre] = useState('')

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!nombre.trim() || guardando) return
    onConfirm(nombre.trim())
    setNombre('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm p-6">
        <h2 className="mb-1 text-xl font-bold">Guardar dibujo</h2>
        <p className="mb-4 text-sm text-slate-400">Ponle un nombre a tu obra.</p>

        <input
          type="text"
          autoFocus
          placeholder="Mi dibujo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="field mb-5"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost px-4 py-2 text-sm"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!nombre.trim() || guardando}
            className="btn-primary px-4 py-2 text-sm disabled:opacity-50"
          >
            {guardando ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NameModal
