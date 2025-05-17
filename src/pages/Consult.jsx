import { useEffect, useState } from 'react'

const Consult = () => {
  const [imagenes, setImagenes] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/guardar')
      .then(res => res.json())
      .then(data => setImagenes(data))
      .catch(err => console.error('Error al cargar imágenes:', err))
  }, [])

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO)
    const dia = String(fecha.getDate()).padStart(2, '0')
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const año = fecha.getFullYear()
    return `${dia}/${mes}/${año}`
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Dibujos Guardados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imagenes.map(({ _id, filename, nombre, fecha }) => (
          <div key={_id} className="bg-white rounded shadow p-4 text-center">
            <img
              src={`http://localhost:5000/uploads/${filename}`}
              alt={`Dibujo de ${nombre}`}
              className="w-full h-auto border mb-4"
            />
            <p className="font-semibold">{nombre}</p>
            <p className="text-sm text-gray-600">{formatearFecha(fecha)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Consult
