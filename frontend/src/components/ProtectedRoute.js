import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../utils/user";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const userData = getUserData();
    
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userData?.role)) {
        // Si el usuario no tiene el rol requerido, redirigir a una ruta por defecto
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
