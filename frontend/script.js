// frontend/script.js
const API_URL = 'http://localhost:5000/api/todos'; // Backend URL

const todoList = document.getElementById('todoList');
const newTodoInput = document.getElementById('newTodoInput');
const addTodoBtn = document.getElementById('addTodoBtn');

// Function to fetch and display todos
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        todoList.innerHTML = ''; // Clear existing list
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="actions">
                    <button class="toggle-btn" data-id="${todo.id}">${todo.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button class="delete-btn" data-id="${todo.id}">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        alert('Failed to load todos. Make sure the backend is running!');
    }
}

// Function to add a new todo
addTodoBtn.addEventListener('click', async () => {
    const text = newTodoInput.value.trim();
    if (text === '') return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        if (response.ok) {
            newTodoInput.value = ''; // Clear input
            fetchTodos(); // Refresh list
        } else {
            console.error('Failed to add todo:', await response.json());
            alert('Failed to add todo.');
        }
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('Error adding todo. Make sure the backend is running!');
    }
});

// Event delegation for toggle and delete buttons
todoList.addEventListener('click', async (e) => {
    const target = e.target;
    const id = target.dataset.id;

    if (target.classList.contains('delete-btn')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (response.status === 204) { // 204 No Content for successful delete
                fetchTodos(); // Refresh list
            } else {
                console.error('Failed to delete todo:', await response.json());
                alert('Failed to delete todo.');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            alert('Error deleting todo. Make sure the backend is running!');
        }
    } else if (target.classList.contains('toggle-btn')) {
        const currentTodoText = target.closest('li').querySelector('span').textContent;
        const isCompleted = target.textContent === 'Complete'; // Check current state from button text

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: currentTodoText, completed: isCompleted }) // Toggle 'completed' status
            });
            if (response.ok) {
                fetchTodos(); // Refresh list
            } else {
                console.error('Failed to toggle todo status:', await response.json());
                alert('Failed to toggle todo status.');
            }
        } catch (error) {
            console.error('Error toggling todo status:', error);
            alert('Error toggling todo status. Make sure the backend is running!');
        }
    }
});


// Initial fetch when page loads
fetchTodos();