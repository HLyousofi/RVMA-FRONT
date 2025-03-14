import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const AddButton = ({link, icon }) => {

    return (
        <Link to={link} ><Button variant="contained" startIcon={icon} color="success" >Ajouter</Button></Link>
    );
};
export default AddButton;

