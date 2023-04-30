const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos")

eventListener();

function eventListener (){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded", (event) => {
        addTodosOnRefresh();
      });
    secondCardBody.addEventListener("click",deleteTodo);
}

function deleteTodo(e){
    
    if (e.target.className ==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","TODO Silindi.")
    }

}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodosOnRefresh(){
    let todos = getTodosFromStorage();
    
    if (todos === null || todos.length === 0) {
        // Depolama alanında hiç görev kaydedilmemiş
        alert('Depolama alanında görev bulunmuyor!');
        return;
    }

    else{
        todos.forEach(function(todo){
            addTodoToUI(todo);
        });
    }
}


function addTodo (e){
    e.preventDefault();
    const newTodo = todoInput.value.trim();//trim => baş ve sondaki boşlukları siler.
    if(newTodo===""){
        showAlert("danger","Lütfen bir to-do giriniz!");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Başarılı..");
    }

}

function showAlert(type,message){
        const alertItem = document.createElement("div");
        alertItem.className = `alert alert-${type}`;
        alertItem.textContent = message;
        firstCardBody.appendChild(alertItem);

        setTimeout(() => {
            alertItem.remove();
        }, 1500);

}


function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = '<i class = "fa fa-remove"></i>' ;

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

