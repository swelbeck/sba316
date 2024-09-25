// Create a To Do List/Task List where there are two columns
// Column One: Task
// Column Two: Due Date
// Add circle or box, that can be checked off to mark a completed task
// When task is completed, strikethrough and move to bottom of the list...
// If I can figure it out, hide completed tasks (invisible)
// If Due date passes, make due date color red, and alert user
// Adding a new task should create a row in the table
// Delete task button/icon

// const tList = document.getElementById("taskList");
const tInput = document.getElementById("taskInput");
const tBtn = document.querySelector("#addTaskBtn");
// const tBtn = document.getElementById("submitBtn");
const container = document.getElementById("toDoContainer");

// Adding style elements
container.style.border = `2px solid black`;
container.style.backgroundColor = `lightblue`;
container.style.padding = `10px`;
// container.style.margin = `auto`;
// container.style.justifyContent = `center`;

const rows = 10;
const cols = 2;

const app = document.getElementById("taskTable");
const table = document.createElement("table");
const tableHead = document.createElement(`thead`);
const tableBody = document.createElement(`tbody`)
const headerRow = tableHead.insertRow(0);

// Add Task Name heading
const nameCell = headerRow.insertCell(0);
nameCell.textContent = `Task Name`;
console.log(nameCell.parentNode)

// Add Due Date heading
const dateCell = headerRow.insertCell(1);
dateCell.textContent = `Due Date`;
console.log(dateCell.parentElement)
table.appendChild(tableHead);
table.appendChild(tableBody)
app.appendChild(table);
console.log(table.nodeValue);

// Event listener for Task button
tBtn.addEventListener(`click`, handleClick);
// Event listener for Enter key
tInput.addEventListener(`keydown`, handleEnterBtn);


table.lastChild.addEventListener("click", (e) => {

  e.target.classList.toggle("strikethrough");
});


// The function to handle adding new tasks.
function handleEnterBtn(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("addTaskBtn").click();
  }
}

function handleClick() {
  const newTask = tInput.value;
  // If task input is empty, don't do anything
  if (newTask === "") return;

  // Create a new row in the table
  const tr = document.createElement("tr");
  tr.style.borderBottom = `1px solid black`; // Not working at the moment

  for (let c = 0; c < cols; c++) {
    const td = document.createElement("td");

    if (c == 0) {
      td.textContent = newTask;
    }
    tr.appendChild(td);
  }

  tableBody.appendChild(tr);
  tInput.value = "";
  tInput.focus();
}
