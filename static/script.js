

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
const progressBar = document.getElementById('progress-bar')

// Reward storage
const rewards = [];

// Task storage
const tasks = [];

// JavaScript code goes here
const financialTemplateBtn = document.getElementById('financial-template-btn');
financialTemplateBtn.addEventListener('click', () => {
    fetch('/get_tasks')  // Fetch the tasks data from the server
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';  // Clear existing tasks

            data.forEach(task => {
                // Create checkbox and label
                const checkboxLabel = document.createElement('label');
                checkboxLabel.classList.add('checkbox-label');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('change', toggleComplete);

                const li = document.createElement('li');
                li.classList.add('task-item');  // Add class for styling

                // Create task details (only values, no labels)
                const span = document.createElement('span');
                span.textContent = `${task.task_Name}, ${task.difficulty_level}, ${task.urgency_level}, ${task.startDate}, ${task.due_date}`;

                // Create task details (correctly access task properties)
                const taskNameSpan = document.createElement('span');
                taskNameSpan.textContent = task.task_Name;  // Use task.taskName
                const difficultySpan = document.createElement('span');
                difficultySpan.textContent = task.difficulty_level;  // Use task.difficulty
                const urgencySpan = document.createElement('span');
                urgencySpan.textContent = task.urgency_level;  // Use task.urgency
                const dueDateSpan = document.createElement('span');
                dueDateSpan.textContent = task.due_date;
                
                console.log(taskNameSpan);
                console.log(difficultySpan);
                console.log(dueDateSpan);

                // Calculate point value
                const pointValue = pointCalulator(task.difficulty);
                const pointSpan = document.createElement('span');
                pointSpan.textContent = `Worth: ${pointValue} points`;

                
                checkboxLabel.appendChild(checkbox);
                checkboxLabel.appendChild(taskNameSpan);
                checkboxLabel.appendChild(difficultySpan);
                checkboxLabel.appendChild(dueDateSpan);
                checkboxLabel.appendChild(pointSpan)

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
             });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
});

// Placeholder point calculator function (adjust as needed)
function pointCalulator(difficulty) {
    if (difficulty === 'Medium') {
        return 3;  // Example: "Medium" difficulty gives 3 points
    } else if (difficulty === 'High') {
        return 5;  // Example: "High" difficulty gives 5 points
    } else {
        return 1;  // Default point for low difficulty
    }
}


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
    progressBar.max = selectedReward.points;
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

// Function to calculate points based on task difficulty and urgency
function pointsCalculator(difficulty, urgency) {
    // Points mapping for difficulty and urgency
    const pointsDict = {
                        easy: 2,
                        medium: 5,
                        hard: 10,
                        urgent: 2,
                        non_urgent: 1
                        };
  
    // Calculate the total points
    const points = pointsDict[difficulty] * pointsDict[urgency];
  
    return points;
  }

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
    span.textContent = `task: ${taskName}, difficulty: ${difficulty}, urgency: ${urgency}, start: ${startDate}, end: ${endDate}`;
    const taskNameSpan = document.createElement('span');
    taskNameSpan.textContent = taskName;
    difficultySpan = document.createElement('span');
    difficultySpan.textContent = difficulty;
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = task.endDate;

    console.log(dueDateSpan);
    
    //calculate point value
    //take in whatever params it needs
    const pointValue = pointsCalculator(difficulty, urgency);
    const pointSpan = document.createElement('span');
    pointSpan.textContent = `worth: ${pointValue} points`;


    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(taskNameSpan);
    checkboxLabel.appendChild(difficultySpan);
    checkboxLabel.appendChild(dueDateSpan);
    checkboxLabel.appendChild(pointSpan);

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
    const difficulty = label.nextElementSibling;
    const rawPointSpan = difficulty.nextElementSibling.innerHTML;
    const pointValue = rawPointSpan.split(' ')[1];
    currentValue = progressBar.getAttribute("value");
    console.log('current value', currentValue);
    console.log('points to add or remove', pointValue)
    
    if (checkbox.checked) {
        label.classList.add('completed');
        progressBar.setAttribute("value", (parseInt(currentValue)+ parseInt(pointValue)).toString());
        console.log('points to add', pointValue)

    } else {
        label.classList.remove('completed');
        progressBar.setAttribute("value", (parseInt(currentValue)- parseInt(pointValue)).toString());
        console.log('points to remove', pointValue)
    }
};

// Function to delete a task
function deleteTask(event) {
    const task = event.target.closest('li');
    task.remove();
};


