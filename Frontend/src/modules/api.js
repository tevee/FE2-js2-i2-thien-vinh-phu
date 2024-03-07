const baseUrl = 'http://localhost:3000/tasks'
const header = {"Content-type": "application/json; charset=UTF-8"}

async function getTasks() {
    const res = await fetch(baseUrl)
    const data = await res.json()
    if(res.status === 404) throw data

    return data;
}

async function addTask(task) {
    const options = {
        method: "POST",
        body: JSON.stringify(task),
        headers: header
    }

    const res = await fetch(baseUrl, options)
    const info = await res.json()
    if(res.status === 400) throw info
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
    if(res.status === 404) throw info
}

async function deleteTask(id) {
    const url = `${baseUrl}/removetask/${id}`
    const options = {method: "DELETE"}

    const res = await fetch(url, options)
    const info = await res.json()
    if(res.status === 404) throw info
}

export {getTasks, addTask, updateTask, deleteTask}