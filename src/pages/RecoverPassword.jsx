import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailQuestion } from 'lucide-react';

function RecoverPassword() {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        setError('');
        setCargando(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/recover`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMsg(data.msg || 'Si el correo está registrado, recibirás instrucciones');
            } else {
                setError(data.msg || 'Error al enviar el correo');
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
                <div className="animate-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-amber/15 blur-3xl" />
                <div className="animate-blob absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-violet/20 blur-3xl" />
            </div>

            <div className="card w-full max-w-md p-8 sm:p-10">
                <MailQuestion className="mx-auto mb-4 text-brand-cyan" size={40} />
                <h2 className="mb-2 text-center text-2xl font-extrabold sm:text-3xl">
                    Recuperar contraseña
                </h2>
                <p className="mb-6 text-center text-sm text-slate-400">
                    Escribe tu correo y te enviaremos un enlace para crear una contraseña nueva.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        autoComplete="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="field"
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
                        {cargando ? 'Enviando…' : 'Enviar instrucciones'}
                    </button>

                    <p className="text-center text-sm text-slate-400">
                        ¿Ya la recordaste?{' '}
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

export default RecoverPassword;
