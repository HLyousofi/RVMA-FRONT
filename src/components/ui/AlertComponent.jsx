import { useEffect, useState } from "react";
import useAlert from "../../hooks/useAlert";
import { Alert, Snackbar} from "@mui/material";



const AlertComponent = () => {
     const [activeAlert, setActiveAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const {alert} = useAlert();

    useEffect(() => {
        setMessage(alert.message);
        setType(alert.type);
        setActiveAlert(alert.active);
    },[alert])

    useEffect(() => {
        setTimeout(() => {
        setActiveAlert(false);
        },6000);
    },[activeAlert])


    return (
        <Snackbar open={activeAlert}   >
            <Alert  severity={type} >
                {message}
            </Alert>
        </Snackbar>
    )
}
export default AlertComponent;