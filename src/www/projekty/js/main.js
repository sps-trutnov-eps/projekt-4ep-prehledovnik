/* MAIN PAGE OF CLASSES */
function addNewTeam(button) {
   const tableBody = button.parentElement.parentElement.parentElement;  // Get the table body
   const newRow = document.createElement('tr');
   newRow.className = 'cur';
   
   // Create first <td> for team ID and delete button
   const td1 = document.createElement('td');
   td1.className = 'curriculum-input';
   td1.style.display = 'flex';
   td1.style.alignItems = 'center';
   
   const deleteButton = document.createElement('input');
   deleteButton.type = 'button';
   deleteButton.value = '-';
   deleteButton.className = 'deleteCurButton';
   deleteButton.style.marginBottom = '0px';
   deleteButton.onclick = function() { deleteTeam(this); };
   
   const teamIdDiv = document.createElement('div');
   teamIdDiv.className = 'teamId';
   teamIdDiv.style.margin = '0 auto';
   teamIdDiv.textContent = tableBody.rows.length;
   
   td1.appendChild(deleteButton);
   td1.appendChild(teamIdDiv);
   
   // Create second <td> for dropdown
   const td2 = document.createElement('td');
   td2.className = 'curriculum-input';
   td2.style.textAlign = 'center';
   
   const dropdownButton = document.createElement('button');
   dropdownButton.className = 'dropdown-btn';
   dropdownButton.onclick = function() { toggleDropdown(this); };
   dropdownButton.textContent = '0';
   
   const dropdownContentDiv = document.createElement('div');
   dropdownContentDiv.className = 'dropdown-content';
   
   const dropdownMembersDiv = document.createElement('div');
   dropdownMembersDiv.className = 'dropdown-members';
   
   // Add option button
   const addOptionDiv = document.createElement('div');
   addOptionDiv.className = 'add-option';
   
   const addOptionButton = document.createElement('input');
   addOptionButton.type = 'button';
   addOptionButton.value = '+';
   addOptionButton.className = 'createButton';
   addOptionButton.style.padding = '0';
   addOptionButton.style.minHeight = '0';
   addOptionButton.style.height = '2em';
   addOptionButton.style.margin = '0';
   
   addOptionButton.onclick= function() { addNewOption(this); };
   
   addOptionDiv.appendChild(addOptionButton);
   dropdownContentDiv.appendChild(dropdownMembersDiv);
   dropdownContentDiv.appendChild(addOptionDiv);
   
   td2.appendChild(dropdownButton);
   td2.appendChild(dropdownContentDiv);
   
   // Create third <td> for input field
   const td3 = document.createElement('td');
   td3.className = 'curriculum-input';
   td3.style.display = 'flex';
   
   const inputField = document.createElement('input');
   inputField.type='text'; 
   inputField.className='curriculum-i, description'; 
   inputField.style.margin='0px';
   
   td3.appendChild(inputField);
   
   // Create fourth <td> for progress
   const td4= document.createElement('td'); 
   td4.style.textAlign='center'; 
   td4.textContent='0'; 
   
   // Append all <td> elements to the new row
   newRow.appendChild(td1);
   newRow.appendChild(td2);
   newRow.appendChild(td3);
   newRow.appendChild(td4);
   
   
   tableBody.insertBefore(newRow, tableBody.rows[tableBody.rows.length - 1]); // Append the new row to the table body
   
   addNewTeamToTheLeft(tableBody.rows.length-1);
   addNewTeamToTheDetails(tableBody.rows.length-1);
}

function deleteTeam(button) {
   const tableBody = button.parentElement.parentElement.parentElement;  // Get the table body
   const teamID = button.parentElement.children[1].textContent;
   
   deleteTeamOnTheLeft(teamID);
   deleteTeamFromTheDetails(teamID);
   
   button.parentElement.parentElement.remove();
   
   for (let i = 0; i < tableBody.rows.length - 1; i++){
      const row = tableBody.rows[i];
      row.children[0].children[1].textContent = i+1;
   }
}

/* left side of the page */

/* <input style="margin-left: 10%; width: 80%;" type="button" value="Tým1"onclick="window.location.href = '/projekty/2ep-1';"> */
function addNewTeamToTheLeft(teamID) {
   let path = window.location.pathname.split('/');
   let id = path[path.length-1];
   
   const button = document.createElement('input');
   
   button.type = 'button';
   button.value = `Tým${teamID}`;
   button.style.marginLeft = '10%';
   button.style.width = '80%';
   
   button.onclick = function() {
      window.location.href = `/projekty/${id}-${teamID}`;
   };
   
   const container = document.getElementById(`${id}`);
   container.appendChild(button);
}


