// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listerners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit',addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks)
    // filter task
    filter.addEventListener('keyup', filterTask);
}

// Get Tasks from Ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks= [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){       
          // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(task));

//    var listValue =  document.createTextNode(taskInput.value);
//    li.appendChild(listValue);
//    console.log(li);
   

    // create new link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    });
}
// Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
        
    }
    else{
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

//    var listValue =  document.createTextNode(taskInput.value);
//    li.appendChild(listValue);
//    console.log(li);
   

    // create new link element
    const link =document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // store in Local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';
    
    e.preventDefault();
}
}
// store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks= [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove Task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure ?')){

            console.log(e.target);
            e.target.parentElement.parentElement.remove();
            // Remove from Local storage   
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);  

        }
    }
    
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){ 
    // console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks= [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);

        }
    });
    localStorage.setItem('task', JSON.stringify(tasks));
}

// clear Task
function clearTasks(){
    // taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
    //   cclear from local storage
    clearTasksfromLocalStorage();
}
function clearTasksfromLocalStorage(){
    localStorage.clear();
}
// filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        console.log(item);
        if (item.toLocaleLowerCase().indexOf(text)!= -1) {
            task.style.display = 'block';

        }
        else{
            task.style.display = 'none';
        }
    })
    

}