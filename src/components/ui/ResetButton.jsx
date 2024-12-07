import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';





const ResetButton = ({link }) => {

    return (
        <Button type='reset' variant="contained" color="error" startIcon={<RestartAltIcon />}>Annuler</Button>
    );
};
export default ResetButton;

