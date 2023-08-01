// Selectors 

const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')



//Arrow functions
let addTodo = (event) => {
    // Prevent Form Form Submitting 
    event.preventDefault();

    //ToDo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')

    //check mark button
    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn')
    //delete mark button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')

    todoDiv.appendChild(newTodo)
    todoDiv.appendChild(completeButton)
    todoDiv.appendChild(trashButton)

    // Add to do lo local storage
    saveLocalTodos(todoInput.value)

    todoList.appendChild(todoDiv)
    // Clear Todo input value 
    todoInput.value = ""
}

let deleteCheck = (event) => {
    let item = event.target
    //Delete Todo
    if (item.classList[0] == 'trash-btn') {
        //Animation
        removeTodos(item.parentElement.firstChild.innerText)
        item.parentElement.classList.add("fall")
        item.parentElement.addEventListener('transitionend', () => {
            item.parentElement.remove()
        })

    }
    // Check Mark
    if (item.classList[0] == 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

let filterTodo = (e) => {
    const todos = Array.from(todoList.children);
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
             case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
};

let saveLocalTodos = (todo) =>{

    // Check If I already have todos
    let todos
    if(localStorage.getItem('todos') === null){
        todos =[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos' , JSON.stringify(todos))
}

let getTodos = ()=>{
    let todos
    if(localStorage.getItem('todos') === null){
        todos =[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo)=>{
        //ToDo Div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')

    //check mark button
    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn')
    //delete mark button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')

    todoDiv.appendChild(newTodo)
    todoDiv.appendChild(completeButton)
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
    })
}

let removeTodos = (todo) =>{
    let todos = []
    if(localStorage.getItem('todos') === null){
        todos =[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    console.log("Todos : " , todos)
    todos.splice(todos.indexOf(todo),1)
    localStorage.setItem('todos' ,JSON.stringify(todos))
}
//Event Listener
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('change',filterTodo)
document.addEventListener('DOMContentLoaded',getTodos)