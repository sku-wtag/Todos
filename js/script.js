
import {
    $createButton,
    $taskContainer
} from './element.js'

let isFormOpen = false
let tasks = [ ]

const makeForm = (taskInfo = {}) => {
    let $form = document.createElement('form')
    let $title = document.createElement('input');
    let $addButton = document.createElement('button')

    $addButton.innerHTML = "Add"
    $title.setAttribute('name', 'title');
    $title.setAttribute('placeholder',"Enter your list name")
    $title.setAttribute('id', 'title')
    $addButton.setAttribute('id', 'add-task')
   
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


const generateTasks = (tasks) => {
    let $taskList = document.createElement('ul')
    tasks.map((task) => {
        $taskList.append(generateTask(task))
    })
    return $taskList
}

const renderTasks = (tasks) => {
    return generateTasks(tasks)
}


const addTask = () => {
    let $inputForm = document.getElementById('title')
    tasks.push({
        id: Math.random()%100000000, 
        title: $inputForm.value
    })
    console.log(tasks)
    renderTasks(tasks)
}



const showForm = () => {
    if (!isFormOpen) {
        let form = makeForm();
        let renderElements = renderTasks(tasks);
        $taskContainer.appendChild(renderElements)
        $taskContainer.insertBefore(form, $taskContainer.firstChild)
        $createButton.innerText = 'Hide'
        isFormOpen = true
    }
    else {
        $taskContainer.innerHTML = ''
        $taskContainer.appendChild(renderTasks(tasks))
        isFormOpen = false
    }
}

$createButton.addEventListener('click', showForm)


