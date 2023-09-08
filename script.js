const input_text = document.querySelector(".text_input");
const form = document.querySelector(".test_local");

function setTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) ?? []
}

function addTodo(todo) {
  const todos = getTodos()
  todos.push(todo)
  setTodos(todos)
}

function addItems(e) {
  e.preventDefault();

  const todo = {
    id: Date.now(),
    text: input_text.value,
    checked: false,
  };

  addTodo(todo)
  showTodos();
  input_text.value = ""
}

function deleteTodo(todoId) {
  const todos = getTodos()
  let filtredTodo = todos.filter((todo) => todo.id !== todoId)
  setTodos(filtredTodo)
  showTodos();
}

function toggleTodo(todoId) {
  const todos = getTodos()
  const updatedTodos = todos.map((todo) => {
    if (todo.id === todoId) {
      return {
        id: todo.id,
        text: todo.text,
        checked: !todo.checked,
      };
    }
    return todo;
  })
  setTodos(updatedTodos)
  showTodos();
}

function showTodos() {
  const list = document.querySelector(".list");
  const todos = getTodos()

  list.innerHTML = todos.map((todo) => {
      return `<li class="todos">
        <input type="checkbox" class="css-checkbox" onchange="toggleTodo(${todo.id})" id="item${todo.id}" ${todo.checked && "checked"}>
        <p class="todo_text ${todo.checked ? 'checked' : ''}">${todo.text}</p>
        <input type="button" value="Delete" class="deleteButton" onclick="deleteTodo(${todo.id})">
        </li>`;
    }).join("");
}

showTodos()

form.addEventListener("submit", addItems);




