let dayCounter = document.getElementById("scmz-table").querySelector("tbody").children.length;
if (dayCounter == 0) { dayCounter = 1; }

document
.getElementById("pridat-datum")
.addEventListener("click", function () {
    dayCounter++;
    const tableBody = document.querySelector("#scmz-table tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td><input type="date" name="den${dayCounter}_datum" disabled></td>
    <td><input type="checkbox" class="zadavani-checkbox" style="padding: 0.5em; font-size: 50px;" disabled></td>
    <td><input type="time" name="den${dayCounter}_casod" class="casod-input" disabled style="padding: 0.5em;"></td>
    <td><input type="time" name="den${dayCounter}_casdo" class="casdo-input" disabled style="padding: 0.5em;"></td>
    <td>
        <input type="text" name="den${dayCounter}_ucebna" class="ucebna-input" disabled style="padding: 0.5em;">
    </td>
    <td>
        <select name="den${dayCounter}_predmet" class="predmet-select" disabled style="padding: 0.5em;">
        <option value="">Vyberte předmět</option>
        <option value="ČJ">ČJ</option>
        <option value="AJ">AJ</option>
        <option value="MA">MA</option>
        </select>
    </td>
    `;

    tableBody.appendChild(newRow);
    addCheckboxFunctionality(newRow);

    if (document.getElementById("edit-button").style.display === "none") {
    newRow.querySelector("input[type='date']").disabled = false;
    newRow.querySelector("input[type='checkbox']").disabled = false; 
    }
});

function addCheckboxFunctionality(row) {
const checkbox = row.querySelector(".zadavani-checkbox");
const timeFromInput = row.querySelector(".casod-input");
const timeToInput = row.querySelector(".casdo-input");
const classroomInput = row.querySelector(".ucebna-input");
const subjectSelect = row.querySelector(".predmet-select");

checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
    timeFromInput.disabled = false;
    timeToInput.disabled = false;
    classroomInput.disabled = false;
    subjectSelect.disabled = false;
    } else {
    timeFromInput.value = "";
    timeFromInput.disabled = true;
    timeToInput.value = "";
    timeToInput.disabled = true;
    classroomInput.value = "";
    classroomInput.disabled = true;
    subjectSelect.selectedIndex = 0;
    subjectSelect.disabled = true;
    }
});
}

document.getElementById("edit-button").addEventListener("click", function () {
document.querySelectorAll("input[type='date'], input[type='checkbox']").forEach(input => input.disabled = false);
document.getElementById("pridat-datum").disabled = false; 
document.getElementById("edit-button").style.display = "none";
document.getElementById("save-button").style.display = "inline-block";
});

document.querySelector("form").addEventListener("submit", function () {
document.querySelectorAll("tbody tr").forEach(function (row) {
    const checkbox = row.querySelector(".zadavani-checkbox");
    const timeFromInput = row.querySelector(".casod-input");
    const timeToInput = row.querySelector(".casdo-input");
    const classroomInput = row.querySelector(".ucebna-input");
    const subjectSelect = row.querySelector(".predmet-select");

    if (checkbox.checked) {
    timeFromInput.disabled = false;
    timeToInput.disabled = false;
    classroomInput.disabled = false;
    subjectSelect.disabled = false;
    }
});
});

document.querySelectorAll("tbody tr").forEach(addCheckboxFunctionality);