import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user);
        navigate('/inicio');
      } else {
        setError(data.msg || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative isolate flex flex-1 items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-violet/20 blur-3xl" />
        <div className="animate-blob absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl" />
      </div>

      <div className="card w-full max-w-4xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Panel de bienvenida */}
          <div className="relative flex flex-col justify-center gap-4 bg-gradient-to-br from-brand-violet/25 via-brand-cyan/10 to-transparent p-8 text-center sm:p-10">
            <Sparkles className="mx-auto text-brand-amber animate-floaty" size={36} />
            <h2 className="text-3xl font-extrabold sm:text-4xl">¡Bienvenido!</h2>
            <p className="text-slate-300">
              DrawMotion es una plataforma educativa con la que aprendes mientras te diviertes.
            </p>
            <Link to="/registro" className="btn-ghost mx-auto mt-2 w-full sm:w-auto">
              Crear una cuenta
            </Link>
          </div>

          {/* Formulario */}
          <div className="p-8 sm:p-10">
            <h2 className="mb-6 text-2xl font-bold">Inicia sesión</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                className="field"
                required
              />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="field"
                required
              />

              {error && (
                <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                  {error}
                </p>
              )}

              <button type="submit" disabled={cargando} className="btn-primary mt-1 disabled:opacity-60">
                <LogIn size={18} />
                {cargando ? 'Entrando…' : 'Iniciar sesión'}
              </button>

              <Link
                to="/recuperar"
                className="mt-1 text-center text-sm text-slate-400 underline-offset-4 transition-colors hover:text-brand-cyan hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
