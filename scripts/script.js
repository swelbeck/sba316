// Create a To Do List/Task List where there are two columns
// Column One: Task
// Column Two: Due Date
// Adding a new task should create a row in the table
// Add circle or box, that can be checked off to mark a completed task

// When task is completed, strikethrough and move to bottom of the list...
// OR If I can figure it out, hide completed tasks (invisible)
// ***If Due date passes, make due date color red, and alert user
// Delete task button/icon
// Add prompt that checks if the user is sure about deleting an item.
// ***Add validation where if the item is marked completed - they should input the completion date

const tForm = document.getElementById("taskForm");
const tInput = document.getElementById("taskInput");
const tBtn = document.querySelector("#addTaskBtn");
const tableContainer = document.getElementById("taskTable");
// const tBtn = document.getElementById("submitBtn");
const container = document.getElementById("toDoContainer");

// Adding style elements
container.style.border = `2px solid lightgrey`;
container.style.backgroundColor = `ghostwhite`;
container.style.padding = `40px`;
container.style.alignSelf = `center`;
container.style.minWidth = `400px`;
container.style.minHeight = `500px`;
container.style.margin = `60px auto`;
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

  almostDueAlert();
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

    //
    if (text.classList.contains("strikethrough")) {
      const row = e.target.closest("tr");

      // Move row to the bottom of table when checked
      setTimeout(() => {
        tableBody.removeChild(row);
        tableBody.appendChild(row);
      }, 500);
    }
    // else {
    //   // Move row back to the top of the table
    //   setTimeout(() => {
    //     tableBody.prepend(row);
    //   }, 500);
    // }
  }

  const trashIcon = e.target.closest(".trash-icon");
  if (trashIcon) {
    const rowRemoved = trashIcon.closest("tr");

    if (window.confirm("Are you sure you want to delete this task?")) {
      rowRemoved.remove();
    }
  }
});

function addTask(newTask) {
  const fragment = document.createDocumentFragment();
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

  fragment.appendChild(tr);
  tableBody.appendChild(fragment);
}

function handleDate(evt) {
  const dateInput = evt.target;
  const inputValue = dateInput.value;

  // Create a Date object using the input value as local time
  const dateParts = inputValue.split("-");
  const dateEntered = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  // Check if the date is valid
  if (isNaN(dateEntered.getTime())) {
    evt.target.style.color = `red`;
    window.alert(`Please enter a valid date.`);
    return;
  }
  dateEntered.setHours(0, 0, 0, 0);
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0); // Set to midnight

  if (dateEntered < todaysDate) {
    console.log("Entered date is in the past.");
    dateInput.style.color = `red`;
    window.alert(`This date has passed, please enter a different date.`);
  } else if (dateEntered.toDateString() === todaysDate.toDateString()) {
    console.log("Entered date is today.");
    dateInput.style.color = `black`;
  } else {
    console.log("Entered date is in the future.");
    dateInput.style.color = `black`;
  }
}

// Call pastDueAlert on page load
window.onload = function () {
  almostDueAlert();
};

function almostDueAlert() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const rows = tableBody.querySelectorAll("tr");

  rows.forEach((row) => {
    // console.log(row);
    const dateInput = row.cells[1].querySelector("input");
    if (dateInput && dateInput.value) {
      const taskDueDate = new Date(dateInput.value);

      if (taskDueDate.toDateString() === tomorrow.toDateString()) {
        window.alert(`Your task is due tomorrow!`);
      }
    }
  });
}
