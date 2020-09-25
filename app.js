
// selected elements
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes
const CHECK = "checkboxDone"
const UNCHECK = "checkboxToDo"
const LINE_THROUGH = "task-done"

// starting values for to do list
let LIST = [];
let id = 0;

// function which add tasks

function addTodo(toDo, id, done, trash){

    if(trash){
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const text = `<li class="task">
                    <i class ="checkboxToDo" job="complete" id="${id}"></i>
                    <p class="text">${toDo}</p>
                    <i class="trash" job="delete" id="${id}"></i>
                </li>`
    const position = "beforeend";
    list.insertAdjacentHTML(position, text);

}

// function which handles user input

document.addEventListener('keydown', (event) => {
    if(event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addTodo(toDo,id,false,false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
        }  
        input.value = "";
        id++
    }
}) 

// function handles done or undone task with specified style

function completeToDo(element){
    element.classList.toggle("CHECK");
    element.classList.toggle("UNCHECK");
    element.parentNode.querySelector(".text").classList.toggle("LINE_THROUGH");

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

/* function removing task. Why parentNode.parentNode?
Because with single parentNode childs of <li> element which are: 
checkbox, paragraph and trash icon.
When we call parentNode.parentNode we are removing child of <ul> 
-> which is <li> element */

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// function handles buttons -> checkbox and trash 

list.addEventListener("click", (event) => {
    let element = event.target;
    const elementJob = event.target.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element)
    } else if (elementJob == "delete"){
        removeToDo(element)
    }
}) 

// update localStorage for toDoList

localStorage.setItem("key", "value");

let getKey = localStorage.getItem("key");

localStorage.setItem("TODO", JSON.stringify(LIST));

// restore list array

let data = localStorage.getItem("TODO");
if (data) {

    LIST = JSON.parse(data);
    lo adToDo(LIST);
    id = LIST.length;

} else {
    LIST = [];
    id = 0;
}