function deleteTeamOnTheLeft(teamID) {
   let path = window.location.pathname.split('/');
   let id = path[path.length-1];
   
   const container = document.getElementById(`${id}`);
   container.children[teamID].remove();
   
   for (let i = 1; i < container.children.length; i++){
      container.children[i].value = `Tým${i}`;
      container.children[i].onclick = function() {
         window.location.href = `/projekty/${id}-${teamID}`;
      };
   }
}




/* dropdown */

function toggleDropdown(button) {
   // Close all other dropdowns first
   const allDropdowns = document.querySelectorAll('.dropdown-content');
   allDropdowns.forEach(dropdown => {
      if (dropdown !== button.nextElementSibling) {
         dropdown.classList.remove('show');
      }
   });
   
   const dropdown = button.nextElementSibling;
   dropdown.classList.toggle('show');
   
   
   const overlay = document.getElementById('overlay');
   overlay.style.display = 'block';
}

function addNewOption(button, addToDetails = 2) {
   const parent = button.parentElement.parentElement;
   const dropdown = parent.querySelector('.dropdown-members'); // Gets the first child with class 'child1'
   
   
   const newOption = document.createElement('div');
   newOption.style.display = 'flex';
   newOption.style.alignItems = 'center';
   newOption.className = 'members-input';
   
   const deleteButton = document.createElement('input');
   deleteButton.type = 'button';
   deleteButton.value = '-';
   deleteButton.className = 'deleteButton';
   deleteButton.style.marginBottom = '0';
   deleteButton.onclick = function() {
      if (addToDetails == 2 || addToDetails == 0){
         deleteOption(this);
      } else if (addToDetails == 1) {
         deleteOptionsCEO(); deleteOption(this, 1); addOptionsCEO(); deleteColumn(getColumnID(this.nextElementSibling.value))
      }
   };
   
   const input = document.createElement('input');
   input.className = 'dropdown-item';
   input.type = 'text';
   input.value = '';
   input.style.margin = '0';
   
   if (addToDetails == 2){
      input.addEventListener('change', function() {
         editMemberInDetails(this);
      });
   } else if (addToDetails == 1) {
      input.addEventListener('change', function() {
         deleteOptionsCEO(); addOptionsCEO(); changeColumnName(getMemberID(this), this.value, 1);
      });
   }
   
   if (addToDetails != 0){
      input.addEventListener('keypress', function() {
         this.dispatchEvent(new Event('change'));
      });
      
      input.addEventListener('paste', function() {
         this.dispatchEvent(new Event('change'));
      });
      
      input.addEventListener('input', function() {
         this.dispatchEvent(new Event('change'));
      });
   }
   

   newOption.appendChild(deleteButton);
   newOption.appendChild(input);
   
   dropdown.appendChild(newOption);
   
   const mainButton = parent.parentElement.children[0];
   mainButton.textContent = dropdown.children.length;
   
   if (addToDetails == 2){
      const teamID = parent.parentElement.parentElement.children[0].children[1].innerHTML;
   
      addMemberToDetails(teamID, 'Člen', dropdown.children.length);
   }
   
}

function deleteOption(button, deleteFromDetails = 2) {
   const mainButton = button.parentElement.parentElement.parentElement.parentElement.children[0];
   const dropdown = button.parentElement.parentElement;
   
   let checkingElement = dropdown.parentElement.parentElement.parentElement.previousElementSibling;
   let totalMemebersBefore = 0;
   let looped = 0;
   while ( true ) {
      if (checkingElement == undefined) {break;}
      totalMemebersBefore -= -checkingElement.children[1].children[0].innerHTML;
      if (checkingElement.previousElementSibling == null) {break;}
      checkingElement = checkingElement.previousElementSibling;
      
      
      looped -= -1;
      if (looped > dropdown.parentElement.parentElement.parentElement.parentElement.children.length) {
         console.error("Stuck in a loop. Breaking.")
         break;
      }
   }
   
   let memberID = 0;
   checkingElement = button.parentElement;
   looped = 0;
   while ( true ) {
      if (checkingElement.nextElementSibling == null) {
         break;
      }
      memberID -= -1;
      checkingElement = checkingElement.nextElementSibling;
      
      looped -= -1;
      if (looped > dropdown.children.length) {
         console.error("Stuck in a loop. Breaking.")
         break;
      }
   }
   
   let teamID = button.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].innerHTML;
   
   
   button.parentElement.remove();
   if (deleteFromDetails == 2){
      deleteMemberFromDetails(teamID, memberID, totalMemebersBefore, dropdown.children.length);
   }
   
   mainButton.textContent = dropdown.children.length;
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
   if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-content *') && !event.target.matches('.deleteButton')) {
      const dropdowns = document.querySelectorAll('.dropdown-content');
      dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
      const overlay = document.getElementById('overlay');
      overlay.style.display = 'none';
   }
});

