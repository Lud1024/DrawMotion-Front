import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (pass.length < 8) return setError('La contraseña debe tener al menos 8 caracteres');
    if (pass !== pass2) return setError('Las contraseñas no coinciden');

    setCargando(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: pass }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Contraseña actualizada. Redirigiendo…');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.error || data.msg || 'El enlace no es válido o ya expiró');
      }
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative isolate flex flex-1 items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="animate-blob absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl" />
      </div>

      <div className="card w-full max-w-md p-8 sm:p-10">
        <KeyRound className="mx-auto mb-4 text-brand-amber" size={40} />
        <h2 className="mb-2 text-center text-2xl font-extrabold sm:text-3xl">
          Nueva contraseña
        </h2>
        <p className="mb-6 text-center text-sm text-slate-400">
          Elige una contraseña de al menos 8 caracteres.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Nueva contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="field"
            minLength={8}
            required
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Confirmar contraseña"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            className="field"
            minLength={8}
            required
          />

          {error && (
            <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}
          {msg && (
            <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              {msg}
            </p>
          )}

          <button type="submit" disabled={cargando} className="btn-primary mt-1 disabled:opacity-60">
            {cargando ? 'Guardando…' : 'Restablecer contraseña'}
          </button>

          <p className="text-center text-sm text-slate-400">
            <Link to="/" className="font-semibold text-brand-cyan underline-offset-4 hover:underline">
              Volver al inicio de sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
