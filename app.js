// ToDo List Application
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.initElements();
        this.attachEventListeners();
        this.render();
    }

    initElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.taskCount = document.getElementById('taskCount');
        this.clearCompleted = document.getElementById('clearCompleted');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.clearCompleted.addEventListener('click', () => this.clearCompletedTodos());
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (text === '') {
            alert('Пожалуйста, введите задачу!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
        this.todoInput.focus();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    clearCompletedTodos() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('Нет завершённых задач для удаления!');
            return;
        }

        if (confirm(`Удалить ${completedCount} завершённых задач?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        
        this.todoList.innerHTML = '';
        
        if (filteredTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '30px';
            emptyMessage.style.color = '#999';
            emptyMessage.textContent = this.currentFilter === 'all' 
                ? 'Нет задач. Добавьте новую!' 
                : this.currentFilter === 'active' 
                    ? 'Нет активных задач!' 
                    : 'Нет завершённых задач!';
            this.todoList.appendChild(emptyMessage);
        } else {
            filteredTodos.forEach(todo => {
                const li = this.createTodoElement(todo);
                this.todoList.appendChild(li);
            });
        }

        this.updateStats();
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
        
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
        
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        
        return li;
    }

    updateStats() {
        const activeCount = this.todos.filter(t => !t.completed).length;
        const completedCount = this.todos.filter(t => t.completed).length;
        
        let taskText;
        if (activeCount === 0) {
            taskText = 'Нет активных задач';
        } else if (activeCount === 1) {
            taskText = '1 активная задача';
        } else if (activeCount < 5) {
            taskText = `${activeCount} активных задачи`;
        } else {
            taskText = `${activeCount} активных задач`;
        }
        
        this.taskCount.textContent = taskText;
        this.clearCompleted.style.display = completedCount > 0 ? 'block' : 'none';
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
