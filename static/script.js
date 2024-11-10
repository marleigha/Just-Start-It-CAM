/** 
 * @fileOverview Wellesley Hackathon Project 
 * 
 * @author Marleigh Ausbrooks, Carrie Huang, Ariel Athena Moncrief
 */


// Get the dropdown element and output area
const dropdown = document.getElementById('dropdown');
const selectedValue = document.getElementById('selected-value');
const newItemInput = document.getElementById('new-item');
const addButton = document.getElementById('add-btn');
const errorMsg = document.getElementById('error-msg');

// Handle dropdown selection change
dropdown.addEventListener('change', function () {
    const value = dropdown.value;
    selectedValue.textContent = value;
});

// Function to add a new option to the dropdown
function addNewReward() {
    const newItemText = newItemInput.value.trim();

    if (newItemText === "") {
        // Show error if input is empty
        errorMsg.classList.remove('hidden');
        return;
    }

    // Hide error message if input is valid
    errorMsg.classList.add('hidden');

    // Create a new option element
    const newOption = document.createElement('option');
    newOption.value = newItemText.toLowerCase();
    newOption.textContent = newItemText;

    // Add the new option to the dropdown
    dropdown.appendChild(newOption);

    // Clear the input field
    newItemInput.value = '';
}

// Handle the button click event to add new item
addButton.addEventListener('click', addNewReward);

//
// Get DOM elements
const inputArea = document.getElementById('input-area');
editingBool = false;
const createNewTaskBtn = document.getElementById('create-new-task-btn');
const downloadBtn = document.getElementById('download-btn');
//const errorMsg = document.getElementById('error-msg');

createNewTaskBtn.addEventListener('click', () => startWritingTask());


function startWritingTask() {
    editingBool = true;
    inputArea.classList.remove('hidden');
    // getting the values for each area
    //const row = document.querySelectorAll('.input-row');
    let validData = true;
    specificTask = document.getElementById('input-row')

    const taskInput = inputArea.querySelector('.task-input').value.trim();
    const difficulty = inputArea.querySelector('.difficulty-select').value;
    const urgency = inputArea.querySelector('urgency-select').value
    const startDate = inputArea.querySelector('.start-date-input').value;
    const endDate = inputArea.querySelector('.end-date-input').value;


    if (taskInput === '' || difficulty === '' || urgency === '' || startDate === '' || endDate === '') {
        validData = false;
        return;
    }


    if (!validData) {
        errorMsg.classList.remove('hidden');
        return;
    } else {
        errorMsg.classList.add('hidden');
    }

    //
    const saveTaskBtn = div.querySelector('.save-task-btn');
    saveTaskBtn.addEventListener('click', () => saveTask(taskInput, difficulty, urgency, startDate, endDate));


    //
    const removeBtn = div.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => div.remove());

}

function saveTask(taskInput, difficulty, urgency, startDate, endDate){
    inputArea.classList.add('hidden');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskInput}</span>
        <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(li);
    //save task
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent completing task when deleting
        li.remove();
    });

    // Mark task as complete on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });


    // Delete task on button click
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent completing task when deleting
        li.remove();
    });
}



// Function to gather input data and format as CSV
function generateCSV() {
    let csvContent = 'Name,Email,Role,Date\n';  // CSV header

    const rows = document.querySelectorAll('.input-row');
    let validData = true;

    rows.forEach(row => {
        const name = row.querySelector('.name-input').value.trim();
        const email = row.querySelector('.email-input').value.trim();
        const role = row.querySelector('.role-select').value;
        const date = row.querySelector('.date-input').value;

        if (name === '' || email === '' || role === '' || date === '') {
            validData = false;
            return;
        }

        csvContent += `${name},${email},${role},${date}\n`;  // Append row to CSV content
    });

    if (!validData) {
        errorMsg.classList.remove('hidden');
        return;
    } else {
        errorMsg.classList.add('hidden');
    }

    // Download the CSV
    downloadCSV(csvContent);
}

// Function to download the CSV file
function downloadCSV(csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Event listeners
addRowBtn.addEventListener('click', addInputRow);
downloadBtn.addEventListener('click', generateCSV);

// Initial input row
addInputRow();

// Get DOM elements
//const form = document.getElementById('todo-form');
const newTaskInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');
const currentPoints = 0;
const rewardPoints = 0; // eventually will pick based on the selected one


// Function to add a new task
function addTask(taskText) {
    inputArea.classList.add('hidden');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(li);
    //save task
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent completing task when deleting
        li.remove();
    });

    // Mark task as complete on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });


    // Delete task on button click
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent completing task when deleting
        li.remove();
    });
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent page reload
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        newTaskInput.value = '';  // Clear input field
    }
});