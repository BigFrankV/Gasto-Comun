export const obtenerDatosUsuario = () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) return null;
    
    try {
        const datosToken = JSON.parse(atob(token.split('.')[1]));
        console.log("Datos del token decodificado:", datosToken);
        const datosUsuario = {
            nombreUsuario: datosToken.username,
            email: datosToken.email,
            es_superusuario: datosToken.is_superuser,
            tipo_usuario: datosToken.tipo_usuario
        };
        
        localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        return datosUsuario;
        
    } catch (error) {
        console.error("Error al procesar datos del usuario:", error);
        return null;
    }
};

export const guardarDatosUsuario = (datos) => {
    localStorage.setItem("datosUsuario", JSON.stringify({
        email: datos.email,
        username: datos.username,
        tipo_usuario: datos.tipo_usuario,
        is_superuser: datos.is_superuser
    }));
};


export const limpiarDatosUsuario = () => {
    localStorage.removeItem("datosUsuario");
    localStorage.removeItem("token");
};

