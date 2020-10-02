const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating a mongoose Schema

let toDoListSchema = new Schema({
        name: String,
        done: Boolean
    }, 
);

module.exports = mongoose.model('toDoItem', toDoListSchema);