const router = require("express").Router();
const toDoItem = require('../models/taskmodel');

/* ---rendering html with javascript from converted index.html to index.mustache file---

    mustache.js is an implementation of templates in JavaScript which don't require 
    any dependencies - "logic-less" means there is no if statements, else clauses
    and for loops instead of only tags. More info under: https://www.npmjs.com/package/mustache
*/

router.get("/", (req, res) => {
  toDoItem.find({}).then(function (results) {
    let tasks = results.filter(function (task) {
      return !task.done;
    });

    let doneTasks = results.filter(function (task) {
      return task.done;
    });
    res.render("index", { newtask: tasks, doneTasks: doneTasks });
  });
  
});

// create task, sending to server 

router.post("/newtask", function(req, res) {
    
    let newtask = new toDoItem({
        name: req.body.task,
        done: false
    });
  
    newtask.save().then(function(result){
        console.log(`Task added: ${result}`);
        res.redirect("/")
    }).catch(function(err){
      console.log(err);
      res.redirect("/");
    });

});

    router.post("/newtask/:id/completed", function(req, res) {
          let taskId = req.params.id;

          toDoItem.findById(taskId)
          .exec()
          .then(function(result) {
            result.done = !result.done;
            return result.save();
          }).then(function(result) {
            res.redirect("/");
          });
          
    });

     router.post("/newtask/:id/deleted", function(req, res) {
          let taskId = req.params.id;

          toDoItem.findByIdAndRemove(taskId)
          .exec()
          .then(function(result){
            return result.delete();
          }).then(function(result){
            res.redirect("/");
          })
       
          
    });


module.exports = router;