import { Button } from "@mui/material";
import { Link } from "react-router-dom";



const ManageRoles = () => {
    return (
        <Link to="/admin/mangeRoles/roleForm"><Button variant="contained">Ajouter</Button></Link>

    );
}

export default ManageRoles;