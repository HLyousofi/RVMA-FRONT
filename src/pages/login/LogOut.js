import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LogOut() {
  const [open, setOpen] = useState(true);
  const {setApiToken} = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  //const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    setApiToken(null);
    localStorage.removeItem('apiToken');
    navigate('/');

  }

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Êtes-vous sûr de vouloir vous déconnecter ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleLogout}>
            Oui
          </Button>
          <Button onClick={handleClose} autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}