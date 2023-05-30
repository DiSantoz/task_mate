// select entire form
let formEl = document.querySelector("#task-form");
// select UL element
let tasksToDoEl = document.querySelector("#tasks-to-do");

// create a new list item and append it to the existing UL element
let createTasks = function (event) {
  event.preventDefault();
  let taskItemEl = document.createElement("li");
  taskItemEl.textContent = "This is a new task";
  taskItemEl.classList = "task-item";
  tasksToDoEl.append(taskItemEl);
};

// on form submit, run function to create new list item
formEl.addEventListener("submit", createTasks);
