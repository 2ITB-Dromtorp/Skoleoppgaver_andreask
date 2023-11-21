import { useContext } from 'react';
import { UserDataContext } from './context';

export function useResetUserData() {
    const { 1: setUserData } = useContext(UserDataContext);
    const refreshUserData = useRefreshUserData();
    return () => {
        setUserData({});
        refreshUserData();
    }
}

export function useRefreshUserData() {
    const { 1: setUserData } = useContext(UserDataContext);
    return () => {
        fetch('/api/getsession', {
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