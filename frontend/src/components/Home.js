import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la Gestión de Gastos Comunes</h1>
      <p>Accede para gestionar tus gastos.</p>
      <Link to="/login">
        <button>Iniciar Sesión</button>
      </Link>
    </div>
  );
};

export default Home;
