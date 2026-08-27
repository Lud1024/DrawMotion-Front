import { useEffect, useRef, useState } from 'react'
import { Eraser, Brush, Trash2, CameraOff, Video } from 'lucide-react'
import SaveButton from './SaveButton'
import { GUARDAR_HABILITADO } from '../config/features'

const COLORES = ['#0F172A', '#22D3EE', '#A78BFA', '#E879F9', '#FBBF24', '#34D399', '#F87171']
const GROSORES = [3, 6, 12, 20]

// ✅ LIENZO — se ajusta al tamaño de su contenedor y conserva el trazo al redimensionar
const DrawingCanvas = ({
  smoothedX,
  smoothedY,
  isEraser,
  draw,
  inside,
  brushColor = '#0F172A',
  brushSize = 6,
  reset,
  canvasRef,
}) => {
  const prev = useRef({ x: null, y: null })

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ajustar = () => {
      const { width, height } = parent.getBoundingClientRect()
      const w = Math.max(1, Math.round(width))
      const h = Math.max(1, Math.round(height))
      if (canvas.width === w && canvas.height === h) return

      // Copiamos lo dibujado para no perderlo al cambiar el tamaño
      const copia = document.createElement('canvas')
      copia.width = canvas.width || 1
      copia.height = canvas.height || 1
      if (canvas.width && canvas.height) {
        copia.getContext('2d').drawImage(canvas, 0, 0)
      }

      canvas.width = w
      canvas.height = h

      if (copia.width > 1 && copia.height > 1) {
        canvas
          .getContext('2d')
          .drawImage(copia, 0, 0, copia.width, copia.height, 0, 0, w, h)
      }
      prev.current = { x: null, y: null }
    }

    ajustar()
    const observer = new ResizeObserver(ajustar)
    observer.observe(parent)
    return () => observer.disconnect()
  }, [canvasRef])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (draw && inside && smoothedX != null && smoothedY != null) {
      if (prev.current.x !== null && prev.current.y !== null) {
        ctx.beginPath()
        ctx.moveTo(prev.current.x, prev.current.y)
        ctx.lineTo(smoothedX, smoothedY)
        ctx.strokeStyle = isEraser ? '#ffffff' : brushColor
        ctx.lineWidth = isEraser ? brushSize * 4 : brushSize
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }
      prev.current = { x: smoothedX, y: smoothedY }
    } else {
      prev.current = { x: null, y: null }
    }
  }, [draw, smoothedX, smoothedY, isEraser, inside, brushColor, brushSize, reset, canvasRef])

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  )
}

