const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

// get tasks from localStorage
let localStorageTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// render task items
const renderTaskItems = ({ task, id, completed }) => {
  return `
            <div>
                <input id=${id} type="checkbox" name="task" onchange="markTaskAsComplete(this)" ${
    completed ? "checked" : ""
  } />
                <label for=${id}>${task}</label>
            </div>
     
      <button class="delete-task" onclick="deleteTask(${id})">Delete</button>
    `;
};

// render tasks
localStorageTasks.forEach((task) => {
  // render task item
  const newTask = document.createElement("li");

  // set task id
  newTask.setAttribute("value", task.id);

  // render task item
  newTask.innerHTML = renderTaskItems({
    id: task.id,
    task: task.task,
    completed: task.completed,
  });
  todoList.appendChild(newTask);

  task.completed &&
    todoList
      .querySelector(`[value="${task.id}"]`)
      ?.classList?.toggle("task-completed");
});

// Add Task
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get task from form
  const task = todoForm.querySelector("input").value;
  const newTask = document.createElement("li");
  const taskItem = { id: new Date().getTime(), task: task, completed: false };

  // set task id
  newTask.setAttribute("value", new Date().getTime());

  // render task item
  newTask.innerHTML = renderTaskItems(taskItem);

  // add task to localStorage
  localStorageTasks.push(taskItem);
  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));

  // add task to DOM
  todoList.appendChild(newTask);
  todoForm.querySelector("input").value = "";
});

// Mark Task as Complete
const markTaskAsComplete = (checkbox) => {
  const taskId = parseInt(checkbox.id); // checkbox id is the same as the task id
  const taskIndex = localStorageTasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    // Toggle the completed status
    localStorageTasks[taskIndex].completed = checkbox.checked;

    // Update the task in localStorage
    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
  }

  // Toggle the completed status
  document
    .querySelector(`[value="${taskId}"]`)
    .classList.toggle("task-completed");
};

// Delete Task
const deleteTask = (id) => {
  localStorageTasks = localStorageTasks.filter((task) => task.id !== id);

  todoList.removeChild(todoList.querySelector(`[value="${id}"]`));
  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};
