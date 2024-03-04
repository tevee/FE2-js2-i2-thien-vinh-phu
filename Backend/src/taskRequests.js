import {Router} from "express"
import { taskValidation } from "./validation.js"
import { getTasks, addTask, updateTask, removeTask } from "./handledb.js"

const taskRouter = Router()

taskRouter.get('/', async (req, res) => {
    getTasks().then(task => {
        res.json(task)
        console.log(task);
    })
})

taskRouter.post('/', taskValidation.body, async (req, res) => {
    const errors = taskValidation.validResult(req)

    if(errors.array().length > 0) {
        res.status(400).json({message: 'Wrong format'})
    }
    else {
        await addTask(req.body).then(task => res.json(task))
    }
})

taskRouter.patch('/updatetask/:id', async (req, res) => {
    updateTask(req.params.id, req.body.status, req.body.assigned).then(task => {
        if(task) res.json(task)
        else {
            res.status(404)
            res.json({message: 'Task not found'})
        }
    })
})

taskRouter.delete('/removetask/:id', async (req, res) => {
    await removeTask(req.params.id).then(task => {
        if(task) res.json({task, message: 'removed'})
        else {
            res.status(404)
            res.json({message: 'Task not found'})
        }
    })
})

export {taskRouter}