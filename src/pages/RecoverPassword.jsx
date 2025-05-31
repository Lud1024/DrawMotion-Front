import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecoverPassword() {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/recover-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMsg('Correo enviado con instrucciones');
            } else {
                setError(data.msg || 'Error al enviar el correo');
            }
        } catch (err) {
            setError('No se pudo conectar con el servidor');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {msg && <p className="text-green-500 text-sm">{msg}</p>}
                    <button
                        type="submit"
                        className="text-white py-2 rounded transition"
                        style={{ backgroundColor: '#1F2937' }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#111827')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#1F2937')}
                    >

                        Enviar instrucciones
                    </button>
                    <p className="text-sm text-center mt-2">
                        ¿Ya la recordaste?{' '}
                        <span
                            className=" cursor-pointer underline"
                            style={{ Color: '#1F2937' }}
                            onClick={() => navigate('/')}
                        >
                            Iniciar sesión
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RecoverPassword;
