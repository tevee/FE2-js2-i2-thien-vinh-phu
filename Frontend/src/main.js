import * as api from "./modules/api.js"
import displayScrumBoard from "./modules/display.js"

api.getTasks().then(displayScrumBoard)

const taskFormEl = document.querySelector('#taskForm')
taskFormEl.addEventListener('submit', event => {
    event.preventDefault()
    let newTask = {
        status: 'to do',
        assigned: 'none'
    }

    const formData = new FormData(taskFormEl)
    for(const [key, values] of formData) {
        newTask[key] = values
    }

    api.addTask(newTask).then(() => {
        api.getTasks().then(displayScrumBoard)
    })

    taskFormEl.reset()
})

const scrumBoardEl = document.querySelector('#scrumBoard')
scrumBoardEl.addEventListener('click', event => {
    event.preventDefault()
    const {target} = event

    if(target.id != 'scrumBoard') {
        let id;

        if(target.id === '') id = target.closest('.category').id
        else id = target.id

        if(target.tagName === 'BUTTON' && target.closest('#toDo')) {
            const toDoForm = target.closest('.to-do-form')
            if(!toDoForm.reportValidity()) {
                return;
            }

            const assignedInput = toDoForm.querySelector('input').value
            let updatedTask = {
                status: 'in progress',
                assigned: assignedInput
            }

            api.updateTask(id, updatedTask).then(() => {
                api.getTasks().then(displayScrumBoard)
            })

            toDoForm.reset()
        }
        else if(target.tagName === 'BUTTON' && target.closest('#inProgress')) {
            let updatedStatus = {status: 'done'}
            
            api.updateTask(id, updatedStatus).then(() => {
                api.getTasks().then(displayScrumBoard)
            })
        }
        else if(target.tagName === 'BUTTON' && target.closest('#done')) {
            api.deleteTask(id).then(() => {
                api.getTasks().then(displayScrumBoard)
            })
        }
    }
})