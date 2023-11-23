import { createContext, useRef, useState } from 'react';

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

    const addToolTip = (toolTip) => {
        setToolTips((prevToolTips) => [...prevToolTips, toolTip]);
    };

    const removeToolTip = (removeToolTip) => {
        setToolTips((prevToolTips) => prevToolTips.filter((toolTip) => toolTip.id !== removeToolTip.id));
    };

    return (
        <ToolTipsContext.Provider value={[addToolTip, removeToolTip, toolTips]}>
            {children}
        </ToolTipsContext.Provider>
    );
}



export const TutorialRefsContext = createContext();
export function TutorialRefsContextProvider({ children }) {
    const homeButtonRef = useRef();
    const loginButtonRef = useRef();
    const signupButtonRef = useRef();
    const accountButtonRef = useRef();
    const viewCoursesRef = useRef();

    return (
        <TutorialRefsContext.Provider value={{
            homeButtonRef: homeButtonRef,
            loginButtonRef: loginButtonRef,
            signupButtonRef: signupButtonRef,
            accountButtonRef: accountButtonRef,
            viewCoursesRef: viewCoursesRef,
        }}>
            {children}
        </TutorialRefsContext.Provider>
    );
}