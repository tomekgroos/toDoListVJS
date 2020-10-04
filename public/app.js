


const task = document.getElementById("task");

// Classes
const CHECK = "checkboxDone";
const UNCHECK = "checkboxToDo";
const LINE_THROUGH = "task-done";
const SHADOWED_TRASH = "shadowTrash";


    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const SHADOW = done ? SHADOWED_TRASH : "";



// function handles done or undone task with specified style

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    element.parentNode.querySelector(".trash").classList.toggle(SHADOWED_TRASH);
    
}


// function handles buttons -> checkbox and trash 

task.addEventListener("click", (event) => {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element)
    } 
}) 
