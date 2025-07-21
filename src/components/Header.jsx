import { Home, Paintbrush, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-yellow-400 text-gray pt-2 pb-2 px-5 flex items-center justify-between">
    {/* Logo y título */}
    <div className="flex items-center space-x-5">
      <img src="/logo.png" alt="Logo" className="h-20 w-20" />
      <h1 className="text-4xl font-extrabold tracking-wide">DrawMotion</h1>
    </div>


  </header>
);

export default Header;
