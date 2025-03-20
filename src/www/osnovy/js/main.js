async function CreateCurriculum() {
	event.preventDefault(); // Prevent default form submission
	
	try {
        const response = await fetch('/osnovy/create', {
            method: 'POST'
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const jsonResponse = await response.json();

        // Redirect after handling
        window.location.href = `/osnovy/${jsonResponse.id}`;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function RemoveCurriculum(id) {
	event.preventDefault(); // Prevent default form submission
	
	try {
        const response = await fetch(`/osnovy/remove/${id}`, {
            method: 'POST'
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const jsonResponse = await response.json();

        // Redirect after handling
        window.location.href = `/osnovy`;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function SaveCurriculum(event, id) {
	event.preventDefault(); // Prevent default form submission
	
	const table = document.getElementById("curriculums");
	const rows = table.rows;
	const jsonData = {};
	
	
	// Extract data from each row
	for (let i = 1; i < rows.length-1; i++) {
		const curriculumInput = rows[i].querySelector('.curriculum-input');
		const curriculum = curriculumInput.querySelector('.curriculum-i')["value"];
		const hoursInput = rows[i].querySelector('.hour-input');
		const hours = parseInt(hoursInput.value) || 0;
		let cur = {"tema": curriculum, "pocetHodin": hours};
		jsonData[`${i}`] = cur;
	}
	jsonData["nextID"] = rows.length-1;
	
	const formData = new FormData(event.target);
	let data = new URLSearchParams(formData);
	
	data.append("temata", JSON.stringify(jsonData));
	
	try {
		
		const response = await fetch(`/osnovy/save/${id}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: data,
		});
		
		// Check if response is OK
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		
        // Parse JSON response
        const jsonResponse = await response.json();

        // Redirect after handling
		/*if (jsonResponse.id == undefined){
			window.location.href = `/osnovy`;
		}*/
		
		window.location.href = `/osnovy/${jsonResponse.id}`;
		} catch (error) {
         console.error('Error:', error);
		}
}

function deleteRow(button) {
	// Get the current row (tr) of the button
	const row = button.parentNode.parentNode;
	
	// Get the table body
	const tableBody = document.getElementById("table-body");
	
	// Delete the row from the table
	tableBody.deleteRow(row.rowIndex - 1); // Adjust for header row
	updateCurriculumHours();
	updateRowColors();
}

function addRow() {
	// If the index.ejs changes drastically,
	// this will become a nightmare to change
	
	const tableBody = document.getElementById("table-body");
	
	// Create a new row
	const newRow = document.createElement("tr");
	newRow.className = "cur";
	
	// Create actionsCell
	const actionsCell = document.createElement("td");
	actionsCell.style.display = "flex";
	actionsCell.className = "curriculum-input";
	
	const deleteButton = document.createElement("input");
	deleteButton.type = "button";
	deleteButton.value = "-";
	deleteButton.className = "deleteCurButton";
	deleteButton.style.marginBottom = "0";
	deleteButton.onclick = function() { deleteRow(this); };
	
	const textInput = document.createElement("input");
	textInput.type = "text";
	textInput.style.margin = "0";
	textInput.value = ""; 
	textInput.className = "curriculum-i";
	
	actionsCell.appendChild(deleteButton);
	actionsCell.appendChild(textInput);
	
	const previousHoursCell = document.createElement("td");
	previousHoursCell.style.textAlign = "center";
	previousHoursCell.innerText = "0";
	
	const currentHoursCell = document.createElement("td");
	currentHoursCell.style.textAlign = "center";
	currentHoursCell.innerText = "0";
	
	const hourInputCell = document.createElement("td");
	hourInputCell.style.textAlign = "center";
	
	const hoursInput = document.createElement("input");
	hoursInput.type = "number";
	hoursInput.style.margin = "0";
	hoursInput.value = "1";
	hoursInput.min = 0;
	hoursInput.className = "hour-input";
	
	hoursInput.onchange = function() {
		updateFrontend();
	};
	
	hoursInput.oninput = function() {
		this.validity.valid || (this.value = '');
	};
	
	hourInputCell.appendChild(hoursInput);
	
	newRow.appendChild(actionsCell);
	newRow.appendChild(previousHoursCell);
	newRow.appendChild(currentHoursCell);
	newRow.appendChild(hourInputCell);
	
	// Append the new row to the table body
	tableBody.insertBefore(newRow, tableBody.rows[tableBody.rows.length - 1]);
	
	updateCurriculumHours();
	updateRowColors();
}

function updateFrontend(){
	updateCurriculumHours();
	updateRowColors();
}

function updateCurriculumHours() {
	const table = document.getElementById("curriculums");
	const rows = table.rows;
	let doPredchozi = 0;
	const totalHours = document.getElementById("pHodin").value;

	let currentTotalHours = 0;
	
	// Loop through each row to calculate "Od" and "Do"
	// It starts from one to get rid of off the first row and ends with -1 to get rid of off the last row
	for (let i = 1; i < rows.length-1; i++) {
	
		const hoursInput = rows[i].querySelector('.hour-input');
		const hours = parseInt(hoursInput.value) || 0; // Get hours or default to 0
		const odCell = rows[i].cells[1]; // "Od" cell
		const doCell = rows[i].cells[2]; // "Do" cell
		
		// Set the "Od" value to totalHours
		
		let od = doPredchozi;
		let doCur = od;
		doCur -= -(hours);
		doPredchozi = doCur;
		
		// Calculate and set the "Do" value
		odCell.textContent = od;
		doCell.textContent = doCur;
		doCell.style.color = '';

		currentTotalHours += hours;
		
	}
}

let prevSwitchState = [true, false, false];

function threeWaySwitch() {
	const calculateHours = document.getElementById("calculateHours");
	const theory = document.getElementById("teorieCheckBox");
	const exercise = document.getElementById("cviceniCheckBox");
	
	if (calculateHours.checked != prevSwitchState[2]) {
		theory.checked = false;
		exercise.checked = false;
		calculateHours.checked = true;
		
		prevSwitchState[0] = false;
		prevSwitchState[1] = false;
		prevSwitchState[2] = true;
	} else if (theory.checked != prevSwitchState[1]) {
		exercise.checked = false;
		theory.checked = true;
		calculateHours.checked = false;
		
		prevSwitchState[0] = false;
		prevSwitchState[1] = true;
		prevSwitchState[2] = false;
	} else if (exercise.checked != prevSwitchState[0]) {
		exercise.checked = true;
		theory.checked = false;
		calculateHours.checked = false;
		
		prevSwitchState[0] = true;
		prevSwitchState[1] = false;
		prevSwitchState[2] = false;
	}
}

function calculateTheTotalHours() {
	threeWaySwitch();
	const calculateHours = document.getElementById("calculateHours").checked;
	
	if (!calculateHours){
		const theory = document.getElementById("teorieCheckBox").checked;
		const exercise = document.getElementById("cviceniCheckBox").checked;
		
		const totalHours = document.getElementById("pHodin");
		const year = document.getElementById("rocnik");
		//const customHoursAWeek = document.getElementById("customHoursAWeek");
		
		let hoursAWeek = 2;
		if (theory){ hoursAWeek = 1; }
		//if (customHoursAWeek.value > 0) { hoursAWeek = customHoursAWeek.value; }
		
		let weeksAYear = 34;
		if (year.value == 4) { weeksAYear -= 4; }

		totalHours.value = hoursAWeek*weeksAYear;
	}
	
	updateRowColors();
}

// Kontrola a aktualizaca barev buněk
function updateRowColors() {
    const table = document.getElementById("curriculums");
    const rows = table.rows;
    const totalHours = parseInt(document.getElementById("pHodin").value) || 0;
	
	 // Pokud tam jsou nějaký témata (kontrolujeme jestli tam jsou více než dva řádky)
	 if (rows.length > 2){
		 // rows.length - 2 je předposlední řádek
		 const doCell = rows[rows.length - 2].cells[2];

		 // Nastavení barvy na základě kontroly
		 if (parseInt(doCell.textContent) !== totalHours) {
			doCell.style.color = 'red';
		 } else {
			doCell.style.color = '';
		 }
	 }
	 
}

function hideDiv(id) {
	/*const div = document.getElementById(id);
	if (div.style.display === "none"){ div.style.display = "block"; }
	else { div.style.display = "none"; }*/
}

function reorderCurriculum() {
  const container = document.getElementById('curriculumContainerMain');
  const curDivs = Array.from(container.querySelectorAll('.cur')); // Select .cur divs within the container
  const addCursDiv = document.getElementById('addCurrrsss');
  // Skip the first div
  const divsToSort = curDivs;
  divsToSort.slice(1);

  divsToSort.sort((a, b) => {
    const valueA = a.querySelector('input[type="button"]:nth-child(2)').value.trim();
    const valueB = b.querySelector('input[type="button"]:nth-child(2)').value.trim();

    // Handle empty values: Put empty values at the end
    if (valueA === "" && valueB !== "") return 1;
    if (valueA !== "" && valueB === "") return -1;
    if (valueA === "" && valueB === "") return 0; // Keep order if both are empty

    // Lexicographical comparison (you can modify this for numerical sorting if needed)
    return valueA.localeCompare(valueB, undefined, { numeric: true, sensitivity: 'base' });
  });

  // Clear the container and re-append the first div followed by sorted divs
  container.innerHTML = '';  // Remove all child nodes
  container.appendChild(addCursDiv); // Append the first div back
  divsToSort.forEach(div => container.appendChild(div)); // Append sorted divs
}


window.onload = (event) => {
    calculateTheTotalHours();
    updateRowColors();
	reorderCurriculum();
};