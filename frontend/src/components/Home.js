import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, clearUserData } from "../utils/user";
import Navbar from './Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUser = getUserData();
    setUserData(storedUser);
  }, []);

  const handleLogout = () => {
    clearUserData();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <Navbar setShowModal={setShowModal} />
      
      <div className="sidebar">
        <h2>Menú</h2>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/gasto-comun">Gasto Común</Link></li>
          <li><Link to="/multas">Multas</Link></li>
          <li><Link to="/notificaciones">Notificaciones</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <h2>Bienvenido, {userData ? userData.username : "Usuario"}</h2>
        <p>Esperamos que tengas un gran día gestionando tus gastos.</p>
      </div>

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
