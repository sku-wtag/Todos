import { $createButton, $taskContainer } from "./element.js";
import { sanitizeInput } from "./utlity.js";

let isFormOpen = false;
let tasks = [];

const getUniqueId = () => Date.now();

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

const createTask = (task) => {
  let $listElement = document.createElement("li");
  $listElement.setAttribute("id", task.id);
  $listElement.innerText = task.title;
  return $listElement;
};

const renderTasks = (taskContiner, tasks) => {
  tasks.map((task) => {
    let element = createTask(task);
    taskContiner.appendChild(element);
  });
};

const addTaskHandler = () => {
  let $title = document.getElementById("title");
  let titleValue = sanitizeInput($title.value);

  if (titleValue.length) {
    tasks.push({
      id: getUniqueId(),
      title: titleValue,
    });
    render(tasks);
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

const render = (tasks) => {
  $taskContainer.innerHTML = "";
  if (isFormOpen) {
    let form = createForm();
    $taskContainer.appendChild(form);
    renderTasks($taskContainer, tasks);
    return;
  }
  renderTasks($taskContainer, tasks);
};

const showForm = () => {
  toogleButton();
  render(tasks);
};

$createButton.addEventListener("click", showForm);
