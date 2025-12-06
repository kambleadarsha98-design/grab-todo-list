// --- DOM Selectors ---

// Select the column containers using their IDs
const todo = document.querySelector("#Todo");
const working = document.querySelector("#progress");
const done = document.querySelector("#Done");

// Select all individual task elements using their class
const tasks = document.querySelectorAll(".task1");

// Select modal elements using their IDs
const openBtn = document.getElementById('open-task-modal-btn');
const closeBtn = document.getElementById('close-task-modal-btn');
const modal = document.getElementById('task-modal-overlay');

// --- Input/Display Selectors (for Live Feedback and Submission) ---
// These are the elements you want to make persistent.

// 'title' is the display element for the task title
const title = document.querySelector("#taskvlaue"); 
// 'inputTask' is the actual input field for the title
const inputTask = document.querySelector("#inputTask");
// 'submit' is the button that triggers the save
let submit = document.querySelector("#close-task-modal-btn");
// 'dis' is the input field for the description
const dis = document.querySelector("#task-description"); 
// 'display' is the display element for the description
const display = document.querySelector("#display"); 

// --- Local Storage Functions ---

/**
 * Saves the current title and description to Local Storage.
 * @param {string} taskTitle - The final task title to save.
 * @param {string} taskDescription - The final task description to save.
 */
function saveTask(taskTitle, taskDescription) {
    const taskData = {
        title: taskTitle,
        description: taskDescription,
        // Optional: Save the column, e.g., 'Todo'
        column: 'Todo' 
    };
    // Save the object as a JSON string
    localStorage.setItem('kanbanLastTask', JSON.stringify(taskData));
    console.log("Task saved persistently to Local Storage.");
}

/**
 * Loads the last submitted task from Local Storage and displays it.
 */
function loadLastTask() {
    const savedData = localStorage.getItem('kanbanLastTask');
    
    if (savedData) {
        // Convert the JSON string back into a JavaScript object
        const task = JSON.parse(savedData);
        
        // Display the loaded data in the designated elements
        title.innerHTML = task.title;
        display.textContent = task.description;
        
        console.log("Last Task Loaded from Storage:", task.title);
    }
}


// --- Drag and Drop Logic (No change needed) ---

let drag = null; 

tasks.forEach(task => {
    task.addEventListener("dragstart", () => {
        drag = task;
        setTimeout(() => task.classList.add("dragging"), 0); 
    });

    task.addEventListener("dragend", () => {
        drag = null;
        task.classList.remove("dragging");
    });
});

function addDragEventsOnColumn(column) {
    
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        if (drag) {
            column.classList.add("hover-over");
        }
    });

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", () => {
        if (drag) {
            column.appendChild(drag);
            column.classList.remove("hover-over");
            console.log("Dropped task:", drag.textContent.trim().split('\n')[0], "into column:", column.id);
        }
    });
}

addDragEventsOnColumn(done);
addDragEventsOnColumn(todo);
addDragEventsOnColumn(working);


// --- Modal and Form Logic (Slight adjustment to the closeBtn handler) ---

openBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

// We attach the submit logic to the closeBtn for convenience, but we must use preventDefault() 
// in both the click listener and the submit.onclick handler if they both hide the modal.
closeBtn.addEventListener('click', (e) => { 
    // This is primarily to hide the modal and must be placed before the submission logic runs
    // to ensure the submission logic can handle the form data.
    modal.classList.remove('show');
});


// ----------------------------------------------------------------
// 3. LIVE UPDATE LISTENERS 
// ----------------------------------------------------------------

// Live update for the main title as the user types
inputTask.addEventListener("input", function() { 
    title.innerHTML = inputTask.value;
});

// Live update for the task description display as the user types
dis.addEventListener("input", function(){
    display.textContent = dis.value; 
});


// ----------------------------------------------------------------
// 4. SUBMIT BUTTON HANDLER (Saves Data to Local Storage)
// ----------------------------------------------------------------

submit.onclick = function(e) {
    // CRITICAL: Prevent the page from reloading
    e.preventDefault(); 
    
    const finalTaskTitle = inputTask.value.trim();
    const finalTaskDescription = dis.value.trim();
    
    if (finalTaskTitle || finalTaskDescription) {
        
        // --- 1. SAVE TO LOCAL STORAGE ---
        saveTask(finalTaskTitle, finalTaskDescription);

        // --- 2. UPDATE DISPLAY / CLEAR FORM ---
        
        // Note: You would typically create a new task element here, 
        // but for persistence, we just show the final saved data.
        title.innerHTML =  finalTaskTitle;
        display.textContent =  finalTaskDescription;
        
        // Clear the form inputs
        inputTask.value = "" ;
        dis.value = "";
        
        console.log("Task submitted, saved, and displays updated.");
    } else {
        alert("Please enter a title or description before submitting.");
    }

    
};

// ----------------------------------------------------------------
// 5. INITIAL PAGE LOAD HANDLER (Loads Data from Local Storage)
// ----------------------------------------------------------------

// This runs once when the browser finishes loading the page
window.onload = loadLastTask;  



const  hide  =  document.querySelector(".delete"); 

const   listTask  =   document.querySelector(".task1"); 


hide.onclick =   function(){
 
   listTask.remove()
    e.preventDefault() 
   
    window.onload =  listTask;
}




