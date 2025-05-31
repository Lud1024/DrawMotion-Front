import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Consult = () => {
  const [imagenes, setImagenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/guardar`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          },
        });

        const contentType = res.headers.get('content-type');
        if (!res.ok || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Respuesta inesperada:', text);
          throw new Error('Respuesta no válida del servidor');
        }

        const data = await res.json();
        setImagenes(data);
      } catch (err) {
        console.error('Error al cargar imágenes:', err);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate]);

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Dibujos Guardados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imagenes.map(({ _id, filename, nombre, fecha }) => {
          const urlImagen = `${import.meta.env.VITE_API_URL}/uploads/${filename}`;
          return (
            <div key={_id} className="bg-white rounded shadow p-4 text-center">
              <img
                src={urlImagen}
                alt={`Dibujo de ${nombre}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+encontrada';
                }}
                className="w-full h-auto border mb-4"
              />
              <p className="font-semibold">{nombre}</p>
              <p className="text-sm text-gray-600">{formatearFecha(fecha)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Consult;
