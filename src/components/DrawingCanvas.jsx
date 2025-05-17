// ✅ DrawingCanvas.jsx
import { useRef, useEffect } from 'react'

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

  return <canvas ref={canvasRef} className="absolute top-0 left-0 z-20" />
}

export default DrawingCanvas
