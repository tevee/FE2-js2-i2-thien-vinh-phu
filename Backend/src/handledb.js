import fs from "fs/promises"

async function readDB(){
    const rawDB = await fs.readFile('./src/db.json');
    const db = JSON.parse(rawDB);
    return db;
}

async function writeDB(db){
    const newDB = JSON.stringify(db, null, 2);
    await fs.writeFile('./src/db.json', newDB);
}

async function getTasks() {
    const {tasks} = await readDB()
    return tasks
}

async function addTask(task) {
    const newTask = {id: crypto.randomUUID(), ...task}
    const tasks = await getTasks()
    tasks.push(newTask)

    const newDB = {tasks}
    await writeDB(newDB)
    return newTask
}

async function updateTask(id, newStatus, newAssigned) {
    const tasks = await getTasks()
    const task = tasks.find(task => task.id == id)
    task.status = newStatus
    if(newAssigned !== undefined) {
        task.assigned = newAssigned
    }

    const newDB = {tasks}
    await writeDB(newDB)
    
    return task
}

async function removeTask(id) {
    const tasks = await getTasks();
    let index;
    console.log(tasks);
    const task = tasks.find((t, i) => {
        index = i;
        return t.id == id;
    })

    if(task) {
        tasks.splice(index, 1)
        const newDB = {tasks}
        await writeDB(newDB)
    }
    return task
}

export {getTasks, addTask, updateTask, removeTask}