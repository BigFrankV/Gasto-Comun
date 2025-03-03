import { useState } from "react";
import { API_ENDPOINTS } from "../config";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_ENDPOINTS.LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email,  // Django usa "username", aunque sea un email
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.access); // Guardar token JWT
                navigate("/dashboard");  // Redirigir al usuario autenticado
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (error) {
            setError("Error en el servidor");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default LoginForm;
