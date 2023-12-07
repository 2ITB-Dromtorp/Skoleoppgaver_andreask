const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: 'Navn',
    },
    last_name: {
        type: String,
        default: 'Navnesen',
    },
    class: {
        type: String,
    },
    hobby: {
        type: String,
    },
    gender: {
        type: String,
    },
    computer_id: {
        type: Number,//mongoose.SchemaTypes.ObjectId
    },
});

module.exports = {
    List: mongoose.model('List', listSchema),
    listSchema,
};