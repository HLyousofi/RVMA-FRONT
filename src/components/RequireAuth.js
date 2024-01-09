import { Outlet, Navigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth";







const ResquireAuth = () => {
    const location = useLocation();
    const { apiToken } = useAuth();
    
    return (
        apiToken ? 
            <Outlet /> : <Navigate to='/' state={{ from : location }} replace />
    )
}

export default ResquireAuth;