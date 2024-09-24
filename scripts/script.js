const tList = document.getElementById("taskList");
const tInput = document.getElementById("taskInput");
const tBtn = document.getElementById("addTaskBtn");
const container = document.getElementById("toDoContainer");

container.style.border = `2px solid black`;
container.style.alignItems = `center`;

// Event listener for Task button
tBtn.addEventListener(`click`, addTask)
tBtn.addEventListener(`keydown`, addTask)


// The function to handle adding new tasks.
function addTask(event) {
  const newTask = tInput.value;
    console.log(newTask)
  // If task input is empty, don't do anything
  if (newTask === "") return;

  tList.appendChild(document.createElement("li")).textContent = newTask;
  tInput.value = "";
  tInput.focus();
}