function deleteMember(button) {
   button.parentElement.remove();
}


let first = true;
function addOptionsCEO() {
   
   const select = document.getElementById('optionSelect');
   const members = document.getElementById('teamMembers');
   for (let i = 0; i < members.children.length; i++){
      let name = members.children[i].children[1].value;
   
   
      const newOption = document.createElement('option');
      newOption.value = name;
      newOption.textContent = name;
      
      
      if (i == selectedIndex){ newOption.selected = true; }
      else { newOption.selected = false; }
      
      select.appendChild(newOption);
   }
}

function deleteOptionsCEO() {
   const select = document.getElementById('optionSelect');
   if (first) {
      first = false;
   } else { selectedIndex = select.selectedIndex; }
   select.innerHTML = '';
}


window.onload = (event) => {
   deleteOptionsCEO();
   addOptionsCEO();
};

function appendColumn() {
   const tablebody = document.getElementById("table-body");
   let rows = tablebody.children;
   //rows.append(document.querySelectorAll(".tdtMembers")[0]);
   //rows.append(document.querySelectorAll(".tdtMembers")[1]);
   
   let newColumn = [];
   
   
   
   const member = document.createElement('th');
   member.style.textAlign = 'center';
   member.textContent = '';
   newColumn.push(member);
   
   const pitch = document.createElement('th');
   pitch.style.textAlign = 'center';
   
   const checkboxPitch = document.createElement('input');
   checkboxPitch.type = 'checkbox';
   checkboxPitch.style.margin = '0';
   pitch.appendChild(checkboxPitch);
   newColumn.push(pitch);
   
   
   
   for (let i = 1; i < 7; i++){
      const aa = document.createElement('td');
      aa.style.textAlign = 'center';
      aa.textContent = '0';
      aa.classList.add("aa");
      newColumn.push(aa);
      
      const ab = document.createElement('td');
      ab.style.textAlign = 'center';
      ab.textContent = '0';
      ab.classList.add("ab");
      newColumn.push(ab);
      
      const ac = document.createElement('td');
      ac.style.textAlign = 'center';
      ac.classList.add("ac");
      
      const acMark = document.createElement('input');
      acMark.type = 'number';
      acMark.value = '';
      acMark.placeholder = "neznámkováno";
      acMark.min = 1;
      acMark.max = 5;
      acMark.style.margin = '0';
      acMark.classList.add("acMark");
      ac.appendChild(acMark);
      newColumn.push(ac);
         
      const ad = document.createElement('td');
      ad.style.textAlign = 'center';
      ad.classList.add("ad");
      
      const adMark = document.createElement('input');
      adMark.type = 'number';
      adMark.value = '';
      adMark.placeholder = "neznámkováno";
      adMark.min = 1;
      adMark.max = 5;
      adMark.style.margin = '0';
      adMark.classList.add("adMark");
      ad.appendChild(adMark);
      newColumn.push(ad);
   }
   
   document.getElementById("membersRow").appendChild(newColumn[0]);
   document.getElementById("pitchRow").appendChild(newColumn[1]);
   for (let i = 0; i < rows.length; i++){
         if (rows.length > newColumn.length) { 
            console.error("Columns does not correspond to the table, has the table changed?");
            break; 
         }
         
         rows[i].appendChild(newColumn[i+2]);
   }
}

function getColumnID(name){
   const rows = document.querySelectorAll(".tdtMembers");
   const nameRow = rows[0];
   
   for (let i = 1; i < nameRow.children.length; i++ ){
      if (nameRow.children[i].textContent == name){
         return i;
      }
   }
   
   console.error(`Couldn't find column with name: ${name}`);
   return undefined;
}

