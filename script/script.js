const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');
// Check local storage
const todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {
  todos.forEach(todo => addTodo(todo));
}

function updateLS() {
  // Update local storage with all todos, incl. completion status
  const todosEl = document.querySelectorAll('li');
  const todos = [];
  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Optional todo parameter, in case of local storage content
function addTodo(todo) {
  let todoText = input.value;

  // Add existing todos from local storage, if present
  if (todo) {
    todoText = todo.text;
  }

  // Add todo from input field
  if (todoText) {
    const todoEl = document.createElement('li');
    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }
    todoEl.innerText = todoText;

    // 'Complete' on left-click
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    // Delete on right-click
    todoEl.addEventListener('contextmenu', e => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosUl.appendChild(todoEl);
    input.value = '';
  }

    updateLS();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  addTodo();
})
