const baseUrl = 'http://localhost:3000/tasks'
const header = {"Content-type": "application/json; charset=UTF-8"}

async function getTasks() {
    const res = await fetch(baseUrl)
    const data = await res.json()
    return data
}

async function addTask(task) {
    const options = {
        method: "POST",
        body: JSON.stringify(task),
        headers: header
    }

    const res = await fetch(baseUrl, options)
    const info = await res.json()
    console.log(info);
}

async function updateTask(id, task) {
    const url = `${baseUrl}/updatetask/${id}`
    const options = {
        method: "PATCH",
        body: JSON.stringify(task),
        headers: header
    }

    const res = await fetch(url, options)
    const info = await res.json()
    console.log(info);
}

async function deleteTask(id) {
    const url = `${baseUrl}/removetask/${id}`
    const options = {method: "DELETE"}

    const res = await fetch(url, options)
    const info = await res.json()
    console.log(info);
}

export {getTasks, addTask, updateTask, deleteTask}