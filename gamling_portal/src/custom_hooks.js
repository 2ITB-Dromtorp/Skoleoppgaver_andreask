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
export function useToolTip() {
    const [addToolTip, removeToolTip, toolTips] = useContext(ToolTipsContext);

    return (content, dir, interactive, attachRef) => {
        const id = toolTips.length;
        console.log("www", id)
        const toolTip = {
            id: id,
            dir: dir,
            interactive: interactive,
            content: content,
            attachRef: attachRef,
            destroy: () => removeToolTip(toolTip),
        }
        addToolTip(toolTip);

        return toolTip;
    }
};