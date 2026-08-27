import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Paint from './pages/Paint';
import Consult from './pages/Consult';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* min-h-dvh + flex-col: el fondo oscuro siempre cubre la pantalla completa
            y el footer queda abajo aunque la página sea corta */}
        <div className="flex min-h-dvh flex-col bg-ink-950 text-slate-100">
          <Header />

          <main className="flex min-h-0 flex-1 flex-col">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/recuperar" element={<RecoverPassword />} />
              <Route path="/recuperar/:token" element={<ResetPassword />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/inicio" element={<Home />} />
                <Route path="/pintar" element={<Paint />} />
                <Route path="/consultar" element={<Consult />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
