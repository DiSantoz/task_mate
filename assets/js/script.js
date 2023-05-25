// select button element
let buttonEl = document.querySelector("#save-task");
// select UL element
let tasksToDoEl = document.querySelector("#tasks-to-do");

// create a new list item and append it to the existing UL element
let createTasks = function () {
  let taskItemEl = document.createElement("li");
  taskItemEl.textContent = "This is a new task";
  taskItemEl.classList = "task-item";
  tasksToDoEl.append(taskItemEl);
};

// on button click, run function to create new list item
buttonEl.addEventListener("click", createTasks);
