import api from './axios-service'; // Votre instance axios configurée
import { useMutation } from 'react-query';

// Points de terminaison pour l'API
const endPointAuth = '/auth';

// Hook pour la connexion (login)
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await api.post(`/login`, { email, password });
        return response.data; // Supposons que cela retourne { token: "..." }
      } catch (error) {
        console.error("Erreur API Login :", error.response?.data || error);
        throw error; // Relancer l'erreur pour gestion dans onError
      }
    },
  });
};
export default useLogin; // Export par défaut (optionnel, selon votre usage)
// Hook pour la déconnexion (logout)
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await api.post(`/logout`);
        return response.data; // Peut retourner un message de succès ou rien
      } catch (error) {
        console.error("Erreur API Logout :", error.response?.data || error);
        throw error; // Relancer l'erreur pour gestion dans onError
      }
    },
  });
};

