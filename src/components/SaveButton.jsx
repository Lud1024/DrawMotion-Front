import { useState } from 'react'
import { Save } from 'lucide-react'
import NameModal from './NameModal'
import FeedbackModal from './FeedbackModal'

const SaveButton = ({ canvasId = 'canvas', areaId = 'drawing-area-bg' }) => {
  const [showNameModal, setShowNameModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [feedback, setFeedback] = useState({ success: false, message: '' })

  const openModal = () => {
    setShowNameModal(true)
  }

  const handleConfirmName = (nombre) => {
    const token = localStorage.getItem('token')
    if (!token) {
      setFeedback({ success: false, message: 'Debes iniciar sesión para guardar.' })
      setShowFeedbackModal(true)
      return
    }

    const originalCanvas = document.getElementById(canvasId)
    if (!originalCanvas) {
      setFeedback({ success: false, message: 'No se encontró el canvas.' })
      setShowFeedbackModal(true)
      return
    }

    // Recortamos a la hoja blanca (si existe) para no exportar el área vacía de alrededor
    const area = document.getElementById(areaId)
    let sx = 0
    let sy = 0
    let sw = originalCanvas.width
    let sh = originalCanvas.height

    if (area) {
      const canvasRect = originalCanvas.getBoundingClientRect()
      const areaRect = area.getBoundingClientRect()
      const escalaX = originalCanvas.width / (canvasRect.width || 1)
      const escalaY = originalCanvas.height / (canvasRect.height || 1)

      sx = Math.max(0, Math.round((areaRect.left - canvasRect.left) * escalaX))
      sy = Math.max(0, Math.round((areaRect.top - canvasRect.top) * escalaY))
      sw = Math.min(originalCanvas.width - sx, Math.round(areaRect.width * escalaX))
      sh = Math.min(originalCanvas.height - sy, Math.round(areaRect.height * escalaY))

      if (sw <= 0 || sh <= 0) {
        sx = 0
        sy = 0
        sw = originalCanvas.width
        sh = originalCanvas.height
      }
    }

    // Crear imagen con fondo blanco
    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = sw
    exportCanvas.height = sh

    const ctx = exportCanvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)
    ctx.drawImage(originalCanvas, sx, sy, sw, sh, 0, 0, sw, sh)

    setGuardando(true)
    exportCanvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('file', blob, `${Date.now()}.png`)
      formData.append('nombre', nombre)

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/guardar`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
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
        setGuardando(false)
        setShowNameModal(false)
        setShowFeedbackModal(true)
      }
    }, 'image/png')
  }

  return (
    <>
      <button onClick={openModal} className="btn-primary px-4 py-2 text-sm">
        <Save size={16} />
        Guardar
      </button>

      <NameModal
        isOpen={showNameModal}
        guardando={guardando}
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
