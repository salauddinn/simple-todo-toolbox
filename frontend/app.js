const API_URL = 'http://localhost:3001/api/todos';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fetch and display todos when the page loads
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Render the list of todos to the DOM
function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${todo.id})" class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Add a new todo
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        if (response.ok) {
            todoInput.value = '';
            fetchTodos(); // Refresh the list
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
});

// Delete a todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchTodos(); // Refresh the list
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Initial fetch
fetchTodos();
