let selectedCell;
let selectedInput;
let dayCounter = document.getElementById("table-body").children.length;
let isEditing = false;

const hodinyCasy = [
  "8:00-8:45",
  "8:50-9:35",
  "9:55-10:40",
  "10:50-11:35",
  "11:40-12:25",
  "12:35-13:20",
  "13:25-14:10",
  "14:15-15:00",
  "15:10-15:55",
];

function toggleEdit() {
  isEditing = !isEditing;
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const editButton = document.getElementById("edit-button");
  const saveButton = document.getElementById("save-button");
  const addButton = document.getElementById("pridat-datum");

  dateInputs.forEach((input) => {
    input.disabled = !isEditing;
  });

  if (isEditing) {
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
    addButton.disabled = false; 
  } else {
    editButton.style.display = "inline-block";
    saveButton.style.display = "none";
    addButton.disabled = true;  
  }
}

document.querySelectorAll(".clickable-cell").forEach((cell) => {
  cell.addEventListener("click", function () {
    if (!isEditing) return;

    selectedCell = this;
    selectedInput = this.querySelector("input");
    const selectedHour = cell.getAttribute("data-hodina");

    document.getElementById(
      "selectedHourText"
    ).textContent = `Hodina: ${selectedHour}. (${hodinyCasy[selectedHour - 1]})`;

    const currentClassroom = selectedInput.value;
    if (currentClassroom) {
      document.getElementById("classroomSelect").value = currentClassroom;
    } else {
      document.getElementById("classroomSelect").value = "T15";
    }

    document.getElementById("classroomModal").style.display = "block";
  });
});

function saveClassroom() {
  const selectedClassroom = document.getElementById("classroomSelect").value;

  selectedInput.value = selectedClassroom;

  selectedCell.textContent = selectedClassroom;

  selectedCell.appendChild(selectedInput);

  closeModal();
}

function closeModal() {
  document.getElementById("classroomModal").style.display = "none";
}

function addRow() {
  dayCounter++;
  const tableBody = document.getElementById("table-body");
  const newRow = document.createElement("tr");

  const dateCell = document.createElement("td");
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "den" + dayCounter + "_datum[]";
  dateInput.disabled = !isEditing;
  dateCell.appendChild(dateInput);
  newRow.appendChild(dateCell);

  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = `den${dayCounter}_ucebna-${i}[]`;

    cell.innerHTML = '<span class="clickable-cell-content">Vybrat</span>';
    cell.className = "clickable-cell";
    cell.appendChild(input);



    cell.textContent = "Vybrat";
    cell.className = "clickable-cell";
    cell.appendChild(input);

    cell.addEventListener("click", function () {
      if (!isEditing) return;

      selectedCell = cell;
      selectedInput = input;

      document.getElementById(
        "selectedHourText"
      ).textContent = `Hodina: ${i}. (${hodinyCasy[i - 1]})`;

      const currentClassroom = selectedInput.value;
      if (currentClassroom) {
        document.getElementById("classroomSelect").value = currentClassroom;
      } else {
        document.getElementById("classroomSelect").value = "T15";
      }

      document.getElementById("classroomModal").style.display = "block";
    });
    newRow.appendChild(cell);
  }

  tableBody.appendChild(newRow);
}

function enableForm() {
  const form = document.getElementById("form");
  const inputs = form.querySelectorAll("input, select");

  inputs.forEach((input) => {
    input.disabled = false;
  });

  document.getElementById("editButton").style.display = "none";
  document.getElementById("submitButton").style.display = "inline-block";
}