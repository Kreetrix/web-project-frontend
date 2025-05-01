import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);  // added this    NEED FIX

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (accessToken, userData) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);