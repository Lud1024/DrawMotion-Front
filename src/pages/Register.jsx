import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setCargando(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Usuario registrado correctamente');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.msg || 'Error al registrar');
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
        <div className="animate-blob absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="animate-blob absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl" />
      </div>

      <div className="card w-full max-w-md p-8 sm:p-10">
        <h2 className="mb-2 text-center text-3xl font-extrabold">Crear cuenta</h2>
        <p className="mb-6 text-center text-sm text-slate-400">
          Empieza a dibujar con las manos en segundos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="field"
            required
          />
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
          <div>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="field"
              minLength={8}
              required
            />
            <p className="mt-1.5 text-xs text-slate-500">Mínimo 8 caracteres.</p>
          </div>

          {error && (
            <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              {success}
            </p>
          )}

          <button type="submit" disabled={cargando} className="btn-primary mt-1 disabled:opacity-60">
            <UserPlus size={18} />
            {cargando ? 'Creando…' : 'Registrarse'}
          </button>

          <p className="text-center text-sm text-slate-400">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/"
              className="font-semibold text-brand-cyan underline-offset-4 hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
