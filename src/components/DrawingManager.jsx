import { useEffect, useRef, useState } from 'react'

// ✅ MODAL DE NOMBRE
const NameModal = ({ isOpen, onClose, onConfirm }) => {
  const [nombre, setNombre] = useState('')

  const handleSubmit = () => {
    if (nombre.trim()) {
      onConfirm(nombre.trim())
      setNombre('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">¿Tu nombre?</h2>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border border-gray-300 px-3 py-2 w-full rounded mb-4"
          placeholder="Escribe tu nombre"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

// ✅ MODAL DE RESULTADO
const FeedbackModal = ({ isOpen, success, message, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <h2 className={`text-xl font-bold mb-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
          {success ? 'Éxito' : 'Error'}
        </h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

// ✅ DRAWING CANVAS
const DrawingCanvas = ({
  smoothedX,
  smoothedY,
  isEraser,
  draw,
  inside,
  brushColor = 'black',
  brushSize = 5,
  reset,
}) => {
  const canvasRef = useRef(null)
  const prev = useRef({ x: null, y: null })

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    if (draw && inside) {
      if (prev.current.x !== null && prev.current.y !== null) {
        ctx.beginPath()
        ctx.moveTo(prev.current.x, prev.current.y)
        ctx.lineTo(smoothedX, smoothedY)
        ctx.strokeStyle = isEraser ? '#ffffff' : brushColor
        ctx.lineWidth = isEraser ? brushSize * 5 : brushSize
        ctx.lineCap = 'round'
        ctx.stroke()
      }
      prev.current = { x: smoothedX, y: smoothedY }
    } else {
      prev.current = { x: null, y: null }
    }
  }, [draw, smoothedX, smoothedY, isEraser, inside, brushColor, brushSize, reset])

  return <canvas ref={canvasRef} id="canvas" className="absolute top-0 left-0 z-20" />
}

// ✅ BOTÓN GUARDAR
const SaveButton = () => {
  const [showNameModal, setShowNameModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedback, setFeedback] = useState({ success: false, message: '' })

  const handleConfirmName = (nombre) => {
    const originalCanvas = document.getElementById('canvas')
    if (!originalCanvas) {
      setFeedback({ success: false, message: 'No se encontró el canvas.' })
      setShowFeedbackModal(true)
      return
    }

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
        const res = await fetch('http://localhost:5000/guardar', {
          method: 'POST',
          body: formData,
        })
        setFeedback({
          success: res.ok,
          message: res.ok
            ? 'Dibujo guardado con éxito.'
            : 'Error al guardar el dibujo.',
        })
      } catch {
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
        onClick={() => setShowNameModal(true)}
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

// ✅ COMPONENTE PRINCIPAL
const DrawingManager = () => {
  const videoRef = useRef(null)
  const areaRef = useRef(null)
  const iconRef = useRef(null)

  const [devices, setDevices] = useState([])
  const [selectedDeviceId, setSelectedDeviceId] = useState(null)
  const [tool, setTool] = useState({ x: 0, y: 0, isEraser: false })
  const [drawState, setDrawState] = useState({ draw: false, inside: false, reset: 0 })

  const smoothedX = useRef(null)
  const smoothedY = useRef(null)
  const smoothFactor = 0.92
  const activeFrames = useRef(0)

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoInputs = devices.filter(d => d.kind === 'videoinput')
      setDevices(videoInputs)
      if (videoInputs[0]) setSelectedDeviceId(videoInputs[0].deviceId)
    })
  }, [])

  useEffect(() => {
    const hands = new window.Hands({
      locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8,
    })

    hands.onResults(results => {
      const area = areaRef.current?.getBoundingClientRect()
      if (!area || !results.multiHandLandmarks?.length) return

      const landmarks = results.multiHandLandmarks[0]
      const x = landmarks[8].x * area.width + area.left
      const y = landmarks[8].y * area.height + area.top
      const thumbX = landmarks[4].x * area.width + area.left
      const thumbY = landmarks[4].y * area.height + area.top

      smoothedX.current = smoothedX.current == null ? x : smoothFactor * smoothedX.current + (1 - smoothFactor) * x
      smoothedY.current = smoothedY.current == null ? y : smoothFactor * smoothedY.current + (1 - smoothFactor) * y

      const isFist = [8, 12, 16, 20].every(i => landmarks[i].y > landmarks[i - 2].y + 0.03)
      const pinch = Math.hypot(x - thumbX, y - thumbY)
      const draw = pinch < 30 || isFist

      const inside =
        smoothedX.current >= area.left &&
        smoothedX.current <= area.right &&
        smoothedY.current >= area.top &&
        smoothedY.current <= area.bottom

      setTool({ x: smoothedX.current, y: smoothedY.current, isEraser: isFist })

      if (iconRef.current) {
        iconRef.current.style.left = `${smoothedX.current - 15}px`
        iconRef.current.style.top = `${smoothedY.current - 15}px`
        iconRef.current.src = isFist
          ? 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
          : 'https://cdn-icons-png.flaticon.com/512/2821/2821785.png'
      }

      if (draw && inside) {
        activeFrames.current = 3
      } else if (activeFrames.current > 0) {
        activeFrames.current--
      }

      setDrawState(prev => ({
        draw: activeFrames.current > 0,
        inside,
        reset: prev.reset + 1,
      }))
    })

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }
        })
        const video = videoRef.current
        video.srcObject = stream
        video.onloadedmetadata = () => {
          video.play()
          const camera = new window.Camera(video, {
            onFrame: async () => {
              if (video.videoWidth > 0 && video.videoHeight > 0) {
                await hands.send({ image: video })
              }
            },
            width: 640,
            height: 480,
          })
          camera.start()
        }
      } catch (err) {
        console.error('Error al acceder a la cámara:', err)
      }
    }

    setupCamera()
  }, [selectedDeviceId])

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100">
      <SaveButton />

      <div
        ref={areaRef}
        id="drawing-area-bg"
        className="absolute top-[10%] left-[10%] w-[70vw] h-[70vh] bg-white border-4 border-red-500 z-0"
      ></div>

      <video
        ref={videoRef}
        className="absolute top-4 right-1 w-[240px] h-auto z-20 border border-white shadow-md"
        autoPlay
        muted
        playsInline
      />

      <DrawingCanvas
        smoothedX={smoothedX.current}
        smoothedY={smoothedY.current}
        isEraser={tool.isEraser}
        draw={drawState.draw}
        inside={drawState.inside}
        reset={drawState.reset}
      />

      <img
        ref={iconRef}
        alt=""
        className="absolute w-[30px] z-30 pointer-events-none select-none"
        style={{
          top: `${tool.y - 15}px`,
          left: `${tool.x - 15}px`,
        }}
      />
    </div>
  )
}

export default DrawingManager
