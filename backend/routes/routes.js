const router = require("express").Router();
const toDoItem = require('../models/taskmodel');

// get list of tasks

router.get("/", (req, res) => {
  toDoItem.find({}).then(function (results) {
    let tasks = results.filter(function (task) {
      return !task.done;
    });

    let doneTasks = results.filter(function (task) {
      return task.done;
    });
    res.render("index", { newtask: tasks, doneTasks: doneTasks });
  }).catch(function(error){
      console.log(error);
      res.redirect("/");
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
    }).catch(function(error){
      console.log(error);
      res.redirect("/");
    });

});

  // change status done: true || false

    router.post("/newtask/:id/completed", function(req, res) {
          let taskId = req.params.id;

          toDoItem.findById(taskId)
          .exec()
          .then(function(result) {
            result.done = !result.done;
            return result.save();
          }).then(function(result) {
            res.redirect("/");
          }).catch(function(error){
            console.log(error);
            res.redirect("/")
          })
          
    });

    // delete task

     router.post("/newtask/:id/deleted", function(req, res) {
          let taskId = req.params.id;

          toDoItem.findByIdAndRemove(taskId)
          .exec()
          .then(function(result){
            return result.delete();
          }).then(function(result){
            res.redirect("/");
          }).catch(function(error){
            console.log(error);
            res.redirect("/")
          });
       
          
    });


module.exports = router;