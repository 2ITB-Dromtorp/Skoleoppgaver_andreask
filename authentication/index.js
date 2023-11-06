const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mysql = require('mysql2');

const app = express();


const saltRounds = 10;




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






const IP = getOwnIP;
const PORT = 80;

let dbConfig = {
    host: IP,
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'backend',
};

const pool = mysql.createPool(dbConfig);





//for blocking devious people🤡🤡🤡
const bannedIPs = [];

function isIPBanned(req, res) {
    if (req.socket.remoteAddress in bannedIPs) {
        res.status(403).send('Your IP is blocked.');
        res.end();
        return true;
    }
    return false;
}



//haker 🕵️🕵️🕵️
function generateAuthToken() {
    return crypto.randomBytes(256).toString('base64');
}

function generateSessionToken() {
    return crypto.randomBytes(64).toString('base64');
}





//serv
const server = http.createServer(app);

//listen🙉🙉🙉🙉
server.listen(PORT, IP, () => console.log(`Server listening to: http://${IP}:${PORT}/`));







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
    getAPIURL('/only_logged_in_can_use_this'),
];
const verifyURLS = [
    getAPIURL('/only_logged_in_can_use_this'),
];



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
})

app.use(cookieSession({
    name: 'session',
    keys: [generateSessionToken()],
    maxAge: 24 * 60 * 60 * 1000,//session cookie expires after 24 hours (you gotta login again, for   e x t r a   security)
}));


//authenticate
app.use((req, res, next) => {
    if (verifyURLS.includes(req.path)) {
        const token = req.cookies.auth;//🍪🍪🍪
        pool.query('SELECT * FROM users', (err, users) => {
            if (err) {
                console.error(err);
                res.status(400).send(err);
            } else {
                let matchedUser;
                for (let i = 0; i < users.length; i++) {
                    const user = users[i];

                    let foundToken = false;
                    for (let j = 0; j < user.sessions.length; j++) {
                        const session = user.sessions[j];
                        if (session.token === token) {
                            foundToken = true;
                            break;
                        }
                    }

                    if (foundToken === true) {
                        matchedUser = user;
                        break;
                    }
                }
                if (matchedUser !== undefined) {
                    next();
                } else {
                    res.status(400).send('No user with that token.');
                }
            }
        });
    } else {
        next();
    }
});


//refreshing session cookie
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










//goofy ahh apis🤡







//sign up
app.post(getAPIURL('/signup'), async (req, res) => {
    const q = req.body;
    const user = q.username;
    const password = q.password;

    if (user === undefined || user === null || password === undefined || password === null) {
        res.status(400).send(`User and/or password doesn't exist.`);
        return;
    }
    if (typeof (user) !== 'string' || typeof (password) !== 'string') {
        res.status(400).send(`User and/or password isn't of type 'String'.`);
        return;
    }

    pool.query('SELECT * FROM users WHERE username = ?', [user], async (err, users) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            if (users.length > 0) {
                res.status(400).send('User already exists.');
            } else {
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, baba) => {
                    if (err) {
                        console.error(err);
                        res.status(400).send(err);
                    } else {
                        console.log(err, baba);
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
    const user = q.username;
    const password = q.password;

    if (user === undefined || user === null || password === undefined || password === null) {
        res.status(400).send(`User and/or password doesn't exist.`);
        return;
    }
    if (typeof (user) !== 'string' || typeof (password) !== 'string') {
        res.status(400).send(`User and/or password isn't of type 'String'.`);
        return;
    }

    pool.query('SELECT * FROM users WHERE username = ?', [user], async (err, users) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        } else {
            if (users.length === 0) {
                res.status(400).send('User not found');
            }
            for (let i = 0; i < users.length; i++) {
                const user = users[i];

                const success = await bcrypt.compare(password, user.userPassword);

                if (success) {
                    const token = generateAuthToken();//🖥️🕵️
                    user.sessions.push({
                        date: Date.now(),
                        token: token,
                    });
                    pool.query('UPDATE users SET sessions = ? WHERE idUser = ?', [JSON.stringify(user.sessions), user.idUser], () => {//kys matheo😘😘😘
                        if (err) {
                            console.error(err);
                            res.status(400).send(err);
                        } else {
                            const now = Date.now();
                            req.session.cookie = {
                                maxAge: 1 * 60 * 60 * 1000,
                                lastAccess: now,
                                lastRefresh: now,
                            };
                            res.cookie('auth', token, {
                                maxAge: 30 * 24 * 60 * 60 * 1000,
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

app.post(getAPIURL('/logout'), (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send('Successfully logged out');
        }
    });
});

//sessions
app.get(getAPIURL('/getsession'), (req, res) => {
    if (req.session.cookie) {
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