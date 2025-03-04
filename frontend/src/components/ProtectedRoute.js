import { Navigate, Outlet } from "react-router-dom";
import { obtenerDatosUsuario } from "../utils/user";

const RutaProtegida = ({ rolesPermitidos }) => {
    const token = localStorage.getItem("token");
    const datosUsuario = obtenerDatosUsuario();
   
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (rolesPermitidos && !rolesPermitidos.includes(datosUsuario?.tipo_usuario)) {
        // Si el usuario no tiene el rol requerido, redirigir a ruta no autorizada
        return <Navigate to="/no-autorizado" />;
    }

    return <Outlet />;
};

export default RutaProtegida;
