import React, { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// Custom Hook to use the User Context
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap the app and provide the user context
export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null); // Email state to store the email of the logged-in user

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};