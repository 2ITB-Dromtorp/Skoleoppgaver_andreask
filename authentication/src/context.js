import { createContext, useState } from 'react';

export const UserContext = createContext();
export function ContextProvider({ children, ...props }) {
    const [userData, setUserData] = useState({});

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {children}
        </UserContext.Provider>
    );
};