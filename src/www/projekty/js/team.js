function deleteMember(button) {
   button.parentElement.remove();
}

let selectedIndex = 0;
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
   selectedIndex = select.selectedIndex;
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