function showElementAndHideElement(show, hide) {
   document.getElementById(show).style.display = "block";
   document.getElementById(hide).style.display = "none";
}






/* DETAILS PAGE */

/* table sorted by teams */
function addNewTeamToTheDetails(teamID) {
   let table = document.getElementById("detailsTable");
   let teamsRow = document.getElementById("teamsRow");
   
   /*<th style="text-align: center;" colspan="2">Tým1</th>*/
   const th = document.createElement('th');
   th.style.textAlign = 'center';
   th.colSpan = 0;
   th.textContent = `Tým${teamID}`;
   
   teamsRow.appendChild(th);
}

function deleteTeamFromTheDetails(teamID) {
   let table = document.getElementById("detailsTable");
   let teamsRow = document.getElementById("teamsRow");
   
   /*<th style="text-align: center;" colspan="2">Tým1</th>*/
   let teamRows = 0;
   for (let i = 1; i < teamID; i++){
      teamRows -= -teamsRow.children[i].colSpan; 
   }
   
   let marks = document.querySelectorAll(".marks");
   
   for (let m = 0; m < marks.length; m++ ){
      let mark = marks[m];
      for (let i = teamRows+teamsRow.children[teamID].colSpan; i > teamRows; i--){
         if (mark.children[i] == undefined){
            console.error(`mark.children[${i}] is undefined, skipping. (Couldn't find the member)`);
            continue;
         }
         mark.children[i].remove();
      }
   }
   
   teamsRow.children[teamID].remove();
   
   for (let i = 1; i < teamsRow.children.length; i++){
      teamsRow.children[i].innerText = `Tým${i}`;
      
   }
}

function addMemberToDetails(teamID, name, numberOfMembers) {
   let table = document.getElementById("detailsTable");
   let teamsRow = document.getElementById("teamsRow");
   
   teamsRow.children[teamID].colSpan = numberOfMembers;
   
   
   let teamRows = 0;
   for (let i = 1; i < teamID; i++){
      teamRows -= -teamsRow.children[i].colSpan; 
   }
   
   let marks = document.querySelectorAll(".marks");
   
   const membersName = document.createElement('td');
   membersName.style.textAlign = 'center';
   membersName.textContent = name;
   
   
   let mark = marks[0];
   let insertBeforeElement = mark.children[teamRows+1];
   
   if (insertBeforeElement == undefined) {
      mark.appendChild(membersName);
      } else {
      mark.insertBefore(membersName, mark.children[teamRows+1]);
   }
   
   const pitch = document.createElement('td');
   pitch.style.textAlign = 'center';
   pitch.textContent = "?";
   mark = marks[1];
   
   insertBeforeElement = mark.children[teamRows+1];
   if (insertBeforeElement == undefined) {
      mark.appendChild(pitch);
      } else {
      mark.insertBefore(pitch, mark.children[teamRows+1]);
   }
   
   for (let m = 2; m < marks.length; m++ ){
      const markElement = document.createElement('td');
      markElement.style.textAlign = 'center';
      markElement.textContent = 0;
      
      mark = marks[m];
      insertBeforeElement = mark.children[teamRows+1];
      if (insertBeforeElement == undefined) {
         mark.appendChild(markElement);
         } else {
         mark.insertBefore(markElement, mark.children[teamRows+1]);
      }
   }
}

function deleteMemberFromDetails(teamID, memberID, totalMemebersBefore, numberOfMembers) {
   let table = document.getElementById("detailsTable");
   let teamsRow = document.getElementById("teamsRow");
   
   teamsRow.children[teamID].colSpan = numberOfMembers;
   
   
   let teamRows = 0;
   for (let i = 1; i < teamID; i++){
      teamRows -= -teamsRow.children[i].colSpan; 
   }
   
   let marks = document.querySelectorAll(".marks");
   
   for (let m = 0; m < marks.length; m++ ){
      let mark = marks[m];
      
      if (mark.children[totalMemebersBefore+memberID+1] == undefined){
         console.error(`mark.children[${totalMemebersBefore+memberID+1}] is undefined, skipping. (Couldn't find the member)`);
         continue;
      }
      //console.log(mark.children[memberID]);
      mark.children[totalMemebersBefore+memberID+1].remove();
   }
}

