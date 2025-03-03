// frontend/src/utils/user.js

export const getUserData = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};

export const setUserData = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
};

export const clearUserData = () => {
    localStorage.removeItem("userData");
};
