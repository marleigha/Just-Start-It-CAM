/** 
 * @fileOverview Wellesley Hackathon Project 
 * 
 * @author Marleigh Ausbrooks, Carrie Huang, Ariel Athena Moncrief
 */

// Get DOM elements
const form = document.getElementById('todo-form');
const newTaskInput = document.getElementById('new-task');
const todoList = document.getElementById('todo-list');

// Function to add a new task
function addTask(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(li);

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