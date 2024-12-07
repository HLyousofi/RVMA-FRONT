import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';





const SaveButton = ({link }) => {

    return (
        <Button type='submit' variant="contained" startIcon={<SaveIcon />}>Enregistrer</Button>
    );



};
export default SaveButton;

