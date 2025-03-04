import React from 'react';
import { getUserData } from "../utils/user";
import imgUser from "../assets/imagenes/img-user-basico-perfil-navbar.png";
import imgAdmin from "../assets/imagenes/img-admin-perfil-navbar.png";
import "../style/Navbar.css";

const Navbar = ({ setShowModal }) => {
  const userData = getUserData();
  const profileImage = userData?.tipo_usuario === "admin" ? imgAdmin : imgUser;

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="navbar-title mx-auto">Gestión de Gastos Comunes</h1>
        <div className="profile-icon" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
          <img src={profileImage} alt="Perfil" className="profile-img" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
