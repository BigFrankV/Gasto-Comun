import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config";

const PerfilUsuario = () => {
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    const obtenerPerfilUsuario = async () => {
      const token = localStorage.getItem("token");
      try {
        const respuesta = await fetch(API_ENDPOINTS.USER_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const datos = await respuesta.json();
        setDatosUsuario(datos);
      } catch (error) {
        console.error("Error al obtener perfil de usuario:", error);
      }
    };

    obtenerPerfilUsuario();
  }, []);

  return (
    <div className="perfil-usuario">
      {datosUsuario ? (
        <>
          <h2>Perfil de Usuario</h2>
          <div className="info-perfil">
            <p><strong>Nombre de Usuario:</strong> {datosUsuario.username}</p>
            <p><strong>Correo Electrónico:</strong> {datosUsuario.email}</p>
            <p><strong>Nombre:</strong> {datosUsuario.first_name}</p>
            <p><strong>Apellido:</strong> {datosUsuario.last_name}</p>
          </div>
        </>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default PerfilUsuario;
