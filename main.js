const tasks = [];
const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

function handleTaskActions(e) {
  const taskItem = e.target.closest(".task-item");
  const taskIndex = +taskItem.getAttribute("task-index");
  console.log(taskIndex);
  const task = tasks[taskIndex];

  if (e.target.closest(".edit")) {
    console.log("Edit task");
    const newTitle = prompt("Enter the new task title:", task.title);
    task.title = newTitle;
    renderTasks();
  } else if (e.target.closest(".done")) {
    task.completed = !task.completed;
    renderTasks();
  } else if (e.target.closest(".delete")) {
    if (confirm(`Are you sure you want to delete '${task.title}'?`)) {
      tasks.splice(taskIndex, 1);
      renderTasks();
    }
  }
}

function addTask(e) {
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
  renderTasks();
}

function renderTasks() {
  const html = tasks
    .map(
      (task, index) => `
    <li class="task-item  ${
      task.completed ? "completed" : ""
    }" task-index="${index}">
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

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskActions);

renderTasks();
