import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PerfilUsuario from "./components/PerfilUsuario";
import GestionUsuarios from "./components/admin/GestionUsuarios";
import GestionGastos from "./components/admin/GestionGastos";
import GastosUsuario from "./components/user/GastosUsuario";

import Navigation from "./components/Navigation";

const App = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<LoginForm />} />

                {/* Rutas protegidas generales */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/perfil" element={<PerfilUsuario />} />
                </Route>

                {/* Rutas protegidas para administradores */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<Home />} />
                    <Route path="/admin/usuarios" element={<GestionUsuarios />} />
                    <Route path="/admin/gastos" element={<GestionGastos />} />
                </Route>

                {/* Rutas protegidas para usuarios básicos */}
                <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                    <Route path="/user" element={<Home />} />
                    <Route path="/mis-gastos" element={<GastosUsuario />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
