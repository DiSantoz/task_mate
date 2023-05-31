let taskIdCounter = 0;
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContent = document.querySelector("#page-content");

// handling user form capturing and editing
let taskForm = function (event) {
  event.preventDefault();

  let captureTakeName = document.querySelector("input[name='task-name']").value;

  let taskDropDown = document.querySelector("select[name='task-type']").value;

  if (!captureTakeName || !taskDropDown) {
    alert("You need to fill out the form");
    return false;
  }

  formEl.reset();

  let isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    let taskId = formEl.getAttribute("data-task-id");
    completeEditTask(captureTakeName, taskDropDown, taskId);
  } else {
    let taskDataObj = {
      name: captureTakeName,
      type: taskDropDown,
    };

    createTasks(taskDataObj);
  }
};
// saving edit tasks
let completeEditTask = function (captureTaskName, taskDropDown, taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  taskSelected.querySelector("h3.task-name").textContent = captureTaskName;
  taskSelected.querySelector("span.task-type").textContent = taskDropDown;

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};
// create a new task
let createTasks = function (taskDataObj) {
  let taskList = document.createElement("li");
  taskList.classList = "task-item";
  taskList.setAttribute("data-task-id", taskIdCounter);

  let taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  taskList.appendChild(taskInfoEl);

  let taskActionsEl = createTaskActions(taskIdCounter);

  taskList.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(taskList);

  tasksToDoEl.appendChild(taskList);

  taskIdCounter++;
};
// create edit and delete buttons
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
// delete entries
let taskButtonHandler = function (event) {
  let targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    let taskDataID = event.target.getAttribute("data-task-id");
    editTask(taskDataID);
  }

  if (targetEl.matches(".delete-btn")) {
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
// edit entries
let editTask = function (taskDataID) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskDataID + "']"
  );

  let captureTaskName = taskSelected.querySelector("h3.task-name").textContent;

  let taskDropDown = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = captureTaskName;
  document.querySelector("select[name='task-type']").value = taskDropDown;

  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskDataID);
};
// submit user data
formEl.addEventListener("submit", taskForm);
// clicking on edit or delete buttton
pageContent.addEventListener("click", taskButtonHandler);