function editMemberInDetails (input) {
   const teamsRow = document.getElementById("teamsRow");
   const dropdown = input.parentElement.parentElement;
   
   let checkingElement = dropdown.parentElement.parentElement.parentElement.previousElementSibling;
   let totalMemebersBefore = 0;
   let looped = 0;
   while ( true ) {
      if (checkingElement == undefined) {break;}
      totalMemebersBefore -= -checkingElement.children[1].children[0].innerHTML;
      if (checkingElement.previousElementSibling == null) {break;}
      checkingElement = checkingElement.previousElementSibling;
      
      
      looped -= -1;
      if (looped > dropdown.parentElement.parentElement.parentElement.parentElement.children.length) {
         console.error("Stuck in a loop. Breaking.")
         break;
      }
   }
   
   let memberID = 0;
   checkingElement = input.parentElement;
   looped = 0;
   while ( true ) {
      if (checkingElement.nextElementSibling == null) {
         break;
      }
      memberID -= -1;
      checkingElement = checkingElement.nextElementSibling;
      
      //console.log(checkingElement);
      
      looped -= -1;
      if (looped > dropdown.children.length) {
         console.error("Stuck in a loop. Breaking.")
         break;
      }
   }
   
   let teamID = input.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].innerHTML;
   
   let marks = document.querySelectorAll(".marks");
   
   let mark = marks[0];
   
   console.log(totalMemebersBefore+memberID+1);
   
   if (mark.children[totalMemebersBefore+memberID+1] == undefined){
      console.error(`mark.children[${totalMemebersBefore+memberID+1}] is undefined, skipping. (Couldn't find the member)`);
      } else {
      mark.children[totalMemebersBefore+memberID+1].textContent = input.value;
   }
}



/* table sorted by names */

/* DON'T EVEN ASK */
// now I want the button to have different values....
function sortTableAndOutput() {
   const sourceTable = document.getElementById('detailsTable');
   const targetTable = document.getElementById('sortedDetailsTable');
   
   if (!sourceTable || !targetTable) {
      console.error('One or both tables are missing from the DOM.');
      return;
   }
   
   // Extract rows from source table
   const headerRows = Array.from(sourceTable.querySelectorAll('thead tr'));
   const bodyRows = Array.from(sourceTable.querySelectorAll('tbody tr'));
   
   if (headerRows.length < 2) {
      console.error('The source table does not have enough header rows.');
      return;
   }
   
   // Get all sortable headers (second header row, starting from third column)
   const sortableHeaders = Array.from(headerRows[1].querySelectorAll('th, td')).slice(1);
   console.log(sortableHeaders);
   const sortableData = sortableHeaders.map((header, index) => ({
      index: index + 1, // Adjust for fixed columns
      text: header.textContent.trim(),
   }));
   
   console.log(sortableData);
   
   // Sort based on header text
   sortableData.sort((a, b) => a.text.localeCompare(b.text, undefined, { sensitivity: 'base' }));
   
   // Clone header structure to target table
   const targetHeader = targetTable.querySelector('thead');
   targetHeader.innerHTML = ''; // Clear target header
   
   headerRows.slice(1).forEach((row) => {
      const cells = Array.from(row.children);
      /*console.log("cells");
      console.log(cells);*/
      const fixedCells = cells.slice(0, 1); // Fixed columns
      const newCells = sortableData.map(({ index }) => cells[index] || document.createElement('th'));
      
      const newRow = document.createElement('tr');
      /*console.log("fixed");
      console.log(fixedCells);
      console.log("new");
      console.log(newCells);*/
      [...fixedCells, ...newCells].forEach((cell) => {
         const clonedCell = cell.cloneNode(true);
         //console.log(clonedCell.innerHTML);
         newRow.appendChild(clonedCell);
      });
      
      targetHeader.appendChild(newRow);
   });
   
   // Clone and sort body structure to target table
   const targetBody = targetTable.querySelector('tbody');
   targetBody.innerHTML = ''; // Clear target body
   
   bodyRows.forEach((row) => {
      const cells = Array.from(row.children);
      /*console.log("cells");
      console.log(cells);*/
      const fixedCells = cells.slice(0, 1); // Fixed columns
      const newCells = sortableData.map(({ index }) => cells[index] || document.createElement('td'));
		
      const newRow = document.createElement('tr');
      /*console.log("fixed");
      console.log(fixedCells);
      console.log("new");
      console.log(newCells);*/
      [...fixedCells, ...newCells].forEach((cell) => {
			const clonedCell = cell.cloneNode(true);
			if (clonedCell.innerHTML != ''){
            //console.log(clonedCell.innerHTML);
				newRow.appendChild(clonedCell);
         }
			
      });
      
      targetBody.appendChild(newRow);
   });
   
   console.log("sorted");
}

