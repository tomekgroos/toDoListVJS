const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// creating a mongoose Schema

const Schema = mongoose.Schema;

let toDoListSchema = new Schema({
        name: String,
        done: Boolean
    }, 
);

let toDoItem = mongoose.model('toDoItem', toDoListSchema);

// connecting to mongo
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to MongoDB");
})

app.use(express.static(path.join('C:/Programowanie/todoVJSApp', "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.listen(PORT, () =>{
    console.log('listening on port 4000');
});

// rendering html with javascript from converted index.html to index.ejs file (embedded javaScript)

app.get('/', (req, res) =>{
        toDoItem.find({}).then(function(results){
            res.render('index', {newTask: results});
        })
        
    }); 
    

// create task, sending to server 

app.post("/newtask", function(req, res) {
    
    let newTask = new toDoItem({
        name: req.body.task,
        done: false
    });
    
    newTask.save().then(function(result){
        console.log(`Task added: ${result}`);
        
    });
    
    res.redirect("/")

});

app.delete("/id:", (req, res) => {
    toDoItem.findByIdAndRemove(req.body.delete, (error) =>{
        if (error){
            console.log(error);
        } else {
            console.log('Task deleted')
        }
    });
});


