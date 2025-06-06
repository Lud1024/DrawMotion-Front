import { Home, Paintbrush, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gray-800 text-white pt-2 pb-2 px-5 flex items-center justify-between">
    {/* Logo y título */}
    <div className="flex items-center space-x-5">
      <img src="/logo.png" alt="Logo" className="h-20 w-20" />
      <h1 className="text-4xl font-extrabold tracking-wide">DrawMotion</h1>
    </div>

    {/* Navegación */}
    <nav className="flex items-center space-x-9">
      <Link to="/inicio" className="flex flex-col items-center">
        <Home />
        <span className="text-sm">Inicio</span>
      </Link>
      <Link to="/pintar" className="flex flex-col items-center">
        <Paintbrush />
        <span className="text-sm">Pintar</span>
      </Link>
      <Link to="/consultar" className="flex flex-col items-center">
        <Search />
        <span className="text-sm">Consultar</span>
      </Link>
      
      {/* Botón Salir */}
      <Link
        to="/"
        className="ml-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold text-sm transition"
      >
        Salir
      </Link>
    </nav>
  </header>
);

export default Header;
