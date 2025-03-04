import { Link } from 'react-router-dom';
// Keep using the original import

const Navegacion = () => {
    const rolUsuario = localStorage.getItem("rolUsuario");

    return (
        <nav>
            <Link to="/">Inicio</Link>
            
            {/* Enlaces para todos los usuarios autenticados */}
            {rolUsuario && (
                <>
                    <Link to="/perfil">Mi Perfil</Link>
                    <Link to="/mis-gastos">Mis Gastos</Link>
                </>
            )}
            
            {/* Enlaces solo para administradores */}
            {rolUsuario === "admin" && (
                <>
                    <Link to="/admin/usuarios">Gestionar Usuarios</Link>
                    <Link to="/admin/gastos">Gestionar Gastos</Link>
                </>
            )}
        </nav>
    );
};

export default Navegacion;
