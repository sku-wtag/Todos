import { $createButton, $taskContainer } from "./element.js";
import { sanitizeInput, getUniqueId } from "./utlity.js";
import { READ, EDIT, ALL } from "./const.js";

let isFormOpen = false;
let tasks = [];

const editForm = (liElement, task) => {
  const $inputElement = document.createElement("input");
  const $updateButton = document.createElement("button");
  const $cancelButton = document.createElement("button");
  const $deleteButton = document.createElement("button");

  $inputElement.setAttribute("id", `input-${task.id}`);

  $inputElement.value = task.title;

  $deleteButton.innerText = "Delete";
  $updateButton.innerHTML = "Update";
  $cancelButton.innerHTML = "Cancel";

  $deleteButton.addEventListener("click", () => deleteTaskHandler(task.id));
  $updateButton.addEventListener("click", () => updateTaskHandler(task.id));
  $cancelButton.addEventListener("click", () => calcelTaskHandler(task.id));

  liElement.append($inputElement, $updateButton, $deleteButton, $cancelButton);

  return liElement;
};

const createForm = (taskInfo = {}) => {
  const $liElement = document.createElement("li");
  const $inputElement = document.createElement("input");
  const $addButton = document.createElement("button");

  $addButton.innerHTML = "Add";
  $inputElement.setAttribute("name", "title");
  $inputElement.setAttribute("placeholder", "Enter your task name");
  $inputElement.setAttribute("id", "title");
  $addButton.setAttribute("id", "add-task");
  $addButton.addEventListener("click", () => addTaskHandler());

  if (taskInfo.title) {
    $title.value = taskInfo.title;
  }

  $liElement.appendChild($inputElement);
  $liElement.appendChild($addButton);

  return $liElement;
};

const createTaskElement = (task) => {
  const $listElement = document.createElement("li");

  if (task.mode == READ) {
    const $textContainer = document.createElement("span");
    const $editButton = document.createElement("button");
    const $deleteButton = document.createElement("button");

    $editButton.addEventListener("click", () => editTaskHandler(task.id));
    $deleteButton.addEventListener("click", () => deleteTaskHandler(task.id));

    $deleteButton.innerText = "Delete";
    $textContainer.innerText = task.title;
    $editButton.innerText = "Edit";

    $listElement.append($textContainer, $editButton, $deleteButton);
  } else if (task.mode == EDIT) {
    editForm($listElement, task);
  }

  return $listElement;
};

const createTasks = (taskContiner, tasks) => {
  tasks.map((task) => {
    const element = createTaskElement(task);
    taskContiner.appendChild(element);
  });
};

const deleteTaskHandler = (taskId) => {
  taskId = parseInt(taskId);
  tasks = tasks.filter((task) => taskId !== task.id);
  render();
};

const updateTaskHandler = (taskId) => {
  const $inputElement = document.getElementById(`input-${taskId}`);
  const inputValue = sanitizeInput($inputElement.value);
  let task = tasks.find((task) => task.id === taskId);
  if (inputValue.length > 0) {
    task.title = inputValue;
    task.mode = READ;
    render();
  }
};

const editTaskHandler = (taskId) => {
  let taskItem;
  tasks.forEach((task) => {
    task.mode = READ;
    if (task.id === taskId) taskItem = task;
  });
  taskItem.mode = EDIT;
  render();
};

const calcelTaskHandler = (taskId) => {
  let task = tasks.find((task) => task.id === taskId);
  task.mode = READ;
  render();
};

const addTaskHandler = () => {
  const $title = document.getElementById("title");
  const titleValue = sanitizeInput($title.value);

  if (titleValue.length) {
    tasks.push({
      id: getUniqueId(),
      title: titleValue,
      mode: READ,
    });
    render();
  }
};

const toogleButton = () => {
  if (!isFormOpen) {
    $createButton.innerText = "Hide form";
    isFormOpen = true;
    return;
  }

  $createButton.innerText = "Create";
  isFormOpen = false;
};

const render = () => {
  $taskContainer.innerHTML = "";
  if (isFormOpen) {
    const form = createForm();
    $taskContainer.appendChild(form);
  }
  createTasks($taskContainer, tasks);
};

const showForm = () => {
  toogleButton();
  render();
};

$createButton.addEventListener("click", showForm);
