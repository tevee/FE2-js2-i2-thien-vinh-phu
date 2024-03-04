function createAndAppend(type, content, container) {
    const el = document.createElement(type)
    if(type === 'img') el.src = content
    else el.innerText = content
    container.append(el)
    return el
}

function displayToDo(tasks) {
    const toDoContainer = document.querySelector('#toDo')
    toDoContainer.innerHTML = ''
    createAndAppend('h2', 'To Do', toDoContainer)

    for(const task of tasks) {
        const card = createAndAppend('div', '', toDoContainer)
        createAndAppend('p', task.task, card)

        const form = createAndAppend('form', '', card)
        createAndAppend('input', '', form).placeholder = 'Enter name'
        createAndAppend('button', 'Assign >>', form).classList.add('form-button')

        let categoryName;
        if(task.category.includes('dev')) categoryName = task.category.slice(4)
        else categoryName = task.category

        card.id = task.id
        card.classList.add(categoryName, 'category')
        form.classList.add('to-do-form')
    }
}

function displayInProgress(tasks) {
    const inProgressContainer = document.querySelector('#inProgress')
    inProgressContainer.innerHTML = ''
    createAndAppend('h2', 'In Progress', inProgressContainer)

    for(const task of tasks) {
        const card = createAndAppend('div', '', inProgressContainer)
        createAndAppend('p', task.task, card)
        createAndAppend('p', `-${task.assigned}`, card).classList.add('scrumBoard-assigned')
        createAndAppend('button', 'Done >>', card)
        
        let categoryName;
        if(task.category.includes('dev')) categoryName = task.category.slice(4)
        else categoryName = task.category

        card.id = task.id
        card.classList.add(categoryName, 'category')
    }
}

function displayDone(tasks) {
    const doneContainer = document.querySelector('#done')
    doneContainer.innerHTML = ''
    createAndAppend('h2', 'Done', doneContainer)

    for(const task of tasks) {
        const card = createAndAppend('div', '', doneContainer)
        createAndAppend('p', task.task, card)
        createAndAppend('p', `-${task.assigned}`, card).classList.add('scrumBoard-assigned')
        createAndAppend('button', 'Remove X', card)

        let categoryName;
        if(task.category.includes('dev')) categoryName = task.category.slice(4)
        else categoryName = task.category

        card.id = task.id
        card.classList.add(categoryName, 'category')
    }
}

export default function displayScrumBoard(tasks) {
    const toDoTasks = tasks.filter((task) => task.status === 'to do')
    const inProgressTasks = tasks.filter((task) => task.status === 'in progress')
    const doneTasks = tasks.filter((task) => task.status === 'done')

    displayToDo(toDoTasks)
    displayInProgress(inProgressTasks)
    displayDone(doneTasks)
}