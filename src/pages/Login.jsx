import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Login exitoso, token:', data.token);
        localStorage.setItem('token', data.token); // ✅ Guarda el token
        login(); // si usas contexto de autenticación
        navigate('/inicio');
      } else {
        setError(data.msg || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white flex flex-col md:flex-row rounded-2xl shadow-lg max-w-6xl w-full overflow-hidden">
        <div
          className="w-full md:w-1/2 text-white flex flex-col justify-center items-center p-10"
          style={{ backgroundColor: '#1F2937' }}
        >
          <h2 className="text-3xl font-bold mb-4">¡Bienvenido!</h2>
          <p className="mb-6 text-center">
            DrawMotion es una plataforma educativa con la que aprendes mientras te diviertes
          </p>
          <button
            onClick={() => navigate('/registro')}
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-800 transition duration-300"
          >
            Registro
          </button>
        </div>

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inicia Sesión</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
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
 
            <button
              type="submit"
              className="text-white py-2 rounded transition"
              style={{ backgroundColor: '#1F2937' }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#111827')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#1F2937')}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
