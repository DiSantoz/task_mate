// select entire form
let formEl = document.querySelector("#task-form");
// select UL element
let tasksToDoEl = document.querySelector("#tasks-to-do");

// function captures user data
let taskForm = function (event) {
  // prevent page refresh
  event.preventDefault();
  // capture value of task name
  let captureTakeName = document.querySelector("input[name='task-name']").value;
  // value of drop down menu
  let taskDropDown = document.querySelector("select[name='task-type']").value;

  // put data in an object
  let taskDataObj = {
    name: captureTakeName,
    type: taskDropDown,
  };

  // pass as argument in function
  createTasks(taskDataObj);
};

// function appends user data to form
let createTasks = function (taskDataObj) {
  //  create new list with class
  let taskList = document.createElement("li");
  taskList.classList = "task-item";

  // create new div
  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  // hardcode innerhtml of task name and drop down
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  // append list to DIV
  taskList.appendChild(taskInfoEl);
  // append list to UL
  tasksToDoEl.append(taskList);
};

// on form submit, run function to create new list item
formEl.addEventListener("submit", taskForm);
