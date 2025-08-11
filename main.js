const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function isDuplicate(newTitle, excludeIndex = -1) {
  const isDuplicate = tasks.some(
    (task, index) =>
      task.title.toLowerCase() === newTitle.toLowerCase() &&
      index !== excludeIndex
  );
  return isDuplicate;
}

function handleTaskActions(e) {
  const taskItem = e.target.closest(".task-item");
  if (taskItem === null) return;
  const taskIndex = +taskItem.dataset.index;
  const task = tasks[taskIndex];

  if (e.target.closest(".edit")) {
    let newTitle = prompt("Enter the new task title:", task.title);
    if (newTitle === null) return;

    newTitle = newTitle.trim();

    if (!newTitle) {
      alert("Task title cannot be empty!");
      return;
    }

    if (isDuplicate(newTitle, taskIndex)) {
      alert("Task already exists");
      return;
    }

    task.title = newTitle;
    renderTasks();
    saveTasks();
    return;
  }

  if (e.target.closest(".done")) {
    task.completed = !task.completed;
    renderTasks();
    saveTasks();
    return;
  }

  if (e.target.closest(".delete")) {
    if (confirm(`Are you sure you want to delete '${task.title}'?`)) {
      tasks.splice(taskIndex, 1);
      renderTasks();
      saveTasks();
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

  if (isDuplicate(newTask.title)) {
    alert("Task already exists");
    return;
  }

  tasks.push(newTask);
  todoInput.value = "";
  renderTasks();
  saveTasks();
}

function renderTasks() {
  if (!tasks.length) {
    taskList.innerHTML = `<li class="empty-message">No tasks available</li>`;
    return;
  }

  const html = tasks
    .map(
      (task, index) => `
    <li class="task-item  ${
      task.completed ? "completed" : ""
    }" data-index="${index}">
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
