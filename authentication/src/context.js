import { createContext, useState } from 'react';

export const UserContext = createContext();
export function UserContextProvider({ children, ...props }) {
    const [userData, setUserData] = useState({});

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {children}
        </UserContext.Provider>
    );
};

export const DocumentsContext = createContext();
export function DocumentsContextProvider({ children, ...props }) {
    const [documents, setDocuments] = useState([]);

    return (
        <DocumentsContext.Provider value={[documents, setDocuments]}>
            {children}
        </DocumentsContext.Provider>
    );
};