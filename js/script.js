
import {
    $createButton,
    $taskContainer
} from './element.js'

let isFormOpen = false
let tasks = []

const getUniqueId = () => `element-${Date.now()}`;

const makeForm = (taskInfo = {}) => {
    let $form = document.createElement('li')
    let $title = document.createElement('input');
    let $addButton = document.createElement('button')

    $addButton.innerHTML = "Add"
    $title.setAttribute('name', 'title');
    $title.setAttribute('placeholder', "Enter your task name")
    $title.setAttribute('id', 'title')
    $addButton.setAttribute('id', 'add-task')
    $addButton.addEventListener('click', () => addTask())

    if (taskInfo.title) {
        $title.value = taskInfo.title
    }

    $form.appendChild($title);
    $form.appendChild($addButton)

    return $form
}

const generateTask = (task) => {
    let $listElement = document.createElement('li');
    $listElement.setAttribute('id', task.id);
    $listElement.textContent = task.title;

    return $listElement;
}



const renderTasks = (taskContiner, tasks) => {
    tasks.map((task) => {
        let element = generateTask(task)
        taskContiner.appendChild(element)
    })
}


const addTask = () => {

    let $title = document.getElementById('title')
    let titleValue = $title.value.trim();
    if (titleValue.length) {
        tasks.push({
            id: getUniqueId(),
            title: titleValue
        })
        renderListWithForm(tasks)
    }
}

const toogleButton = () => {
    if (!isFormOpen) {
        $createButton.innerText = 'Hide'
        isFormOpen = true
    }
    else {
        $createButton.innerText = 'Create'
        isFormOpen = false
    }
}

const renderListWithForm = (tasks) => {

    let form = makeForm();
    $taskContainer.innerHTML = ''
    $taskContainer.appendChild(form)
    renderTasks($taskContainer, tasks);
}

const renderListWithoutForm = (tasks) => {
    $taskContainer.innerHTML = ''
    renderTasks($taskContainer, tasks);
}

const showForm = () => {

    if (!isFormOpen) {
        renderListWithForm(tasks)
        toogleButton();
    }
    else {
        renderListWithoutForm(tasks);
        toogleButton();
    }
}

$createButton.addEventListener('click', showForm)
