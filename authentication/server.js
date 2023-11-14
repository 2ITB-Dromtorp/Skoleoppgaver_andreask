const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mysql = require('mysql2');

const app = express();

const saltRounds = 10;

const maxAuthCookieAge = 30 * 24 * 60 * 60 * 1000;


//doxxing myself 🤡🤡🤡


const os = require('os');

const nets = os.networkInterfaces();

let getOwnIP;

for (const name of Object.keys(nets)) {
    if (getOwnIP !== undefined) {
        break;
    }
    if (name !== 'Wi-Fi') {
        continue;
    }
    for (const net of nets[name]) {
        const v4Type = typeof (net.family) === 'string' ? 'IPv4' : 4;
        if (net.family === v4Type && net.internal === false) {
            getOwnIP = net.address;
            break;
        }
    }
}






const IP = '127.0.0.1';//getOwnIP;
const PORT = 80;

let dbConfig = {
    host: IP,
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'doctor',
};

const pool = mysql.createPool(dbConfig);





//for blocking devious people🤡🤡🤡
const bannedIPs = [];

function isIPBanned(req, res) {
    if (req.socket.remoteAddress in bannedIPs) {
        res.status(403).send('Your IP is blocked.');
        return true;
    }
    return false;
}



//haker 🕵️🕵️🕵️
function generateAuthToken() {
    return crypto.randomBytes(256).toString('base64');
}





//serv
const server = http.createServer(app);

//listen🙉🙉🙉🙉
server.listen(PORT, IP, () => console.log(`Server listening to: http://${IP}:${PORT}/`));




function isValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}





//silly
const API_URL_EXTENSION = '/api';

function getAPIURL(url) {
    return API_URL_EXTENSION + url;
}



//urls that need authentication
const APIURLS = [
    getAPIURL('/signup'),
    getAPIURL('/login'),
    getAPIURL('/logout'),
    getAPIURL('/documents'),
    getAPIURL('/document'),
    getAPIURL('/getsession'),
    getAPIURL('/createdocument'),
];
const verifyURLS = [
    getAPIURL('/documents'),
    getAPIURL('/createdocument'),
];








function verifyRequestUser(req, user) {
    const token = req.cookies.auth;//🍪🍪🍪
    let foundToken = false;
    for (let j = 0; j < user.sessions.length; j++) {
        const session = user.sessions[j];
        if (session.token === token) {
            foundToken = true;
            break;
        }
    }

    return foundToken;
}



function verifyRequest(req) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (err, users) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                let matchedUser;
                for (let i = 0; i < users.length; i++) {
                    const user = users[i];

                    const foundToken = verifyRequestUser(req, user);

                    if (foundToken === true) {
                        matchedUser = user;
                        break;
                    }
                }
                if (matchedUser !== undefined) {
                    req.user = matchedUser;
                    resolve(matchedUser);
                } else {
                    resolve();
                }
            }
        });
    });
}



//stuff to use ⚒️🛠️🔨⛏️🪚🔧

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
    if (isIPBanned(req, res)) {
        console.log(`Blocked request ${req.socket.remoteAddress}`);
    } else {
        next();
    }
});

const ipRequests = {};


//rate limit
app.use((req, res, next) => {
    const ip = req.socket.remoteAddress;
    let curRequests = ipRequests[ip];
    if (curRequests === undefined) {
        curRequests = {
            ip: ip,
            requests: {
                content: [],
                api: [],
            },
        };
        ipRequests[ip] = curRequests;
    }
    const curIsAPI = APIURLS.includes(req.path);
    let requestType;
    let maxRate;
    //to prevent breach and malicious use, only allow 100 per minute
    //content loads a lot and 2000 seems fair
    if (curIsAPI === true) {
        requestType = 'api';
        maxRate = 100;
    } else if (curIsAPI === false) {
        requestType = 'content';
        maxRate = 2000;
    }
    const requests = curRequests.requests[requestType];
    const now = Date.now();
    const pushRequest = () => {
        requests.push({
            url: req.url,
            date: now,
        });
        next();
    }
    if (requests.length > 0) {
        let amount = 0;
        for (let i = 0; i < requests.length; i++) {
            const request = requests[i];
            //collect all the last minute
            if ((now - request.date) <= 60 * 1000) {
                amount += 1;
            }
        }
        if (amount <= maxRate) {
            pushRequest();
        } else {
            res.status(429).send('Too many requests');
        }
    } else {
        pushRequest();
    }
});

//authenticate
app.use((req, res, next) => {
    if (verifyURLS.includes(req.path)) {
        verifyRequest(req).then((matchedUser) => {
            if (matchedUser) {
                next();
            } else {
                res.status(400).send('No user with that token.');
            }
        })
    } else {
        next();
    }
});


