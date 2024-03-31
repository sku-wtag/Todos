import { $createButton, $taskContainer } from "./element.js";
import { sanitizeInput, getUniqueId } from "./utlity.js";

let isFormOpen = false;
let tasks = [];

const createForm = () => {
  const $liElement = document.createElement("li");
  const $inputElement = document.createElement("textarea");
  const $addButton = document.createElement("button");
  const $cancelButton = document.createElement("button");

  $addButton.innerHTML = "Add Task";
  $cancelButton.innerText = "Cancel";
  $inputElement.setAttribute("name", "title");
  $inputElement.setAttribute("placeholder", "Enter your task name");
  $inputElement.setAttribute("id", "title");
  $addButton.setAttribute("id", "add-task");
  $addButton.addEventListener("click", () => addTaskHandler());
  $cancelButton.addEventListener("click", () => {
    toogleButton();
    render();
  });

  $addButton.classList.add("add-button");

  $liElement.append($inputElement, $addButton, $cancelButton);

  return $liElement;
};

const createTaskElement = (task) => {
  const $listElement = document.createElement("li");
  const $textContainer = document.createElement("span");
  const $deleteButton = document.createElement("button");
  $listElement.setAttribute("id", task.id);

  $deleteButton.addEventListener("click", () => deleteTaskHandler(task.id));

  $textContainer.innerText = task.title;
  $deleteButton.innerText = "Delete";

  $listElement.append($textContainer, $deleteButton);
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

const addTaskHandler = () => {
  const $title = document.getElementById("title");
  const titleValue = sanitizeInput($title.value);

  if (titleValue.length) {
    tasks.push({
      id: getUniqueId(),
      title: titleValue,
    });
    render();
  }
};

const toogleButton = () => {
  if (!isFormOpen) {
    isFormOpen = true;
    return;
  }
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
