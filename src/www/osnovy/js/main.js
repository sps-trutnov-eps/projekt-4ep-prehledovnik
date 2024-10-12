async function CreateNewCurriculum() {
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

async function SaveCurriculum(event, id) {
    event.preventDefault(); // Prevent default form submission
	
	const table = document.getElementById("curriculums");
    const rows = table.rows;
    const jsonData = {};
	
	console.log(rows);
	
	// Extract data from each row
    for (let i = 1; i < rows.length-1; i++) {
		let curriculum = rows[i]["childNodes"]["1"]["childNodes"]["3"]["value"];
		let hours = rows[i]["childNodes"]["7"]["childNodes"]["0"]["value"];
		let cur = {"tema": curriculum, "pocetHodin": hours};
		jsonData[`${i}`] = cur;
    }
	jsonData["nextID"] = rows.length-1;
	
	const formData = new FormData(event.target);
	let data = new URLSearchParams(formData);
	
	data.append("temata", JSON.stringify(jsonData));
	//console.log(data);
	
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

function updateCurriculumHours() {
    const table = document.getElementById("curriculums");
    const rows = table.rows;
	let doPredchozi = 0;

    // Loop through each row to calculate "Od" and "Do"
    for (let i = 1; i < rows.length - 1; i++) {
        const hoursInput = rows[i].querySelector('.hour-input');
		//console.log(hoursInput);
        const hours = parseInt(hoursInput["childNodes"]["0"]["value"]) || 0; // Get hours or default to 0
        const odCell = rows[i].cells[1]; // "Od" cell
        const doCell = rows[i].cells[2]; // "Do" cell

        // Set the "Od" value to totalHours
		
		let od = doPredchozi;
		let doCur = od;
		doCur -= -(hours);
		doPredchozi = doCur+1;
	
        // Calculate and set the "Do" value
		odCell.textContent = od;
        doCell.textContent = doCur;
    }
}
