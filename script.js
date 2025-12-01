const todo = document.querySelector("#Todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#Done");

const tasks = document.querySelectorAll(".task1");

tasks.forEach(task => {
    task.addEventListener("dragstart", (e) => {
        console.log("dragging", e.target);
    });
});



