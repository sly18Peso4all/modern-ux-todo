
//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// // Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

// // Functions

function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault()
    
    
    if(todoInput.value === "")  return false;
    
    
    // Create Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Li element
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // Save todo to Local Storage
     saveLocalTodos(todoInput.value)

    // Append li Todo Div
    todoDiv.appendChild(newTodo)

    // Check Mark Button
    const completedButton= document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    todoDiv.appendChild(completedButton);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteButton);
    
    // Append todoDiv to Parent Element
    todoList.appendChild(todoDiv);

    //Clear Todo Input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    // Delete Todo
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', removeTransition);

        function removeTransition() {
            return todo.remove();
        }
    }

    // Check Mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
       switch (e.target.value) {
           case "all":
               todo.style.display = "flex";
               break;
           case "completed":
               if (todo.classList.contains("completed")) {
                   todo.style.display = "flex";
               }  else {
                   todo.style.display = "none";
               };
              break;   
           case "uncompleted":
               if (!todo.classList.contains("completed")) {
                   todo.style.display = "flex";
               }  else {
                   todo.style.display = "none";
               };
              break; 
       }
    });
}

function saveLocalTodos(todo) {
     // Check if there is todo already
     let todos;

     if(localStorage.getItem('todos') === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.push(todo);
     localStorage.setItem("todos", JSON.stringify(todos)); 
}

function getTodos() {
     // Check if there is todo already
     let todos;

     if(localStorage.getItem('todos') === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function(todo){
         // Create Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create Li element
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        // Append li Todo Div
        todoDiv.appendChild(newTodo)

        // Check Mark Button
        const completedButton= document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        todoDiv.appendChild(completedButton);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(deleteButton);
        
        // Append todoDiv to Parent Element
        todoList.appendChild(todoDiv);

     })
}

function removeLocalTodos(todo) {
     // Check if there is todo already
     let todos;

     if(localStorage.getItem('todos') === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }

     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem("todos", JSON.stringify(todos)); 
}
