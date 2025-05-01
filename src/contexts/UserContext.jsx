import { createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);                     /* TODO - add data from db with context */


    const updateProfile = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = { user, updateProfile };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
