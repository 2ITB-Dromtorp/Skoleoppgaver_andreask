import { useContext } from 'react';
import { SessionDataContext, UserDataContext, ToolTipsContext } from './context';



//session data
export function useResetSessionData() {
    const { 1: setSessionData } = useContext(SessionDataContext);
    const refreshSessionData = useRefreshSessionData();
    const resetUserData = useResetUserData();
    return () => {
        setSessionData({});
        resetUserData();
        refreshSessionData();
    }
}

export function useRefreshSessionData() {
    const { 1: setSessionData } = useContext(SessionDataContext);
    const refreshUserData = useRefreshUserData();
    return () => {
        fetch('/api/getsession', {
            method: 'GET',
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setSessionData(data);
                    if (data.logged_in) {
                        refreshUserData();
                    }
                });
            } else {
                console.error(res);
            }
        });
    }
}




//user data
export function useResetUserData() {
    const { 1: setUserData } = useContext(UserDataContext);
    return () => {
        setUserData();
    }
}

export function useRefreshUserData() {
    const { 1: setUserData } = useContext(UserDataContext);
    return () => {
        fetch('/api/getuserdata', {
            method: 'GET',
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setUserData(data);
                });
            } else {
                console.error(res);
            }
        });
    }
}




//tool tips
export function useAddToolTip() {
    const { 1: setToolTips } = useContext(ToolTipsContext);
    return (dir, interactive, attachRef, content) => {
        const toolTip = {
            dir: dir,
            interactive: interactive,
            attachRef: attachRef,
            content: content,
        };
        setToolTips((toolTips) => {
            toolTips.push(toolTip);
            return toolTips;
        });
        return toolTip;
    }
}

export function useRemoveToolTip() {
    const { 1: setToolTips } = useContext(ToolTipsContext);
    return (toolTip) => {
        setToolTips((toolTips) => {
            toolTips.splice(toolTips.indexOf(toolTip, 1));
            return toolTips;
        });
    }
}