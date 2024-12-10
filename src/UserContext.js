import React, { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// Custom Hook to use the User Context
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap the app and provide the user context
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ id: null, email: null });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};