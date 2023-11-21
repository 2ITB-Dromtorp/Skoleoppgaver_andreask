import { createContext, useState } from 'react';

export const SessionDataContext = createContext();
export function SessionDataContextProvider({ children, ...props }) {
    const [sessionData, setSessionData] = useState({});

    return (
        <SessionDataContext.Provider value={[sessionData, setSessionData]}>
            {children}
        </SessionDataContext.Provider>
    );
}

export const UserDataContext = createContext();
export function UserDataContextProvider({ children, ...props }) {
    const [userData, setUserData] = useState();

    return (
        <UserDataContext.Provider value={[userData, setUserData]}>
            {children}
        </UserDataContext.Provider>
    );
}

export const DocumentsContext = createContext();
export function DocumentsContextProvider({ children, ...props }) {
    const [documents, setDocuments] = useState([]);

    return (
        <DocumentsContext.Provider value={[documents, setDocuments]}>
            {children}
        </DocumentsContext.Provider>
    );
}