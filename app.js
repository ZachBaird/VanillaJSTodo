// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('ul.collection');
const clearBtn = document.querySelector('a.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Method to persist task data to local storage
const storeTaskInLocalStorage = taskText => {
    let tasks;

    if (localStorage.getItem('tasks') === null) tasks = [];
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Method to remove task from local storage
const removeTaskFromLocalStorage = taskItem => {
    let tasks;

    if (localStorage.getItem('tasks') === null) tasks = [];
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((t, index) => {
        if (taskItem.textContent === t) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Method to clear all tasks from local storage
const clearTasksFromLocalStorage = () => {
    localStorage.clear();
}

// Load all event listeners
const loadEventListeners = () => {
    // add task event
    form.addEventListener('submit', e => {
        e.preventDefault();

        // if value is null, alert user
        if (taskInput.value === '') alert('Add a task');
        else {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(taskInput.value));

            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<li class="fa fa-remove"></li>';
            li.appendChild(link);

            taskList.appendChild(li);

            storeTaskInLocalStorage(taskInput.value);

            taskInput.value = '';
        }
    });

    // remove task event
    taskList.addEventListener('click', e => {
        if (e.target.parentElement.classList.contains('delete-item')) {
            if (confirm('Are you sure?')) {
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
                e.target.parentElement.parentElement.remove();
            }
        }
    });

    // clear tasks event
    clearBtn.addEventListener('click', e => {
        e.preventDefault();

        // one way to do it
        //if (confirm('Are you sure?')) taskList.innerHTML = '';

        // faster way to do it
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        clearTasksFromLocalStorage();
    });

    // filter tasks event
    filter.addEventListener('keyup', e => {
        const text = e.target.value.toLowerCase();

        // returns a node list so we can use .forEach
        document.querySelectorAll('.collection-item').forEach(t => {
            const item = t.firstChild.textContent;

            if (item.toLowerCase().indexOf(text) != -1) t.style.display = 'block';
            else t.style.display = 'none';
        });
    })

    // DOM load event
    document.addEventListener('DOMContentLoaded', e => {
        // get tasks from local storage
        let tasks;

        if (localStorage.getItem('tasks') === null) tasks = [];
        else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(t => {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(t));

            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<li class="fa fa-remove"></li>';
            li.appendChild(link);

            taskList.appendChild(li);
        });

    });
};

loadEventListeners();