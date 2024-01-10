import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';






const RelativeAlertComponent = ({props}) => {
    return (
    <Alert severity={props.severity}>
        <AlertTitle>{props.severity.toUpperCase()}</AlertTitle>
        {props.msg}
    </Alert>
    )
};

export default RelativeAlertComponent;