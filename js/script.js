
import {
    $createButton,
    $taskContainer
} from './element.js'

let isFormOpen = false
let tasks = []

const getUniqueId = () => Date.now();

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
    let $textContainer = document.createElement('span')
    let $deleteButton = document.createElement('button')

    $listElement.setAttribute('id', task.id);
    $deleteButton.setAttribute('id', `btn-${task.id}`);
    $listElement.appendChild($textContainer);
    $listElement.appendChild($deleteButton);

    $deleteButton.addEventListener('click',()=>deleteTask(task.id))

    $textContainer.innerText = task.title;
    $deleteButton.innerText = 'Delete'
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
    let titleValue = $title?.value?.trim();
    
    if (titleValue.length) {
        tasks.push({
            id: getUniqueId(),
            title: titleValue
        })
        render(tasks)
    }
}

const deleteTask = (taskId) => {
    taskId = parseInt(taskId)
    tasks = tasks.filter((task)=> taskId!=task.id)
    render(tasks);
}

const toogleButton = () => {
    if (!isFormOpen) {
        $createButton.innerText = 'Hide form'
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

const render = (tasks) =>{
    if (isFormOpen) {
        renderListWithForm(tasks)
    }
    else {
        renderListWithoutForm(tasks);
    }
}

const showForm = () => {
    toogleButton();
    render(tasks);
}

$createButton.addEventListener('click', showForm)


