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
    inputField.className='curriculum-i'; 
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
}

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
}

function addNewOption(button) {
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
		deleteOption(this);
	};
    
   const dropdownItem = document.createElement('input');
   dropdownItem.type = 'text';
   dropdownItem.value = '';
   dropdownItem.className = 'dropdown-item';
   dropdownItem.style.margin = '0';
    
   newOption.appendChild(deleteButton);
   newOption.appendChild(dropdownItem);
   
   dropdown.appendChild(newOption);
   
   const mainButton = parent.parentElement.children[0];
   mainButton.textContent = dropdown.children.length;
   
}

function deleteOption(button) {
    const mainButton = button.parentElement.parentElement.parentElement.parentElement.children[0];
    const dropdown = button.parentElement.parentElement;
    
    button.parentElement.remove();
    
    mainButton.textContent = dropdown.children.length;
}

function deleteTeam(button) {
    const tableBody = button.parentElement.parentElement.parentElement;  // Get the table body
    
    button.parentElement.parentElement.remove();
    
    for (let i = 0; i < tableBody.rows.length - 1; i++){
      const row = tableBody.rows[i];
      row.children[0].children[1].textContent = i+1;
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-content *') && !event.target.matches('.deleteButton')) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
  }
});

function showElementAndHideElement(show, hide) {
    document.getElementById(show).style.display = "block";
    document.getElementById(hide).style.display = "none";
}