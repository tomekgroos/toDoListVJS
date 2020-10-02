const router = require("express").Router();
const toDoItem = require('../models/taskmodel');

/* ---rendering html with javascript from converted index.html to index.mustache file---

    mustache.js is an implementation of templates in JavaScript which don't require 
    any dependencies - "logic-less" means there is no if statements, else clauses
    and for loops instead of only tags. More info under: https://www.npmjs.com/package/mustache
*/

router.get("/", (req, res) => {
  toDoItem.find({}).then(function (results) {
    res.render("index", { newtask: results });
  });
});

// create task, sending to server 

router.post("/newtask", function(req, res) {
    
    let newTask = new toDoItem({
        name: req.body.task,
        done: false
    });
    
    newTask.save().then(function(result){
        console.log(`Task added: ${result}`);
        
    });
    
    res.redirect("/")

});

module.exports = router;