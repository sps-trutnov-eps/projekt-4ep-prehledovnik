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
   const rows = document.querySelectorAll(".tdtMembers");
   
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
      newColumn.push(aa);
      
      const ab = document.createElement('td');
      ab.style.textAlign = 'center';
      ab.textContent = '0';
      newColumn.push(ab);
      
      const ac = document.createElement('td');
      ac.style.textAlign = 'center';
      
         const acMark = document.createElement('input');
         acMark.type = 'text';
         acMark.value = '0';
         acMark.style.margin = '0';
         ac.appendChild(acMark);
      newColumn.push(ac);
         
      const ad = document.createElement('td');
      ad.style.textAlign = 'center';
      
         const adMark = document.createElement('input');
         adMark.type = 'text';
         adMark.value = '0';
         adMark.style.margin = '0';
         ad.appendChild(adMark);
      newColumn.push(ad);
   }
   
   for (let i = 0; i < rows.length; i++){
         if (rows.length > newColumn.length) { 
            console.error("Columns does not correspond to the table, has the table changed?");
            break; 
         }
         
         rows[i].appendChild(newColumn[i]);
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
      if ((i - 2) % 4 === 0) {
         rows[i].children[id+1].remove();
      } else {
         rows[i].children[id].remove();
      }
   }
}

function changeColumnName(id, name, offset = 0){
   const rows = document.querySelectorAll(".tdtMembers");
   
   //console.log(`${id} ; ${name}; ${offset}`);
   
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
   
   console.log(marksCommitsRows);
   
   let marksCommits = [];
   for (let c = 1; c < members.length+1; c++){
      let marksCommitsMember = [];
      console.log(`column: ${c}`);
      for (let r = 0; r < marksCommitsRows.length; r++){
         let mark = marksCommitsRows[r].children[c].children[0].value;
         console.log(`row: ${r} mark: ${mark}`);
         console.log( marksCommitsRows[r].children[c]);
         marksCommitsMember.push(mark);
      }
      marksCommits.push(marksCommitsMember);
   }
   data["marksCommits"] = marksCommits;
   
   
   let marksDevlogs = [];
   for (let c = 1; c < members.length+1; c++){
      let marksDevlogsMember = [];
      //console.log(`column: ${c}`);
      for (let r = 0; r < marksDevlogsRows.length; r++){
         let mark = marksDevlogsRows[r].children[c].children[0].value;
         //console.log(`row: ${r} mark: ${mark}`);
         //console.log( marksDevlogsRows[r].children[c]);
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
        //console.log(jsonResponse); // Handle your JSON data here

        // Redirect after handling
		/*if (jsonResponse.id == undefined){
			window.location.href = `/osnovy`;
		}*/
		
		window.location.href = `/projekty/`;
		} catch (error) {
		console.error('Error:', error);
		}
}