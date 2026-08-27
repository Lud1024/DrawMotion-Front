import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Home as HomeIcon, Paintbrush, GalleryThumbnails } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { AUTH_HABILITADO, GALERIA_HABILITADA } from '../config/features';

const enlaces = [
  { to: '/inicio', label: 'Inicio', icon: HomeIcon },
  { to: '/pintar', label: 'Pintar', icon: Paintbrush },
  { to: '/consultar', label: 'Mis dibujos', icon: GalleryThumbnails, requiereGaleria: true },
];

const Header = () => {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [abierto, setAbierto] = useState(false);

  // Cierra el menú móvil al cambiar de página
  useEffect(() => setAbierto(false), [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Sin login, la navegación se muestra siempre; con login, solo al estar autenticado
  const mostrarNav = AUTH_HABILITADO ? isAuth : true;
  const visibles = enlaces.filter((e) => !e.requiereGaleria || GALERIA_HABILITADA);

  const linkClase = ({ isActive }) =>
    `relative font-semibold transition-colors ${
      isActive ? 'text-brand-cyan' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Marca */}
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/logo.png"
            alt=""
            className="h-10 w-10 shrink-0 rounded-xl sm:h-12 sm:w-12"
          />
          <span className="truncate font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            <span className="text-gradient">DrawMotion</span>
          </span>
        </NavLink>

        {mostrarNav && (
          <>
            {/* Navegación escritorio */}
            <nav className="hidden items-center gap-7 md:flex">
              {visibles.map(({ to, label }) => (
                <NavLink key={to} to={to} className={linkClase}>
                  {label}
                </NavLink>
              ))}
              {AUTH_HABILITADO && (
                <button onClick={handleLogout} className="btn-ghost px-5 py-2 text-sm">
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              )}
            </nav>

            {/* Botón hamburguesa */}
            <button
              onClick={() => setAbierto((v) => !v)}
              aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={abierto}
              className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-200 transition-colors hover:bg-white/10 md:hidden"
            >
              {abierto ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        )}
      </div>

      {/* Navegación móvil */}
      {mostrarNav && abierto && (
        <nav className="border-t border-white/10 bg-ink-900/95 px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {visibles.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 font-semibold transition-colors ${
                      isActive
                        ? 'bg-white/10 text-brand-cyan'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              </li>
            ))}
            {AUTH_HABILITADO && (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 font-semibold text-rose-300 transition-colors hover:bg-rose-500/10"
                >
                  <LogOut size={18} />
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
