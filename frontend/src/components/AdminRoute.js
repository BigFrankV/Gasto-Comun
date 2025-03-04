import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    
    return token && userRole === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
