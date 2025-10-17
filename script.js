const form = document.querySelector('form');
const input = document.querySelector('form input');
const listContainer = document.querySelector('form .list-container');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.container .header .sun');
const clearBtn = document.querySelector('.clear-btn');
const btns = document.querySelectorAll('.filter button');
const itemsLeft = document.querySelector('.items-left');

let todos = JSON.parse(localStorage.getItem('todos',)) || [];

// let remain = todos.length;


// save todo list to local storage
if(todos){
    todos.forEach((todo) => {
        addTodos(todo);
    });
}

// form on sumbit event
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    addTodos();
    updateItemsLeft();
})

// toggle dark mode
moon.addEventListener('click', () =>{
    document.body.classList.toggle('darkmode');
    console.log('darkmode');
    moon.style.display = "none";
    sun.style.display = "block";
})

sun.addEventListener('click', () =>{
    document.body.classList.toggle('darkmode');
    console.log('darkmode');
    moon.style.display = "block";
    sun.style.display = "none";
})

// function to create todo list
function addTodos(todo){
    let todoText = input.value.trim();
    if(todo){
        todoText = todo.text;
    }
    // dynamically create list-items
    if(todoText){

        let listItem = document.createElement('li');

        if(todo && todo.completed){
            listItem.classList.add('completed');
        }
        // add to them
        listItem.innerText = todoText;
        listContainer.appendChild(listItem);

        let span = document.createElement('span');
        span.innerText = '';
        listItem.appendChild(span);

        // mark as completed
        listItem.addEventListener('click', () =>{
            listItem.classList.toggle('completed');
            saveTodo();
            updateItemsLeft();
        })

        // delete item
        span.addEventListener('click', () => {
            listItem.remove();
            saveTodo();
            updateItemsLeft();
        })
    }
    input.value = "";
    saveTodo();
    updateItemsLeft();
}


// function to save todo list

function saveTodo(){
    listItems = document.querySelectorAll('li');

    const todos = [];

    listItems.forEach((list) =>{
        todos.push({
            text: list.innerText,
            completed: list.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    updateItemsLeft();
}

// function to display todo
function renderTodos(){
    listContainer.textContent = '';

    // todos.forEach((todo, index) => {
    //     const listItem = document.createElement('li')
    //     listItem.innerText = todoText;
    //     listContainer.appendChild(listItem);
    // })
    addTodos();
    saveTodo();
    updateItemsLeft();
}

// function to clear all todo list
function clearAllTodos(){
        // localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        updateItemsLeft();
}

// update item left counter
function updateItemsLeft(){
    const activeTodos = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`;
}

// event listener
clearBtn.addEventListener('click', () => {
    clearAllTodos();
    updateItemsLeft();
    saveTodo();
});

updateItemsLeft();