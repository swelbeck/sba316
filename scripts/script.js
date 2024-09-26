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
container.style.margin = `10px 50px`;
container.style.textAlign = `center`;
container.firstElementChild.style.marginBottom = `40px`;

const rows = 10;
const cols = 2;

const app = document.getElementById("taskTable");
const table = document.createElement("table");
const tableHead = document.createElement(`thead`);
const tableBody = document.createElement(`tbody`);
const headerRow = tableHead.insertRow(0);
headerRow.style.fontWeight = `bold`;

// Add Task Name heading
const nameCell = headerRow.insertCell(0);
nameCell.textContent = `Task Name`;
nameCell.style.width = `70%`;

// Add Due Date heading
const dateCell = headerRow.insertCell(1);
dateCell.textContent = `Due Date`;
dateCell.style.width = `30%`;

table.appendChild(tableHead);
table.appendChild(tableBody);
app.appendChild(table);

table.style.margin = `0 auto`;

// Event listener for Task button
tBtn.addEventListener(`click`, addTask);
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

function addTask() {
  const newTask = tInput.value;
  // If task input is empty, don't do anything
  if (newTask === "") return;

  // Create a new row in the table
  const tr = document.createElement("tr");
  tr.style.borderBottom = `1px solid black`;

  for (let c = 0; c < cols; c++) {
    const td = document.createElement("td");

    if (c == 0) {
      td.textContent = newTask;
      td.style.width = `70%`;
    }
    if (c == 1) {
      // Create a new date input for each row
      const dateInput = document.createElement("input");
      dateInput.type = `date`;
      dateInput.classList = `dueDate`;

      // Attach the date input to the cell and event listener
      td.style.width = `30%`;
      td.appendChild(dateInput);
      dateInput.addEventListener(`change`, handleDate);
    }

    tr.appendChild(td);
  }

  tableBody.appendChild(tr);
  tInput.value = "";
  tInput.focus();
}

function handleDate(evt) {
  let input = evt.target.value;
  let dateEntered = new Date(input);
  dateEntered.setHours(0, 0, 0, 0);

  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  if (dateEntered.getTime() < todaysDate.getTime()) {
    window.alert(`This date has passed, please enter a different date.`);
  }
}

function pastDueAlert() {
  const today = new Date();
  const rows = tableBody.querySelectorAll("tr");

  rows.forEach((row) => {
    const dateInput = row.cells[1].querySelector("input"); // Get the date input from the second cell
    if (dateInput && dateInput.value) {
      const taskDueDate = new Date(dateInput.value); // Convert due date to Date object
      const tomorrowsDate = today.setDate(today.getDate() + 1);
      if (taskDueDate === tomorrowsDate) {
        window.alert(`Your task is due tomorrow!`);
      }
    }
  });
}
