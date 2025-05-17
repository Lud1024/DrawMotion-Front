import { useRef, useState } from 'react'
import NameModal from './NameModal'
import FeedbackModal from './FeedbackModal'

const SaveButton = ({ canvasId = 'canvas' }) => {
  const [showNameModal, setShowNameModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedback, setFeedback] = useState({ success: false, message: '' })
  const pendingBlob = useRef(null)

  const openModal = () => {
    setShowNameModal(true)
  }

  const handleConfirmName = (nombre) => {
    const originalCanvas = document.getElementById(canvasId)
    if (!originalCanvas) {
      setFeedback({ success: false, message: 'No se encontró el canvas.' })
      setShowFeedbackModal(true)
      return
    }

    // Crear imagen con fondo blanco
    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = originalCanvas.width
    exportCanvas.height = originalCanvas.height

    const ctx = exportCanvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)
    ctx.drawImage(originalCanvas, 0, 0)

    exportCanvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('file', blob, `${nombre}_${Date.now()}.png`)
      formData.append('nombre', nombre)

      try {
        const res = await fetch('https://drawmotion-back.up.railway.app/guardar', {
          method: 'POST',
          body: formData,
        })

        if (res.ok) {
          setFeedback({ success: true, message: 'Dibujo guardado con éxito.' })
        } else {
          setFeedback({ success: false, message: 'Error al guardar el dibujo.' })
        }
      } catch (err) {
        setFeedback({ success: false, message: 'No se pudo conectar con el servidor.' })
      } finally {
        setShowNameModal(false)
        setShowFeedbackModal(true)
      }
    }, 'image/png')
  }

  return (
    <>
      <button
        onClick={openModal}
        className="absolute top-4 left-4 z-30 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
      >
        Guardar dibujo
      </button>

      <NameModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onConfirm={handleConfirmName}
      />

      <FeedbackModal
        isOpen={showFeedbackModal}
        success={feedback.success}
        message={feedback.message}
        onClose={() => setShowFeedbackModal(false)}
      />
    </>
  )
}

export default SaveButton
