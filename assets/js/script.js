let taskIdCounter = 0;

// select entire form
let formEl = document.querySelector("#task-form");
// select UL element
let tasksToDoEl = document.querySelector("#tasks-to-do");

let pageContent = document.querySelector("#page-content");

// function captures user data
let taskForm = function (event) {
  // prevent page refresh
  event.preventDefault();
  // capture value of task name
  let captureTakeName = document.querySelector("input[name='task-name']").value;
  // value of drop down menu
  let taskDropDown = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty
  if (!captureTakeName || !taskDropDown) {
    alert("You need to fill out the form");
    return false;
  }
  // reset form on submit
  formEl.reset();

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
  taskList.setAttribute("data-task-id", taskIdCounter);

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

  let taskActionsEl = createTaskActions(taskIdCounter);

  taskList.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(taskList);
  // append list to UL
  tasksToDoEl.appendChild(taskList);

  taskIdCounter++;
};

let createTaskActions = function (taskId) {
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  let editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  let deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  let statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  let statusChoices = ["To Do", "In Progress", "Completed"];

  for (let i = 0; i < statusChoices.length; i++) {
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

let taskButtonHandler = function (event) {
  if (event.target.matches(".delete-btn")) {
    let taskDataID = event.target.getAttribute("data-task-id");
    deleteTask(taskDataID);
  }
};

let deleteTask = function (taskDataID) {
  let taskSeleteced = document.querySelector(
    ".task-item[data-task-id='" + taskDataID + "']"
  );
  taskSeleteced.remove();
};

// on form submit, run function to create new list item
formEl.addEventListener("submit", taskForm);

pageContent.addEventListener("click", taskButtonHandler);
