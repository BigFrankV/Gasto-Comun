import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';  // Asegúrate de que axios está configurado correctamente

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login/', { username, password });
      localStorage.setItem('token', response.data.access); // Guarda el token
      navigate('/'); // Redirige a la página principal
    } catch (err) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

const handleLogin = async (event) => {
  event.preventDefault();

  const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username: usuario,  // Reemplaza por tu estado de usuario
          password: password  // Reemplaza por tu estado de contraseña
      }),
  });

  if (response.ok) {
      const data = await response.json();
      console.log("Token recibido:", data);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      alert("Login exitoso");
  } else {
      alert("Credenciales incorrectas");
  }
};


export default Login;
