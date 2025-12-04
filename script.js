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
