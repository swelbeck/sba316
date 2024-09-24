// Create a To Do List/Task List where there are two columns
// Column One: Task
// Column Two: Due Date
// Add circle or box, that can be checked off to mark a completed task
// When task is completed, strikethrough and move to bottom of the list...
// If I can figure it out, hide completed tasks (invisible)
// If Due date passes, make due date color red, and alert user
// Adding a new task should create a row in the table
// Delete task button/icon

const tList = document.getElementById("taskList");
const tInput = document.getElementById("taskInput");
const tBtn = document.getElementById("addTaskBtn");
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
const tableHead = document.createElement(`thead`)
table.appendChild(tableHead)
app.appendChild(table);
// console.log(table);
// console.log(table.rows);
console.log(table)
tableHead.textContent = `Hello`;
// if (table.rows.length == 0 && c == 0) {
//       td.textContent = "Task Name";
//     } else if (table.rows.length == 0 && c == 1) {
//       td.textContent = "Due Date";}
// Event listener for Task button
tBtn.addEventListener(`click`, addTask);
tBtn.addEventListener(`keydown`, addTask);

// The function to handle adding new tasks.
function addTask(event) {
  const newTask = tInput.value;
  //   console.log(newTask);

  // If task input is empty, don't do anything
  if (newTask === "") return;

  //Create list element
  const newListItem = document.createElement("li");
  // Set new list item to the entered task
  newListItem.textContent = newTask;
  // Add each list item to the UL
  tList.appendChild(newListItem);

  //Creating a new row in the table
  const tr = document.createElement("tr");
  tr.style.borderBottom = `1px solid black`; // Not working at the moment

  // for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    // console.log(cols, c);
    const td = document.createElement("td");
    // console.log(table)
    // console.log(table.rows)
    // console.log(table.rows.length);
    if (c == 0) {
      td.textContent = newTask;
    }
    tr.appendChild(td);
  }

  table.appendChild(tr);
  tInput.value = "";
  tInput.focus();
}
