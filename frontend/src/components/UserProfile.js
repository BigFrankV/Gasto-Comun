import React, { useEffect, useState } from "react";
import axios from "axios";
import { setUserData } from "../utils/user"; // ✅ Eliminamos clearUserData
import "../style/UserProfile.css";

const UserProfile = () => {
  const [userData, setUserDataState] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/usuarios/me/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setUserDataState(response.data);
        setUserData(response.data); // ✅ Guardamos los datos del usuario
      })
      .catch((error) => {
        console.error("Error al obtener datos del usuario:", error);
        setError("No se pudo cargar la información del usuario.");
      });
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!userData) return <div className="loading">Cargando...</div>;

  return (
    <div className="profile-container">
      <h1>Bienvenido, {userData.username}</h1>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserProfile;
