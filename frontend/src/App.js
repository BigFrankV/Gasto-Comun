import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />

                {/* Rutas protegidas generales */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/perfil" element={<UserProfile />} />
                </Route>

                {/* Rutas protegidas por rol */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<Home />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                    <Route path="/user" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
