import {body, validationResult} from "express-validator"

const taskValidation = {
    body: [
        body('task').exists().isString(),
        body('category').exists().isString(),
        body('status').exists().isString(),
        body('assigned').exists().isString()
    ],
    validResult(req) {
        return validationResult(req)
    }
}

export {taskValidation}