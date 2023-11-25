console.log('Node server started');

const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mysql = require('mysql2');
const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const ReactDOMServer = require('react-dom/server');

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
    getAPIURL('/getuserdata'),
    getAPIURL('/leavecourse'),
];
const verifyURLS = [
    getAPIURL('/logout'),
    getAPIURL('/joincourse'),
    getAPIURL('/getuserdata'),
    getAPIURL('/leavecourse'),
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
    const user = req.user;
    const sessions = user.sessions;
    for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];
        if (session.token === req.cookies.auth) {
            sessions.splice(i, 1);
            res.clearCookie('auth');
            break;
        }
    }
    mySqlConnection.query('UPDATE users SET sessions = ? WHERE id = ?', [JSON.stringify(sessions), user.id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send('Successfully logged out');
        }
    });
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

//session
app.get(getAPIURL('/getuserdata'), (req, res) => {
    const user = req.user;
    res.status(200).send({
        id: user.id,
        username: user.username,
        joined_courses: user.joined_courses,
    });
});







//courses
app.get(getAPIURL('/courses'), (req, res) => {
    mySqlConnection.query('SELECT * FROM courses', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post(getAPIURL('/joincourse'), (req, res) => {
    const bod = req.body;
    const courseId = bod.course;
    if (courseId === undefined) {
        res.status(400).send(`Course id is undefined.`);
        return;
    }
    if (courseId === null) {
        res.status(400).send(`Course id is null.`);
        return;
    }
    if (typeof (courseId) !== 'number') {
        res.status(400).send(`Course id isn't of type 'Number'.`);
        return;
    }
    const user = req.user;
    user.joined_courses.push(courseId);
    mySqlConnection.query('UPDATE users SET joined_courses = ? WHERE id = ?', [JSON.stringify(user.joined_courses), user.id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Successfully joined course.');
        }
    })
});

app.post(getAPIURL('/leavecourse'), (req, res) => {
    const bod = req.body;
    const courseId = bod.course;
    if (courseId === undefined) {
        res.status(400).send(`Course id is undefined.`);
        return;
    }
    if (courseId === null) {
        res.status(400).send(`Course id is null.`);
        return;
    }
    if (typeof (courseId) !== 'number') {
        res.status(400).send(`Course id isn't of type 'Number'.`);
        return;
    }
    const user = req.user;
    const index = user.joined_courses.indexOf(courseId);
    if (index === -1) {
        res.status(400).send(`Cannot leave course you have not joined.`);
        return;
    }
    user.joined_courses.splice(index, 1);
    mySqlConnection.query('UPDATE users SET joined_courses = ? WHERE id = ?', [JSON.stringify(user.joined_courses), user.id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Successfully left course.');
        }
    });
});



function drawPDFTable(page, table, rowCount, columnCount, cellWidth, cellHeight, startX, startY, textSize) {
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            const x = startX + (j * cellWidth);
            const y = startY - (cellHeight + (i * cellHeight));
            page.drawRectangle({
                x,
                y,
                width: cellWidth,
                height: cellHeight,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1,
            });
            const text = table[i][j];
            page.drawText(text, { x: x + 5, y: y + (cellHeight * 0.5) - (textSize * 0.5), size: textSize });
        }
    }
}

