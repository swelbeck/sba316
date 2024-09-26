// Create a To Do List/Task List where there are two columns
// Column One: Task
// Column Two: Due Date
// Adding a new task should create a row in the table
// Add circle or box, that can be checked off to mark a completed task

// When task is completed, strikethrough and move to bottom of the list...
// OR If I can figure it out, hide completed tasks (invisible)
// If Due date passes, make due date color red, and alert user
// Delete task button/icon

// Add validation where if the item is marked completed - they should input the completion date

const tForm = document.getElementById("taskForm");
const tInput = document.getElementById("taskInput");
const tBtn = document.querySelector("#addTaskBtn");
const tableContainer = document.getElementById("taskTable");
// const tBtn = document.getElementById("submitBtn");
const container = document.getElementById("toDoContainer");

// Adding style elements
container.style.border = `2px solid lightgrey`;
container.style.backgroundColor = `ghostwhite`;
container.style.padding = `10px`;
container.style.margin = `10px 50px`;
container.style.textAlign = `center`;
container.firstElementChild.style.marginBottom = `40px`;

// Create table structure
const cols = 2;
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
tableContainer.appendChild(table);

table.style.margin = `0 auto`;

// Event listener for Task form
tForm.addEventListener(`submit`, handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const newTask = tInput.value;
  addTask(newTask);

  // Clear the input and focus it for new input
  tInput.value = "";
  tInput.focus();
}

tableBody.addEventListener("click", (e) => {
  // Check if the clicked target or any of its parents has the class 'taskItemDivLeft'
  const taskItemDivLeft = e.target.closest(".taskItemDivLeft");

  if (taskItemDivLeft) {
    // Find the icon within the clicked task item
    const icon = taskItemDivLeft.querySelector(".task-icon");
    const text = taskItemDivLeft.querySelector("p");

    // Toggle the icon classes
    icon.classList.toggle("bi-square");
    icon.classList.toggle("bi-check2-square");

    // Toggle the strikethrough class on the text
    text.classList.toggle("strikethrough");
  }
});

function addTask(newTask) {
  // Create a new row in the table
  const tr = document.createElement("tr");
  tr.style.borderBottom = `1px solid lightgrey`;

  for (let c = 0; c < cols; c++) {
    const td = document.createElement("td");

    // Add tasks in the first column of table
    if (c == 0) {
      const taskItemContainerLeft = document.createElement("div");
      taskItemContainerLeft.setAttribute(`class`, `taskItemDivLeft`);
      taskItemContainerLeft.style.display = "flex";
      taskItemContainerLeft.style.alignItems = "center";
      taskItemContainerLeft.style.gap = "10px";

      const i = document.createElement("i");
      i.classList = `bi bi-square task-icon`;
      i.style.fontSize = "20px";

      const p = document.createElement("p");
      p.textContent = newTask;
      p.style.margin = `0`;
      p.style.textAlign = `center`;

      taskItemContainerLeft.appendChild(i);
      taskItemContainerLeft.appendChild(p);

      td.appendChild(taskItemContainerLeft);
      td.style.width = `70%`;
    }

    // Add date inputs in second column of each row
    if (c == 1) {
      const taskItemContainerRight = document.createElement("div");
      taskItemContainerRight.setAttribute(`class`, `taskItemDivRight`);
      taskItemContainerRight.style.display = "flex";
      taskItemContainerRight.style.alignItems = "center";
      taskItemContainerRight.style.gap = "10px";

      const ic = document.createElement("i");
      ic.classList = `bi bi-trash trash-icon`;
      ic.style.fontSize = "20px";
      ic.style.color = `red`;

      const dateInput = document.createElement("input");
      dateInput.type = `date`;
      dateInput.classList = `dueDate`;

      taskItemContainerRight.appendChild(dateInput);
      taskItemContainerRight.appendChild(ic);

      // Attach the date input to the cell and event listener
      td.style.width = `30%`;
      td.appendChild(taskItemContainerRight);
      dateInput.addEventListener(`change`, handleDate);
    }
    tr.appendChild(td);
  }

  tableBody.appendChild(tr);
}

function handleDate(evt) {
  let input = evt.target.value;
  let dateEntered = new Date(input);

  const todaysDate = new Date();

  // console.log("Date entered: ", dateEntered.toString());
  // console.log("Today's date: ", todaysDate.toString());

  if (dateEntered.getTime() < todaysDate.getTime()) {
    window.alert(`This date has passed, please enter a different date.`);
  }
}

function pastDueAlert() {
  const today = new Date();
  const rows = tableBody.querySelectorAll("tr");
  console.log(rows);
  rows.forEach((row) => {
    const dateInput = row.cells[1].querySelector("input");
    if (dateInput && dateInput.value) {
      const taskDueDate = new Date(dateInput.value);
      const tomorrowsDate = today.setDate(today.getDate() + 1);
      if (taskDueDate.toDateString() === tomorrowsDate.toDateString()) {
        window.alert(`Your task is due tomorrow!`);
      }
    }
  });
}