// ✅ COMPONENTE PRINCIPAL
const DrawingManager = () => {
  const videoRef = useRef(null)
  const stageRef = useRef(null)
  const areaRef = useRef(null)
  const iconRef = useRef(null)
  const canvasRef = useRef(null)

  const [devices, setDevices] = useState([])
  const [selectedDeviceId, setSelectedDeviceId] = useState(null)
  const [tool, setTool] = useState({ x: 0, y: 0, isEraser: false })
  const [drawState, setDrawState] = useState({ draw: false, inside: false, reset: 0 })
  const [color, setColor] = useState(COLORES[0])
  const [grosor, setGrosor] = useState(GROSORES[1])
  const [estado, setEstado] = useState('cargando') // cargando | listo | error
  const [mensaje, setMensaje] = useState('')

  const smoothedX = useRef(null)
  const smoothedY = useRef(null)
  const smoothFactor = 0.92
  const activeFrames = useRef(0)

  useEffect(() => {
    if (!navigator.mediaDevices?.enumerateDevices) return
    navigator.mediaDevices
      .enumerateDevices()
      .then((lista) => {
        const videoInputs = lista.filter((d) => d.kind === 'videoinput')
        setDevices(videoInputs)
        if (videoInputs[0]) setSelectedDeviceId(videoInputs[0].deviceId)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!window.Hands || !window.Camera) {
      setEstado('error')
      setMensaje('No se pudieron cargar las librerías de detección de manos. Revisa tu conexión.')
      return
    }

    let cancelado = false
    let stream = null
    let camera = null

    const hands = new window.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.8,
      minTrackingConfidence: 0.8,
    })

    hands.onResults((results) => {
      const stage = stageRef.current?.getBoundingClientRect()
      const area = areaRef.current?.getBoundingClientRect()
      if (!stage || !area || !results.multiHandLandmarks?.length) return

      // Coordenadas relativas al "stage" (que es donde vive el canvas),
      // no al viewport: así el trazo cae justo bajo el dedo en cualquier pantalla.
      const offX = area.left - stage.left
      const offY = area.top - stage.top

      const landmarks = results.multiHandLandmarks[0]
      // El video se muestra en espejo, así que invertimos X para que el trazo
      // coincida con lo que el usuario ve en pantalla.
      const x = (1 - landmarks[8].x) * area.width + offX
      const y = landmarks[8].y * area.height + offY
      const thumbX = (1 - landmarks[4].x) * area.width + offX
      const thumbY = landmarks[4].y * area.height + offY

      smoothedX.current =
        smoothedX.current == null ? x : smoothFactor * smoothedX.current + (1 - smoothFactor) * x
      smoothedY.current =
        smoothedY.current == null ? y : smoothFactor * smoothedY.current + (1 - smoothFactor) * y

      const isFist = [8, 12, 16, 20].every((i) => landmarks[i].y > landmarks[i - 2].y + 0.03)
      // Umbral proporcional al tamaño del área: funciona igual en móvil que en escritorio
      const umbral = Math.max(18, area.width * 0.022)
      const pinch = Math.hypot(x - thumbX, y - thumbY)
      const draw = pinch < umbral || isFist

      const inside =
        smoothedX.current >= offX &&
        smoothedX.current <= offX + area.width &&
        smoothedY.current >= offY &&
        smoothedY.current <= offY + area.height

      setTool({ x: smoothedX.current, y: smoothedY.current, isEraser: isFist })

      if (iconRef.current) {
        iconRef.current.style.transform = `translate(${smoothedX.current - 15}px, ${
          smoothedY.current - 15
        }px)`
      }

      if (draw && inside) {
        activeFrames.current = 3
      } else if (activeFrames.current > 0) {
        activeFrames.current--
      }

      setDrawState((prev) => ({
        draw: activeFrames.current > 0,
        inside,
        reset: prev.reset + 1,
      }))
    })

    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: selectedDeviceId
            ? { deviceId: { exact: selectedDeviceId } }
            : { facingMode: 'user' },
        })

        if (cancelado) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }

        const video = videoRef.current
        if (!video) return
        video.srcObject = stream

        await new Promise((resolve) => {
          if (video.readyState >= 1) return resolve()
          video.onloadedmetadata = resolve
        })
        if (cancelado) return

        await video.play().catch(() => {})

        camera = new window.Camera(video, {
          onFrame: async () => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              await hands.send({ image: video })
            }
          },
          width: 640,
          height: 480,
        })
        camera.start()
        setEstado('listo')
      } catch (err) {
        console.error('Error al acceder a la cámara:', err)
        setEstado('error')
        setMensaje('No pudimos acceder a tu cámara. Revisa los permisos del navegador.')
      }
    }

    setupCamera()

    return () => {
      cancelado = true
      try {
        camera?.stop()
      } catch {
        /* noop */
      }
      try {
        stream?.getTracks().forEach((t) => t.stop())
      } catch {
        /* noop */
      }
      try {
        hands.close()
      } catch {
        /* noop */
      }
    }
  }, [selectedDeviceId])

  const limpiar = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* ───── Barra de herramientas ───── */}
      <div className="z-30 shrink-0 border-b border-white/10 bg-ink-900/80 px-3 py-3 backdrop-blur sm:px-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:justify-between">
          {/* Colores */}
          <div className="flex items-center gap-2">
            <Brush size={16} className="hidden text-slate-400 sm:block" />
            <div className="flex flex-wrap items-center gap-1.5">
              {COLORES.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                  className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 sm:h-8 sm:w-8 ${
                    color === c ? 'border-white scale-110' : 'border-white/20'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Grosor */}
          <div className="flex items-center gap-1.5">
            {GROSORES.map((g) => (
              <button
                key={g}
                onClick={() => setGrosor(g)}
                aria-label={`Grosor ${g}`}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                  grosor === g
                    ? 'border-brand-cyan bg-brand-cyan/15'
                    : 'border-white/15 bg-white/5 hover:bg-white/10'
                }`}
              >
                <span
                  className="rounded-full bg-slate-200"
                  style={{ width: `${g}px`, height: `${g}px` }}
                />
              </button>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {devices.length > 1 && (
              <label className="flex items-center gap-2 text-xs text-slate-400">
                <Video size={16} className="shrink-0" />
                <select
                  value={selectedDeviceId ?? ''}
                  onChange={(e) => setSelectedDeviceId(e.target.value)}
                  className="max-w-[9rem] rounded-lg border border-white/15 bg-ink-800 px-2 py-1.5 text-xs text-slate-200 outline-none focus:border-brand-cyan/60"
                >
                  {devices.map((d, i) => (
                    <option key={d.deviceId} value={d.deviceId}>
                      {d.label || `Cámara ${i + 1}`}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <button onClick={limpiar} className="btn-ghost px-4 py-2 text-sm">
              <Trash2 size={16} />
              <span className="hidden sm:inline">Limpiar</span>
            </button>

            {GUARDAR_HABILITADO && <SaveButton canvasId="canvas" />}
          </div>
        </div>
      </div>

      {/* ───── Escenario de dibujo ───── */}
      <div
        ref={stageRef}
        className="relative flex min-h-[55vh] flex-1 overflow-hidden p-3 sm:p-5"
      >
        {/* Hoja blanca — el stage es flex y la hoja se estira sola (stretch).
            No usar h-full: el porcentaje no resuelve contra la altura de un flex item. */}
        <div
          ref={areaRef}
          id="drawing-area-bg"
          className="mx-auto w-full max-w-5xl rounded-2xl border-2 border-brand-cyan/40 bg-white shadow-2xl shadow-black/40"
        />

        <DrawingCanvas
          canvasRef={canvasRef}
          smoothedX={smoothedX.current}
          smoothedY={smoothedY.current}
          isEraser={tool.isEraser}
          draw={drawState.draw}
          inside={drawState.inside}
          brushColor={color}
          brushSize={grosor}
          reset={drawState.reset}
        />

        {/* Vista de la cámara (en espejo) */}
        <video
          ref={videoRef}
          className="absolute right-4 top-4 z-30 w-24 rounded-xl border border-white/20 shadow-lg sm:w-32 md:w-44"
          style={{ transform: 'scaleX(-1)' }}
          autoPlay
          muted
          playsInline
        />

        {/* Puntero que sigue el dedo */}
        <div
          ref={iconRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-30 flex h-[30px] w-[30px] items-center justify-center rounded-full shadow-lg transition-colors"
          style={{
            backgroundColor: tool.isEraser ? '#ffffff' : color,
            border: '2px solid rgba(255,255,255,0.85)',
            opacity: estado === 'listo' ? 1 : 0,
          }}
        >
          {tool.isEraser && <Eraser size={16} className="text-ink-900" />}
        </div>

        {/* Estados de la cámara */}
        {estado !== 'listo' && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-6">
            <div className="card max-w-sm p-6 text-center">
              {estado === 'error' ? (
                <>
                  <CameraOff className="mx-auto mb-3 text-rose-400" size={36} />
                  <h3 className="mb-2 text-lg font-bold">Cámara no disponible</h3>
                  <p className="text-sm text-slate-400">{mensaje}</p>
                </>
              ) : (
                <>
                  <Video className="mx-auto mb-3 animate-pulse text-brand-cyan" size={36} />
                  <h3 className="mb-2 text-lg font-bold">Preparando la cámara…</h3>
                  <p className="text-sm text-slate-400">
                    Acepta el permiso del navegador y coloca tu mano frente a la cámara.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DrawingManager
