import { createContext, useState } from 'react';

export const SessionDataContext = createContext();
export function SessionDataContextProvider({ children }) {
    const [sessionData, setSessionData] = useState({});

    return (
        <SessionDataContext.Provider value={[sessionData, setSessionData]}>
            {children}
        </SessionDataContext.Provider>
    );
}

export const UserDataContext = createContext();
export function UserDataContextProvider({ children }) {
    const [userData, setUserData] = useState();

    return (
        <UserDataContext.Provider value={[userData, setUserData]}>
            {children}
        </UserDataContext.Provider>
    );
}

export const ToolTipsContext = createContext();
export function ToolTipsContextProvider({ children }) {
    const [toolTips, setToolTips] = useState([]);

    return (
        <ToolTipsContext.Provider value={[toolTips, setToolTips]}>
            {children}
        </ToolTipsContext.Provider>
    );
}