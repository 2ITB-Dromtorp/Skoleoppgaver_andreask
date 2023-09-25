export const setUsers = (users) => {
    const response = {};
    localStorage.setItem('users', JSON.stringify(users));
    response.success = true;
    return response;
}

export const getUsers = () => {
    const response = {};
    const gotUsers = localStorage.getItem('users');
    if (gotUsers !== null) {
        response.users = JSON.parse(gotUsers);
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}

export const getNewUserId = () => {
    const response = {};
    const usersResponse = getUsers();
    if (usersResponse.success === true) {
        const users = usersResponse.users;
        let res = 0;
        for (let i = 0; i < users.length; i++) {
            const curUser = users[i];
            const checkId = curUser.userId;
            if (checkId > res) {
                res = checkId;
            }
        }
        response.userId = res + 1;
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}

export const addUser = (user) => {
    const response = {};
    const usersResponse = getUsers();
    if (usersResponse.success === true) {
        const users = usersResponse.users;
        users.push(user);
        setUsers(users);
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}

export const removeUser = (user) => {
    const response = {};
    const usersResponse = getUsers();
    if (usersResponse.success === true) {
        const users = usersResponse.users;
        users.splice(users.indexOf(user), 1);
        setUsers(users);
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}

export const createUserData = (username, email, password) => {
    const response = {};
    const newIdResponse = getNewUserId();
    if (newIdResponse.success === true) {
        response.user = {
            username: username,
            email: email,
            password: password,
            userId: newIdResponse.userId,
        };
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}

export const createUser = (username, email, password) => {
    const response = {};
    const newUserResponse = createUserData(username, email, password);
    if (newUserResponse.success === true) {
        const addUserResponse = addUser(newUserResponse.user);
        if (addUserResponse.success === true) {
            response.success = true;
        } else {
            response.success = false;
        }
    } else {
        response.success = false;
    }
    return response;
}

export const getUserFromName = (username) => {
    const response = {};
    const usersResponse = getUsers();
    if (usersResponse.success === true) {
        const users = usersResponse.users;
        let res;
        for (let i = 0; i < users.length; i++) {
            const curUser = users[i];
            if (curUser.username === username) {
                res = curUser;
                break;
            }
        }
        response.user = res;
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}

export const getUserFromId = (userId) => {
    const response = {};
    const usersResponse = getUsers();
    if (usersResponse.success === true) {
        const users = usersResponse.users;
        let res;
        for (let i = 0; i < users.length; i++) {
            const curUser = users[i];
            if (curUser.userId === userId) {
                res = curUser;
                break;
            }
        }
        response.user = res;
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}

export const doesUserExist = (name) => {
    const response = {};
    const userResponse = getUserFromName(name);
    if (userResponse.success === true) {
        const user = userResponse.user;
        response.exists = user !== undefined;
        response.success = true;
    } else {
        response.success = false;
    }
    return response;
}

export const checkUserPasswordCorrect = (name, password) => {
    const response = {};
    const userResponse = getUserFromName(name);
    if (userResponse.success === true) {
        const user = userResponse.user;
        let res;
        if (user !== undefined) {
            res = user[0].password === password;
        }
        response.password_matches = res;
    }

    return response;
}

const checkUsers = localStorage.getItem('users');
if (checkUsers === null) {
    setUsers([]);
}