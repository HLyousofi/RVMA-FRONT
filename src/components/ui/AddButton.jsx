import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const AddButtonLink = ({link, icon }) => {

    return (
        <Link to={link} ><Button variant="contained" startIcon={icon} color="success" >Ajouter</Button></Link>
    );
};
export default AddButtonLink;

export const AddButton = ({ icon, onClick }) => {

    return (
        <Button variant="contained" startIcon={icon} color="success" onClick={onClick}  >Ajouter</Button>
    );
};

