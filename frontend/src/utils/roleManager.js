// roleManager.js
export const getUserRoles = () => {
    const token = localStorage.getItem('token');
    if (!token) return [];
  
    // Decodificar el token JWT si está presente
    const payload = JSON.parse(atob(token.split('.')[1]));  // Decodifica la parte del payload del JWT
    return payload.groups || []; // Retorna los grupos (roles) asociados al usuario
  }
  
  export const isAdmin = () => {
    const roles = getUserRoles();
    return roles.includes('Admin'); // Verifica si el usuario tiene el rol de Admin
  }
  
  export const isUser = () => {
    const roles = getUserRoles();
    return roles.includes('Usuario'); // Verifica si el usuario tiene el rol de Usuario
  }
  
  export const isAuthorized = (allowedRoles) => {
    const roles = getUserRoles();
    return allowedRoles.some(role => roles.includes(role)); // Permite verificar si el usuario tiene uno de los roles permitidos
  }
  