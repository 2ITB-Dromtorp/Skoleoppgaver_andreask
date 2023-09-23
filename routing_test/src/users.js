export const setUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
}

export const getUsers = () => {
    return JSON.parse(localStorage.getItem('users'));
}

export const getNewUserId = () => {
    const users = getUsers();
    let res = users[0].userId;
    for (let i = 1; i < users.length; i++) {
        const curUser = users[i];
        const checkId = curUser.userId
        if (checkId > res) {
            res = checkId;
        }
    }
    return res;
}

export const addUser = (user) => {
    const users = getUsers();
    users.push(user);
    setUsers(users);
}

export const removeUser = (user) => {
    const users = getUsers();
    users.splice(users.indexOf(user), 1);
    setUsers(users);
}

export const createUserData = (username, email, password) => {
    return {
        username: username,
        email: email,
        password, password,
    };
}

export const createUser = (username, email, password) => {
    addUser(createUserData(username, email, password));
}

export const getUserFromName = (username) => {
    const users = getUsers();
    let res;
    let resInd;
    for (let i = 0; i < users.length; i++) {
        const curUser = users[i];
        if (curUser.username === username) {
            res = curUser;
            resInd = i;
            break;
        }
    }
    return [res, resInd];
}

export const getUserFromId = (userId) => {
    const users = getUsers();
    let res;
    let resInd;
    for (let i = 0; i < users.length; i++) {
        const curUser = users[i];
        if (curUser.userId === userId) {
            res = curUser;
            resInd = i;
            break;
        }
    }
    return [res, resInd];
}

export const doesUserExist = (name) => {
    const user = getUserFromName(name);
    let res;
    if (user !== undefined) {
        res = user[0] !== undefined;
    }
    return res;
}

export const checkUserPasswordCorrect = (name, password) => {
    const user = getUserFromName(name);
    let res;
    if (user !== undefined) {
        res = user[0].password === password;
    }
    return res;
}

const checkUsers = localStorage.getItem('users');
if (checkUsers === null) {
    setUsers([]);
}