import { $createButton, $taskContainer } from "./element.js";
import { sanitizeInput, getUniqueId } from "./utlity.js";

let isFormOpen = false;
let tasks = [];

const createForm = (taskInfo = {}) => {
  const $liElement = document.createElement("li");
  const $inputElement = document.createElement("textarea");
  const $addButton = document.createElement("button");

  $addButton.innerHTML = "Add";
  $inputElement.setAttribute("name", "title");
  $inputElement.setAttribute("placeholder", "Enter your task name");
  $inputElement.setAttribute("id", "title");
  $addButton.setAttribute("id", "add-task");
  $addButton.addEventListener("click", () => addTaskHandler());

  $addButton.classList.add("add-button");

  if (taskInfo.title) {
    $title.value = taskInfo.title;
  }

  $liElement.appendChild($inputElement);
  $liElement.appendChild($addButton);

  return $liElement;
};

const createTaskElement = (task) => {
  const $listElement = document.createElement("li");
  $listElement.setAttribute("id", task.id);
  $listElement.innerText = task.title;
  return $listElement;
};

const createTasks = (taskContiner, tasks) => {
  tasks.map((task) => {
    const element = createTaskElement(task);
    taskContiner.appendChild(element);
  });
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
