const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: '',
    },
});

module.exports = {
    List: mongoose.model('List', listSchema),
    listSchema,
};