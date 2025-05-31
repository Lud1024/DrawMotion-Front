import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Paint from './pages/Paint';
import Consult from './pages/Consult';
import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

function Layout() {
  const location = useLocation();
const hideNavbar = ['/', '/registro', '/recuperacion'].includes(location.pathname);

  return (
    <>
      {/* Condicional del header */}
      {!hideNavbar && <Header />}

      {/* Todas las rutas agrupadas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pintar"
          element={
            <ProtectedRoute>
              <Paint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultar"
          element={
            <ProtectedRoute>
              <Consult />
            </ProtectedRoute>
          }
        />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperacion" element={<RecoverPassword />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
