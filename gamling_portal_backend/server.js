console.log('Node server started');

const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mysql = require('mysql2');

const app = express();

const saltRounds = 15;

const maxAuthCookieAge = 30 * 24 * 60 * 60 * 1000;



//getting device IP (for running project on LAN)
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

const dbConfig = {
    host: IP,
    port: 3307,
    user: 'gamling_portal',
    password: 'jdwamu83258JDJWdwaijdwajdwaijdwaij43853883283298ewjeejejejejejjeejjeejejejejeAIDWAJDOIWAJOIDWJA583275983275298',
    database: 'gamling_portal',
};

const mySqlConnection = mysql.createConnection(dbConfig);

mySqlConnection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Node server connected to MySQL database.');
    }
});




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
server.listen(PORT, IP, () => {
    console.log(`Node server listening to: http://${IP}:${PORT}/`);
});







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
    getAPIURL('/getsession'),
    getAPIURL('/joincourse'),
];
const verifyURLS = [
    getAPIURL('/logout'),
    getAPIURL('/joincourse'),
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
        mySqlConnection.query('SELECT * FROM users', (err, users) => {
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

    mySqlConnection.query('SELECT * FROM users WHERE username = ?', [username], (err, users) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            if (users.length > 0) {
                res.status(400).send('User already exists.');
            } else {
                bcrypt.hash(password, saltRounds).then((hash) => {
                    mySqlConnection.query('INSERT INTO users (id, username, password, sessions, joined_courses) VALUES (?, ?, ?, ?, ?)', [null, username, hash, JSON.stringify([]), JSON.stringify([])], (err) => {
                        if (err) {
                            console.error(err);
                            res.status(400).send(err);
                        } else {
                            res.status(200).send('Successfully signed up.');
                        }
                    });
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

    mySqlConnection.query('SELECT * FROM users WHERE username = ?', [username], (err, users) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            if (users.length === 0) {
                res.status(400).send('User not found.');
            }
            for (let i = 0; i < users.length; i++) {
                const user = users[i];

                bcrypt.compare(password, user.password).then((success) => {
                    if (success) {
                        const token = generateAuthToken();//🖥️🕵️
                        user.sessions.push({
                            date: Date.now(),
                            token: token,
                        });
                        mySqlConnection.query('UPDATE users SET sessions = ? WHERE id = ?', [JSON.stringify(user.sessions), user.id], () => {
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
                });
            }
        }
    });
});

//logout
app.post(getAPIURL('/logout'), (req, res) => {
    res.clearCookie('auth');
    res.status(200).send('Successfully logged out');
});

//session
app.get(getAPIURL('/getsession'), (req, res) => {
    verifyRequest(req).then((user) => {
        if (user) {
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
});







//website functions
app.post(getAPIURL('/joincourse'), (req, res) => {
    const bod = req.body;
    const courseName = bod.courseName;
    if (courseName === undefined) {
        res.status(400).send(`Course name is undefined.`);
        return;
    }
    if (courseName === null) {
        res.status(400).send(`Course name is null.`);
        return;
    }
    if (typeof (courseName) !== 'string') {
        res.status(400).send(`Course name isn't of type 'String'.`);
        return;
    }
    const user = req.user;
    user.joined_courses.push(courseName);
    mySqlConnection.query('UPDATE users SET joined_courses = ? WHERE id = ?', [user.joined_courses, user.id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Successfully joined course.');
        }
    })
});