function deleteColumn(id){
   const rows = document.querySelectorAll(".tdtMembers");
   
   for (let i = 0; i < rows.length; i++){
    // check if i == 2, 6, 10...
    // whyyy thoo
    // figured out why, it's because the table rows are not actually on the same index (index = i)
    //    1/2
    //    2/2
    // a  com
    //    dev
    //
    // '1/2' isn't actually on the same i as '2/2', 'com' and 'dev'
    // it's moved by one i, because that's where the 'a' is declared at in html
    // we can't devide it by 4 rn because the table is... broken?
    // it's having issues finding the input field row
    // do they have .tdtMembers?
    // the issue was this: <tr class="tdtMembers, marksCommits"> 
    // they shouldn't have ','
    // the correct version: <tr class="tdtMembers marksCommits">
    if ((i - 2) % 4 === 0) {
     rows[i].children[id+1].remove();
    } else {
     rows[i].children[id].remove();
    }
   }
   
   //// Get the table body
   //const tableBody = document.getElementById('table-body');
   //
   //// Get all rows in the table body
   //const rows = tableBody.getElementsByTagName('tr');
   //
   //// Iterate through each row
   //for (let i = 0; i < rows.length; i++) {
   //   // Get the cells in the current row
   //   const cells = rows[i].getElementsByTagName('td');
   //
   //   // Remove the cell at the specified columnIndex
   //   if (cells.length > id) {
   //      cells[id].remove();
   //   }
   //}
   //
   //// Adjust the colspan of the first column in the header
   //const headerRow = document.getElementById('membersRow');
   //const headerCells = headerRow.getElementsByTagName('th');
   //headerCells[0].colSpan = 2; 
   //
   //// Hide the teams row
   //const teamsRow = document.getElementById('teamsRow');
   //teamsRow.style.display = 'none'; 
   //
   //// Remove the corresponding header cell
   //teamsRow = document.getElementById('teamsRow');
   //headerCells = teamsRow.getElementsByTagName('th');
   //if (headerCells.length > id) {
   //   headerCells[id].remove(); 
   //}
}

function changeColumnName(id, name, offset = 0){
   const rows = document.querySelectorAll(".tdtMembers");
   
   rows[0].children[(id+offset)].textContent = name;
}

function getMemberID(element){
   let checkElement = element.parentElement;
   let id = 0;
   let loop = 0;
   
   while (true){
      if (checkElement.previousElementSibling == null){
         break;
      }
      id++;
      checkElement = checkElement.previousElementSibling;
      
      if (loop > checkElement.parentElement.children.length) {
         console.error('Stuck in a loop. Breaking.');
         break;
      }
      loop++;
   }
   
   return id;
}

async function saveTeam(){
   const description = document.getElementById("description");
   const teamMembers = document.getElementById("teamMembers");
   const ceo = document.getElementById("optionSelect");
   const link = document.getElementById("link");
   const note = document.getElementById("note");
   const features = document.getElementById("features");
   const goals = document.getElementById("goals");
   const pitchRow = document.getElementById("pitchRow");
   const marksCommitsRows = document.querySelectorAll(".marksCommits");
   const marksDevlogsRows = document.querySelectorAll(".marksDevlogs");
   let data = {};
   
   data["description"] = description.value;
   
   let members = [];
   for (let i = 0; i < teamMembers.children.length; i++){
      let member = teamMembers.children[i].children[1].value;
      members.push(member);
   }
   data["members"] = members;
   
   data["ceo"] = ceo.selectedIndex;
   data["link"] = link.value;
   data["note"] = note.value;
   
   let featureses = [];
   for (let i = 0; i < features.children.length; i++){
      let feature = features.children[i].children[1].value;
      featureses.push(feature);
   }
   data["features"] = featureses;
   
   let goalses = [];
   for (let i = 0; i < goals.children.length; i++){
      let goal = goals.children[i].children[1].value;
      goalses.push(goal);
   }
   data["goals"] = goalses;
   
   let pitch = []
   for (let i = 1; i < pitchRow.children.length; i++){
         let checked = pitchRow.children[i].children[0].checked;
         pitch.push(checked);
   }
   data["pitch"] = pitch;
   
   let marksCommits = [];
   for (let c = 1; c < members.length+1; c++){
      let marksCommitsMember = [];
      for (let r = 0; r < marksCommitsRows.length; r++){
         let mark = marksCommitsRows[r].children[c].children[0].value;
         if (mark == ''){
            mark = 0;  
         }
         marksCommitsMember.push(mark);
      }
      marksCommits.push(marksCommitsMember);
   }
   data["marksCommits"] = marksCommits;
   
   
   let marksDevlogs = [];
   for (let c = 1; c < members.length+1; c++){
      let marksDevlogsMember = [];
      for (let r = 0; r < marksDevlogsRows.length; r++){
         let mark = marksDevlogsRows[r].children[c].children[0].value;
         if (mark == ''){
            mark = 0;  
         }
         marksDevlogsMember.push(mark);
      }
      marksDevlogs.push(marksDevlogsMember);
   }
   data["marksDevlogs"] = marksDevlogs;
   
   let ID = window.location.pathname.split('/');
   ID = ID[ID.length-1].split('-');
   
   data["teamID"] = ID[ID.length-1];
   data["classID"] = `${ID[0]}-${ID[1]}`;
   
   
   try {
		const response = await fetch(`/projekty/save/team`, {
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

        // Redirect after handling
		//if (jsonResponse.id == undefined){
		//	window.location.href = `/osnovy`;
		//}
		//window.location.href = `/projekty/`;
      
      window.location.reload();
		} catch (error) {
         console.error('Error:', error);
		}
}
