import { getUserFromId } from './users';

export const setLogin = (id) => {
    const response = {};
    response.success = true;
    localStorage.setItem('login_id', JSON.stringify(id));
    return response;
}

export const getLogin = () => {
    const response = {};
    const gotId = localStorage.getItem('login_id');
    if (gotId !== null) {
        response.user = getUserFromId(gotId);
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}