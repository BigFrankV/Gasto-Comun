import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
