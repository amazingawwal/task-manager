const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

let tasks = [];


function loadTasksFromFile() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    tasks = JSON.parse(data);
  }
}


function saveTasksToFile() {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}


function addTask(title, description) {
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  saveTasksToFile();
  return newTask;
}


function getAllTasks() {
  return tasks;
}


function markTaskComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = true;
    saveTasksToFile();
    return true;
  }
  return false;
}


function deleteTask(taskId) {
  const index = tasks.findIndex(t => t.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToFile();
    return true;
  }
  return false;
}

function formatDate(isoString) {
    const date = new Date(isoString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; 
  
    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  }
  


loadTasksFromFile();

module.exports = {
  addTask,
  getAllTasks,
  markTaskComplete,
  deleteTask,
  saveTasksToFile,
  loadTasksFromFile,
  formatDate
};
