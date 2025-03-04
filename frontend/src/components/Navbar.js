import React from 'react';
import { obtenerDatosUsuario } from "../utils/user";
import imgUsuario from "../assets/imagenes/img-user-basico-perfil-navbar.png";
import imgAdmin from "../assets/imagenes/img-admin-perfil-navbar.png";
import "../style/Navbar.css";

const BarraNavegacion = ({ setShowModal }) => {
  const datosUsuario = obtenerDatosUsuario();
  const imagenPerfil = datosUsuario?.tipo_usuario === "admin" ? imgAdmin : imgUsuario;

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="navbar-title mx-auto">Gestión de Gastos Comunes</h1>
        <div className="profile-icon" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
          <img src={imagenPerfil} alt="Perfil" className="profile-img" />
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