function createCourseReceipt(course) {
    return new Promise((resolve, reject) => {
        PDFDocument.create().then(async (pdfDoc) => {
            const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

            const page = pdfDoc.addPage([550, 750]);

            let pageOff = 700;

            page.drawText('Kvittering for kurspåmelding', { x: 50, y: pageOff, size: 32, font: boldFont });
            pageOff -= 60;
            page.drawText('Kursinformasjon', { x: 50, y: pageOff, size: 16, font: boldFont });
            pageOff -= 25;
            page.drawText('Kurs:', { x: 50, y: pageOff, size: 16, variant: 'bold' });
            page.drawText(course.name, { x: 150, y: pageOff, size: 16, variant: 'bold' });
            pageOff -= 20;
            page.drawText('Lærer:', { x: 50, y: pageOff, size: 16 });
            page.drawText(course.host, { x: 150, y: pageOff, size: 16 });
            pageOff -= 20;
            page.drawText('Pris:', { x: 50, y: pageOff, size: 16 });
            page.drawText(`${course.price} kr,-`, { x: 150, y: pageOff, size: 16 });
            pageOff -= 40;

            page.drawText('Tider:', { x: 50, y: pageOff, size: 16 });
            pageOff -= 10;
            drawPDFTable(page, [
                ['Dato', 'Tid'],
                ['24.11.2023', '12:00 - 14:00'],
                ['25.11.2023', '12:00 - 14:00'],
                ['26.11.2023', '14:00 - 16:00'],
                ['27.11.2023', '14:00 - 16:00'],
                ['28.11.2023', '16:00 - 18:00'],
                ['29.11.2023', '16:00 - 18:00'],
                ['30.11.2023', '18:00 - 20:00'],
            ], 8, 2, 150, 24, 50, pageOff, 16);
            pageOff -= 24 * (8 + 1);
            pageOff -= 20;

            page.drawText('Kontakt', { x: 50, y: pageOff, size: 16, font: boldFont });
            pageOff -= 25;
            page.drawText('Email:', { x: 50, y: pageOff, size: 16 });
            page.drawText('kurs@dromtorp.no', { x: 150, y: pageOff, size: 16 });
            pageOff -= 20;
            page.drawText('Tlf:', { x: 50, y: pageOff, size: 16 });
            page.drawText('+47 12345678', { x: 150, y: pageOff, size: 16 });
            pageOff -= 40;




            pdfDoc.save().then((modifiedPdfBytes) => {
                resolve(Buffer.from(modifiedPdfBytes));
            });
        });
    });
}

app.get(getAPIURL('/coursereceipt'), (req, res) => {
    const query = req.query;
    const courseIdStr = query.course;
    if (courseIdStr === undefined) {
        res.status(400).send(`Course id string is undefined.`);
        return;
    }
    if (courseIdStr === null) {
        res.status(400).send(`Course id string is null.`);
        return;
    }
    if (typeof (courseIdStr) !== 'string') {
        res.status(400).send(`Course id string isn't of type 'String'.`);
        return;
    }
    const courseId = Number(courseIdStr);
    if (typeof (courseId) !== 'number') {
        res.status(400).send(`Course id isn't of type 'Number'.`);
        return;
    }
    mySqlConnection.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            const course = data[0];
            createCourseReceipt(course).then((buffer) => {
                res.contentType('application/pdf');
                res.send(buffer);
            });
        }
    });
});









app.get(getAPIURL('/course'), (req, res) => {
    const query = req.query;
    const courseIdStr = query.course;
    if (courseIdStr === undefined) {
        res.status(400).send(`Course id string is undefined.`);
        return;
    }
    if (courseIdStr === null) {
        res.status(400).send(`Course id string is null.`);
        return;
    }
    if (typeof (courseIdStr) !== 'string') {
        res.status(400).send(`Course id string isn't of type 'String'.`);
        return;
    }
    const courseId = Number(courseIdStr);
    if (typeof (courseId) !== 'number') {
        res.status(400).send(`Course id isn't of type 'Number'.`);
        return;
    }
    mySqlConnection.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            const course = data[0];
            res.send(course);
        }
    });
});







setInterval(() => {
    mySqlConnection.query('SELECT * from users', (err, users) => {
        if (err) {
            console.error(err);
        } else {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const sessions = user.sessions;
                for (let j = 0; j < sessions.length; j++) {
                    const session = sessions[j];
                    const now = Date.now();
                    const off = now - session.date;
                    if (off > maxAuthCookieAge) {
                        sessions.splice(j, 1);
                        mySqlConnection.query('UPDATE users SET sessions = ? WHERE id = ?', [JSON.stringify(sessions), user.id], (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                }
            }
        }
    });
}, 60 * 1000);