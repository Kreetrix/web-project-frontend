import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in on app load
        const accessToken = localStorage.getItem("accessToken");
        setIsLoggedIn(!!accessToken);
    }, []);

    const login = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);