function switchTables() {
   const table = document.getElementById('detailsTable');
   const sortedTable = document.getElementById('sortedDetailsTable');
   
   const buttonF = document.getElementById("filterButton");
   
    if (table.style.display == 'none'){
        buttonF.value = "Podle jmen";
        table.style.display = '';
        sortTableAndOutput();
        sortedTable.style.display = 'none';
    } else {
        buttonF.value = "Podle týmů";
        sortedTable.style.display = '';
        sortTableAndOutput();
        table.style.display = 'none';
    }
}  




/* SAVING */

async function save(){
    let pitchDate = document.getElementById('datum').value;
    let teamIDs = document.querySelectorAll('.ActulTeamId');
    let members = document.querySelectorAll('.dropdown-members');
    let descriptions = document.querySelectorAll('.description');
    let classID = window.location.pathname.split('/');
    classID = classID[classID.length-1];
    
    console.log(teamIDs);
    console.log(members);
    console.log(descriptions);
    
    let teams = [];
    /* teamID, members, description */
    
    for (let i = 0; i < document.querySelectorAll('.teamId').length; i++){
        const team = {teamID: undefined, members: "undefined", description: "undefined"};
        
         if (i < teamIDs.length) {
            team["teamID"] = teamIDs[i].innerHTML;
         }
        
        
        let mem = [];
        for (let ch = 0; ch < members[i].children.length; ch++){
           const child = members[i].children[ch];
           
           console.log(child);
           
           mem.push(child.children[1].value); /* don't take this out of context :D */
        }
        team["members"] = mem;
        
        team["description"] = descriptions[i].value;
        
        teams.push(team);
    }
    
    const data = {"classID": classID, "pitchDate": pitchDate, "teams": teams};
    
    
    try {
		
		const response = await fetch(`/projekty/save/class`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		});
		
		// Check if response is OK
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		
        // Parse JSON response
        //const jsonResponse = await response.json();
        //console.log(jsonResponse); // Handle your JSON data here

        // Redirect after handling
		/*if (jsonResponse.id == undefined){
			window.location.href = `/osnovy`;
		}*/
		
		//window.location.href = `/projekty/`;
      window.location.reload();
      
		} catch (error) {
		console.error('Error:', error);
		}
    
}






/* TIMELINE */

function updateTimeLine(){
      let date = document.getElementById("datum");
      let startDate;
      if (date == null){
         date = document.getElementById("hiddenDate");
         startDate = date.innerText;
      } else {
         startDate = date.value;
      }
      
      const periods = calculateTwoWeekPeriods(startDate);
      //console.log(`${periods} two-week periods have passed since ${startDate}.`);
      
      setProgress(periods);
}

function calculateTwoWeekPeriods(startDate) {
    const start = new Date(startDate);
    const now = new Date();

    const differenceInMs = now - start;
    const millisecondsInTwoWeeks = 2 * 7 * 24 * 60 * 60 * 1000;
    const twoWeekPeriods = differenceInMs / millisecondsInTwoWeeks;

    return twoWeekPeriods;
}


function setProgress(milestone) {
   if (milestone > 6) { milestone = 6; }
   
   let numOfTimelines = document.querySelectorAll('.progress').length;
   
   for (let timel = 0; timel < numOfTimelines; timel++){
      document.querySelectorAll('.progress')[timel].style.width = `calc(((100% - 30px) / 6)*${milestone})`;
   
      let children = document.querySelectorAll('.timeline')[timel].children;
      
      for (let i = 1; i < children.length; i++) {
         children[i].className = "circle filled";
      }
      
      for (let i = 1; i <= milestone+1; i++) {
         children[i].className = "circle";
      }
   }
}
updateTimeLine();
window.onload = (event) => {
   updateTimeLine();
};