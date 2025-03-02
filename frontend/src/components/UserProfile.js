import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/usuarios/me/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }, []);

  if (!userData) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Bienvenido, {userData.username}</h1>
      {userData.groups.includes('Admin') && (
        <div>
          <h2>Acceso Admin</h2>
          {/* Contenido exclusivo para administradores */}
        </div>
      )}
      {userData.groups.includes('Usuario') && (
        <div>
          <h2>Acceso Usuario</h2>
          {/* Contenido exclusivo para usuarios */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
