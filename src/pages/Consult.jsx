import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Palette, ImageOff, RefreshCw } from 'lucide-react';

const Consult = () => {
  const [imagenes, setImagenes] = useState([]);
  const [urls, setUrls] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [recarga, setRecarga] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setCargando(true);
      setError('');
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/guardar`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (res.status === 401 || res.status === 403) {
          navigate('/');
          return;
        }

        const contentType = res.headers.get('content-type');
        if (!res.ok || !contentType?.includes('application/json')) {
          throw new Error('Respuesta no válida del servidor');
        }

        setImagenes(await res.json());
      } catch (err) {
        console.error('Error al cargar imágenes:', err);
        setError('No se pudieron cargar tus dibujos.');
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [navigate, recarga]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || imagenes.length === 0) return;

    let cancelado = false;
    const creadas = [];

    (async () => {
      for (const img of imagenes) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/guardar/${img._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok || cancelado) continue;
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        creadas.push(url);
        setUrls((prev) => ({ ...prev, [img._id]: url }));
      }
    })();

    return () => {
      cancelado = true;
      creadas.forEach(URL.revokeObjectURL);
    };
  }, [imagenes]);

  const eliminar = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/guardar/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('No se pudo eliminar');
      setImagenes((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar el dibujo.');
    }
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="flex-1 bg-ink-950 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Mi <span className="text-gradient">galería</span>
            </h1>
            <p className="mt-2 text-slate-400">
              {imagenes.length > 0
                ? `${imagenes.length} ${imagenes.length === 1 ? 'dibujo guardado' : 'dibujos guardados'}`
                : 'Aquí aparecerán todas tus creaciones.'}
            </p>
          </div>
          <Link to="/pintar" className="btn-primary w-full sm:w-auto">
            <Palette size={18} />
            Nuevo dibujo
          </Link>
        </header>

        {error && (
          <div className="card mb-6 flex flex-col items-start gap-3 border-rose-500/30 bg-rose-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-rose-200">{error}</p>
            <button
              onClick={() => setRecarga((n) => n + 1)}
              className="btn-ghost px-4 py-2 text-sm"
            >
              <RefreshCw size={16} />
              Reintentar
            </button>
          </div>
        )}

        {cargando ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card animate-pulse p-4">
                <div className="mb-4 aspect-[4/3] w-full rounded-xl bg-white/5" />
                <div className="mx-auto h-4 w-1/2 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : imagenes.length === 0 && !error ? (
          <div className="card flex flex-col items-center gap-4 px-6 py-16 text-center">
            <ImageOff size={44} className="text-slate-500" />
            <h2 className="text-xl font-bold">Aún no tienes dibujos</h2>
            <p className="max-w-sm text-sm text-slate-400">
              Cuando guardes tu primera obra, aparecerá aquí con su nombre y fecha.
            </p>
            <Link to="/pintar" className="btn-primary mt-2">
              <Palette size={18} />
              Dibujar ahora
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {imagenes.map(({ _id, nombre, fecha }) => (
              <article
                key={_id}
                className="card group overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                  {urls[_id] ? (
                    <img
                      src={urls[_id]}
                      alt={`Dibujo ${nombre}`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-ink-800 text-sm text-slate-500">
                      Cargando…
                    </div>
                  )}

                  <button
                    onClick={() => eliminar(_id, nombre)}
                    aria-label={`Eliminar ${nombre}`}
                    title="Eliminar dibujo"
                    className="absolute right-2 top-2 rounded-full bg-ink-950/80 p-2 text-rose-300 backdrop-blur transition hover:bg-rose-500 hover:text-white focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 p-4">
                  <p className="truncate font-bold">{nombre}</p>
                  <p className="shrink-0 text-xs text-slate-400">{formatearFecha(fecha)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Consult;
