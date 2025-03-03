import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, clearUserData } from "../utils/user";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import "../style/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  useEffect(() => {
    const storedUser = getUserData();
    console.log("Usuario guardado en localStorage:", storedUser);
    setUserData(storedUser);
  }, []);

  const handleLogout = () => {
    clearUserData();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      {/* Navbar fija */}
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h1 className="navbar-title mx-auto">Gestión de Gastos Comunes</h1>

          {/* Icono de perfil con evento para abrir modal */}
          <div className="profile-icon" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
            <img src="/perfil-icon.png" alt="Perfil" className="profile-img" />
          </div>
        </div>
      </nav>

      {/* Sidebar fijo */}
      <div className="sidebar">
        <h2>Menú</h2>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/gasto-comun">Gasto Común</Link></li>
          <li><Link to="/multas">Multas</Link></li>
          <li><Link to="/notificaciones">Notificaciones</Link></li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <h2>Bienvenido, {userData ? userData.username : "Usuario"}</h2>
        <p>Esperamos que tengas un gran día gestionando tus gastos.</p>
      </div>

      {/* Modal de Perfil */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5>Opciones</h5>
            <Link to="/perfil" className="btn btn-primary w-100 mb-2">
              Ir al Perfil
            </Link>
            <button className="btn btn-danger w-100" onClick={handleLogout}>
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
