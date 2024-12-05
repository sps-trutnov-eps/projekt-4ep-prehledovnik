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
		console.log(jsonResponse); // Handle your JSON data here
		
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
		console.log(jsonResponse); // Handle your JSON data here
		
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
	
	console.log(rows);
	
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
	console.log("data");
	console.log(data);
	
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
		console.log(jsonResponse); // Handle your JSON data here
		
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
	hoursInput.value = "0";
	hoursInput.min = 0;
	hoursInput.className = "hour-input";
	
	hoursInput.onchange = function() {
		updateCurriculumHours();
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
	
	updateCurriculumHours()
}

function updateCurriculumHours() {
	const table = document.getElementById("curriculums");
	const rows = table.rows;
	let doPredchozi = 0;
	
	// Loop through each row to calculate "Od" and "Do"
	// It starts from one to get rid of off the first row and ends with -1 to get rid of off the last row
	for (let i = 1; i < rows.length-1; i++) {
	
		const hoursInput = rows[i].querySelector('.hour-input');
		//console.log(hoursInput);
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
		
		console.log(odCell);
	}
}
