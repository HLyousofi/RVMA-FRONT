import { Navigate, Outlet } from 'react-router-dom';
import useAuth  from './../hooks/useAuth';

 const ProtectLogin = () => {
  const { apiToken} = useAuth();

  // Si l'utilisateur est authentifié, rediriger vers une autre page
  if (apiToken) {
    return <Navigate to="/customers" replace />;
  }

  // Sinon, afficher la page de login
  return <Outlet />;
};

export default ProtectLogin;