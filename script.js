const todo = document.querySelector("#Todo");
const  working = document.querySelector("#progress");
const done = document.querySelector("#Done");

const tasks = document.querySelectorAll(".task1"); 



let drag = null ; 

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
    drag = task ;
    });
});

function  addDragEventsOnColumn(column){
    column.addEventListener("dragenter", (e) =>{
         e.preventDefault();
        column.classList.add("hover-over");
    })

 column.addEventListener("dragleave", (e) =>{
         e.preventDefault();
        column.classList.remove("hover-over");
    }) 

     column.addEventListener("dragover",(e)=>{
        e.preventDefault()
     })

column.addEventListener("drop", (e) => {
    e.preventDefault(); 
      console.log("dropped", drag, column);
      
        column.appendChild(drag);

      column.classList.remove("hover-over")
    
    
});

}

addDragEventsOnColumn(done);
addDragEventsOnColumn(todo);
addDragEventsOnColumn(working);




const openBtn = document.getElementById('open-task-modal-btn');
const closeBtn = document.getElementById('close-task-modal-btn');
const modal = document.getElementById('task-modal-overlay');

// 1. When 'Add New Task' is clicked, show the modal
openBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

// 2. When 'Submit Task' (or close button) is clicked, hide the modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Optional: Hide modal if user clicks on the blurred background itself
modal.addEventListener('click', (event) => {
    // Check if the click target is the modal overlay, not the form inside it
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

    // 1. Get the HTML element objects

    let  title  =   document.getElementById("heading") 

    let  headingTitle =   document.getElementById("task-title")
 

    headingTitle.textContent =   title.value ; 


    console.log(headingTitle);



  