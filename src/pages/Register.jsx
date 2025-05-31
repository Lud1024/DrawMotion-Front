import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="text-white py-2 rounded transition"
                            style={{ backgroundColor: '#1F2937' }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#111827')}
                            onMouseOut={(e) => (e.target.style.backgroundColor = '#1F2937')}
                        >
            Registrarse
          </button>
          <p className="text-sm text-center mt-2">
            ¿Ya tienes cuenta?{' '}
            <span
              className="cursor-pointer underline"
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

export default Register;
