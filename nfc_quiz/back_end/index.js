console.log('Node server started');

const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const IP = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 80;







const app = express();

const server = http.createServer(app);


let serverAddress;
let serverAddressUrl;

server.listen(PORT, IP, () => {
    serverAddress = server.address();
    serverAddressUrl = `http://${serverAddress.address}:${serverAddress.port}`;

    console.log(`Node server listening to: ${serverAddressUrl}`);
});






/*
const mongodbUrl = 'mongodb+srv://thughunter:tuO1YaVF6vfXg32lQSmKXTosH0dWEnTHmHXHI8Pu9dUvjyyeeeeeeTHUGHUNTER69420@cluster0.aaqecux.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongodbUrl).then((res) => {
    console.log('Node server connected to MongoDB');
}).catch((err) => {
    console.error(err);
});
*/




const API_URL_EXTENSION = '/api';

function getAPIURL(url) {
    return API_URL_EXTENSION + url;
}









app.use(cors());
app.use('/public', express.static('public'));
app.use('/static', express.static('static'));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());



app.post('save_quiz', (req, res) => {
    
});