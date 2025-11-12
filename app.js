// ToDo List Application
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.isLoading = false;
        this.initElements();
        this.attachEventListeners();
        this.initDarkMode();
        this.render();
    }

    initElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.taskCount = document.getElementById('taskCount');
        this.clearCompleted = document.getElementById('clearCompleted');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('searchInput');
        this.darkModeToggle = document.getElementById('darkModeToggle');
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', (e) => {
            this.createRipple(e, this.addBtn);
            this.addTodo();
        });
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.todoInput.addEventListener('input', () => this.validateInput());
        this.clearCompleted.addEventListener('click', (e) => {
            this.createRipple(e, this.clearCompleted);
            this.clearCompletedTodos();
        });
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRipple(e, btn);
                this.setFilter(e.target.dataset.filter);
            });
        });
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
        if (this.darkModeToggle) {
            this.darkModeToggle.addEventListener('click', (e) => {
                this.createRipple(e, this.darkModeToggle);
                this.toggleDarkMode();
            });
        }
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    validateInput() {
        const text = this.todoInput.value.trim();
        const isValid = text.length > 0 && text.length <= 500;
        
        if (text.length > 500) {
            this.showError('Задача слишком длинная (максимум 500 символов)');
            this.todoInput.classList.add('error');
        } else {
            this.todoInput.classList.remove('error');
        }
        
        return isValid;
    }

    addTodo() {
        try {
            // Show loading state
            this.setLoading(true);
            
            const text = this.todoInput.value.trim();
            
            // Enhanced validation
            if (text === '') {
                this.showError('Пожалуйста, введите задачу!');
                this.todoInput.focus();
                this.setLoading(false);
                return;
            }
            
            if (text.length > 500) {
                this.showError('Задача слишком длинная (максимум 500 символов)');
                this.setLoading(false);
                return;
            }

            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                priority: 'medium',
                createdAt: new Date().toISOString(),
                completedAt: null
            };

            this.todos.push(todo);
            this.todoInput.value = '';
            this.todoInput.classList.remove('error');
            this.saveTodos();
            this.render();
            this.todoInput.focus();
            this.showSuccess('Задача добавлена!');
            
            // Hide loading state
            setTimeout(() => this.setLoading(false), 300);
        } catch (error) {
            console.error('Error adding todo:', error);
            this.showError('Произошла ошибка при добавлении задачи');
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        this.isLoading = isLoading;
        this.addBtn.disabled = isLoading;
        if (isLoading) {
            this.addBtn.classList.add('loading');
            this.addBtn.textContent = 'Добавление...';
        } else {
            this.addBtn.classList.remove('loading');
            this.addBtn.textContent = 'Добавить';
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Show notification with animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.render();
    }

    toggleTodo(id) {
        try {
            const todo = this.todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? new Date().toISOString() : null;
                this.saveTodos();
                this.render();
                this.showSuccess(todo.completed ? 'Задача выполнена!' : 'Задача возвращена в активные');
            }
        } catch (error) {
            console.error('Error toggling todo:', error);
            this.showError('Ошибка при изменении статуса задачи');
        }
    }

    deleteTodo(id) {
        try {
            const todo = this.todos.find(t => t.id === id);
            if (!todo) return;

            if (confirm(`Вы уверены, что хотите удалить задачу "${todo.text}"?`)) {
                // Find the element to animate
                const element = document.querySelector(`[data-todo-id="${id}"]`);
                
                if (element && typeof MicroInteractions !== 'undefined') {
                    // Apply deletion animation
                    MicroInteractions.animateExit(
                        element,
                        MicroInteractions.animations.taskDelete,
                        () => {
                            this.todos = this.todos.filter(t => t.id !== id);
                            this.saveTodos();
                            this.render();
                            this.showSuccess('Задача удалена');
                        }
                    );
                } else {
                    // Fallback without animation
                    this.todos = this.todos.filter(t => t.id !== id);
                    this.saveTodos();
                    this.render();
                    this.showSuccess('Задача удалена');
                }
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            this.showError('Ошибка при удалении задачи');
        }
    }

    editTodo(id) {
        try {
            const todo = this.todos.find(t => t.id === id);
            if (!todo) return;

            const newText = prompt('Редактировать задачу:', todo.text);
            if (newText !== null) {
                const trimmedText = newText.trim();
                if (trimmedText === '') {
                    this.showError('Задача не может быть пустой');
                    return;
                }
                if (trimmedText.length > 500) {
                    this.showError('Задача слишком длинная (максимум 500 символов)');
                    return;
                }
                todo.text = trimmedText;
                this.saveTodos();
                this.render();
                this.showSuccess('Задача обновлена!');
            }
        } catch (error) {
            console.error('Error editing todo:', error);
            this.showError('Ошибка при редактировании задачи');
        }
    }

    changePriority(id, priority) {
        try {
            const todo = this.todos.find(t => t.id === id);
            if (todo) {
                todo.priority = priority;
                this.saveTodos();
                this.render();
            }
        } catch (error) {
            console.error('Error changing priority:', error);
            this.showError('Ошибка при изменении приоритета');
        }
    }

    clearCompletedTodos() {
        try {
            const completedCount = this.todos.filter(t => t.completed).length;
            if (completedCount === 0) {
                this.showError('Нет завершённых задач для удаления!');
                return;
            }

            if (confirm(`Удалить ${completedCount} завершённых ${this.getPluralForm(completedCount, 'задачу', 'задачи', 'задач')}?`)) {
                this.todos = this.todos.filter(t => !t.completed);
                this.saveTodos();
                this.render();
                this.showSuccess(`Удалено ${completedCount} ${this.getPluralForm(completedCount, 'задача', 'задачи', 'задач')}`);
            }
        } catch (error) {
            console.error('Error clearing completed todos:', error);
            this.showError('Ошибка при очистке завершённых задач');
        }
    }

    getPluralForm(count, form1, form2, form5) {
        const n = Math.abs(count) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return form5;
        if (n1 > 1 && n1 < 5) return form2;
        if (n1 === 1) return form1;
        return form5;
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            const isActive = btn.dataset.filter === filter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive.toString());
        });
        this.render();
    }

    getFilteredTodos() {
        let filtered = [];
        
        // Filter by status
        switch (this.currentFilter) {
            case 'active':
                filtered = this.todos.filter(t => !t.completed);
                break;
            case 'completed':
                filtered = this.todos.filter(t => t.completed);
                break;
            default:
                filtered = [...this.todos];
        }

        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(t => 
                t.text.toLowerCase().includes(this.searchQuery)
            );
        }

        // Sort by priority and creation date
        filtered.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            const aPriority = priorityOrder[a.priority] || 1;
            const bPriority = priorityOrder[b.priority] || 1;
            
            if (aPriority !== bPriority) {
                return aPriority - bPriority;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return filtered;
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
        li.className = `todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority || 'medium'}`;
        li.dataset.todoId = todo.id;
        li.setAttribute('role', 'listitem');
        
        // Apply entry animation if MicroInteractions is available
        if (typeof MicroInteractions !== 'undefined') {
            // Use requestAnimationFrame to ensure element is in DOM first
            requestAnimationFrame(() => {
                MicroInteractions.animateEntry(li, MicroInteractions.animations.taskAddFromTop);
            });
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox checkbox-animate';
        checkbox.checked = todo.completed;
        checkbox.setAttribute('aria-label', `Отметить задачу как ${todo.completed ? 'активную' : 'выполненную'}`);
        checkbox.addEventListener('change', (e) => {
            // Apply checkbox animation
            if (typeof MicroInteractions !== 'undefined' && e.target.checked) {
                MicroInteractions.animateCheckbox(checkbox, true);
            }
            this.toggleTodo(todo.id);
        });
        
        const textContainer = document.createElement('div');
        textContainer.className = 'todo-text-container';
        
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todo.text;
        
        const meta = document.createElement('div');
        meta.className = 'todo-meta';
        const createdDate = new Date(todo.createdAt);
        meta.textContent = `Создано: ${this.formatDate(createdDate)}`;
        if (todo.completedAt) {
            const completedDate = new Date(todo.completedAt);
            meta.textContent += ` | Выполнено: ${this.formatDate(completedDate)}`;
        }
        
        textContainer.appendChild(text);
        textContainer.appendChild(meta);
        
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'todo-actions';
        
        // Priority selector
        const prioritySelect = document.createElement('select');
        prioritySelect.className = 'priority-select';
        prioritySelect.setAttribute('aria-label', 'Выбрать приоритет задачи');
        prioritySelect.innerHTML = `
            <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>🔴 Высокий</option>
            <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>🟡 Средний</option>
            <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>🟢 Низкий</option>
        `;
        prioritySelect.addEventListener('change', (e) => {
            e.stopPropagation();
            this.changePriority(todo.id, e.target.value);
        });
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '✏️';
        editBtn.title = 'Редактировать';
        editBtn.setAttribute('aria-label', 'Редактировать задачу');
        editBtn.addEventListener('click', (e) => {
            this.createRipple(e, editBtn);
            this.editTodo(todo.id);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.title = 'Удалить';
        deleteBtn.setAttribute('aria-label', 'Удалить задачу');
        deleteBtn.addEventListener('click', (e) => {
            this.createRipple(e, deleteBtn);
            this.deleteTodo(todo.id);
        });
        
        actionsContainer.appendChild(prioritySelect);
        actionsContainer.appendChild(editBtn);
        actionsContainer.appendChild(deleteBtn);
        
        li.appendChild(checkbox);
        li.appendChild(textContainer);
        li.appendChild(actionsContainer);
        
        return li;
    }

    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'только что';
        if (minutes < 60) return `${minutes} мин. назад`;
        if (hours < 24) return `${hours} ч. назад`;
        if (days < 7) return `${days} дн. назад`;
        
        return date.toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'short',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
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
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving todos:', error);
            this.showError('Ошибка при сохранении данных');
        }
    }

    loadTodos() {
        try {
            const saved = localStorage.getItem('todos');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading todos:', error);
            this.showError('Ошибка при загрузке данных');
            return [];
        }
    }

    toggleDarkMode() {
        if (typeof MicroInteractions !== 'undefined') {
            const isDark = document.documentElement.classList.contains('dark-mode');
            MicroInteractions.toggleDarkMode(!isDark);
            localStorage.setItem('darkMode', !isDark);
            this.showSuccess(isDark ? 'Светлая тема включена' : 'Темная тема включена');
        }
    }

    initDarkMode() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.documentElement.classList.add('dark-mode');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
