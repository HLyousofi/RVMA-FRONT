import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddButton from "../../../components/ui/AddButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';





const ManageRoles = () => {

    const endPointEdit = "roleForm";
    return (
        
        // <AddButton link={endPointEdit} icon={<AddCircleOutlineIcon />} />
        <div className="relative w-full px-2 max-w-full flex-grow flex-1 text-right">
                                    <AddButton link={endPointEdit} icon={<AddCircleOutlineIcon />} />
                                </div>


    );
}

export default ManageRoles;