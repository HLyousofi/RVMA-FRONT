import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import usePopup from './usePopup';
import { useLogout as useLogoutService } from '../services/LogService'; 

const useLogout = () => {
  const { setApiToken, setUser } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogoutService(); // Récupérer mutateAsync
  const { openPopup, setYesAction, setNoAction, setMessage } = usePopup();

  const handleLogout = () => {
    // Configurer le message du popup
    setMessage('Êtes-vous sûr de vouloir vous déconnecter ?');

    // Action pour "OUI" : Déconnexion et redirection
    setYesAction(() => async () => {
      try {
        await logout(); // Attendre la réponse de l’API de déconnexion
        setApiToken(null); // Nettoyer le token dans l’état
        setUser(null);
        localStorage.removeItem('apiToken'); // Supprimer le token du localStorage
        navigate('/'); // Rediriger vers la page d’accueil
      } catch (error) {
        console.error('Échec de la déconnexion :', error);
      }
    });

    // Action pour "NON" : Rester sur la page courante
    setNoAction(() => () => {
      // Ne rien faire, juste fermer le popup
    });

    // Ouvrir le popup sur la page courante
    openPopup();
  };

  return handleLogout;
};

export default useLogout;