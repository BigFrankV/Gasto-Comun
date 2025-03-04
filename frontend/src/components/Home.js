import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerDatosUsuario, limpiarDatosUsuario } from "../utils/user.js";
import Navbar from './Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const datosAlmacenados = obtenerDatosUsuario();
    console.log("Datos completos:", datosAlmacenados);
    if (datosAlmacenados) {
      console.log("Datos del usuario:", datosAlmacenados);
      setUserData(datosAlmacenados);
    }
  }, []);

  const cerrarSesion = () => {
    limpiarDatosUsuario();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getTipoUsuario = (userData) => {
    if (userData?.is_superuser) return "Administrador";
    if (userData?.tipo_usuario === "admin") return "Administrador";
    return "Usuario Básico";
  };

  const renderMenuItems = () => {
    const itemsComunes = [
      { to: "/dashboard", text: "Dashboard" },
      { to: "/gasto-comun", text: "Gasto Común" },
      { to: "/multas", text: "Multas" },
      { to: "/notificaciones", text: "Notificaciones" },
    ];

    const itemsAdmin = [
      { to: "/admin/usuarios", text: "Gestión de Usuarios" },
      { to: "/admin/reportes", text: "Reportes" },
    ];

    return (
      <>
        {itemsComunes.map((item) => (
          <li key={item.to}><Link to={item.to}>{item.text}</Link></li>
        ))}
        {(userData?.is_superuser || userData?.tipo_usuario === "admin") && itemsAdmin.map((item) => (
          <li key={item.to}><Link to={item.to}>{item.text}</Link></li>
        ))}
      </>
    );
  };

  const isAdmin = userData?.is_superuser || userData?.tipo_usuario === "admin";

  return (
    <div className="home-container">
      <Navbar setShowModal={setShowModal} />
     
      <div className={`sidebar ${isAdmin ? 'admin-sidebar' : 'user-sidebar'}`}>
        <h2>Menú</h2>
        <ul>
          {renderMenuItems()}
        </ul>
      </div>

      <div className={`main-content ${isAdmin ? 'admin-content' : 'user-content'}`}>
        <div className={`welcome-banner ${isAdmin ? 'admin-banner' : 'user-banner'}`}>
          <h2>Bienvenido, {userData ? (userData.nombreUsuario || userData.email) : "Usuario"}</h2>
          <p className={`tipo-usuario ${isAdmin ? 'admin-badge' : 'user-badge'}`}>
            Tipo de usuario: {getTipoUsuario(userData)}
          </p>
          <p>Esperamos que tengas un gran día gestionando tus gastos.</p>
        </div>

        {isAdmin && (
          <div className="admin-dashboard-widgets">
            <div className="widget">
              <h3>Resumen de Usuarios</h3>
              {/* Contenido del widget de administrador */}
            </div>
            <div className="widget">
              <h3>Gastos Pendientes</h3>
              {/* Contenido del widget de administrador */}
            </div>
          </div>
        )}

        {!isAdmin && (
          <div className="user-dashboard-widgets">
            <div className="widget">
              <h3>Mis Gastos Pendientes</h3>
              {/* Contenido del widget de usuario */}
            </div>
            <div className="widget">
              <h3>Últimas Notificaciones</h3>
              {/* Contenido del widget de usuario */}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className={`modal-content ${isAdmin ? 'admin-modal' : 'user-modal'}`}>
            <h5>Opciones</h5>
            <Link to="/perfil" className={`btn w-100 mb-2 ${isAdmin ? 'btn-danger' : 'btn-primary'}`}>
              Ir al Perfil
            </Link>
            <button className="btn btn-danger w-100" onClick={cerrarSesion}>
              Cerrar Sesión
            </button>
            <button className="btn btn-secondary w-100 mt-2" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