//refreshing cookie
/*
app.use((req, res, next) => {
    if (verifyURLS.includes(req.path)) {
        if (req.session.cookie) {
            const now = Date.now();
            const maxAge = req.session.cookie.maxAge || 0;
            const lastRefresh = req.session.cookie.lastRefresh || now;

            if (now - lastRefresh >= maxAge) {
                res.status(401).send('Unauthorized');
            } else {
                //refresh if lifetime is less or equal to 50%
                req.session.cookie.lastAccess = now;
                if (now - lastRefresh >= maxAge * 0.5) {
                    req.session.cookie.lastRefresh = now;
                }

                next();
            }
        } else {
            res.status(401).send('Unauthorized');
        }
    } else {
        next();
    }
});
*/




function hasNumber(str) {
    return /\d/.test(str);
}

function hasLowerCaseLetters(str) {
    return /[a-z]/.test(str);
}

function hasUpperCaseLetters(str) {
    return /[A-Z]/.test(str);
}



//the apis




//sign up
app.post(getAPIURL('/signup'), async (req, res) => {
    const q = req.body;
    const username = q.username;
    const password = q.password;

    if (username === undefined) {
        res.status(400).send(`Username is undefined.`);
        return;
    }
    if (password === undefined) {
        res.status(400).send(`Password is undefined.`);
        return;
    }
    if (username === null) {
        res.status(400).send(`Username is null.`);
        return;
    }
    if (password === null) {
        res.status(400).send(`Password is null.`);
        return;
    }
    if (typeof (username) !== 'string') {
        res.status(400).send(`Username isn't of type 'String'.`);
        return;
    }
    if (typeof (password) !== 'string') {
        res.status(400).send(`Password isn't of type 'String'.`);
        return;
    }
    if (username.length < 3) {
        res.status(400).send(`Username can't be shorter than 3 characters.`);
        return;
    }
    if (password.length < 8) {
        res.status(400).send(`Password can't be shorter than 8 characters.`);
        return;
    }
    if (hasNumber(password) === false) {
        res.status(400).send(`Password must include at least 1 number.`);
        return;
    }
    if (hasLowerCaseLetters(password) === false) {
        res.status(400).send(`Password must include at least 1 lower case letter.`);
        return;
    }
    if (hasUpperCaseLetters(password) === false) {
        res.status(400).send(`Password must include at least 1 upper case letter.`);
        return;
    }

    pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, users) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            if (users.length > 0) {
                res.status(400).send('User already exists.');
            } else {
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                pool.query('INSERT INTO users (id, username, password, sessions) VALUES (?, ?, ?, ?)', [null, username, hashedPassword, JSON.stringify([])], (err) => {
                    if (err) {
                        console.error(err);
                        res.status(400).send(err);
                    } else {
                        res.status(200).send('Successfully signed up.');
                    }
                });
            }
        }
    });
});



//log in 🕵️🕵️🕵️🕵️
app.post(getAPIURL('/login'), async (req, res) => {
    const q = req.body;
    const username = q.username;
    const password = q.password;

    if (username === undefined || username === null || password === undefined || password === null) {
        res.status(400).send(`User and/or password doesn't exist.`);
        return;
    }
    if (typeof (username) !== 'string' || typeof (password) !== 'string') {
        res.status(400).send(`User and/or password isn't of type 'String'.`);
        return;
    }

    pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, users) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            if (users.length === 0) {
                res.status(400).send('User not found.');
            }
            for (let i = 0; i < users.length; i++) {
                const user = users[i];

                const success = await bcrypt.compare(password, user.password);

                if (success) {
                    const token = generateAuthToken();//🖥️🕵️
                    user.sessions.push({
                        date: Date.now(),
                        token: token,
                    });
                    pool.query('UPDATE users SET sessions = ? WHERE id = ?', [JSON.stringify(user.sessions), user.id], () => {
                        if (err) {
                            console.error(err);
                            res.status(400).send(err);
                        } else {
                            res.cookie('auth', token, {
                                maxAge: maxAuthCookieAge,
                                httpOnly: true,
                                secure: true,
                                sameSite: 'lax',
                            });
                            res.status(200).send('Successfully logged in');
                        }
                    });
                } else {
                    res.status(400).send('Incorrect username or password.');
                }
            }
        }
    });
});

//logout
app.post(getAPIURL('/logout'), (req, res) => {
    res.cookie('auth', undefined, {
        expires: 0,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });
    res.status(200).send('Successfully logged out');
});

//session
app.get(getAPIURL('/getsession'), (req, res) => {
    if (req.cookies.auth) {
        res.status(200);
        res.send({
            logged_in: true,
        });
    } else {
        res.status(200);
        res.send({
            logged_in: false,
        });
    }
});






//create document
app.post(getAPIURL('/createdocument'), (req, res) => {
    const body = req.body;
    const name = body.name;
    if (name === undefined) {
        res.status(400).send(`Name is undefined.`);
        return;
    }
    if (name === null) {
        res.status(400).send(`Name is null.`);
        return;
    }
    if (typeof (name) !== 'string') {
        res.status(400).send(`Name isn't of type 'String'.`);
        return;
    }
    const content = body.content;
    if (content === undefined) {
        res.status(400).send(`Content is undefined.`);
        return;
    }
    if (content === null) {
        res.status(400).send(`Content is null.`);
        return;
    }
    if (typeof (content) !== 'string') {
        res.status(400).send(`Content isn't of type 'String'.`);
        return;
    }
    if (isValidJSONString(content) === false) {
        res.status(400).send(`Content isn't valid JSON string.`);
        return;
    }

    console.log(content)

    const userRights = [
        {
            user_id: req.user.id,
            rights: [
                'admin',
            ],
        },
    ];
    pool.query('INSERT INTO documents (id, name, content, user_rights) VALUES (?, ?, ?, ?)', [null, name, content, JSON.stringify(userRights)], (err, sqlRes) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(JSON.stringify({
                id: sqlRes.insertId,
            }));
        }
    });
});

