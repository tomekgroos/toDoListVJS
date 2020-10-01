
// selected elements
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.getElementById("addButton");

// Classes
const CHECK = "checkboxDone";
const UNCHECK = "checkboxToDo";
const LINE_THROUGH = "task-done";
const SHADOWED_TRASH = "shadowTrash";


// starting values for to do list
let LIST = [];
let id = 0;


// restore list array

let data = localStorage.getItem("TODO");
if (data) {

    LIST = JSON.parse(data);
    loadToDo(LIST); // function loading list 
    id = LIST.length; // set id to the last of the list

} else {
    LIST = [];
    id = 0;
}

function loadToDo(array){
    array.forEach(item => {
        addTodo(item.name, item.id, item.done, item.trash)
    })
}

//clearing the local storage 

clear.addEventListener('click',() =>{
    localStorage.clear();
    location.reload();
})

// function which add tasks

function addTodo(toDo, id, done, trash){

    if(trash){
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const SHADOW = done ? SHADOWED_TRASH : "";

    const text = `<li class="task">
                    <i class ="${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="trash ${SHADOW}" job="delete" id="${id}" name="delete"></i>
                </li>`
    const position = "beforeend";
    list.insertAdjacentHTML(position, text);

}

// function which handles user input by enter

document.addEventListener('keydown', (event) => {


    if(event.keyCode == 13){
        // frontend empty field validation
        if(input.value == ""){
            input.placeholder = "this field is required";
            console.log('this field is required');
        } else {
            input.placeholder = "Add Task"
        }
        // adding task to array
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
        // to clean field for the next task
        input.value = "";

        // update localStorage for toDoList

        localStorage.setItem("TODO", JSON.stringify(LIST));

        // adding next index in array of tasks
        id++
        
    }
}) 

// function which handles user input by click add button

add.addEventListener('click', () => {
         if(input.value == ""){
            input.placeholder = "this field is required";
            console.log('this field is required');
        } else {
            input.placeholder = "Add Task"
        }
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
         // update localStorage for toDoList
        localStorage.setItem("TODO", JSON.stringify(LIST));
         // to clean field for the next task
        input.value = "";
        // adding next index in array of tasks
        id++
    
}) 

// function handles done or undone task with specified style

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    element.parentNode.querySelector(".trash").classList.toggle(SHADOWED_TRASH);
    

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
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element)
    } else if (elementJob == "delete"){
        removeToDo(element)
    }
    // update localStorage for toDoList
        localStorage.setItem("TODO", JSON.stringify(LIST));
});

