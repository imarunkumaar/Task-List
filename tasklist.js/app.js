// DEFINE UI VARS
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// create an string alphabhets to check if it has an empty string
let alpha = "abcdefghijklmnopqrstuvwxyx1234567890"
//load all the event listener
loadEventListeners();


//load all the event listener
function loadEventListeners() {
  // dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // form submit trigger
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // clear task
  clearBtn.addEventListener('click', clearTask);
  // filter task
  filter.addEventListener('keyup', filterTasks);

}






// get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // create text node
    li.appendChild(document.createTextNode(task))

    // Create new link
    const link = document.createElement("a");
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon;
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append  link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  })
}



// Add Task
function addTask(e) {


  // need to check if there is not an empty string in the list
  let check = taskInput.value
  var regExp = /[a-z0-9]/i; //contains all string a-z and numbers
  // /[a-z]/i.test(str) //we can also use this to check if it has only letters


  if (regExp.test(check) === false) {
    alert("Add a task");
    taskInput.value = '';
  } else {


    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // create text node
    li.appendChild(document.createTextNode(taskInput.value))

    // Create new link
    const link = document.createElement("a");
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon;
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append  link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // store i local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear the input 
    taskInput.value = '';

  }
  e.preventDefault();
}




function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  // store tasks
  // simply do this if you want faster
  tasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Remove tasks
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm('are you sure')) {
      e.target.parentElement.parentElement.remove();

      // remove from the ls also
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks))
}




function clearTask() {
  //  slower method
  // taskList.innerHTML = '';
  // console.log(taskList);

  // fastermethod
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }

  clearTasksFromLocalStorage();
}
// clear ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
}



function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block"
    } else {
      task.style.display = "none"
    }
  });

}




