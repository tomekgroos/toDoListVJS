const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating a mongoose Schema

let toDoListSchema = new Schema({
        name: {
            type: String,
            required: true
            },
        done: {
            type: Boolean,
            default: false
        }
    }, 
);

module.exports = mongoose.model('toDoItem', toDoListSchema);