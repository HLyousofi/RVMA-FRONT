
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import usePopup from '../../hooks/usePopup';

export default function LogOut() {
  const {setApiToken} = useAuth();
  const navigate = useNavigate();
  const {openPopup, setYesAction, setNoAction, setMessage} = usePopup();
  



  useEffect(() => {
    openPopup();
    setMessage('Êtes-vous sûr de vouloir vous déconnecter ?');
    setYesAction(() => () => {
        setApiToken(null);
        localStorage.removeItem('apiToken');
        navigate('/');
    
    });

    setNoAction(() => () => {
       navigate(-1);
      })

    
  },[])

}