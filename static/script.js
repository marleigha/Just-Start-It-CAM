// Get DOM elements
const rewardNameInput = document.getElementById('reward-name');
const rewardPointsInput = document.getElementById('reward-points');
const addRewardBtn = document.getElementById('add-reward-btn');
const rewardDropdown = document.getElementById('reward-dropdown');
const selectedRewardDisplay = document.getElementById('selected-reward');
const selectedPointsDisplay = document.getElementById('selected-points');

const taskArea = document.getElementById('task-section');
const createTasksBtn = document.getElementById('create-tasks-btn');
const closeTaskCreationBtn = document.getElementById('close-creation-btn');
const taskNameInput = document.getElementById('task-name');
const difficultyInput = document.getElementById('difficulty');
const urgencyInput = document.getElementById('urgency');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const downloadTasksBtn = document.getElementById('download-tasks-btn');
const uploadCsvInput = document.getElementById('csv-upload');
const uploadTasksBtn = document.getElementById('upload-tasks-btn');

// Reward storage
const rewards = [];

// Task storage
const tasks = [];

// Set today's date as default for start date
const today = new Date().toISOString().split('T')[0];
startDateInput.value = today;

// Add reward to the dropdown
addRewardBtn.addEventListener('click', () => {
    const rewardName = rewardNameInput.value.trim();
    const rewardPoints = rewardPointsInput.value.trim();

    if (rewardName === '' || rewardPoints === '') {
        alert('Please enter a reward name and points.');
        return;
    }

    const reward = {
        name: rewardName,
        points: rewardPoints
    };
    rewards.push(reward);

    const option = document.createElement('option');
    option.value = rewards.length - 1;  // Store the index in the value
    option.textContent = `${rewardName} (${rewardPoints} pts)`;
    rewardDropdown.appendChild(option);

    // Clear input fields
    rewardNameInput.value = '';
    rewardPointsInput.value = '';
});

// Display selected reward details
rewardDropdown.addEventListener('change', () => {
    const selectedIndex = rewardDropdown.value;
    const selectedReward = rewards[selectedIndex];

    selectedRewardDisplay.textContent = selectedReward.name;
    selectedPointsDisplay.textContent = selectedReward.points;
});

//show the area where you make new tasks
createTasksBtn.addEventListener('click', () => {
    taskArea.classList.remove('hidden');
    createTasksBtn.classList.add('hidden');
    closeTaskCreationBtn.classList.remove('hidden');
});

//show the area where you make new tasks
closeTaskCreationBtn.addEventListener('click', () => {
    taskArea.classList.add('hidden');
    createTasksBtn.classList.remove('hidden');
    closeTaskCreationBtn.classList.add('hidden');


});

// Add task to the task list
addTaskBtn.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    const difficulty = difficultyInput.value;
    const urgency = urgencyInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (taskName === '' || difficulty === '' || urgency === '' || startDate === '' || endDate === '') {
        alert('Please fill out all fields.');
        return;
    }

    const task = {
        name: taskName,
        difficulty,
        urgency,
        startDate,
        endDate
    };
    tasks.push(task);

    const li = document.createElement('li');

    // Checkbox and task label
    const checkboxLabel = document.createElement('label');
    checkboxLabel.classList.add('checkbox-label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleComplete);

    const span = document.createElement('span');
    span.textContent = `Task: ${taskName}, Difficulty: ${difficulty}, Urgency: ${urgency}, Start: ${startDate}, End: ${endDate}`;;


    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(span);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', deleteTask);


    // Append the label and button to the list item
    //li.textContent = `Task: ${taskName}, Difficulty: ${difficulty}, Urgency: ${urgency}, Start: ${startDate}, End: ${endDate}`;
    li.appendChild(checkboxLabel);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear input fields
    taskNameInput.value = '';
    difficultyInput.value = '';
    urgencyInput.value = '';
    startDateInput.value = today;
    endDateInput.value = '';
});





// Function to toggle task completion
function toggleComplete(event) {
    const checkbox = event.target;
    const label = checkbox.nextElementSibling; // The task text span

    if (checkbox.checked) {
        label.classList.add('completed');
    } else {
        label.classList.remove('completed');
    }
};

// Function to delete a task
function deleteTask(event) {
    const task = event.target.closest('li');
    task.remove();
};
