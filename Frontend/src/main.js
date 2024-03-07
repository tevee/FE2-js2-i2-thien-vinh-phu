/**
 * Thien Vinh Phu, 2024
 * (c) CC BY - https://creativecommons.org/licenses/by/4.0/
 *
 * Scrum Board
 * Uses my own API - https://localhost:3000/tasks
 *
 * User can enter a task by submitting the task form
 * Task displays in To Do column
 * User can assign a name for the submitted task
 * Task displays in In Progress column
 * User can change task status to done by pressing corresponding button
 * Task displays in Done column
 * User can remove task by pressing corresponding button
 */

import * as api from "./modules/api.js"
import {displayScrumBoard, displayError} from "./modules/display.js"

api.getTasks()
    .then(displayScrumBoard)
    .catch(displayError)

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
    }).catch(displayError)

    taskFormEl.reset()
})

const scrumBoardEl = document.querySelector('#scrumBoard')
scrumBoardEl.addEventListener('click', event => {
    event.preventDefault()
    const {target} = event

    if(target.id != 'scrumBoard') {
        let id;

        if(target.tagName === 'H2') return;
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
            }).catch(displayError)

            toDoForm.reset()
        }
        else if(target.tagName === 'BUTTON' && target.closest('#inProgress')) {
            let updatedStatus = {status: 'done'}
            
            api.updateTask(id, updatedStatus).then(() => {
                api.getTasks().then(displayScrumBoard)
            }).catch(displayError)
        }
        else if(target.tagName === 'BUTTON' && target.closest('#done')) {
            api.deleteTask(id).then(() => {
                api.getTasks().then(displayScrumBoard)
            }).catch(displayError)
        }
    }
})