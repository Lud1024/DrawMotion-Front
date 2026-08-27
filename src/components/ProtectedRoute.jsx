import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProtectedRoute() {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
