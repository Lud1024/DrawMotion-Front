import { Home, Paintbrush, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
    {/* Logo y título */}
    <div className="flex items-center space-x-3">
      <img src="/logo.png" alt="Logo" className="h-20 w-20" />
      <h1 className="text-4xl font-extrabold tracking-wide">DrawMotion</h1>
    </div>

    {/* Navegación */}
    <nav className="flex space-x-6">
      <Link to="/" className="flex flex-col items-center">
        <Home /><span className="text-sm">Inicio</span>
      </Link>
      <Link to="/pintar" className="flex flex-col items-center">
        <Paintbrush /><span className="text-sm">Pintar</span>
      </Link>
      <Link to="/consultar" className="flex flex-col items-center">
        <Search /><span className="text-sm">Consultar</span>
      </Link>
    </nav>
  </header>
)

export default Header
