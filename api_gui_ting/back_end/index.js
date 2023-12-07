console.log('Node server started');

const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { List } = require('./schemas/list');

const app = express();


require('dotenv').config();





const IP = '127.0.0.1';
const PORT = 80;

const mongodbUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongodbUrl).then((res) => {
    console.log('Node server connected to MongoDB.');
}).catch((err) => {
    console.error(err);
});






const server = http.createServer(app);

server.listen(PORT, IP, () => {
    console.log(`Node server listening to: http://${IP}:${PORT}/`);
});






function checkRequestValuePresent(res, val, index) {
    if (val === undefined) {
        res.status(400).send(JSON.stringify({
            unexpected: true,
            message: `${index} is undefined.`,
        }));
        return false;
    }
    if (val === null) {
        res.status(400).send(JSON.stringify({
            unexpected: true,
            message: `${index} is null.`,
        }));
        return false;
    }
    return true;
}

function checkRequestValueType(res, val, index, type) {
    let bool;
    if (type === 'array') {
        bool = typeof (val) !== 'object' || Array.isArray(val) === false;
    } else if (type === 'object') {
        bool = typeof (val) !== 'object' || Array.isArray(val) === true;
    } else {
        bool = typeof (val) !== type;
    }
    if (bool) {
        res.status(400).send(JSON.stringify({
            unexpected: true,
            message: `${index} isn't of type ${type}.`,
        }));
        return false;
    }
    return true;
}

function checkRequestValueFull(res, val, index, type) {
    const isPresent = checkRequestValuePresent(res, val, index);
    if (isPresent === false) {
        return false;
    }
    const isValidType = checkRequestValueType(res, val, index, type);
    if (isValidType === false) {
        return false;
    }
    return true;
}






const API_URL_EXTENSION = '/api';

function getAPIURL(url) {
    return API_URL_EXTENSION + url;
}



app.use(cors());
//app.use('/public', express.static('public'));
app.use(express.json({ limit: '100mb' }));




const listFields = {
    id: {
        type: 'string',
        editable: false,
        serverProvided: true,
    },
    name: {
        type: 'string',
        editable: true,
        serverProvided: false,
    },
    content: {
        type: 'string',
        editable: true,
        serverProvided: false,
    },
};




app.get(getAPIURL('/getdata'), (req, res) => {
    List.find().then((lists) => {
        const actualLists = [];
        for (let i = 0; i < lists.length; i++) {
            const list = lists[i];
            const newList = {};
            for (const key in list) {
                if (key in listFields) {
                    newList[key] = list[key];
                }
            }
            actualLists.push(newList);
        }
        res.status(200).json({
            fields: listFields,
            data: actualLists,
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({
            unexpected: true,
            message: 'Failed to get data from database.',
        });
    });
});

app.post(getAPIURL('/createitem'), (req, res) => {
    const body = req.body;

    const dataId = body.id;
    if (checkRequestValueFull(res, dataId, 'id', 'string') === false) return;

    const data = body.data;
    if (checkRequestValueFull(res, data, 'data', 'object') === false) return;

    const actualData = {};
    for (const key in data) {
        if (key in listFields && listFields[key].editable === true) {
            actualData[key] = data[key];
        }
    }

    List.create(actualData).then((list) => {
        res.status(200).send('Item created.');
    }).catch((err) => {
        console.error(err);
        res.status(500).json({
            unexpected: true,
            message: 'Failed to insert item to database.',
        });
    });
});

app.put(getAPIURL('/updateitem'), (req, res) => {
    const body = req.body;

    const dataId = body.id;
    if (checkRequestValueFull(res, dataId, 'id', 'string') === false) return;

    const data = body.data;
    if (checkRequestValueFull(res, data, 'data', 'object') === false) return;

    const actualData = {};
    for (const key in data) {
        if (key in listFields) {
            actualData[key] = data[key];
        }
    }

    List.findById(dataId).then((list) => {
        if (list) {
            for (const key in actualData) {
                list[key] = actualData[key];
            }
            list.save();
            res.status(200).send('Item updated.');
        } else {
            res.status(404).json({
                unexpected: true,
                message: 'Item not found.',
            });
        }
    }).catch((err) => {
        res.status(500).json({
            unexpected: true,
            message: 'Failed to get item from database.',
        });
    });
});

app.delete(getAPIURL('/deleteitem'), (req, res) => {
    const body = req.body;

    const dataId = body.id;
    if (checkRequestValueFull(res, dataId, 'id', 'string') === false) return;

    List.findById(dataId).then((list) => {
        if (list) {
            List.deleteOne({ _id: dataId }).then(() => {
                res.status(200).send();
            }).catch((err) => {
                res.status(500).json({
                    unexpected: true,
                    message: 'Failed to delete item from database.',
                });
            });
        } else {
            res.status(404).json({
                unexpected: true,
                message: 'Item not found.',
            });
        }
    }).catch((err) => {
        res.status(500).json({
            unexpected: true,
            message: 'Failed to get item from database.',
        });
    });
});