//save document
app.put(getAPIURL('/savedocument'), (req, res) => {
    const body = req.body;
    const docId = body.id;
    if (docIdStr === undefined) {
        res.status(400).send('Document id is undefined.');
        return;
    }
    if (docIdStr === null) {
        res.status(400).send('Document id is null.');
        return;
    }
    if (typeof (docId) !== 'number') {
        res.status(400).send(`Document id is not of type 'Number'.`);
        return;
    }
    const content = body.content;
    if (content === undefined) {
        res.status(400).send('Content is undefined.');
        return;
    }
    if (content === null) {
        res.status(400).send('Content is null.');
        return;
    }
    if (typeof (content) !== 'object') {
        res.status(400).send(`Content is not of type 'object'.`);
        return;
    }
    if (Array.isArray(content) === false) {
        res.status(400).send(`Content is not array.`);
        return;
    }
    pool.query('SELECT * FROM documents WHERE id = ?', [docId], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            if (data.length === 0) {
                res.status(404).send('No document with requested id.');
                return;
            }

            const doc = data[0];

            const sendDocument = () => {
                res.status(200).send(JSON.stringify(doc));
            }

            if (doc.isPublic) {
                sendDocument();
                return;
            } else {
                verifyRequest(req).then((user) => {
                    if (user === undefined) {
                        res.status(403).send(`You are not authorized to view this document.`);
                        return;
                    }

                    const userRights = doc.user_rights;
                    let matchedRights;
                    for (let i = 0; i < userRights.length; i++) {
                        const rights = userRights[i];
                        if (rights.user_id === user.id) {
                            matchedRights = rights;
                        }
                    }

                    if (matchedRights) {
                        sendDocument();
                    } else {
                        res.status(403).send(`You are not authorized to view this document.`);
                        return;
                    }
                    //res.status(403).send('You do not have access to this document.');
                });
            }
        }
    })
});


//document
app.get(getAPIURL('/document'), (req, res) => {
    const query = req.query;
    const docIdStr = query.id;
    if (docIdStr === undefined) {
        res.status(400).send('Document id is undefined.');
        return;
    }
    if (docIdStr === null) {
        res.status(400).send('Document id is null.');
        return;
    }
    if (typeof (docIdStr) !== 'string') {
        res.status(400).send(`Document id is not of type 'String'.`);
        return;
    }
    const docId = Number(docIdStr);
    if (isNaN(docId)) {
        res.status(400).send(`Parsed document id is NaN.`);
        return;
    }
    if (typeof (docId) !== 'number') {
        res.status(400).send(`Parsed document id is not of type 'Number'.`);
        return;
    }
    pool.query('SELECT * FROM documents WHERE id = ?', [docId], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            if (data.length === 0) {
                res.status(404).send('No document with requested id.');
                return;
            }

            const doc = data[0];

            const sendDocument = () => {
                res.status(200).send(JSON.stringify(doc));
            }

            if (doc.isPublic) {
                sendDocument();
                return;
            } else {
                verifyRequest(req).then((user) => {
                    if (user === undefined) {
                        res.status(403).send(`You are not authorized to view this document.`);
                        return;
                    }

                    const userRights = doc.user_rights;
                    let matchedRights;
                    for (let i = 0; i < userRights.length; i++) {
                        const rights = userRights[i];
                        if (rights.user_id === user.id) {
                            matchedRights = rights;
                        }
                    }

                    if (matchedRights) {
                        sendDocument();
                    } else {
                        res.status(403).send(`You are not authorized to view this document.`);
                        return;
                    }
                });
            }
        }
    });
});


//documents
app.get(getAPIURL('/documents'), (req, res) => {
    pool.query('SELECT * FROM documents', async (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            const documentsToSend = [];

            let triedToVerify = false;
            let user;
            for (let i = 0; i < data.length; i++) {
                const doc = data[i];

                if (doc.isPublic) {
                    documentsToSend.push(doc);
                    return;
                } else {
                    if (triedToVerify === false) {
                        user = await verifyRequest(req);
                    } else {
                        if (user === undefined) {
                            continue;
                        }
                    }
                    const userRights = doc.user_rights;
                    let matchedRights;
                    for (let i = 0; i < userRights.length; i++) {
                        const rights = userRights[i];
                        if (rights.user_id === user.id) {
                            matchedRights = rights;
                        }
                    }

                    if (matchedRights) {
                        documentsToSend.push(doc);
                    }
                }
            }
            res.status(200).send(documentsToSend);
        }
    });
});