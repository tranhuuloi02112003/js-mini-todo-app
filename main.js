const tasks = [

];

const taskList = document.querySelector("#task-list");

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

todoForm.onsubmit = (e) => {
  e.preventDefault();

  const newTask = {
    title: todoInput.value.trim(),
    completed: false,
  };

  if (!newTask.title) {
    alert("Please enter a task");
    return;
  }

  tasks.push(newTask);
  todoInput.value = "";
  render();
};

function render() {
  const html = tasks
    .map(
      (task) => `
    <li class="task-item  ${task.completed ? "completed" : ""}">
        <span class="task-title">${task.title}</span>
        <div class="task-action">
            <button class="task-btn edit">Edit</button>
            <button class="task-btn done">${
              task.completed ? "Mark as undone" : "Mark as done"
            }</button>
            <button class="task-btn delete">Delete</button>
        </div>
    </li>
    `
    )
    .join("");
  taskList.innerHTML = html;
}
render();
// console.log(html);
