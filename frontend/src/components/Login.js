import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/dashboard");  // Redirigir después del login
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-5 shadow rounded bg-light">
                <LoginForm onLogin={handleLogin} />
            </div>
        </div>
    );
};

export default Login;
