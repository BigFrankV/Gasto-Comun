export const getUserInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const base64Url = token.split(".")[1]; // Extraer el payload del token
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64)); // Decodificar

        return payload; // Retorna los datos del usuario
    } catch (error) {
        return null;
    }
};
