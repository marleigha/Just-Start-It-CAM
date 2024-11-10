/** 
 * @fileOverview Wellesley Hackathon Project 
 * 
 * @author Marleigh Ausbrooks, Carrie Huang, Ariel Athena Moncrief
 */


// Get the dropdown element and output area
const rewardDropdown = document.getElementById('reward-dropdown');
const selectedReward = document.getElementById('selected-reward');
const newItemInput = document.getElementById('new-item');
const addButton = document.getElementById('add-btn');
const errorMsg = document.getElementById('error-msg');

// Handle dropdown selection change
rewardDropdown.addEventListener('change', function () {
    const value = rewardDropdown.value;
    selectedReward.textContent = value;
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
    rewardDropdown.appendChild(newOption);

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

    const taskInput = specificTask.querySelector('.task-input').value.trim();
    const difficulty = specificTask.querySelector('.difficulty-select').value;
    const urgency = specificTask.querySelector('urgency-select').value
    const startDate = specificTask.querySelector('.start-date-input').value;
    const endDate = specificTask.querySelector('.end-date-input').value;


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
